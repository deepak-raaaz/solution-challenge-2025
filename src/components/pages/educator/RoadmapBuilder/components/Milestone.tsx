// components/Milestone.tsx
import { ResourceItem } from './ResourceItem';

interface Resource {
  type: string;
  title: string;
  description: string;
  duration: string;
  lessons?: string;
  questions?: string;
  status: string;
}

interface MilestoneProps {
  number: number;
  title: string;
  level: string;
  items: Resource[];
}

export const Milestone: React.FC<MilestoneProps> = ({ number, title, level, items }) => {
  return (
    <div className="relative">
      <div className="absolute left-6 top-0 h-full w-0.5 bg-indigo-200 dark:bg-indigo-900/50"></div>
      <div className="relative flex items-center mb-4">
        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30 border-2 border-indigo-400 dark:border-indigo-700 z-10">
          <span className="text-indigo-600 dark:text-indigo-400 font-bold">{number}</span>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{level}</p>
        </div>
        <div className="ml-auto flex items-center space-x-2">
          <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
          <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="ml-16 space-y-4">
        {items.map((item, index) => (
          <ResourceItem key={index} {...item} />
        ))}
        <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center">
          <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="text-sm font-medium">Add Learning Resource</span>
          </button>
        </div>
      </div>
    </div>
  );
};