// components/AISuggestions.tsx
export const AISuggestions: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200/30 dark:border-gray-700/30 p-4 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-800 dark:text-gray-200">AI Suggestions</h2>
        <div className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
          <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">3 new</span>
        </div>
      </div>
      <div className="space-y-3">
        <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800/30">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-indigo-900 dark:text-indigo-200">Add an interactive coding exercise after the &ldquo;Introduction to Programming&rdquo; course.</p>
              <div className="mt-2 flex space-x-2">
                <button className="px-2 py-1 bg-indigo-600 dark:bg-indigo-500 rounded text-xs font-medium text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors">
                  Add
                </button>
                <button className="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200/30 dark:border-gray-600/30">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-700 dark:text-gray-300">Based on learning patterns, add a supplementary article on &ldquo;Common Programming Errors&rdquo;.</p>
              <div className="mt-2 flex space-x-2">
                <button className="px-2 py-1 bg-indigo-600 dark:bg-indigo-500 rounded text-xs font-medium text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors">
                  Add
                </button>
                <button className="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200/30 dark:border-gray-600/30">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-700 dark:text-gray-300">Extend the &ldquo;Core Concepts&rdquo; milestone with an industry case study.</p>
              <div className="mt-2 flex space-x-2">
                <button className="px-2 py-1 bg-indigo-600 dark:bg-indigo-500 rounded text-xs font-medium text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors">
                  Add
                </button>
                <button className="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className="w-full mt-4 flex items-center justify-center px-4 py-2 bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600/50 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
        <span className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Generate More Suggestions
        </span>
      </button>
    </div>
  );
};