import React from 'react';

export const QuickStats: React.FC = () => {
  const stats = [
    { label: 'Study Streak', value: '12 days', color: 'text-blue-400' },
    { label: 'Time Spent', value: '24.5 hours', color: 'text-blue-400' },
    { label: 'Avg. Quiz Score', value: '87%', color: 'text-green-400' },
    { label: 'Badges Earned', value: '5', color: 'text-yellow-400' },
  ];

  return (
    <div className="bg-gray-800/20 border border-gray-700/40 rounded-lg p-6">
      <h3 className="font-semibold text-gray-100 mb-4">Learning Stats</h3>
      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index} className="flex justify-between">
            <span className="text-gray-400">{stat.label}</span>
            <span className={`font-medium ${stat.color}`}>{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};