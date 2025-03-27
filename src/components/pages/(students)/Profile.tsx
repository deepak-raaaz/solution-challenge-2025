// components/UserProfile.tsx
'use client';

import { useState } from 'react';

interface UserProfile {
  initials: string;
  name: string;
  title: string;
  level: number;
  xp: number;
  streak: number;
  coursesCompleted: number;
  learningHours: number;
  badgesEarned: number;
  globalRank: string;
  about: string;
  job: string;
  education: string;
  location: string;
  email: string;
  joinDate: string;
}

interface Skill {
  name: string;
  level: string;
  progress: number;
}

interface Certification {
  name: string;
  issuer: string;
}

interface Badge {
  name: string;
  icon: any;
  color: string;
}

interface Activity {
  title: string;
  description: string;
  timestamp: string;
  icon: any;
  tags: { name: string; color: string }[];
}

interface LearningPath {
  title: string;
  description: string;
  progress: number;
  status: string;
  icon: any;
  modules: { name: string; completed: string; color: string }[];
  nextUp: string;
  estimatedTime: string;
  color: string;
}

interface Recommendation {
  title: string;
  description: string;
  reason: string;
  color: string;
  icon: any;
}

// Sample Data
const user: UserProfile = {
  initials: 'JS',
  name: 'Deepak Kumar',
  title: 'deepakjamui26@gmail.com',
  level: 8,
  xp: 3480,
  streak: 5,
  coursesCompleted: 24,
  learningHours: 86,
  badgesEarned: 12,
  globalRank: '#7',
  about: 'Front-end developer passionate about creating intuitive and responsive web experiences. Currently focusing on mastering React and exploring modern JavaScript frameworks.',
  job: 'Junior Developer at TechCorp',
  education: 'Haldia Institute of Technology',
  location: 'Haldia, West Bengal, India',
  email: 'deepakjamui26@gmail.com',
  joinDate: 'Sept 2022',
};

const skills: Skill[] = [
  { name: 'HTML & CSS', level: 'Advanced', progress: 90 },
  { name: 'JavaScript', level: 'Intermediate', progress: 75 },
  { name: 'React', level: 'Intermediate', progress: 65 },
  { name: 'Node.js', level: 'Beginner', progress: 40 },
  { name: 'UI/UX Design', level: 'Intermediate', progress: 70 },
];

const certifications: Certification[] = [
  { name: 'Responsive Web Design', issuer: 'freeCodeCamp' },
  { name: 'JavaScript Algorithms and Data Structures', issuer: 'freeCodeCamp' },
  { name: 'React Developer', issuer: 'Udemy' },
];

const badges: Badge[] = [
  { name: 'Fast Learner', icon: <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>, color: 'blue' },
  { name: 'Problem Solver', icon: <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>, color: 'purple' },
  { name: 'Quick Start', icon: <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>, color: 'green' },
  { name: 'Consistent', icon: <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, color: 'yellow' },
  { name: 'Team Player', icon: <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>, color: 'red' },
  { name: 'Experimenter', icon: <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>, color: 'indigo' },
];

const activities: Activity[] = [
  { title: 'Completed "Advanced React Patterns" course', description: 'You’ve earned a new certification and 350 XP', timestamp: '2 days ago', icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>, tags: [{ name: 'React', color: 'blue' }, { name: 'Frontend', color: 'purple' }] },
  { title: 'Earned "5-Day Streak" badge', description: 'Keep going to increase your streak!', timestamp: '3 days ago', icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>, tags: [{ name: 'Achievement', color: 'green' }, { name: 'Consistency', color: 'yellow' }] },
  { title: 'Started "Node.js Fundamentals" course', description: 'You’re on your way to becoming a full-stack developer', timestamp: '5 days ago', icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>, tags: [{ name: 'Node.js', color: 'green' }, { name: 'Backend', color: 'indigo' }] },
  { title: 'Joined "React Developers" group', description: 'Connect with other React developers to share knowledge', timestamp: '1 week ago', icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>, tags: [{ name: 'React', color: 'blue' }, { name: 'Community', color: 'amber' }] },
];

const learningPaths: LearningPath[] = [
  {
    title: 'React Developer Path',
    description: 'Master modern React with hooks and advanced patterns',
    progress: 75,
    status: 'In Progress',
    icon: <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 13.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"></path><path d="M12 22.5c-5.799 0-10.5-3.224-10.5-7.5S6.201 7.5 12 7.5s10.5 3.224 10.5 7.5-4.701 7.5-10.5 7.5Zm0-13.5c-4.916 0-9 2.686-9 6s4.084 6 9 6 9-2.686 9-6-4.084-6-9-6Z"></path><path d="M19.748 17.67a22.096 22.096 0 0 0 1.252-2.17A22.096 22.096 0 0 0 22.252 12a22.096 22.096 0 0 0-1.252-3.5 22.096 22.096 0 0 0-1.252-2.17A8.728 8.728 0 0 0 16.87 3.748a22.098 22.098 0 0 0-2.169-1.252A22.097 22.097 0 0 0 12 1.5a22.097 22.097 0 0 0-2.7.996 22.096 22.096 0 0 0-2.17 1.252A8.728 8.728 0 0 0 4.748 6.33a22.098 22.098 0 0 0-1.252 2.17A22.096 22.096 0 0 0 2.5 12c0 .925.332 1.85.996 2.7a22.096 22.096 0 0 0 1.252 2.17 8.728 8.728 0 0 0 2.382 2.582 22.099 22.099 0 0 0 2.17 1.252 22.097 22.097 0 0 0 2.7.996c.926 0 1.85-.332 2.7-.996a22.097 22.097 0 0 0 2.17-1.252 8.728 8.728 0 0 0 2.382-2.582ZM4.5 12c0-2.886 3.372-6.328 7.5-7.3 4.128.972 7.5 4.414 7.5 7.3 0 2.886-3.372 6.328-7.5 7.3-4.128-.972-7.5-4.414-7.5-7.3Z"></path></svg>,
    modules: [
      { name: 'Basics', completed: '✓', color: 'green' },
      { name: 'Components', completed: '✓', color: 'green' },
      { name: 'Hooks', completed: '3/5', color: 'blue' },
      { name: 'Context', completed: '0/4', color: 'gray' },
      { name: 'Redux', completed: '0/3', color: 'gray' },
    ],
    nextUp: 'Custom Hooks',
    estimatedTime: '45 min',
    color: 'blue',
  },
  {
    title: 'Node.js Backend Development',
    description: 'Build APIs and server-side applications with Node.js',
    progress: 15,
    status: 'Just Started',
    icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>,
    modules: [
      { name: 'Basics', completed: '1/3', color: 'green' },
      { name: 'Express', completed: '0/4', color: 'gray' },
      { name: 'APIs', completed: '0/3', color: 'gray' },
      { name: 'Database', completed: '0/4', color: 'gray' },
    ],
    nextUp: 'Node.js Event Loop',
    estimatedTime: '30 min',
    color: 'green',
  },
];

const recommendations: Recommendation[] = [
  { title: 'TypeScript Fundamentals', description: 'Add type safety to your JavaScript skills and level up your development workflow.', reason: 'Based on your React progress', color: 'purple', icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg> },
  { title: 'UI/UX Design Principles', description: 'Enhance your frontend skills with essential design principles for better user experiences.', reason: 'Perfect for frontend developers', color: 'blue', icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg> },
  { title: 'MongoDB for Node.js Developers', description: 'Learn how to integrate MongoDB with your Node.js applications for efficient data storage.', reason: 'Complements your Node.js path', color: 'green', icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg> },
  { title: 'Modern CSS Techniques', description: 'Master CSS Grid, Flexbox, and newest CSS features to create responsive layouts.', reason: 'Based on your profile', color: 'amber', icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
];

// Reusable Components
const StatCard: React.FC<{ label: string; value: string | number; icon: any; color: string }> = ({ label, value, icon, color }) => (
  <div className="bg-gray-800/80 rounded-lg p-4 border border-gray-700/40">
    <div className="flex items-center">
      <div className={`bg-${color}-500/20 p-2 rounded-lg mr-3`}>{icon}</div>
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  </div>
);

const SkillProgress: React.FC<Skill> = ({ name, level, progress }) => (
  <div>
    <div className="flex justify-between mb-1">
      <span className="text-gray-300">{name}</span>
      <span className="text-blue-400">{level}</span>
    </div>
    <div className="w-full bg-gray-700 rounded-full h-2">
      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
    </div>
  </div>
);

const BadgeItem: React.FC<Badge> = ({ name, icon, color }) => (
  <div className="flex flex-col items-center">
    <div className={`h-16 w-16 bg-${color}-600/20 rounded-full flex items-center justify-center mb-2 border-2 border-${color}-500/30`}>
      <span className={`text-${color}-400`}>{icon}</span>
    </div>
    <span className="text-xs text-center text-gray-400">{name}</span>
  </div>
);

const ActivityItem: React.FC<Activity> = ({ title, description, timestamp, icon, tags }) => (
  <div className="flex">
    <div className="flex-shrink-0 mr-4">
      <div className={`h-12 w-12 bg-${tags[0].color}-500/20 rounded-xl flex items-center justify-center`}>
        <span className={`text-${tags[0].color}-400`}>{icon}</span>
      </div>
    </div>
    <div className="flex-1">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-white font-medium">{title}</h3>
          <p className="text-gray-400 text-sm mt-1">{description}</p>
        </div>
        <span className="text-gray-500 text-xs">{timestamp}</span>
      </div>
      <div className="mt-3 flex items-center space-x-2">
        {tags.map((tag) => (
          <div key={tag.name} className={`bg-${tag.color}-500/10 px-2 py-1 rounded-lg text-xs text-${tag.color}-400`}>{tag.name}</div>
        ))}
      </div>
    </div>
  </div>
);

const LearningPathCard: React.FC<LearningPath> = ({ title, description, progress, status, icon, modules, nextUp, estimatedTime, color }) => (
  <div className="bg-gray-900/60 rounded-lg border border-gray-700/40 overflow-hidden">
    <div className="p-4 border-b border-gray-700/40">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <div className={`bg-${color}-500/20 p-2 rounded-lg mr-3`}>{icon}</div>
          <div>
            <h3 className="font-semibold text-white">{title}</h3>
            <p className="text-xs text-gray-400">{description}</p>
          </div>
        </div>
        <div className="flex items-center">
          <span className={`text-sm bg-${color}-500/20 px-2 py-0.5 rounded-full text-${color}-400 mr-2`}>{status}</span>
          <span className="text-sm font-medium text-white">{progress}%</span>
        </div>
      </div>
    </div>
    <div className="px-4 py-3">
      <div className="mb-3">
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div className={`h-full bg-${color}-500 rounded-full`} style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      <div className={`grid grid-cols-${modules.length} gap-2`}>
        {modules.map((module) => (
          <div key={module.name} className="text-center">
            <div className={`h-8 w-8 bg-${module.color}-500/20 rounded-full flex items-center justify-center mx-auto`}>
              {module.completed === '✓' ? (
                <svg className={`h-4 w-4 text-${module.color}-400`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              ) : (
                <span className={`text-xs font-medium text-${module.color}-400`}>{module.completed}</span>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-1">{module.name}</p>
          </div>
        ))}
      </div>
    </div>
    <div className="bg-gray-900/80 px-4 py-3 flex justify-between items-center border-t border-gray-700/40">
      <div>
        <p className="text-xs text-gray-400">Next up: <span className="text-white">{nextUp}</span></p>
        <p className={`text-xs text-${color}-400`}>Estimated {estimatedTime} to complete</p>
      </div>
      <button className={`px-3 py-1.5 bg-${color}-600 hover:bg-${color}-700 text-white text-sm font-medium rounded-lg transition`}>Continue</button>
    </div>
  </div>
);

const RecommendationCard: React.FC<Recommendation> = ({ title, description, reason, color, icon }) => (
  <div className="bg-gray-900/60 border border-gray-700/30 rounded-lg p-4 hover:bg-gray-900/80 transition cursor-pointer group">
    <div className="flex items-center mb-3">
      <div className={`h-10 w-10 bg-${color}-600/20 rounded-lg flex items-center justify-center mr-3 group-hover:bg-${color}-600/30 transition`}>
        <span className={`text-${color}-400`}>{icon}</span>
      </div>
      <h4 className="font-medium text-white">{title}</h4>
    </div>
    <p className="text-sm text-gray-400 mb-3">{description}</p>
    <div className="flex justify-between items-center">
      <span className={`text-xs text-${color}-400`}>{reason}</span>
      <button className={`px-2 py-1 bg-${color}-600/20 text-${color}-400 rounded text-xs hover:bg-${color}-600/30 transition`}>Explore</button>
    </div>
  </div>
);

export default function UserProfile() {
  const [activeActivityFilter, setActiveActivityFilter] = useState('All');

  return (
    <section id="userProfile" className=" text-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="bg-gray-800/60 rounded-2xl p-4 sm:p-6 mb-8 border border-gray-700/40 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="relative">
                <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-3xl sm:text-4xl font-bold text-white">
                  {user.initials}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-500 h-6 w-6 rounded-full border-4 border-gray-800"></div>
              </div>
              <div className="ml-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-white">{user.name}</h1>
                <p className="text-gray-400">{user.title}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/40 text-blue-400 border border-blue-800/40">Level {user.level}</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-900/40 text-purple-400 border border-purple-800/40">{user.xp.toLocaleString()} XP</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/40 text-green-400 border border-green-800/40">{user.streak}-day streak</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4 md:mt-0 md:ml-auto">
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                Edit Profile
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-gray-700 rounded-lg shadow-sm text-sm font-medium bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                Share Profile
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-gray-700 rounded-lg shadow-sm text-sm font-medium bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                More
              </button>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-700/40">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard label="Courses Completed" value={user.coursesCompleted} icon={<svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>} color="blue" />
              <StatCard label="Learning Hours" value={user.learningHours} icon={<svg className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} color="purple" />
              <StatCard label="Badges Earned" value={user.badgesEarned} icon={<svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>} color="green" />
              <StatCard label="Global Rank" value={user.globalRank} icon={<svg className="h-6 w-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>} color="amber" />
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* About Card */}
            <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700/40 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <p className="text-gray-300 mb-4">{user.about}</p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  <span className="text-gray-300">{user.job}</span>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                  <span className="text-gray-300">{user.education}</span>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <span className="text-gray-300">{user.location}</span>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  <span className="text-gray-300">{user.email}</span>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <span className="text-gray-300">Joined {user.joinDate}</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-700/40">
                <h3 className="text-md font-medium mb-3">Social Profiles</h3>
                <div className="flex space-x-3">
                  <a href="#" className="bg-gray-700 hover:bg-gray-600 h-10 w-10 rounded-lg flex items-center justify-center transition"><svg className="h-5 w-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" /></svg></a>
                  <a href="#" className="bg-gray-700 hover:bg-gray-600 h-10 w-10 rounded-lg flex items-center justify-center transition"><svg className="h-5 w-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg></a>
                  <a href="#" className="bg-gray-700 hover:bg-gray-600 h-10 w-10 rounded-lg flex items-center justify-center transition"><svg className="h-5 w-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg></a>
                  <a href="#" className="bg-gray-700 hover:bg-gray-600 h-10 w-10 rounded-lg flex items-center justify-center transition"><svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg></a>
                </div>
              </div>
            </div>

            {/* Skills Card */}
            <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700/40 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Skills</h2>
                <button className="text-sm text-blue-400 hover:text-blue-300 transition">Edit</button>
              </div>
              <div className="space-y-4">
                {skills.map((skill) => <SkillProgress key={skill.name} {...skill} />)}
              </div>
              <div className="mt-6">
                <h3 className="text-md font-medium mb-3">Certifications</h3>
                <div className="space-y-3">
                  {certifications.map((cert) => (
                    <div key={cert.name} className="flex items-start">
                      <div className="bg-green-500/20 p-1.5 rounded flex-shrink-0 mt-0.5 mr-3">
                        <svg className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                      </div>
                      <div>
                        <p className="text-gray-300 text-sm font-medium">{cert.name}</p>
                        <p className="text-gray-500 text-xs">{cert.issuer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Badges Card */}
            <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700/40 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Badges</h2>
                <span className="text-sm text-gray-400">{user.badgesEarned} earned</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-4">
                {badges.map((badge) => <BadgeItem key={badge.name} {...badge} />)}
              </div>
              <div className="mt-4 text-center">
                <button className="text-sm text-blue-400 hover:text-blue-300 transition">View All Badges</button>
              </div>
            </div>
          </div>

          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Activity */}
            <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700/40 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Recent Activity</h2>
                <div className="flex space-x-2">
                  {['All', 'Courses', 'Achievements'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveActivityFilter(filter)}
                      className={`px-3 py-1 text-sm rounded-lg transition ${activeActivityFilter === filter ? 'bg-blue-500/10 text-blue-400' : 'bg-transparent text-gray-400 hover:bg-gray-700'}`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                {activities.filter((activity) => activeActivityFilter === 'All' || (activeActivityFilter === 'Courses' && activity.tags.some((tag) => tag.name === 'React' || tag.name === 'Node.js')) || (activeActivityFilter === 'Achievements' && activity.tags.some((tag) => tag.name === 'Achievement'))).map((activity) => <ActivityItem key={activity.title} {...activity} />)}
              </div>
              <div className="mt-6 text-center">
                <button className="text-sm text-blue-400 hover:text-blue-300 transition">View All Activity</button>
              </div>
            </div>

            {/* Current Learning Paths */}
            <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700/40 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Current Learning Paths</h2>
                <button className="text-sm text-blue-400 hover:text-blue-300 transition flex items-center">
                  <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                  Add New Path
                </button>
              </div>
              <div className="space-y-6">
                {learningPaths.map((path) => <LearningPathCard key={path.title} {...path} />)}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700/40 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Recommended For You</h2>
                <button className="text-sm text-gray-400 hover:text-gray-300 transition">Refresh</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendations.map((rec) => <RecommendationCard key={rec.title} {...rec} />)}
              </div>
              <div className="mt-6 text-center">
                <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition">
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                  View Personalized Learning Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}