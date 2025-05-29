import { FC, FormEvent, useEffect, useRef } from 'react';

interface GoalsModalProps {
  onClose: () => void;
}

const GoalsModal: FC<GoalsModalProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    alert('Goals saved successfully!');
    onClose();
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey && document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  return (
    <div id="goals-modal" className="fixed inset-0 z-50" aria-modal="true" aria-hidden="false">
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div ref={modalRef} className="bg-[#1C2526] rounded-lg max-w-2xl w-full border border-neutral-200/20">
          <div className="flex items-center justify-between p-6 border-b border-neutral-200/20">
            <h2 className="text-2xl font-bold text-[#E6E6E6]">Set Learning Goals</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-neutral-700/50 transition-colors duration-200"
            >
              <svg className="w-6 h-6 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-[#E6E6E6]">
                    Monthly Study Hours
                  </label>
                  <input
                    type="number"
                    id="study-hours"
                    defaultValue="40"
                    className="w-full px-4 py-3 rounded-lg border border-neutral-200/20 focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-[#0E1217] text-[#E6E6E6]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-[#E6E6E6]">
                    Courses to Complete
                  </label>
                  <input
                    type="number"
                    id="courses-goal"
                    defaultValue="3"
                    className="w-full px-4 py-3 rounded-lg border border-neutral-200/20 focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-[#0E1217] text-[#E6E6E6]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-[#E6E6E6]">
                    Badges to Earn
                  </label>
                  <input
                    type="number"
                    id="badges-goal"
                    defaultValue="5"
                    className="w-full px-4 py-3 rounded-lg border border-neutral-200/20 focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-[#0E1217] text-[#E6E6E6]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-[#E6E6E6]">
                    Study Streak Target
                  </label>
                  <input
                    type="number"
                    id="streak-goal"
                    defaultValue="30"
                    className="w-full px-4 py-3 rounded-lg border border-neutral-200/20 focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-[#0E1217] text-[#E6E6E6]"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-8">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 rounded-lg font-medium border border-neutral-200/20 text-[#E6E6E6] hover:bg-neutral-700/50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg font-medium text-white bg-[#1E90FF] hover:opacity-90 transition-colors duration-200"
                >
                  Save Goals
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalsModal;