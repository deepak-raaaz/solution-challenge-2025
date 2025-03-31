'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
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
    const mockQuestions: Question[] = [
      {
        id: 'q1',
        question: 'Which of the following is NOT a type of Machine Learning?',
        options: ['Supervised Learning', 'Reinforcement Learning', 'Unsupervised Learning', 'Evolutionary Learning'],
        correctAnswer: 'Evolutionary Learning',
        explanation: 'Evolutionary Learning is not a standard type of Machine Learning.'
      },
      {
        id: 'q2',
        question: 'What is the purpose of feature scaling in Machine Learning?',
        options: ['To reduce overfitting', 'To make different features comparable', 'To increase model accuracy', 'To remove redundant data'],
        correctAnswer: 'To make different features comparable',
        explanation: 'Feature scaling ensures that all features contribute equally to the model.'
      },
      {
        id: 'q3',
        question: 'Which algorithm is best suited for classification problems?',
        options: ['K-Means Clustering', 'Linear Regression', 'Decision Tree', 'Principal Component Analysis (PCA)'],
        correctAnswer: 'Decision Tree',
        explanation: 'Decision trees are commonly used for classification tasks.'
      },
      {
        id: 'q4',
        question: 'What does "overfitting" mean in the context of Machine Learning?',
        options: ['A model that performs well on both training and test data', 'A model that captures too much noise and performs poorly on new data', 'A model that ignores important features', 'A model with high bias and low variance'],
        correctAnswer: 'A model that captures too much noise and performs poorly on new data',
        explanation: 'Overfitting occurs when a model learns patterns that are too specific to training data.'
      },
      {
        id: 'q5',
        question: 'Which of the following techniques helps prevent overfitting?',
        options: ['Increasing model complexity', 'Using a small dataset', 'Regularization (L1/L2)', 'Ignoring outliers'],
        correctAnswer: 'Regularization (L1/L2)',
        explanation: 'Regularization techniques help control model complexity to prevent overfitting.'
      },
      // {
      //   id: 'q6',
      //   question: 'In Neural Networks, what is the primary role of an activation function?',
      //   options: ['To introduce non-linearity into the model', 'To decrease computational complexity', 'To reduce the number of neurons', 'To normalize input data'],
      //   correctAnswer: 'To introduce non-linearity into the model',
      //   explanation: 'Activation functions enable neural networks to learn complex patterns.'
      // },
      // {
      //   id: 'q7',
      //   question: 'Which of the following is a dimensionality reduction technique?',
      //   options: ['K-Means', 'Support Vector Machine (SVM)', 'Principal Component Analysis (PCA)', 'Naive Bayes'],
      //   correctAnswer: 'Principal Component Analysis (PCA)',
      //   explanation: 'PCA is widely used for reducing the number of features in a dataset.'
      // },
      // {
      //   id: 'q8',
      //   question: 'In reinforcement learning, what is the term for an entity that interacts with the environment?',
      //   options: ['Agent', 'Reward', 'Action', 'State'],
      //   correctAnswer: 'Agent',
      //   explanation: 'An agent is the decision-making entity in reinforcement learning.'
      // },
      // {
      //   id: 'q9',
      //   question: 'Which evaluation metric is best suited for imbalanced classification problems?',
      //   options: ['Accuracy', 'Mean Squared Error', 'F1-Score', 'R-Squared'],
      //   correctAnswer: 'F1-Score',
      //   explanation: 'F1-Score balances precision and recall, making it useful for imbalanced datasets.'
      // },
      // {
      //   id: 'q10',
      //   question: 'What is the primary objective of a loss function in a neural network?',
      //   options: ['To measure the difference between predicted and actual values', 'To increase training speed', 'To improve computational efficiency', 'To adjust learning rate dynamically'],
      //   correctAnswer: 'To measure the difference between predicted and actual values',
      //   explanation: 'Loss functions help quantify model errors for optimization.'
      // }
    ];
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
      
      // Start loading timer and redirect after 5 seconds
      const timer = setTimeout(() => {
        router.push('/learning-roadmap');
      }, 5000);

      return () => clearTimeout(timer);
    }
  };

  // Show loading state while questions are being loaded
  if (loading || questions.length === 0) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        {/* Core Loader Modal */}
        <Loader loadingStates={loadingStates} loading={loading} duration={700} />
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