import React from 'react';

export const QuickActions: React.FC = () => {
  const actions = [
    { label: 'Take Practice Quiz', style: 'bg-blue-600 hover:bg-blue-700 text-white' },
    { label: 'Download Resources', style: 'bg-gray-700/40 hover:bg-gray-600/60 text-gray-100' },
    { label: 'View Certificate', style: 'bg-gray-700/40 hover:bg-gray-600/60 text-gray-100' },
  ];

  return (
    <div className="bg-gray-800/20 border border-gray-700/40 rounded-lg p-6">
      <h3 className="font-semibold text-gray-100 mb-4">Quick Actions</h3>
      <div className="space-y-3">
        {actions.map((action, index) => (
          <button
            key={index}
            className={`w-full py-2 px-4 rounded-lg text-sm transition-colors duration-200 ${action.style}`}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};