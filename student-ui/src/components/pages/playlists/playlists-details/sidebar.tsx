import React from 'react';
import { courseData } from './course-data';
import { ChatBubbleLeftRightIcon, ChatBubbleOvalLeftIcon, UserIcon } from '@heroicons/react/20/solid';
import { Cog6ToothIcon } from '@heroicons/react/20/solid';

interface SidebarProps {
  data: typeof courseData;
  onSectionNavigation: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ data, onSectionNavigation }) => {
  const getActionIcon = (icon: string) => {
    const className = 'w-4 h-4 mr-2';
    switch (icon) {
      case 'chat':
        return <ChatBubbleLeftRightIcon className={className} />;
      case 'message':
        return <ChatBubbleOvalLeftIcon className={className} />;
      case 'user':
        return <UserIcon className={className} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Mentor */}
      <div className="bg-gray-800/20 border border-gray-700/40 rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center">
          <Cog6ToothIcon className="w-5 h-5 mr-2 text-blue-400" />
          AI Mentor
        </h3>
        <div className="space-y-3">
          {data.mentorTips.map((tip) => (
            <div
              key={tip.title}
              className={`p-3 bg-${tip.color}-900 bg-opacity-30 border border-${tip.color}-700 rounded-lg`}
            >
              <div className={`text-${tip.color}-400 font-semibold text-sm mb-1`}>{tip.title}</div>
              <div className="text-gray-300 text-sm">{tip.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Stats */}
      <div className="bg-gray-800/20 border border-gray-700/40 rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-4">Your Progress</h3>
        <div className="space-y-4">
          {data.progressStats.map((stat) => (
            <div key={stat.label}>
              <div className="flex justify-between mb-2">
                <span className="text-gray-300">{stat.label}</span>
                <span className={`text-${stat.color}-400 font-semibold`}>{stat.value}</span>
              </div>
              <div className="w-full bg-gray-700/20 rounded-full h-2">
                <div
                  className={`bg-${stat.color}-500 h-2 rounded-full`}
                  style={{ width: stat.value }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800/20 border border-gray-700/40 rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
        <div className="space-y-3">
          {data.quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => onSectionNavigation(action.section)}
              className="w-full px-4 py-3 bg-gray-700/20 hover:bg-gray-600/30 text-white rounded-lg font-semibold transition-colors duration-200 flex items-center"
            >
              {getActionIcon(action.icon)}
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Course Resources */}
      <div className="bg-gray-800/20 border border-gray-700/40 rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-4">Course Resources</h3>
        <div className="space-y-3">
          {data.resources.map((resource) => (
            <a
              key={resource.title}
              href="#"
              className="block p-3 bg-gray-700/20 hover:bg-gray-600/30 rounded-lg transition-colors duration-200"
            >
              <div className="text-white font-semibold text-sm">{resource.title}</div>
              <div className="text-gray-400 text-xs">{resource.description}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;