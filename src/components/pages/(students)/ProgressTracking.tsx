// app/progress-tracking/page.tsx
'use client';

import { useState } from 'react';

interface UserStats {
  name: string;
  track: string;
  level: number;
  badges: number;
  completed: number;
  inProgress: number;
  activeTracks: string[];
}

interface LearningPath {
  title: string;
  description: string;
  progress: number;
  status: 'In Progress' | 'Completed' | 'Not Started';
  icon: any;
  color: string;
  milestones: { name: string; completed: number; total: number }[];
  nextStep: { title: string; duration: string };
}

interface Recommendation {
  title: string;
  description: string;
  icon: any;
  color: string;
  reward: string;
  action: string;
}

const userStats: UserStats = {
  name: 'John Smith',
  track: 'Web Development',
  level: 7,
  badges: 12,
  completed: 24,
  inProgress: 3,
  activeTracks: ['JS', 'ML', 'BC'],
};

const learningPaths: LearningPath[] = [
  {
    title: 'React Developer Path',
    description: 'Advance your front-end skills with React',
    progress: 75,
    status: 'In Progress',
    icon: (
      <svg className="h-6 w-6 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 13.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />
        <path d="M12 22.5c-5.799 0-10.5-3.224-10.5-7.5S6.201 7.5 12 7.5s10.5 3.224 10.5 7.5-4.701 7.5-10.5 7.5Zm0-13.5c-4.916 0-9 2.686-9 6s4.084 6 9 6 9-2.686 9-6-4.084-6-9-6Z" />
        <path d="M19.748 17.67a22.096 22.096 0 0 0 1.252-2.17A22.096 22.096 0 0 0 22.252 12a22.096 22.096 0 0 0-1.252-3.5 22.096 22.096 0 0 0-1.252-2.17A8.728 8.728 0 0 0 16.87 3.748a22.098 22.098 0 0 0-2.169-1.252A22.097 22.097 0 0 0 12 1.5a22.097 22.097 0 0 0-2.7.996 22.096 22.096 0 0 0-2.17 1.252A8.728 8.728 0 0 0 4.748 6.33a22.098 22.098 0 0 0-1.252 2.17A22.096 22.096 0 0 0 2.5 12c0 .925.332 1.85.996 2.7a22.096 22.096 0 0 0 1.252 2.17 8.728 8.728 0 0 0 2.382 2.582 22.099 22.099 0 0 0 2.17 1.252 22.097 22.097 0 0 0 2.7.996c.926 0 1.85-.332 2.7-.996a22.097 22.097 0 0 0 2.17-1.252 8.728 8.728 0 0 0 2.382-2.582ZM4.5 12c0-2.886 3.372-6.328 7.5-7.3 4.128.972 7.5 4.414 7.5 7.3 0 2.886-3.372 6.328-7.5 7.3-4.128-.972-7.5-4.414-7.5-7.3Z" />
      </svg>
    ),
    color: 'blue',
    milestones: [
      { name: 'Basics', completed: 5, total: 5 },
      { name: 'Components', completed: 4, total: 4 },
      { name: 'State', completed: 3, total: 5 },
      { name: 'APIs', completed: 0, total: 4 },
    ],
    nextStep: { title: 'Working with React Hooks', duration: '45 minutes' },
  },
  {
    title: 'Python ML Foundations',
    description: 'Build machine learning expertise with Python',
    progress: 32,
    status: 'In Progress',
    icon: (
      <svg className="h-6 w-6 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.07 14.88a2.1 2.1 0 0 1 2.67-1.99 2.1 2.1 0 0 1 1.47 1.94 2.1 2.1 0 0 1-1.37 2 2.1 2.1 0 0 1-2.76-1.84l-9.97-4-.1 13.05 3.39-3.39 3.38 6.77L24 21.35l-3.38-6.76L24 11.2l-4.93-1.33Zm-15.61 2.08a2.1 2.1 0 0 1-2.26-2.42 2.1 2.1 0 0 1 1.7-1.76 2.1 2.1 0 0 1 2.32 1.15 2.1 2.1 0 0 1-.85 2.86l9.97 4 .1-13.05-3.39 3.39-3.38-6.77L.48 11.44l3.38 6.76L.48 21.59l4.93 1.33-3.95-6.96Z" />
      </svg>
    ),
    color: 'purple',
    milestones: [
      { name: 'Python', completed: 5, total: 5 },
      { name: 'NumPy', completed: 2, total: 6 },
      { name: 'Pandas', completed: 0, total: 5 },
      { name: 'Scikit', completed: 0, total: 4 },
      { name: 'Models', completed: 0, total: 6 },
    ],
    nextStep: { title: 'Array Operations with NumPy', duration: '1 hour' },
  },
];

const recommendations: Recommendation[] = [
  {
    title: 'Complete React Quiz',
    description: 'Test your knowledge on React components and state management',
    icon: <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    color: 'blue',
    reward: 'Earn up to 150 XP',
    action: 'Take Quiz',
  },
  {
    title: 'Practice Project: Todo App',
    description: 'Apply React skills by building a practical todo application',
    icon: <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>,
    color: 'green',
    reward: 'Earn up to 300 XP',
    action: 'Start Project',
  },
  {
    title: 'Join ML Study Group',
    description: 'Connect with peers learning Machine Learning fundamentals',
    icon: <svg className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
    color: 'purple',
    reward: '32 members active',
    action: 'Join Group',
  },
  {
    title: 'Try New AI Learning Path',
    description: 'Our AI suggests this path based on your learning patterns',
    icon: <svg className="h-6 w-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
    color: 'amber',
    reward: '92% match to your interests',
    action: 'Explore',
  },
];

// Reusable Components
const StatCard: React.FC<{ icon: any; label: string; value: number | string; color: string }> = ({ icon, label, value, color }) => (
  <div className="bg-gray-900/60 rounded-lg p-3 border border-gray-700/30">
    <p className="text-xs text-gray-400">{label}</p>
    <div className="flex items-center mt-1">
      <span className={`h-5 w-5 text-${color}-500 mr-1`}>{icon}</span>
      <span className="text-lg font-bold text-white">{value}</span>
    </div>
  </div>
);

const LearningPathCard: React.FC<{ path: LearningPath }> = ({ path }) => (
  <div className="bg-gray-900/60 rounded-lg border border-gray-700/30 overflow-hidden">
    <div className="p-4 border-b border-gray-700/30">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          {path.icon}
          <div className="ml-3">
            <h4 className="font-semibold text-white">{path.title}</h4>
            <p className="text-xs text-gray-400">{path.description}</p>
          </div>
        </div>
        <div className="flex items-center">
          <span className={`text-sm text-white bg-${path.color}-500/20 px-2 py-0.5 rounded-full mr-2`}>{path.status}</span>
          <span className="text-sm font-medium text-white">{path.progress}%</span>
        </div>
      </div>
    </div>
    <div className="px-4 py-3">
      <div className="mb-3">
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div className={`h-full bg-${path.color}-500 rounded-full`} style={{ width: `${path.progress}%` }} />
        </div>
      </div>
      <div className={`grid grid-cols-${path.milestones.length} gap-2`}>
        {path.milestones.map((milestone) => (
          <div key={milestone.name} className="text-center">
            <div className={`h-10 w-10 ${milestone.completed === milestone.total ? 'bg-green-500/20' : milestone.completed > 0 ? `bg-${path.color}-500/20` : 'bg-gray-700'} rounded-full flex items-center justify-center mx-auto`}>
              {milestone.completed === milestone.total ? (
                <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <span className={`text-sm font-medium ${milestone.completed > 0 ? `text-${path.color}-400` : 'text-gray-400'}`}>
                  {milestone.completed}/{milestone.total}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-1">{milestone.name}</p>
          </div>
        ))}
      </div>
    </div>
    <div className="bg-gray-900/80 px-4 py-3 flex justify-between items-center">
      <div>
        <p className="text-xs text-gray-400">Next up: <span className="text-white">{path.nextStep.title}</span></p>
        <p className={`text-xs text-${path.color}-400`}>Estimated {path.nextStep.duration} to complete</p>
      </div>
      <button className={`px-3 py-1.5 bg-${path.color}-600 hover:bg-${path.color}-700 text-white text-sm font-medium rounded-lg transition`}>
        Continue
      </button>
    </div>
  </div>
);

const RecommendationCard: React.FC<{ rec: Recommendation }> = ({ rec }) => (
  <div className="bg-gray-900/60 border border-gray-700/30 rounded-lg p-4 hover:bg-gray-900/80 transition cursor-pointer">
    <div className="flex items-center mb-3">
      <div className={`h-10 w-10 bg-${rec.color}-600/20 rounded-lg flex items-center justify-center mr-3`}>{rec.icon}</div>
      <h4 className="font-medium text-white">{rec.title}</h4>
    </div>
    <p className="text-sm text-gray-400 mb-3">{rec.description}</p>
    <div className="flex justify-between items-center">
      <span className={`text-xs text-${rec.color === 'purple' ? 'gray' : rec.color}-400`}>{rec.reward}</span>
      <button className={`px-2 py-1 bg-${rec.color}-600/20 text-${rec.color}-400 rounded text-xs hover:bg-${rec.color}-600/30 transition`}>
        {rec.action}
      </button>
    </div>
  </div>
);

export default function ProgressTracking() {
  const [timeFilter, setTimeFilter] = useState<'Week' | 'Month' | 'All Time'>('Week');

  const weeklyActivity = [
    { day: 'Mon', hours: 2.1, height: '70%' },
    { day: 'Tue', hours: 1.5, height: '45%' },
    { day: 'Wed', hours: 1.0, height: '30%' },
    { day: 'Thu', hours: 2.9, height: '85%' },
    { day: 'Fri', hours: 1.8, height: '60%' },
    { day: 'Sat', hours: 3.5, height: '100%' },
    { day: 'Sun', hours: 2.7, height: '80%' },
  ];

  return (
    <section className="bg-gradient-to-b from-gray-900 to-gray-950 text-white py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
            Your Learning Journey
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Track your progress, visualize your growth, and achieve your learning goals with our comprehensive analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-gray-800/70 rounded-xl border border-gray-700/40 p-6 shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">JS</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{userStats.name}</h3>
                  <p className="text-gray-400">{userStats.track} Track</p>
                  <div className="flex items-center mt-1">
                    <div className="flex -space-x-1">
                      {userStats.activeTracks.map((track, index) => (
                        <span
                          key={track}
                          className={`inline-flex h-5 w-5 items-center justify-center rounded-full bg-${
                            ['blue', 'teal', 'purple'][index]
                          }-600 text-xs font-medium text-white ring-2 ring-gray-800`}
                        >
                          {track}
                        </span>
                      ))}
                    </div>
                    <span className="ml-2 text-xs text-gray-400">{userStats.activeTracks.length} tracks active</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <StatCard
                  icon={<svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>}
                  label="Current Level"
                  value={userStats.level}
                  color="yellow"
                />
                <StatCard
                  icon={<svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>}
                  label="Badges"
                  value={userStats.badges}
                  color="blue"
                />
                <StatCard
                  icon={<svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>}
                  label="Completed"
                  value={userStats.completed}
                  color="green"
                />
                <StatCard
                  icon={<svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>}
                  label="In Progress"
                  value={userStats.inProgress}
                  color="orange"
                />
              </div>
            </div>

            {/* Weekly Activity */}
            <div className="bg-gray-800/70 rounded-xl border border-gray-700/40 p-6 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-white">Weekly Activity</h3>
                <span className="text-xs text-teal-400 bg-teal-900/30 px-2 py-1 rounded-full">+12% from last week</span>
              </div>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {weeklyActivity.map((activity) => (
                  <div key={activity.day} className="text-center">
                    <div className="text-xs text-gray-500 mb-1">{activity.day}</div>
                    <div className="h-24 bg-gray-900/60 rounded-lg relative overflow-hidden border border-gray-700/30">
                      <div className="absolute bottom-0 w-full bg-blue-500/70 rounded-b-lg" style={{ height: activity.height }} />
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{activity.hours}h</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-gray-400">
                  Weekly Total: <span className="text-white font-medium">15.5 hours</span>
                </div>
                <button className="text-xs text-teal-400 hover:text-teal-300 transition">View Details</button>
              </div>
            </div>

            {/* Leaderboard */}
            <div className="bg-gray-800/70 rounded-xl border border-gray-700/40 p-6 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-white">Leaderboard</h3>
                <span className="text-xs text-gray-400">{userStats.track} Track</span>
              </div>
              <div className="space-y-3">
                {[
                  { rank: 1, name: 'You', xp: 2450, isUser: true },
                  { rank: 2, name: 'Alex Johnson', xp: 2350 },
                  { rank: 3, name: 'Sophie Chen', xp: 2125 },
                  { rank: 4, name: 'Marcus Lee', xp: 1920 },
                  { rank: 5, name: 'Priya Sharma', xp: 1785 },
                ].map((entry) => (
                  <div
                    key={entry.rank}
                    className={`flex items-center p-2 ${entry.isUser ? 'bg-blue-600/20 border-blue-500/20' : 'bg-gray-900/60 border-gray-700/30'} rounded-lg border`}
                  >
                    <div className={`w-8 h-8 rounded-full ${entry.isUser ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-700'} flex items-center justify-center mr-3`}>
                      <span className="text-xs font-bold text-white">{entry.rank}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-white">{entry.name}</span>
                        <span className={`text-sm ${entry.isUser ? 'font-semibold text-blue-400' : 'text-gray-400'}`}>
                          {entry.xp.toLocaleString()} XP
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                        <div
                          className={`h-1.5 ${entry.isUser ? 'bg-gradient-to-r from-blue-500 to-teal-400' : 'bg-gray-500'} rounded-full`}
                          style={{ width: `${(entry.xp / 2450) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 px-4 bg-gray-700 hover:bg-gray-600 text-sm font-medium rounded-lg transition text-white">
                View Full Leaderboard
              </button>
            </div>
          </div>

          {/* Right Column - Progress */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overall Progress */}
            <div className="bg-gray-800/70 rounded-xl border border-gray-700/40 p-6 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">Your Learning Progress</h3>
                <div className="flex space-x-2">
                  {['Week', 'Month', 'All Time'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setTimeFilter(filter as 'Week' | 'Month' | 'All Time')}
                      className={`py-1 px-3 text-sm ${timeFilter === filter ? 'bg-teal-500/10 text-teal-400' : 'bg-transparent text-gray-400'} rounded-lg hover:bg-teal-500/20 transition`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-5">
                {[
                  { title: 'Web Development', progress: 68, color: 'blue', milestones: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'Database', 'Deployment'], primary: true },
                  { title: 'Machine Learning', progress: 32, color: 'purple', milestones: ['Python', 'Data Analysis', 'Algorithms', 'Neural Networks', 'Deep Learning'] },
                  { title: 'Blockchain', progress: 12, color: 'amber', milestones: ['Basics', 'Smart Contracts', 'Ethereum', 'DApps', 'Web3'] },
                ].map((track) => (
                  <div key={track.title}>
                    <div className="flex justify-between mb-2">
                      <div>
                        <span className="text-white font-medium">{track.title}</span>
                        {track.primary && <span className="ml-2 text-xs bg-blue-900/40 text-blue-400 px-2 py-0.5 rounded-full">Primary</span>}
                      </div>
                      <span className="text-sm text-gray-400">{track.progress}% Complete</span>
                    </div>
                    <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r from-${track.color}-500 to-${track.color === 'blue' ? 'teal' : track.color === 'purple' ? 'pink' : 'orange'}-400 rounded-full`}
                        style={{ width: `${track.progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                      {track.milestones.map((m) => (
                        <span key={m}>{m}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 border-t border-gray-700/40 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-medium text-white">Recent Achievements</h4>
                  <button className="text-xs text-teal-400 hover:text-teal-300 transition">View All</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: 'JavaScript Master', desc: 'Completed Advanced JavaScript course', xp: 350, time: '2 days ago', color: 'blue' },
                    { title: 'Team Player', desc: 'Helped 10 students in discussion forums', xp: 200, time: '5 days ago', color: 'teal' },
                  ].map((ach) => (
                    <div key={ach.title} className="bg-gray-900/60 rounded-lg p-4 border border-gray-700/30 flex items-center">
                      <div className={`h-12 w-12 bg-${ach.color}-600/20 flex items-center justify-center mr-4 rounded-full`}>
                        <svg className={`h-6 w-6 text-${ach.color}-400`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="font-medium text-white">{ach.title}</h5>
                        <p className="text-xs text-gray-400">{ach.desc}</p>
                        <p className={`text-xs text-${ach.color}-400 mt-1`}>+{ach.xp} XP • {ach.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Learning Paths */}
            <div className="bg-gray-800/70 rounded-xl border border-gray-700/40 p-6 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">Current Learning Paths</h3>
                <button className="text-sm text-teal-400 hover:text-teal-300 transition flex items-center">
                  <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add New Path
                </button>
              </div>
              <div className="space-y-6">
                {learningPaths.map((path) => (
                  <LearningPathCard key={path.title} path={path} />
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-gray-800/70 rounded-xl border border-gray-700/40 p-6 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">Recommended Next Steps</h3>
                <button className="text-sm text-gray-400 hover:text-gray-300 transition">Refresh</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendations.map((rec) => (
                  <RecommendationCard key={rec.title} rec={rec} />
                ))}
              </div>
              <button className="w-full mt-6 py-2.5 px-4 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-medium rounded-lg transition flex items-center justify-center">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Generate Customized Learning Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}