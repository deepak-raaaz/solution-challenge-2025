import { NextFunction, Request, Response } from 'express';
import mongoose, { Types } from 'mongoose';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { google, youtube_v3 } from 'googleapis';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Playlist, Module, Lesson, Resource, IPlaylist, IModule, ILesson, IResource, ISentiment } from '../models/playlists.model';
import { Assessment } from '../models/assessment.model';
import { PlaylistPersonalization } from '../models/playlist-personalization.model';
import { Storage } from '@google-cloud/storage';
import { GoogleGenAI, Modality } from '@google/genai';
import path from 'path';
import fs from 'node:fs';
import { redis } from "../utlis/redis";
import { thumbnailGenerateRequest } from '../utlis/playlist.helper';
import { YoutubeTranscript } from 'youtube-transcript';


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

// Interface for Gemini-generated playlist structure
interface GeneratedPlaylist {
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

// Fetch assessment data
async function fetchAssessment(assessmentId: string): Promise<any> {
    const assessment = await Assessment.findById(assessmentId);
    if (!assessment) {
        throw new Error('Assessment not found');
    }
    return assessment;
}

// Fetch personalization data
async function fetchPersonalization(playlistPersonalizationId: string): Promise<any> {
    const personalization = await PlaylistPersonalization.findById(playlistPersonalizationId);
    if (!personalization) {
        throw new Error('Playlist personalization not found');
    }
    return personalization;
}

const cleanJsonResponse = (text: string): string => {
    // Remove markdown code fences and any leading/trailing whitespace
    return (
        text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .replace(/^\s+|\s+$/g, "")
            // Remove any other unexpected characters
            .replace(/[\r\n]+/g, "")
    );
};

// Generate playlist structure using Gemini
async function generatePlaylistStructure(
    assessment: any,
    personalization: any
): Promise<GeneratedPlaylist> {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `
      Generate a structured playlist for a course based on the following inputs:
      - Assessment: ${JSON.stringify(assessment)}
      - Personalization: ${JSON.stringify(personalization)}
  
      ### Assessment Details:
      - Contains \`playlistPersonalizationId\`, \`questions\` (array of question objects), \`userAnswers\` (array of user responses), \`isSubmitted\` (boolean), \`score\` (user's score), and \`maxScore\` (total possible score).
      - Analyze the \`score\` relative to \`maxScore\` to determine the user's knowledge level:
        - If \`score/maxScore\` ≥ 0.8: User has strong knowledge; suggest an Intermediate or Advanced playlist.
        - If 0.4 ≤ \`score/maxScore\` < 0.8: User has moderate knowledge; suggest a Beginner to Intermediate playlist.
        - If \`score/maxScore\` < 0.4: User has limited knowledge; suggest a Beginner playlist.
      - Use \`questions\` and \`userAnswers\` to identify weak areas (incorrect answers) and prioritize topics for improvement.
  
      ### Personalization Details:
      - Contains \`userId\`, \`estimatedDuration\` (e.g., "4-6 weeks"), \`resourcesType\` ("Free", "Paid", or "Mixed"), \`difficulty\` ("Beginner", "Intermediate", or "Advanced"), \`prompt\` (user's learning goal, e.g., "Learn Machine Learning"), \`platforms\` (array of platform objects), \`resources\` (array of resource types like "Video Tutorials", "Articles"), and \`topics\` (array of topic objects with names and levels).
      - Use \`prompt\` and \`topics\` to define the playlist's focus and scope.
      - Align the playlist's difficulty with the user’s indicated \`difficulty\`, but adjust based on assessment performance (e.g., if assessment score is low, lean toward Beginner even if \`difficulty\` is Intermediate).
      - Use \`estimatedDuration\` to determine the number of modules and lessons:
        - Short duration (e.g., 1-3 weeks): 1-2 modules, 2-3 lessons per module.
        - Medium duration (e.g., 4-8 weeks): 3-4 modules, 3-4 lessons per module.
        - Long duration (e.g., 9+ weeks): 5+ modules, 4-5 lessons per module.
      - Incorporate \`resourcesType\` and \`platforms\` to suggest relevant resource types and sources (e.g., YouTube for free videos, Coursera for paid courses).
      - Use \`topics\` to ensure each module and lesson aligns with the user’s selected topics, emphasizing weak areas from the assessment.
  
      ### Requirements:
      - Create a playlist with:
        - \`title\`: A concise, relevant title based on the \`prompt\` and \`topics\`.
        - \`description\`: A detailed description summarizing the course’s goals and focus.
        - \`overview\`: Set to an empty string ("") for now.
        - \`tags\`: An array of 3-5 relevant tags derived from \`topics\` and \`prompt\`.
        - \`modules\`: An array of modules, with the number determined by \`estimatedDuration\` and the scope of \`topics\`. Each module should have:
          - \`title\`: A clear, topic-focused title.
          - \`description\`: A brief overview of the module’s content.
          - \`lessons\`: An array of lessons, with the number based on \`estimatedDuration\` and topic complexity. Each lesson should have:
            - \`title\`: A specific, actionable title.
            - \`description\`: A concise description of the lesson’s objectives.
            - \`topics\`: An array of 1-3 specific topics covered, aligned with \`topics\` and weak areas from the assessment.
            - \`searchPhrases\`: An object with two arrays:
              - \`video\`: 2-3 realistic search phrases that match what users commonly type into YouTube to find relevant video content (e.g., for Machine Learning: ["machine learning tutorial", "learn ML basics", "ML for beginners"]).
              - \`article\`: 2-3 realistic search phrases for web searches to find relevant articles or blogs (e.g., for Machine Learning: ["machine learning explained", "introduction to ML article", "ML concepts blog"]).
      - Ensure the playlist is tailored to the user’s knowledge level, prioritizing weak areas identified in \`userAnswers\`.
      - Dynamically adjust the number of modules and lessons based on the scope of \`topics\` and \`estimatedDuration\`, rather than a fixed 2-3 modules or lessons.
      - Return the result in valid JSON format, with proper nesting and no trailing commas.
  
      ### Example Output Structure:
      {
        "title": "Machine Learning Fundamentals",
        "description": "A comprehensive course covering ML concepts, tailored for beginners based on your assessment performance.",
        "overview": "",
        "tags": ["machine learning", "data science", "python"],
        "modules": [
          {
            "title": "Introduction to Machine Learning",
            "description": "Learn the basics of ML, including key concepts and terminology.",
            "lessons": [
              {
                "title": "What is Machine Learning?",
                "description": "Understand the definition and types of ML.",
                "topics": ["ML basics", "supervised learning"],
                "searchPhrases": {
                  "video": ["machine learning tutorial", "ML basics video", "what is ML"],
                  "article": ["machine learning explained", "introduction to ML article", "ML concepts blog"]
                }
              },
              {
                "title": "Setting Up Your ML Environment",
                "description": "Install Python and necessary libraries.",
                "topics": ["python setup", "numpy"],
                "searchPhrases": {
                  "video": ["python ML setup tutorial", "install numpy for ML", "ML environment setup"],
                  "article": ["python ML environment guide", "numpy setup article", "ML tools blog"]
                }
              }
            ]
          },
          {
            "title": "Supervised Learning",
            "description": "Explore supervised learning algorithms and their applications.",
            "lessons": [
              {
                "title": "Linear Regression",
                "description": "Learn how linear regression works and implement it.",
                "topics": ["linear regression", "model evaluation"],
                "searchPhrases": {
                  "video": ["linear regression tutorial", "learn linear regression", "ML regression video"],
                  "article": ["linear regression explained", "linear regression article", "ML regression guide"]
                }
              },
              {
                "title": "Classification Basics",
                "description": "Understand classification techniques like logistic regression.",
                "topics": ["classification", "logistic regression"],
                "searchPhrases": {
                  "video": ["logistic regression tutorial", "classification ML video", "learn classification"],
                  "article": ["logistic regression guide", "classification ML article", "ML classification blog"]
                }
              }
            ]
          }
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const cleanedText = cleanJsonResponse(response.text());
    try {
        return JSON.parse(cleanedText);
    } catch (error) {
        throw new Error('Failed to parse Gemini response');
    }
}

// Analyze sentiment using Google Cloud Natural Language API
async function analyzeSentiment(text: string): Promise<ISentiment> {
    const response = await axios.post(
        'https://language.googleapis.com/v1/documents:analyzeSentiment',
        { document: { type: 'PLAIN_TEXT', content: text } },
        { params: { key: process.env.GOOGLE_CLOUD_API_KEY } }
    );
    return {
        score: response.data.documentSentiment.score.toString(), // Ensure score is a string
        message: response.data.documentSentiment.score > 0 ? 'positive' : 'negative',
    };
}

// Fetch YouTube videos for a lesson
async function fetchYouTubeVideos(searchPhrases: string[]): Promise<IResource[]> {
    const cache: { [key: string]: IResource[] } = {};
    const cacheKey = `youtube:${searchPhrases.map(p => p.toLowerCase()).join('|')}`;
    if (cache[cacheKey]) {
        console.log(`Returning cached videos for search phrases: ${searchPhrases.join(', ')}`);
        return cache[cacheKey];
    }

    const videos: any[] = [];

    function isLikelyEnglish(text: string): boolean {
        const asciiRatio = text.replace(/[^a-zA-Z\s]/g, '').length / (text.length || 1);
        return asciiRatio > 0.7; // Relaxed threshold for English detection
    }

    function cleanTextForSentiment(text: string): string {
        return text.replace(/[^\x20-\x7E]/g, ' ').replace(/\s+/g, ' ').trim();
    }

    // Sentiment analysis using comments only
    async function analyzeSentiment(text: string): Promise<ISentiment> {
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
        const videoCandidates: { item: youtube_v3.Schema$SearchResult, stats: youtube_v3.Schema$Video }[] = [];

        // Fetch videos for each search phrase
        for (const phrase of searchPhrases.slice(0, 3)) { // Limit to 3 phrases
            const response = await youtube.search.list({
                part: ['snippet'],
                q: `"${phrase}"`, // Exact phrase search
                type: ['video'],
                maxResults: 10, // Fetch 10 per phrase
                order: 'relevance',
                regionCode: 'IN',
                videoCategoryId: '27', // Education
                videoDuration: 'medium', // 4-20 minutes
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

            // Batch fetch video details
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

        // Rank videos
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

            // Weighted score: 40% views, 30% like-to-view ratio, 20% comments, 10% recency
            const aScore = (aViews * 0.4) + (aLikeToViewRatio * 1000 * 0.3) + (aComments * 0.2) + (aDate / (1000 * 60 * 60 * 24) * 0.1);
            const bScore = (bViews * 0.4) + (bLikeToViewRatio * 1000 * 0.3) + (bComments * 0.2) + (bDate / (1000 * 60 * 60 * 24) * 0.1);

            return bScore - aScore;
        });

        // Process up to 2 videos
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

            let sentiment: ISentiment = { score: '0', message: 'No comments available' };

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
                type: 'youtube',
                title: item.snippet?.title || 'Untitled Video',
                url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
                thumbnailUrl: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.default?.url || '',
                sentiment,
                lessonId: null as any, // Caller will set lessonId
                commentsEnabled: true,
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
            console.error('YouTube API quota exceeded');
        } else {
            console.error('Error fetching YouTube videos:', error);
        }
    }

    cache[cacheKey] = videos;
    return videos;
}



// Fetch articles using Google Custom Search API
async function fetchArticles(searchPhrases: string): Promise<IResource[]> {
    // In-memory cache (replace with Redis if needed)
    const cache: { [key: string]: IResource[] } = {};
    const cacheKey = `articles:${searchPhrases.toLowerCase()}`;
    if (cache[cacheKey]) {
        console.log(`Returning cached articles for lesson: ${searchPhrases}`);
        return cache[cacheKey];
    }

    const articles: IResource[] = [];

    // Helper to check if text is likely English
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
                num: 2, // Limit to 2 articles
            },
        });

        for (const item of response.data.items || []) {
            // Skip YouTube links
            if (item.link?.includes('youtube.com') || item.link?.includes('youtu.be')) {
                console.log(`Skipping YouTube link in articles: ${item.link}`);
                continue;
            }

            const resourceId = `article_${uuidv4()}`;

            // Check if resource already exists (unlikely for articles due to UUID)
            const existingResource = await Resource.findOne({ resourceId });
            if (existingResource) {
                console.log(`Resource with ID ${resourceId} already exists, using existing resource`);
                articles.push(existingResource);
                continue;
            }

            // Check relevance
            const title = (item.title || '').toLowerCase();


            // Filter non-English articles
            if (!isLikelyEnglish(title)) {
                console.log(`Skipping article ${item.link} due to non-English content`);
                continue;
            }

            articles.push({
                resourceId,
                type: 'article',
                title: item.title || 'Untitled Article',
                url: item.link || '',
                thumbnailUrl: item.pagemap?.metatags?.[0]?.['og:image'] || '',
                sentiment: { score: '0', message: 'No sentiment analysis for articles' },
                lessonId: null, // Set to null initially; will be updated later
                createdAt: new Date(),
                updatedAt: new Date(),
                metadata: { source: item.displayLink || '' },
            } as any);
        }
    } catch (error: any) {
        console.error('Error fetching articles:', error.message || error);
        if (error.response?.status === 403) {
            console.error('Check GOOGLE_SEARCH_API_KEY and GOOGLE_CSE_ID for validity and permissions');
        }
    }

    // Cache results
    cache[cacheKey] = articles;
    return articles;
}

// Create resources for a lesson
async function createLessonResources(
    searchPhrases: {
        video: string[];
        article: string[];
    },
    lessonId: Types.ObjectId
): Promise<{ resourceIds: Types.ObjectId[]; lessonDuration: number }> {
    const resourceIds: Types.ObjectId[] = [];
    let highestSentimentVideo: IResource | null = null;
    let maxSentimentScore = -Infinity;

    // Fetch YouTube videos
    const videos = await fetchYouTubeVideos(searchPhrases.video);
    for (const video of videos) {
        // Check if resource already exists
        const existingResource = await Resource.findOne({ resourceId: video.resourceId });
        let resourceId: Types.ObjectId;

        if (existingResource) {
            console.log(`Reusing existing resource with ID ${video.resourceId} for lesson ${lessonId}`);
            resourceId = existingResource._id as Types.ObjectId;

            // Update lessonId if the schema allows multiple lessons per resource
            if (!existingResource.lessonId || !existingResource.lessonId.equals(lessonId)) {
                await Resource.updateOne(
                    { _id: existingResource._id },
                    { $set: { lessonId, updatedAt: new Date() } }
                );
            }
        } else {
            video.lessonId = lessonId;
            const savedResource = await Resource.create(video) as any;
            resourceId = savedResource._id;
        }

        resourceIds.push(resourceId);

        // Track video with highest sentiment score
        const sentimentScore = parseFloat(video.sentiment.score);
        if (sentimentScore > maxSentimentScore) {
            maxSentimentScore = sentimentScore;
            highestSentimentVideo = video;
        }
    }

    // Fetch articles
    const articles = await fetchArticles(searchPhrases.article[0]);
    for (const article of articles) {
        // Check if resource already exists (unlikely for articles due to UUID)
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
            const savedResource = await Resource.create(article) as any;
            resourceId = savedResource._id;
        }

        resourceIds.push(resourceId);
    }

    // Determine lesson duration (highest-sentiment video duration or 0 if no videos)
    const lessonDuration = highestSentimentVideo
        ? highestSentimentVideo.metadata.duration || 0
        : 0;

    return { resourceIds, lessonDuration };
}

// Create lessons for a module
async function createLessons(
    module: GeneratedPlaylist['modules'][0],
    moduleId: Types.ObjectId
): Promise<Types.ObjectId[]> {
    const lessonIds: Types.ObjectId[] = [];

    for (const lessonData of module.lessons) {
        const lesson: any = {
            lessonId: `lesson_${uuidv4()}`,
            title: lessonData.title,
            description: lessonData.description,
            topics: lessonData.topics,
            searchPhrases: lessonData.searchPhrases,
            moduleId,
            resourceIds: [],
            status: 'draft',
            duration: 0, // Will be updated after resource creation
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const savedLesson = await Lesson.create(lesson) as any;
        console.log(lessonData.topics)
        const { resourceIds, lessonDuration } = await createLessonResources(lessonData.searchPhrases, savedLesson._id);
        await Lesson.updateOne(
            { _id: savedLesson._id },
            { resourceIds, duration: lessonDuration }
        );
        lessonIds.push(savedLesson._id);
    }

    return lessonIds;
}


// Create modules for a playlist
async function createModules(playlistData: GeneratedPlaylist, playlistId: Types.ObjectId): Promise<Types.ObjectId[]> {
    const moduleIds: any = [];

    for (const moduleData of playlistData.modules) {
        const module = {
            moduleId: `module_${uuidv4()}`,
            title: moduleData.title,
            description: moduleData.description,
            playlistId,
            lessonIds: [],
            status: 'draft',
            createdAt: new Date(),
            updatedAt: new Date(),
        } as any;

        const savedModule = await Module.create(module) as any;
        module.lessonIds = await createLessons(moduleData, savedModule._id);
        await Module.updateOne({ _id: savedModule._id }, { lessonIds: module.lessonIds });
        moduleIds.push(savedModule._id);
    }

    return moduleIds;
}

// Create playlist endpoint
export const createPlaylist = async (req: CreatePlaylistRequest, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const userId = req?.user?._id as string;
        const { assessmentId, playlistPersonalizationId } = req.body;

        // Validate input
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(assessmentId) || !mongoose.Types.ObjectId.isValid(playlistPersonalizationId)) {
            return res.status(400).json({ error: 'Invalid userId, assessmentId, or playlistPersonalizationId' });
        }
        // Check if user exists
        const user = await mongoose.model('User').findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Check if assessment exists
        const assessmentexists = await Assessment.findById(assessmentId);
        if (!assessmentexists) {
            return res.status(404).json({ error: 'Assessment not found' });
        }
        // Check if playlist personalization exists
        const personalizationexists = await PlaylistPersonalization.findById(playlistPersonalizationId);
        if (!personalizationexists) {
            return res.status(404).json({ error: 'Playlist personalization not found' });
        }
        // check if the assessment and personalization is belong to the user
        if (assessmentexists.userId.toString() !== userId || personalizationexists.userId.toString() !== userId) {
            return res.status(403).json({ error: 'You are not authorized to create a playlist for this assessment and personalization' });
        }

        // check if playlist of this personalization and assessment already exists
        const existingPlaylist = await Playlist.findOne({
            userId: new Types.ObjectId(userId),
            assessmentId: new Types.ObjectId(assessmentId),
            playlistPersonalizationId: new Types.ObjectId(playlistPersonalizationId),
        });
        if (existingPlaylist) {
            return res.status(201).json({
                error: 'Playlist already exists for this assessment and personalization',
                playlistId: existingPlaylist?._id
            });
        }
        // Fetch assessment and personalization data
        const [assessment, personalization] = await Promise.all([
            fetchAssessment(assessmentId),
            fetchPersonalization(playlistPersonalizationId),
        ]);

        // Generate playlist structure using Gemini
        const playlistData = await generatePlaylistStructure(assessment, personalization);

        // Create playlist
        const playlist: any = {
            userId: new Types.ObjectId(userId),
            assessmentId: new Types.ObjectId(assessmentId),
            playlistPersonalizationId: new Types.ObjectId(playlistPersonalizationId),
            title: playlistData.title,
            description: playlistData.description,
            tags: playlistData.tags,
            overview: playlistData.overview || '', // Set to empty string if not provided
            moduleIds: [],
            status: 'draft',
            createdAt: new Date(),
            updatedAt: new Date(),
            metadata: { source: 'gemini' },
        };

        const savedPlaylist = await Playlist.create([playlist], { session });
        const playlistId = savedPlaylist[0]._id as any;

        // Create modules and their lessons
        playlist.moduleIds = await createModules(playlistData, playlistId);

        // Update playlist with moduleIds
        await Playlist.updateOne({ _id: playlistId }, { moduleIds: playlist.moduleIds }, { session });

        await session.commitTransaction();
        session.endSession();

        // Return the created playlist with populated modules
        const populatedPlaylist = await Playlist.findById(playlistId)
            .populate({
                path: 'moduleIds',
                populate: {
                    path: 'lessonIds',
                    populate: { path: 'resourceIds' },
                },
            });
        const totalLessons = populatedPlaylist?.moduleIds.reduce((sum, module: any) => sum + (module.lessonIds?.length || 0), 0);
        return res.status(201).json({
            message: 'Playlist created successfully',
            playlistId: populatedPlaylist?._id,
            playlist: { ...populatedPlaylist?.toObject(), modules: populatedPlaylist?.moduleIds.length, lessons: totalLessons },
        });
    } catch (error: any) {
        await session.abortTransaction();
        session.endSession();
        console.error('Error creating playlist:', error);
        return res.status(500).json({ error: error.message || 'Internal server error' });
    }
};


//// Get playlist by ID with populated modules and lessons
export const getPlaylistById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { playlistId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(playlistId)) {
            return res.status(400).json({ error: 'Invalid playlist ID' });
        }

        const playlist = await Playlist.findById(playlistId)
            .populate({
                path: 'moduleIds',
                populate: {
                    path: 'lessonIds',
                    populate: { path: 'resourceIds' },
                },
            }).populate({
                path: 'userId',
                select: '_id name email ',
            })

        if (!playlist) {
            return res.status(404).json({ error: 'Playlist not found' });
        }

        const totalLessons = playlist?.moduleIds.reduce((sum, module: any) => sum + (module.lessonIds?.length || 0), 0);
        const totalDuration = playlist.moduleIds.reduce((sum, module: any) => {
            return sum + (module.lessonIds?.reduce((lessonSum: number, lesson: any) => {
                return lessonSum + (lesson.duration || 0);
            }, 0) || 0);
        }, 0);
        const totalDurationInHours = Math.round((totalDuration / 3600) * 100) / 100;
        // Convert seconds to hours

        return res.status(200).json({
            message: 'Playlist fetched successfully',
            playlist: { ...playlist.toObject(), modules: playlist.moduleIds.length, lessons: totalLessons, duration: totalDurationInHours },
        });
    } catch (error: any) {
        console.error('Error fetching playlist:', error);
        return res.status(500).json({ error: error.message || 'Internal server error' });
    }
};


// Publish a playlist and its modules/lessons
export const publishPlaylist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { playlistId } = req.params;
        const { modulePublished } = req.body;

        if (!mongoose.Types.ObjectId.isValid(playlistId)) {
            return res.status(400).json({ error: 'Invalid playlist ID' });
        }

        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const playlist = await Playlist.findById(playlistId).session(session);
            if (!playlist) {
                await session.abortTransaction();
                session.endSession();
                return res.status(404).json({ error: 'Playlist not found' });
            }

            if (modulePublished) {
                await Module.updateMany(
                    { _id: { $in: playlist.moduleIds } },
                    { $set: { status: 'published' } },
                    { session }
                );

                await Lesson.updateMany(
                    { moduleId: { $in: playlist.moduleIds } },
                    { $set: { status: 'published' } },
                    { session }
                );
            }

            playlist.status = 'published';
            await playlist.save({ session });

            await session.commitTransaction();
            session.endSession();

            return res.status(200).json({
                message: 'Playlist published successfully',
                playlistId: playlist._id,
            });
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw error;
        }
    } catch (error: any) {
        console.error('Error publishing playlist:', error);
        return res.status(500).json({ error: error.message || 'Internal server error' });
    }
};


// generate thumbnail for playlist using ai
export const generatePlaylistThumbnail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { playlistId } = req.params;

        // Validate playlist ID
        if (!mongoose.Types.ObjectId.isValid(playlistId)) {
            return res.status(400).json({ error: 'Invalid playlist ID' });
        }

        // Fetch playlist
        const playlist = await Playlist.findById(playlistId);
        if (!playlist) {
            return res.status(404).json({ error: 'Playlist not found' });
        }

        // Check thumbnail generation limit
        await thumbnailGenerateRequest(playlist._id as string, next);

        // Resolve path to service account key
        const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || path.join(__dirname, 'service-account-key.json');
        if (!fs.existsSync(serviceAccountPath)) {
            throw new Error(`Service account key file not found at ${serviceAccountPath}`);
        }

        // Initialize Gemini AI
        const imggenAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'YOUR_API_KEY');
        const model = imggenAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        // Create a meta-prompt to generate the thumbnail prompt
        const metaPrompt = `
        You are an expert in creating visually stunning thumbnail prompts for educational video playlists. Based on the provided playlist details, generate a detailed prompt for creating a high-quality 3D rendered thumbnail image optimized for video platforms. The prompt must:
        - Ensure a unique and fresh visual concept for each generation, avoiding repetition of previous designs, even for the same playlist.
        - Incorporate randomized elements such as:
            - Varied background styles (e.g., gradient, abstract patterns, or thematic textures) that reflect the playlist's theme (e.g., cybersecurity, programming, or general education).
            - A distinct central image with creative variations in composition, perspective, or visual metaphors that represent the playlist's content in a modern, engaging way.
            - Randomized accent colors within the specified palette (teal, green, or blue) for highlights or effects.
        - Include text overlay instructions:
            - In the top-left corner: "EDU AI" in a small, bold, sans-serif font (e.g., Montserrat or Roboto), white with a subtle teal glow, sized to be discreet yet readable.
            - Centered: The playlist title "${playlist.title}" in a large, bold, sans-serif font, white or light blue, with a slight shadow for depth.
            - Below the title: A sub-title summarizing the playlist's focus (based on tags or description) in a smaller, clean sans-serif font, light blue or white.
        - Use a color palette: Dark background (e.g., deep blue, grey, or purple gradient), white/light blue text, teal or green accents for highlights.
        - Style: Ultra-modern, professional, high-resolution (sharp details, vivid colors), optimized for video platforms.
        - Aspect ratio: Strictly 16:9 (e.g., 1280x720 pixels) for video thumbnail compatibility.
        - Quality: Emphasize high resolution, crisp edges, and professional rendering suitable for a premium educational platform.

        Playlist details:
        - Title: "${playlist.title}"
        - Description: "${playlist.description || "A playlist focused on educational content."}"
        - Tags: ${playlist.tags.length ? playlist.tags.join(", ") : "education, learning, technology"}

        Return the prompt as a clean string, without markdown or JSON formatting.
    `;

        // Generate the thumbnail prompt using Gemini
        const result = await model.generateContent(metaPrompt);
        const response = await result.response;
        const thumbnailPrompt = cleanJsonResponse(response.text());

        // Generate image with the generated prompt
        const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
        const imageResponse = await genAI.models.generateContent({
            model: 'gemini-2.0-flash-preview-image-generation',
            contents: thumbnailPrompt,
            config: {
                responseModalities: [Modality.TEXT, Modality.IMAGE],
            },
        }) as any;

        // Extract image data
        const imagePart = imageResponse?.candidates[0]?.content?.parts?.find((part: any) => part.inlineData);
        if (!imagePart?.inlineData) {
            throw new Error('Failed to generate thumbnail image');
        }

        const imageData = imagePart.inlineData.data;
        const buffer = Buffer.from(imageData, 'base64');

        // Initialize Google Cloud Storage
        const storage = new Storage({
            projectId: process.env.GOOGLE_CLOUD_PROJECT,
            keyFilename: serviceAccountPath,
        });
        const bucketName = process.env.GCS_BUCKET_NAME || 'edu_ai';
        const bucket = storage.bucket(bucketName);
        const fileName = `thumbnails/playlist_${playlistId}.png`;
        const file = bucket.file(fileName);

        // Save image to Google Cloud Storage
        await file.save(buffer, {
            metadata: {
                contentType: 'image/png',
            },
        });

        // Generate the public URL (assuming bucket has public read access)
        const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;

        // Update playlist with public URL
        playlist.thumbnailUrl = publicUrl;
        await playlist.save();

        return res.status(200).json({
            message: 'Thumbnail generated successfully',
            playlistId: playlist._id,
            thumbnailUrl: publicUrl,
        });
    } catch (error: any) {
        // console.error('Error generating playlist thumbnail:', error);
        return res.status(500).json({ error: error.message || 'Internal server error' });
    }
};


// Interface for query parameters
interface PlaylistQueryParams {
    page?: string;
    limit?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    search?: string;
    level?: 'Beginner' | 'Intermediate' | 'Advanced';
    resourceType?: 'Free' | 'Paid' | 'Mixed';
    estimatedDuration?: string;
    platforms?: string;
    tags?: string;
    language?: string;
}

// Interface for the response
interface PlaylistResponse {
    message: string;
    playlists: IPlaylist[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

/**
 * Get all playlists publicly with filtering, sorting, pagination, and search
 * @route GET /api/playlists
 * @query {page, limit, sortBy, sortOrder, search, level, resourceType, estimatedDuration, platforms, tags, language}
 * @access Public
 */
export const getAllPlaylists = async (req: Request<{}, {}, {}, PlaylistQueryParams>, res: Response): Promise<Response> => {
    try {
        // Extract query parameters
        const {
            page = '1',
            limit = '10',
            sortBy = 'createdAt',
            sortOrder = 'desc',
            search,
            level,
            resourceType,
            estimatedDuration,
            platforms,
            tags,
            language,
        } = req.query;

        // Parse pagination parameters
        const pageNum = parseInt(page, 10) || 1;
        const limitNum = parseInt(limit, 10) || 10;
        const skip = (pageNum - 1) * limitNum;

        // Validate pagination parameters
        if (pageNum < 1 || limitNum < 1) {
            return res.status(400).json({ error: 'Page and limit must be positive integers' });
        }

        // Build match stage for aggregation
        const match: any = { status: 'published' };

        // Search on title and description using regex
        if (search) {
            match.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }

        // Filter by tags
        if (tags) {
            const tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
            if (tagArray.length) {
                match.tags = { $all: tagArray };
            }
        }

        // Filter by language (metadata.language)
        if (language) {
            match['metadata.language'] = language;
        }

        // Build aggregation pipeline
        const pipeline: any[] = [
            { $match: match },
            {
                $lookup: {
                    from: 'playlistpersonalizations', // Collection name (lowercase, plural)
                    localField: 'playlistPersonalizationId',
                    foreignField: '_id',
                    as: 'personalization',
                },
            },
            { $unwind: '$personalization' }, // Convert personalization array to object
            {
                $match: {
                    // Apply filters on personalization fields
                    ...(level && ['Beginner', 'Intermediate', 'Advanced'].includes(level)
                        ? { 'personalization.difficulty': level }
                        : {}),
                    ...(resourceType && ['Free', 'Paid', 'Mixed'].includes(resourceType)
                        ? { 'personalization.resourcesType': resourceType }
                        : {}),
                    ...(estimatedDuration
                        ? {
                            'personalization.estimatedDuration': {
                                $regex: /^(\d+-\d+\s+weeks|\d+\s+weeks)$/i,
                                $eq: estimatedDuration,
                            },
                        }
                        : {}),
                    ...(platforms
                        ? {
                            'personalization.platforms': {
                                $all: platforms.split(',').map(p => p.trim()).filter(p => p),
                            },
                        }
                        : {}),
                },
            },
        ];

        // Build sort stage
        const sort: { [key: string]: 1 | -1 } = {};
        const validSortFields = ['createdAt', 'updatedAt', 'title', 'metadata.popularity'];
        if (validSortFields.includes(sortBy)) {
            sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
        } else {
            sort.createdAt = -1; // Default sort
        }

        // Add sort, skip, and limit to pipeline
        pipeline.push({ $sort: sort }, { $skip: skip }, { $limit: limitNum });

        // Execute aggregation
        const playlists = await Playlist.aggregate(pipeline).exec();

        // Populate related fields
        await Playlist.populate(playlists, [
            { path: 'userId', select: 'name' },
            { path: 'moduleIds', select: 'title description' },
            {
                path: 'playlistPersonalizationId',
                select: 'estimatedDuration resourcesType difficulty platforms resources',
            },
        ]);

        // Count total documents
        const countPipeline = [
            { $match: match },
            {
                $lookup: {
                    from: 'playlistpersonalizations',
                    localField: 'playlistPersonalizationId',
                    foreignField: '_id',
                    as: 'personalization',
                },
            },
            { $unwind: '$personalization' },
            {
                $match: {
                    ...(level ? { 'personalization.difficulty': level } : {}),
                    ...(resourceType ? { 'personalization.resourcesType': resourceType } : {}),
                    ...(estimatedDuration
                        ? {
                            'personalization.estimatedDuration': {
                                $regex: /^(\d+-\d+\s+weeks|\d+\s+weeks)$/i,
                                $eq: estimatedDuration,
                            },
                        }
                        : {}),
                    ...(platforms
                        ? {
                            'personalization.platforms': {
                                $all: platforms.split(',').map(p => p.trim()).filter(p => p),
                            },
                        }
                        : {}),
                },
            },
            { $count: 'total' },
        ];
        const countResult = await Playlist.aggregate(countPipeline).exec();
        const total = countResult[0]?.total || 0;

        // Check if playlists exist
        if (!playlists || playlists.length === 0) {
            return res.status(404).json({ message: 'No playlists found' });
        }

        // Calculate pagination metadata
        const totalPages = Math.ceil(total / limitNum);

        // Format response
        const response: PlaylistResponse = {
            message: 'Playlists fetched successfully',
            playlists,
            pagination: {
                total,
                page: pageNum,
                limit: limitNum,
                totalPages,
            },
        };

        return res.status(200).json(response);
    } catch (error: any) {
        console.error('Error fetching playlists:', error);
        return res.status(500).json({ error: error.message || 'Internal server error' });
    }
};