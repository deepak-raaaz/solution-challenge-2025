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
  const getIcon = (type: string, color: string) => {
    const className = `w-4 h-4 text-${color}-400 mr-2`;
    switch (type) {
      case 'video':
        return <PlayCircleIcon className={className} />;
      case 'article':
        return <DocumentTextIcon className={className} />;
      case 'quiz':
      case 'assignment':
        return <CheckCircleIcon className={className} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`bg-gray-700/30 border border-gray-600/20 rounded-lg p-4 ${!lesson.enabled ? 'opacity-75' : ''}`}
    >
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-4">
        {/* <h4 className="text-lg font-semibold text-white">{index + 1}</h4> */}
        <h4 className="text-lg font-semibold text-white">{lesson.title}</h4>
        </div>
        {/* <span className="text-blue-400 text-sm">{lesson.duration}</span> */}
      <div className="flex gap-2">
        {lesson.resources.map((resource) => (
          <div
            key={resource.title}
            className="bg-gray-600/20 border border-gray-500/20 rounded-lg py-2 px-3"
          >
            <div className="flex items-center ">
              {getIcon(resource.type, resource.color)}
              <span className="text-white font-medium text-sm">
                {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
              </span>
            </div>
            {/* <p className="text-gray-300 text-sm mb-2">{resource.title}</p> */}
            {/* <button
              onClick={() => resource.enabled && onSectionNavigation(resource.section)}
              disabled={!resource.enabled}
              className={`w-full px-3 py-2 text-white rounded text-sm font-semibold transition-colors duration-200 ${resource.enabled ? `bg-${resource.color}-500 hover:bg-${resource.color}-600` : 'bg-gray-500 text-gray-300 cursor-not-allowed'}`}
            >
              {resource.enabled ? `View ${resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}` : 'Locked'}
            </button> */}
          </div>
        ))}
      </div>
      </div>
      {/* <div className="mt-3 w-full bg-gray-600/20 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full"
          style={{ width: `${lesson.progress}%` }}
        ></div>
      </div> */}
    </div>
  );
};

export default LessonCard;