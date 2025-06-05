import React, { useState } from 'react';

interface ArticleContentProps {
  resource: {
    _id: string;
    resourceId: string;
    lessonId: string;
    title: string;
    type: string;
    status: string;
    url: string;
    thumbnailUrl: string;
    sentiment: {
      score: string;
      message: string;
      _id: string;
    };
    xpEarned: number;
    metadata: {
      source: string;
    };
    createdAt: string;
    updatedAt: string;
    __v: number;
    lesson: {
      _id: string;
      lessonId: string;
      moduleId: string;
      title: string;
      description: string;
      status: string;
      resourceIds: string[];
      quizId: string | null;
      topics: string[];
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
    module: {
      _id: string;
      moduleId: string;
      roadmapId: string;
      title: string;
      description: string;
      status: string;
      lessonIds: string[];
      quizId: string | null;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
    roadmap: {
      _id: string;
      userId: string;
      assessment: string;
      playlistPersonalization: string;
      title: string;
      description: string;
      overview: string;
      tags: string[];
      modules: string[];
      status: string;
      metadata: {
        totalXp: number;
        source: string;
      };
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
  };
}

const ArticleContent: React.FC<ArticleContentProps> = ({ resource }) => {
  const [isRead, setIsRead] = useState(resource.status === 'completed');
  const [likes, setLikes] = useState(Math.floor(Math.random() * 10000)); // Random likes for demo
  const [comments, setComments] = useState(Math.floor(Math.random() * 1000)); // Random comments for demo

  const handleMarkRead = () => setIsRead(!isRead);
  const handleLike = () => setLikes(likes + 1);
  const handleComment = () => setComments(comments + 1);

  // Format number for likes and comments
  const formatNumber = (num: number) => {
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
    return num.toString();
  };

  return (
    <div className="bg-gray-900/30 border border-gray-700/40 rounded-xl w-full mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative aspect-[16/9] bg-black rounded-t-lg overflow-hidden">
        <img
          src={resource.thumbnailUrl}
          alt={resource.title}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            <span>Read Article at {resource.metadata.source}</span>
          </a>
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-3xl font-bold text-gray-100 mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          {resource.title}
        </h2>
        <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
          <div className="flex items-center space-x-2">
            <img
              src={`https://avatar.iran.liara.run/public/${Math.floor(Math.random() * 100)}`}
              alt="Author"
              className="w-8 h-8 rounded-full border border-gray-600"
            />
            <span className="text-gray-200 font-medium">{resource.metadata.source}</span>
          </div>
          <span>•</span>
          <span>{new Date(resource.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <span>•</span>
          <span>XP: {resource.xpEarned}</span>
          <span>•</span>
          <span>Lesson: {resource.lesson.title}</span>
        </div>
        <p className="text-gray-300 mb-6">
          {resource.lesson.description} (Source: <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{resource.metadata.source}</a>)
        </p>
        <div className="bg-gray-800/50 border border-gray-700/70 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-100 mb-2">Context</h3>
          <p className="text-gray-300">
            Part of <span className="font-medium">{resource.roadmap.title}</span> roadmap, within the module <span className="font-medium">{resource.module.title}</span>.
            Status: <span className={`capitalize ${resource.status === 'locked' ? 'text-red-400' : 'text-green-400'}`}>{resource.status}</span>
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className="flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors duration-200"
              aria-label="Like article"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span>{formatNumber(likes)}</span>
            </button>
            <button
              onClick={handleComment}
              className="flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors duration-200"
              aria-label="Comment on article"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                />
              </svg>
              <span>{formatNumber(comments)}</span>
            </button>
          </div>
          <button
            onClick={handleMarkRead}
            disabled={resource.status === 'locked'}
            className={`px-6 py-2 rounded-lg transition-colors duration-200 ${
              resource.status === 'locked'
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : isRead
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            }`}
          >
            {isRead ? 'Read' : 'Mark as Read'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleContent;