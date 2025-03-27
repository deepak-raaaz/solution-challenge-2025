// components/Problem.tsx
import Image from 'next/image';
import { FC } from 'react';
import SectionHeading from '@/components/shared/SectionHeading';

const Problem: FC = () => {
  const placeholderImage = 'https://placehold.co/600x400.png/4361EE/FFFFFF?text=Education+Inequality';

  const issues = [
    {
      title: 'Geographic Disparities',
      description: '258 million children worldwide lack access to education due to geographic isolation and infrastructure limitations.',
    },
    {
      title: 'Economic Barriers',
      description: '617 million youth worldwide lack basic mathematics and literacy skills due to economic constraints.',
    },
    {
      title: 'One-Size-Fits-All Approach',
      description: 'Traditional education systems fail to address diverse learning styles, leaving 40% of students underserved.',
    },
  ];

  const stats = [
    {
      value: '2.2 Billion',
      description: 'People worldwide lack internet access, creating a digital divide in educational opportunities.',
    },
    {
      value: '68.8%',
      description: 'Of students in developing regions struggle with basic reading proficiency despite school attendance.',
    },
    {
      value: '$39 Billion',
      description: 'Annual funding gap to provide quality education for all children worldwide.',
    },
  ];

  return (
    <div className="max-container my-20">
      <SectionHeading
        title="Education Inequality: A Global Crisis"
        subtitle="Millions of students worldwide face barriers to quality education, creating a cycle of inequality that affects generations."
        icon={
          <svg className="w-10 h-10 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        }
      />

      {/* Barriers Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center my-12">
        <div className="relative w-full aspect-[3/2]">
          <Image
            src={placeholderImage}
            alt="Students in underserved communities with limited educational resources"
            fill
            className="rounded-lg shadow-lg object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="space-y-6">
          {issues.map((issue) => (
            <div key={issue.title} className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{issue.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{issue.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-8">
        {stats.map((stat) => (
          <div key={stat.value} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{stat.value}</h3>
            <p className="text-gray-600 dark:text-gray-300">{stat.description}</p>
          </div>
        ))}
      </div>

      {/* Solution */}
      <div className="text-center mt-16">
        <div className="inline-block p-1 bg-blue-100 dark:bg-blue-900/50 rounded-full mb-6">
          <svg className="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          The Solution? AI-Powered Personalized Learning
        </h3>
        <p className="text-lg text-gray-600 dark:text-blue-100 max-w-2xl mx-auto">
          We&apos;re bridging educational gaps with technology that adapts to each learner&apos;s unique needs, circumstances, and available resources.
        </p>
      </div>
    </div>
  );
};

export default Problem;