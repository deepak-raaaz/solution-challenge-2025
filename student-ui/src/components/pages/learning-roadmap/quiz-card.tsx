import Link from "next/link";
import { getResourceIcon } from "./learning-roadmap";

// QuizCard Component
interface Quiz {
    id: string;
    title: string;
    attempts: any;
}

interface QuizCardProps {
    quiz: Quiz;
    roadmapId: string
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz, roadmapId }) => {
    return (
        <div className="bg-gray-700/20 border border-gray-600/40 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 rounded bg-blue-600">
                    {getResourceIcon('quiz')}
                </div>
                <div>
                    <h4 className="font-medium text-gray-100">{quiz.title}</h4>
                    <p className="text-gray-400 text-sm">Test your knowledge</p>
                </div>
            </div>
            {
                quiz.attempts ?
                    <Link target='_blank' href={`/learning-roadmap/${roadmapId}/quiz?id=${quiz.id}`}
                        className={`w-full py-2 rounded flex items-center justify-center text-sm transition-colors duration-200 bg-blue-600 hover:bg-blue-700 text-white `}
                    >
                        Start Quiz
                    </Link>
                    :
                    <button
                        className={`w-full py-2 rounded text-sm transition-colors duration-200 bg-gray-600 hover:bg-gray-700 text-white `}>
                        Done
                    </button>
            }


        </div>
    );
};

export default QuizCard;