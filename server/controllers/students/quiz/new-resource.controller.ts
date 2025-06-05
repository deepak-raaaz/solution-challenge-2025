import { Request, Response, NextFunction } from 'express';
import mongoose, { Types } from 'mongoose';
import { Quiz } from '../../../models/students/quiz.model';
import { Lesson } from '../../../models/students/lesson.model';
import { Module } from '../../../models/students/module.model';
import { LearningRoadmap } from '../../../models/students/learning-roadmap.model';
import { Resource } from '../../../models/students/resource.model';
import { google, youtube_v3 } from 'googleapis';
import axios from 'axios';
import { redis } from '../../../utlis/redis';
import { logger } from '../../../utlis/logger';
import { v4 as uuidv4 } from 'uuid';

// Initialize APIs
const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY,
});
const customSearch = google.customsearch({
  version: 'v1',
  auth: process.env.GOOGLE_API_KEY,
});



// Interface for request params
interface NewResourceParams {
  lessonId: string;
}

// Interface for request body
interface NewResourceBody {
  resourceType: 'video' | 'article';
}

// Helper to verify lesson ownership
async function verifyLessonOwnership(
  lessonId: string,
  userId: string
): Promise<{ lesson: any; module: any; roadmap: any } | null> {
  const cacheKey = `lesson:${lessonId}:user:${userId}`;
  const cached = await redis.get(cacheKey);
  if (cached) {
    logger.debug(`Cache hit for lesson:${lessonId}:user:${userId}`);
    return JSON.parse(cached);
  }

  logger.debug(`Verifying ownership for lesson:${lessonId}, user:${userId}`);
  const result = await Lesson.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(lessonId) } },
    {
      $lookup: {
        from: 'learningroadmapmodules',
        localField: 'moduleId',
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
      },
    },
    {
      $project: {
        lesson: '$$ROOT',
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
    logger.warn(`Ownership verification failed for lesson:${lessonId}, user:${userId}`);
    return null;
  }

  logger.debug(`Ownership verified for lesson:${lessonId}, user:${userId}`);
  await redis.setex(cacheKey, 300, JSON.stringify(result[0]));
  return result[0];
}

// Fetch YouTube videos (from createLearningRoadmap)
async function fetchYouTubeVideos(searchPhrases: string[]): Promise<any[]> {
  const cacheKey = `youtube:${searchPhrases.map(p => p.toLowerCase()).join('|')}`;
  const cachedVideos = await redis.get(cacheKey);
  if (cachedVideos) {
    logger.debug(`Returning cached videos for search phrases: ${searchPhrases.join(', ')}`);
    return JSON.parse(cachedVideos);
  }

  const videos: any[] = [];

  function isLikelyEnglish(text: string): boolean {
    const asciiRatio = text.replace(/[^a-zA-Z\s]/g, '').length / (text.length || 1);
    return asciiRatio > 0.7;
  }

  function cleanTextForSentiment(text: string): string {
    return text.replace(/[^\x20-\x7E]/g, ' ').replace(/\s+/g, ' ').trim();
  }

  async function analyzeSentiment(text: string): Promise<any> {
    try {
      const response = await axios.post(
        'https://language.googleapis.com/v1/documents:analyzeSentiment',
        { document: { type: 'PLAIN_TEXT', content: text } },
        { params: { key: process.env.GOOGLE_CLOUD_API_KEY } }
      );
      return {
        score: response.data.documentSentiment.score.toString(),
        message: response.data.documentSentiment.score > 0 ? 'positive' : response.data.documentSentiment.score < 0 ? 'negative' : 'neutral',
      };
    } catch (error) {
      logger.error('Sentiment analysis failed:', error);
      return { score: '0', message: 'Sentiment analysis failed' };
    }
  }

  try {
    const videoCandidates: { item: youtube_v3.Schema$SearchResult; stats: youtube_v3.Schema$Video }[] = [];

    for (const phrase of searchPhrases.slice(0, 3)) {
      const response = await youtube.search.list({
        part: ['snippet'],
        q: `"${phrase}"`,
        type: ['video'],
        maxResults: 10,
        order: 'relevance',
        regionCode: 'IN',
        videoCategoryId: '27',
        videoDuration: 'medium',
        videoDefinition: 'high',
        videoEmbeddable: 'true',
        videoSyndicated: 'true',
        publishedAfter: '2023-01-01T00:00:00Z',
      });

      const videoIds = (response.data.items || [])
        .filter(item => item.id?.videoId)
        .map(item => item.id!.videoId!);

      if (videoIds.length === 0) {
        logger.debug(`No videos found for phrase: ${phrase}`);
        continue;
      }

      const videoDetails = await youtube.videos.list({
        part: ['contentDetails', 'statistics', 'snippet'],
        id: videoIds,
      });

      for (const video of videoDetails.data.items || []) {
        const item = response.data.items?.find(i => i.id?.videoId === video.id);
        if (!item || !video.id) continue;

        const durationIso = video.contentDetails?.duration || 'PT0S';
        const durationMatch = durationIso.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
        const hours = durationMatch && durationMatch[1] ? parseInt(durationMatch[1]) * 3600 : 0;
        const minutes = durationMatch && durationMatch[2] ? parseInt(durationMatch[2]) * 60 : 0;
        const seconds = durationMatch && durationMatch[3] ? parseInt(durationMatch[3]) : 0;
        const durationSeconds = hours + minutes + seconds;

        if (durationSeconds < 300) continue;

        const title = (video.snippet?.title || '').toLowerCase();
        if (!isLikelyEnglish(title)) {
          logger.debug(`Skipping video ${video.id} due to non-English content`);
          continue;
        }

        videoCandidates.push({ item, stats: video });
      }
    }

    videoCandidates.sort((a, b) => {
      const aViews = parseInt(a.stats.statistics?.viewCount || '0');
      const aLikes = parseInt(a.stats.statistics?.likeCount || '0');
      const aComments = parseInt(a.stats.statistics?.commentCount || '0');
      const aDate = new Date(a.stats.snippet?.publishedAt || 0).getTime();
      const aLikeToViewRatio = aViews > 0 ? aLikes / aViews : 0;

      const bViews = parseInt(b.stats.statistics?.viewCount || '0');
      const bLikes = parseInt(b.stats.statistics?.likeCount || '0');
      const bComments = parseInt(b.stats.statistics?.commentCount || '0');
      const bDate = new Date(b.stats.snippet?.publishedAt || 0).getTime();
      const bLikeToViewRatio = bViews > 0 ? bLikes / bViews : 0;

      const aScore = (aViews * 0.4) + (aLikeToViewRatio * 1000 * 0.3) + (aComments * 0.2) + (aDate / (1000 * 60 * 60 * 24) * 0.1);
      const bScore = (bViews * 0.4) + (bLikeToViewRatio * 1000 * 0.3) + (bComments * 0.2) + (bDate / (1000 * 60 * 60 * 24) * 0.1);

      return bScore - aScore;
    });

    for (const candidate of videoCandidates.slice(0, 1)) {
      const item = candidate.item;
      const stats = candidate.stats;
      if (!item.id?.videoId) continue;

      const resourceId = `youtube_${item.id.videoId}`;
      let resource = await Resource.findOne({ resourceId });

      if (resource) {
        logger.debug(`Reusing existing resource with ID ${resourceId}`);
        videos.push(resource);
        continue;
      }

      const durationIso = stats.contentDetails?.duration || 'PT0S';
      const durationMatch = durationIso.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
      const hours = durationMatch && durationMatch[1] ? parseInt(durationMatch[1]) * 3600 : 0;
      const minutes = durationMatch && durationMatch[2] ? parseInt(durationMatch[2]) * 60 : 0;
      const seconds = durationMatch && durationMatch[3] ? parseInt(durationMatch[3]) : 0;
      const durationSeconds = hours + minutes + seconds;

      let sentiment: any = { score: '0', message: 'No comments available' };
      const sentimentKey = `youtube_${item.id.videoId}_sentiment`;
      const cachedSentiment = await redis.get(sentimentKey);
      if (cachedSentiment) {
        logger.debug(`Using cached sentiment for video ${item.id.videoId}`);
        sentiment = JSON.parse(cachedSentiment);
      } else {
        try {
          const commentsResponse = await youtube.commentThreads.list({
            part: ['snippet'],
            videoId: item.id.videoId,
            maxResults: 20,
            textFormat: 'plainText',
          });

          const comments = commentsResponse.data.items?.map(
            (item) => item.snippet?.topLevelComment?.snippet?.textDisplay || ''
          ) || [];

          const textForAnalysis = cleanTextForSentiment(comments.join(' '));
          if (textForAnalysis) {
            sentiment = await analyzeSentiment(textForAnalysis);
          } else {
            sentiment = { score: '0', message: 'No valid comments for sentiment analysis' };
          }
          await redis.setex(sentimentKey, 30 * 24 * 60 * 60, JSON.stringify(sentiment));
        } catch (error: any) {
          if (error?.response?.data?.error?.message?.includes('disabled comments')) {
            sentiment = { score: '0', message: 'Comments disabled' };
          } else {
            logger.error('Sentiment analysis error:', error);
            sentiment = { score: '0', message: 'Sentiment analysis failed' };
          }
          await redis.setex(sentimentKey, 30 * 24 * 60 * 60, JSON.stringify(sentiment));
        }
      }

      resource = {
        resourceId,
        lessonId: null,
        title: item.snippet?.title || 'Untitled Video',
        type: 'youtube',
        status: 'in-progress',
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        thumbnailUrl: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.default?.url || '',
        sentiment,
        xpEarned: 10,
        metadata: {
          channel: item.snippet?.channelTitle || '',
          duration: durationSeconds,
          views: parseInt(stats.statistics?.viewCount || '0'),
          likes: parseInt(stats.statistics?.likeCount || '0'),
          commentCount: parseInt(stats.statistics?.commentCount || '0'),
          publishedAt: stats.snippet?.publishedAt || new Date().toISOString(),
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      } as any;

      videos.push(resource);
    }
  } catch (error: any) {
    if (error.code === 403 && error.message.includes('quota')) {
      logger.error('YouTube API quota exceeded');
    } else {
      logger.error('Error fetching YouTube videos:', error);
    }
  }

  await redis.setex(cacheKey, 30 * 24 * 60 * 60, JSON.stringify(videos));
  return videos;
}

// Fetch articles using Google Custom Search API (from createLearningRoadmap)
async function fetchArticles(searchPhrases: string): Promise<any[]> {
  const cacheKey = `articles:${searchPhrases.toLowerCase()}`;
  const cachedArticles = await redis.get(cacheKey);
  if (cachedArticles) {
    logger.debug(`Returning cached articles for search phrases: ${searchPhrases}`);
    return JSON.parse(cachedArticles);
  }

  const articles: any[] = [];

  function isLikelyEnglish(text: string): boolean {
    const asciiRatio = text.replace(/[^a-zA-Z\s]/g, '').length / (text.length || 1);
    return asciiRatio > 0.7;
  }

  try {
    if (!process.env.GOOGLE_SEARCH_API_KEY || !process.env.GOOGLE_CSE_ID) {
      throw new Error('Missing GOOGLE_SEARCH_API_KEY or GOOGLE_CSE_ID environment variables');
    }

    const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
      params: {
        key: process.env.GOOGLE_SEARCH_API_KEY,
        cx: process.env.GOOGLE_CSE_ID,
        q: searchPhrases,
        num: 1,
      },
    });

    for (const item of response.data.items || []) {
      if (item.link?.includes('youtube.com') || item.link?.includes('youtu.be')) {
        logger.debug(`Skipping YouTube link in articles: ${item.link}`);
        continue;
      }

      const resourceId = `article_${uuidv4()}`;
      const existingResource = await Resource.findOne({ resourceId });
      if (existingResource) {
        logger.debug(`Reusing existing resource with ID ${resourceId}`);
        articles.push(existingResource);
        continue;
      }

      const title = (item.title || '').toLowerCase();
      if (!isLikelyEnglish(title)) {
        logger.debug(`Skipping article ${item.link} due to non-English content`);
        continue;
      }

      articles.push({
        resourceId,
        lessonId: null,
        title: item.title || 'Untitled Article',
        type: 'article',
        status: 'in-progress',
        url: item.link || '',
        thumbnailUrl: item.pagemap?.metatags?.[0]?.['og:image'] || '',
        sentiment: { score: '0', message: 'No sentiment analysis for articles' },
        xpEarned: 10,
        metadata: { source: item.displayLink || '' },
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  } catch (error: any) {
    logger.error('Error fetching articles:', error.message || error);
    if (error.response?.status === 403) {
      logger.error('Check GOOGLE_SEARCH_API_KEY and GOOGLE_CSE_ID for validity and permissions');
    }
  }

  await redis.setex(cacheKey, 30 * 24 * 60 * 60, JSON.stringify(articles));
  return articles;
}

// Create resources for a lesson
async function createTargetedResources(
  searchPhrases: string[],
  lessonId: Types.ObjectId,
  resourceType: 'video' | 'article'
): Promise<Types.ObjectId[]> {
  const resourceIds: Types.ObjectId[] = [];

  if (resourceType === 'video') {
    const videos = await fetchYouTubeVideos(searchPhrases);
    for (const video of videos) {
      const existingResource = await Resource.findOne({ resourceId: video.resourceId });
      let resourceId: any;

      if (existingResource) {
        logger.debug(`Reusing existing resource with ID ${video.resourceId} for lesson ${lessonId}`);
        resourceId = existingResource._id;

        if (!existingResource.lessonId || !existingResource.lessonId.equals(lessonId)) {
          await Resource.updateOne(
            { _id: existingResource._id },
            { $set: { lessonId, updatedAt: new Date() } }
          );
        }
      } else {
        video.lessonId = lessonId;
        const savedResource = await Resource.create(video);
        resourceId = savedResource._id;
      }

      resourceIds.push(resourceId);
    }
  } else if (resourceType === 'article') {
    const articles = await fetchArticles(searchPhrases[0] || '');
    for (const article of articles) {
      const existingResource = await Resource.findOne({ resourceId: article.resourceId });
      let resourceId: any;

      if (existingResource) {
        logger.debug(`Reusing existing resource with ID ${article.resourceId} for lesson ${lessonId}`);
        resourceId = existingResource._id;

        if (!existingResource.lessonId || !existingResource.lessonId.equals(lessonId)) {
          await Resource.updateOne(
            { _id: existingResource._id },
            { $set: { lessonId, updatedAt: new Date() } }
          );
        }
      } else {
        article.lessonId = lessonId;
        const savedResource = await Resource.create(article);
        resourceId = savedResource._id;
      }

      resourceIds.push(resourceId);
    }
  }

  return resourceIds;
}

// Analyze quiz to identify weak points
async function analyzeQuizWeakPoints(quiz: any, lesson: any): Promise<string[]> {
  if (!quiz.attempts || quiz.attempts.length === 0) {
    logger.debug(`No attempts found for quiz:${quiz._id}`);
    return lesson.topics || [lesson.title || ''];
  }

  // Get latest attempt
  const latestAttempt = quiz.attempts[quiz.attempts.length - 1];
  const weakPoints: string[] = [];

  // Analyze incorrect answers
  for (const answer of latestAttempt.userAnswers) {
    const question = quiz.questions[answer.questionIndex];
    if (!question || answer.selectedAnswer === question.correctAnswer) continue;

    // Assume question relates to lesson topics (no question-specific topics in schema)
    // Fallback to lesson title if topics are unavailable
    const topicIndex = answer.questionIndex % (lesson.topics?.length || 1);
    const weakTopic = lesson.topics?.[topicIndex] || lesson.title || '';
    if (weakTopic && !weakPoints.includes(weakTopic)) {
      weakPoints.push(weakTopic);
    }
  }

  // If no weak points identified, use all lesson topics or title
  if (weakPoints.length === 0) {
    logger.debug(`No weak points identified for quiz:${quiz._id}, using lesson topics`);
    return lesson.topics || [lesson.title || ''];
  }

  logger.debug(`Identified weak points for quiz:${quiz._id}: ${weakPoints.join(', ')}`);
  return weakPoints;
}

export const newResource = async (req: Request, res: Response, next: NextFunction) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { lessonId } = req.params as any;
    const { resourceType } = req.body as any;
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
    if (!mongoose.Types.ObjectId.isValid(lessonId) || !mongoose.Types.ObjectId.isValid(userId as any)) {
      logger.warn(`Invalid input: lessonId:${lessonId}, userId:${userId}`);
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ error: 'Invalid lessonId or userId' });
    }
    if (!['video', 'article'].includes(resourceType)) {
      logger.warn(`Invalid resourceType:${resourceType}`);
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ error: 'Invalid resourceType: must be "video" or "article"' });
    }

    // Verify ownership
    const ownership = await verifyLessonOwnership(lessonId, userId as any);
    if (!ownership) {
      logger.warn(`Unauthorized access by user:${userId} to lesson:${lessonId}`);
      await session.abortTransaction();
      session.endSession();
      return res.status(403).json({ error: 'Forbidden: Lesson not found or unauthorized' });
    }

    const { lesson } = ownership;

    // Find quiz for the lesson
    const quiz = await Quiz.findOne(
      { parentId: lesson._id, parentType: 'Lesson', isActive: true },
      null,
      { session }
    );
    if (!quiz) {
      logger.warn(`No quiz found for lesson:${lessonId}`);
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ error: 'No quiz found for this lesson' });
    }

    // Analyze quiz to identify weak points
    const weakPoints = await analyzeQuizWeakPoints(quiz, lesson);

    // Generate targeted resources
    const resourceIds = await createTargetedResources(weakPoints, lesson._id, resourceType);
    if (resourceIds.length === 0) {
      logger.warn(`No ${resourceType} resources generated for lesson:${lessonId}`);
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ error: `No ${resourceType} resources found for weak points` });
    }

    // Update lesson with new resource IDs
    await Lesson.updateOne(
      { _id: lesson._id },
      { $push: { resourceIds: { $each: resourceIds } }, updatedAt: new Date() },
      { session }
    );
    logger.debug(`Added ${resourceIds.length} ${resourceType} resources to lesson:${lessonId}`);

    await session.commitTransaction();
    session.endSession();
    logger.info(`Generated ${resourceIds.length} ${resourceType} resources for lesson:${lessonId}, user:${userId}`);

    return res.status(201).json({
      status: 'success',
      message: `New ${resourceType} resource(s) generated successfully`,
      resourceIds,
    });
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    logger.error(`Error generating new resource for lesson:${req.params.lessonId}: ${error.message}`, {
      stack: error.stack,
    });
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};