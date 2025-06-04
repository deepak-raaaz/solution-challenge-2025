import React from 'react';

interface Resource {
  type: 'video' | 'article' | 'quiz' | 'project';
  title: string;
  duration: string;
  status: 'completed' | 'in-progress' | 'locked';
  icon: React.ReactNode;
}

interface ResourceCardProps {
  resource: Resource;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  const buttonStyles = {
    completed: 'bg-gray-600/40 text-gray-300',
    'in-progress': 'bg-blue-600 hover:bg-blue-700 text-white',
    locked: 'bg-gray-600 text-gray-400 cursor-not-allowed',
  };

  const buttonText = {
    completed: resource.type === 'video' ? '✓ Watched' : resource.type === 'article' ? '✓ Read' : resource.type === 'quiz' ? '✓ Passed (85%)' : '✓ Submitted',
    'in-progress': resource.type === 'article' ? 'Continue Reading' : 'Start',
    locked: 'Locked',
  };

  return (
    <div className="bg-gray-700/20 border border-gray-600/40 rounded-lg p-4">
      <div className="flex items-center space-x-3 mb-3">
        <div className={`p-2 rounded ${resource.status === 'completed' ? 'bg-green-600' : resource.status === 'in-progress' ? 'bg-blue-600' : 'bg-gray-500'}`}>
          {resource.icon}
        </div>
        <div>
          <h4 className="font-medium text-gray-100">{resource.title}</h4>
          <p className="text-gray-400 text-sm">{resource.duration}</p>
        </div>
      </div>
      <button className={`w-full py-2 rounded text-sm transition-colors duration-200 ${buttonStyles[resource.status]}`}>
        {buttonText[resource.status]}
      </button>
    </div>
  );
};