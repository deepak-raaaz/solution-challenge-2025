// components/Features.tsx
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import SectionHeading from '@/components/shared/SectionHeading';

const Features: FC = () => {
  const platformFeatures = [
    {
      title: 'AI Learning Pathways',
      description: 'Personalized learning journeys that adapt to your pace, preferences, and progress in real-time.',
      iconColor: 'text-blue-500 dark:text-blue-400',
      bgColor: 'bg-blue-100/50 dark:bg-blue-900/20',
      iconPath: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
      subItems: ['Skill gap analysis', 'Personalized progression', 'Learning style matching'],
    },
    {
      title: 'Real-time Assessment',
      description: 'Instant feedback and adaptive assessments that identify strengths and areas for improvement.',
      iconColor: 'text-purple-500 dark:text-purple-400',
      bgColor: 'bg-purple-100/50 dark:bg-purple-900/20',
      iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      subItems: ['Continuous evaluation', 'Targeted improvement suggestions', 'Progress visualization'],
    },
    {
      title: 'Multilingual Support',
      description: 'Content available in 100+ languages with culturally appropriate materials for global learners.',
      iconColor: 'text-pink-500 dark:text-pink-400',
      bgColor: 'bg-pink-100/50 dark:bg-pink-900/20',
      iconPath: 'M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129',
      subItems: ['Native language learning', 'Cultural context adaptation', 'Inclusive representation'],
    },
    {
      title: 'Offline Accessibility',
      description: 'Learn anywhere with downloadable content and SMS-based modules for limited connectivity areas.',
      iconColor: 'text-indigo-500 dark:text-indigo-400',
      bgColor: 'bg-indigo-100/50 dark:bg-indigo-900/20',
      iconPath: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
      subItems: ['Downloadable lessons', 'SMS-based learning', 'Low bandwidth optimization'],
    },
    {
      title: 'AI Mentorship',
      description: '24/7 guidance from AI chatbots combined with human mentor support for complex topics.',
      iconColor: 'text-blue-500 dark:text-blue-400',
      bgColor: 'bg-blue-100/50 dark:bg-blue-900/20',
      iconPath: 'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z',
      subItems: ['Immediate assistance', 'Personalized guidance', 'Expert human backup'],
    },
    {
      title: 'Course Marketplace',
      description: 'Access certified premium courses from verified educators at minimal cost.',
      iconColor: 'text-purple-500 dark:text-purple-400',
      bgColor: 'bg-purple-100/50 dark:bg-purple-900/20',
      iconPath: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
      subItems: ['Quality-verified content', 'Affordable pricing', 'Completion certificates'],
    },
  ];

  const educatorFeatures = [
    {
      title: 'Custom Learning Roadmaps',
      description: 'Create and share your own curriculum tailored to specific subjects and learning goals.',
      iconColor: 'text-blue-500 dark:text-blue-400',
      bgColor: 'bg-blue-100/50 dark:bg-blue-900/20',
      iconPath: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4',
    },
    {
      title: 'Analytics Dashboard',
      description: 'Track student progress, identify common challenges, and adjust your teaching accordingly.',
      iconColor: 'text-purple-500 dark:text-purple-400',
      bgColor: 'bg-purple-100/50 dark:bg-purple-900/20',
      iconPath: 'M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z',
    },
    {
      title: 'Revenue Generation',
      description: 'Earn income by offering premium courses through our affordable marketplace system.',
      iconColor: 'text-pink-500 dark:text-pink-400',
      bgColor: 'bg-pink-100/50 dark:bg-pink-900/20',
      iconPath: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    },
  ];

  return (
    <div className="max-container myy-24">
      <SectionHeading
        title="Powerful Platform Features"
        subtitle="We're committed to making education accessible to all."
        icon={
          <svg className="w-10 h-10 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        }
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 my-10">
        {platformFeatures.map((feature) => (
          <div
            key={feature.title}
            className="bg-white dark:bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl dark:shadow-gray-900/30 transform hover:scale-[1.02] transition-all duration-300"
          >
            <div className={`w-14 h-14 ${feature.bgColor} rounded-xl flex items-center justify-center mb-6`}>
              <svg className={`w-8 h-8 ${feature.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.iconPath} />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">{feature.description}</p>
            <ul className="space-y-3">
              {feature.subItems.map((item) => (
                <li key={item} className="flex items-center text-gray-600 dark:text-gray-300">
                  <svg className={`w-6 h-6 mr-3 ${feature.iconColor}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Educator Features */}
      <div className="bg-white mt-16 dark:bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-lg dark:shadow-gray-900/30">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">For Educators</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Empower your teaching with our platform&apos;s tools designed specifically for educators.</p>
            <div className="space-y-4">
              {educatorFeatures.map((feature) => (
                <div key={feature.title} className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className={`w-8 h-8 ${feature.bgColor} rounded-full flex items-center justify-center`}>
                      <svg className={`w-4 h-4 ${feature.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.iconPath} />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{feature.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link href="#cta" className="inline-flex items-center text-blue-500 dark:text-blue-400 font-medium hover:text-blue-600 dark:hover:text-blue-300 transition-colors">
                Join as an educator
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="relative w-full aspect-[3/2]">
            <Image
              src="/images/educator-dash.png"
              alt="Educator using the platform dashboard to create custom learning roadmaps"
              fill
              className="rounded-lg object-cover shadow-l aspect-video"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;