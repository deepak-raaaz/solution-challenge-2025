import { Request, Response, NextFunction } from 'express';
import mongoose, { Types } from 'mongoose';
import { Quiz } from '../../../models/students/quiz.model';
import { Lesson } from '../../../models/students/lesson.model';
import { Module } from '../../../models/students/module.model';
import { LearningRoadmap } from '../../../models/students/learning-roadmap.model';
import { UserProgress } from '../../../models/students/user-progress.model';
import { Resource } from '../../../models/students/resource.model';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { google, youtube_v3 } from 'googleapis';
import axios from 'axios';
import { redis } from '../../../utlis/redis';
import { logger } from '../../../utlis/logger';
import { cleanJsonResponse } from '../../../utlis/cleanJson.helper';
import { v4 as uuidv4 } from 'uuid';

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



// Interface for request params
interface SubmitQuizParams {
    quizId: string;
}

// Interface for request body
interface SubmitQuizBody {
    answers: { questionIndex: number; selectedAnswer: string }[];
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
      // Fetch quiz model instance for cached data
      const parsed = JSON.parse(cached);
      const quiz = await Quiz.findById(parsed.quiz._id);
      if (!quiz) return null;
      parsed.quiz = quiz;
      return parsed;
    }
  
    logger.debug(`Verifying ownership for quiz:${quizId}, user:${userId}`);
    
    // Fetch quiz as Mongoose model
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      logger.warn(`Quiz not found: ${quizId}`);
      return null;
    }
  
    const result = await Quiz.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(quizId) } },
      {
        $lookup: {
          from: 'learningroadmaplessons',
          let: { parentId: '$parentId' },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$parentId'] } } },
          ],
          as: 'lesson',
        },
      },
      { $unwind: { path: '$lesson', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'learningroadmapmodules',
          let: { parentId: '$parentId', lessonModuleId: '$lesson.moduleId' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $or: [
                    { $eq: ['$_id', '$$parentId'] },
                    { $eq: ['$_id', '$$lessonModuleId'] },
                  ],
                },
              },
            },
          ],
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
          lesson: 1,
          module: 1,
          roadmap: 1,
        },
      },
    ]);
  
    if (
      result.length === 0 ||
      !result[0]?.module?._id ||
      !result[0]?.roadmap?._id
    ) {
      logger.warn(`Ownership verification failed for quiz:${quizId}, user:${userId}`);
      return null;
    }
  
    logger.debug(`Ownership verified for quiz:${quizId}, user:${userId}`);
    const ownershipData = {
      quiz,
      lesson: result[0].lesson || null,
      module: result[0].module,
      roadmap: result[0].roadmap,
    };
    await redis.setex(cacheKey, 300, JSON.stringify({
      ...ownershipData,
      quiz: quiz.toObject(), // Serialize quiz for caching
    }));
    return ownershipData;
  }

// Helper to generate quiz using Gemini API
async function generateQuiz(parent: any, parentType: 'Lesson' | 'Module'): Promise<any> {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
    Generate a quiz for a ${parentType.toLowerCase()} based on the following details:
    - ${parentType} Title: ${parent.title || 'No title provided'}
    - ${parentType} Description: ${parent.description || 'No description provided'}
    - ${parentType} Topics: ${JSON.stringify(parent.topics || [])}

    ### Requirements:
    - Create a quiz with 10-15 multiple-choice questions.
    - Each question should have:
      - A clear question text.
      - 4 multiple-choice options.
      - The correct answer as a string (matching one of the options exactly).
      - A brief explanation for the correct answer.
    - Questions should cover the ${parentType.toLowerCase()}'s topics.
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
        logger.debug(`Generating quiz for ${parentType.toLowerCase()}:${parent._id}`);
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
            options: Array.isArray(q.options) && q.options?.length === 4 ? q.options : ['A', 'B', 'C', 'D'],
            correctAnswer: q.options?.includes(q.correctAnswer) ? q.correctAnswer : q.options[0] || 'A',
            explanation: q.explanation || 'No explanation provided.',
        }));

        logger.debug(`Quiz generated successfully for ${parentType.toLowerCase()}:${parent._id}`);
        return quizData;
    } catch (error: any) {
        logger.error(`Failed to generate quiz for ${parentType.toLowerCase()}:${parent._id}: ${error.message}`);
        throw new Error('Quiz generation failed');
    }
}

// Fetch YouTube videos for a lesson (from createLearningRoadmap)
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

        for (const candidate of videoCandidates.slice(0, 2)) {
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
                num: 2,
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

// Create resources for a lesson (from createLearningRoadmap)
async function createLessonResources(
    searchPhrases: { video: string[]; article: string[] },
    lessonId: Types.ObjectId
): Promise<{ resourceIds: Types.ObjectId[]; lessonDuration: number }> {
    const resourceIds: Types.ObjectId[] = [];
    let highestSentimentVideo: any | null = null;
    let maxSentimentScore = -Infinity;

    const videos = await fetchYouTubeVideos(searchPhrases.video);
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

        const sentimentScore = parseFloat(video.sentiment.score);
        if (sentimentScore > maxSentimentScore) {
            maxSentimentScore = sentimentScore;
            highestSentimentVideo = video;
        }
    }

    const articles = await fetchArticles(searchPhrases.article[0]);
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

    const lessonDuration = highestSentimentVideo
        ? highestSentimentVideo.metadata.duration || 0
        : 0;

    return { resourceIds, lessonDuration };
}

export const submitQuiz = async (req: Request, res: Response, next: NextFunction) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { quizId } = req.params as any;
        const { answers } = req.body as any;
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
        if (!mongoose.Types.ObjectId.isValid(quizId) || !mongoose.Types.ObjectId.isValid(userId as any)) {
            logger.warn(`Invalid input: quizId:${quizId}, userId:${userId}`);
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ error: 'Invalid quizId or userId' });
        }
        if (!Array.isArray(answers) || answers.length === 0) {
            logger.warn(`Invalid answers provided for quiz:${quizId}`);
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ error: 'Invalid or empty answers' });
        }

        // Verify ownership
        const ownership = await verifyQuizOwnership(quizId, userId as any);
        if (!ownership) {
            logger.warn(`Unauthorized access by user:${userId} to quiz:${quizId}`);
            await session.abortTransaction();
            session.endSession();
            return res.status(403).json({ error: 'Forbidden: Quiz not found or unauthorized' });
        }

        const { quiz, lesson, module, roadmap } = ownership;

        // Calculate score
        let score = 0;
        const total = quiz.questions.length;
        const userAnswers = answers.map(a => ({
            questionIndex: a.questionIndex,
            selectedAnswer: a.selectedAnswer,
        }));

        for (const answer of answers) {
            const question = quiz.questions[answer.questionIndex];
            if (!question) continue;
            if (answer.selectedAnswer === question.correctAnswer) {
                score++;
            }
        }
        const scorePercentage = (score / total) * 100;
        const passed = scorePercentage >= 80;
        const xpEarned = passed ? 50 : 0;

        // Store quiz attempt
        const attempt = {
            score,
            total,
            xp: xpEarned,
            userAnswers,
            createdAt: new Date(),
        };
        quiz.attempts.push(attempt);
        await quiz.save({ session }); // This will now work as quiz is a Mongoose model
        logger.debug(`Stored attempt for quiz:${quizId}, score:${score}/${total}, passed:${passed}`);

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

        if (passed) {
            progress.totalXp += xpEarned;
            progress.completedQuizzes = progress.completedQuizzes || [];
            if (!progress.completedQuizzes.includes(quizId)) {
                progress.completedQuizzes.push(quizId);
            }
            progress.lastUpdated = new Date();
            await progress.save({ session });
            logger.debug(`Updated progress for user:${userId}, XP:${progress.totalXp}`);

            if (quiz.parentType === 'Lesson' && lesson) {
                // Find next lesson
                const moduleLessons = await Lesson.find(
                    { moduleId: module._id },
                    null,
                    { session }
                ).sort({ order: 1 });
                const currentLessonIndex = moduleLessons.findIndex((l: any) => l._id.equals(lesson._id));
                const nextLesson = moduleLessons[currentLessonIndex + 1];

                if (nextLesson) {
                    // Unlock next lesson and generate resources
                    await Lesson.updateOne(
                        { _id: nextLesson._id },
                        { status: 'in-progress', updatedAt: new Date() },
                        { session }
                    );
                    const searchPhrases = {
                        video: nextLesson.topics.map((t: string) => t),
                        article: [nextLesson.topics[0] || ''],
                    };
                    const { resourceIds, lessonDuration } = await createLessonResources(
                        searchPhrases,
                        nextLesson._id as any
                    );
                    await Lesson.updateOne(
                        { _id: nextLesson._id },
                        { $set: { resourceIds, metadata: { duration: lessonDuration } }, updatedAt: new Date() },
                        { session }
                    );
                    logger.debug(`Unlocked next lesson:${nextLesson._id} with ${resourceIds.length} resources`);
                } else {
                    // No next lesson, generate module quiz
                    const existingModuleQuiz = await Quiz.findOne(
                        { parentId: module._id, parentType: 'Module', isActive: true },
                        null,
                        { session }
                    );
                    if (!existingModuleQuiz) {
                        const quizData = await generateQuiz(module, 'Module');
                        const moduleQuiz = new Quiz({
                            quizId: `quiz_${uuidv4()}`,
                            parentId: module._id,
                            parentType: 'Module',
                            questions: quizData.questions,
                            attempts: [],
                            isActive: true,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        });
                        await moduleQuiz.save({ session });
                        await Module.updateOne(
                            { _id: module._id },
                            { quizId: moduleQuiz._id, updatedAt: new Date() },
                            { session }
                        );
                        logger.debug(`Generated module quiz for module:${module._id}, quizId:${moduleQuiz._id}`);
                    }
                }
            } else if (quiz.parentType === 'Module') {
                // Find next module
                const roadmapModules = await Module.find(
                    { roadmapId: roadmap._id },
                    null,
                    { session }
                ).sort({ order: 1 });
                const currentModuleIndex = roadmapModules.findIndex((m: any) => m._id.equals(module._id));
                const nextModule = roadmapModules[currentModuleIndex + 1];

                if (nextModule) {
                    // Unlock next module and create its first lesson with resources
                    await Module.updateOne(
                        { _id: nextModule._id },
                        { status: 'in-progress', updatedAt: new Date() },
                        { session }
                    );
                    const moduleLessons = await Lesson.find(
                        { moduleId: nextModule._id },
                        null,
                        { session }
                    ).sort({ order: 1 });
                    if (moduleLessons.length > 0) {
                        const firstLesson = moduleLessons[0];
                        await Lesson.updateOne(
                            { _id: firstLesson._id },
                            { status: 'in-progress', updatedAt: new Date() },
                            { session }
                        );
                        const searchPhrases = {
                            video: firstLesson.topics.map((t: string) => t),
                            article: [firstLesson.topics[0] || ''],
                        };
                        const { resourceIds, lessonDuration } = await createLessonResources(
                            searchPhrases,
                            firstLesson._id as any
                        );
                        await Lesson.updateOne(
                            { _id: firstLesson._id },
                            { $set: { resourceIds, metadata: { duration: lessonDuration } }, updatedAt: new Date() },
                            { session }
                        );
                        logger.debug(`Unlocked first lesson:${firstLesson._id} in module:${nextModule._id} with ${resourceIds.length} resources`);
                    }
                }
            }
        } else {
            // Failed quiz: Store attempt and track failed lesson if applicable
            if (quiz.parentType === 'Lesson' && lesson) {
                progress.failedQuizLessons = progress.failedQuizLessons || [];
                if (!progress.failedQuizLessons.some((id: Types.ObjectId) => id.equals(lesson._id))) {
                    progress.failedQuizLessons.push(lesson._id);
                    await progress.save({ session });
                    logger.debug(`Recorded failed quiz for lesson:${lesson._id} in user progress`);
                }
            }
        }

        await session.commitTransaction();
        session.endSession();
        logger.info(`Quiz:${quizId} submitted by user:${userId}, score:${scorePercentage}%, passed:${passed}`);

        return res.status(200).json({
            status: 'success',
            message: passed ? 'Quiz passed' : 'Quiz failed',
            score: scorePercentage,
            passed,
            xpEarned,
        });
    } catch (error: any) {
        await session.abortTransaction();
        session.endSession();
        logger.error(`Error submitting quiz:${req.params.quizId}: ${error.message}`, {
            stack: error.stack,
        });
        return res.status(500).json({ error: 'Internal server error', message: error.message });
    }
};