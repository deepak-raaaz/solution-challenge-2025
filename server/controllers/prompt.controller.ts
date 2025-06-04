import { NextFunction, Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { cleanJsonResponse } from "../utlis/cleanJson.helper";

const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY || "YOUR_API_KEY"
);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });



// enhance the prompt
export const enhancePrompt = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        // Construct a detailed instruction for the Gemini AI to enhance the user’s prompt
        const finalPrompt = `
            You are an AI assistant for a learning platform, Edu AI, that generates personalized learning playlists. Playlists are organized into modules, each containing lessons with curated resources and assessments.

            The user has provided the following prompt: "${prompt}".
            The user’s prompt specifies what they want to learn, the desired playlist, and what modules or lessons it should cover (e.g., "Build a Machine Learning Playlist" or "Create a playlist with modules on Python basics").

            Your task is to enhance the user’s prompt to make it specific, clear, and optimized for generating a structured learning playlist. The enhanced prompt should:
            - Specify the topic or skill (e.g., Machine Learning, Web Development).
            - Clarify the scope, structure, or specific modules and lessons (e.g., key concepts, specific topics, or learning outcomes).
            - Focus only on the learning content and playlist structure, without mentioning specific platforms, resource types, or subsequent personalization steps.
            - Ensure the tone is professional, concise, and suitable for the Edu AI platform.

            Return the enhanced prompt as a single, clean string. Do not include any additional explanations or markdown formatting.
        `;

        const result = await model.generateContent(finalPrompt);
        const response = await result.response;
        const cleanedText = cleanJsonResponse(response.text());

        return res.status(200).json({
            enhancedPrompt: cleanedText,
        });

    } catch (error) {
        next(error);
    }
};

//generate topics 
export const generateTopics = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        const finalPrompt = `
            You are an AI assistant for a learning platform, Edu AI, that generates personalized learning playlists. Playlists are organized into modules, each representing a high-level topic with lessons and assessments.

            The user has provided the following prompt: "${prompt}".
            Your task is to generate a list of high-level module topics based on the user’s prompt. Each topic should:
            - Be a concise, clear, and high-level subject that represents a module in a learning playlist (e.g., "Machine Learning" or "Python Programming", not granular subtopics like "Supervised Learning" or "Variables").
            - Be assigned a skill level: "Beginner", "Intermediate", or "Advanced", based on the complexity of the topic and its relevance to the prompt.
            - Avoid including subtopics or overly specific subjects.

            Return the list of topics as a JSON array of objects, where each object has the following structure:
            { "topic": string, "level": "Beginner" | "Intermediate" | "Advanced" }
            Ensure the output is valid JSON without any additional explanations or markdown formatting.
        `;

        const result = await model.generateContent(finalPrompt);
        const response = await result.response;
        const cleanedText = cleanJsonResponse(response.text());

        // Parse the cleaned text as JSON to ensure it's an array of objects
        let topics;
        try {
            topics = JSON.parse(cleanedText);
            // Validate that topics is an array and each item has topic and level
            if (!Array.isArray(topics) || !topics.every(item => typeof item.topic === 'string' && ['Beginner', 'Intermediate', 'Advanced'].includes(item.level))) {
                throw new Error('Invalid topics format');
            }
        } catch (parseError) {
            return res.status(500).json({ error: "Failed to parse topics response" });
        }

        return res.status(200).json({
            topics,
        });

    } catch (error) {
        next(error);
    }
};