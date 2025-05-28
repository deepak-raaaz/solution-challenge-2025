import React from 'react';
import { PlayCircleIcon, DocumentTextIcon, CheckCircleIcon } from '@heroicons/react/20/solid';

interface Lesson {
    id: string;
    title: string;
    duration: string;
    progress: number;
    enabled: boolean;
    resources: {
        type: string;
        title: string;
        section: string;
        enabled: boolean;
        color: string;
    }[];
}

interface LessonCardProps {
    index: number;
    lesson: Lesson;
    onSectionNavigation: (section: string) => void;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson, onSectionNavigation, index }) => {
    const getIcon = (type: string) => {
        const className = `w-4 h-4 mr-2`;
        switch (type) {
            case 'video':
                return <PlayCircleIcon className={`${className} text-red-400`} />;
            case 'article':
                return <DocumentTextIcon className={`${className} text-green-400`} />;
            case 'quiz':
            case 'assignment':
                return <CheckCircleIcon className={`${className} text-purple-400`} />;
            default:
                return null;
        }
    };

    return (
        <div
            className={`bg-gray-700/30 border border-gray-600/20 rounded-lg p-4 max-md:p-2 ${!lesson.enabled ? 'opacity-75' : ''}`}
        >
            <div className="flex items-center justify-between max-md:flex-col max-md:items-start max-md:gap-3">
                <div className="flex items-center gap-4">
                    {/* <h4 className="text-lg font-semibold text-white">{index + 1}</h4> */}
                    <h4 className="text-lg font-semibold text-white">{lesson.title}</h4>
                </div>
                {/* <span className="text-blue-400 text-sm">{lesson.duration}</span> */}
                <div className="flex gap-2 flex-wrap">
                    {lesson.resources.map((resource) => (
                        <div
                            key={resource.title}
                            className="bg-gray-600/20 border border-gray-500/20 rounded-lg py-2 px-3"
                        >
                            <div className="flex items-center ">
                                {getIcon(resource.type)}
                                <span className="text-white font-medium text-sm">
                                    {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                                </span>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LessonCard;