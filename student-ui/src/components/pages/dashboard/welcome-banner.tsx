interface WelcomeBannerProps {
    onStartLearning: () => void;
}

export default function WelcomeBanner({ onStartLearning }: WelcomeBannerProps) {
    return (
        <div className="bg-gradient-to-r from-gray-800/20 to-[#1E90FF]/20 rounded-xl p-8 mb-8 border border-gray-700/40">
            <div className="flex flex-col lg:flex-row items-center justify-between">
                <div className="lg:w-2/3 mb-6 lg:mb-0 max-sm:mb-0">
                    <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-[#a75757] to-[#1E90FF] bg-clip-text text-transparent">
                        Master High-Demand Skills
                    </h1>
                    <p className="text-lg text-neutral-300 mb-6">
                        AI-powered learning platform with curated courses from top educators. Start your journey today.
                    </p>
                    <button
                        onClick={onStartLearning}
                        className="bg-[#1E90FF] hover:bg-[#1E90FF]/80 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl"
                    >
                        Start Learning
                    </button>
                </div>
                <div className="lg:w-1/3  flex justify-center max-sm:hidden">
                    <div className="relative">
                        <div className="w-32 h-32 bg-[#1E90FF]/20 rounded-full flex items-center justify-center">
                            <svg
                                className="w-16 h-16 text-[#1E90FF]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}