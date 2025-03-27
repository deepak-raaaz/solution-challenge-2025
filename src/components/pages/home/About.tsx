// components/About.tsx
'use client';

import Image from 'next/image';
import { FC } from 'react';
import SectionHeading from '@/components/shared/SectionHeading';

const About: FC = () => {
  const avatars = [
    { initials: 'JD', bgColor: 'bg-blue-500 dark:bg-blue-600' },
    { initials: 'TK', bgColor: 'bg-purple-500 dark:bg-purple-600' },
    { initials: 'MR', bgColor: 'bg-pink-500 dark:bg-pink-600' },
    { initials: 'SL', bgColor: 'bg-indigo-500 dark:bg-indigo-600' },
  ];

  const stats = [
    { value: '100+', label: 'Languages Supported' },
    { value: '500+', label: 'Learning Paths' },
    { value: '50+', label: 'Countries Reached' },
    { value: '95%', label: 'Completion Rate' },
  ];

  return (
    <div className="max-container relative z-10 max-sm:px-10">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <div className="text-gray-900 dark:text-white">
          <SectionHeading
            title="AI-Powered Learning For Everyone"
            subtitle="Bridging educational gaps with personalized AI learning paths that adapt to every student's unique needs and circumstances."
            headingClassName='text-start'
            subheadingClassName='text-start !mx-0'
          />
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 ">
            <a
              href="#cta"
              className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 font-semibold py-3 px-8 rounded-lg transition-colors text-center"
            >
              Start Learning For Free
            </a>
            <a
              href="#how-it-works"
              className="bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-white dark:text-white dark:hover:bg-white/10 font-semibold py-3 px-8 rounded-lg transition-colors text-center"
            >
              How It Works
            </a>
          </div>

          {/* User Avatars & Stats */}
          <div className="mt-8 flex items-center">
            <div className="flex -space-x-2">
              {avatars.map((avatar, index) => (
                <div
                  key={index}
                  className={`w-10 h-10 rounded-full ${avatar.bgColor} flex items-center justify-center text-white text-xs font-medium`}
                >
                  {avatar.initials}
                </div>
              ))}
            </div>
            <p className="ml-4 text-sm text-gray-600 dark:text-blue-100">
              <span className="font-bold">10,000+</span> students already learning
            </p>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="relative">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">About Our Platform</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Our AI learning platform offers personalized education paths tailored to your needs.
              </p>
              <video
                preload="auto"
                loop
                autoPlay
                muted
                className="rounded-lg w-full"
                width="600"
                height="400"
                src="/videos/eduai.mp4" // Replace with your video URL
                // alt="AI learning platform interface showing personalized education path"
              >
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Feature Card 1 */}
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                  <svg
                    className="h-6 w-6 text-blue-600 dark:text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Personalized Learning</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Adaptive to your pace</p>
                </div>
              </div>
            </div>

            {/* Feature Card 2 */}
            <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center">
                  <svg
                    className="h-6 w-6 text-purple-600 dark:text-purple-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">AI Mentorship</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">24/7 guidance & support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-white/5 p-6 rounded-lg shadow-lg dark:shadow-none backdrop-blur-sm"
          >
            <p className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-white mb-2">{stat.value}</p>
            <p className="text-sm text-gray-600 dark:text-blue-100">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;