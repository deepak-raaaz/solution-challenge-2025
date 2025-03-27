// app/learning-roadmap/page.tsx
'use client';

import { useState } from 'react';

interface RoadmapStep {
  id: number;
  title: string;
  description: string;
  level: string;
  status: 'Completed' | 'In Progress' | 'Locked';
  lessons: number | string;
  duration: string;
  tags: string[];
  progress?: number;
}

interface Resource {
  title: string;
  description: string;
  linkText: string;
  link: string;
  icon: React.ReactNode;
}

interface Achievement {
  title: string;
  icon: React.ReactNode;
  earned: boolean;
}

const roadmapSteps: RoadmapStep[] = [
  {
    id: 1,
    title: 'HTML & CSS Fundamentals',
    description: 'Learn the basics of HTML structure and CSS styling to create well-designed web pages.',
    level: 'Beginner Level',
    status: 'Completed',
    lessons: 6,
    duration: '3.5 hours',
    tags: ['HTML5', 'CSS3', 'Responsive Design'],
  },
  {
    id: 2,
    title: 'JavaScript Basics',
    description: 'Master JavaScript fundamentals to create interactive web applications.',
    level: 'Beginner-Intermediate Level',
    status: 'In Progress',
    lessons: 8,
    duration: '5.5 hours',
    tags: ['JavaScript', 'DOM Manipulation', 'Events'],
    progress: 65,
  },
  {
    id: 3,
    title: 'Front-end Frameworks',
    description: 'Learn React, Vue.js, or Angular to build modern, component-based web applications.',
    level: 'Intermediate Level',
    status: 'Locked',
    lessons: 10,
    duration: '7 hours',
    tags: ['React', 'Vue.js', 'State Management'],
  },
  {
    id: 4,
    title: 'Backend Development',
    description: 'Explore server-side programming with Node.js, Express, and databases.',
    level: 'Intermediate-Advanced Level',
    status: 'Locked',
    lessons: 12,
    duration: '8 hours',
    tags: ['Node.js', 'Express', 'MongoDB'],
  },
  {
    id: 5,
    title: 'Full-Stack Project',
    description: 'Build a complete web application from scratch, showcasing all your acquired skills.',
    level: 'Advanced Level',
    status: 'Locked',
    lessons: 'Final project',
    duration: 'Capstone',
    tags: ['Authentication', 'API Integration', 'Deployment'],
  },
];

const resources: Resource[] = [
  {
    title: 'JavaScript Cheatsheet',
    description: 'Quick reference guide for common JavaScript methods and syntax',
    linkText: 'Download PDF',
    link: '#',
    icon: <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>,
  },
  {
    title: 'Tutorial Videos',
    description: 'Supplementary video explanations for complex concepts',
    linkText: 'View Library',
    link: '#',
    icon: <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" /></svg>,
  },
  {
    title: 'Practice Exercises',
    description: 'Hands-on coding challenges to reinforce learning',
    linkText: 'Start Practicing',
    link: '#',
    icon: <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" /></svg>,
  },
  {
    title: 'Discussion Forum',
    description: 'Connect with peers and mentors for help and collaboration',
    linkText: 'Join Discussion',
    link: '#',
    icon: <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" /><path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" /></svg>,
  },
];

const achievements: Achievement[] = [
  {
    title: 'Fast Learner',
    icon: <svg className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" /></svg>,
    earned: true,
  },
  {
    title: 'HTML Pro',
    icon: <svg className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>,
    earned: true,
  },
  {
    title: 'JS Ninja',
    icon: <svg className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" /></svg>,
    earned: false,
  },
];

const RoadmapStepCard: React.FC<{ step: RoadmapStep; isLast: boolean }> = ({ step, isLast }) => (
  <div className="relative">
    <div className="flex">
      <div className="flex flex-col items-center mr-4">
        <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-gray-800 text-lg font-bold ${
          step.status === 'Completed' ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' :
          step.status === 'In Progress' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' :
          'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
        }`}>
          {step.id}
        </div>
        {!isLast && <div className="w-px h-full bg-gray-300 dark:bg-gray-600 mt-2" />}
      </div>
      <div className={`bg-white dark:bg-gray-700 rounded-lg shadow-sm p-5 border border-gray-200/30 dark:border-gray-600/30 flex-1 ${step.status === 'Locked' ? 'opacity-75' : ''}`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{step.title}</h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{step.level}</p>
          </div>
          <div className={`text-xs px-2.5 py-1 rounded-full ${
            step.status === 'Completed' ? 'bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-400' :
            step.status === 'In Progress' ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-400' :
            'bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-300'
          }`}>
            {step.status}
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{step.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {step.tags.map((tag) => (
            <span key={tag} className="px-2.5 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-400 rounded-full">{tag}</span>
          ))}
        </div>
        {step.progress && (
          <div className="mb-3">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{step.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${step.progress}%` }} />
            </div>
          </div>
        )}
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <span className="font-medium text-gray-900 dark:text-white">{step.lessons} lessons</span> · {step.duration}
          </div>
          <button className={`px-3 py-1.5 text-sm rounded-lg transition flex items-center ${
            step.status === 'Completed' ? 'bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-500' :
            step.status === 'In Progress' ? 'bg-blue-600 text-white hover:bg-blue-700' :
            'bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 cursor-not-allowed'
          }`} disabled={step.status === 'Locked'}>
            {step.status === 'Completed' && (
              <>
                <svg className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" /></svg>
                Review
              </>
            )}
            {step.status === 'In Progress' && (
              <>
                <svg className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                Continue
              </>
            )}
            {step.status === 'Locked' && (
              <>
                <svg className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                Unlock
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default function LearningRoadmap() {
  const [mentorMessage, setMentorMessage] = useState('');

  const handleMentorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle AI mentor message submission here
    console.log('Mentor message:', mentorMessage);
    setMentorMessage('');
  };

  return (
    <section className="py-12 md:py-16 ">
      <div className="container mx-auto px-4">
        <div className="mb-8 lg:mb-12">
          <div className="flex items-center gap-4 mb-6">
            <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Web Development Learning Roadmap</h2>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
            <div className="flex items-center">
              <img src="https://placehold.co/40x40" alt="Mentor Avatar" className="h-10 w-10 rounded-full mr-3 border-2 border-white dark:border-gray-800" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Sarah Johnson</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Certified Web Development Mentor</p>
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 ml-0 md:ml-auto">
              <div className="flex items-center mr-4">
                <svg className="h-5 w-5 mr-1 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>4.8 (324 ratings)</span>
              </div>
              <div className="flex items-center mr-4">
                <svg className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                <span>15.2K students</span>
              </div>
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>24 hours total</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            {/* Roadmap Ladder */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 md:p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Your Learning Path</h3>
              <div className="space-y-8">
                {roadmapSteps.map((step, index) => (
                  <RoadmapStepCard key={step.id} step={step} isLast={index === roadmapSteps.length - 1} />
                ))}
              </div>
            </div>

            {/* Test Your Knowledge */}
            <div className="bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800/30 rounded-xl p-6 md:p-8 mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Ready to test your JavaScript knowledge?</h3>
                  <p className="text-gray-600 dark:text-gray-300">Take a quick assessment to measure your understanding and get personalized recommendations.</p>
                </div>
                <button className="flex-shrink-0 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition flex items-center justify-center">
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  Take Test Now
                </button>
              </div>
            </div>

            {/* Course Resources */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 md:p-8 border border-gray-200/30 dark:border-gray-700/30">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Course Resources</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resources.map((resource) => (
                  <div key={resource.title} className="flex items-start p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/70 text-indigo-600 dark:text-indigo-400 mr-4 flex-shrink-0">
                      {resource.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{resource.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{resource.description}</p>
                      <a href={resource.link} className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:text-indigo-700 dark:hover:text-indigo-300">
                        {resource.linkText}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* AI Mentor */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200/30 dark:border-gray-700/30 mb-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mr-3">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">AI Mentor</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Your personal learning assistant</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-3">
                  <p className="text-sm text-gray-600 dark:text-gray-300">I notice you&apos;re making good progress with JavaScript! Would you like help with any specific concepts?</p>
                  <div className="text-right text-xs text-gray-500 dark:text-gray-400 mt-1">2 hours ago</div>
                </div>
              </div>
              <form onSubmit={handleMentorSubmit} className="flex">
                <input
                  type="text"
                  placeholder="Ask your AI mentor a question..."
                  value={mentorMessage}
                  onChange={(e) => setMentorMessage(e.target.value)}
                  className="flex-1 rounded-l-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600"
                />
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-r-lg px-4 transition">
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </form>
            </div>

            {/* Progress Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200/30 dark:border-gray-700/30 mb-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Your Progress Stats</h3>
              <div className="mb-5">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Overall Course Progress</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">32%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                  <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '32%' }} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">14/36</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Lessons Completed</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">9</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Hours Spent</div>
                </div>
              </div>
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Recent Activity</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                    <p className="text-gray-600 dark:text-gray-300">Completed DOM Manipulation lesson</p>
                    <span className="ml-auto text-gray-500 dark:text-gray-400 text-xs">2h ago</span>
                  </div>
                  <div className="flex items-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                    <p className="text-gray-600 dark:text-gray-300">Earned &apos;JS Fundamentals&apos; badge</p>
                    <span className="ml-auto text-gray-500 dark:text-gray-400 text-xs">1d ago</span>
                  </div>
                </div>
              </div>
              <a href="#" className="block text-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium text-sm">
                View Complete History
              </a>
            </div>

            {/* Join Discussion Group */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white mb-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
              <div className="relative z-10">
                <h3 className="font-bold text-xl mb-2">Join Discussion Group</h3>
                <p className="text-purple-100 mb-4 text-sm">Connect with 326 peers learning JavaScript. Ask questions and share your progress!</p>
                <button className="bg-white text-purple-700 hover:bg-purple-50 px-4 py-2 rounded-lg text-sm font-medium transition">
                  Join Now
                </button>
              </div>
            </div>

            {/* Learning Achievements */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200/30 dark:border-gray-700/30">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Your Achievements</h3>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {achievements.map((achievement) => (
                  <div key={achievement.title} className={`flex flex-col items-center ${!achievement.earned ? 'opacity-50' : ''}`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-1 ${
                      achievement.earned 
                        ? achievement.title === 'Fast Learner' 
                          ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-500' 
                          : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-500'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                    }`}>
                      {achievement.icon}
                    </div>
                    <span className="text-xs text-gray-700 dark:text-gray-300 text-center">{achievement.title}</span>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 text-sm px-3 py-1 rounded-full mb-2">
                  <svg className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Level 3 Student
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Complete more lessons to unlock additional achievements!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}