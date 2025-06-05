import { useLearningRoadmapQuery } from '@/redux/features/api/generate/generateApi';
import React from 'react';
import ModuleHeader from './module-header';
import LessonCard from './lesson-card';
import { AIMentor } from '../ai-mentor';
import { QuickStats } from '../quick-starts';
import { DiscussionGroups } from '../discussion-group';
import QuickActions from './quick-action';
import { getResourceIcon } from '../learning-roadmap';
import ModuleNavigation from './module-navigation';

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
        id: moduleData._id,
        title: moduleData.title,
        description: moduleData.description,
        status: moduleData.status,
        lessons: moduleData.lessonIds.map((lesson: any) => {
            const resources = lesson.resourceIds.map((resource: any) => ({
                roadmapId : roadmapId,
                moduleId : moduleData._id,
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
        }),
        progress: 0, // Calculated below
    };

    // Calculate module progress
    const totalLessons = transformedModule.lessons.length;
    const completedLessons = transformedModule.lessons.filter((l) => l.status === 'completed').length;
    transformedModule.progress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

    return (
        <section id="module-viewer" className="min-h-screen my-20 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3">
            <ModuleHeader module={transformedModule} roadmapTitle={roadmapData.title} />
                    <div className="relative">
                        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 via-purple-600 to-gray-600"></div>
                        {transformedModule.lessons.map((lesson,index) => (
                            <LessonCard key={lesson.id} lesson={lesson} index={index} />
                        ))}
                    </div>
                </div>
                <div className="lg:col-span-1">
                    <div className="sticky top-6 space-y-6">
                        <ModuleNavigation modules={roadmapData.modules} onModuleSelect={() => {}}/>
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