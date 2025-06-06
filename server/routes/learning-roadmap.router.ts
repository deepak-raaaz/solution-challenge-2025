import { setResourceCompleted } from '../controllers/students/resource.controller';
import { createLearningRoadmap, getLearningRoadmapById, getResourceById } from '../controllers/students/learning-roadmap.controller';
import { isAuthenticate } from '../middleware/auth';
import express from 'express';
import { getQuizById } from '../controllers/students/quiz/quiz.controller';
import { submitQuiz } from '../controllers/students/quiz/submit-quiz.controller';
import { newResource } from '../controllers/students/quiz/new-resource.controller';
import { createReattemptNewQuiz } from '../controllers/students/quiz/quiz-reattempt.controller';


const LearningRoadmapRouter = express.Router();

LearningRoadmapRouter.post('/create-learning-roadmap', isAuthenticate, createLearningRoadmap);


LearningRoadmapRouter.get('/learning-roadmap/:learningRoadmapId', isAuthenticate, getLearningRoadmapById);


LearningRoadmapRouter.get('/learning-roadmap/resource/:resourceId', isAuthenticate, getResourceById);


LearningRoadmapRouter.put('/learning-roadmap/resource/completed/:resourceId', isAuthenticate, setResourceCompleted);

LearningRoadmapRouter.get('/learning-roadmap/quiz/:quizId', isAuthenticate, getQuizById);

LearningRoadmapRouter.put('/learning-roadmap/submit-quiz/:quizId', isAuthenticate, submitQuiz);


LearningRoadmapRouter.put('/learning-roadmap/new-resource/:lessonId', isAuthenticate, newResource);


LearningRoadmapRouter.put('/learning-roadmap/create-reattempt-new-quiz', isAuthenticate, createReattemptNewQuiz);


export default LearningRoadmapRouter