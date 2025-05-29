import { FC } from 'react';
import { ProfileUser } from './profile.types';

interface AchievementsContentProps {
  user: ProfileUser;
}

const AchievementsContent: FC<AchievementsContentProps> = ({ user }) => {
  return (
    <div>
      {/* Badge Collection */}
      <div className="bg-gray-800/20 border border-gray-700/40 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-100 mb-4">Badge Collection</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {user.badges.map((badge, index) => (
            <div key={index} className="text-center p-4 bg-gray-800/40 border border-gray-700/40 rounded-lg">
              <div className={`bg-${badge.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2`}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {badge.icon === 'star' && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  )}
                  {badge.icon === 'flame' && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  )}
                  {badge.icon === 'code' && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  )}
                  {badge.icon === 'users' && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  )}
                </svg>
              </div>
              <h4 className="font-medium text-gray-100 text-sm">{badge.title}</h4>
              <p className="text-gray-400 text-xs">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Certificates */}
      <div className="bg-gray-800/20 border border-gray-700/40 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-100 mb-4">Certificates</h3>
        <div className="space-y-4">
          {user.certificates.map((certificate, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-800/40 border border-gray-700/40 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`bg-${certificate.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-100">{certificate.title}</h4>
                  <p className="text-gray-400 text-sm">Issued by {certificate.issuer} • {certificate.date}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors duration-200">
                  View
                </button>
                <button className="bg-gray-700/70 hover:bg-gray-500 text-gray-100 px-3 py-1 rounded text-sm transition-colors duration-200">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard Position */}
      <div className="bg-gray-800/20 border border-gray-700/40 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-100 mb-4">Leaderboard Rankings</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {user.rankings.map((ranking, index) => (
            <div key={index} className={`text-center p-4 bg-gradient-to-r from-${ranking.color} to-${ranking.color.replace('600', '500')} rounded-lg`}>
              <p className="text-2xl font-bold text-white">#{ranking.rank}</p>
              <p className={`text-${ranking.color.replace('600', '100')} text-sm`}>{ranking.category}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AchievementsContent;