import { ChevronDownIcon } from 'lucide-react';
import React, { useState } from 'react';
import LessonCard from './lesson-card';

interface Module {
  _id: string;
  title: string;
  description: string;
  lessonIds: {
    _id: string;
    title: string;
    description: string;
    duration: number;
    resourceIds: {
      _id: string;
      type: string;
      title: string;
      url: string;
      sentiment: {
        score: string;
        message: string;
      };
      metadata: {
        channel?: string;
        source?: string;
      };
    }[];
    status: string;
  }[];
  status: string;
}

interface ModuleListProps {
  modules: Module[];
  onSectionNavigation: (section: string) => void;
}

const ModuleList: React.FC<ModuleListProps> = ({ modules, onSectionNavigation }) => {
  const [expandedModules, setExpandedModules] = useState<string[]>([]);

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  // Function to truncate description to approximately 100 characters
  const truncateDescription = (description: string, maxLength: number = 100) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength).trim() + '...';
  };

  return (
    <div className="space-y-6 max-md:space-y-3 bg-gray-800/10 border border-gray-700/40 p-4 rounded-lg ">
      <h1 className='text-lg font-semibold'>Modules</h1>
      {modules.map((module, index) => (
        <div
          key={module._id}
          className={`bg-gray-800/20 border border-gray-700/40 rounded-lg overflow-hidden ${module.status !== 'draft' ? '' : 'opacity-75'}`}
        >
          <button
            onClick={() => module.status !== 'draft' && toggleModule(module._id)}
            className="w-full p-6 text-left hover:bg-gray-700/30 transition-colors duration-200 disabled:cursor-not-allowed"
            disabled={module.status === 'draft'}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className={`w-12 h-12 max-sm:w-6 max-sm:h-8 rounded-full flex items-center justify-center mr-4`}
                >
                  {module.status !== 'draft' ? (
                    <span className="text-white font-bold">{index + 1}</span>
                  ) : (
                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <div className='w-full'>
                  <h3
                    className={`text-lg font-semibold ${module.status !== 'draft' ? 'text-white' : 'text-gray-400'}`}
                  >
                    {module.title}
                  </h3>
                  <p className={`text-sm ${module.status !== 'draft' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {expandedModules.includes(module._id)
                      ? module.description
                      : truncateDescription(module.description)}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="text-right mr-4">
                  <div className={`text-sm ${module.status !== 'draft' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {(() => {
                      const totalSeconds = module.lessonIds.reduce((total, lesson) => total + lesson.duration, 0);
                      const totalHours = totalSeconds / 3600;

                      return totalHours < 1
                        ? `${Math.round(totalSeconds / 60)} min`
                        : `${Math.round(totalHours * 100) / 100} hrs`;
                    })()}
                  </div>
                </div>
                <ChevronDownIcon
                  className={`w-6 h-6 ${module.status !== 'draft' ? 'text-gray-400' : 'text-gray-500'} transform transition-transform duration-200 ${expandedModules.includes(module._id) ? 'rotate-180' : ''}`}
                />
              </div>
            </div>
          </button>
          {expandedModules.includes(module._id) && (
            <div className="border-t border-gray-700/40">
              <div className="p-6 space-y-4 max-md:p-3 max-md:space-y-2">
                {module.lessonIds.map((lesson, lessonIndex) => (
                  <LessonCard
                    key={lesson._id}
                    index={lessonIndex}
                    lesson={{
                      id: lesson._id,
                      title: lesson.title,
                      duration: lesson.duration,
                      progress: 0,
                      status: lesson.status,
                      enabled: lesson.status !== 'draft',
                      resources: lesson.resourceIds
                    }}
                    onSectionNavigation={onSectionNavigation}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ModuleList;