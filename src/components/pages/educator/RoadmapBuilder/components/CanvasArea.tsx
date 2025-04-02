// components/CanvasArea.tsx
import { Milestone } from './Milestone';

export const CanvasArea: React.FC = () => {
  return (
    <div className="lg:col-span-3 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200/30 dark:border-gray-700/30 p-4 overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <div>
            <input 
              type="text" 
              placeholder="Roadmap Title" 
              className="text-xl font-bold border-0 focus:ring-0 p-0 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none w-full"
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Difficulty:</span>
            <select className="bg-gray-100 dark:bg-gray-700 border border-gray-200/30 dark:border-gray-600/30 rounded-md text-sm py-1 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
      <div className="relative min-h-[500px] bg-gray-50 dark:bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 overflow-auto p-8">
        <div className="flex flex-col gap-8">
          <Milestone 
            number={1}
            title="Foundations"
            level="Beginner level"
            items={[
              {
                type: "course",
                title: "Introduction to Programming",
                description: "A beginner-friendly introduction to basic programming concepts.",
                duration: "8 hours",
                lessons: "10 lessons",
                status: "Free"
              },
              {
                type: "video",
                title: "Getting Started Tutorial",
                description: "Step-by-step visual guide to setting up your development environment.",
                duration: "45 minutes",
                status: "Free"
              },
              {
                type: "quiz",
                title: "Fundamentals Assessment",
                description: "Test your knowledge of the basic concepts before moving forward.",
                duration: "20 minutes",
                questions: "10 questions",
                status: "Free"
              }
            ]}
          />
          <Milestone 
            number={2}
            title="Core Concepts"
            level="Intermediate level"
            items={[
              {
                type: "course",
                title: "Advanced Programming Techniques",
                description: "Learn intermediate programming concepts and design patterns.",
                duration: "12 hours",
                lessons: "15 lessons",
                status: "Premium"
              }
            ]}
          />
          <div className="relative">
            <div className="flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
              <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="text-sm font-medium">Add New Milestone</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};