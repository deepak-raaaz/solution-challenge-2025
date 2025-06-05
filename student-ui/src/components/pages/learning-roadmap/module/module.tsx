import { useLearningRoadmapQuery } from '@/redux/features/api/generate/generateApi';
import React from 'react';
import ModuleHeader from './module-header';
import LessonCard from './lesson-card';
import { AIMentor } from '../ai-mentor';
import { QuickStats } from '../quick-starts';
import { DiscussionGroups } from '../discussion-group';
import QuickActions from './quick-action';

// Interfaces
interface Module {
    id: string;
    title: string;
    description: string;
    status: 'completed' | 'in-progress' | 'locked';
    progress: number;
    lessons: Lesson[];
}

interface Lesson {
    id: string;
    title: string;
    description: string;
    status: 'completed' | 'in-progress' | 'locked';
    progress: number;
    resources: Resource[];
}

interface Resource {
    type: 'video' | 'article' | 'quiz' | 'project';
    title: string;
    duration: string;
    status: 'completed' | 'in-progress' | 'locked';
    icon: React.ReactNode;
}
interface ModuleProps {
    roadmapId: string; 
    moduleId: string
}
const getResourceIcon = (type: string) => {
    switch (type) {
      case 'youtube':
        return (
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6 4h1m4 0h1M9 6h6"></path>
          </svg>
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
      default:
        return (
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
        );
    }
  };

  
// ModulePage Component
const Module:React.FC<ModuleProps> = ({ roadmapId, moduleId }) => {

    const { data, isLoading, error } = useLearningRoadmapQuery(roadmapId);

    if (isLoading) return <div className="py-20 text-gray-100">Loading...</div>;
    if (error || !data?.data) return <div className="py-20 text-red-500">Error loading module</div>;
    if (!moduleId) return <div className="py-20 text-red-500">Module ID not provided</div>;

    const roadmapData = data.data;
    const moduleData = roadmapData.modules.find((m: any) => m._id === moduleId);

    if (!moduleData) return <div className="py-20 text-red-500">Module not found</div>;

    // Transform module data
    const transformedModule: Module = {
        id: moduleData.moduleId,
        title: moduleData.title,
        description: moduleData.description,
        status: moduleData.status,
        lessons: moduleData.lessonIds.map((lesson: any) => {
            const resources = lesson.resourceIds.map((resource: any) => ({
                type: resource.type === 'youtube' ? 'video' : resource.type,
                title: resource.title,
                duration: resource.metadata?.duration
                    ? `${Math.floor(resource.metadata.duration / 60)} min`
                    : resource.type === 'article'
                        ? '10 min read'
                        : 'Assignment',
                status: resource.status,
                icon: getResourceIcon(resource.type),
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
        }),
        progress: 0, // Calculated below
    };

    // Calculate module progress
    const totalLessons = transformedModule.lessons.length;
    const completedLessons = transformedModule.lessons.filter((l) => l.status === 'completed').length;
    transformedModule.progress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

    return (
        <section id="module-viewer" className="min-h-screen my-20 p-6">
            <ModuleHeader module={transformedModule} roadmapTitle={roadmapData.title} />
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3">
                    <div className="relative">
                        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 via-purple-600 to-gray-600"></div>
                        {transformedModule.lessons.map((lesson) => (
                            <LessonCard key={lesson.id} lesson={lesson} />
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

export default Module