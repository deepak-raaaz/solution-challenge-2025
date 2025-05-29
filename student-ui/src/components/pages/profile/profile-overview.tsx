import { FC } from 'react';
import { ProfileUser } from './profile.types';

interface ProfileOverviewProps {
  user: ProfileUser;
  onChangeAvatar: () => void;
  onEditSocialLink: (platform: string) => void;
}

const ProfileOverview: FC<ProfileOverviewProps> = ({ user, onChangeAvatar, onEditSocialLink }) => {
  return (
    <div className="lg:col-span-1">
      <div className="bg-gray-800/20 border border-gray-700/40 rounded-lg p-6 mb-6">
        <div className="text-center mb-6">
          <div className="relative inline-block">
            <img src={user.avatar} alt="Profile" className="w-24 h-24 rounded-full mx-auto mb-4" />
            <button
              onClick={onChangeAvatar}
              className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
          <h2 className="text-xl font-bold text-gray-100 mb-1">{user.name}</h2>
          <p className="text-gray-400 mb-2">{user.jobTitle}</p>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">Level {user.level}</span>
            {user.verified && (
              <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">Verified Learner</span>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400">{user.courses}</p>
            <p className="text-gray-400 text-sm">Courses</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">{user.badge}</p>
            <p className="text-gray-400 text-sm">Badges</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-400">{user.avgScore}</p>
            <p className="text-gray-400 text-sm">Avg Score</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-400">#{user.rank}</p>
            <p className="text-gray-400 text-sm">Rank</p>
          </div>
        </div>

        {/* Learning Streak */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-white bg-opacity-20 p-2 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-lg">{user.streak} Day Streak!</p>
              <p className="text-orange-100 text-sm">Keep it up! You're on fire 🔥</p>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-100 mb-3">Connect</h3>
          {user.socialLinks.map((link) => (
            <div key={link.platform} className="flex items-center space-x-3 p-3 bg-gray-800/40 border border-gray-700/40 rounded-lg">
              <svg className={`w-5 h-5 ${link.connected ? 'text-blue-400' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 24 24">
                {link.icon === 'linkedin' && (
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                )}
                {link.icon === 'github' && (
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                )}
              </svg>
              <div className="flex-1">
                <p className="text-gray-100 text-sm">{link.platform}</p>
                <p className="text-gray-400 text-xs">{link.username}</p>
              </div>
              <button
                onClick={() => onEditSocialLink(link.platform)}
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                {link.connected ? 'Edit' : 'Connect'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;