import { FC } from 'react';
import { LeaderboardUser } from './leaderboard-type'; 

interface PodiumProps {
  users: LeaderboardUser[];
}

const Podium: FC<PodiumProps> = ({ users }) => {
  const podiumColors = ['bg-gradient-to-t from-yellow-600 to-yellow-400', 'bg-gray-600', 'bg-orange-600'];
  const podiumHeights = ['h-20', 'h-16', 'h-12'];

  return (
    <div className="bg-gray-800/20 border border-gray-700/40 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-100 mb-6 text-center">🏆 Top Performers</h3>
      <div className="flex items-end justify-center space-x-4">
        {[1, 0, 2].map((index, i) => (
          users[index] && (
            <div key={index} className="text-center">
              <div className={`${podiumColors[index]} w-20 ${podiumHeights[index]} rounded-t-lg flex items-end justify-center pb-2 mb-3`}>
                <span className="text-white font-bold text-lg">{index + 1}</span>
              </div>
              <img
                src={users[index].avatar}
                alt={`${index + 1} place`}
                className={`w-16 h-16 rounded-full mx-auto mb-2 ${index === 0 ? 'border-4 border-yellow-400' : ''}`}
              />
              <h4 className="font-semibold text-gray-100 text-sm">{users[index].name}</h4>
              <p className="text-gray-400 text-xs">{users[index].xp.toLocaleString()} XP</p>
              <div className="flex items-center justify-center mt-1">
                <svg
                  className={`w-4 h-4 ${index === 0 ? 'text-yellow-400' : index === 1 ? 'text-gray-400' : 'text-orange-600'} mr-1`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81 .588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className={`text-xs ${index === 0 ? 'text-yellow-400' : index === 1 ? 'text-gray-400' : 'text-orange-600'}`}>
                  {users[index].badges}
                </span>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default Podium;