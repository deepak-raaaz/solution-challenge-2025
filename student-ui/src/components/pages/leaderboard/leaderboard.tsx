"use client"
import { useState } from 'react';
import { FilterState, LeaderboardUser } from './leaderboard-type';
import leaderboardData from './leaderboard-data.json';
import CategoryTabs from './category-tab';
import Podium from './podium';
import LeaderboardTable from './leaderboard-table';
import Sidebar from './sidebar';
import FilterModal from './filter-modal';

export default function Leaderboard() {
  const [activeCategory, setActiveCategory] = useState('global');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState<LeaderboardUser[]>(leaderboardData.users);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    // Implement category filtering logic here
  };

  const handleFilterApply = (filters: FilterState) => {
    // Implement filter logic here
    setFilteredUsers(leaderboardData.users); // Placeholder
  };

  const handleFilterReset = () => {
    setFilteredUsers(leaderboardData.users);
  };

  const shareLeaderboard = () => {
    // Implement share functionality
    console.log('Sharing leaderboard...');
  };

  return (
    <section id="leaderboard" className="min-h-screen  p-6 py-20 max-lg:px-4">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4 max-sm:flex-col max-sm:items-start max-sm:gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-100 mb-2">Leaderboard</h1>
            <p className="text-gray-400">Compete with learners worldwide and track your progress</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="bg-gray-700/40 hover:bg-gray-600 text-gray-100 px-4 py-2 rounded-lg transition-colors duration-200 flex items-center"
            >
              <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
            </button>
            <button
              onClick={shareLeaderboard}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center"
            >
              <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              Share
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-r dark:to-transparent from-blue-600 border border-gray-700/40 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">🚀 Keep Climbing!</h2>
              <p className="text-purple-100">You're currently ranked #{leaderboardData.currentUser.rank} globally. Push harder to reach the top 10!</p>
            </div>
            <div className="text-right">
              <p className="text-white text-3xl font-bold">#{leaderboardData.currentUser.rank}</p>
              <p className="text-purple-100 text-sm">Your Rank</p>
            </div>
          </div>
        </div>
      </div>

      <CategoryTabs
        categories={leaderboardData.categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <Podium users={filteredUsers.slice(0, 3)} />
          <LeaderboardTable users={filteredUsers} />
        </div>
        <Sidebar currentUser={leaderboardData.currentUser} />
      </div>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={handleFilterApply}
        onReset={handleFilterReset}
      />
    </section>
  );
}