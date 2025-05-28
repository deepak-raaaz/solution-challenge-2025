import { ChevronDownIcon } from 'lucide-react';
import React, { useState } from 'react';
import LessonCard from './lesson-card';

interface Module {
  id: string;
  title: string;
  description: string;
  lessons: {
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
  }[];
  duration: string;
  status: string;
  enabled: boolean;
}

interface ModuleListProps {
  modules:any;
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

  return (
    <div className="space-y-6">
      {modules.map((module:any) => (
        <div
          key={module.id}
          className={`bg-gray-800/20 border border-gray-700/40 rounded-lg overflow-hidden ${!module.enabled ? 'opacity-75' : ''}`}
        >
          <button
            onClick={() => module.enabled && toggleModule(module.id)}
            className="w-full p-6 text-left hover:bg-gray-700/30 transition-colors duration-200 disabled:cursor-not-allowed"
            disabled={!module.enabled}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 `}
                >
                  {module.enabled ? (
                    <span className="text-white font-bold">
                      {modules.indexOf(module) + 1}
                    </span>
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
                <div>
                  <h3
                    className={`text-xl font-bold ${module.enabled ? 'text-white' : 'text-gray-400'}`}
                  >
                    {module.title}
                  </h3>
                  <p className={`text-sm ${module.enabled ? 'text-gray-400' : 'text-gray-500'}`}>
                    {module.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="text-right mr-4">
                  <div className={`text-sm ${module.enabled ? 'text-gray-400' : 'text-gray-500'}`}>
                    {module.duration}
                  </div>
                  {/* <div
                    className={`text-sm font-semibold ${module.enabled ? 'text-green-400' : 'text-gray-500'}`}
                  >
                    {module.status}
                  </div> */}
                </div>
                <ChevronDownIcon
                  className={`w-6 h-6 ${module.enabled ? 'text-gray-400' : 'text-gray-500'} transform transition-transform duration-200 ${expandedModules.includes(module.id) ? 'rotate-180' : ''}`}
                />
              </div>
            </div>
          </button>
          {expandedModules.includes(module.id) && (
            <div className="border-t border-gray-700/40">
              <div className="p-6 space-y-4">
                {module.lessons.map((lesson:any,index:number) => (
                  <LessonCard
                  index={index}
                    key={lesson.id}
                    lesson={lesson}
                    onSectionNavigation={onSectionNavigation}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
      <div className="text-center py-8">
        <div className="text-gray-400 mb-4">7 more modules to unlock...</div>
        <div className="flex justify-center space-x-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-2 h-2 bg-gray-600 rounded-full"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModuleList;