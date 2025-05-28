"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";
import SectionHeading from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface TestConfig {
  selectedSubjects: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  selectedQuestionTypes: string[];
  questionCount: number;
  customTopics: string;
  query: string;
}

const loadingStates = [
  { text: "Structuring your complete guide" },
  { text: "Sourcing expert insights" },
  { text: "Curating the perfect playlist" },
  { text: "Gathering top-tier resources" },
  { text: "Verifying content quality" },
  { text: "Organizing everything neatly" },
  { text: "Polishing your learning package" },
  { text: "Finalizing—almost there!" },
];

// Predefined test configuration (to be replaced with API later)
const predefinedTestConfig: TestConfig = {
  selectedSubjects: ["Python Fundamentals", "Data Preprocessing", "Supervised Learning", "Model Deployment"],
  difficulty: "Advanced",
  selectedQuestionTypes: ["Multiple Choice"],
  questionCount: 5,
  customTopics: "",
  query: "Build a Machine Learning Course",
};

const Assessment: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const selectedTopic = useSelector((state: RootState) => state.localStorage.query) || predefinedTestConfig.query;

  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isTestComplete, setIsTestComplete] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [testConfig] = useState<TestConfig>(predefinedTestConfig);

  useEffect(() => {
    // Validate configuration
    if (testConfig.selectedSubjects.length === 0 || testConfig.selectedQuestionTypes.length === 0) {
      setError("Invalid test configuration: Please select at least one subject and question type.");
      setLoading(false);
      return;
    }

    // Simulate fetching questions based on config (replace with API call later)
    const generateQuestions = (): Question[] => {
      const baseQuestions: Question[] = [
        {
          id: "q1",
          question: `What is a key concept in ${testConfig.query}?`,
          options: ["Data Modeling", "Feature Engineering", "Gradient Descent", "All of the above"],
          correctAnswer: "All of the above",
          explanation: `These are fundamental concepts in ${testConfig.query}.`,
        },
        {
          id: "q2",
          question: `What does ${testConfig.difficulty} level entail for ${testConfig.query}?`,
          options: ["Basic understanding", "Intermediate skills", "Advanced techniques", "None"],
          correctAnswer: "Advanced techniques",
          explanation: `The ${testConfig.difficulty} level focuses on advanced techniques in ${testConfig.query}.`,
        },
        {
          id: "q3",
          question: `Which technique is critical for ${testConfig.selectedSubjects[0]}?`,
          options: ["Variable Assignment", "Data Cleaning", "Model Evaluation", "Hyperparameter Tuning"],
          correctAnswer: "Variable Assignment",
          explanation: `Variable Assignment is a core concept in ${testConfig.selectedSubjects[0]}.`,
        },
        {
          id: "q4",
          question: `What is the purpose of ${testConfig.selectedSubjects[1]} in ${testConfig.query}?`,
          options: ["Improve model accuracy", "Prepare data for modeling", "Reduce training time", "Visualize data"],
          correctAnswer: "Prepare data for modeling",
          explanation: `${testConfig.selectedSubjects[1]} ensures data is ready for machine learning models.`,
        },
        {
          id: "q5",
          question: `Which algorithm is commonly used in ${testConfig.selectedSubjects[2]}?`,
          options: ["K-Means", "Linear Regression", "K-Nearest Neighbors", "DBSCAN"],
          correctAnswer: "Linear Regression",
          explanation: `Linear Regression is a key algorithm in ${testConfig.selectedSubjects[2]}.`,
        },
      ];
      return baseQuestions.slice(0, Math.min(testConfig.questionCount, baseQuestions.length));
    };

    const mockQuestions = generateQuestions();
    if (mockQuestions.length === 0) {
      setError("No questions available for the selected configuration.");
      setLoading(false);
      return;
    }

    setQuestions(mockQuestions);
    setLoading(false);
  }, [testConfig]);

  const handleAnswerSelect = useCallback((answer: string) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore((prev) => prev + 1);
    }
    setShowExplanation(true);
  }, [currentQuestion, questions]);

  const handleNext = useCallback(() => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer("");
      setShowExplanation(false);
    } else {
      // Save results to Redux
      console.log({ score, totalQuestions: questions.length, selectedTopic: testConfig.query, completedAt: new Date().toISOString() });
    //   dispatch(
    //     setTestResults({
    //       score,
    //       totalQuestions: questions.length,
    //       selectedTopic: testConfig.query,
    //       completedAt: new Date().toISOString(),
    //     })
    //   );
      setIsTestComplete(true);
    }
  }, [currentQuestion, questions, score, testConfig.query, dispatch]);

  const handleRetry = useCallback(() => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setShowExplanation(false);
    setScore(0);
    setIsTestComplete(false);
  }, []);

  const handleProceed = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      router.push("/learning-roadmap");
    }, 2000);
  }, [router]);

  if (loading) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center max-lg:py-20 ">
        <Loader loadingStates={loadingStates} loading={loading} duration={700} />
        <Button
          onClick={() => router.push("/generate")}
          className="mt-4 bg-gray-800 text-blue-400 border border-blue-500/50 hover:bg-gray-700"
          aria-label="Cancel Test"
        >
          Cancel
        </Button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-lg:py-20 ">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeading
            title="Error"
            subtitle={error}
            className="text-center"
            headingClassName="text-2xl md:text-3xl lg:text-4xl text-gray-200"
            subheadingClassName="text-lg text-gray-400"
          />
          <Button
            onClick={() => router.push("/generate")}
            className="mt-6 px-6 py-2.5 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
            aria-label="Back to Start"
          >
            Back to Start
          </Button>
        </div>
      </div>
    );
  }

  if (isTestComplete) {
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-lg:py-20 ">
        <div className="max-w-3xl mx-auto">
          <SectionHeading
            title="Test Completed!"
            subtitle={`You scored ${score} out of ${questions.length} on your ${testConfig.query} test.`}
            className="text-center"
            headingClassName="text-2xl md:text-3xl lg:text-4xl text-gray-200"
            subheadingClassName="text-lg text-gray-400"
          />
          <div className="mt-8 bg-gray-800/20 border border-gray-700/40 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-200 mb-4">Performance Summary</h3>
            <div className="space-y-3 text-sm text-gray-200">
              <div className="flex justify-between">
                <span>Correct Answers:</span>
                <span className="text-blue-500">{score}</span>
              </div>
              <div className="flex justify-between">
                <span>Incorrect Answers:</span>
                <span className="text-blue-500">{questions.length - score}</span>
              </div>
              <div className="flex justify-between">
                <span>Percentage:</span>
                <span className="text-blue-500">{((score / questions.length) * 100).toFixed(2)}%</span>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <Button
                onClick={handleRetry}
                className="px-6 py-2.5 bg-gray-800 text-blue-400 border border-blue-500/50 hover:bg-gray-700"
                aria-label="Retry Test"
              >
                Retry Test
              </Button>
              <Button
                onClick={handleProceed}
                className="px-6 py-2.5 bg-blue-500 text-white font-semibold hover:bg-blue-600"
                aria-label="Proceed to Roadmap"
              >
                Proceed to Roadmap
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-lg:py-20 ">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <SectionHeading
            title="Skill Assessment"
            subtitle={`Let's evaluate your current knowledge to personalize your learning path`}
            className="text-center"
            
          />
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-400">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-blue-500">
              Score: {score}/{currentQuestion + 1}
            </span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-gray-800/20 border border-gray-700/40 backdrop-blur-sm rounded-xl p-6 shadow-lg mb-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-200 mb-4">
              {questions[currentQuestion].question}
            </h3>
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showExplanation && handleAnswerSelect(option)}
                  disabled={showExplanation}
                  className={`w-full p-4 rounded-lg border text-left transition-all ${
                    showExplanation
                      ? option === questions[currentQuestion].correctAnswer
                        ? "border-green-500 bg-green-900/30"
                        : selectedAnswer === option
                        ? "border-red-500 bg-red-900/30"
                        : "border-gray-700"
                      : "border-gray-700 hover:border-blue-500"
                  } disabled:cursor-not-allowed`}
                  aria-label={`Select answer: ${option}`}
                >
                  <span className="text-gray-200">{option}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="mt-6 p-4 bg-blue-900/30 rounded-lg border border-blue-800">
              <h4 className="text-sm font-medium text-blue-200 mb-2">Explanation</h4>
              <p className="text-sm text-blue-300">{questions[currentQuestion].explanation}</p>
            </div>
          )}

          {/* Next/Finish Button */}
          {showExplanation && (
            <div className="mt-6 flex justify-end">
              <Button
                onClick={handleNext}
                className="px-6 py-2.5 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all"
                aria-label={currentQuestion < questions.length - 1 ? "Next Question" : "Finish Test"}
              >
                {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Test"}
              </Button>
            </div>
          )}
        </div>

        {/* Test Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-gray-800/20 border border-gray-700/40 backdrop-blur-sm rounded-lg p-4 shadow-md">
            <h4 className="font-medium text-gray-200 mb-2">Test Configuration</h4>
            <div className="space-y-1 text-gray-300">
              <p>Difficulty: <span className="capitalize">{testConfig.difficulty}</span></p>
              <p>Question Types: {testConfig.selectedQuestionTypes.join(", ")}</p>
              <p>Total Questions: {testConfig.questionCount}</p>
            </div>
          </div>
          <div className="bg-gray-800/20 border border-gray-700/40 backdrop-blur-sm rounded-lg p-4 shadow-md">
            <h4 className="font-medium text-gray-200 mb-2">Selected Topics</h4>
            <div className="space-y-1 text-gray-300">
              <p>Subjects: {testConfig.selectedSubjects.join(", ") || "None selected"}</p>
              <p>Custom Topics: {testConfig.customTopics || "None specified"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;