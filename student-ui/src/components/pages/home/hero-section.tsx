"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const HeroSection = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      
      router.push(`/generate`);
    }
  };

  return (
    <div className="min-h-screen dark:text-white flex items-center justify-center">
      <div className="max-container py-20">
        <div className="flex flex-col items-center justify-center text-center space-y-8">
          
            <Image src="/images/eduai.png" alt="Logo" width={100} height={100} />

          
          <h1 className="text-5xl md:text-7xl font-medium font-pp-neue-montreal tracking-wide bg-gradient-to-b from-blue-300 py-1 to-blue-500 bg-clip-text text-transparent">
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
                className="w-full h-32 dark:bg-surface bg-white border border-neutral-900/30 rounded-lg p-4 dark:text-white dark:placeholder-white/40 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Create an interactive lesson plan for machine learning fundamentals..."
              />
              <div className="absolute bottom-4 right-4 flex space-x-2">
                <button type="button" className="p-2 rounded-full dark:bg-[#151530] dark:hover:bg-[#1a1a3a] transition-colors">
                  <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
                <button

                 type="submit" className="px-6 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-blue-700 transition-all cursor-pointer">
                  Generate
                </button>
              </div>
            </div>
          </form>

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

export default HeroSection;
