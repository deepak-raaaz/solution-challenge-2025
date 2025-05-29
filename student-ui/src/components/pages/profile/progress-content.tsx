import { FC } from 'react';
import { ProfileUser } from './profile.types';

interface ProgressContentProps {
  user: ProfileUser;
}

const ProgressContent: FC<ProgressContentProps> = ({ user }) => {
  return (
    <div>
      {/* Learning Progress Chart */}
      <div className="bg-gray-800/20 border border-gray-700/40 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-100 mb-4">Learning Progress</h3>
        <div className="h-64 bg-gray-700/30 rounded-lg flex items-center justify-center">
          <canvas id="progressChart" className="w-full h-full" />
        </div>
      </div>

      {/* Skill Levels */}
      <div className="bg-gray-800/20 border border-gray-700/40 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-100 mb-4">Skill Levels</h3>
        <div className="space-y-4">
          {user.skillLevels.map((skill, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm text-gray-300 mb-1">
                <span>{skill.skill}</span>
                <span>{skill.level} ({skill.progress}%)</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className={`bg-${skill.color} h-2 rounded-full`} style={{ width: `${skill.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Study Time */}
      <div className="bg-gray-800/20 border border-gray-700/40 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-100 mb-4">Study Time This Month</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-400">{user.studyTime.totalHours}</p>
            <p className="text-gray-400 text-sm">Total Hours</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-400">{user.studyTime.activeDays}</p>
            <p className="text-gray-400 text-sm">Active Days</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-400">{user.studyTime.dailyAverage}</p>
            <p className="text-gray-400 text-sm">Daily Average</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressContent;