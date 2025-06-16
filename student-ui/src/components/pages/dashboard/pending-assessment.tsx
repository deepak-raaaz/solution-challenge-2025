'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const PendingAssessment: React.FC = () => {
  const [showCard, setShowCard] = useState(true);

  if (!showCard) return null;

  return (
    <div
      className="relative p-6 max-lg:p-4 rounded-xl border-1 border-gray-700/40 bg-gray-800/20 my-4"

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

          
        </div>

        {/* Playlist Details */}
        <div className="">
          <div className="flex items-end justify-between space-x-4 max-lg:flex-col max-lg:items-start max-lg:space-y-4">
            <div className="flex items-center space-x-4">
              <div
                className="w-16 h-16 rounded-lg overflow-hidden aspect-square"
              >
                <img
                  src="https://placehold.co/64x64/1E90FF/FFFFFF?text=ML"
                  alt="Machine Learning"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className=''>
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

            {/* Action Buttons */}
            <div className="flex  flex-col sm:flex-row gap-3 max-lg:w-full max-lg: justify-end">
              <Button>
                Continue Assessment
              </Button>
              <Button
                variant="secondary"
              >
                Remind Me Later
              </Button>
            </div>
          </div>


        </div>

      </div>
    </div>
  );
};

export default PendingAssessment;