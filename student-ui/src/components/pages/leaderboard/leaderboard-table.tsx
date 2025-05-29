import { FC } from 'react';
import { LeaderboardUser } from './leaderboard-type';

interface LeaderboardTableProps {
  users: LeaderboardUser[];
}

const LeaderboardTable: FC<LeaderboardTableProps> = ({ users }) => {
  return (
    <div className="bg-gray-800/20 border border-gray-700/40 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-gray-100">Global Rankings</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700/40">
            <tr>
              {['Rank', 'Learner', 'XP', 'Badges', 'Streak', 'Level'].map((header) => (
                <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {users.map((user) => (
              <tr
                key={user.rank}
                className={`${user.isCurrentUser ? 'bg-blue-900 border-2 border-blue-600' : 'hover:bg-gray-700/60'} transition-colors duration-200`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`${user.isCurrentUser ? 'text-blue-100' : 'text-gray-100'} font-medium`}>{user.rank}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className={`w-10 h-10 rounded-full mr-3 ${user.isCurrentUser ? 'border-2 border-blue-400' : ''}`}
                    />
                    <div>
                      <div className={`${user.isCurrentUser ? 'text-blue-100' : 'text-gray-100'} font-medium`}>
                        {user.name} {user.isCurrentUser ? '(You)' : ''}
                      </div>
                      <div className={`${user.isCurrentUser ? 'text-blue-300' : 'text-gray-400'} text-sm`}>{user.location}</div>
                    </div>
                  </div>
                </td>
                <td className={`px-6 py-4 whitespace-nowrap ${user.isCurrentUser ? 'text-blue-100' : 'text-gray-100'}`}>
                  {user.xp.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81 .588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className={`${user.isCurrentUser ? 'text-blue-100' : 'text-gray-100'}`}>{user.badges}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-orange-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                    </svg>
                    <span className={`${user.isCurrentUser ? 'text-blue-100' : 'text-gray-100'}`}>{user.streak} days</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">Level {user.level}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-gray-700 text-center">
        <button className="bg-gray-800/40 border border-gray-700/40 text-gray-100 px-6 py-2 rounded-lg transition-colors duration-200">
          Load More Rankings
        </button>
      </div>
    </div>
  );
};

export default LeaderboardTable;