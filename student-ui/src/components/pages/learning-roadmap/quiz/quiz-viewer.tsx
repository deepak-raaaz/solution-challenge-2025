"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGetQuizQuery, useSubmitQuizMutation } from '@/redux/features/api/generate/generateApi';
import { ProgressBar } from '../progressbar';


interface Question {
  _id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface Answer {
  questionIndex: number;
  selectedAnswer: string;
}

interface QuizResult {
  score: number;
  total: number;
  answers: { questionIndex: number; selectedAnswer: string; correct: boolean }[];
}

interface QuizViewerProps {
  quizId: string;
  roadmapId: string;
}

// QuizViewer Component
const QuizViewer: React.FC<QuizViewerProps> = ({ quizId, roadmapId }) => {
  const router = useRouter();
  const { data, isLoading, error } = useGetQuizQuery(quizId);
  const [submitQuiz, { isLoading: isSubmitting, data: submitData, error: submitError }] = useSubmitQuizMutation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Define handleReturn before rendering
  const handleReturn = () => {
    router.push(`/roadmap/${roadmapId}/module/${quiz.lesson.moduleId}/lesson/${quiz.lesson._id}`);
  };

  // Timer effect for unattempted quizzes
  useEffect(() => {
    if (data?.quiz?.attempts?.length === 0 && timeLeft <= 0 && !isSubmitted) {
      handleSubmit();
      return;
    }
    if (data?.quiz?.attempts?.length === 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, isSubmitted, data?.quiz?.attempts]);

  if (isLoading) return <div className="py-20 text-gray-100 text-center">Loading...</div>;
  if (error || !data?.quiz) return <div className="py-20 text-red-500 text-center">Error loading quiz</div>;

  const quiz = {
    _id: data.quiz._id,
    quizId: data.quiz.quizId,
    title: `${data.quiz.lesson.title} Quiz`,
    questions: data.quiz.questions,
    lesson: data.quiz.lesson,
    module: data.quiz.module,
    attempts: data.quiz.attempts,
  };

  // For attempted quizzes, show results directly
  if (quiz.attempts.length > 0) {
    const latestAttempt = quiz.attempts[quiz.attempts.length - 1];
    if (!latestAttempt?.userAnswers || !Array.isArray(latestAttempt.userAnswers) || !latestAttempt.score || !latestAttempt.total) {
      return (
        <section className="min-h-screen p-6 py-20">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-800/20 border border-gray-700/40 rounded-lg p-6 text-center">
              <h2 className="text-2xl font-bold text-red-500 mb-4">Invalid Quiz Attempt</h2>
              <p className="text-gray-400 mb-6">Unable to load quiz results. Please try again or return to the lesson.</p>
              <button
                className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
                onClick={handleReturn}
                aria-label="Return to lesson"
              >
                Return to Lesson
              </button>
            </div>
          </div>
        </section>
      );
    }

    // Transform userAnswers to include correct field
    const transformedAnswers = latestAttempt.userAnswers.map((answer:any) => ({
      questionIndex: answer.questionIndex,
      selectedAnswer: answer.selectedAnswer,
      correct: quiz.questions[answer.questionIndex]?.correctAnswer === answer.selectedAnswer,
    }));

    const transformedResult: QuizResult = {
      score: latestAttempt.score,
      total: latestAttempt.total,
      answers: transformedAnswers,
    };

    return (
      <section className="min-h-screen p-6 py-20">
        <div className="max-w-3xl mx-auto">
          <QuizResults
            result={transformedResult}
            questions={quiz.questions}
            onReturn={handleReturn}
            error={null}
          />
        </div>
      </section>
    );
  }

  const totalQuestions = quiz.questions.length;
  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  // Format time left
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle answer selection
  const handleAnswerSelect = (selectedAnswer: string) => {
    const updatedAnswers = [...answers];
    const existingAnswerIndex = updatedAnswers.findIndex((a) => a.questionIndex === currentQuestionIndex);
    if (existingAnswerIndex >= 0) {
      updatedAnswers[existingAnswerIndex] = { questionIndex: currentQuestionIndex, selectedAnswer };
    } else {
      updatedAnswers.push({ questionIndex: currentQuestionIndex, selectedAnswer });
    }
    setAnswers(updatedAnswers);
  };

  // Navigate to previous/next question
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Submit quiz
  const handleSubmit = async () => {
    try {
      await submitQuiz({ quizId, answers }).unwrap();
      setIsSubmitted(true);
    } catch (err) {
      console.error('Submission failed:', err);
    }
  };

  return (
    <section className="min-h-screen p-6 py-20">
      <div className="max-w-3xl mx-auto">
        {!isSubmitted ? (
          <div id="quiz-content" className="bg-gray-800 border border-gray-700 rounded-lg">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-gray-100 mb-2">{quiz.title}</h2>
              <p className="text-gray-400">Test your understanding of {quiz.lesson.title.toLowerCase()}</p>
            </div>
            <div className="p-6">
              <QuizProgress
                currentQuestion={currentQuestionIndex + 1}
                totalQuestions={totalQuestions}
                timeLeft={formatTime(timeLeft)}
                progressPercentage={progressPercentage}
              />
              <QuizQuestion
                question={quiz.questions[currentQuestionIndex]}
                questionIndex={currentQuestionIndex}
                selectedAnswer={answers.find((a) => a.questionIndex === currentQuestionIndex)?.selectedAnswer}
                onSelectAnswer={handleAnswerSelect}
              />
              <div className="flex justify-between mt-6">
                <button
                  className={`px-6 py-2 rounded-lg text-gray-100 transition-colors duration-200 ${
                    currentQuestionIndex === 0 ? 'bg-gray-700 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  aria-label="Previous question"
                >
                  Previous
                </button>
                <button
                  className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
                  onClick={currentQuestionIndex === totalQuestions - 1 ? handleSubmit : handleNext}
                  disabled={isSubmitting}
                  aria-label={currentQuestionIndex === totalQuestions - 1 ? 'Submit quiz' : 'Next question'}
                >
                  {currentQuestionIndex === totalQuestions - 1 ? (isSubmitting ? 'Submitting...' : 'Submit') : 'Next Question'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <QuizResults
            result={submitData as QuizResult}
            questions={quiz.questions}
            onReturn={handleReturn}
            error={submitError}
          />
        )}
      </div>
    </section>
  );
};

// QuizProgress Component
interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  timeLeft: string;
  progressPercentage: number;
}

const QuizProgress: React.FC<QuizProgressProps> = ({ currentQuestion, totalQuestions, timeLeft, progressPercentage }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between text-sm text-gray-400 mb-2">
        <span>Question {currentQuestion} of {totalQuestions}</span>
        <span>{timeLeft} remaining</span>
      </div>
      <ProgressBar percentage={progressPercentage} />
    </div>
  );
};

// QuizQuestion Component
interface QuizQuestionProps {
  question: Question;
  questionIndex: number;
  selectedAnswer?: string;
  onSelectAnswer: (answer: string) => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ question, questionIndex, selectedAnswer, onSelectAnswer }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-100 mb-4">{question.question}</h3>
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <label
            key={index}
            className="flex items-center space-x-3 p-3 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
            aria-label={`Option ${option}`}
          >
            <input
              type="radio"
              name={`quiz-answer-${questionIndex}`}
              value={option}
              checked={selectedAnswer === option}
              onChange={() => onSelectAnswer(option)}
              className="text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500"
              aria-checked={selectedAnswer === option}
            />
            <span className="text-gray-100">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

// QuizResults Component
interface QuizResultsProps {
  result?: QuizResult;
  questions: Question[];
  onReturn: () => void;
  error?: any;
}

const QuizResults: React.FC<QuizResultsProps> = ({ result, questions, onReturn, error }) => {
  if (error) {
    return (
      <div className="bg-gray-800/20 border border-gray-700/40 rounded-lg p-6 text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Submission Failed</h2>
        <p className="text-gray-400 mb-6">An error occurred while submitting your quiz. Please try again.</p>
        <button
          className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
          onClick={onReturn}
          aria-label="Return to lesson"
        >
          Return to Lesson
        </button>
      </div>
    );
  }

  if (!result) {
    return <div className="text-gray-100 text-center">Loading results...</div>;
  }

  return (
    <div className="bg-gray-800/20 border border-gray-700/40 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-100 mb-4">Quiz Results</h2>
      <p className="text-gray-100 mb-6">
        You scored {result.score} out of {result.total} ({((result.score / result.total) * 100).toFixed(1)}%)
      </p>
      <div className="space-y-6">
        {result.answers.map((answer, index) => {
          const question = questions[answer.questionIndex];
          return (
            <div key={index} className="bg-gray-700/50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-100 mb-2">{question.question}</h3>
              <p className={`text-sm ${answer.correct ? 'text-green-400' : 'text-red-400'}`}>
                Your answer: {answer.selectedAnswer} {answer.correct ? '✓' : '✗'}
              </p>
              {!answer.correct && (
                <p className="text-sm text-gray-400">Correct answer: {question.correctAnswer}</p>
              )}
              <p className="text-sm text-gray-400 mt-2">{question.explanation}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-6 text-center">
        <button
          className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
          onClick={onReturn}
          aria-label="Return to lesson"
        >
          Return to Lesson
        </button>
      </div>
    </div>
  );
};

export default QuizViewer;