import { PlaylistPersonalization } from "../../models/playlist-personalization.model";
import { Assessment } from "../../models/assessment.model";
import { GoogleGenerativeAI } from '@google/generative-ai';
import { cleanJsonResponse } from "../../utlis/cleanJson.helper";
import { ILearningRoadmap, LearningRoadmap } from "../../models/students/learning-roadmap.model";
import { Resource } from "../../models/students/resource.model";
import { Types } from "mongoose";
import { Lesson } from "../../models/students/lesson.model";
import { Module } from "../../models/students/module.model";
import { UserProgress } from "../../models/students/user-progress.model";


// Fetch assessment data
export async function fetchAssessment(assessmentId: string): Promise<any> {
    const assessment = await Assessment.findById(assessmentId);
    if (!assessment) {
        throw new Error('Assessment not found');
    }
    return assessment;
}


export async function fetchPersonalization(playlistPersonalizationId: string): Promise<any> {
    const personalization = await PlaylistPersonalization.findById(playlistPersonalizationId);
    if (!personalization) {
        throw new Error('Playlist personalization not found');
    }
    return personalization;
}



// Generate roadmap structure using Gemini
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
  
  export async function generateLearningRoadmapStructure(
    assessment: any,
    personalization: any
  ): Promise<GeneratedRoadmap> {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  
    // Determine knowledge level based on assessment score
    const scoreRatio = assessment.score / assessment.maxScore;
    let knowledgeLevel: string;
    if (scoreRatio >= 0.8) knowledgeLevel = 'Advanced';
    else if (scoreRatio >= 0.4) knowledgeLevel = 'Intermediate';
    else knowledgeLevel = 'Beginner';
  
    // Adjust difficulty based on assessment and personalization
    const effectiveDifficulty =
      knowledgeLevel === 'Beginner' ? 'Beginner' :
      knowledgeLevel === 'Intermediate' && personalization.difficulty === 'Advanced' ? 'Intermediate' :
      personalization.difficulty;
  
    // Determine number of modules and lessons based on estimated duration
    const duration = personalization.estimatedDuration.toLowerCase();
    let moduleCount: number;
    let lessonsPerModule: number;
    if (duration.includes('1-3')) {
      moduleCount = 1;
      lessonsPerModule = 2;
    } else if (duration.includes('4-8')) {
      moduleCount = 3;
      lessonsPerModule = 3;
    } else {
      moduleCount = 5;
      lessonsPerModule = 4;
    }
  
    // Identify weak topics from assessment
    const weakTopics = assessment.userAnswers
      .filter((answer: any) => !answer.correct)
      .map((answer: any) => {
        const question = assessment.questions.find((q: any) => q.id === answer.questionId);
        return question?.topic;
      })
      .filter((topic: string | undefined): topic is string => !!topic);
  
    const prompt = `
      Generate a structured learning roadmap based on the following inputs:
      - Assessment: ${JSON.stringify(assessment)}
      - Personalization: ${JSON.stringify(personalization)}
      - Knowledge Level: ${knowledgeLevel}
      - Effective Difficulty: ${effectiveDifficulty}
      - Weak Topics: ${JSON.stringify(weakTopics)}
      - Module Count: ${moduleCount}
      - Lessons per Module: ${lessonsPerModule}
  
      ### Requirements:
      - Create a roadmap with:
        - \`title\`: Based on personalization.prompt and topics.
        - \`description\`: Summarize course goals, focusing on weak topics and personalization.
        - \`overview\`: Empty string ("").
        - \`tags\`: Array of 3-5 relevant tags from topics and prompt.
        - \`modules\`: Array of ${moduleCount} module objects, each with:
          - \`title\`: Topic-focused title.
          - \`description\`: Brief overview of module content.
          - \`lessons\`: Array of ${lessonsPerModule} lesson objects, each with:
            - \`title\`: Actionable title.
            - \`description\`: Lesson objectives.
            - \`topics\`: Array of 1-3 topics, prioritizing weak topics.
            - \`searchPhrases\`: Object with two arrays:
              - \`video\`: 2-3 realistic YouTube search phrases (e.g., ["machine learning tutorial", "ML basics video"]).
              - \`article\`: 2-3 realistic web search phrases (e.g., ["machine learning explained", "ML concepts blog"]).
      - Ensure \`modules\` and \`lessons\` are always arrays, even if empty.
      - Prioritize weak topics in early lessons.
      - Align search phrases with personalization.resourcesType and personalization.platforms.
      - Return valid JSON, no trailing commas.
  
      ### Example Output:
      {
        "title": "Machine Learning Fundamentals",
        "description": "A course to master ML basics, tailored to your needs.",
        "overview": "",
        "tags": ["machine learning", "data science", "python"],
        "modules": [
          {
            "title": "Introduction to ML",
            "description": "Learn ML core concepts.",
            "lessons": [
              {
                "title": "What is Machine Learning?",
                "description": "Understand ML definitions.",
                "topics": ["ML basics"],
                "searchPhrases": {
                  "video": ["machine learning tutorial", "ML basics video"],
                  "article": ["machine learning explained", "ML concepts blog"]
                }
              },
              {
                "title": "ML Environment Setup",
                "description": "Set up Python for ML.",
                "topics": ["python setup"],
                "searchPhrases": {
                  "video": ["python ML setup tutorial", "install numpy"],
                  "article": ["python ML environment guide", "numpy setup article"]
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
      const roadmapData = JSON.parse(cleanedText);
  
      // Validate roadmap structure
      if (!roadmapData || typeof roadmapData !== 'object') {
        throw new Error('Invalid roadmap structure');
      }
  
      // Ensure required fields
      roadmapData.title = roadmapData.title || 'Untitled Roadmap';
      roadmapData.description = roadmapData.description || 'A personalized learning roadmap.';
      roadmapData.overview = roadmapData.overview || '';
      roadmapData.tags = Array.isArray(roadmapData.tags) ? roadmapData.tags : [];
      roadmapData.modules = Array.isArray(roadmapData.modules) ? roadmapData.modules : [];
  
      // Ensure each module has a lessons array
      roadmapData.modules = roadmapData.modules.map((module: any) => ({
        title: module.title || 'Untitled Module',
        description: module.description || 'Module description.',
        lessons: Array.isArray(module.lessons) ? module.lessons : [],
      }));
  
      return roadmapData as GeneratedRoadmap;
    } catch (error) {
      console.error('Failed to parse or validate Gemini response:', error);
      throw new Error('Failed to generate valid roadmap structure');
    }
  }

// Create modules for a playlist
// export async function createModules(playlistData: GeneratedPlaylist, playlistId: Types.ObjectId): Promise<Types.ObjectId[]> {
//       const moduleIds: any = [];
  
//       for (const moduleData of playlistData.modules) {
//           const module = {
//               moduleId: `module_${uuidv4()}`,
//               title: moduleData.title,
//               description: moduleData.description,
//               playlistId,
//               lessonIds: [],
//               status: 'draft',
//               createdAt: new Date(),
//               updatedAt: new Date(),
//           } as any;
  
//           const savedModule = await Module.create(module) as any;
//           module.lessonIds = await createLessons(moduleData, savedModule._id);
//           await Module.updateOne({ _id: savedModule._id }, { lessonIds: module.lessonIds });
//           moduleIds.push(savedModule._id);
//       }
  
//       return moduleIds;
// }






//   try {
//     const roadmapData = JSON.parse(cleanedText);
//     // Save modules, lessons, and resources to MongoDB
//     const moduleDocs = [];
//     for (let mIndex = 0; mIndex < roadmapData.modules.length; mIndex++) {
//       const module = roadmapData.modules[mIndex];
//       const lessonDocs = [];
//       for (let lIndex = 0; lIndex < module.lessonIds.length; lIndex++) {
//         const lesson = module.lessonIds[lIndex];
//         // Save resources
//         const resourceDocs = await Resource.insertMany(
//           lesson.resourceIds.map((resource: any) => ({
//             ...resource,
//             lessonId: new Types.ObjectId(),
//             createdAt: new Date(),
//             updatedAt: new Date(),
//           }))
//         );
//         // Save lesson
//         const lessonDoc = await Lesson.create({
//           ...lesson,
//           lessonId: `lesson-${mIndex + 1}-${lIndex + 1}`,
//           moduleId: new Types.ObjectId(),
//           resourceIds: resourceDocs.map((r: any) => r._id),
//           quizId: null,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         });
//         lessonDocs.push(lessonDoc._id);
//       }
//       // Save module
//       const moduleDoc = await Module.create({
//         moduleId: `module-${mIndex + 1}`,
//         roadmapId: new Types.ObjectId(),
//         title: module.title,
//         description: module.description,
//         status: mIndex === 0 ? 'in-progress' : 'locked',
//         lessonIds: lessonDocs,
//         quizId: null,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       });
//       moduleDocs.push(moduleDoc._id);
//     }


//     // Initialize user progress
//     await UserProgress.create({
//       userId: personalization.userId,
//       roadmapId: roadmapDoc._id,
//       completedResources: [],
//       completedLessons: [],
//       completedModules: [],
//       failedQuizLessons: [],
//       totalXp: 0,
//       progressPercentage: 0,
//       lastUpdated: new Date(),
//     });

//     return roadmapDoc;
//   } catch (error) {
//     throw new Error('Failed to parse Gemini response or save to database');
//   }