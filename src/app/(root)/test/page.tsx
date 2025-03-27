"use client"
import React from 'react';
import SectionHeading from '@/components/shared/SectionHeading';
import { useRouter } from 'next/navigation';

const Test: React.FC = () => {
  const router = useRouter();

  return (
    <section
      id="cta"
      className="py-16 min-h-screen max-container "
    >
      <div className="">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Left Content */}
          <div className="md:w-1/2">
            <SectionHeading
              title="Start Creating Custom Tests Today"
              subtitle="Join thousands of students who are accelerating their learning with personalized test creation. Take control of your education journey now."
              className="text-start text-xl"
              headingClassName='text-3xl md:text-4xl lg:text-5xl'
              subheadingClassName='!text-lg'
            />

            {/* Features List */}
            <div className="flex flex-wrap gap-4 mb-8 mt-4">
              {[
                'Free to get started',
                'No credit card required',
                'Cancel anytime',
              ].map((feature) => (
                <div key={feature} className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => {
                  const searchParams = new URLSearchParams(window.location.search);
                  const query = searchParams.get('query');
                  if (query) {
                    router.push(`/test/test-customization?query=${query}`);
                  } else {
                    router.push('/test/test-customization');
                  }
                }}
                className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300 text-white hover:from-blue-700 hover:to-blue-500 px-8 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300"
              >
                Create Your First Test
              </button>
              <a
                href="#"
                className="bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 px-8 py-3 rounded-lg font-semibold border border-gray-200 dark:border-gray-700 transition-all duration-300"
              >
                Skip Test
              </a>
            </div>
          </div>

          {/* Right Content */}
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg dark:shadow-gray-900/30  w-full">
              {/* Quick Start Guide */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-400 dark:from-blue-400 dark:to-blue-300 rounded-full flex items-center justify-center mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-blue-800 dark:text-blue-300 font-bold">Quick Start Guide</h3>
                </div>
                <ol className="text-blue-900 dark:text-blue-200 text-sm space-y-2 pl-6 list-decimal">
                  {[
                    'Select your subject and learning stage',
                    'Choose difficulty level and question type',
                    'Add your specific study topics',
                    'Set the number of questions',
                    'Click generate and start learning!',
                  ].map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>

              {/* Recommendation Card */}
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                        Highly Recommended Test
                      </h3>
                      <div className="mt-1 text-sm text-blue-700 dark:text-blue-300">
                        <p>Based on your learning query, we recommend this test to help you achieve better results:</p>
                        <ul className="mt-2 space-y-1">
                          <li className="flex items-center">
                            <svg className="h-4 w-4 text-blue-500 dark:text-blue-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Comprehensive coverage of key concepts
                          </li>
                          <li className="flex items-center">
                            <svg className="h-4 w-4 text-blue-500 dark:text-blue-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Progressive difficulty levels
                          </li>
                          <li className="flex items-center">
                            <svg className="h-4 w-4 text-blue-500 dark:text-blue-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Detailed explanations for each answer
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

               
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Test;