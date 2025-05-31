import { Request, Response, NextFunction } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PlaylistPersonalization, IPlaylistPersonalization, ITopic } from '../models/playlist-personalization.model';
import { Assessment, IAssessment } from '../models/assessment.model';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'YOUR_API_KEY');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const cleanJsonResponse = (text: string): string => {
    return text
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .replace(/^\s+|\s+$/g, '')
        .replace(/[\r\n]+/g, '');
};

const normalizePace = (pace: string): string => {
    if (typeof pace !== 'string') return pace;
    const lowerPace = pace.toLowerCase();
    if (lowerPace === 'moderate') return 'Moderate';
    if (lowerPace === 'relaxed') return 'Relaxed';
    if (lowerPace === 'intensive') return 'Intensive';
    return pace; // Return original if no match
};

// generate new assessment using prompt and user preferences
export const generateAssessment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?._id;
        console.log('User ID:', userId);

        // Normalize request body to handle typos and duplicates
        const {
            estimatedDuration,
            resourcesType,
            difficulty,
            language,
            pace: rawPace,
            prompt,
            platforms: bodyPlatforms,
            platfroms: typoPlatforms, // Handle typo
            questionsTypes,
            resources,
            topics,
        } = req.body;

        console.log('Request Body:', JSON.stringify(req.body, null, 2));

        // Normalize pace
        const pace = normalizePace(rawPace);

        // Use platforms from body or typo fallback
        const platforms = bodyPlatforms || typoPlatforms;

        // Validate required fields
        const missingFields: string[] = [];
        if (!userId) missingFields.push('userId');
        if (!estimatedDuration) missingFields.push('estimatedDuration');
        if (!resourcesType) missingFields.push('resourcesType');
        if (!difficulty) missingFields.push('difficulty');
        if (!language) missingFields.push('language');
        if (!pace) missingFields.push('pace');
        if (!prompt) missingFields.push('prompt');
        if (!platforms) missingFields.push('platforms');
        if (!questionsTypes) missingFields.push('questionsTypes');
        if (!resources) missingFields.push('resources');
        if (!topics) missingFields.push('topics');

        if (missingFields.length > 0) {
            return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
        }

        // Save PlaylistPersonalization
        const personalization = new PlaylistPersonalization({
            userId,
            estimatedDuration,
            resourcesType,
            difficulty,
            language,
            pace,
            prompt,
            platforms,
            questionsTypes,
            resources,
            topics,
        });

        await personalization.save();

        // Generate assessment questions using Gemini AI
        const geminiPrompt = `
        You are an AI assistant for an educational platform, Edu AI, that generates personalized learning assessments. The user has provided the following personalization details:
        - Prompt: "${prompt}"
        - Difficulty: ${difficulty}
        - Topics: ${JSON.stringify(topics)}
        - Question Types: ${JSON.stringify(questionsTypes)}
        
        Your task is to generate an assessment with 5 questions based on the provided details. Each question should:
        - Match the specified difficulty level (${difficulty}).
        - Cover the topics (${topics.map((t: ITopic) => t.name).join(', ')}).
        - Be of a type specified in ${questionsTypes.join(', ')} (e.g., Multiple Choice, Coding Challenge).
        - For Multiple Choice questions, include 4 options, a correct answer, and an explanation.
        - For Coding Challenges, provide a problem statement, a correct answer (sample solution), and an explanation (no options).
        
        Return the questions as a JSON array of objects, each with:
        - type: "Multiple Choice" | "Coding Challenge" | "Practical Project"
        - question: string
        - options: string[] (empty for Coding Challenge)
        - correctAnswer: string
        - explanation: string
        
        Ensure the output is valid JSON without additional explanations or markdown formatting.
      `;

        const result = await model.generateContent(geminiPrompt);
        const response = await result.response;
        const cleanedText = cleanJsonResponse(response.text());

        // Parse and validate questions
        let questions: IAssessment['questions'];
        try {
            questions = JSON.parse(cleanedText);
            if (
                !Array.isArray(questions) ||
                !questions.every(
                    (q) =>
                        q.type &&
                        ['Multiple Choice', 'Coding Challenge', 'Practical Project'].includes(q.type) &&
                        typeof q.question === 'string' &&
                        Array.isArray(q.options) &&
                        typeof q.correctAnswer === 'string' &&
                        typeof q.explanation === 'string'
                )
            ) {
                throw new Error('Invalid questions format');
            }
        } catch (parseError) {
            return res.status(500).json({ error: 'Failed to parse assessment questions' });
        }

        // Save Assessment
        const assessment = new Assessment({
            playlistPersonalizationId: personalization._id,
            userId,
            questions,
            userAnswers: [],
            isSubmitted: false,
            score: 0,
            maxScore: questions.length,
        });

        await assessment.save();

        // Return assessment questions
        return res.status(201).json({
            message: 'Assessment generated successfully',
            assessmentId: assessment._id,
            questions,
        });
    } catch (error) {
        next(error);
    }
};

// Retrieve assessment by ID
export const getAssessment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { assessmentId } = req.params;

        if (!assessmentId) {
            return res.status(400).json({ error: 'Assessment ID is required' });
        }

        const assessment = await Assessment.findById(assessmentId)
            .populate('playlistPersonalizationId')
            .exec();

        if (!assessment) {
            return res.status(404).json({ error: 'Assessment not found' });
        }

        return res.status(200).json({
            message: 'Assessment retrieved successfully',
            playlistPersonalizationId: assessment.playlistPersonalizationId._id,
            assessmentId: assessment._id,
            questions: assessment.questions,
        });
    } catch (error) {
        next(error);
    }
}

// Retrieve playlist personalization by ID
export const getPlaylistPersonalization = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { personalizationId } = req.params;

        if (!personalizationId) {
            return res.status(400).json({ error: 'Personalization ID is required' });
        }

        const personalization = await PlaylistPersonalization.findById(personalizationId).exec();

        if (!personalization) {
            return res.status(404).json({ error: 'Personalization not found' });
        }

        return res.status(200).json({
            message: 'Playlist personalization retrieved successfully',
            personalization,
        });
    } catch (error) {
        next(error);
    }
}

// Submit assessment answers and calculate score
export const submitAssessment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { assessmentId } = req.params;
      const { userAnswers } = req.body;
  
      // Debug log to inspect incoming data
      console.log('Received request:', { assessmentId, userAnswers });
  
      if (!assessmentId) {
        return res.status(400).json({ error: 'Assessment ID is required' });
      }
  
      if (!userAnswers || !Array.isArray(userAnswers)) {
        return res.status(400).json({ error: 'User answers must be a non-empty array' });
      }
  
      const assessment = await Assessment.findById(assessmentId).exec();
  
      if (!assessment) {
        return res.status(404).json({ error: 'Assessment not found' });
      }
  
      // Validate user answers length
      if (userAnswers.length !== assessment.questions.length) {
        return res.status(400).json({ error: 'User answers do not match the number of questions' });
      }
  
      // Transform userAnswers to match IUserAnswer schema
      const transformedUserAnswers = userAnswers.map((answer: string, index: number) => {
        // Validate that the answer is a string and exists in the question's options
        if (typeof answer !== 'string' || !assessment.questions[index].options.includes(answer)) {
          throw new Error(`Invalid answer for question ${index}: ${answer}`);
        }
        return {
          questionIndex: index,
          selectedAnswer: answer,
        };
      });
  
      // Debug log to confirm transformation
      console.log('Transformed userAnswers:', transformedUserAnswers);
  
      // Calculate score
      let score = 0;
      assessment.questions.forEach((question, index) => {
        if (question.correctAnswer === transformedUserAnswers[index].selectedAnswer) {
          score++;
        }
      });
  
      // Update assessment with transformed user answers and score
      assessment.userAnswers = transformedUserAnswers;
      assessment.isSubmitted = true;
      assessment.score = score;
      assessment.maxScore = assessment.questions.length; // Ensure maxScore is set
  
      await assessment.save();
  
      // Debug log to confirm saved data
      console.log('Saved assessment:', {
        assessmentId: assessment._id,
        userAnswers: assessment.userAnswers,
        score,
        maxScore: assessment.maxScore,
      });
  
      return res.status(200).json({
        message: 'Assessment submitted successfully',
        score,
        maxScore: assessment.maxScore,
        assessmentId: assessment._id,
        playlistPersonalizationId: assessment.playlistPersonalizationId,
      });
    } catch (error) {
      console.error('Error in submitAssessment:', error);
      next(error);
    }
  };