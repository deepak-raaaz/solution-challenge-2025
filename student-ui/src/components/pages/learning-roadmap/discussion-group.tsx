import React from 'react';

export const DiscussionGroups: React.FC = () => {
  const groups = [
    { title: 'Data Preprocessing Tips', members: 24, messages: 12 },
    { title: 'ML Study Group', members: 156, messages: 45 },
  ];

  return (
    <div className="bg-gray-800/20 border border-gray-700/40 rounded-lg p-6">
      <h3 className="font-semibold text-gray-100 mb-4">Related Discussions</h3>
      <div className="space-y-3">
        {groups.map((group, index) => (
          <div key={index} className="bg-gray-700/20 border border-gray-600/40 rounded-lg p-3">
            <h4 className="text-sm font-medium text-gray-100 mb-1">{group.title}</h4>
            <p className="text-gray-400 text-xs mb-2">
              {group.members} members • {group.messages} new messages
            </p>
            <button className="text-blue-400 text-xs hover:text-blue-300">Join Discussion</button>
          </div>
        ))}
      </div>
    </div>
  );
};