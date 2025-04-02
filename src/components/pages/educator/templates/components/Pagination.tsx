
// components/Pagination.tsx
export const Pagination: React.FC = () => (
    <div className="flex justify-center mt-8">
      <nav className="inline-flex rounded-lg shadow-sm" aria-label="Pagination">
        <button className="px-3 py-2 rounded-l-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
          <span className="sr-only">Previous</span>
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        {[1, 2, 3].map(num => (
          <button
            key={num}
            className={`px-4 py-2 ${num === 1 ? 'bg-indigo-600 dark:bg-indigo-500 border-indigo-600 dark:border-indigo-500 text-white' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300'} border text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700`}
          >
            {num}
          </button>
        ))}
        <span className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400">...</span>
        <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
          8
        </button>
        <button className="px-3 py-2 rounded-r-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
          <span className="sr-only">Next</span>
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </nav>
    </div>
  );