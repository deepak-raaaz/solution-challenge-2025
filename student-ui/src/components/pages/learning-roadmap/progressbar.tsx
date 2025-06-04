import React from 'react';

interface ProgressBarProps {
  percentage: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm text-gray-400 mb-1">
        <span>Progress</span>
        <span>{percentage.toFixed(1)}%</span>
      </div>
      <div className="w-full bg-gray-700/50 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${
            percentage === 100 ? 'bg-green-600' : 'bg-blue-600'
          }`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};