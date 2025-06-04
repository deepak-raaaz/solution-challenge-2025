"use client"
import { useState } from 'react';
import SearchBar from './searchbar';
import FilterSelect from './filter-select';
import WelcomeBanner from './welcome-banner';
import PlaylistSection from './playlist-section';
import GamificationSection from './gamification-section';
import QuickActions from './quick-actions';
import PendingAssessment from './pending-assessment';

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
    <section id="home" className="min-h-screen  text-[#E6E6E6] p-6 py-20 max-md:px-4">
      <div className="max-w-7xl mx-auto">
        <WelcomeBanner onStartLearning={() => handleSectionChange('create-start')} />
         <PendingAssessment/>
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