import React from 'react';

interface HeaderProps {
  onSaveCourse: () => void;
  onViewDashboard: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSaveCourse, onViewDashboard }) => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6">
        Course Roadmap
      </h1>
      <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
        Your personalized Machine Learning journey - from fundamentals to advanced applications.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onSaveCourse}
          className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors duration-200"
        >
          Save Course
        </button>
        <button
          onClick={onViewDashboard}
          className="px-8 py-3 border border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white rounded-lg font-semibold transition-colors duration-200"
        >
          View Dashboard
        </button>
      </div>
    </div>
  );
};

export default Header;