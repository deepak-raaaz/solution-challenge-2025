// app/playlists/page.tsx
'use client';

import { useState } from 'react';

interface Playlist {
  id: string;
  title: string;
  description: string;
  image: string;
  videos: number;
  mentor: string;
  mentorAvatar: string;
  level: string;
  likes: string;
  comments: number;
  shares: number;
  category: string;
}

const categories = [
  'All Playlists',
  'Web Development',
  'Machine Learning',
  'Blockchain',
  'Data Science',
];

const playlists: Playlist[] = [
  {
    id: '1',
    title: 'Modern Web Development',
    description: 'Master HTML, CSS, JavaScript and modern frameworks',
    image: 'https://placehold.co/600x400?text=Web+Development',
    videos: 12,
    mentor: 'Sarah Johnson',
    mentorAvatar: 'https://placehold.co/40x40',
    level: 'Beginner',
    likes: '2.3k',
    comments: 148,
    shares: 56,
    category: 'Web Development',
  },
  {
    id: '2',
    title: 'Machine Learning Fundamentals',
    description: 'Learn Python, data analysis, and ML algorithms',
    image: 'https://placehold.co/600x400?text=Machine+Learning',
    videos: 15,
    mentor: 'Michael Chen',
    mentorAvatar: 'https://placehold.co/40x40',
    level: 'Intermediate',
    likes: '3.5k',
    comments: 256,
    shares: 129,
    category: 'Machine Learning',
  },
  {
    id: '3',
    title: 'Blockchain Development',
    description: 'Build decentralized applications with smart contracts',
    image: 'https://placehold.co/600x400?text=Blockchain',
    videos: 9,
    mentor: 'Alex Rodriguez',
    mentorAvatar: 'https://placehold.co/40x40',
    level: 'Advanced',
    likes: '1.8k',
    comments: 98,
    shares: 74,
    category: 'Blockchain',
  },
  {
    id: '4',
    title: 'Data Science for Everyone',
    description: 'Statistics, visualization, and practical applications',
    image: 'https://placehold.co/600x400?text=Data+Science',
    videos: 18,
    mentor: 'Emily Patel',
    mentorAvatar: 'https://placehold.co/40x40',
    level: 'Beginner-Intermediate',
    likes: '4.2k',
    comments: 312,
    shares: 185,
    category: 'Data Science',
  },
  {
    id: '5',
    title: 'React Native Masterclass',
    description: 'Build cross-platform mobile apps with JavaScript',
    image: 'https://placehold.co/600x400?text=Mobile+Development',
    videos: 14,
    mentor: 'David Kim',
    mentorAvatar: 'https://placehold.co/40x40',
    level: 'Intermediate',
    likes: '2.7k',
    comments: 178,
    shares: 92,
    category: 'Web Development',
  },
  {
    id: '6',
    title: 'AWS Cloud Essentials',
    description: 'Learn cloud infrastructure and deployment',
    image: 'https://placehold.co/600x400?text=Cloud+Computing',
    videos: 11,
    mentor: 'Sophia Williams',
    mentorAvatar: 'https://placehold.co/40x40',
    level: 'Beginner',
    likes: '1.9k',
    comments: 112,
    shares: 63,
    category: 'Data Science',
  },
  {
    id: '7',
    title: 'UI/UX Design Fundamentals',
    description: 'Master interface design principles and user experience',
    image: 'https://placehold.co/600x400?text=UI/UX+Design',
    videos: 16,
    mentor: 'Jessica Torres',
    mentorAvatar: 'https://placehold.co/40x40',
    level: 'All Levels',
    likes: '3.8k',
    comments: 284,
    shares: 147,
    category: 'Web Development',
  },
  {
    id: '8',
    title: 'Ethical Hacking 101',
    description: 'Learn security principles and penetration testing',
    image: 'https://placehold.co/600x400?text=Cybersecurity',
    videos: 13,
    mentor: 'Marcus Johnson',
    mentorAvatar: 'https://placehold.co/40x40',
    level: 'Intermediate-Advanced',
    likes: '2.5k',
    comments: 167,
    shares: 89,
    category: 'Data Science',
  },
];

const PlaylistCard: React.FC<{ playlist: Playlist }> = ({ playlist }) => (
  <div className="  rounded-xl shadow-md hover:shadow-lg transition overflow-hidden border border-gray-200/30 dark:border-gray-700/30">
    <div className="relative">
      <div className="aspect-video overflow-hidden">
        <img src={playlist.image} alt={`${playlist.title} Playlist`} className="w-full h-full object-cover" />
      </div>
      <div className="absolute bottom-2 right-2 bg-gray-900/80 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
        {playlist.videos} videos
      </div>
    </div>
    
    <div className="p-4">
      <div className="flex items-center mb-3">
        <div className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-400 text-xs px-2 py-1 rounded-full flex items-center">
          <svg className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Mentor Certified
        </div>
        <div className="ml-auto text-xs text-gray-500 dark:text-gray-400">{playlist.level}</div>
      </div>
      
      <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">{playlist.title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{playlist.description}</p>
      
      <div className="flex items-center mb-4">
        <img src={playlist.mentorAvatar} alt={`${playlist.mentor} Avatar`} className="h-8 w-8 rounded-full mr-2" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{playlist.mentor}</span>
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center">
          <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span>{playlist.likes}</span>
        </div>
        <div className="flex items-center">
          <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span>{playlist.comments}</span>
        </div>
        <div className="flex items-center">
          <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          <span>{playlist.shares}</span>
        </div>
      </div>
    </div>
    
    <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/80 border-t border-gray-200/30 dark:border-gray-700/30">
      <button className="w-full py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg transition flex items-center justify-center">
        <svg className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
        </svg>
        Start Learning
      </button>
    </div>
  </div>
);

export default function Playlists() {
  const [selectedCategory, setSelectedCategory] = useState('All Playlists');
  
  const filteredPlaylists = selectedCategory === 'All Playlists'
    ? playlists
    : playlists.filter(playlist => playlist.category === selectedCategory);

  return (
    <section className="py-12 md:py-16 ">
      <div className="container mx-auto px-4">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Learning Playlists
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
            Explore curated learning playlists created by top mentors. Master high-demand skills with structured, step-by-step guidance.
          </p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Playlists Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPlaylists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-10 text-center">
          <button className="px-6 py-3 bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 font-medium rounded-lg border border-indigo-200 dark:border-indigo-800/30 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition">
            Load More Playlists
          </button>
        </div>
      </div>
    </section>
  );
}