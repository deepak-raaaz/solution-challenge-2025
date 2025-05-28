import React from 'react';
import { courseData } from './course-data';


interface CourseOverviewProps {
  data: typeof courseData;
//   onSaveCourse: () => void;
//   onCustomize: () => void;
}

const CourseOverview: React.FC<CourseOverviewProps> = ({ data}) => {
  const tags = [
    { label: 'Python', color: 'blue-600' },
    { label: 'Data Science', color: 'green-600' },
    { label: 'Neural Networks', color: 'purple-600' },
    { label: 'Beginner Friendly', color: 'blue-400' },
  ];

  return (
    <div className="bg-gray-800/20 border border-gray-700/40 rounded-xl p-6 mb-8">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-100 mb-2">{data.title}</h2>
          <p className="text-gray-400 mb-4">
            A comprehensive course tailored to your skill level and preferences
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag.label}
                className={`bg-${tag.color} bg-slate-700/50 text-white px-3 py-1 rounded-full text-sm`}
              >
                {tag.label}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-row gap-4 mt-4 lg:mt-0">
          <button
            // onClick={onSaveCourse}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
          >
            Save Course
          </button>
          <button
            // onClick={onCustomize}
            className="px-6 py-3 bg-gray-700/30 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors duration-200 font-semibold"
          >
            Customize
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-gray-700/30 rounded-lg">
          <div className="text-2xl font-bold text-blue-400 mb-1">{data.modules}</div>
          <p className="text-gray-300 text-sm">Modules</p>
        </div>
        <div className="text-center p-4 bg-gray-700/30 rounded-lg">
          <div className="text-2xl font-bold text-green-400 mb-1">{data.lessons}</div>
          <p className="text-gray-300 text-sm">Lessons</p>
        </div>
        <div className="text-center p-4 bg-gray-700/30 rounded-lg">
          <div className="text-2xl font-bold text-purple-400 mb-1">8h</div>
          <p className="text-gray-300 text-sm">Duration</p>
        </div>
        <div className="text-center p-4 bg-gray-700/30 rounded-lg">
          <div className="text-2xl font-bold text-blue-400 mb-1">{data.assessments}</div>
          <p className="text-gray-300 text-sm">Assessments</p>
        </div>
      </div>
    </div>
  );
};

export default CourseOverview;