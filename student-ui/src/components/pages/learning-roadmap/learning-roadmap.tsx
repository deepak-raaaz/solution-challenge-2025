"use client"
import React from 'react';
import { ProgressBar } from './progressbar';
import ModuleCard from './modulecard';
import { AIMentor } from './ai-mentor';
import { DiscussionGroups } from './discussion-group';
import { QuickActions } from './quick-actions';
import { QuickStats } from './quick-starts';
import { useLearningRoadmapQuery } from '@/redux/features/api/generate/generateApi';

// Interfaces
export interface Module {
  roadmapId:string;
  _id:string;
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'locked';
  progress: number;
  lessons: Lesson[];
  quiz?: {
    score: number;
    total: number;
    xp: number;
  };
  nextTask?: {
    title: string;
    description: string;
  };
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'locked';
  progress: number;
  resources: Resource[];
}

export interface Resource {
  _id:string;
  lessonId:string;
  url:string;
  thumbnailUrl:string;
  sentiment: {
    score:string;
    message:string;
  };
  metadata: {
    duration:string;
  }
  type: 'video' | 'article' | 'quiz' | 'project';
  title: string;
  duration: string;
  status: 'completed' | 'in-progress' | 'locked' | 'unlocked';
  icon: React.ReactNode;
}

interface LearningRoadmapProps {
  roadmapId: string;
}

export const getResourceIcon = (type: string) => {
  switch (type) {
    case 'youtube':
      return (
        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
      );
    case 'article':
      return (
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
      );
    case 'quiz':
      return (
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
        </svg>
      );
    case 'project':
      return (
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
        </svg>
      );
      case 'youtube':
      return (
        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
      );
    default:
      return (
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
      );
  }
};

// LearningRoadmap Component
const LearningRoadmap: React.FC<LearningRoadmapProps> = ({ roadmapId }) => {
  const { data, isLoading, error } = useLearningRoadmapQuery(roadmapId);

  if (isLoading) return <div className="text-gray-100">Loading...</div>;
  if (error || !data?.data) return <div className="text-red-500">Error loading roadmap</div>;

  const roadmapData = data.data;

  // Transform API data to match Module interface
  const transformedModules: Module[] = roadmapData.modules.map((module: any, index: number) => {
    const lessons = module.lessonIds.map((lesson: any) => {
      const resources = lesson.resourceIds.map((resource: any) => ({
        _id:resource._id,
        type: resource.type === 'youtube' ? 'video' : resource.type,
        title: resource.title,
        duration: resource.metadata?.duration
          ? `${Math.floor(resource.metadata.duration / 60)} min`
          : resource.type === 'article'
            ? '10 min read'
            : 'Assignment',
        status: resource.status,
        icon: getResourceIcon(resource.type),
        ...resource
      }));

      const totalResources = resources.length;
      const completedResources = resources.filter((r: Resource) => r.status === 'completed').length;
      const lessonProgress = totalResources > 0 ? (completedResources / totalResources) * 100 : 0;

      return {
        id: lesson.lessonId,
        title: lesson.title,
        description: lesson.description,
        status: lesson.status,
        progress: lessonProgress,
        resources,
      };
    });

    const totalLessons = lessons.length;
    const completedLessons = lessons.filter((l: Lesson) => l.status === 'completed').length;
    const moduleProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

    const nextTaskLesson = lessons.find((l: Lesson) => l.status === 'in-progress' || l.status === 'locked');
    const nextTaskResource = lessons
      .flatMap((l: Lesson) => l.resources)
      .find((r: Resource) => r.status === 'in-progress' || r.status === 'locked');

    return {
      roadmapId: roadmapId,
      _id:module._id,
      id: index + 1,
      title: module.title,
      description: module.description,
      status: module.status,
      progress: moduleProgress,
      lessons,
      quiz: module.quizId ? { score: 0, total: 10, xp: 0 } : undefined,
      nextTask: nextTaskResource
        ? {
          title: `Next: ${nextTaskResource.title}`,
          description: nextTaskResource.status === 'in-progress' ? 'Continue where you left off' : 'Start this resource',
        }
        : nextTaskLesson
          ? {
            title: `Next: ${nextTaskLesson.title}`,
            description: 'Start this lesson',
          }
          : undefined,
    };
  });

  const totalModules = transformedModules.length;
  const completedModules = transformedModules.filter((m) => m.status === 'completed').length;
  const overallProgress = {
    completed: completedModules,
    total: totalModules,
    percentage: totalModules > 0 ? (completedModules / totalModules) * 100 : 0,
    estimatedWeeks: Math.ceil((totalModules - completedModules) * 1.5),
  };


  return (
    <section id="roadmap-viewer" className="min-h-screen my-20 p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-100 mb-2">{roadmapData.title}</h1>
            <p className="text-gray-400">{roadmapData.description}</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
              Save Progress
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-gray-100 px-4 py-2 rounded-lg transition-colors duration-200">
              Share Course
            </button>
          </div>
        </div>
        <div className="bg-gray-800/20 border border-gray-700/40 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-100">Overall Progress</h3>
            <span className="text-blue-400 font-medium">
              {overallProgress.completed} of {overallProgress.total} modules completed
            </span>
          </div>
          <ProgressBar percentage={overallProgress.percentage} />
          <div className="flex justify-between text-sm text-gray-400">
            <span>{overallProgress.percentage.toFixed(1)}% Complete</span>
            <span>Estimated: {overallProgress.estimatedWeeks} weeks remaining</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 via-purple-600 to-gray-600"></div>
            {transformedModules.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-6">
            <AIMentor />
            <QuickStats />
            <DiscussionGroups />
            <QuickActions />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningRoadmap