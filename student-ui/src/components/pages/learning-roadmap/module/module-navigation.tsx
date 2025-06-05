import { FC } from 'react';

// Define types for Module data
interface Module {
  id: string;
  title: string;
  status: 'completed' | 'in-progress' | 'locked';
}

interface ModuleNavigationProps {
  modules: Module[];
  onModuleSelect: (ModuleId: string) => void;
}

// Optimized Module Navigation component
const ModuleNavigation: FC<ModuleNavigationProps> = ({ modules, onModuleSelect }) => {
  // Helper to determine button styles based on status
  const getButtonStyles = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-900 bg-opacity-30 border-green-700 hover:bg-green-800 hover:bg-opacity-40';
      case 'in-progress':
        return 'bg-blue-900 bg-opacity-30 border-blue-700 hover:bg-blue-800 hover:bg-opacity-40';
      case 'locked':
        return 'bg-gray-700/30 border-gray-600/40 opacity-50 cursor-not-allowed';
      default:
        return '';
    }
  };

  // Helper to determine text and icon styles based on status
  const getTextAndIconStyles = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-400';
      case 'in-progress':
        return 'text-blue-400';
      case 'locked':
        return 'text-gray-500';
      default:
        return '';
    }
  };

  return (
    <div className="bg-gray-800/20 border border-gray-700/40 rounded-lg p-6">
      <h3 className="text-lg font-bold text-white mb-4">Module Navigation</h3>
      <div className="space-y-2">
        {modules.map((module) => (
          <button
            key={module.id}
            onClick={() => onModuleSelect(module.id)}
            disabled={module.status === 'locked'}
            className={`w-full text-left p-3 border rounded-lg transition-colors duration-200 ${getButtonStyles(module.status)}`}
          >
            <div className="flex items-center justify-between">
              <span className={`font-semibold ${getTextAndIconStyles(module.status)}`}>
                {module.title}
              </span>
              {module.status === 'completed' && (
                <svg className={`w-4 h-4 ${getTextAndIconStyles(module.status)}`} fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              {module.status === 'in-progress' && (
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              )}
              {module.status === 'locked' && (
                <svg className={`w-4 h-4 ${getTextAndIconStyles(module.status)}`} fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};


export default ModuleNavigation;