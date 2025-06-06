"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { setAssessment, setTestResults } from "@/redux/features/local-storage/localStorageSlice";
import { useGetAssessmentQuery, useSubmitAssessmentMutation, } from "@/redux/features/api/generate/generateApi";
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";
import SectionHeading from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store";

interface Question {
  type: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  id?: string;
}

interface TestConfig {
  selectedSubjects: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  selectedQuestionTypes: string[];
  questionCount: number;
  customTopics: string;
  query: string;
}

interface UserAnswer {
  questionId: string;
  selectedAnswer: string;
}

const loadingStates = [
  { text: "Structuring your complete guide" },
  { text: "Sourcing expert insights" },
  { text: "Curating the perfect Roadmap" },
  { text: "Gathering top-tier resources" },
  { text: "Verifying content quality" },
  { text: "Organizing everything neatly" },
  { text: "Polishing your learning package" },
  { text: "Finalizing—almost there!" },
];

const Assessment: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const assessmentId = searchParams.get("id");

  const { assessment, query } = useSelector((state: RootState) => state.localStorage);
  const { data: fetchedAssessment, isLoading: isFetching, isError, error } = useGetAssessmentQuery(assessmentId || "", {
    skip: !assessmentId || !!assessment?.questions?.length,
  });

  const [submitAssessment, { isLoading: isSubmitting, isError: isSubmitError, error: submitError }] = useSubmitAssessmentMutation();


  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isTestComplete, setIsTestComplete] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [assessmentResult, setAssessmentResult] = useState<{
    score: number;
    maxScore: number;
    assessmentId: string;
    playlistPersonalizationId: string;
  } | null>(null);
  const [testConfig, setTestConfig] = useState<TestConfig>({
    selectedSubjects: [],
    difficulty: "Beginner",
    selectedQuestionTypes: ["Multiple Choice"],
    questionCount: 0,
    customTopics: "",
    query: query || "Build a Machine Learning Course",
  });

  // Set questions from Redux or API
  useEffect(() => {
    if (assessment?.questions?.length) {
      const questionsWithIds = assessment.questions.map((q: any, index: number) => ({
        ...q,
        id: q.id || `${assessment.assessmentId}-${index}`,
      }));
      setQuestions(questionsWithIds);
      setTestConfig((prev) => ({
        ...prev,
        questionCount: questionsWithIds.length,
      }));
      setLoading(false);
    } else if (assessmentId && fetchedAssessment) {
      dispatch(setAssessment(fetchedAssessment));
      const questionsWithIds = fetchedAssessment.questions.map((q: any, index: number) => ({
        ...q,
        id: q.id || `${fetchedAssessment.assessmentId}-${index}`,
      }));
      setQuestions(questionsWithIds);
      setTestConfig((prev) => ({
        ...prev,
        questionCount: questionsWithIds.length,
      }));
      setLoading(false);
    } else if (isError) {
      setErrorMessage(error ? JSON.stringify(error) : "Failed to fetch assessment data.");
      setLoading(false);
    } else if (!assessmentId) {
      setErrorMessage("No assessment ID provided in the URL.");
      setLoading(false);
    }
  }, [assessment, fetchedAssessment, isError, error, assessmentId, dispatch]);

  // Update testConfig based on assessment metadata
  useEffect(() => {
    if (assessment?.questions?.length) {
      setTestConfig((prev) => ({
        ...prev,
        selectedQuestionTypes: [...new Set(assessment.questions.map((q: any) => q.type))],
        query: query || "Build a Machine Learning Course",
      }));
    }
  }, [assessment, query]);

  const handleAnswerSelect = useCallback(
    (answer: string) => {
      const currentQuestionId = questions[currentQuestion]?.id;
      if (!currentQuestionId) {
        setErrorMessage("Question ID is missing for the current question.");
        return;
      }
      setSelectedAnswer(answer);
      if (answer === questions[currentQuestion].correctAnswer) {
        setScore((prev) => prev + 1);
      }
      setUserAnswers((prev) => {
        const existingAnswerIndex = prev.findIndex((ans) => ans.questionId === currentQuestionId);
        if (existingAnswerIndex >= 0) {
          const updatedAnswers = [...prev];
          updatedAnswers[existingAnswerIndex] = { questionId: currentQuestionId, selectedAnswer: answer };
          console.log("Updated userAnswers:", updatedAnswers); // Debug log
          return updatedAnswers;
        }
        const newAnswers = [...prev, { questionId: currentQuestionId, selectedAnswer: answer }];
        console.log("New userAnswers:", newAnswers); // Debug log
        return newAnswers;
      });
      setShowExplanation(true);
    },
    [currentQuestion, questions]
  );

  const handleNext = useCallback(() => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer("");
      setShowExplanation(false);
    } else {
      if (userAnswers.length < questions.length) {
        setErrorMessage("Please answer all questions before finishing the test.");
        return;
      }
      dispatch(
        setTestResults({
          score,
          totalQuestions: questions.length,
          selectedTopic: testConfig.query,
          completedAt: new Date().toISOString(),
        })
      );
      setIsTestComplete(true);
    }
  }, [currentQuestion, questions, score, testConfig.query, dispatch, userAnswers]);

  const handleRetry = useCallback(() => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setShowExplanation(false);
    setScore(0);
    setUserAnswers([]);
    setIsTestComplete(false);
    setAssessmentResult(null);
    setErrorMessage(null);
  }, []);

  const handleProceed = useCallback(async () => {
    if (!assessmentId) {
      setErrorMessage("Assessment ID is missing from the URL.");
      setLoading(false);
      return;
    }

    if (!userAnswers.length || userAnswers.length < questions.length) {
      setErrorMessage("Please answer all questions before generating the Learning Roadmap.");
      setLoading(false);
      return;
    }

    // Transform userAnswers to match backend expectation: [string, string, ...]
    const orderedAnswers = questions.map((q) => {
      const answer = userAnswers.find((ua) => ua.questionId === q.id);
      return answer ? answer.selectedAnswer : "";
    }).filter((answer) => answer !== "");

    if (orderedAnswers.length !== questions.length) {
      setErrorMessage("Some questions are missing answers. Please complete all questions.");
      setLoading(false);
      return;
    }

    const payload = { userAnswers: orderedAnswers };
    console.log("Submitting assessment with:", { assessmentId, payload }); // Debug log

    setLoading(true);

    try {
      // Submit assessment
      const submitResult = await submitAssessment({
        assessmentId,
        userAnswers: orderedAnswers, // Ensure the payload is structured correctly
      }).unwrap();

      setAssessmentResult({
        score: submitResult.score,
        maxScore: submitResult.maxScore,
        assessmentId: submitResult.assessmentId,
        playlistPersonalizationId: submitResult.playlistPersonalizationId,
      });

      console.log("Assessment submitted successfully:", submitResult); // Debug log

      setTimeout(() => {
        router.push(`/generate/learning-roadmap?assessment=${assessmentId}&personalization=${submitResult.playlistPersonalizationId}`);
      }, 2000);

      // Generate playlist

    } catch (err: any) {
      console.error("Error during submission or playlist generation:", err); // Debug log
      setErrorMessage(
        err?.data?.error || "Failed to submit assessment or generate playlist. Please try again."
      );
      setLoading(false);
    }
  }, [assessmentId, userAnswers, submitAssessment, router, questions]);

  if (loading || isFetching || isSubmitting) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center py-20">
        <Loader loadingStates={loadingStates} loading={true} duration={700} />
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

  if (errorMessage) {
    return (
      <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeading
            title="Error"
            subtitle={errorMessage}
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
      <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl mx-auto">
          <SectionHeading
            title="Test Completed!"
            subtitle={`You scored ${assessmentResult?.score || score} out of ${assessmentResult?.maxScore || questions.length
              } on your ${testConfig.query} test.`}
            className="text-center"
            headingClassName="text-2xl md:text-3xl lg:text-4xl text-gray-200"
            subheadingClassName="text-lg text-gray-400"
          />
          <div className="mt-8 bg-gray-800/20 border border-gray-700/40 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-200 mb-4">Performance Summary</h3>
            <div className="space-y-3 text-sm text-gray-200">
              <div className="flex justify-between">
                <span>Correct Answers:</span>
                <span className="text-blue-500">{assessmentResult?.score || score}</span>
              </div>
              <div className="flex justify-between">
                <span>Incorrect Answers:</span>
                <span className="text-blue-500">
                  {(assessmentResult?.maxScore || questions.length) - (assessmentResult?.score || score)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Percentage:</span>
                <span className="text-blue-500">
                  {(
                    ((assessmentResult?.score || score) / (assessmentResult?.maxScore || questions.length)) * 100
                  ).toFixed(2)}
                  %
                </span>
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
                aria-label="Generate Learning Roadmap"
                disabled={isSubmitting}
              >
                Generate Learning Roadmap
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <SectionHeading
            title="Skill Assessment"
            subtitle={`Let's evaluate your current knowledge to personalize your learning path`}
            className="text-center"
          />
        </div>

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

        <div className="bg-gray-800/20 border border-gray-700/40 backdrop-blur-sm rounded-xl p-6 shadow-lg mb-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-200 mb-4">
              {questions[currentQuestion]?.question || "Loading question..."}
            </h3>
            <div className="space-y-3">
              {questions[currentQuestion]?.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showExplanation && handleAnswerSelect(option)}
                  disabled={showExplanation}
                  className={`w-full p-4 rounded-lg border text-left transition-all ${showExplanation
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

          {showExplanation && (
            <div className="mt-6 p-4 bg-blue-900/30 rounded-lg border border-blue-800">
              <h4 className="text-sm font-medium text-blue-200 mb-2">Explanation</h4>
              <p className="text-sm text-blue-300">{questions[currentQuestion].explanation}</p>
            </div>
          )}

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