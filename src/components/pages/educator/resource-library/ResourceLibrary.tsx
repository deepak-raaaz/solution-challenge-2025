// components/ResourceLibrary.tsx
"use client";
import { useState } from 'react';

// Interfaces
interface Resource {
  id: string;
  title: string;
  description: string;
  type: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  rating: number;
  reviews: number;
  price: string;
  image?: string;
  isAIRecommended?: boolean;
  addedDaysAgo?: string;
  isNew?: boolean;
  categoryColor: string;
}

interface ResourceCategory {
  id: string;
  name: string;
  count: number;
  icon: React.ReactNode;
  color: string;
}

// Data
const aiRecommendedResources: Resource[] = [
  {
    id: '1',
    title: 'Advanced Data Structures',
    description: 'Perfect addition to your "Coding Fundamentals" roadmap.',
    type: 'Course',
    duration: '12 hours',
    difficulty: 'Intermediate',
    rating: 4.8,
    reviews: 423,
    price: '$49.99',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da',
    isAIRecommended: true,
    categoryColor: 'blue'
  },
  {
    id: '2',
    title: 'Effective Learning Strategies',
    description: 'Research-backed techniques to enhance student engagement.',
    type: 'Article',
    duration: '25 min read',
    difficulty: 'All Levels',
    rating: 4.6,
    reviews: 189,
    price: 'Free',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf',
    isAIRecommended: true,
    categoryColor: 'green'
  },
  {
    id: '3',
    title: 'Interactive Learning Design',
    description: 'Create engaging experiences for diverse learning styles.',
    type: 'Video',
    duration: '45 minutes',
    difficulty: 'Intermediate',
    rating: 4.9,
    reviews: 317,
    price: '$24.99',
    image: 'https://images.unsplash.com/photo-1484981138541-3d074aa97716',
    isAIRecommended: true,
    categoryColor: 'red'
  }
];

const recentResources: Resource[] = [
  {
    id: '4',
    title: 'JavaScript Algorithms Challenge',
    description: 'Practice solving common algorithmic problems with JavaScript.',
    type: 'Exercise',
    duration: '10 challenges',
    difficulty: 'Intermediate',
    rating: 0,
    reviews: 0,
    price: 'Free',
    addedDaysAgo: '2 days ago',
    isNew: true,
    categoryColor: 'yellow'
  },
  {
    id: '5',
    title: '3D Physics Simulation',
    description: "Interactive physics simulation for teaching Newton's laws of motion.",
    type: 'Simulation',
    duration: 'Unlimited',
    difficulty: 'Beginner',
    rating: 0,
    reviews: 0,
    price: '$19.99',
    addedDaysAgo: '3 days ago',
    isNew: true,
    categoryColor: 'pink'
  },
  {
    id: '6',
    title: 'Inclusive Teaching Strategies',
    description: 'Research-based approaches for creating inclusive learning environments.',
    type: 'Article',
    duration: '15 min read',
    difficulty: 'All Levels',
    rating: 0,
    reviews: 0,
    price: 'Free',
    addedDaysAgo: '1 week ago',
    isNew: true,
    categoryColor: 'green'
  }
];

const premiumResources: Resource[] = [
  {
    id: '7',
    title: 'Educational Leadership Masterclass',
    description: 'Learn effective strategies for educational leadership and management.',
    type: 'Course',
    duration: '30 hours',
    difficulty: 'Advanced',
    rating: 4.9,
    reviews: 215,
    price: '$79.99',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf',
    categoryColor: 'blue'
  },
  {
    id: '8',
    title: 'Comprehensive Assessment Pack',
    description: '200+ assessment tools for measuring student progress across subjects.',
    type: 'Assessment Bundle',
    duration: '200+ items',
    difficulty: 'All Levels',
    rating: 4.7,
    reviews: 322,
    price: '$59.99',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da',
    categoryColor: 'purple'
  },
  {
    id: '9',
    title: 'Virtual Science Laboratory',
    description: 'Advanced 3D simulation lab for conducting virtual science experiments.',
    type: 'Simulation',
    duration: '50+ experiments',
    difficulty: 'Intermediate',
    rating: 4.8,
    reviews: 175,
    price: '$89.99',
    image: 'https://images.unsplash.com/photo-1484981138541-3d074aa97716',
    categoryColor: 'pink'
  }
];

const resourceCategories: ResourceCategory[] = [
  { id: '1', name: 'Courses', count: 487, icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8a2 2 0 00-2-2h-1M9 15L3 9m0 0l6-6M3 9h12a2 2 0 012 2v6a2 2 0 01-2 2H3" /></svg>, color: 'blue' },
  { id: '2', name: 'Videos', count: 352, icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, color: 'red' },
  { id: '3', name: 'Articles', count: 215, icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>, color: 'green' },
  { id: '4', name: 'Quizzes', count: 173, icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, color: 'purple' },
  { id: '5', name: 'Exercises', count: 128, icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>, color: 'yellow' },
  { id: '6', name: 'Simulations', count: 92, icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>, color: 'pink' }
];

// Main Component
export const ResourceLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    type: 'All Types',
    subject: 'All Subjects',
    difficulty: 'All Levels',
    pricing: 'All',
    sortBy: 'Relevance'
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <section id="resource-library" className="page-section p-4 md:p-6 lg:p-8 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Resource Library</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Discover and add high-quality content to your learning roadmaps</p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search resources..."
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
                Add New
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap gap-2 md:gap-4 mb-6 bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200/30 dark:border-gray-700/30">
        <FilterSelect label="Type" value={filters.type} options={['All Types', 'Courses', 'Videos', 'Articles', 'Quizzes', 'Exercises', 'Simulations']} onChange={(value) => handleFilterChange('type', value)} />
        <FilterSelect label="Subject" value={filters.subject} options={['All Subjects', 'Programming', 'Design', 'Business', 'Science', 'Mathematics', 'Languages']} onChange={(value) => handleFilterChange('subject', value)} />
        <FilterSelect label="Difficulty" value={filters.difficulty} options={['All Levels', 'Beginner', 'Intermediate', 'Advanced']} onChange={(value) => handleFilterChange('difficulty', value)} />
        <FilterSelect label="Pricing" value={filters.pricing} options={['All', 'Free', 'Premium']} onChange={(value) => handleFilterChange('pricing', value)} />
        <FilterSelect label="Sort by" value={filters.sortBy} options={['Relevance', 'Newest', 'Highest Rated', 'Most Popular']} onChange={(value) => handleFilterChange('sortBy', value)} className="ml-auto" />
      </div>

      {/* AI Recommendations */}
      <ResourceSection title="AI Recommended For You" resources={aiRecommendedResources} hasImages extra={<span className="text-sm text-indigo-600 dark:text-indigo-400 mr-2">Based on your roadmaps</span>} />

      {/* Resource Categories */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Browse by Resource Type</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {resourceCategories.map(category => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </div>
      </div>

      {/* Recent Resources */}
      <ResourceSection title="Recently Added Resources" resources={recentResources} />

      {/* Premium Resources */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Premium Resources</h2>
          <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium">View All</button>
        </div>
        <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 mb-6">
          <div className="absolute inset-0 bg-black opacity-20 rounded-lg"></div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between">
            <div className="md:max-w-xl mb-4 md:mb-0">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Unlock Premium Content</h3>
              <p className="text-indigo-100 text-sm md:text-base">Get access to our full library of premium resources, including exclusive courses, assessments, and simulations.</p>
            </div>
            <button className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-100 transition-colors self-start">Upgrade Now</button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {premiumResources.map(resource => (
            <ResourceCard key={resource.id} {...resource} hasImage />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <Pagination />
    </section>
  );
};

// Filter Select Component
interface FilterSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  className?: string;
}

const FilterSelect: React.FC<FilterSelectProps> = ({ label, value, options, onChange, className }) => (
  <div className={`flex items-center ${className}`}>
    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">{label}:</span>
    <select value={value} onChange={(e) => onChange(e.target.value)} className="bg-gray-100 dark:bg-gray-700 border border-gray-200/30 dark:border-gray-600/30 rounded-md text-sm py-1 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500">
      {options.map(option => <option key={option} value={option}>{option}</option>)}
    </select>
  </div>
);

// Resource Card Component
interface ResourceCardProps extends Resource {
  hasImage?: boolean;
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  title,
  description,
  type,
  duration,
  difficulty,
  rating,
  reviews,
  price,
  image,
  hasImage,
  isAIRecommended,
  addedDaysAgo,
  isNew,
  categoryColor
}) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200/30 dark:border-gray-700/30 overflow-hidden hover:shadow-md transition-shadow duration-300">
    {hasImage && image && (
      <div className="relative h-44">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-3 right-3">
          {isAIRecommended ? (
            <span className="inline-flex items-center justify-center h-8 w-8 bg-indigo-600 dark:bg-indigo-500 rounded-full text-xs font-medium text-white">AI</span>
          ) : (
            <span className="inline-flex items-center justify-center h-8 w-8 bg-white dark:bg-gray-800 rounded-full shadow">
              <svg className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            </span>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <span className={`inline-block px-2 py-1 bg-${categoryColor}-600 text-white text-xs font-medium rounded`}>{type}</span>
        </div>
      </div>
    )}
    <div className="p-4">
      {!hasImage && (
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-${categoryColor}-100 dark:bg-${categoryColor}-900/30 text-${categoryColor}-600 dark:text-${categoryColor}-400`}>
              {/* Icon would be added based on type */}
            </div>
            {isNew && <span className={`ml-3 text-xs font-medium text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full`}>New</span>}
          </div>
          {addedDaysAgo && (
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {addedDaysAgo}
            </div>
          )}
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{description}</p>
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
        <span className="flex items-center">
          <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          {duration}
        </span>
        <span className="flex items-center">
          <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
          {difficulty}
        </span>
        {rating > 0 ? (
          <span className="flex items-center">
            <svg className="h-4 w-4 mr-1 text-yellow-500" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            {rating} ({reviews})
          </span>
        ) : !hasImage && <span className={`inline-block px-2 py-1 bg-${categoryColor}-100 dark:bg-${categoryColor}-900/30 text-${categoryColor}-800 dark:text-${categoryColor}-400 text-xs font-medium rounded-full`}>{type}</span>}
      </div>
      <div className="flex items-center justify-between">
        <span className={`text-sm font-medium ${price === 'Free' ? 'text-green-600 dark:text-green-400' : 'text-indigo-600 dark:text-indigo-400'}`}>{price}</span>
        <div className="flex space-x-2">
          <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Resource Section Component
interface ResourceSectionProps {
  title: string;
  resources: Resource[];
  hasImages?: boolean;
  extra?: React.ReactNode;
}

const ResourceSection: React.FC<ResourceSectionProps> = ({ title, resources, hasImages, extra }) => (
  <div className="mb-10">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
      <div className="flex items-center">
        {extra}
        <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium">View All</button>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources.map(resource => (
        <ResourceCard key={resource.id} {...resource} hasImage={hasImages} />
      ))}
    </div>
  </div>
);

// Category Card Component
const CategoryCard: React.FC<ResourceCategory> = ({ name, count, icon, color }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200/30 dark:border-gray-700/30 p-4 text-center hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-colors cursor-pointer">
    <div className={`w-12 h-12 bg-${color}-100 dark:bg-${color}-900/30 rounded-full flex items-center justify-center mx-auto mb-3`}>
      <span className={`text-${color}-600 dark:text-${color}-400`}>{icon}</span>
    </div>
    <h3 className="text-sm font-medium text-gray-900 dark:text-white">{name}</h3>
    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{count} resources</p>
  </div>
);

// Pagination Component
const Pagination: React.FC = () => (
  <div className="flex justify-center mt-8">
    <nav className="inline-flex rounded-lg shadow-sm" aria-label="Pagination">
      <button className="px-3 py-2 rounded-l-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
        <span className="sr-only">Previous</span>
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
      </button>
      {[1, 2, 3].map(num => (
        <button key={num} className={`px-4 py-2 ${num === 1 ? 'bg-indigo-600 dark:bg-indigo-500 border-indigo-600 dark:border-indigo-500 text-white' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300'} border text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700`}>
          {num}
        </button>
      ))}
      <span className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400">...</span>
      <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">8</button>
      <button className="px-3 py-2 rounded-r-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
        <span className="sr-only">Next</span>
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
      </button>
    </nav>
  </div>
);