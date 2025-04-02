// components/TemplateCard.tsx

interface Template {
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  category: string;
  users: number;
  image?: string;
  isNew?: boolean;
  isPopular?: boolean;
  isFeatured?: boolean;
}

interface TemplateCardProps extends Template {
  hasImage?: boolean;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  title,
  description,
  duration,
  difficulty,
  category,
  users,
  image,
  hasImage,
  isNew,
  isPopular,
  isFeatured
}) => {
  const categoryColors: Record<string, string> = {
    Technology: 'blue',
    Business: 'green',
    'Soft Skills': 'purple',
    Arts: 'pink',
    Languages: 'red',
    Science: 'yellow'
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200/30 dark:border-gray-700/30 overflow-hidden hover:shadow-md transition-shadow duration-300">
      {hasImage && image && (
        <div className="relative h-48 overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <span className={`inline-block px-2 py-1 bg-${categoryColors[category]}-600 text-white text-xs font-medium rounded`}>
              {category}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center justify-center h-8 w-8 bg-white dark:bg-gray-800 rounded-full shadow">
              <svg className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </span>
          </div>
        </div>
      )}
      <div className="p-4">
        {!hasImage && (
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-${categoryColors[category]}-100 dark:bg-${categoryColors[category]}-900/30 text-${categoryColors[category]}-600 dark:text-${categoryColors[category]}-400`}>
                {/* Add appropriate icon based on category */}
              </div>
              {(isNew || isPopular || isFeatured) && (
                <span className={`ml-3 text-xs font-medium text-${categoryColors[category]}-700 dark:text-${categoryColors[category]}-400 bg-${categoryColors[category]}-100 dark:bg-${categoryColors[category]}-900/30 px-2 py-0.5 rounded-full`}>
                  {isNew ? 'New' : isPopular ? 'Popular' : 'Featured'}
                </span>
              )}
            </div>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {users.toLocaleString()} users
            </div>
          </div>
        )}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{description}</p>
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
          <span className="flex items-center">
            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {duration}
          </span>
          <span className="flex items-center">
            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            {difficulty}
          </span>
          {!hasImage && (
            <span className={`inline-block px-2 py-1 bg-${categoryColors[category]}-100 dark:bg-${categoryColors[category]}-900/30 text-${categoryColors[category]}-800 dark:text-${categoryColors[category]}-400 text-xs font-medium rounded-full`}>
              {category}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button className="px-3 py-2 bg-indigo-600 dark:bg-indigo-500 rounded-lg text-xs font-medium text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors">
            Use Template
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};