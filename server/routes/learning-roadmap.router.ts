import { createLearningRoadmap, getLearningRoadmapById } from '../controllers/students/learning-roadmap.controller';
import { isAuthenticate } from '../middleware/auth';
import express from 'express';


const LearningRoadmapRouter = express.Router();

LearningRoadmapRouter.post('/create-learning-roadmap', isAuthenticate, createLearningRoadmap);


LearningRoadmapRouter.get('/learning-roadmap/:learningRoadmapId', isAuthenticate, getLearningRoadmapById);



export default LearningRoadmapRouter