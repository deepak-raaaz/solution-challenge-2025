// components/Solution.tsx
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

const Solution: FC = () => {
  const features = [
    {
      title: 'Adaptive Learning Paths',
      description: 'Our AI analyzes your learning style, pace, and knowledge gaps to create customized learning journeys.',
      iconColor: 'text-blue-500 dark:text-blue-400',
      bgColor: 'bg-blue-100/50 dark:bg-blue-900/20',
      iconPath: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    },
    {
      title: 'Real-time Feedback',
      description: 'Receive instant assessment and adaptive guidance as you progress through your learning modules.',
      iconColor: 'text-purple-500 dark:text-purple-400',
      bgColor: 'bg-purple-100/50 dark:bg-purple-900/20',
      iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    {
      title: 'Multilingual Support',
      description: 'Access content in 100+ languages with culturally inclusive materials for learners worldwide.',
      iconColor: 'text-pink-500 dark:text-pink-400',
      bgColor: 'bg-pink-100/50 dark:bg-pink-900/20',
      iconPath: 'M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129',
    },
    {
      title: 'Offline Accessibility',
      description: 'Downloadable content and SMS-based learning for areas with limited internet connectivity.',
      iconColor: 'text-indigo-500 dark:text-indigo-400',
      bgColor: 'bg-indigo-100/50 dark:bg-indigo-900/20',
      iconPath: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
    },
  ];

  const benefits = [
    {
      title: 'Structured Learning Roadmaps',
      description: 'Curated, mentor-approved learning paths for various subjects and skill levels.',
      iconColor: 'text-blue-500 dark:text-blue-400',
      bgColor: 'bg-blue-100/50 dark:bg-blue-900/20',
      iconPath: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
    },
    {
      title: 'AI Chatbot & Mentorship',
      description: '24/7 guidance from AI assistants plus human mentor support for complex topics.',
      iconColor: 'text-purple-500 dark:text-purple-400',
      bgColor: 'bg-purple-100/50 dark:bg-purple-900/20',
      iconPath: 'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z'
    },
    {
      title: 'Educator Content Creation',
      description: 'Tools for teachers to create and share custom learning roadmaps and materials.',
      iconColor: 'text-pink-500 dark:text-pink-400',
      bgColor: 'bg-pink-100/50 dark:bg-pink-900/20',
      iconPath: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
    },
    {
      title: 'Affordable Course Marketplace',
      description: 'Premium certified courses from verified educators at minimal cost.',
      iconColor: 'text-indigo-500 dark:text-indigo-400',
      bgColor: 'bg-indigo-100/50 dark:bg-indigo-900/20',
      iconPath: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
    },
    {
      title: 'Quality Assurance',
      description: 'All content is reviewed by subject matter experts to ensure accuracy and effectiveness.',
      iconColor: 'text-blue-500 dark:text-blue-400',
      bgColor: 'bg-blue-100/50 dark:bg-blue-900/20',
      iconPath: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
    },
    {
      title: 'Customizable Learning',
      description: 'Tailor your educational experience based on goals, time availability, and preferred learning style.',
      iconColor: 'text-purple-500 dark:text-purple-400',
      bgColor: 'bg-purple-100/50 dark:bg-purple-900/20',
      iconPath: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
    },
  ];

  const barriers = [
    'Works on low-bandwidth connections',
    'Accessible on basic mobile devices',
    'SMS-based learning for offline areas',
    'Culturally appropriate content',
    'Affordable pricing structure',
  ];

  return (
    <section id="solution" className="py-20 ">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block p-2 bg-blue-100/50 dark:bg-blue-900/20 rounded-full mb-4">
            <svg className="w-8 h-8 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-b from-blue-400 to-blue-600 font-pp-neue-montreal bg-clip-text text-transparent">
            Our Revolutionary Solution
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            We&apos;ve created a comprehensive AI-powered platform that adapts to each learner&apos;s unique needs while ensuring accessibility for all.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative w-full aspect-[3/2]">
            <Image
              src="https://placehold.co/600x400.png/4361EE/FFFFFF?text=AI+Learning+Solution"
              alt="AI personalized learning platform interface showing adaptive learning path"
              fill
              className="rounded-lg shadow-lg object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">AI-Driven Personalized Learning</h3>
            <div className="space-y-6">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className={`w-10 h-10 ${feature.bgColor} rounded-full flex items-center justify-center`}>
                      <svg className={`w-5 h-5 ${feature.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.iconPath} />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{feature.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {benefits.map((benefit) => (
            <div key={benefit.title} className={`bg-white dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg shadow-lg dark:shadow-gray-900/30`}>
              <div className={`w-12 h-12 ${benefit.bgColor} rounded-full flex items-center justify-center mb-4`}>
                <svg className={`w-6 h-6 ${benefit.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={benefit.iconPath} />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Barriers */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 rounded-xl p-8 shadow-lg">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">Breaking Down Barriers to Education</h3>
              <p className="mb-6 text-white/90">
                We&apos;re breaking down barriers to education with our innovative AI-powered platform.
              </p>
              <ul className="space-y-3">
                {barriers.map((barrier) => (
                  <li key={barrier} className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-white/80" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-white/90">{barrier}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative w-full aspect-[5/3]">
              <Image
                src="https://placehold.co/500x300.png/4361EE/FFFFFF?text=Global+Learning+Access"
                alt="Diverse students accessing education on various devices worldwide"
                fill
                className="rounded-lg object-cover shadow-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link 
            href="#how-it-works" 
            className="inline-flex items-center text-blue-500 dark:text-blue-400 font-medium hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
          >
            See how it works
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Solution;