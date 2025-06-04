import React from 'react';

export const AIMentor: React.FC = () => {
  return (
    <div className="bg-gray-800/20 border border-gray-700/40 rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 w-12 h-12 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-gray-100">AI Mentor</h3>
          <p className="text-gray-400 text-sm">Your learning assistant</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="bg-purple-900 border border-purple-700 rounded-lg p-4">
          <h4 className="font-medium text-gray-100 mb-2">💡 Tip for Module 3</h4>
          <p className="text-gray-300 text-sm">
            Focus on understanding missing data patterns before applying imputation techniques.
          </p>
        </div>
        <div className="bg-blue-900 border border-blue-700 rounded-lg p-4">
          <h4 className="font-medium text-gray-100 mb-2">📊 Your Progress</h4>
          <p className="text-gray-300 text-sm">
            You're performing 15% better than average learners at this stage!
          </p>
        </div>
        <div className="bg-green-900 border border-green-700 rounded-lg p-4">
          <h4 className="font-medium text-gray-100 mb-2">🎯 Recommendation</h4>
          <p className="text-gray-300 text-sm">
            Consider joining the "Data Preprocessing" study group for peer discussions.
          </p>
        </div>
      </div>
      <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg mt-4 transition-colors duration-200">
        Chat with AI Mentor
      </button>
    </div>
  );
};