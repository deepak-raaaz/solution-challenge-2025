
import ProgressBar from "./progress-bar";

// ModuleHeader Component
interface ModuleHeaderProps {
    module: any;
    roadmapTitle: string;
  }
  
const ModuleHeader: React.FC<ModuleHeaderProps> = ({ module, roadmapTitle }) => {
    const statusBadgeStyles = {
      completed: 'bg-green-600 text-white',
      'in-progress': 'bg-blue-600 text-white',
      locked: 'bg-gray-600 text-gray-300',
    };
  
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-gray-400 uppercase tracking-widest">Module</p>
            <h1 className="text-3xl font-bold text-gray-100 mb-2">{module.title}</h1>
            <p className="text-gray-400">{module.description}</p>
            <p className="text-gray-500 text-sm mt-1">Part of: {roadmapTitle}</p>
          </div>

        </div>
        <div className="bg-gray-800/20 border border-gray-700/40 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-100">Module Progress</h3>
            <span className={`text-xs px-2 py-1 rounded ${statusBadgeStyles[module?.status as keyof typeof statusBadgeStyles]}`}>
              {module.status.charAt(0).toUpperCase() + module.status.slice(1)}
            </span>
          </div>
          <ProgressBar percentage={module.progress} />
          <div className="flex justify-between text-sm text-gray-400">
            <span>{module.progress.toFixed(1)}% Complete</span>
            <span>{module.lessons.length} Lessons</span>
          </div>
        </div>
      </div>
    );
  };

  export default ModuleHeader