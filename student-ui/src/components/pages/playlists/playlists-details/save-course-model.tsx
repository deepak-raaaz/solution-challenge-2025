import React, { useEffect } from 'react';
import { XMarkIcon, CheckIcon } from '@heroicons/react/20/solid';

interface SaveCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToDashboard: () => void;
}

const SaveCourseModal: React.FC<SaveCourseModalProps> = ({ isOpen, onClose, onGoToDashboard }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="save-course-modal"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
      aria-modal="true"
      aria-hidden={!isOpen}
    >
      <div
        className="bg-gray-800 border border-gray-700 rounded-lg p-8 max-w-md w-full mx-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckIcon className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Course Saved Successfully!</h3>
          <p className="text-gray-300 mb-6">
            Your Machine Learning course has been saved to your dashboard. You can start learning anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onGoToDashboard}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors duration-200"
            >
              Go to Dashboard
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white rounded-lg font-semibold transition-colors duration-200"
            >
              Continue Here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveCourseModal;