// app/learning-communities/page.tsx
'use client';

import { useState } from 'react';

interface DiscussionGroup {
  id: number;
  title: string;
  category: string;
  description: string;
  members: number;
  online: number;
  rating: number;
  gradient: string;
  topics: string[];
  categoryColor: {
    light: string;
    dark: string;
    textLight: string;
    textDark: string;
  };
}

const discussionGroups: DiscussionGroup[] = [
  {
    id: 1,
    title: 'JavaScript Mastery',
    category: 'Web Development',
    description: 'Discuss modern JavaScript concepts, frameworks, and best practices with peers and expert mentors.',
    members: 1248,
    online: 128,
    rating: 5,
    gradient: 'from-blue-600 to-indigo-600',
    topics: ['React Hooks Best Practices', 'Async/Await Patterns', 'TypeScript Integration'],
    categoryColor: { light: 'bg-blue-100', dark: 'bg-blue-900/40', textLight: 'text-blue-800', textDark: 'text-blue-400' },
  },
  {
    id: 2,
    title: 'ML Enthusiasts',
    category: 'Machine Learning',
    description: 'Connect with ML practitioners to discuss algorithms, frameworks, and real-world applications.',
    members: 873,
    online: 84,
    rating: 4,
    gradient: 'from-purple-600 to-pink-600',
    topics: ['TensorFlow vs. PyTorch', 'Computer Vision Projects', 'NLP Breakthroughs'],
    categoryColor: { light: 'bg-purple-100', dark: 'bg-purple-900/40', textLight: 'text-purple-800', textDark: 'text-purple-400' },
  },
  {
    id: 3,
    title: 'Blockchain Innovators',
    category: 'Blockchain',
    description: 'Explore blockchain technology, crypto developments, and decentralized applications.',
    members: 642,
    online: 56,
    rating: 4,
    gradient: 'from-amber-500 to-orange-600',
    topics: ['Smart Contract Security', 'DeFi Protocols', 'NFT Development'],
    categoryColor: { light: 'bg-amber-100', dark: 'bg-amber-900/40', textLight: 'text-amber-800', textDark: 'text-amber-400' },
  },
  {
    id: 4,
    title: 'Data Science Hub',
    category: 'Data Science',
    description: 'Explore data analysis, visualization, and statistical modeling with fellow data enthusiasts.',
    members: 958,
    online: 92,
    rating: 4,
    gradient: 'from-teal-500 to-emerald-500',
    topics: ['Data Visualization Trends', 'Python vs. R for Data Science', 'Feature Engineering Tips'],
    categoryColor: { light: 'bg-teal-100', dark: 'bg-teal-900/40', textLight: 'text-teal-800', textDark: 'text-teal-400' },
  },
  {
    id: 5,
    title: 'Design Thinkers',
    category: 'UI/UX Design',
    description: 'Share design work, get feedback, and discuss user experience best practices.',
    members: 765,
    online: 78,
    rating: 5,
    gradient: 'from-pink-500 to-rose-500',
    topics: ['Figma Prototyping Techniques', 'Design Systems at Scale', 'Accessibility in UI Design'],
    categoryColor: { light: 'bg-pink-100', dark: 'bg-pink-900/40', textLight: 'text-pink-800', textDark: 'text-pink-400' },
  },
  {
    id: 6,
    title: 'Cloud Computing Pros',
    category: 'Cloud Computing',
    description: 'Discuss AWS, Azure, GCP, and other cloud platforms for deployments and infrastructure.',
    members: 582,
    online: 47,
    rating: 4,
    gradient: 'from-sky-500 to-blue-600',
    topics: ['Serverless Architecture', 'Kubernetes vs. ECS', 'Cloud Cost Optimization'],
    categoryColor: { light: 'bg-sky-100', dark: 'bg-sky-900/40', textLight: 'text-sky-800', textDark: 'text-sky-400' },
  },
];

const DiscussionGroupCard: React.FC<{ group: DiscussionGroup }> = ({ group }) => (
  <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-sm hover:shadow-md transition border border-gray-200/30 dark:border-gray-700/30 overflow-hidden">
    <div className={`h-32 bg-gradient-to-r ${group.gradient} relative`}>
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
        <h3 className="text-xl font-bold text-white">{group.title}</h3>
        <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
          {group.members.toLocaleString()} members
        </span>
      </div>
    </div>
    <div className="p-4">
      <div className="flex items-center mb-3">
        <div className={`${group.categoryColor.light} dark:${group.categoryColor.dark} ${group.categoryColor.textLight} dark:${group.categoryColor.textDark} text-xs px-2.5 py-1 rounded-full`}>
          {group.category}
        </div>
        <div className="ml-2 flex items-center text-amber-500">
          {Array(5).fill(0).map((_, i) => (
            <svg key={i} className={`h-4 w-4 ${i >= group.rating ? 'text-gray-300 dark:text-gray-600' : ''}`} viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{group.description}</p>
      <div className="mb-4">
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Recent topics:</div>
        <div className="space-y-1">
          {group.topics.map((topic) => (
            <div key={topic} className="text-sm text-gray-800 dark:text-gray-200 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
              {topic}
            </div>
          ))}
        </div>
      </div>
      <div className="flex -space-x-2 mb-4">
        {Array(3).fill(0).map((_, i) => (
          <img key={i} src="https://placehold.co/40x40" alt="Member" className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800" />
        ))}
        <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-gray-100 dark:bg-gray-700 text-xs text-gray-500 dark:text-gray-400">
          +{Math.max(0, group.members - 3)}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          <span className="text-green-500">●</span> {group.online} online now
        </div>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition">
          Join Group
        </button>
      </div>
    </div>
  </div>
);

export default function LearningCommunities() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section className="py-12 md:py-16 ">
      <div className="container mx-auto px-4">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Learning Communities</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
            Join discussion groups to collaborate with peers, get help from mentors, and accelerate your learning journey together.
          </p>
        </div>

        {/* Filter and Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {['All Groups', 'My Groups', 'Most Active', 'Newest'].map((filter) => (
              <button
                key={filter}
                className={`px-4 py-2 rounded-full font-medium transition ${
                  filter === 'All Groups'
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="w-full md:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search discussion groups..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600"
              />
              <div className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400">
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Discussion Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {discussionGroups
            .filter((group) => group.title.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((group) => (
              <DiscussionGroupCard key={group.id} group={group} />
            ))}
        </div>

        {/* Create Your Own Group */}
        <div className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl overflow-hidden shadow-md relative">
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-white max-w-2xl">
              <h3 className="text-2xl font-bold mb-2">Can&apos;t find what you&apos;re looking for?</h3>
              <p className="text-indigo-100">Create your own learning community and invite peers with similar interests. Lead discussions, share resources, and grow together.</p>
            </div>
            <button className="whitespace-nowrap px-6 py-3 bg-white hover:bg-gray-100 text-indigo-700 font-bold rounded-lg shadow-md transition">
              Create a Group
            </button>
          </div>
        </div>

        {/* AI-Powered Suggestions */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Recommended for You</h3>
            <button className="text-indigo-600 dark:text-indigo-400 font-medium text-sm hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center">
              <span>View All</span>
              <svg className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'React Developers', basis: 'Based on your interest in JavaScript Mastery', color: 'indigo' },
              { title: 'Python for AI', basis: 'Based on your Machine Learning courses', color: 'purple' },
              { title: 'Web3 Builders', basis: 'Based on your Blockchain activities', color: 'green' },
            ].map((suggestion) => (
              <div key={suggestion.title} className="flex gap-3 p-4 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200/30 dark:border-gray-700/30">
                <div className={`w-12 h-12 rounded-full bg-${suggestion.color}-100 dark:bg-${suggestion.color}-900/50 flex items-center justify-center text-${suggestion.color}-600 dark:text-${suggestion.color}-400 shrink-0`}>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">{suggestion.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{suggestion.basis}</p>
                  <button className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:text-indigo-700 dark:hover:text-indigo-300">Join Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <nav className="flex items-center">
            <button className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={`px-3 py-1 mx-1 rounded-md ${page === 1 ? 'bg-indigo-600 text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition'}`}
              >
                {page}
              </button>
            ))}
            <span className="px-3 py-1 mx-1 text-gray-500 dark:text-gray-400">...</span>
            <button className="px-3 py-1 mx-1 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition">8</button>
            <button className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </section>
  );
}