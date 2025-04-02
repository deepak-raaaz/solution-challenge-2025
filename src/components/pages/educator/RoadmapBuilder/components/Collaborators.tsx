// components/Collaborators.tsx
export const Collaborators: React.FC = () => {
    return (
      <div className="bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200/30 dark:border-gray-700/30 p-4 overflow-hidden">
        <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Collaborators</h2>
        <div className="space-y-3">
          <div className="flex items-center">
            <img 
              src="https://placehold.co/40x40?text=JD" 
              alt="John Doe" 
              className="w-8 h-8 rounded-full border border-gray-200/40 dark:border-gray-700/40"
              onError={(e) => { e.currentTarget.src = 'https://placehold.co/40x40?text=JD'; }}
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">John Doe (You)</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Owner</p>
            </div>
          </div>
          <div className="flex items-center">
            <img 
              src="https://placehold.co/40x40?text=SJ" 
              alt="Sarah Johnson" 
              className="w-8 h-8 rounded-full border border-gray-200/40 dark:border-gray-700/40"
              onError={(e) => { e.currentTarget.src = 'https://placehold.co/40x40?text=SJ'; }}
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Sarah Johnson</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Editor</p>
            </div>
          </div>
        </div>
        <button className="w-full mt-4 flex items-center justify-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Invite Collaborators
          </span>
        </button>
      </div>
    );
  };