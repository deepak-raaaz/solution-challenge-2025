import { Request, Response, NextFunction } from 'express';
import mongoose, { Types } from 'mongoose';
import { Lesson } from '../../../models/students/lesson.model';
import { Module } from '../../../models/students/module.model';
import { Quiz } from '../../../models/students/quiz.model';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { redis } from '../../../utlis/redis';
import { cleanJsonResponse } from '../../../utlis/cleanJson.helper';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '../../../utlis/logger';

// Interface for request body
interface CreateNewQuizBody {
    lessonId?: string;
    moduleId?: string;
    type: 'Lesson' | 'Module';
}

// Helper to verify lesson or module ownership
async function verifyOwnership(
    parentId: string,
    parentType: 'Lesson' | 'Module',
    userId: string
): Promise<{ parent: any; module?: any; roadmap: any } | null> {
    const cacheKey = `ownership:${parentType}:${parentId}:user:${userId}`;
    const cached = await redis.get(cacheKey);
    if (cached) {
        logger.debug(`Cache hit for ${parentType}:${parentId}:user:${userId}`);
        const parsed = JSON.parse(cached);
        const parent = parentType === 'Lesson'
            ? await Lesson.findById(parsed.parent._id)
            : await Module.findById(parsed.parent._id);
        if (!parent || !parsed.roadmap?._id || (parentType === 'Lesson' && !parsed.module?._id)) {
            logger.warn(`Invalid cached data for ${parentType}:${parentId}, user:${userId}`);
            await redis.del(cacheKey);
            return null;
        }
        parsed.parent = parent;
        return parsed;
    }

    logger.debug(`Verifying ownership for ${parentType}:${parentId}, user:${userId}`);

    const matchStage = {
        _id: new mongoose.Types.ObjectId(parentId),
        // status: { $in: ['in-progress', 'completed'] } // Allow completed for reattempts
    };

    const pipeline = [
        { $match: matchStage },
        ...(parentType === 'Lesson' ? [
            {
                $lookup: {
                    from: 'learningroadmapmodules',
                    localField: 'moduleId',
                    foreignField: '_id',
                    as: 'module',
                },
            },
            { $unwind: { path: '$module', preserveNullAndEmptyArrays: false } },
            {
                $lookup: {
                    from: 'learningroadmaps',
                    localField: 'module.roadmapId',
                    foreignField: '_id',
                    as: 'roadmap',
                },
            },
        ] : [
            {
                $lookup: {
                    from: 'learningroadmaps',
                    localField: 'roadmapId',
                    foreignField: '_id',
                    as: 'roadmap',
                },
            },
        ]),
        { $unwind: { path: '$roadmap', preserveNullAndEmptyArrays: false } },
        {
            $match: {
                'roadmap.userId': new mongoose.Types.ObjectId(userId),
            },
        },
        {
            $project: {
                parent: '$$ROOT',
                module: parentType === 'Lesson' ? 1 : undefined,
                roadmap: 1,
            },
        },
    ];

    const result = parentType === 'Lesson'
        ? await Lesson.aggregate(pipeline)
        : await Module.aggregate(pipeline);

    if (result.length === 0) {
        logger.warn(`Ownership verification failed for ${parentType}:${parentId}, user:${userId}, result: ${JSON.stringify(result)}`);
        return null;
    }

    logger.debug(`Ownership verified for ${parentType}:${parentId}, user:${userId}`);
    const ownershipData = {
        parent: result[0].parent,
        module: parentType === 'Lesson' ? result[0].module : undefined,
        roadmap: result[0].roadmap,
    };
    await redis.setex(cacheKey, 300, JSON.stringify({
        ...ownershipData,
        parent: ownershipData.parent,
    }));
    return ownershipData;
}

// Helper to generate quiz using Gemini API
async function generateQuiz(
    parent: any,
    parentType: 'Lesson' | 'Module',
    module: any = null,
    existingQuestions: string[] = []
): Promise<any> {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
    Generate a quiz for a ${parentType.toLowerCase()} based on the following details:
    - ${parentType} Title: ${parent.title || 'No title provided'}
    - ${parentType} Description: ${parent.description || 'No description provided'}
    - ${parentType} Topics: ${JSON.stringify(parent.topics || [])}
    ${parentType === 'Lesson' ? `- Module Title: ${module?.title || 'No module title'}\n- Module Description: ${module?.description || 'No module description'}` : ''}
    - Existing Questions to Avoid: ${JSON.stringify(existingQuestions)}

    ### Requirements:
    - Create a quiz with 10-15 multiple-choice questions.
    - Questions must be based strictly on the provided ${parentType.toLowerCase()} topics, title, and description.
    - Allow 1-2 questions to be rephrased versions of existing questions (different wording, same concept).
    - All other questions must be unique and not similar to existing questions.
    - Each question should have:
      - A clear question text.
      - 4 multiple-choice options.
      - The correct answer as a string (matching one of the options exactly).
      - A brief explanation for the correct answer.
    - Questions should be relevant, educational, and varied in difficulty.
    - Return valid JSON with the following structure:
    {
      "questions": [
        {
          "type": "Multiple Choice",
          "question": "Question text",
          "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
          "correctAnswer": "Option 1",
          "explanation": "Explanation for the correct answer."
        },
        ...
      ]
    }
    - No trailing commas in JSON.
  `;

    try {
        logger.debug(`Generating quiz for ${parentType}:${parent._id}`);
        const result = await model.generateContent(prompt);
        const responseText = await result.response.text();
        const cleanedText = cleanJsonResponse(responseText);
        const quizData = JSON.parse(cleanedText);

        if (!quizData?.questions || !Array.isArray(quizData.questions) || quizData.questions.length < 10) {
            throw new Error('Invalid quiz structure or insufficient questions');
        }

        quizData.questions = quizData.questions.map((q: any) => ({
            type: 'Multiple Choice',
            question: q?.question || 'Untitled Question',
            options:
                Array.isArray(q.options) && q.options?.length === 4
                    ? q.options
                    : ['A', 'B', 'C', 'D'],
            correctAnswer: q.options?.includes(q.correctAnswer)
                ? q.correctAnswer
                : q.options[0] || 'A',
            explanation: q.explanation || 'No explanation provided.',
        }));

        logger.debug(`Quiz generated successfully for ${parentType}:${parent._id}`);
        return quizData;
    } catch (error: any) {
        logger.error(`Failed to generate quiz for ${parentType}:${parent._id}: ${error.message}`);
        throw new Error('Quiz generation failed');
    }
}

// New API to create a reattempt quiz
export const createReattemptNewQuiz = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        console.log(req.body)
        const { lessonId, moduleId, type } = req.body as CreateNewQuizBody;
        const user = req.user as any;

        // Validate user authentication
        if (!user?._id) {
            logger.warn('Unauthorized access attempt: No user in request');
            await session.abortTransaction();
            session.endSession();
            return res.status(401).json({ error: 'Unauthorized: No user authenticated' });
        }
        const userId = user._id;

        // Validate inputs
        if (!['Lesson', 'Module'].includes(type)) {
            logger.warn(`Invalid type: ${type}`);
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ error: 'Invalid type: Must be Lesson or Module' });
        }
        const parentId = type === 'Lesson' ? lessonId : moduleId;
        if (!parentId || !mongoose.Types.ObjectId.isValid(parentId)) {
            logger.warn(`Invalid ${type.toLowerCase()}Id: ${parentId}`);
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ error: `Invalid ${type.toLowerCase()}Id` });
        }
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            logger.warn(`Invalid userId: ${userId}`);
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ error: 'Invalid userId' });
        }

        // Verify ownership
        const ownership = await verifyOwnership(parentId, type, userId);
        if (!ownership) {
            logger.warn(`Unauthorized access by user:${userId} to ${type}:${parentId}`);
            await session.abortTransaction();
            session.endSession();
            return res.status(403).json({ error: `Forbidden: ${type} not found or unauthorized` });
        }

        const { parent, module, roadmap } = ownership;

        // Fetch existing quizzes
        const quizzes = await Quiz.find(
            { parentId: new mongoose.Types.ObjectId(parentId), parentType: type },
            null,
            { session }
        );

        // Check if all quizzes are attempted and failed (<80%)
        if (quizzes.length === 0) {
            logger.warn(`No quizzes found for ${type}:${parentId}`);
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ error: `No quizzes exist for this ${type.toLowerCase()}` });
        }

        const unattemptedQuizzes = quizzes.filter(q => q.attempts.length === 0);
        if (unattemptedQuizzes.length > 0) {
            logger.warn(`Unattempted quizzes found for ${type}:${parentId}`);
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ error: `Please attempt all existing quizzes for this ${type.toLowerCase()}` });
        }

        const allFailed = quizzes.every(q => {
            const latestAttempt = q.attempts[q.attempts.length - 1];
            const scorePercentage = (latestAttempt.score / latestAttempt.total) * 100;
            return scorePercentage < 80;
        });
        if (!allFailed) {
            logger.warn(`Not all quizzes failed for ${type}:${parentId}`);
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ error: `Not all quizzes have a score below 80%` });
        }

        // Collect existing questions to avoid repetition
        const existingQuestions = quizzes.flatMap(q => q.questions.map(q => q.question));

        // Generate new quiz
        const quizData = await generateQuiz(
            parent,
            type,
            type === 'Lesson' ? module : null,
            existingQuestions
        );
        const newQuiz = new Quiz({
            quizId: `quiz_${uuidv4()}`,
            parentId: parent._id,
            parentType: type,
            questions: quizData.questions,
            attempts: [],
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        await newQuiz.save({ session });
        logger.debug(`New quiz created for ${type}:${parentId}, quizId:${newQuiz._id}`);

        // Deactivate existing quizzes
        await Quiz.updateMany(
            { parentId: parent._id, parentType: type, _id: { $ne: newQuiz._id } },
            { isActive: false, updatedAt: new Date() },
            { session }
        );
        logger.debug(`Deactivated existing quizzes for ${type}:${parentId}`);

        // Add new quiz to parent
        if (type === 'Lesson') {
            await Lesson.updateOne(
                { _id: parent._id },
                { $push: { quizId: newQuiz._id }, updatedAt: new Date() },
                { session }
            );
        } else {
            // Assuming Module has quizId as array; adjust if single ObjectId
            await Module.updateOne(
                { _id: parent._id },
                { $push: { quizId: newQuiz._id }, updatedAt: new Date() },
                { session }
            );
        }
        logger.debug(`Added new quizId:${newQuiz._id} to ${type}:${parentId}`);

        await session.commitTransaction();
        session.endSession();
        logger.info(`New quiz created for ${type}:${parentId} by user:${userId}`);

        return res.status(201).json({
            status: 'success',
            message: `New quiz created for ${type.toLowerCase()}`,
            quizId: newQuiz._id,
            quiz: {
                quizId: newQuiz.quizId,
                questions: newQuiz.questions,
                createdAt: newQuiz.createdAt,
            },
        });
    } catch (error: any) {
        await session.abortTransaction();
        session.endSession();
        logger.error(`Error creating new quiz: ${error.message}`, {
            stack: error.stack,
        });
        return res.status(500).json({ error: 'Internal server error', message: error.message });
    }
};