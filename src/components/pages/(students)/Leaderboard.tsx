// components/Leaderboards.tsx
'use client';

import { useState } from 'react';

interface Leader {
  rank: number;
  name: string;
  initials: string;
  track: string;
  xp: number;
  level: number;
  courses: number;
  badges: string[];
  streak: number | 'Broken';
  avatarGradient: string;
  isUser?: boolean;
}

interface PodiumLeader {
  rank: number;
  name: string;
  initials: string;
  xp: number;
  courses: number;
  avatarGradient: string;
  badge?: string;
  badgeColor?: string;
}

interface Stat {
  label: string;
  value: string;
  icon: any;
  color: string;
  trend: string;
}

const tabs = ['Global Rankings', 'Web Development', 'Machine Learning', 'Blockchain', 'My Network'];
const timeFilters = ['All Time', 'This Month', 'This Week', 'Today'];
const skillFilters = ['All Skills', 'JavaScript', 'Python', 'React', 'Data Science'];

const podiumLeaders: PodiumLeader[] = [
  {
    rank: 1,
    name: 'Ada Smith',
    initials: 'AS',
    xp: 7230,
    courses: 56,
    avatarGradient: 'from-blue-500 to-purple-500',
    badge: 'Machine Learning Pro',
    badgeColor: 'yellow',
  },
  {
    rank: 2,
    name: 'Michael Jordan',
    initials: 'MJ',
    xp: 5890,
    courses: 43,
    avatarGradient: 'from-gray-700 to-gray-600',
  },
  {
    rank: 3,
    name: 'Tim Cook',
    initials: 'TC',
    xp: 4750,
    courses: 35,
    avatarGradient: 'from-amber-700 to-amber-600',
  },
];

const leaders: Leader[] = [
  { rank: 1, name: 'Ada Smith', initials: 'AS', track: 'Machine Learning', xp: 7230, level: 12, courses: 56, badges: ['AI', 'PY', 'ML', '+8'], streak: 21, avatarGradient: 'from-blue-500 to-purple-500' },
  { rank: 2, name: 'Michael Jordan', initials: 'MJ', track: 'Web Development', xp: 5890, level: 11, courses: 43, badges: ['JS', 'RE', '+5'], streak: 14, avatarGradient: 'from-gray-700 to-gray-600' },
  { rank: 3, name: 'Tim Cook', initials: 'TC', track: 'Blockchain', xp: 4750, level: 10, courses: 35, badges: ['BC', 'ET', '+3'], streak: 10, avatarGradient: 'from-amber-700 to-amber-600' },
  { rank: 4, name: 'Sara Jones', initials: 'SJ', track: 'Full Stack', xp: 4210, level: 9, courses: 32, badges: ['JS', 'RB', '+4'], streak: 8, avatarGradient: 'from-red-600 to-pink-500' },
  { rank: 5, name: 'David Wilson', initials: 'DW', track: 'Data Science', xp: 3950, level: 9, courses: 29, badges: ['PY', 'DS', '+3'], streak: 7, avatarGradient: 'from-green-600 to-teal-500' },
  { rank: 6, name: 'Kevin Lee', initials: 'KL', track: 'Mobile Development', xp: 3620, level: 8, courses: 27, badges: ['AN', 'FL', '+2'], streak: 'Broken', avatarGradient: 'from-purple-600 to-indigo-500' },
  { rank: 7, name: 'You', initials: 'YOU', track: 'Web Development', xp: 3480, level: 8, courses: 24, badges: ['JS', 'RE', 'TS'], streak: 5, avatarGradient: 'from-blue-600 to-indigo-500', isUser: true },
  { rank: 8, name: 'Emily Chen', initials: 'EC', track: 'UI/UX Design', xp: 3340, level: 8, courses: 23, badges: ['UI', 'FG', '+3'], streak: 'Broken', avatarGradient: 'from-pink-600 to-red-500' },
];

const stats: Stat[] = [
  { label: 'Total Students', value: '1,248', icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>, color: 'blue', trend: '8% from last week' },
  { label: 'Active Courses', value: '124', icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>, color: 'purple', trend: '12% from last month' },
  { label: 'Course Completions', value: '3,521', icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, color: 'green', trend: '15% from last week' },
  { label: 'Average XP/Student', value: '2,145', icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>, color: 'amber', trend: '6% from last month' },
];

// Reusable Components
const PodiumCard: React.FC<{ leader: PodiumLeader }> = ({ leader }) => (
  <div className="relative ">
    <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center" style={{ top: leader.rank === 1 ? '-1.25rem' : '-0.75rem' }}>
      <div className={`h-${leader.rank === 1 ? '20' : '16'} w-${leader.rank === 1 ? '20' : '16'} rounded-full bg-gray-700 border-4 ${leader.rank === 1 ? 'border-yellow-500' : 'border-gray-800'} overflow-hidden`}>
        <div className={`w-full h-full bg-gradient-to-r ${leader.avatarGradient} flex items-center justify-center text-white font-bold text-${leader.rank === 1 ? 'xl' : 'lg'}`}>{leader.initials}</div>
      </div>
      <span className={`absolute -top-3 -right-3 flex h-${leader.rank === 1 ? '8' : '6'} w-${leader.rank === 1 ? '8' : '6'} items-center justify-center rounded-full ${leader.rank === 1 ? 'bg-yellow-500 text-gray-900' : leader.rank === 2 ? 'bg-gray-500 text-white' : 'bg-amber-700 text-white'} text-xs font-semibold border-2 border-gray-800`}>
        {leader.rank}
      </span>
      <div className="mt-2 text-center">
        <p className="font-medium text-white">{leader.name}</p>
        <p className="text-sm text-gray-400">{leader.xp.toLocaleString()} XP</p>
      </div>
      {leader.badge && (
        <div className="mt-1">
          <span className={`bg-${leader.badgeColor}-500/20 text-${leader.badgeColor}-500 text-xs px-2 py-1 rounded-full`}>{leader.badge}</span>
        </div>
      )}
    </div>
    <div className={` mt-${leader.rank === 1 ? '32 h-60' : '24 h-48'} h-${leader.rank === 1 ? '40' : leader.rank === 2 ? '32' : '28'} bg-gradient-to-t ${leader.rank === 1 ? 'from-yellow-700/40 to-yellow-600/20' : leader.rank === 2 ? 'from-gray-700/60 to-gray-700/30' : 'from-amber-700/30 to-amber-600/20'} rounded-xl flex items-end justify-center`}>
      <div className="text-center pb-4">
        <div className="flex justify-center space-x-1 mb-2">
          {Array.from({ length: leader.rank === 1 ? 5 : leader.rank === 2 ? 3 : 2 }).map((_, i) => (
            <div key={i} className={`h-5 w-5 bg-${leader.rank === 1 ? 'yellow' : leader.rank === 2 ? 'yellow' : 'amber'}-500/20 rounded-full flex items-center justify-center`}>
              <svg className={`h-3 w-3 text-${leader.rank === 1 ? 'yellow' : leader.rank === 2 ? 'yellow' : 'amber'}-500`} viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81 .588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          ))}
        </div>
        <span className={`text-xs text-${leader.rank === 1 ? 'yellow' : leader.rank === 2 ? 'blue' : 'amber'}-300`}>Completed {leader.courses} courses</span>
        {leader.rank === 1 && <div className="mt-1"><span className="text-xs bg-gray-700/50 text-gray-300 px-2 py-0.5 rounded-full">3-week streak</span></div>}
      </div>
    </div>
  </div>
);

const StatCard: React.FC<{ stat: Stat }> = ({ stat }) => (
  <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 backdrop-blur-sm">
    <div className="flex justify-between">
      <div>
        <p className="text-gray-400 text-sm">{stat.label}</p>
        <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
      </div>
      <div className={`h-12 w-12 bg-${stat.color}-500/20 rounded-full flex items-center justify-center text-${stat.color}-400`}>{stat.icon}</div>
    </div>
    <div className="mt-3">
      <span className="text-xs bg-green-900/20 text-green-400 px-2 py-0.5 rounded-full flex items-center">
        <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
        {stat.trend}
      </span>
    </div>
  </div>
);

export default function Leaderboards() {
  const [activeTab, setActiveTab] = useState('Global Rankings');
  const [timeFilter, setTimeFilter] = useState('All Time');
  const [skillFilter, setSkillFilter] = useState('All Skills');

  return (
    <section className=" text-white py-12 px-4 md:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Leaderboards</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Compete with peers, earn recognition, and track your progress against top learners across different skill tracks.</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-8 border-b border-gray-800">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium relative -mb-px ${activeTab === tab ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg' : 'text-gray-400 hover:text-white transition'}`}
            >
              {tab}
              {tab === 'Global Rankings' && (
                <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">3</span>
              )}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-between items-center mb-6">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <span className="text-gray-400 text-sm">Filter by:</span>
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="bg-gray-800 border border-gray-700 text-white rounded-lg text-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {timeFilters.map((filter) => <option key={filter} value={filter}>{filter}</option>)}
            </select>
            <select
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
              className="bg-gray-800 border border-gray-700 text-white rounded-lg text-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {skillFilters.map((filter) => <option key={filter} value={filter}>{filter}</option>)}
            </select>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-400 mr-2">Your ranking:</span>
            <span className="text-sm font-medium bg-blue-900/30 text-blue-400 py-1 px-3 rounded-full">#7 of 1,248</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Podium */}
          <div className="lg:col-span-1 mb-8 lg:mb-0 order-2 lg:order-1">
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-6 text-center">Top Achievers</h3>
              <div className="space-y-16">
                {podiumLeaders.map((leader) => <PodiumCard key={leader.rank} leader={leader} />)}
              </div>
            </div>
          </div>

          {/* Leaderboard Table */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl overflow-hidden backdrop-blur-sm">
              <div className="p-4 bg-gray-800/80 border-b border-gray-700/50 flex justify-between items-center">
                <h3 className="text-lg font-medium">{activeTab}</h3>
                <div className="flex items-center">
                  <button className="p-1.5 bg-gray-700 rounded-l-lg border border-gray-600 text-gray-400 hover:text-white"><svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg></button>
                  <span className="px-3 py-1 bg-gray-700 border-t border-b border-gray-600 text-sm">1 of 12</span>
                  <button className="p-1.5 bg-gray-700 rounded-r-lg border border-gray-600 text-gray-400 hover:text-white"><svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg></button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-900/30 text-gray-400 text-xs uppercase">
                      <th className="px-4 py-3 font-medium">Rank</th>
                      <th className="px-4 py-3 font-medium">Student</th>
                      <th className="px-4 py-3 font-medium">Level</th>
                      <th className="px-4 py-3 font-medium">XP</th>
                      <th className="px-4 py-3 font-medium">Courses</th>
                      <th className="px-4 py-3 font-medium">Badges</th>
                      <th className="px-4 py-3 font-medium">Streak</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/50">
                    {leaders.map((leader) => (
                      <tr key={leader.rank} className={`${leader.isUser ? 'bg-blue-900/20 border-l-4 border-blue-500' : leader.rank <= 3 ? `bg-${leader.rank === 1 ? 'yellow' : leader.rank === 2 ? 'gray' : 'amber'}-900/10 border-l-4 border-${leader.rank === 1 ? 'yellow' : leader.rank === 2 ? 'gray' : 'amber'}-${leader.rank === 1 ? '500' : leader.rank === 2 ? '500' : '700'}` : 'hover:bg-gray-800/30'}`}>
                        <td className="px-4 py-3 font-medium">
                          <span className={`bg-${leader.rank === 1 ? 'yellow-500 text-yellow-900' : leader.rank === 2 ? 'gray-500 text-gray-900' : leader.rank === 3 ? 'amber-700 text-amber-100' : leader.isUser ? 'blue-500 text-white' : 'gray-700 text-white'} w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold`}>{leader.rank}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <div className={`h-8 w-8 rounded-full bg-gradient-to-r ${leader.avatarGradient} flex items-center justify-center mr-3 text-white font-medium text-sm`}>{leader.initials}</div>
                            <div>
                              <p className="font-medium text-white">{leader.name}</p>
                              <p className={`text-xs ${leader.isUser ? 'text-blue-400' : 'text-gray-400'}`}>{leader.track}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`bg-${leader.rank === 1 ? 'purple' : leader.rank === 2 ? 'blue' : leader.rank === 3 ? 'amber' : leader.isUser ? 'blue' : 'gray'}-900/30 text-${leader.rank === 1 ? 'purple' : leader.rank === 2 ? 'blue' : leader.rank === 3 ? 'amber' : leader.isUser ? 'blue' : 'gray'}-${leader.rank === 1 ? '400' : leader.rank === 2 ? '400' : leader.rank === 3 ? '400' : leader.isUser ? '400' : '300'} text-xs px-2 py-1 rounded-full font-medium`}>Level {leader.level}</span>
                        </td>
                        <td className={`px-4 py-3 font-semibold ${leader.rank === 1 ? 'text-yellow-400' : leader.rank === 2 ? 'text-gray-300' : leader.rank === 3 ? 'text-amber-400' : leader.isUser ? 'text-blue-400' : 'text-gray-300'}`}>{leader.xp.toLocaleString()}</td>
                        <td className="px-4 py-3 text-sm">{leader.courses} completed</td>
                        <td className="px-4 py-3">
                          <div className="flex -space-x-1">
                            {leader.badges.map((badge, i) => (
                              <span key={i} className={`h-6 w-6 rounded-full ${i < 3 ? `bg-${['blue', 'teal', 'pink', 'indigo', 'green', 'orange', 'red', 'purple'][i % 8]}-600` : 'bg-gray-700'} flex items-center justify-center text-xs text-white border-2 border-gray-800`}>{badge}</span>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`flex items-center ${leader.streak === 'Broken' ? 'text-red-400' : 'text-green-400'}`}>
                            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={leader.streak === 'Broken' ? 'M13 17h8m0 0V9m0 8l-8-8-4 4-6-6' : 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'} />
                            </svg>
                            {leader.streak === 'Broken' ? 'Broken' : `${leader.streak} days`}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-gray-800/80 border-t border-gray-700/50 flex justify-between items-center">
                <div className="text-sm text-gray-400">Showing <span className="font-medium text-white">8</span> of <span className="font-medium text-white">1,248</span> students</div>
                <div className="flex">
                  <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded-l-lg border border-gray-600 hover:bg-gray-600 hover:text-white transition">Previous</button>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded-r-lg border border-blue-700 hover:bg-blue-700 transition">Next</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => <StatCard key={stat.label} stat={stat} />)}
        </div>

        {/* Motivational Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-6 border border-blue-500/20 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h3 className="text-xl font-semibold text-white mb-3">Ready to climb the ranks?</h3>
              <p className="text-gray-300 mb-4">Challenge yourself with daily learning goals, complete more courses, and compete with peers to reach the top of the leaderboard.</p>
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition">Set Daily Goal</button>
                <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition">Join a Challenge</button>
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition">Share Progress</button>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="relative">
                <div className="h-32 w-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
                  <div className="h-28 w-28 bg-gray-900 rounded-full flex items-center justify-center">
                    <svg className="h-14 w-14 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                  </div>
                </div>
                <div className="absolute -top-4 -right-2 h-12 w-12 bg-yellow-500 rounded-full flex items-center justify-center border-4 border-gray-900">
                  <svg className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}