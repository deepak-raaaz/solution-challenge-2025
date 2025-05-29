import { FC } from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChangePassword: () => void;
  onTwoFactorAuth: () => void;
  onDownloadData: () => void;
  onDeleteAccount: () => void;
}

const SettingsModal: FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onChangePassword,
  onTwoFactorAuth,
  onDownloadData,
  onDeleteAccount,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50" aria-modal="true">
      <div className="bg-[#0E1217] border border-gray-700/40 rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-100">Account Settings</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-4">
          <button
            onClick={onChangePassword}
            className="w-full text-left p-3 bg-gray-800/40 border border-gray-700/40 hover:bg-gray-600/40 rounded-lg transition-colors duration-200"
          >
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-gray-100">Change Password</span>
            </div>
          </button>
          <button
            onClick={onTwoFactorAuth}
            className="w-full text-left p-3 bg-gray-800/40 border border-gray-700/40 hover:bg-gray-600/40 rounded-lg transition-colors duration-200"
          >
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-gray-100">Two-Factor Authentication</span>
            </div>
          </button>
          <button
            onClick={onDownloadData}
            className="w-full text-left p-3 bg-gray-800/40 border border-gray-700/40 hover:bg-gray-600/40 rounded-lg transition-colors duration-200"
          >
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-gray-100">Download My Data</span>
            </div>
          </button>
          <button
            onClick={onDeleteAccount}
            className="w-full text-left p-3 bg-red-900 hover:bg-red-800 rounded-lg transition-colors duration-200"
          >
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span className="text-red-100">Delete Account</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;