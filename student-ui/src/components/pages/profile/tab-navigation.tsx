import { FC } from 'react';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabNavigation: FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = ['overview', 'progress', 'achievements', 'preferences'];

  return (
    <div className="mb-6">
      <div className="flex space-x-1 bg-gray-800/20 border border-gray-700/40 p-1 rounded-lg max-sm:flex-wrap max-sm:gap-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors duration-200 ${
              activeTab === tab ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-gray-100'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;