import React from 'react';
import { ProgressBar } from './progressbar';
import { Module } from './learning-roadmap';
import LessonCard from './lesson-card';

// ModuleCard Component
interface ModuleCardProps {
  module: Module;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module }) => {
  const statusStyles = {
    completed: 'bg-green-600',
    'in-progress': 'bg-blue-600 animate-pulse',
    locked: 'bg-gray-600 opacity-60',
  };

  const statusBadgeStyles = {
    completed: 'bg-green-600 text-white',
    'in-progress': 'bg-blue-600 text-white',
    locked: 'bg-gray-600 text-gray-300',
  };

  return (
    <div className={`relative mb-8 ${module.status === 'locked' ? 'opacity-60' : ''}`}>
      <div className="flex items-start">
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center z-10 border-4 border-gray-900 ${statusStyles[module.status]}`}
        >
          {module.status === 'completed' ? (
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          ) : module.status === 'in-progress' ? (
            <span className="text-white font-bold text-lg">{module.id}</span>
          ) : (
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          )}
        </div>
        <div className="ml-6 flex-1">
          <div
            className={`bg-gray-800/20 border rounded-lg p-6 ${module.status === 'in-progress' ? 'border-blue-500' : 'border-gray-700/40'
              }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-100">{module.title}</h3>
              <span className={`text-xs px-2 py-1 rounded ${statusBadgeStyles[module.status]}`}>
                {module.status.charAt(0).toUpperCase() + module.status.slice(1)}
              </span>
            </div>
            <p className="text-gray-300 mb-4">{module.description}</p>
            {module.status !== 'locked' && (
              <>
                <ProgressBar percentage={module.progress} />
                <div className="space-y-4">
                  {module.lessons.map((lesson) => (
                    <LessonCard key={lesson.id} lesson={lesson} />
                  ))}
                </div>
                {module.quiz && (
                  <div className="bg-green-900 border border-green-700 rounded-lg p-4 mt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-green-600 p-2 rounded">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-100">Quiz Completed</h4>
                          <p className="text-green-400 text-sm">
                            Score: {module.quiz.score}/{module.quiz.total} (
                            {((module.quiz.score / module.quiz.total) * 100).toFixed(0)}%)
                          </p>
                        </div>
                      </div>
                      <span className="bg-yellow-600 text-white text-xs px-2 py-1 rounded">
                        +{module.quiz.xp} XP
                      </span>
                    </div>
                  </div>
                )}
                {module.nextTask && (
                  <div className="bg-blue-900 border border-blue-700 rounded-lg p-4 mt-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-600 p-2 rounded">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-100">{module.nextTask.title}</h4>
                        <p className="text-blue-400 text-sm">{module.nextTask.description}</p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            {module.status === 'locked' && (
              <div className="text-center py-8">
                <svg className="w-12 h-12 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
                <p className="text-gray-500">Complete Module {module.id - 1} to unlock</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleCard