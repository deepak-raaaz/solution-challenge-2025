// components/TemplatesGallery.tsx
"use client"
import { useState } from 'react';
import { TemplateCard } from './components/TemplateCard';
import { CategoryCard } from './components/CategoryCard';
import { FilterSelect } from './components/FilterSelect';   
import { Pagination } from './components/Pagination';
interface Template {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  users: number;
  image?: string;
  isFeatured?: boolean;
  isNew?: boolean;
  isPopular?: boolean;
}

interface Category {
  id: string;
  name: string;
  count: number;
  icon: React.ReactNode;
  color: string;
}

export const TemplatesGallery: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: 'All Categories',
    difficulty: 'All Levels',
    duration: 'Any Duration',
    sortBy: 'Popular'
  });

  const featuredTemplates: Template[] = [
    {
      id: '1',
      title: 'Web Development Mastery',
      description: 'Complete roadmap from basics to advanced web development concepts.',
      duration: '40+ hours',
      difficulty: 'Intermediate',
      category: 'Technology',
      users: 15200,
      image: 'https://images.unsplash.com/photo-1484981138541-3d074aa97716?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzQ2fDB8MXxzZWFyY2h8MXx8dGVtcGxhdGVzLWdhbGxlcnklMjBwcm9mZXNzaW9uYWx8ZW58MHwwfHx8MTc0MzQ0OTg5OXww&ixlib=rb-4.0.3&q=80&w=1080',
      isFeatured: true
    },
    {
      id: '2',
      title: 'Business Leadership',
      description: 'Develop essential leadership skills for the modern business environment.',
      duration: '25+ hours',
      difficulty: 'Advanced',
      category: 'Business',
      users: 12800,
      image: 'https://images.unsplash.com/photo-1425421669292-0c3da3b8f529?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzQ2fDB8MXxzZWFyY2h8Mnx8dGVtcGxhdGVzLWdhbGxlcnklMjBwcm9mZXNzaW9uYWx8ZW58MHwwfHx8MTc0MzQ0OTg5OXww&ixlib=rb-4.0.3&q=80&w=1080',
      isFeatured: true
    },
    {
      id: '3',
      title: 'Effective Communication',
      description: 'Master professional communication skills for workplace success.',
      duration: '15+ hours',
      difficulty: 'Beginner',
      category: 'Soft Skills',
      users: 18500,
      image: 'https://images.unsplash.com/photo-1496180470114-6ef490f3ff22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzQ2fDB8MXxzZWFyY2h8M3x8dGVtcGxhdGVzLWdhbGxlcnklMjBwcm9mZXNzaW9uYWx8ZW58MHwwfHx8MTc0MzQ0OTg5OXww&ixlib=rb-4.0.3&q=80&w=1080',
      isFeatured: true
    }
  ];

  const allTemplates: Template[] = [
    {
      id: '4',
      title: 'Data Science Fundamentals',
      description: 'Learn data analysis, visualization, and machine learning basics.',
      duration: '30+ hours',
      difficulty: 'Intermediate',
      category: 'Technology',
      users: 7400,
      isNew: true
    },
    {
      id: '5',
      title: 'Creative Writing Workshop',
      description: 'Develop your storytelling skills and narrative techniques.',
      duration: '20+ hours',
      difficulty: 'Beginner',
      category: 'Arts',
      users: 9200,
      isPopular: true
    },
    {
      id: '6',
      title: 'Cybersecurity Essentials',
      description: 'Learn network security, cryptography, and threat assessment.',
      duration: '25+ hours',
      difficulty: 'Advanced',
      category: 'Technology',
      users: 11300,
      isFeatured: true
    },
    {
      id: '7',
      title: 'Spanish for Beginners',
      description: 'Learn essential vocabulary, grammar, and conversation skills.',
      duration: '15+ hours',
      difficulty: 'Beginner',
      category: 'Languages',
      users: 5700
    },
    {
      id: '8',
      title: 'Financial Literacy 101',
      description: 'Master budgeting, investing basics, and financial planning.',
      duration: '10+ hours',
      difficulty: 'Beginner',
      category: 'Business',
      users: 8900
    },
    {
      id: '9',
      title: 'Mobile App Development',
      description: 'Learn to build cross-platform mobile applications with React Native.',
      duration: '35+ hours',
      difficulty: 'Intermediate',
      category: 'Technology',
      users: 6300
    }
  ];

  const categories: Category[] = [
    {
      id: '1',
      name: 'Technology',
      count: 24,
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: 'blue'
    },
    {
      id: '2',
      name: 'Business',
      count: 18,
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'green'
    },
    {
      id: '3',
      name: 'Soft Skills',
      count: 15,
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: 'purple'
    },
    {
      id: '4',
      name: 'Science',
      count: 12,
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      color: 'yellow'
    },
    {
      id: '5',
      name: 'Arts',
      count: 9,
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      color: 'pink'
    },
    {
      id: '6',
      name: 'Languages',
      count: 11,
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
      ),
      color: 'red'
    }
  ];

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <section id="templates-gallery" className="page-section p-4 md:p-6 lg:p-8 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Roadmap Templates
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Start with pre-built templates or customize your own
            </p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
            </div>
            <button className="px-4 py-2 bg-indigo-600 dark:bg-indigo-500 rounded-lg text-sm font-medium text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors">
              <span className="flex items-center">
                <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create New
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap gap-2 md:gap-4 mb-6 bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200/30 dark:border-gray-700/30">
        <FilterSelect
          label="Category"
          value={filters.category}
          options={['All Categories', 'Technology', 'Business', 'Science', 'Arts', 'Languages']}
          onChange={(value) => handleFilterChange('category', value)}
        />
        <FilterSelect
          label="Difficulty"
          value={filters.difficulty}
          options={['All Levels', 'Beginner', 'Intermediate', 'Advanced']}
          onChange={(value) => handleFilterChange('difficulty', value)}
        />
        <FilterSelect
          label="Duration"
          value={filters.duration}
          options={['Any Duration', 'Short (< 5 hours)', 'Medium (5-20 hours)', 'Long (> 20 hours)']}
          onChange={(value) => handleFilterChange('duration', value)}
        />
        <FilterSelect
          label="Sort by"
          value={filters.sortBy}
          options={['Popular', 'Newest', 'Highest Rated']}
          onChange={(value) => handleFilterChange('sortBy', value)}
          className="ml-auto"
        />
      </div>

      {/* Featured Templates */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Featured Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTemplates.map(template => (
            <TemplateCard key={template.id} {...template} hasImage />
          ))}
        </div>
      </div>

      {/* Popular Categories */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(category => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </div>
      </div>

      {/* All Templates */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">All Templates</h2>
          <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium">
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allTemplates.map(template => (
            <TemplateCard key={template.id} {...template} />
          ))}
        </div>
        <Pagination />
      </div>
    </section>
  );
};





