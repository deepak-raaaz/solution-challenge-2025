"use client"
import { useState } from 'react';
import StatCard from './stat-card';
import WeeklyStudyChart from './weekly-study-chart';
import CourseProgress from './course-progess';
import GoalsProgress from './goals-progress';
import RecentAchievements from './recent-achievements';
import StudyStreak from './study-streak';
import QuickActions from './quick-actions';
import GoalsModal from './goals-modal';
import data from './data.json';

const stats = [
    { title: 'Total Study Time', value: '156h 32m', change: '+12% from last month', changeColor: 'text-green-400', icon: 'clock', color: '#1E90FF' },
    { title: 'Courses Completed', value: '12', change: '+3 this month', changeColor: 'text-green-400', icon: 'check-circle', color: '#10B981' },
    { title: 'Current Streak', value: '7 days', change: 'Best: 15 days', changeColor: 'text-neutral-400', icon: 'streak', color: '#F59E0B' },
    { title: 'Skill Points', value: '2,847', change: '+234 this week', changeColor: 'text-green-400', icon: 'star', color: '#8B5CF6' },
  ];
  
  export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const handleExportProgress = () => {
      alert('Exporting progress report...');
    };
  
    const handleSetGoals = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
      document.body.style.overflow = 'auto';
    };
  
    return (
      <section id="progress-tracking" className="min-h-screen p-6 max-md:px-4 max-lg:py-20">
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-[#E6E6E6]">Progress Tracking</h1>
              <p className="text-lg text-neutral-400 mb-4">Monitor your learning journey and achievements</p>
            </div>
            <div className="mt-4 lg:mt-0 flex space-x-3">
              <button
                onClick={handleExportProgress}
                className="px-6 py-3 rounded-lg font-medium border border-neutral-200/20 text-[#E6E6E6] hover:bg-neutral-700/50 transition-colors duration-200"
              >
                Export Report
              </button>
              <button
                onClick={handleSetGoals}
                className="px-6 py-3 rounded-lg font-medium text-white bg-[#1E90FF] hover:opacity-90 transition-colors duration-200"
              >
                Set Goals
              </button>
            </div>
          </div>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
  
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <WeeklyStudyChart />
            <CourseProgress courses={data.courses} />
          </div>
          <div className="space-y-6">
            <GoalsProgress goals={data.goals} />
            <RecentAchievements achievements={data.achievements} />
            <StudyStreak streak={data.streak} />
            <QuickActions />
          </div>
        </div>
  
        {isModalOpen && <GoalsModal onClose={handleCloseModal} />}
      </section>
    );
  }