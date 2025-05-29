import { FC } from 'react';

interface Achievement {
  id: number;
  title: string;
  time: string;
  color: string;
}

interface RecentAchievementsProps {
  achievements: Achievement[];
}

const RecentAchievements: FC<RecentAchievementsProps> = ({ achievements }) => {
  return (
    <div className="p-6 rounded-lg border border-gray-700/40 bg-gray-800/20">
      <h3 className="text-lg font-bold mb-4 text-[#E6E6E6]">Recent Achievements</h3>
      <div className="space-y-3">
        {achievements.map((achievement) => (
          <div key={achievement.id} className="flex items-center">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
              style={{ backgroundColor: achievement.color }}
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-[#E6E6E6]">{achievement.title}</p>
              <p className="text-xs text-neutral-400">{achievement.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentAchievements;