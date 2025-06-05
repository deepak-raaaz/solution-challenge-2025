
import QuizCard from "../quiz-card";
import { ResourceCard } from "../resource-card";
import ProgressBar from "./progress-bar";

// LessonCard Component
interface LessonCardProps {
  lesson: any;
  index: number;
  roadmapId: string;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson, index, roadmapId }) => {
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

  console.log(lesson)
  return (
    <div className={`relative mb-8 ${lesson.status === 'locked' ? 'opacity-60' : ''}`}>
      <div className="flex items-start">
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center z-10 border-4 border-gray-900 ${statusStyles[lesson.status as keyof typeof statusBadgeStyles]}`}
        >
          {lesson.status === 'completed' ? (
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          ) : lesson.status === 'in-progress' ? (
            <span className="text-white font-bold text-lg">{index + 1}</span>
          ) : (
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          )}
        </div>
        <div className="ml-6 flex-1">
          <div
            className={`bg-gray-700/20 border rounded-lg p-4 ${lesson.status === 'in-progress' ? 'border-blue-500' : 'border-gray-600/40'
              }`}
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-medium text-gray-100">{lesson.title}</h4>
              <span className={`text-xs px-2 py-1 rounded ${statusBadgeStyles[lesson.status as keyof typeof statusBadgeStyles]}`}>
                {lesson.status.charAt(0).toUpperCase() + lesson.status.slice(1)}
              </span>
            </div>
            <p className="text-gray-300 text-sm mb-3">{lesson.description}</p>
            {lesson.status !== 'locked' && (
              <>
                <ProgressBar percentage={lesson.progress} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {lesson.resources.map((resource: any, index: number) => (
                    <ResourceCard key={index} resource={resource} roadmapId={roadmapId} />
                  ))}
                  {lesson.quizId?.[0]?.attempts?.length === 0 && (
                    <QuizCard quiz={{ id: lesson.quizId[0]._id, title: `${lesson.title} Quiz` }} />
                  )}
                </div>
              </>
            )}
            {lesson.status === 'locked' && (
              <div className="text-center py-4">
                <p className="text-gray-500 text-sm">Complete previous lessons to unlock</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonCard