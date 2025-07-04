import { useCompleteMarkMutation } from '@/redux/features/api/generate/generateApi';
import React, { useState } from 'react';

interface VideoContentProps {
  resource: any;
}

function formatTimeFromSeconds(seconds: number) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const parts = [];
  if (hrs > 0) parts.push(`${hrs} hr`);
  if (mins > 0) parts.push(`${mins} min`);
  if (secs > 0 && hrs === 0) parts.push(`${secs} sec`); // Only show seconds if under an hour

  return parts.join(" ");
}

function formatNumber(num: number) {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  return num.toString();
}

const VideoContent: React.FC<VideoContentProps> = ({ resource }) => {
  const [completeMark, { isLoading: isMarking, data: markData, error: markError }] = useCompleteMarkMutation();
  const [isWatched, setIsWatched] = useState(resource.status === 'completed');

  const handleMarkWatched = async () => {
    if (isWatched || isMarking) return; // Prevent action if already watched or marking

    try {
      await completeMark({ resourceId: resource._id }).unwrap();
      setIsWatched(true);
    } catch (err) {
      console.error('Failed to mark as watched:', markError || err);
      // Optionally show error to user (e.g., toast notification)
    }
  };

  return (
    <div className="bg-gray-800/20 border border-gray-700/40 rounded-lg w-full mx-auto">
      <div className="aspect-video bg-black rounded-t-lg">
        <iframe
          className="w-full h-full rounded-t-lg"
          src={`https://www.youtube.com/embed/${resource.resourceId.replace("youtube_", "")}`}
          frameBorder="0"
          allowFullScreen
          title={resource.title}
        />
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-100 mb-4">{resource.title}</h2>
        <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
          <div className="flex items-center space-x-2">
            <img
              src={`https://avatar.iran.liara.run/public/${Math.floor(Math.random() * 100)}`}
              alt={resource.metadata.channel}
              className="w-6 h-6 rounded-full mr-3"
            />
            <span>{resource.metadata.channel}</span>
          </div>
          <span>•</span>
          <span>{formatNumber(resource.metadata.views)} views</span>
          <span>•</span>
          <span>{formatTimeFromSeconds(resource.metadata.duration)}</span>
          <span>•</span>
          <span>Score: {resource.sentiment.score}</span>
        </div>
        <p className="text-gray-300 mb-6">{"description"}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors duration-200"
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
              <span>{formatNumber(resource.metadata.likes)}</span>
            </button>
            <button
              className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors duration-200"
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
              <span>{formatNumber(resource.metadata.commentCount)}</span>
            </button>
          </div>
          <button
            className={`px-6 py-2 rounded-lg transition-colors duration-200 ${isWatched
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            onClick={handleMarkWatched}
            disabled={isMarking || isWatched}
            aria-label={isWatched ? 'Video marked as watched' : 'Mark video as watched'}
          >
            {isMarking ? 'Marking...' : isWatched ? 'Watched' : 'Mark as Watched'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoContent;