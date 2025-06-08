import { NextFunction, Request, Response } from 'express';
import mongoose, { Types } from 'mongoose';
import { LearningRoadmap, ILearningRoadmap } from '../../models/students/learning-roadmap.model';
import { Module, IModule } from '../../models/students/module.model';
import { Lesson, ILesson } from '../../models/students/lesson.model';
import { Resource, IResource } from '../../models/students/resource.model';
import { UserProgress } from '../../models/students/user-progress.model';
import { fetchAssessment, fetchPersonalization, generateLearningRoadmapStructure } from '../../utlis/helper/learning-roadmap.helper';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { google, youtube_v3 } from 'googleapis';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { cleanJsonResponse } from '../../utlis/cleanJson.helper';
import { redis } from '../../utlis/redis';
import { logger } from '../../utlis/logger';

// Initialize APIs
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY,
});
const customSearch = google.customsearch({
  version: 'v1',
  auth: process.env.GOOGLE_API_KEY,
});

// Interface for request body
interface CreatePlaylistRequest extends Request {
  body: {
    userId: string;
    assessmentId: string;
    playlistPersonalizationId: string;
  };
}

// Interface for Gemini-generated roadmap structure
interface GeneratedRoadmap {
  title: string;
  description: string;
  overview: string;
  tags: string[];
  modules: {
    title: string;
    description: string;
    lessons: {
      title: string;
      description: string;
      topics: string[];
      searchPhrases: {
        video: string[];
        article: string[];
      };
    }[];
  }[];
}

// Fetch YouTube videos for a lesson
async function fetchYouTubeVideos(searchPhrases: string[]): Promise<IResource[]> {
  const cacheKey = `youtube:${searchPhrases.map(p => p.toLowerCase()).join('|')}`;
  const cachedVideos = await redis.get(cacheKey);
  if (cachedVideos) {
    console.log(`Returning cached videos for search phrases: ${searchPhrases.join(', ')}`);
    return JSON.parse(cachedVideos);
  }

  const videos: IResource[] = [];

  function isLikelyEnglish(text: string): boolean {
    const asciiRatio = text.replace(/[^a-zA-Z\s]/g, '').length / (text.length || 1);
    return asciiRatio > 0.7;
  }

  function cleanTextForSentiment(text: string): string {
    return text.replace(/[^\x20-\x7E]/g, ' ').replace(/\s+/g, ' ').trim();
  }

  async function analyzeSentiment(text: string): Promise<IResource['sentiment']> {
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
      console.error('Sentiment analysis failed:', error);
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
        console.log(`No videos found for phrase: ${phrase}`);
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
          console.log(`Skipping video ${video.id} due to non-English content`);
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

    for (const candidate of videoCandidates.slice(0, 2)) {
      const item = candidate.item;
      const stats = candidate.stats;
      if (!item.id?.videoId) continue;

      const resourceId = `youtube_${item.id.videoId}`;
      let resource = await Resource.findOne({ resourceId });

      if (resource) {
        console.log(`Reusing existing resource with ID ${resourceId}`);
        videos.push(resource);
        continue;
      }

      const durationIso = stats.contentDetails?.duration || 'PT0S';
      const durationMatch = durationIso.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
      const hours = durationMatch && durationMatch[1] ? parseInt(durationMatch[1]) * 3600 : 0;
      const minutes = durationMatch && durationMatch[2] ? parseInt(durationMatch[2]) * 60 : 0;
      const seconds = durationMatch && durationMatch[3] ? parseInt(durationMatch[3]) : 0;
      const durationSeconds = hours + minutes + seconds;

      let sentiment: IResource['sentiment'] = { score: '0', message: 'No comments available' };
      const sentimentKey = `youtube_${item.id.videoId}_sentiment`;
      const cachedSentiment = await redis.get(sentimentKey);
      if (cachedSentiment) {
        console.log(`Using cached sentiment for video ${item.id.videoId}`);
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
            console.error('Sentiment analysis error:', error);
            sentiment = { score: '0', message: 'Sentiment analysis failed' };
          }
          await redis.setex(sentimentKey, 30 * 24 * 60 * 60, JSON.stringify(sentiment));
        }
      }

      resource = {
        resourceId,
        lessonId: null as any,
        title: item.snippet?.title || 'Untitled Video',
        type: 'youtube',
        status: 'unlocked',
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

      videos.push(resource as any);
    }
  } catch (error: any) {
    if (error.code === 403 && error.message.includes('quota')) {
      console.error('YouTube API quota exceeded');
    } else {
      console.error('Error fetching YouTube videos:', error);
    }
  }

  await redis.setex(cacheKey, 30 * 24 * 60 * 60, JSON.stringify(videos));
  return videos;
}

// Fetch articles using Google Custom Search API
async function fetchArticles(searchPhrases: string): Promise<IResource[]> {
  const cacheKey = `articles:${searchPhrases.toLowerCase()}`;
  const cachedArticles = await redis.get(cacheKey);
  if (cachedArticles) {
    console.log(`Returning cached articles for search phrases: ${searchPhrases}`);
    return JSON.parse(cachedArticles);
  }

  const articles: IResource[] = [];

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
        num: 2,
      },
    });

    for (const item of response.data.items || []) {
      if (item.link?.includes('youtube.com') || item.link?.includes('youtu.be')) {
        console.log(`Skipping YouTube link in articles: ${item.link}`);
        continue;
      }

      const resourceId = `article_${uuidv4()}`;
      const existingResource = await Resource.findOne({ resourceId });
      if (existingResource) {
        console.log(`Reusing existing resource with ID ${resourceId}`);
        articles.push(existingResource);
        continue;
      }

      const title = (item.title || '').toLowerCase();
      if (!isLikelyEnglish(title)) {
        console.log(`Skipping article ${item.link} due to non-English content`);
        continue;
      }

      articles.push({
        resourceId,
        lessonId: null as any,
        title: item.title || 'Untitled Article',
        type: 'article',
        status: 'unlocked',
        url: item.link || '',
        thumbnailUrl: item.pagemap?.metatags?.[0]?.['og:image'] || '',
        sentiment: { score: '0', message: 'No sentiment analysis for articles' },
        xpEarned: 10,
        metadata: { source: item.displayLink || '' },
        createdAt: new Date(),
        updatedAt: new Date(),
      } as any);
    }
  } catch (error: any) {
    console.error('Error fetching articles:', error.message || error);
    if (error.response?.status === 403) {
      console.error('Check GOOGLE_SEARCH_API_KEY and GOOGLE_CSE_ID for validity and permissions');
    }
  }

  await redis.setex(cacheKey, 30 * 24 * 60 * 60, JSON.stringify(articles));
  return articles;
}

// Create resources for a lesson
async function createLessonResources(
  searchPhrases: { video: string[]; article: string[] },
  lessonId: Types.ObjectId
): Promise<{ resourceIds: Types.ObjectId[]; lessonDuration: number }> {
  const resourceIds: Types.ObjectId[] = [];
  let highestSentimentVideo: IResource | null = null;
  let maxSentimentScore = -Infinity;

  const videos = await fetchYouTubeVideos(searchPhrases.video);
  for (const video of videos) {
    const existingResource = await Resource.findOne({ resourceId: video.resourceId });
    let resourceId: Types.ObjectId;

    if (existingResource) {
      console.log(`Reusing existing resource with ID ${video.resourceId} for lesson ${lessonId}`);
      resourceId = existingResource._id as Types.ObjectId;

      if (!existingResource.lessonId || !existingResource.lessonId.equals(lessonId)) {
        await Resource.updateOne(
          { _id: existingResource._id },
          { $set: { lessonId, updatedAt: new Date() } }
        );
      }
    } else {
      video.lessonId = lessonId;
      const savedResource = await Resource.create(video);
      resourceId = savedResource._id as any;
    }

    resourceIds.push(resourceId);

    const sentimentScore = parseFloat(video.sentiment.score);
    if (sentimentScore > maxSentimentScore) {
      maxSentimentScore = sentimentScore;
      highestSentimentVideo = video;
    }
  }

  const articles = await fetchArticles(searchPhrases.article[0]);
  for (const article of articles) {
    const existingResource = await Resource.findOne({ resourceId: article.resourceId });
    let resourceId: Types.ObjectId;

    if (existingResource) {
      console.log(`Reusing existing resource with ID ${article.resourceId} for lesson ${lessonId}`);
      resourceId = existingResource._id as Types.ObjectId;

      if (!existingResource.lessonId || !existingResource.lessonId.equals(lessonId)) {
        await Resource.updateOne(
          { _id: existingResource._id },
          { $set: { lessonId, updatedAt: new Date() } }
        );
      }
    } else {
      article.lessonId = lessonId;
      const savedResource = await Resource.create(article);
      resourceId = savedResource._id as any;
    }

    resourceIds.push(resourceId);
  }

  const lessonDuration = highestSentimentVideo
    ? highestSentimentVideo.metadata.duration || 0
    : 0;

  return { resourceIds, lessonDuration };
}

// Create lessons for the first module only
async function createFirstLesson(
  module: GeneratedRoadmap['modules'][0],
  moduleId: Types.ObjectId
): Promise<Types.ObjectId[]> {
  const lessonIds: Types.ObjectId[] = [];

  // Ensure lessons is an array
  const lessons = Array.isArray(module.lessons) ? module.lessons : [];

  // Create first lesson with resources if available
  if (lessons.length > 0) {
    const lessonData = lessons[0];
    const lesson: any = {
      lessonId: `lesson_${uuidv4()}`,
      moduleId,
      title: lessonData.title || 'Untitled Lesson',
      description: lessonData.description || 'Lesson description.',
      status: 'in-progress',
      resourceIds: [],
      quizId: null,
      topics: Array.isArray(lessonData.topics) ? lessonData.topics : [],
      isSupplemental: false,
      metadata: {},
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const savedLesson = await Lesson.create(lesson);
    const { resourceIds, lessonDuration } = await createLessonResources(
      lessonData.searchPhrases || { video: [], article: [] },
      savedLesson._id as any
    );
    await Lesson.updateOne(
      { _id: savedLesson._id },
      { resourceIds, metadata: { duration: lessonDuration }, updatedAt: new Date() }
    );
    lessonIds.push(savedLesson._id as any);
  }

  // Create remaining lessons without resources
  for (let lIndex = 1; lIndex < lessons.length; lIndex++) {
    const lessonData = lessons[lIndex];
    const lesson: any = {
      lessonId: `lesson_${uuidv4()}`,
      moduleId,
      title: lessonData.title || 'Untitled Lesson',
      description: lessonData.description || 'Lesson description.',
      status: 'locked',
      resourceIds: [],
      quizId: null,
      topics: Array.isArray(lessonData.topics) ? lessonData.topics : [],
      isSupplemental: false,
      metadata: {},
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const savedLesson = await Lesson.create(lesson);
    lessonIds.push(savedLesson._id as any);
  }

  return lessonIds;
}

// Create modules for the roadmap
async function createModules(roadmapData: GeneratedRoadmap, roadmapId: Types.ObjectId): Promise<Types.ObjectId[]> {
  const moduleIds: Types.ObjectId[] = [];

  // Ensure modules is an array
  const modules = Array.isArray(roadmapData.modules) ? roadmapData.modules : [];

  for (let mIndex = 0; mIndex < modules.length; mIndex++) {
    const moduleData = modules[mIndex];
    const module: any = {
      moduleId: `module_${uuidv4()}`,
      roadmapId,
      title: moduleData.title || 'Untitled Module',
      description: moduleData.description || 'Module description.',
      status: mIndex === 0 ? 'in-progress' : 'locked',
      lessonIds: [],
      quizId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const savedModule = await Module.create(module);
    // Only create lessons for the first module
    if (mIndex === 0) {
      module.lessonIds = await createFirstLesson(moduleData, savedModule._id as any);
    }
    await Module.updateOne({ _id: savedModule._id }, { lessonIds: module.lessonIds, updatedAt: new Date() });
    moduleIds.push(savedModule._id as any);
  }

  return moduleIds;
}

// Create learning roadmap endpoint
export const createLearningRoadmap = async (req: CreatePlaylistRequest, res: Response) => {
  try {
    const userId = req?.user?._id as string;
    const { assessmentId, playlistPersonalizationId } = req.body;

    // Validate input
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(assessmentId) || !mongoose.Types.ObjectId.isValid(playlistPersonalizationId)) {
      return res.status(400).json({ error: 'Invalid userId, assessmentId, or playlistPersonalizationId' });
    }

    // Early check for existing roadmap
    const existingLearningRoadmap = await LearningRoadmap.findOne({
      userId: new Types.ObjectId(userId),
      assessment: new Types.ObjectId(assessmentId),
      playlistPersonalization: new Types.ObjectId(playlistPersonalizationId),
    });

    if (existingLearningRoadmap) {
      return res.status(201).json({
        error: 'Learning roadmap already exists for this assessment and personalization',
        roadmapId: existingLearningRoadmap._id,
      });
    }

    const session = await mongoose.startSession();
    session.startTransaction({ readConcern: { level: 'snapshot' } });

    try {
      // Check if user exists
      const user = await mongoose.model('User').findById(userId).session(session);
      if (!user) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({ error: 'User not found' });
      }

      // Check if assessment exists
      const assessment = await fetchAssessment(assessmentId);
      if (!assessment) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({ error: 'Assessment not found' });
      }

      // Check if playlist personalization exists
      const personalization = await fetchPersonalization(playlistPersonalizationId);
      if (!personalization) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({ error: 'Playlist personalization not found' });
      }

      // Check if the assessment and personalization belong to the user
      if (assessment.userId.toString() !== userId || personalization.userId.toString() !== userId) {
        await session.abortTransaction();
        session.endSession();
        return res.status(403).json({ error: 'You are not authorized to create a roadmap for this assessment and personalization' });
      }

      // Generate learning roadmap structure using Gemini
      const roadmapData = await generateLearningRoadmapStructure(assessment, personalization);

      // Create roadmap
      const roadmap: any = {
        userId: new Types.ObjectId(userId),
        assessment: new Types.ObjectId(assessmentId),
        playlistPersonalization: new Types.ObjectId(playlistPersonalizationId),
        title: roadmapData.title,
        description: roadmapData.description,
        overview: roadmapData.overview || '',
        tags: roadmapData.tags,
        modules: [],
        status: 'active',
        metadata: { totalXp: 0, source: 'gemini' },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const savedRoadmap = await LearningRoadmap.create([roadmap], { session });
      const roadmapId = savedRoadmap[0]._id;

      // Create modules (with lessons only for the first module)
      roadmap.modules = await createModules(roadmapData, roadmapId as any);

      // Update roadmap with module IDs
      await LearningRoadmap.updateOne({ _id: roadmapId }, { modules: roadmap.modules, updatedAt: new Date() }, { session });

      // Initialize user progress
      await UserProgress.create([{
        userId: new Types.ObjectId(userId),
        roadmapId,
        completedResources: [],
        completedLessons: [],
        completedModules: [],
        failedQuizLessons: [],
        totalXp: 0,
        progressPercentage: 0,
        lastUpdated: new Date(),
      }], { session });

      await session.commitTransaction();
      session.endSession();

      // Fetch populated roadmap
      const populatedRoadmap = await LearningRoadmap.findById(roadmapId)
        .populate({
          path: 'modules',
          model: 'LearningRoadmapModule',
          populate: {
            path: 'lessonIds',
            model: 'LearningRoadmapLesson',
            populate: { path: 'resourceIds', model: 'LearningRoadmapResource' },
          },
        })
        .populate({
          path: 'userId',
          select: '_id name email',
          model: 'User',
        });

      // Calculate total lessons safely
      const totalLessons = populatedRoadmap?.modules
        ? populatedRoadmap.modules.reduce((sum, module: any) => sum + (Array.isArray(module.lessonIds) ? module.lessonIds.length : 0), 0)
        : 0;

      return res.status(201).json({
        message: 'Learning roadmap created successfully',
        roadmapId: populatedRoadmap?._id,
        roadmap: {
          ...populatedRoadmap?.toObject(),
          moduleCount: populatedRoadmap?.modules?.length || 0,
          lessonCount: totalLessons,
        },
      });
    } catch (error: any) {
      await session.abortTransaction();
      session.endSession();
      if (error.code === 11000) {
        // Handle duplicate key error
        const existingRoadmap = await LearningRoadmap.findOne({
          userId: new Types.ObjectId(userId),
          assessment: new Types.ObjectId(assessmentId),
          playlistPersonalization: new Types.ObjectId(playlistPersonalizationId),
        });
        if (existingRoadmap) {
          return res.status(201).json({
            error: 'Learning roadmap already exists for this assessment and personalization',
            roadmapId: existingRoadmap._id,
          });
        }
      }
      throw error;
    }
  } catch (error: any) {
    console.error('Error creating learning roadmap:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

// Get playlist by ID with populated modules and lessons
export const getLearningRoadmapById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { learningRoadmapId } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(learningRoadmapId)) {
      return res.status(400).json({ error: 'Invalid playlist ID' });
    }

    // Fetch the roadmap without population first to inspect modules array
    const roadmap = await LearningRoadmap.findById(learningRoadmapId);
    if (!roadmap) {
      return res.status(404).json({ error: 'Learning Roadmap not found' });
    }

    // Check if modules array is empty before population
    if (!roadmap.modules || roadmap.modules.length === 0) {
      console.warn(`No modules found in roadmap ${learningRoadmapId}`);
      return res.status(200).json({
        message: 'Learning Roadmap fetched successfully, but no modules exist',
        data: roadmap,
      });
    }

    // Populate modules, lessons, and resources
    const data = await LearningRoadmap.findById(learningRoadmapId)
      .populate({
        path: 'modules',
        model: 'LearningRoadmapModule', // Explicitly specify model to avoid schema mismatch
        populate: {
          path: 'lessonIds',
          model: 'LearningRoadmapLesson', // Explicitly specify model
          populate: [{
            path: 'resourceIds',
            model: 'LearningRoadmapResource', // Explicitly specify model
          }, {
            path: 'quizId',
            model: 'LearningRoadmapQuiz', // Explicitly specify model
            select: '-questions'
          }],
        },
      })
      .populate({
        path: 'userId',
        select: '_id name email',
        model: 'User', // Explicitly specify model
      });

    if (!data) {
      return res.status(404).json({ error: 'Learning Roadmap not found after population' });
    }

    return res.status(200).json({
      message: 'Learning Roadmap fetched successfully',
      data,
    });
  } catch (error: any) {
    console.error('Error fetching Learning Roadmap:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
};


// Helper to verify resource ownership
async function verifyResourceOwnership(
  resourceId: string,
  userId: string
): Promise<{ resource: any; lesson: any } | null> {
  // Check cache
  const cacheKey = `resource:${resourceId}:user:${userId}`;
  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  // Use aggregation to verify ownership in one query
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
        'resource.status': { $ne: 'locked' },
      },
    },
    {
      $project: {
        resource: '$$ROOT',
        lesson: 1,
      },
    },
  ]);

  if (result.length === 0) return null;

  // Cache result for 5 minutes
  await redis.setex(cacheKey, 300, JSON.stringify(result[0]));
  return result[0];
}

export const getResourceById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { resourceId } = req.params;
    const userId = req.user?._id as any;

    // Validate inputs
    if (!userId) {

      return res.status(401).json({ error: 'Unauthorized' });
    }
    if (!mongoose.Types.ObjectId.isValid(resourceId) || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid resourceId or userId' });
    }

    // Verify ownership and get resource
    const result = await verifyResourceOwnership(resourceId, userId);
    if (!result) {

      return res.status(403).json({ error: 'Forbidden: Resource not found or unauthorized' });
    }

    const { resource } = result;

    return res.status(200).json({
      status: 'success',
      message: 'Resource retrieved successfully',
      resource,
    });
  } catch (error: any) {

    return res.status(500).json({ error: 'Internal server error' });
  }
};


export const myLearningRoadmap = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;

    // Validate user authentication
    if (!user?._id) {
      logger.warn('Unauthorized access attempt: No user in request');
      return res.status(401).json({ error: 'Unauthorized: No user authenticated' });
    }
    const userId = user._id as any;

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      logger.warn(`Invalid userId: ${userId}`);
      return res.status(400).json({ error: 'Invalid userId' });
    }

    // Check cache
    const cacheKey = `roadmap:card:user:${userId}`;
    const cachedRoadmap = await redis.get(cacheKey);
    if (cachedRoadmap) {
      logger.debug(`Cache hit for roadmap:card:user:${userId}`);
      return res.status(200).json({
        status: 'success',
        data: JSON.parse(cachedRoadmap),
      });
    }

    // Fetch roadmap with minimal data
    const roadmap = await LearningRoadmap.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: 'learningroadmapmodules',
          localField: '_id',
          foreignField: 'roadmapId',
          as: 'modules',
        },
      },
      {
        $lookup: {
          from: 'learningroadmaplessons',
          let: { moduleIds: '$modules._id' },
          pipeline: [
            { $match: { $expr: { $in: ['$moduleId', '$$moduleIds'] } } },
          ],
          as: 'lessons',
        },
      },
      {
        $lookup: {
          from: 'userprogresses',
          localField: '_id',
          foreignField: 'roadmapId',
          as: 'progress',
        },
      },
      { $unwind: { path: '$progress', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          roadmapId: '$_id',
          title: 1,
          description: 1,
          moduleCount: { $size: '$modules' },
          lessonCount: { $size: '$lessons' },
          progressPercentage: '$progress.progressPercentage',
          totalXp: '$progress.totalXp',
          createdAt: 1,
          _id: 0,
        },
      },
    ]);

    if (!roadmap || roadmap.length === 0) {
      logger.warn(`No roadmap found for user:${userId}`);
      return res.status(200).json({ 
        status: 'success',
        data: {},
       });
    }

    // Cache result
    await redis.setex(cacheKey, 300, JSON.stringify(roadmap));
    logger.debug(`Cached roadmap card for user:${userId}`);

    return res.status(200).json({
      status: 'success',
      data: roadmap,
    });
  } catch (error: any) {
    logger.error(`Error fetching roadmap card for user:${req.user?._id}: ${error.message}`, {
      stack: error.stack,
    });
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};