import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Quiz } from '../../../models/students/quiz.model';
import { Lesson } from '../../../models/students/lesson.model';
import { Module } from '../../../models/students/module.model';
import { LearningRoadmap } from '../../../models/students/learning-roadmap.model';
import { redis } from '../../../utlis/redis';
import { logger } from '../../../utlis/logger';


// Interface for request params
interface GetQuizParams {
  quizId: string;
}

// Helper to verify quiz ownership
async function verifyQuizOwnership(
  quizId: string,
  userId: string
): Promise<{ quiz: any; lesson: any; module: any; roadmap: any } | null> {
  const cacheKey = `quiz:${quizId}:user:${userId}`;
  const cached = await redis.get(cacheKey);
  if (cached) {
    logger.debug(`Cache hit for quiz:${quizId}:user:${userId}`);
    return JSON.parse(cached);
  }

  logger.debug(`Verifying ownership for quiz:${quizId}, user:${userId}`);
  const result = await Quiz.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(quizId) } },
    {
      $lookup: {
        from: 'learningroadmaplessons',
        localField: 'parentId',
        foreignField: '_id',
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
        isActive: true,
      },
    },
    {
      $project: {
        quiz: '$$ROOT',
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
    logger.warn(`Ownership verification failed for quiz:${quizId}, user:${userId}`);
    return null;
  }

  logger.debug(`Ownership verified for quiz:${quizId}, user:${userId}`);
  await redis.setex(cacheKey, 300, JSON.stringify(result[0]));
  return result[0];
}

export const getQuizById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { quizId } = req.params as any;
    const user = req.user as any;

    // Validate user authentication
    if (!user?._id) {
      logger.warn('Unauthorized access attempt: No user in request');
      return res.status(401).json({ error: 'Unauthorized: No user authenticated' });
    }
    const userId = user._id;

    // Validate inputs
    if (!mongoose.Types.ObjectId.isValid(quizId) || !mongoose.Types.ObjectId.isValid(userId)) {
      logger.warn(`Invalid input: quizId:${quizId}, userId:${userId}`);
      return res.status(400).json({ error: 'Invalid quizId or userId' });
    }

    // Verify ownership
    const ownership = await verifyQuizOwnership(quizId, userId);
    if (!ownership) {
      logger.warn(`Unauthorized access by user:${userId} to quiz:${quizId}`);
      return res.status(403).json({ error: 'Forbidden: Quiz not found or unauthorized' });
    }

    const { quiz } = ownership;

    logger.debug(`Retrieved quiz:${quizId} for user:${userId}`);
    return res.status(200).json({
      status: 'success',
      message: 'Quiz retrieved successfully',
      quiz,
    });
  } catch (error: any) {
    logger.error(`Error retrieving quiz:${req.params.quizId}: ${error.message}`, {
      stack: error.stack,
    });
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};