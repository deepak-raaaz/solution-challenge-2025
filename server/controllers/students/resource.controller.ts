import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Resource } from '../../models/students/resource.model';
import { Lesson } from '../../models/students/lesson.model';
import { Module } from '../../models/students/module.model';
import { LearningRoadmap } from '../../models/students/learning-roadmap.model';
import { UserProgress } from '../../models/students/user-progress.model';
import { Quiz } from '../../models/students/quiz.model';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { redis } from '../../utlis/redis';
import { cleanJsonResponse } from '../../utlis/cleanJson.helper';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '../../utlis/logger';



// Interface for request params
interface SetResourceCompletedParams {
  resourceId: string;
}

// Helper to verify resource ownership
async function verifyResourceOwnership(
  resourceId: string,
  userId: string
): Promise<{ resource: any; lesson: any; module: any; roadmap: any } | null> {
  const cacheKey = `resource:${resourceId}:user:${userId}`;
  const cached = await redis.get(cacheKey);
  if (cached) {
    logger.debug(`Cache hit for resource:${resourceId}:user:${userId}`);
    return JSON.parse(cached);
  }

  logger.debug(`Verifying ownership for resource:${resourceId}, user:${userId}`);
  const result = await Resource.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(resourceId) } },
    {
      $lookup: {
        from: 'learningroadmaplessons',
        localField: '_id',
        foreignField: 'resourceIds',
        as: 'lesson',
      },
    },
    { $unwind: { path: '$lesson', preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: 'learningroadmapmodules',
        localField: 'lesson.moduleId',
        foreignField: '_id',
        as: 'module',
      },
    },
    { $unwind: { path: '$module', preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: 'learningroadmaps',
        localField: 'module.roadmapId',
        foreignField: '_id',
        as: 'roadmap',
      },
    },
    { $unwind: { path: '$roadmap', preserveNullAndEmptyArrays: true } },
    {
      $match: {
        'roadmap.userId': new mongoose.Types.ObjectId(userId),
        'lesson.status': 'in-progress',
      },
    },
    {
      $project: {
        resource: '$$ROOT',
        lesson: 1,
        module: 1,
        roadmap: 1,
      },
    },
  ]);

  if (
    result.length === 0 ||
    !result[0]?.lesson?._id ||
    !result[0]?.module?._id ||
    !result[0]?.roadmap?._id
  ) {
    logger.warn(`Ownership verification failed for resource:${resourceId}, user:${userId}`);
    return null;
  }

  logger.debug(`Ownership verified for resource:${resourceId}, user:${userId}`);
  await redis.setex(cacheKey, 300, JSON.stringify(result[0]));
  return result[0];
}

// Helper to generate quiz using Gemini API
async function generateQuiz(lesson: any, module: any): Promise<any> {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `
    Generate a quiz for a lesson based on the following details:
    - Lesson Title: ${lesson.title || 'No title provided'}
    - Lesson Description: ${lesson.description || 'No description provided'}
    - Lesson Topics: ${JSON.stringify(lesson.topics || [])}
    - Module Title: ${module?.title || 'No module title'}
    - Module Description: ${module?.description || 'No module description'}

    ### Requirements:
    - Create a quiz with 10-15 multiple-choice questions.
    - Each question should have:
      - A clear question text.
      - 4 multiple-choice options.
      - The correct answer as a string (matching one of the options exactly).
      - A brief explanation for the correct answer.
    - Questions should cover the lesson's topics and align with the module's context.
    - Ensure questions are relevant, educational, and varied in difficulty.
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
    logger.debug(`Generating quiz for lesson:${lesson._id}`);
    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();
    const cleanedText = cleanJsonResponse(responseText);
    const quizData = JSON.parse(cleanedText);

    if (!quizData?.questions || !Array.isArray(quizData.questions) || quizData.questions.length < 10) {
      throw new Error('Invalid quiz structure or insufficient questions');
    }

    // Validate each question
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

    logger.debug(`Quiz generated successfully for lesson:${lesson._id}`);
    return quizData;
  } catch (error: any) {
    logger.error(`Failed to generate quiz for lesson:${lesson._id}: ${error.message}`);
    throw new Error('Quiz generation failed');
  }
}

export const setResourceCompleted = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { resourceId } = req.params as any;
    const user = req.user;

    // Validate user authentication
    if (!user?._id) {
      logger.warn('Unauthorized access attempt: No user in request');
      await session.abortTransaction();
      session.endSession();
      return res.status(401).json({ error: 'Unauthorized: No user authenticated' });
    }
    const userId = user._id;

    // Validate inputs
    if (!mongoose.Types.ObjectId.isValid(resourceId) || !mongoose.Types.ObjectId.isValid(userId as any)) {
      logger.warn(`Invalid input: resourceId:${resourceId}, userId:${userId}`);
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ error: 'Invalid resourceId or userId' });
    }

    // Verify ownership
    const ownership = await verifyResourceOwnership(resourceId, userId as any);
    if (!ownership) {
      logger.warn(`Unauthorized access by user:${userId} to resource:${resourceId}`);
      await session.abortTransaction();
      session.endSession();
      return res.status(403).json({ error: 'Forbidden: Resource not found or unauthorized' });
    }

    const { resource, lesson, module, roadmap } = ownership;

    // Log resource and lesson details for debugging
    logger.debug(`Processing resource:${resourceId}, lesson:${lesson._id}, module:${module._id}, roadmap:${roadmap._id}`);

    // Check if resource is already completed
    if (resource.status === 'completed') {
      logger.info(`Resource:${resourceId} already completed for user:${userId}`);
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ error: 'Resource is already completed' });
    }

    // Update resource status to completed
    await Resource.updateOne(
      { _id: resourceId },
      { status: 'completed', updatedAt: new Date() },
      { session }
    );
    logger.debug(`Updated resource:${resourceId} to completed`);

    // Update user progress
    const progress = await UserProgress.findOne(
      { userId, roadmapId: roadmap._id },
      null,
      { session }
    );
    if (!progress) {
      logger.error(`User progress not found for user:${userId}, roadmap:${roadmap._id}`);
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ error: 'User progress not found' });
    }

    if (!progress.completedResources.includes(resourceId)) {
      progress.completedResources.push(resourceId);
      progress.totalXp += 10; // Award 10 XP per resource
      const totalResources = lesson.resourceIds?.length || 1;
      progress.progressPercentage = Math.min(
        (progress.completedResources.length / totalResources) * 100,
        100
      );
      progress.lastUpdated = new Date();
      await progress.save({ session });
      logger.debug(`Updated progress for user:${userId}, XP:${progress.totalXp}, Progress:${progress.progressPercentage}%`);
    }

    // Check if there are more resources to unlock
    const lessonResources = await Resource.find(
      { _id: { $in: lesson.resourceIds || [] } },
      null,
      { session }
    );
    const lockedResources = lessonResources.filter(r => r.status === 'locked');
    if (lockedResources.length > 0) {
      // Unlock the next locked resource
      const nextResource = lockedResources[0];
      await Resource.updateOne(
        { _id: nextResource._id },
        { status: 'in-progress', updatedAt: new Date() },
        { session }
      );
      logger.debug(`Unlocked next resource:${nextResource._id} for lesson:${lesson._id}`);
    } else if (!lesson.quizId) {
      // All resources completed, no quiz exists, generate quiz
      logger.debug(`Generating quiz for lesson:${lesson._id}`);
      const quizData = await generateQuiz(lesson, module);
      const quiz = new Quiz({
        quizId: `quiz_${uuidv4()}`,
        parentId: lesson._id,
        parentType: 'Lesson',
        questions: quizData.questions,
        attempts: [],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await quiz.save({ session });

      // Update lesson with quizId
      await Lesson.updateOne(
        { _id: lesson._id },
        { quizId: quiz._id, updatedAt: new Date() },
        { session }
      );
      logger.debug(`Quiz created for lesson:${lesson._id}, quizId:${quiz._id}`);
    }

    await session.commitTransaction();
    session.endSession();
    logger.info(`Resource:${resourceId} marked as completed for user:${userId}`);

    return res.status(200).json({
      status: 'success',
      message: 'Resource marked as completed',
      quizGenerated: !lesson.quizId, // True if a quiz was generated (pre-update state)
    });
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    logger.error(`Error setting resource as completed: ${error.message}`, {
      stack: error.stack,
    });
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};