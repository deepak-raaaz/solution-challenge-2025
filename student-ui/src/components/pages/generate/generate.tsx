"use client";
import React, { useState, useCallback } from "react";
import { Info, WandSparkles } from "lucide-react";
import ConfirmationDialog from "./confirmation-dialog";
import { setQuery } from "@/redux/features/local-storage/localStorageSlice";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useEnhancePromptMutation } from "@/redux/features/api/generate/generateApi";

const suggestion = [
  {
    title: "Machine Learning",
    description: "Create an interactive lesson plan for machine learning fundamentals.",
  },
  {
    title: "Web Development",
    description: "Build a full-stack application using React and Node.js.",
  },
  {
    title: "Data Science",
    description: "Analyze large datasets using Python and Pandas.",
  },
  {
    title: "Cybersecurity",
    description: "Learn the basics of network security and ethical hacking.",
  },
  {
    title: "Cloud Computing",
    description: "Deploy applications on AWS or Azure.",
  },
  {
    title: "AI and Deep Learning",
    description: "Understand neural networks and build AI models.",
  },
  {
    title: "Blockchain Technology",
    description: "Explore the fundamentals of blockchain and cryptocurrencies.",
  },
];

const Generate: React.FC = () => {
  const [mutate, { isLoading, isError, error }] = useEnhancePromptMutation();
  const router = useRouter();
  const dispatch = useDispatch();
  const [query, setQueryText] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Check if query is empty or only whitespace
  const isQueryEmpty = !query.trim();

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!isQueryEmpty) {
        setIsDialogOpen(true);
      }
    },
    [isQueryEmpty]
  );

  const handleConfirm = useCallback(() => {
    setIsDialogOpen(false);
    if (!isQueryEmpty) {
      dispatch(setQuery(query));
      router.push(`/generate/personalize`);
    }
  }, [query, dispatch]);

  const enhancePromptHandler = async () => {
    if (isQueryEmpty) return;
    try {
      const { data } = await mutate({ prompt: query });
      if (data) {
        setQueryText(data.enhancedPrompt);
      }
    } catch (err) {
      console.error("Error enhancing prompt:", err);
    }
  };

  return (
    <div className="min-h-screen dark:text-white flex items-center justify-center py-20">
      <div className="max-container py-20 max-md:py-0">
        <div className="flex flex-col items-center justify-center text-center space-y-4 max-sm:space-y-2">
          <h1 className="text-4xl md:text-6xl font-medium font-pp-neue-montreal tracking-wide bg-gradient-to-b from-blue-300 py-1 to-blue-500 bg-clip-text text-transparent">
            What would you like to learn?
          </h1>
          <p className="text-lg md:text-xl max-w-3xl max-sm:text-base">
            Tell us what you want to learn and we'll build a personalized course just for you
          </p>
          <form onSubmit={handleSubmit} className="w-full max-w-3xl mt-8">
            <div className="relative">
              <div className="w-full dark:bg-gray-800/20 bg-white border border-neutral-900/30 dark:border-gray-700/40 rounded-lg p-4 dark:text-white dark:placeholder-white/40 placeholder:text-gray-500 focus:outline-none resize-none">
                <textarea
                  value={query}
                  rows={5}
                  onChange={(e) => setQueryText(e.target.value)}
                  className="w-full focus:outline-none resize-none"
                  placeholder="Create an interactive lesson plan for machine learning fundamentals..."
                />
                <div className="flex justify-between w-full space-x-2 pt-2">
                  <div className="flex items-center space-x-2">
                    {/* AI Enhance Button with Tooltip */}
                    <div className="group relative">
                      <button
                        onClick={enhancePromptHandler}
                        type="button"
                        disabled={isQueryEmpty || isLoading}
                        className={`h-10 w-10 flex items-center justify-center rounded-full dark:bg-gray-800/90 border-[2px] dark:border-gray-700/60 text-slate-200 transition-colors
                          ${isQueryEmpty || isLoading
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:dark:bg-gray-800/40 cursor-pointer'}`}
                        aria-label="AI wizard"
                      >
                        <WandSparkles />
                      </button>
                      <div className="absolute left-1/2 -translate-x-1/2 top-12 hidden group-hover:flex items-center space-x-2 bg-gray-800/90 dark:bg-[#0E1217] text-white text-sm px-3 py-2 rounded-md gap-2">
                        <WandSparkles size={16} className="text-blue-500" />
                        <div className="flex flex-col text-nowrap justify-start items-start">
                          <span className="font-semibold">AI Enhancement</span>
                          <span className="text-slate-400">Let AI improve your prompt</span>
                        </div>
                      </div>
                    </div>
                    {/* Info Button with Tooltip */}
                    <div className="group relative">
                      <button
                        type="button"
                        className="h-10 w-10 flex items-center justify-center rounded-full dark:bg-gray-800/90 border-[2px] dark:border-gray-700/60 text-slate-200 cursor-pointer transition-colors hover:dark:bg-gray-800/40"
                        aria-label="Info"
                      >
                        <Info />
                      </button>
                      <div className="absolute left-1/2 -translate-x-1/2 top-12 hidden group-hover:flex items-center space-x-2 bg-gray-800/90 dark:bg-[#0E1217] text-white text-sm px-3 py-2 rounded-md gap-2">
                        <Info size={16} className="text-blue-500" />
                        <div className="flex flex-col text-nowrap justify-start items-start">
                          <span className="font-semibold">Prompt Examples</span>
                          <span className="text-slate-400">See example prompts and tips</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={isQueryEmpty}
                    className={`px-6 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold rounded-full transition-all
                      ${isQueryEmpty
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:from-blue-600 hover:to-blue-700 cursor-pointer'}`}
                  >
                    Generate
                  </Button>
                </div>
              </div>
            </div>
          </form>
          <ConfirmationDialog
            isOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            onConfirm={handleConfirm}
          />
          <div className="flex w-full max-w-3xl justify-start items-start flex-col gap-2">
            <span className="text-gray-500 dark:text-gray-400 max-sm:text-base max-sm:mx-1">Quick Suggestions:</span>
            <div className="flex flex-wrap space-y-2 items-center space-x-2 mr-2">
              {suggestion.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setQueryText(item.description)}
                  className="py-2 px-3 max-sm:text-sm max-sm:py-1 text-nowrap rounded-md dark:bg-gray-800/20 bg-white border border-neutral-900/30 dark:border-gray-700/40 text-slate-500 cursor-pointer transition-colors"
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generate;