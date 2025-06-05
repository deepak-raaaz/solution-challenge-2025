import React, { useState } from 'react';

interface VideoContentProps {
  videoId: string;
  title: string;
  instructor: string;
  avatarUrl: string;
  duration: string;
  level: string;
  description: string;
  initialLikes?: number;
  initialComments?: number;
}

const VideoContent: React.FC<VideoContentProps> = ({
  videoId,
  title,
  instructor,
  avatarUrl,
  duration,
  level,
  description,
  initialLikes = 1200,
  initialComments = 89,
}) => {
  const [likes, setLikes] = useState(initialLikes);
  const [comments, setComments] = useState(initialComments);
  const [isWatched, setIsWatched] = useState(false);

  const handleLike = () => setLikes(likes + 1);
  const handleComment = () => setComments(comments + 1);
  const handleMarkWatched = () => setIsWatched(!isWatched);

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg max-w-3xl mx-auto">
      <div className="aspect-video bg-black rounded-t-lg">
        <iframe
          className="w-full h-full rounded-t-lg"
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allowFullScreen
          title={title}
        />
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-100 mb-4">{title}</h2>
        <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
          <div className="flex items-center space-x-2">
            <img
              src={avatarUrl}
              alt={instructor}
              className="w-6 h-6 rounded-full"
              loading="lazy"
            />
            <span>{instructor}</span>
          </div>
          <span>•</span>
          <span>{duration}</span>
          <span>•</span>
          <span>{level}</span>
        </div>
        <p className="text-gray-300 mb-6">{description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors duration-200"
              onClick={handleLike}
              aria-label="Like video"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span>{likes.toLocaleString()}</span>
            </button>
            <button
              className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors duration-200"
              onClick={handleComment}
              aria-label="Comment on video"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                />
              </svg>
              <span>{comments.toLocaleString()}</span>
            </button>
          </div>
          <button
            className={`px-6 py-2 rounded-lg transition-colors duration-200 ${
              isWatched
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
            onClick={handleMarkWatched}
          >
            {isWatched ? 'Watched' : 'Mark as Watched'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoContent;