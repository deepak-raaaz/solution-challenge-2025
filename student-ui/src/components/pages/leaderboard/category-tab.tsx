import { FC } from 'react';

interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryTabs: FC<CategoryTabsProps> = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="mb-6">
      <div className="flex space-x-1 bg-gray-800/20 border border-gray-700/40 p-1 rounded-lg overflow-x-auto max-sm:flex-wrap max-sm:gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`flex-shrink-0 py-2 px-4 text-sm font-medium rounded-md transition-colors duration-200 ${
              activeCategory === category ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-gray-100'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;