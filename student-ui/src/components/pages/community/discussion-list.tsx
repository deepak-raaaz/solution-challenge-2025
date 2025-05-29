'use client';

import { useState } from 'react';
import { DiscussionPost, FeaturedDiscussion } from './community-type';

interface DiscussionListProps {
//   posts: DiscussionPost[];
//   featured: FeaturedDiscussion;
  likes: { [key: number]: number };
  onLikePost: (postId: number) => void;
  onReplyPost: (postId: number) => void;
  onSharePost: (postId: number) => void;
  onBookmarkPost: (postId: number) => void;
}

const featuredDiscussion: FeaturedDiscussion = {
  tags: ['Featured', 'Machine Learning'],
  title: 'Weekly ML Study Group - Feature Engineering Deep Dive',
  description: 'Join us for an interactive session on advanced feature engineering techniques. We\'ll cover polynomial features, interaction terms, and domain-specific transformations.',
  host: 'Dr. Sarah Chen',
  hostAvatar: 'https://avatar.iran.liara.run/public/40',
  time: 'Tomorrow 3:00 PM',
  participants: 45,
};

const initialPosts: DiscussionPost[] = [
  {
    id: 1,
    author: 'Alex Rodriguez',
    avatar: 'https://avatar.iran.liara.run/public/42',
    level: 'Verified Learner',
    levelColor: 'bg-green-600 text-white',
    time: '2 hours ago',
    tags: ['Data Science', 'Question'],
    title: 'Best practices for handling missing data in time series?',
    content: 'I\'m working on a stock price prediction model and have about 15% missing values in my dataset. What are the most effective imputation techniques for time series data? Should I use forward fill, interpolation, or something more sophisticated?',
    likes: 23,
    replies: [
      {
        id: 1,
        author: 'Dr. Maria Santos',
        avatar: 'https://avatar.iran.liara.run/public/45',
        level: 'ML Expert',
        levelColor: 'bg-yellow-600 text-white',
        time: '1 hour ago',
        content: 'For time series with 15% missing values, I\'d recommend a combination approach: use linear interpolation for short gaps (<3 consecutive missing values) and seasonal decomposition + interpolation for longer gaps. Avoid forward fill as it can introduce bias in financial data.',
        likes: 15,
      },
    ],
  },
  {
    id: 2,
    author: 'Emma Thompson',
    avatar: 'https://avatar.iran.liara.run/public/48',
    level: 'Study Group Leader',
    levelColor: 'bg-blue-600 text-white',
    time: '4 hours ago',
    tags: ['Web Development', 'Discussion'],
    title: 'React vs Vue.js in 2024 - Which should beginners choose?',
    content: 'Starting a new discussion about frontend frameworks. I\'ve been teaching web development for 3 years and often get asked about React vs Vue.js. What\'s your experience? Which would you recommend for someone just starting out?',
    likes: 34,
    replies: [],
  },
  {
    id: 3,
    author: 'David Kim',
    avatar: 'https://avatar.iran.liara.run/public/50',
    level: 'Blockchain Enthusiast',
    levelColor: 'bg-purple-600 text-white',
    time: '6 hours ago',
    tags: ['Blockchain', 'Help Needed'],
    title: 'Smart contract deployment failing on testnet',
    content: 'I\'m trying to deploy my first smart contract on Goerli testnet but keep getting "out of gas" errors. I\'ve set the gas limit to 3000000 but it\'s still failing. Any ideas what might be wrong?',
    errorLog: `Error: Transaction reverted without a reason string
    at Contract.deploy (contracts/MyContract.sol:15:3)`,
    likes: 8,
    replies: [],
    urgent: true,
  },
];

export default function DiscussionList({
  likes,
  onLikePost,
  onReplyPost,
  onSharePost,
  onBookmarkPost,
}: DiscussionListProps) {
  const [activeTab, setActiveTab] = useState('all');
  const [posts, setPosts] = useState<DiscussionPost[]>(initialPosts);
  const [newReply, setNewReply] = useState<{ [key: number]: string }>({});
  const [showMore, setShowMore] = useState(false);

  const handleTabSwitch = (tab: string) => {
    setActiveTab(tab);
    // Implement filtering logic based on tab
    console.log(`Switched to tab: ${tab}`);
  };

  const handleReplySubmit = (postId: number) => {
    if (!newReply[postId]?.trim()) return;

    const newReplyObj = {
      id: Date.now(),
      author: 'Current User', // Replace with actual user data
      avatar: 'https://avatar.iran.liara.run/public/99',
      level: 'User',
      levelColor: 'bg-gray-600 text-white',
      time: 'Just now',
      content: newReply[postId],
      likes: 0,
    };

    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, replies: [...post.replies, newReplyObj] }
          : post
      )
    );
    setNewReply((prev) => ({ ...prev, [postId]: '' }));
    onReplyPost(postId);
  };

  const handleReplyLike = (postId: number, replyId: number) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              replies: post.replies.map((reply) =>
                reply.id === replyId ? { ...reply, likes: reply.likes + 1 } : reply
              ),
            }
          : post
      )
    );
  };

  const handleCopyErrorLog = (errorLog: string) => {
    navigator.clipboard.writeText(errorLog);
    console.log('Error log copied to clipboard');
  };

  const handleJoinSession = () => {
    console.log('Joining featured session');
    // Implement join session logic
  };

  const filteredPosts = () => {
    switch (activeTab) {
      case 'my-groups':
        return posts.filter((post) => post.tags.includes('Web Development')); // Example filter
      case 'trending':
        return posts.filter((post) => post.likes > 20); // Example filter
      case 'unanswered':
        return posts.filter((post) => post.replies.length === 0);
      default:
        return posts;
    }
  };

  return (
    <div className="lg:col-span-3">
      {/* Filter Tabs */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-800/20 border border-gray-700/40 p-1 rounded-lg">
          {['all', 'my-groups', 'trending', 'unanswered'].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabSwitch(tab)}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors duration-200 ${
                activeTab === tab ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-gray-100'
              }`}
            >
              {tab
                .split('-')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Discussion */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900/40 border border-blue-700/20 rounded-lg p-6 mb-6">
        <div className="flex items-center space-x-2 mb-3">
          {featuredDiscussion.tags.map((tag, index) => (
            <span
              key={index}
              className={`text-xs px-2 py-1 rounded ${
                tag === 'Featured' ? 'bg-yellow-600 text-white' : 'bg-blue-600 text-white'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-semibold text-gray-100 mb-2">{featuredDiscussion.title}</h3>
        <p className="text-gray-300 mb-4">{featuredDiscussion.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <img
                src={featuredDiscussion.hostAvatar}
                alt={featuredDiscussion.host}
                className="w-6 h-6 rounded-full"
              />
              <span>{featuredDiscussion.host}</span>
            </div>
            <span>•</span>
            <span>{featuredDiscussion.time}</span>
            <span>•</span>
            <span>{featuredDiscussion.participants} participants</span>
          </div>
          <button
            onClick={handleJoinSession}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200"
          >
            Join Session
          </button>
        </div>
      </div>

      {/* Discussion Threads */}
      <div id="discussions-content" className="space-y-4">
        {filteredPosts().slice(0, showMore ? undefined : 3).map((post) => (
          <div key={post.id} className="bg-gray-800/20 border border-gray-700/40 rounded-lg p-6 ">
            <div className="flex items-start space-x-4">
              <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full" />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-semibold text-gray-100">{post.author}</h4>
                  <span className={`text-xs px-2 py-1 rounded ${post.levelColor}`}>
                    {post.level}
                  </span>
                  <span className="text-gray-400 text-sm">{post.time}</span>
                </div>
                <div className="flex items-center space-x-2 mb-3">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`text-xs px-2 py-1 rounded ${
                        tag === 'Question'
                          ? 'bg-gray-600 text-gray-300'
                          : tag === 'Discussion'
                          ? 'bg-gray-600 text-gray-300'
                          : tag === 'Help Needed'
                          ? 'bg-red-600 text-white'
                          : 'bg-purple-600 text-white'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                  {post.urgent && (
                    <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">
                      Urgent
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-medium text-gray-100 mb-2 wrap-normal">{post.title}</h3>
                <p className="text-gray-300 mb-4">{post.content}</p>

                {post.errorLog && (
                  <div className="bg-gray-900 border border-gray-600 rounded p-3 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300 text-sm">Error Log</span>
                      <button
                        onClick={() => handleCopyErrorLog(post.errorLog!)}
                        className="text-blue-400 hover:text-blue-300 text-xs"
                      >
                        Copy
                      </button>
                    </div>
                    <span className="text-red-400 text-xs flex">{post.errorLog}</span>
                  </div>
                )}

                <div className="flex items-center space-x-6 text-sm text-gray-400">
                  <button
                    onClick={() => onLikePost(post.id)}
                    className="flex items-center space-x-1 hover:text-blue-400 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <span>{likes[post.id] || post.likes}</span>
                  </button>
                  <button
                    onClick={() => onReplyPost(post.id)}
                    className="flex items-center space-x-1 hover:text-blue-400 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <span>{post.replies.length} replies</span>
                  </button>
                  <button
                    onClick={() => onSharePost(post.id)}
                    className="flex items-center space-x-1 hover:text-blue-400 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                      />
                    </svg>
                    <span>Share</span>
                  </button>
                  <button
                    onClick={() => onBookmarkPost(post.id)}
                    className="flex items-center space-x-1 hover:text-blue-400 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                      />
                    </svg>
                    <span>Save</span>
                  </button>
                </div>

                {/* Replies */}
                {post.replies.map((reply) => (
                  <div key={reply.id} className="mt-4 pl-4 border-l-2 dark:border-blue-400">
                    <div className="bg-gray-700/20 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <img
                          src={reply.avatar}
                          alt={reply.author}
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="font-medium text-gray-100">{reply.author}</span>
                        <span className={`text-xs px-2 py-1 rounded ${reply.levelColor}`}>
                          {reply.level}
                        </span>
                        <span className="text-gray-400 text-xs">{reply.time}</span>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{reply.content}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-400">
                        <button
                          onClick={() => handleReplyLike(post.id, reply.id)}
                          className="flex items-center space-x-1 hover:text-green-400 transition-colors duration-200"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                          <span>{reply.likes}</span>
                        </button>
                        <button className="hover:text-blue-400 transition-colors duration-200">
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Reply Input */}
                <div className="mt-4">
                  <textarea
                    value={newReply[post.id] || ''}
                    onChange={(e) =>
                      setNewReply((prev) => ({ ...prev, [post.id]: e.target.value }))
                    }
                    placeholder="Write a reply..."
                    className="w-full p-3 rounded-lg border-2 bg-gray-950 text-gray-200 border-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => handleReplySubmit(post.id)}
                    className="mt-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
                  >
                    Submit Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="text-center">
          <button
            onClick={() => setShowMore(true)}
            className={`bg-gray-700 hover:bg-gray-600 text-gray-100 px-6 py-3 rounded-lg transition-colors duration-200 ${
              showMore ? 'hidden' : ''
            }`}
          >
            Load More Discussions
          </button>
        </div>
      </div>
    </div>
  );
}