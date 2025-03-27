// components/Leaderboard.tsx
'use client';

import { useState } from 'react';

// Types
interface LeaderboardTab {
  name: string;
  notification?: number;
  active: boolean;
}

interface Ranking {
  rank: number;
  name: string;
  initials: string;
  track: string;
  level: number;
  xp: number;
  courses: number;
  badges: string[];
  streak: number | 'broken';
  avatarGradient: string;
}

// Sample Data
const tabs: LeaderboardTab[] = [
  { name: 'Global Rankings', notification: 3, active: true },
  { name: 'Web Development', active: false },
  { name: 'Machine Learning', active: false },
  { name: 'Blockchain', active: false },
  { name: 'My Network', active: false },
];

const rankings: Ranking[] = [
  {
    rank: 1,
    name: 'Ada Smith',
    initials: 'AS',
    track: 'Machine Learning',
    level: 12,
    xp: 7230,
    courses: 56,
    badges: ['AI', 'PY', 'ML', '+8'],
    streak: 21,
    avatarGradient: 'from-blue-500 to-purple-500',
  },
  // Add more rankings here...
];

// Components
const TabNavigation = ({ tabs }: { tabs: LeaderboardTab[] }) => (
  <div className="flex flex-wrap justify-center mb-8 border-b border-gray-800">
    {tabs.map((tab) => (
      <button
        key={tab.name}
        className={`px-4 py-3 text-sm font-medium relative -mb-px ${
          tab.active
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg'
            : 'text-gray-400 hover:text-white transition'
        }`}
      >
        {tab.name}
        {tab.notification && (
          <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {tab.notification}
          </span>
        )}
      </button>
    ))}
  </div>
);

const FilterControls = () => (
  <div className="flex flex-wrap justify-between items-center mb-6">
    <div className="flex items-center space-x-4 mb-4 md:mb-0">
      <span className="text-gray-400 text-sm">Filter by:</span>
      <select className="bg-gray-800 border border-gray-700 text-white rounded-lg text-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500">
        <option>All Time</option>
        <option>This Month</option>
        <option>This Week</option>
        <option>Today</option>
      </select>
      <select className="bg-gray-800 border border-gray-700 text-white rounded-lg text-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500">
        <option>All Skills</option>
        <option>JavaScript</option>
        <option>Python</option>
        <option>React</option>
        <option>Data Science</option>
      </select>
    </div>
    <div className="flex items-center">
      <span className="text-sm text-gray-400 mr-2">Your ranking:</span>
      <span className="text-sm font-medium bg-blue-900/30 text-blue-400 py-1 px-3 rounded-full">
        #7 of 1,248
      </span>
    </div>
  </div>
);

const PodiumCard = ({ rank, user }: { rank: number; user: Ranking }) => {
  const podiumStyles = {
    1: { height: 'h-40', border: 'border-yellow-500', bg: 'from-yellow-700/40 to-yellow-600/20' },
    2: { height: 'h-32', border: 'border-gray-800', bg: 'from-gray-700/60 to-gray-700/30' },
    3: { height: 'h-28', border: 'border-gray-800', bg: 'from-amber-700/30 to-amber-600/20' },
  };

  return (
    <div className="relative mb-16">
      <div className="absolute left-1/2 transform -translate-x-1/2 -top-5 flex flex-col items-center">
        <div
          className={`h-${rank === 1 ? '20' : '16'} w-${
            rank === 1 ? '20' : '16'
          } rounded-full bg-gray-700 border-4 ${podiumStyles[rank as keyof typeof podiumStyles].border} overflow-hidden`}
        >
          <div className={`w-full h-full bg-gradient-to-r ${user.avatarGradient} flex items-center justify-center text-white font-bold text-${rank === 1 ? 'xl' : 'lg'}`}>
            {user.initials}
          </div>
        </div>
        <span
          className={`absolute -top-${rank === 1 ? '5' : '3'} -right-3 flex h-${
            rank === 1 ? '8' : '6'
          } w-${rank === 1 ? '8' : '6'} items-center justify-center rounded-full ${
            rank === 1 ? 'bg-yellow-500 text-gray-900' : rank === 2 ? 'bg-silver-500' : 'bg-amber-700'
          } text-xs font-semibold text-white border-2 border-gray-800`}
        >
          {rank}
        </span>
        <div className="mt-2 text-center">
          <p className="font-medium text-white">{user.name}</p>
          <p className="text-sm text-gray-400">{user.xp.toLocaleString()} XP</p>
        </div>
      </div>
      <div className={`mt-${rank === 1 ? '32' : '24'} ${podiumStyles[rank as keyof typeof podiumStyles].height} bg-gradient-to-t ${podiumStyles[rank as keyof typeof podiumStyles].bg} rounded-xl`}></div>
    </div>
  );
};

const LeaderboardTable = ({ rankings }: { rankings: Ranking[] }) => (
  <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl overflow-hidden backdrop-blur-sm">
    <div className="p-4 bg-gray-800/80 border-b border-gray-700/50 flex justify-between items-center">
      <h3 className="text-lg font-medium">Global Rankings</h3>
      {/* Pagination controls */}
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
          {rankings.map((user) => (
            <tr
              key={user.rank}
              className={`${user.rank === 7 ? 'bg-blue-900/20 border-l-4 border-blue-500' : 'hover:bg-gray-800/30'}`}
            >
              <td className="px-4 py-3 font-medium">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    user.rank === 1
                      ? 'bg-yellow-500 text-yellow-900'
                      : user.rank === 2
                      ? 'bg-gray-500 text-gray-900'
                      : user.rank === 3
                      ? 'bg-amber-700 text-amber-100'
                      : 'bg-gray-700 text-white'
                  }`}
                >
                  {user.rank}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center">
                  <div className={`h-8 w-8 rounded-full bg-gradient-to-r ${user.avatarGradient} flex items-center justify-center mr-3 text-white font-medium text-sm`}>
                    {user.initials}
                  </div>
                  <div>
                    <p className="font-medium text-white">{user.name}</p>
                    <p className="text-xs text-gray-400">{user.track}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">
                <span className="bg-gray-800/80 text-gray-300 text-xs px-2 py-1 rounded-full font-medium">
                  Level {user.level}
                </span>
              </td>
              <td className="px-4 py-3 font-semibold text-gray-300">{user.xp.toLocaleString()}</td>
              <td className="px-4 py-3 text-sm">{user.courses} completed</td>
              <td className="px-4 py-3">
                <div className="flex -space-x-1">
                  {user.badges.map((badge, index) => (
                    <span
                      key={index}
                      className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center text-xs text-white border-2 border-gray-800"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-4 py-3 text-sm">
                <span className={`flex items-center ${user.streak === 'broken' ? 'text-red-400' : 'text-green-400'}`}>
                  {/* Streak icon */}
                  {user.streak === 'broken' ? 'Broken' : `${user.streak} days`}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default function Leaderboard() {
  return (
    <section
      id="leaderboards"
      className="bg-gradient-to-b from-gray-900 to-gray-950 text-white py-12 px-4 md:px-8 min-h-screen"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Leaderboards
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Compete with peers, earn recognition, and track your progress against top learners across different skill tracks.
          </p>
        </div>

        <TabNavigation tabs={tabs} />
        <FilterControls />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 mb-8 lg:mb-0 order-2 lg:order-1">
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-6 text-center">Top Achievers</h3>
              {rankings.slice(0, 3).map((user) => (
                <PodiumCard key={user.rank} rank={user.rank} user={user} />
              ))}
            </div>
          </div>
          <div className="lg:col-span-2 order-1 lg:order-2">
            <LeaderboardTable rankings={rankings} />
          </div>
        </div>

        {/* Add Achievement Stats and Motivational Section here */}
      </div>
    </section>
  );
}

// types/index.ts
export interface UserRanking {
  rank: number;
  name: string;
  initials: string;
  track: string;
  level: number;
  xp: number;
  courses: number;
  badges: string[];
  streak: number | 'broken';
  avatarGradient: string;
}