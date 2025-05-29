"use client"
import { useState } from 'react';
import SearchBar from './searchbar';
import FilterSelect from './filter-select';
import WelcomeBanner from './welcome-banner';
import PlaylistSection from './playlist-section';
import GamificationSection from './gamification-section';
import QuickActions from './quick-actions';

const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
const types = ['All Types', 'Free', 'Paid'];
const languages = ['English', 'Spanish', 'Hindi', 'Mandarin', 'Arabic'];

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState(levels[0]);
  const [typeFilter, setTypeFilter] = useState(types[0]);
  const [language, setLanguage] = useState(languages[0]);

  const handleSectionChange = (section: string) => {
    console.log(`Navigating to ${section}`);
    // Add your navigation logic here
  };

  return (
    <section id="home" className="min-h-screen  text-[#E6E6E6] p-6 max-lg:py-20 max-md:px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-8 space-y-4 lg:space-y-0 max-md:hidden ">
          <div className="flex-1 max-w-2xl">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <FilterSelect
              options={levels}
              value={levelFilter}
              onChange={setLevelFilter}
            />
            <FilterSelect
              options={types}
              value={typeFilter}
              onChange={setTypeFilter}
            />
            <FilterSelect
              options={languages}
              value={language}
              onChange={setLanguage}
            />
          </div>
        </div>

        <WelcomeBanner onStartLearning={() => handleSectionChange('create-start')} />
        <PlaylistSection onViewAll={() => handleSectionChange('playlists')} />
        <GamificationSection
          onLeaderboardClick={() => handleSectionChange('leaderboard')}
          onProfileClick={() => handleSectionChange('profile')}
        />
        <QuickActions onActionClick={handleSectionChange} />
      </div>
    </section>
  );
}