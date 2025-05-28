"use client";
import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Info, Paperclip, WandSparkles } from "lucide-react";
import ConfirmationDialog from "./confirmation-dialog";


const Generate: React.FC = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsDialogOpen(true);
    }
  }, [query]);

  const handleConfirm = useCallback(() => {
    setIsDialogOpen(false);
    if (query.trim()) {
      router.push(`/login?query=${encodeURIComponent(query)}`);
    }
  }, [query, router]);

  return (
    <div className="min-h-screen dark:text-white flex items-center justify-center">
      <div className="max-container py-20 max-md:py-0">
        <div className="flex flex-col items-center justify-center text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-medium font-pp-neue-montreal tracking-wide bg-gradient-to-b from-blue-300 py-1 to-blue-500 bg-clip-text text-transparent">
            So, what are we learning today?
          </h1>
          <p className="text-lg md:text-xl max-w-3xl">
            Get started with a simple prompt or use our AI wizard to create your personalized learning path.
          </p>
          <form onSubmit={handleSubmit} className="w-full max-w-3xl mt-8">
            <div className="relative">
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-48 dark:bg-gray-800/20 bg-white border border-neutral-900/30 dark:border-gray-700/40 rounded-lg p-4 dark:text-white dark:placeholder-white/40 placeholder:text-gray-500 focus:outline-none resize-none"
                placeholder="Create an interactive lesson plan for machine learning fundamentals..."
              />
              <div className="absolute bottom-4 right-0 px-4 left-0 flex justify-between w-full space-x-2">
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    className="h-10 w-10 flex items-center justify-center rounded-full dark:bg-gray-800/90 border-[2px] dark:border-gray-700/60 text-slate-200 cursor-pointer transition-colors"
                  >
                    <Paperclip />
                  </button>
                  <button
                    type="button"
                    className="h-10 w-10 flex items-center justify-center rounded-full dark:bg-gray-800/90 border-[2px] dark:border-gray-700/60 text-slate-200 cursor-pointer transition-colors"
                  >
                    <WandSparkles />
                  </button>
                  <button
                    type="button"
                    className="h-10 w-10 flex items-center justify-center rounded-full dark:bg-gray-800/90 border-[2px] dark:border-gray-700/60 text-slate-200 cursor-pointer transition-colors"
                  >
                    <Info />
                  </button>
                </div>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-blue-700 transition-all cursor-pointer"
                >
                  Generate
                </button>
              </div>
            </div>
          </form>
          <ConfirmationDialog
            isOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            onConfirm={handleConfirm}
          />
          <button className="mt-8 flex items-center space-x-2 text-blue-300 hover:text-blue-200 transition-colors">
            <span>Try AI learning wizard</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Generate;