"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { useMyRoadmapQuery } from '@/redux/features/api/generate/generateApi';
import Loader from '@/components/shared/loader';

// Interface for roadmap data
interface Roadmap {
    title: string;
    description: string;
    createdAt: string;
    roadmapId: string;
    moduleCount: number;
    lessonCount: number;
}

// Utility to truncate text
const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength - 3) + '...';
};

// MyLearningRoadmap Component
const MyLearningRoadmap: React.FC = () => {
    const router = useRouter();
    const { data, isLoading, error } = useMyRoadmapQuery({});

    // Handle navigation to roadmap or create page
    const handleNavigate = (path: string) => {
        router.push(path);
    };

    // Benefits for no-data card
    const benefits = [
        {
            emoji: '🎯',
            title: 'Tailored Learning Path',
            description: 'Create a roadmap customized to your goals and skill level.',
        },
        {
            emoji: '📈',
            title: 'Track Your Progress',
            description: 'Monitor your learning journey with clear milestones.',
        },
        {
            emoji: '📚',
            title: 'Curated Resources',
            description: 'Access free, high-quality videos and articles.',
        },
        {
            emoji: '🚀',
            title: 'Boost Your Skills',
            description: 'Gain practical knowledge to advance your career.',
        },
    ];

    if (isLoading) {
        return <Loader/>;
    }

    if (error || !data?.data) {
        return <div className="min-h-screen py-20 text-red-500 text-center text-xl">Error loading roadmaps</div>;
    }

    return (
        <section className="min-h-screen  p-6 py-20">
            <div className="max-w-6xl mx-auto">
                {/* Header */}


                {/* Roadmaps or No-Data Card */}
                {data.data.length > 0 ? (
                    <>
                        <header className="text-center mb-12">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">My Learning Roadmaps</h1>
                            <p className="text-gray-400 text-lg">Embark on your personalized learning journey to master new skills!</p>
                        </header>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {data.data.map((roadmap: Roadmap) => (
                                <div
                                    key={roadmap.roadmapId}
                                    className="bg-gray-800/20 border border-gray-700/40 rounded-lg p-6 transform transition-transform hover:scale-105"
                                    role="article"
                                    aria-labelledby={`roadmap-title-${roadmap.roadmapId}`}
                                >
                                    <h2
                                        id={`roadmap-title-${roadmap.roadmapId}`}
                                        className="text-xl font-bold text-gray-100 mb-2"
                                    >
                                        {roadmap.title}
                                    </h2>
                                    <p className="text-gray-400 text-sm mb-4">
                                        {truncateText(roadmap.description, 120)}
                                    </p>
                                    <div className="flex flex-wrap items-center text-sm text-gray-500 mb-4 gap-4">
                                        <span>
                                            {new Date(roadmap.createdAt).toLocaleDateString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric',
                                            })}
                                        </span>
                                        <span>•</span>
                                        <span>{roadmap.moduleCount} Modules</span>
                                        <span>•</span>
                                        <span>{roadmap.lessonCount} Lessons</span>
                                    </div>
                                    <button
                                        className="w-full px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors duration-200"
                                        onClick={() => handleNavigate(`/learning-roadmap/${roadmap.roadmapId}`)}
                                        aria-label={`Continue learning ${roadmap.title}`}
                                    >
                                        Continue Learning
                                    </button>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="max-w-3xl mx-auto bg-gray-800/20 border border-gray-700/40 rounded-xl p-8 text-center transform transition-transform  my-20">
                        <h2 className="text-2xl font-bold text-gray-100 mb-4">No Learning Roadmaps Yet!</h2>
                        <p className="text-gray-400 mb-6">
                            You have not created a learning roadmap. Start your personalized learning journey today!
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                            {benefits.map((benefit, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-700/20 p-4 rounded-lg flex items-start space-x-3"
                                >
                                    <span className="text-2xl">{benefit.emoji}</span>
                                    <div className="text-left">
                                        <h3 className="text-gray-100 font-semibold">{benefit.title}</h3>
                                        <p className="text-gray-400 text-sm">{benefit.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button
                            className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors duration-200"
                            onClick={() => handleNavigate('/generate')}
                            aria-label="Create a new learning roadmap"
                        >
                            Create Now
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default MyLearningRoadmap;