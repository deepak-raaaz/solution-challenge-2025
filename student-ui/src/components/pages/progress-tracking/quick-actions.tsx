import { FC } from 'react';

const QuickActions: FC = () => {
  const handleStartStudy = () => {
    alert('Starting study session timer...');
  };

  const handleReviewProgress = () => {
    alert('Opening detailed progress report...');
  };

  const handleShareProgress = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Learning Progress',
        text: 'Check out my learning progress on LearnAI!',
        url: window.location.href,
      });
    } else {
      alert('Progress shared!');
    }
  };

  return (
    <div className="p-6 rounded-lg border bg-gray-800/20 border-gray-700/40 ">
      <h3 className="text-lg font-bold mb-4 text-[#E6E6E6]">Quick Actions</h3>
      <div className="space-y-3">
        <button
          onClick={handleStartStudy}
          className="w-full px-4 py-3 rounded-lg text-sm font-medium text-white bg-[#1E90FF] hover:opacity-90 transition-colors duration-200 flex items-center justify-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          Start Study Session
        </button>
        <button
          onClick={handleReviewProgress}
          className="w-full px-4 py-3 rounded-lg text-sm font-medium border border-gray-700/40 text-[#E6E6E6] hover:bg-gray-700/50 transition-colors duration-200 flex items-center justify-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
          View Detailed Report
        </button>
        <button
          onClick={handleShareProgress}
          className="w-full px-4 py-3 rounded-lg text-sm font-medium border border-gray-700/40 text-[#E6E6E6] hover:bg-gray-700/50 transition-colors duration-200 flex items-center justify-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
          </svg>
          Share Progress
        </button>
      </div>
    </div>
  );
};

export default QuickActions;