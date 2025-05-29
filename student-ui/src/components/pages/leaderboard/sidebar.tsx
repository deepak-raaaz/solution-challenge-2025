import { FC } from 'react';
import { CurrentUser } from './leaderboard-type';

interface SidebarProps {
  currentUser: CurrentUser;
}

const Sidebar: FC<SidebarProps> = ({ currentUser }) => {
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-6 space-y-6">
        {/* Your Stats */}
        <div className="bg-gray-800/20 border border-gray-700/40 rounded-lg p-6">
          <h3 className="font-semibold text-gray-100 mb-4">Your Performance</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-400">Current Rank</span>
              <span className="text-blue-400 font-bold">#{currentUser.rank}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Total XP</span>
              <span className="text-gray-100 font-medium">{currentUser.xp.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">This Week</span>
              <span className="text-green-400 font-medium">+{currentUser.weeklyXp} XP</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Rank Change</span>
              <span className="text-green-400 font-medium">↑ {currentUser.rankChange}</span>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-700">
            <h4 className="font-medium text-gray-100 mb-2">Next Level Progress</h4>
            <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${(currentUser.levelProgress.current / currentUser.levelProgress.total) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>Level {currentUser.levelProgress.level}</span>
              <span>{currentUser.levelProgress.current}/{currentUser.levelProgress.total} XP</span>
            </div>
          </div>
        </div>

        {/* Weekly Challenge */}
        <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-lg p-6">
          <h3 className="font-semibold text-white mb-2">🎯 Weekly Challenge</h3>
          <p className="text-green-100 text-sm mb-4">Complete 5 courses this week to earn bonus XP!</p>
          <div className="w-full bg-green-800 rounded-full h-2 mb-2">
            <div
              className="bg-white h-2 rounded-full"
              style={{ width: `${(currentUser.weeklyChallenge.completed / currentUser.weeklyChallenge.total) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-green-100">
            <span>{currentUser.weeklyChallenge.completed}/{currentUser.weeklyChallenge.total} courses</span>
            <span>+{currentUser.weeklyChallenge.reward} XP reward</span>
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="bg-gray-800/20 border border-gray-700/40 rounded-lg p-6">
          <h3 className="font-semibold text-gray-100 mb-4">Recent Achievements</h3>
          <div className="space-y-3">
            {currentUser.achievements.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`bg-${achievement.color} w-10 h-10 rounded-full flex items-center justify-center`}>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {achievement.icon === 'flame' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                    )}
                    {achievement.icon === 'code' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    )}
                    {achievement.icon === 'users' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    )}
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-100 text-sm">{achievement.title}</h4>
                  <p className="text-gray-400 text-xs">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regional Rankings */}
        <div className="bg-gray-800/20 border border-gray-700/40 rounded-lg p-6">
          <h3 className="font-semibold text-gray-100 mb-4">Regional Rankings</h3>
          <div className="space-y-3">
            {currentUser.regionalRankings.map((ranking, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-300">{ranking.flag} {ranking.region}</span>
                <span className="text-blue-400 font-medium">#{ranking.rank}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-800/20 border border-gray-700/40 rounded-lg p-6">
          <h3 className="font-semibold text-gray-100 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm transition-colors duration-200">
              Start Learning
            </button>
            <button className="w-full bg-gray-700/40 hover:bg-gray-600 text-gray-100 py-2 px-4 rounded-lg text-sm transition-colors duration-200">
              View Profile
            </button>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm transition-colors duration-200">
              Share Achievement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;