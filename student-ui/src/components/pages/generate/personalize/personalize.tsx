"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useGenerateAssessmentMutation, useGenerateTopicsMutation } from "@/redux/features/api/generate/generateApi";
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";

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


interface Topic {
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  checked: boolean;
}

interface Resource {
  name: string;
  checked: boolean;
}

interface Platform {
  name: string;
  type: "Free" | "Paid";
  checked: boolean;
}

const Personalize: React.FC = () => {
  const router = useRouter();
  const prompt = useSelector((state: RootState) => state.localStorage.query) || "Build a Machine Learning Course";
  console.log("Selected Topic:", prompt);

  const [generateTopics, { isLoading, isError, error }] = useGenerateTopicsMutation();

  const [generateAssessment, { isLoading: isLoading_generateAssessment, isError: isError__generateAssessment, error: error__generateAssessment }] = useGenerateAssessmentMutation();

  const [topics, setTopics] = useState<Topic[]>([]);
  const [difficulty, setDifficulty] = useState<"Beginner" | "Intermediate" | "Advanced">("Beginner");
  const [questionTypes, setQuestionTypes] = useState<Record<string, boolean>>({
    "Multiple Choice": true,
    "Coding Challenges": false,
    "Practical Projects": false,
  });

  const [resources, setResources] = useState<Resource[]>([
    { name: "Video Tutorials", checked: true },
    { name: "Articles", checked: true },
    { name: "Interactive Labs", checked: false },
    { name: "Assignments", checked: false },
  ]);

  const [platforms, setPlatforms] = useState<Platform[]>([
    { name: "YouTube", type: "Free", checked: true },
    { name: "Coursera", type: "Paid", checked: false },
    { name: "edX", type: "Paid", checked: false },
    { name: "Udemy", type: "Paid", checked: false },
  ]);

  const [language, setLanguage] = useState("en");
  const [pace, setPace] = useState("moderate");

  // Fetch topics on component mount
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await generateTopics({ prompt }).unwrap();
        const fetchedTopics = response.topics.map((topic: { topic: string; level: string }) => ({
          name: topic.topic,
          level: topic.level as "Beginner" | "Intermediate" | "Advanced",
          checked: topic.level === "Beginner" || topic.level === "Intermediate", // Default checked for Beginner and Intermediate
        }));
        setTopics(fetchedTopics);
      } catch (err) {
        console.error("Error fetching topics:", err);
      }
    };
    fetchTopics();
  }, [prompt, generateTopics]);

  const handleTopicChange = useCallback((index: number) => {
    setTopics((prev) =>
      prev.map((topic, i) => (i === index ? { ...topic, checked: !topic.checked } : topic))
    );
  }, []);

  const handleQuestionTypeChange = useCallback((type: string) => {
    setQuestionTypes((prev) => ({ ...prev, [type]: !prev[type] }));
  }, []);

  const handleResourceChange = useCallback((index: number) => {
    setResources((prev) =>
      prev.map((resource, i) => (i === index ? { ...resource, checked: !resource.checked } : resource))
    );
  }, []);

  const handlePlatformChange = useCallback((index: number) => {
    setPlatforms((prev) =>
      prev.map((platform, i) => (i === index ? { ...platform, checked: !platform.checked } : platform))
    );
  }, []);

  const selectedTopicCount = topics.filter((t) => t.checked).length;
  const estimatedWeeks = selectedTopicCount * 2;

  const handleTakeAssessment = useCallback(async () => {
    try {
      const playlistData = {
        prompt,
        topics: topics.filter((t) => t.checked).map((t) => ({ name: t.name, level: t.level })),
        difficulty,
        questionsTypes: Object.entries(questionTypes)
          .filter(([_, checked]) => checked)
          .map(([type]) => type),
        resources: resources.filter((r) => r.checked).map((r) => r.name),
        platforms: platforms.filter((p) => p.checked).map((p) => ({ name: p.name, type: p.type })),
        language,
        pace,
        resourcesType: platforms.some((p) => p.checked && p.type === "Free") &&
          platforms.some((p) => p.checked && p.type === "Paid")
          ? "Mixed (Free + Paid)"
          : platforms.some((p) => p.checked && p.type === "Free")
            ? "Free"
            : "Paid",
        estimatedDuration: `${estimatedWeeks}-${estimatedWeeks + 2} weeks`,
      };

      console.log("Course Data:", playlistData);
      const response = await generateAssessment(playlistData).unwrap();
      // router.push("/generate/assessment");
      const assessmentId = response?.assessmentId || response?.id; // Adjust based on your API response structure

      if (assessmentId) {
        // Redirect to /generate/assessment with the assessment ID as a query parameter
        router.push(`/generate/assessment?id=${assessmentId}`);
      } else {
        console.error("No assessment ID found in response");
      }
    } catch (error) {
      console.error("Error generating assessment:", error);
      return;

    }

  }, [prompt, topics, difficulty, questionTypes, resources, platforms, language, pace, selectedTopicCount, router]);


  if (isLoading_generateAssessment) {
    return <Loader loadingStates={loadingStates} loading={isLoading_generateAssessment} duration={700} />
  }

  return (
    <section className="min-h-screen px-4 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-200 mb-4">
            Personalize Your Course
          </h1>
          <p className="text-xl text-gray-400 mb-6">
            Customize your learning experience based on your goals and preferences
          </p>
          <div className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-800/20 border-gray-700/40 border">
            <span className="text-sm font-medium text-blue-500">Prompt:</span>
            <span className="ml-2 text-sm text-gray-200">{prompt}</span>
          </div>
        </div>




        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Topic Selection */}
          <div className="space-y-8">
            {/* Generated Topics */}
            <div className="p-6 rounded-xl bg-gray-800/20 border-gray-700/40 border">
              <h3 className="text-xl font-semibold text-gray-200 mb-6">Select Topics to Include</h3>
              {isLoading && (
                <div className="text-center text-gray-400">Loading topics...</div>
              )}
              {isError && (
                <div className="text-center text-red-500">
                  Error fetching topics: {error ? JSON.stringify(error) : "Unknown error"}
                </div>
              )}
              {!isLoading && topics.length > 0 && (

                <div className="space-y-3">
                  {topics.map((topic, index) => (
                    <label
                      key={topic.name}
                      className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-blue-500/10 transition-all"
                    >
                      <input
                        type="checkbox"
                        checked={topic.checked}
                        onChange={() => handleTopicChange(index)}
                        className="w-5 h-5 rounded accent-blue-500"
                      />
                      <span className="ml-3 font-medium text-gray-200">{topic.name}</span>
                      <span className="ml-auto text-sm text-blue-500">{topic.level}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Assessment Options */}
            <div className="p-6 rounded-xl bg-gray-800/20 border-gray-700/40 border">
              <h3 className="text-xl font-semibold text-gray-200 mb-6">Assessment Preferences</h3>
              <div className="space-y-6">
                {/* Difficulty Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-3">
                    Assessment Difficulty
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {["Beginner", "Intermediate", "Advanced"].map((level) => (
                      <button
                        key={level}
                        onClick={() => setDifficulty(level as "Beginner" | "Intermediate" | "Advanced")}
                        className={`p-3 rounded-lg border-2 transition-all ${difficulty === level
                          ? "bg-blue-500/20 border-blue-500"
                          : "bg-gray-900 border-blue-500/30"
                          } text-gray-200`}
                      >
                        <div className="text-sm font-medium">{level}</div>
                        <div className="text-xs opacity-70">
                          {level === "Beginner" ? "5-10 questions" : level === "Intermediate" ? "10-15 questions" : "15-20 questions"}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Question Types */}
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-3">
                    Question Types
                  </label>
                  <div className="space-y-2">
                    {Object.keys(questionTypes).map((type) => (
                      <label key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={questionTypes[type]}
                          onChange={() => handleQuestionTypeChange(type)}
                          className="w-4 h-4 rounded accent-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-200">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Preferences */}
          <div className="space-y-8">
            {/* Resource Preferences */}
            <div className="p-6 rounded-xl bg-gray-800/20 border-gray-700/40 border">
              <h3 className="text-xl font-semibold text-gray-200 mb-6">Resource Preferences</h3>
              <div className="space-y-6">
                {/* Resource Types */}
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-3">
                    Preferred Resource Types
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {resources.map((resource, index) => (
                      <label
                        key={resource.name}
                        className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-blue-500/10"
                      >
                        <input
                          type="checkbox"
                          checked={resource.checked}
                          onChange={() => handleResourceChange(index)}
                          className="w-4 h-4 rounded accent-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-200">{resource.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Platform Preferences */}
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-3">
                    Platform Preferences
                  </label>
                  <div className="space-y-2">
                    {platforms.map((platform, index) => (
                      <label
                        key={platform.name}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-500/10"
                      >
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={platform.checked}
                            onChange={() => handlePlatformChange(index)}
                            className="w-4 h-4 rounded accent-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-200">{platform.name}</span>
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded ${platform.type === "Free" ? "bg-blue-500" : "bg-orange-500"
                            } text-white`}
                        >
                          {platform.type}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Language Preference */}
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-3">
                    Language Preference
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full p-3 rounded-lg border-2 bg-gray-900 text-gray-200 border-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="hi">Hindi</option>
                    <option value="zh">Mandarin</option>
                    <option value="ar">Arabic</option>
                  </select>
                </div>

                {/* Learning Pace */}
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-3">
                    Learning Pace
                  </label>
                  <div className="space-y-3">
                    {["Relaxed (2-3 hours/week)", "Moderate (5-7 hours/week)", "Intensive (10+ hours/week)"].map((p) => (
                      <label key={p} className="flex items-center">
                        <input
                          type="radio"
                          name="pace"
                          value={p.toLowerCase().split(" ")[0]}
                          checked={pace === p.toLowerCase().split(" ")[0]}
                          onChange={(e) => setPace(e.target.value)}
                          className="w-4 h-4 accent-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-200">{p}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Course Summary */}
            <div className="p-6 rounded-xl bg-gray-800/20 border-gray-700/40 border">
              <h3 className="text-xl font-semibold text-gray-200 mb-4">Course Summary</h3>
              <div className="space-y-3 text-sm text-gray-200">
                <div className="flex justify-between">
                  <span>Selected Topics:</span>
                  <span className="text-blue-500">{selectedTopicCount} topics</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Duration:</span>
                  <span className="text-blue-500">{estimatedWeeks}-{estimatedWeeks + 2} weeks</span>
                </div>
                <div className="flex justify-between">
                  <span>Difficulty Level:</span>
                  <span className="text-blue-500">{difficulty}</span>
                </div>
                <div className="flex justify-between">
                  <span>Resources:</span>
                  <span className="text-blue-500">
                    {platforms.some((p) => p.checked && p.type === "Free") &&
                      platforms.some((p) => p.checked && p.type === "Paid")
                      ? "Mixed (Free + Paid)"
                      : platforms.some((p) => p.checked && p.type === "Free")
                        ? "Free"
                        : "Paid"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <button
            onClick={() => router.push("/generate")}
            className="px-8 py-3 rounded-xl border-2 border-blue-500/50 text-gray-200 hover:scale-105 transition-all"
          >
            Back to Start
          </button>
          <button
            onClick={handleTakeAssessment}
            className="px-8 py-3 rounded-xl bg-blue-500 text-white font-semibold hover:scale-105 transition-all"
            disabled={isLoading || topics.length === 0}
          >
            Take Assessment
          </button>
          <button
            onClick={() => router.push("/roadmap")}
            className="px-8 py-3 rounded-xl border-2 border-blue-500/50 text-gray-200 hover:scale-105 transition-all"
            disabled={isLoading || topics.length === 0}
          >
            Skip Assessment
          </button>
        </div>
      </div>
    </section>
  );
};

export default Personalize;