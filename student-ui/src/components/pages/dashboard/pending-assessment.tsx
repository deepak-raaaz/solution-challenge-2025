'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const PendingAssessment: React.FC = () => {
  const [showCard, setShowCard] = useState(true);

  if (!showCard) return null;

  return (
    <div
      className="relative p-6 rounded-xl border-2 "

    >
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1" style={{ color: '#E6E6E6' }}>
                Assessment Ready: Continue Your Journey
              </h3>
              <p className="text-sm opacity-75" style={{ color: '#E6E6E6' }}>
                Complete your assessment to unlock personalized learning
              </p>
            </div>
          </div>

          {/* Dismiss button */}
          <button
            className="p-2 rounded-lg hover:bg-neutral-700/50 transition-colors"
            onClick={() => setShowCard(false)}
            aria-label="Dismiss assessment card"
          >
            <svg
              className="w-5 h-5"
              style={{ color: '#E6E6E6' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Playlist Details */}
        <div className="mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <div
              className="w-16 h-16 rounded-lg overflow-hidden"
            >
              <img
                src="https://placehold.co/64x64/1E90FF/FFFFFF?text=ML"
                alt="Machine Learning"
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-1" style={{ color: '#E6E6E6' }}>
                Machine Learning Basics
              </h4>
              <p className="text-sm opacity-75 mb-2" style={{ color: '#E6E6E6' }}>
                You started an assessment for this playlist. Complete it to tailor your learning path!
              </p>
              <div className="flex items-center space-x-2">
                <span
                  className="text-xs px-2 py-1 rounded-full"
                  style={{ backgroundColor: '#1E90FF', color: 'white' }}
                >
                  Beginner
                </span>
                <span className="text-xs opacity-75" style={{ color: '#E6E6E6' }}>
                  15 modules • 8 hours
                </span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium" style={{ color: '#E6E6E6' }}>
                Assessment Progress
              </span>
              <span className="text-sm font-medium" style={{ color: '#1E90FF' }}>
                50% complete
              </span>
            </div>
            <div className="w-full h-2 rounded-full" style={{ backgroundColor: '#0E1217' }}>
              <div
                className="h-2 rounded-full transition-all duration-500"
                style={{ backgroundColor: '#1E90FF', width: '50%' }}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/create/assessment"
            className="flex-1 px-6 py-3 rounded-lg font-semibold text-center transition-all duration-200 hover:scale-105 hover:shadow-lg"
            style={{ backgroundColor: '#1E90FF', color: 'white' }}
          >
            Continue Assessment
          </Link>
          <button
            className="flex-1 px-6 py-3 rounded-lg font-semibold border-2 transition-all duration-200 hover:bg-neutral-700/50"
            style={{ color: '#E6E6E6', borderColor: '#E6E6E6' }}
            onClick={() => setShowCard(false)}
            aria-label="Remind me later"
          >
            Remind Me Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default PendingAssessment;