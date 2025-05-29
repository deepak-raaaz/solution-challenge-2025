import { FC } from 'react';
import { ProfileUser } from './profile.types';

interface OverviewContentProps {
  user: ProfileUser;
  onEditPersonalInfo: () => void;
  onEditGoals: () => void;
}

const OverviewContent: FC<OverviewContentProps> = ({ user, onEditPersonalInfo, onEditGoals }) => {
  return (
    <div>
      {/* Personal Information */}
      <div className="bg-gray-800/20 border border-gray-700/40 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-100">Personal Information</h3>
          <button onClick={onEditPersonalInfo} className="text-blue-400 hover:text-blue-300 text-sm">
            Edit
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-300 text-sm mb-2">Full Name</label>
            <input
              type="text"
              value={user.personalInfo.fullName}
              className="w-full bg-gray-800/40 border border-gray-700/40 rounded-lg px-3 py-2 text-gray-100 focus:outline-none"
              readOnly
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm mb-2">Email</label>
            <input
              type="email"
              value={user.personalInfo.email}
              className="w-full bg-gray-800/40 border border-gray-700/40 rounded-lg px-3 py-2 text-gray-100 focus:outline-none"
              readOnly
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm mb-2">Job Title</label>
            <input
              type="text"
              value={user.personalInfo.jobTitle}
              className="w-full bg-gray-800/40 border border-gray-700/40 rounded-lg px-3 py-2 text-gray-100 focus:outline-none"
              readOnly
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm mb-2">Location</label>
            <input
              type="text"
              value={user.personalInfo.location}
              className="w-full bg-gray-800/40 border border-gray-700/40 rounded-lg px-3 py-2 text-gray-100 focus:outline-none"
              readOnly
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-300 text-sm mb-2">Bio</label>
            <textarea
              className="w-full h-20 bg-gray-800/40 border border-gray-700/40 rounded-lg px-3 py-2 text-gray-100 focus:outline-none resize-none"
              value={user.personalInfo.bio}
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Learning Goals */}
      <div className="bg-gray-800/20 border border-gray-700/40 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-100">Learning Goals</h3>
          <button onClick={onEditGoals} className="text-blue-400 hover:text-blue-300 text-sm">
            Edit
          </button>
        </div>
        <div className="space-y-4">
          {user.learningGoals.map((goal, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-800/40 border border-gray-700/40 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`bg-${goal.color} w-10 h-10 rounded-lg flex items-center justify-center`}>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {goal.icon === 'computer' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    )}
                    {goal.icon === 'link' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    )}
                    {goal.icon === 'lock' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    )}
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-100">{goal.title}</h4>
                  <p className="text-gray-400 text-sm">{goal.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-${goal.color} font-medium`}>{goal.progress}%</p>
                <p className="text-gray-400 text-xs">{goal.timeLeft}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800/20 border border-gray-700/40 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-100 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {user.recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-800/40 border border-gray-700/40 rounded-lg">
              <div className={`bg-${activity.color} p-2 rounded-full`}>
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {activity.icon === 'check' && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  )}
                  {activity.icon === 'star' && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  )}
                  {activity.icon === 'chat' && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  )}
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-gray-100 text-sm">{activity.description}</p>
                <p className="text-gray-400 text-xs">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewContent;