'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import SectionHeading from '@/components/shared/SectionHeading';
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";

const loadingStates = [
  {
    text: "Structuring your complete guide",
  },
  {
    text: "Sourcing expert insights",
  },
  {
    text: "Curating the perfect playlist",
  },
  {
    text: "Gathering top-tier resources",
  },
  {
    text: "Verifying content quality",
  },
  {
    text: "Organizing everything neatly",
  },
  {
    text: "Polishing your learning package",
  },
  {
    text: "Finalizing—almost there!",
  },
];

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export default function QuestionsPage() {
  const searchParams = useSearchParams();
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isTestComplete, setIsTestComplete] = useState<boolean>(false);
  const [testConfig, setTestConfig] = useState({
    selectedSubjects: [] as string[],
    difficulty: 'medium',
    selectedQuestionTypes: [] as string[],
    questionCount: 10,
    customTopics: '',
    query: ''
  });

  useEffect(() => {
    // Get test configuration from URL
    const config = {
      selectedSubjects: searchParams.get('selectedSubjects')?.split(',') || [],
      difficulty: searchParams.get('difficulty') || 'medium',
      selectedQuestionTypes: searchParams.get('selectedQuestionTypes')?.split(',') || [],
      questionCount: parseInt(searchParams.get('questionCount') || '10'),
      customTopics: searchParams.get('customTopics') || '',
      query: searchParams.get('query') || ''
    };

    setTestConfig(config);

    // Generate mock questions
    const mockQuestions: Question[] = Array.from({ length: config.questionCount }, (_, i) => ({
      id: `q${i + 1}`,
      question: `Sample question ${i + 1} about ${config.query || 'the topic'}?`,
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 'Option A',
      explanation: 'This is a detailed explanation of why this is the correct answer.'
    }));

    setQuestions(mockQuestions);
    setLoading(false);
  }, [searchParams]);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
    }
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer('');
      setShowExplanation(false);
    } else {
      // Test is complete
      setIsTestComplete(true);
      setLoading(true);
      
      // Simulate API call delay
    //   setTimeout(() => {
    //     // TODO: Navigate to results page with score and test data
    //     router.push('/test/results');
    //   }, 2000);
    }
  };

  if (loading) {
    return (
        <div className="w-full h-[60vh] flex items-center justify-center">
        {/* Core Loader Modal */}
        <Loader loadingStates={loadingStates} loading={loading} duration={2000} />
  
        {/* The buttons are for demo only, remove it in your actual code ⬇️ */}
       
  
        {/* {loading && (
          <button
            className="fixed top-4 right-4 text-black dark:text-white z-[120]"
            onClick={() => setLoading(false)}
          >
            <IconSquareRoundedX className="h-10 w-10" />
          </button>
        )} */}
      </div>
    );
  }

  return (
    <div className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <SectionHeading
            title="Your Personalized Test"
            subtitle={`Based on: ${testConfig.query || 'Your selected topics'}`}
            className="text-center"
            icon={
              <svg
                className="w-6 h-6 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            }
          />
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Score: {score}/{currentQuestion + 1}
            </span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg dark:shadow-gray-900/30 mb-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              {questions[currentQuestion].question}
            </h3>
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showExplanation && handleAnswerSelect(option)}
                  className={`w-full p-4 rounded-lg border text-left transition-all ${
                    showExplanation
                      ? option === questions[currentQuestion].correctAnswer
                        ? 'border-green-500 bg-green-50/80 dark:bg-green-900/30'
                        : selectedAnswer === option
                        ? 'border-red-500 bg-red-50/80 dark:bg-red-900/30'
                        : 'border-gray-200 dark:border-gray-700'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                  }`}
                >
                  <span className="text-gray-900 dark:text-white">{option}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="mt-6 p-4 bg-blue-50/80 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                Explanation
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {questions[currentQuestion].explanation}
              </p>
            </div>
          )}

          {/* Next/Finish Button */}
          {showExplanation && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleNext}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-400 text-white text-sm font-medium rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Test'}
              </button>
            </div>
          )}
        </div>

        {/* Test Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 shadow-md dark:shadow-gray-900/20">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Test Configuration</h4>
            <div className="space-y-1 text-gray-600 dark:text-gray-300">
              <p>Difficulty: <span className="capitalize">{testConfig.difficulty}</span></p>
              <p>Question Types: {testConfig.selectedQuestionTypes.join(', ')}</p>
              <p>Total Questions: {testConfig.questionCount}</p>
            </div>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 shadow-md dark:shadow-gray-900/20">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Selected Topics</h4>
            <div className="space-y-1 text-gray-600 dark:text-gray-300">
              <p>Subjects: {testConfig.selectedSubjects.join(', ')}</p>
              <p>Custom Topics: {testConfig.customTopics || 'None specified'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 