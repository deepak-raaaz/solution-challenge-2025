import { NextFunction, Request, Response } from 'express';
import mongoose, { Types } from 'mongoose';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { google } from 'googleapis';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Playlist, Module, Lesson, Resource, IPlaylist, IModule, ILesson, IResource, ISentiment } from '../models/playlists.model';
import { Assessment } from '../models/assessment.model';
import { PlaylistPersonalization } from '../models/playlist-personalization.model';

// Initialize APIs
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const youtube = google.youtube({
    version: 'v3',
    auth: process.env.YOUTUBE_API_KEY,
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
    tags: string[];
    modules: {
        title: string;
        description: string;
        lessons: {
            title: string;
            description: string;
            topics: string[];
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
        - \`tags\`: An array of 3-5 relevant tags derived from \`topics\` and \`prompt\`.
        - \`modules\`: An array of modules, with the number determined by \`estimatedDuration\` and the scope of \`topics\`. Each module should have:
          - \`title\`: A clear, topic-focused title.
          - \`description\`: A brief overview of the module’s content.
          - \`lessons\`: An array of lessons, with the number based on \`estimatedDuration\` and topic complexity. Each lesson should have:
            - \`title\`: A specific, actionable title.
            - \`description\`: A concise description of the lesson’s objectives.
            - \`topics\`: An array of 1-3 specific topics covered, aligned with \`topics\` and weak areas from the assessment.
      - Ensure the playlist is tailored to the user’s knowledge level, prioritizing weak areas identified in \`userAnswers\`.
      - Dynamically adjust the number of modules and lessons based on the scope of \`topics\` and \`estimatedDuration\`, rather than a fixed 2-3 modules or lessons.
      - Return the result in valid JSON format, with proper nesting and no trailing commas.
  
      ### Example Output Structure:
      {
        "title": "Machine Learning Fundamentals",
        "description": "A comprehensive course covering ML concepts, tailored for beginners based on your assessment performance.",
        "tags": ["machine learning", "data science", "python"],
        "modules": [
          {
            "title": "Introduction to Machine Learning",
            "description": "Learn the basics of ML, including key concepts and terminology.",
            "lessons": [
              {
                "title": "What is Machine Learning?",
                "description": "Understand the definition and types of ML.",
                "topics": ["ML basics", "supervised learning"]
              },
              {
                "title": "Setting Up Your ML Environment",
                "description": "Install Python and necessary libraries.",
                "topics": ["python setup", "numpy"]
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
                "topics": ["linear regression", "model evaluation"]
              },
              {
                "title": "Classification Basics",
                "description": "Understand classification techniques like logistic regression.",
                "topics": ["classification", "logistic regression"]
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
async function fetchYouTubeVideos(topic: string): Promise<IResource[]> {
    const response = await youtube.search.list({
        part: ['snippet'],
        q: topic,
        type: ['video'],
        maxResults: 2, // Limit to 2 videos per topic
    });

    const videos: IResource[] = [];
    for (const item of response.data.items || []) {
        if (!item.id?.videoId) continue;

        const resourceId = `youtube_${item.id.videoId}`;

        // Check if resource already exists
        const existingResource = await Resource.findOne({ resourceId });
        if (existingResource) {
            console.log(`Resource with ID ${resourceId} already exists, using existing resource`);
            videos.push(existingResource);
            continue;
        }

        // Fetch video duration
        const videoDetails = await youtube.videos.list({
            part: ['contentDetails'],
            id: [item.id.videoId],
        });


        const durationIso = videoDetails.data.items?.[0]?.contentDetails?.duration || 'PT0S'; // e.g., "PT15M30S"
        // Parse ISO 8601 duration to seconds
        const durationMatch = durationIso.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
        const hours = durationMatch && durationMatch[1] ? parseInt(durationMatch[1]) * 3600 : 0;
        const minutes = durationMatch && durationMatch[2] ? parseInt(durationMatch[2]) * 60 : 0;
        const seconds = durationMatch && durationMatch[3] ? parseInt(durationMatch[3]) : 0;
        const durationSeconds = hours + minutes + seconds;


        let sentiment: ISentiment = { score: '0', message: 'No comments available' };

        // Fetch comments for sentiment analysis
        try {
            const commentsResponse = await youtube.commentThreads.list({
                part: ['snippet'],
                videoId: item.id.videoId,
                maxResults: 10,
            });

            const comments = commentsResponse.data.items?.map(
                (item) => item.snippet?.topLevelComment?.snippet?.textDisplay || ''
            ) || [];

            // Analyze sentiment of comments if available
            if (comments.length) {
                sentiment = await analyzeSentiment(comments.join(' '));
            }
        } catch (error: any) {
            if (error?.response?.data?.error?.message?.includes('disabled comments')) {
                console.log(`Skipping sentiment analysis for video ${item.id.videoId} due to disabled comments`);
                sentiment = { score: '0', message: 'Comments disabled' };
            } else {
                console.warn(`Error fetching comments for video ${item.id.videoId}:`, error);
                continue; // Skip video if other errors occur
            }
        }

        videos.push({
            resourceId,
            type: 'youtube',
            title: item.snippet?.title || 'Untitled Video',
            url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
            thumbnailUrl: item.snippet?.thumbnails?.default?.url || '',
            sentiment,
            lessonId: null, // Set to null initially; will be updated later
            createdAt: new Date(),
            updatedAt: new Date(),
            metadata: { channel: item.snippet?.channelTitle || '', duration: durationSeconds, },
        } as any);
    }

    return videos;
}

// Fetch articles using Google Custom Search API
async function fetchArticles(topic: string): Promise<IResource[]> {
    const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
        params: {
            key: process.env.GOOGLE_SEARCH_API_KEY,
            cx: process.env.GOOGLE_SEARCH_CX,
            q: topic,
            num: 2, // Limit to 2 articles
        },
    });

    const articles: IResource[] = [];
    for (const item of response.data.items || []) {
        // Skip YouTube links
        if (item.link.includes('youtube.com') || item.link.includes('youtu.be')) {
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

        // Extract thumbnail from pagemap.metatags (e.g., og:image)
        const thumbnailUrl = item.pagemap?.metatags?.[0]?.['og:image'] || '';

        articles.push({
            resourceId,
            type: 'article',
            title: item.title || 'Untitled Article',
            url: item.link,
            thumbnailUrl,
            sentiment: { score: '0', message: 'No sentiment analysis for articles' },
            lessonId: null, // Set to null initially; will be updated later
            createdAt: new Date(),
            updatedAt: new Date(),
            metadata: { source: item.displayLink || '' },
        } as any);
    }

    return articles;
}


// Create resources for a lesson
async function createLessonResources(
    topics: string[],
    lessonId: Types.ObjectId
): Promise<{ resourceIds: Types.ObjectId[]; lessonDuration: number }> {
    const resourceIds: Types.ObjectId[] = [];
    let highestSentimentVideo: IResource | null = null;
    let maxSentimentScore = -Infinity;

    for (const topic of topics) {
        // Fetch YouTube videos
        const videos = await fetchYouTubeVideos(topic);
        for (const video of videos) {
            video.lessonId = lessonId;
            const savedResource = await Resource.create(video) as any;
            resourceIds.push(savedResource._id);

            // Track video with highest sentiment score
            const sentimentScore = parseFloat(video.sentiment.score);
            if (sentimentScore > maxSentimentScore) {
                maxSentimentScore = sentimentScore;
                highestSentimentVideo = video;
            }
        }

        // Fetch articles
        const articles = await fetchArticles(topic);
        for (const article of articles) {
            article.lessonId = lessonId;
            const savedResource = await Resource.create(article) as any;
            resourceIds.push(savedResource._id);
        }
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
            moduleId,
            resourceIds: [],
            status: 'draft',
            duration: 0, // Will be updated after resource creation
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const savedLesson = await Lesson.create(lesson) as any;
        const { resourceIds, lessonDuration } = await createLessonResources(lessonData.topics, savedLesson._id);
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

        // check if playlist of this personalization and assessment already exists
        const existingPlaylist = await Playlist.findOne({
            userId: new Types.ObjectId(userId),
            assessmentId: new Types.ObjectId(assessmentId),
            playlistPersonalizationId: new Types.ObjectId(playlistPersonalizationId),
        });
        if (existingPlaylist) {
            return res.status(400).json({ error: 'Playlist already exists for this assessment and personalization' });
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
            playlist: { ...populatedPlaylist?.toObject(), modules: populatedPlaylist?.moduleIds.length, lessons: totalLessons },
        });
    } catch (error: any) {
        await session.abortTransaction();
        session.endSession();
        console.error('Error creating playlist:', error);
        return res.status(500).json({ error: error.message || 'Internal server error' });
    }
};



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
            });

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
            playlist: { ...playlist.toObject(), modules: playlist.moduleIds.length, lessons: totalLessons,duration:totalDurationInHours },
        });
    } catch (error: any) {
        console.error('Error fetching playlist:', error);
        return res.status(500).json({ error: error.message || 'Internal server error' });
    }
};


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