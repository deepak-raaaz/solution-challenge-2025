// components/ResourceItem.tsx
interface ResourceItemProps {
  type: string;
  title: string;
  description: string;
  duration: string;
  lessons?: string;
  questions?: string;
  status: string;
}

export const ResourceItem: React.FC<ResourceItemProps> = ({ type, title, description, duration, lessons, questions, status }) => {
  const icons = {
    course: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8a2 2 0 00-2-2h-1M9 15L3 9m0 0l6-6M3 9h12a2 2 0 012 2v6a2 2 0 01-2 2H3" /></svg>,
    video: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    quiz: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  };

  const colors = {
    course: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    video: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
    quiz: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
  };

  const statusColors = {
    Free: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400",
    Premium: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400",
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200/30 dark:border-gray-700/30 hover:border-indigo-300 dark:hover:border-indigo-700/50 transition-colors cursor-move">
      <div className="flex items-start">
        <div className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg ${colors[type as keyof typeof colors]}`}>
          {icons[type as keyof typeof icons]}
        </div>
        <div className="ml-4 flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-semibold text-gray-900 dark:text-white">{title}</h4>
            <div className="flex items-center space-x-2">
              <span className={`px-2.5 py-0.5 ${statusColors[status as keyof typeof statusColors]} text-xs font-medium rounded-full`}>{status}</span>
              <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            </div>
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
          <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {duration}
            </span>
            {(lessons || questions) && (
              <span className="ml-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={lessons ? "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" : "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"} />
                </svg>
                {lessons || questions}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};