import { setResourceCompleted } from '../controllers/students/resource.controller';
import { createLearningRoadmap, getLearningRoadmapById, getResourceById } from '../controllers/students/learning-roadmap.controller';
import { isAuthenticate } from '../middleware/auth';
import express from 'express';


const LearningRoadmapRouter = express.Router();

LearningRoadmapRouter.post('/create-learning-roadmap', isAuthenticate, createLearningRoadmap);


LearningRoadmapRouter.get('/learning-roadmap/:learningRoadmapId', isAuthenticate, getLearningRoadmapById);


LearningRoadmapRouter.get('/learning-roadmap/resource/:resourceId', isAuthenticate, getResourceById);


LearningRoadmapRouter.put('/learning-roadmap/resource/completed/:resourceId', isAuthenticate, setResourceCompleted);


export default LearningRoadmapRouter