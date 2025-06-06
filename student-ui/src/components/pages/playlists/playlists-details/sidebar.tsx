import React from 'react';
import { ChatBubbleLeftRightIcon, ChatBubbleOvalLeftIcon, UserIcon, Cog6ToothIcon } from '@heroicons/react/20/solid';
import { ChartNoAxesCombined } from 'lucide-react';

interface SidebarProps {
  data: {
    title: string;
    moduleIds: {
      _id: string;
      title: string;
      description: string;
      lessonIds: {
        _id: string;
        title: string;
        description: string;
        resourceIds: {
          _id: string;
          type: string;
          title: string;
          url: string;
        }[];
      }[];
    }[];
  };
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

  // Mock data for mentor tips, progress stats, and quick actions
  const mentorTips = [
    { title: 'Start with Basics', description: 'Focus on understanding core concepts before diving into advanced topics.', color: 'blue' },
    { title: 'Practice Regularly', description: 'Apply what you learn through practical exercises.', color: 'green' },
  ];

  const progressStats = [
    { label: 'Lessons Completed', value: '0%', color: 'blue' },
    { label: 'Modules Completed', value: '0%', color: 'green' },
  ];

  const quickActions = [
    { label: 'Ask AI Mentor', section: 'mentor', icon: 'chat' },
    { label: 'View Profile', section: 'profile', icon: 'user' },
  ];

  const resources = data.moduleIds.flatMap((module) =>
    module.lessonIds.flatMap((lesson) =>
      lesson.resourceIds.map((resource) => ({
        title: resource.title,
        description: resource.type === 'youtube' ? `Video from ${resource.url}` : `Article from ${resource.url}`,
      }))
    )
  );

  return (
    <div className="space-y-6">

      <div className="bg-gray-800/20 border border-gray-700/40 rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center">
          <ChartNoAxesCombined className="w-5 h-5 mr-2 text-blue-400" />
          Playlist Achievement
        </h3>
        <div className="mb-4">
          <span>
            <span className="text-yellow-500">★</span>{" "}4.8 (245 reviews)
          </span>

        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-gray-800/30 border border-gray-700/60 p-3 rounded-lg flex flex-col items-center">
            <span className="text-2xl font-bold text-purple-400 mb-1">10k</span>
            <p className="text-gray-300 text-sm">Views</p>
          </div>
          <div className="bg-gray-800/30 border border-gray-700/60 p-3 rounded-lg flex flex-col items-center">
            <span className="text-2xl font-bold text-blue-400 mb-1">889</span>
            <p className="text-gray-300 text-sm">Likes</p>
          </div>
          <div className="bg-gray-800/30 border border-gray-700/60 p-3 rounded-lg flex flex-col items-center">
            <span className="text-2xl font-bold text-green-400 mb-1">20k</span>
            <p className="text-gray-300 text-sm">Enrolled</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/20 border border-gray-700/40 rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center">
          <Cog6ToothIcon className="w-5 h-5 mr-2 text-blue-400" />
          AI Mentor
        </h3>
        <div className="space-y-3">
          {mentorTips.map((tip) => (
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

      <div className="bg-gray-800/20 border border-gray-700/40 rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-4">Your Progress</h3>
        <div className="space-y-4">
          {progressStats.map((stat) => (
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

      <div className="bg-gray-800/20 border border-gray-700/40 rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
        <div className="space-y-3">
          {quickActions.map((action) => (
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

      {/* <div className="bg-gray-800/20 border border-gray-700/40 rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-4">Course Resources</h3>
        <div className="space-y-3">
          {resources.map((resource,index) => (
            <a
              key={resource.title + index }
              href="#"
              className="block p-3 bg-gray-700/20 hover:bg-gray-600/30 rounded-lg transition-colors duration-200"
            >
              <div className="text-white font-semibold text-sm">{resource.title}</div>
              <div className="text-gray-400 text-xs">{resource.description}</div>
            </a>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default Sidebar;