import { Lesson } from "./learning-roadmap";
import { ProgressBar } from "./progressbar";
import { ResourceCard } from "./resource-card";


// LessonCard Component
interface LessonCardProps {
    lesson: Lesson;
  }
  
  const LessonCard: React.FC<LessonCardProps> = ({ lesson }) => {
    const statusStyles = {
      completed: 'bg-green-600',
      'in-progress': 'bg-blue-600',
      locked: 'bg-gray-600 opacity-60',
    };
  
    const statusBadgeStyles = {
      completed: 'bg-green-600 text-white',
      'in-progress': 'bg-blue-600 text-white',
      locked: 'bg-gray-600 text-gray-300',
    };
  
    return (
      <div className={`bg-gray-700/20 border rounded-lg p-4 ${lesson.status === 'locked' ? 'opacity-60' : ''}`}>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-lg font-medium text-gray-100">{lesson.title}</h4>
          <span className={`text-xs px-2 py-1 rounded ${statusBadgeStyles[lesson.status]}`}>
            {lesson.status.charAt(0).toUpperCase() + lesson.status.slice(1)}
          </span>
        </div>
        <p className="text-gray-300 text-sm mb-3">{lesson.description}</p>
        {lesson.status !== 'locked' && (
          <>
            <ProgressBar percentage={lesson.progress} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {lesson.resources.map((resource, index) => (
                <ResourceCard key={index} resource={resource} />
              ))}
            </div>
          </>
        )}
        {lesson.status === 'locked' && (
          <div className="text-center py-4">
            <p className="text-gray-500 text-sm">Complete previous lessons to unlock</p>
          </div>
        )}
      </div>
    );
  };

  export default LessonCard