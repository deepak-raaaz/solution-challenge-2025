import { isAuthenticate } from '../middleware/auth';
import { enhancePrompt, generateTopics } from '../controllers/prompt.controller';
import express from 'express';
import { generateAssessment, getAssessment, getPlaylistPersonalization, submitAssessment } from '../controllers/assessment.controller';

const promptRouter = express.Router();

promptRouter.post('/enhance-prompt', isAuthenticate, enhancePrompt);

promptRouter.post('/generate-topics', isAuthenticate, generateTopics);

promptRouter.post('/generate-assessment', isAuthenticate, generateAssessment);

promptRouter.get('/assessment/:assessmentId', isAuthenticate, getAssessment);

promptRouter.put('/assessment-submit/:assessmentId', isAuthenticate, submitAssessment);

promptRouter.get('/playlist-personalization/:personalizationId', isAuthenticate, getPlaylistPersonalization);

export default promptRouter;