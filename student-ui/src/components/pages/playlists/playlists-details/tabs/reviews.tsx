'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Review {
  id: number;
  userName: string;
  avatarUrl: string;
  rating: number;
  comment: string;
  timestamp: string;
  likes: number;
}

const initialReviews: Review[] = [
  {
    id: 1,
    userName: 'Sarah Chen',
    avatarUrl: 'https://avatar.iran.liara.run/public/10',
    rating: 5,
    comment: "Excellent overview of AI's future potential. The course is well-structured and provides valuable insights into both opportunities and challenges.",
    timestamp: '2 days ago',
    likes: 12,
  },
  {
    id: 2,
    userName: 'Alex Rodriguez',
    avatarUrl: 'https://avatar.iran.liara.run/public/11',
    rating: 4,
    comment: 'Great content for beginners. Would love to see more technical deep-dives in future updates.',
    timestamp: '1 week ago',
    likes: 8,
  },
];

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  const handleLike = (id: number) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === id ? { ...review, likes: review.likes + 1 } : review
      )
    );
  };

  const handleReply = (id: number) => {
    // Placeholder for reply functionality
    alert(`Replying to review ${id}`);
  };

  const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div id="reviews" className="space-y-6 max-md:space-y-3 bg-gray-800/10 border border-gray-700/40 p-4 rounded-lg ">
      <h1 className='text-xl font-semibold mx-2'>Reviews</h1>
      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-gray-800/20 border border-gray-700/40 rounded-xl p-6 transition-all hover:shadow-lg"
        >
          <div className="flex items-start space-x-4">
            <div className="relative w-12 h-12">
              <Image
                src={review.avatarUrl}
                alt={`${review.userName}'s avatar`}
                fill
                className="rounded-full object-cover"
                sizes="48px"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h5 className="font-semibold text-gray-100">{review.userName}</h5>
                <div className="text-yellow-400 text-lg">{renderStars(review.rating)}</div>
              </div>
              <p className="text-gray-300 mb-2">{review.comment}</p>
              <div className="flex items-center space-x-4 text-gray-400 text-sm">
                <span>{review.timestamp}</span>
                <button
                  onClick={() => handleLike(review.id)}
                  className="hover:text-gray-300 transition-colors"
                  aria-label={`Like review by ${review.userName}`}
                >
                  👍 {review.likes}
                </button>
                <button
                  onClick={() => handleReply(review.id)}
                  className="hover:text-gray-300 transition-colors"
                  aria-label={`Reply to review by ${review.userName}`}
                >
                  Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;