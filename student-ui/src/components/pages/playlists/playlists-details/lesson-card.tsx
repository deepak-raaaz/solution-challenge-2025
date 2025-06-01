import React, { useState } from 'react';
import { PlayCircleIcon, DocumentTextIcon, CheckCircleIcon } from '@heroicons/react/20/solid';
import { ChevronDownIcon, TrendingDown, TrendingUp } from 'lucide-react';

interface Lesson {
    id: string;
    title: string;
    duration: number;
    progress: number;
    enabled: boolean;
    status: string;
    resources: any[];
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
            case 'youtube':
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

    const [expandedLesson, setExpandedLesson] = useState<string[]>([]);

    const toggleLesson = (lessonId: string) => {
        setExpandedLesson((prev) =>
            prev.includes(lessonId)
                ? prev.filter((id) => id !== lessonId)
                : [...prev, lessonId]
        );
    };

    // const uniqueResources = lesson.resources.reduce((acc: any, resource: any) => {
    //     if (!acc.some((res: any) => res.type === resource.type)) {
    //         acc.push(resource);
    //     }
    //     return acc;
    // }
    // , []);
    return (
        <div
            className={`bg-gray-800/30 border border-gray-700/20 rounded-lg p-4 max-md:p-2 ${!lesson.enabled ? 'opacity-75' : ''}`}
        >
            <div className="flex  justify-between flex-col gap-3">
                <div className="flex items-center justify-between gap-4" onClick={() => lesson.status !== 'draft' && toggleLesson(lesson.id)}>
                    {/* <h4 className="text-lg font-semibold text-white">{index + 1}</h4> */}
                    <h4 className="text-base font-medium text-white">{lesson.title}</h4>
                    <ChevronDownIcon
                        className={`w-6 h-6 ${lesson.status !== 'draft' ? 'text-gray-400' : 'text-gray-500'} transform transition-transform duration-200 ${expandedLesson.includes(lesson.id) ? 'rotate-180' : ''}`}
                    />
                </div>
                {/* <span className="text-blue-400 text-sm">{lesson.duration}</span> */}
                {expandedLesson.includes(lesson.id) &&
                    <div className="flex gap-2 flex-wrap">
                        {lesson.resources.map((resource: any) => (
                            <div
                                key={resource.title}
                                className="bg-gray-600/20 border border-gray-500/20 rounded-lg py-2 px-3 max-w-48"
                            >
                                {/* <div className="flex items-center ">
                                    {getIcon(resource.type)}
                                    <span className="text-white font-medium text-sm">
                                        {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                                    </span>
                                </div> */}
                                <img src={resource.thumbnailUrl} alt="" className='w-full aspect-video' />
                                <div className="text-white font-semibold text-sm line-clamp-2">{resource.title}</div>
                                <div className="text-gray-400 text-xs line-clamp-2">{resource.type === 'youtube' ? `Video from ${resource.url}` : `Article from ${resource.url}`}</div>
                                {
                                    resource.type !== 'article' &&
                                    <div className="flex mt-2">
                                        <div className={` px-2 bg-gradient-to-br  h-7 rounded-md flex text-[14px] gap-2 items-center text-white 
                                            ${resource.sentiment.message == 'positive' ? 'from-green-600 to-green-800' : resource.sentiment.message == 'negative' ? 'from-red-600 to-red-800' : 'from-yellow-600 to-yellow-800'}
                                            `}>
                                            {
                                                resource.sentiment.message == 'positive' ?
                                                    <TrendingUp className='text-white' size={20} /> : resource.sentiment.message == 'negative' ?
                                                        <TrendingDown className='text-white' size={20} /> : <TrendingUp className='text-white' size={20} />
                                            }
                                            <span>{resource.sentiment.score}</span>
                                        </div>
                                        {/* <span>Sentiment: {resource.sentiment.message}</span> */}
                                    </div>
                                }
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    );
};

export default LessonCard;