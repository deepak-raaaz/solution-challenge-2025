// components/PropertiesPanel.tsx
export const PropertiesPanel: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200/30 dark:border-gray-700/30 p-4 overflow-hidden">
      <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Properties</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
          <input type="text" defaultValue="Introduction to Programming" className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800/50 rounded-md text-sm border border-gray-200/30 dark:border-gray-600/30 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
          <textarea rows={3} className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800/50 rounded-md text-sm border border-gray-200/30 dark:border-gray-600/30 focus:outline-none focus:ring-2 focus:ring-indigo-500" defaultValue="A beginner-friendly introduction to basic programming concepts." />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Duration</label>
          <div className="flex space-x-2">
            <input type="text" defaultValue="8" className="w-16 px-3 py-2 bg-gray-100 dark:bg-gray-800/50 rounded-md text-sm border border-gray-200/30 dark:border-gray-600/30 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <select className="bg-gray-100 dark:bg-gray-800/50 border border-gray-200/30 dark:border-gray-600/30 rounded-md text-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" defaultValue="hours">
              <option>minutes</option>
              <option>hours</option>
              <option>days</option>
              <option>weeks</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Resource Type</label>
          <select className="w-full bg-gray-100 dark:bg-gray-800/50 border border-gray-200/30 dark:border-gray-600/30 rounded-md text-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" defaultValue="Course">
            <option>Course</option>
            <option>Video</option>
            <option>Article</option>
            <option>Quiz</option>
            <option>Coding Exercise</option>
            <option>Simulation</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Difficulty Level</label>
          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center">
              <input type="radio" name="difficulty" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" defaultChecked />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Beginner</span>
            </label>
            <label className="inline-flex items-center">
              <input type="radio" name="difficulty" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Intermediate</span>
            </label>
            <label className="inline-flex items-center">
              <input type="radio" name="difficulty" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Advanced</span>
            </label>
          </div>
        </div>
        <div>
          <label className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Premium Content</span>
            <span className="relative inline-flex items-center">
              <input type="checkbox" className="sr-only peer" id="premium-toggle" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-800/50 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
            </span>
          </label>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Mark this resource as premium content</p>
        </div>
      </div>
    </div>
  );
};