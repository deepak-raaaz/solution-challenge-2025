import { FC, useState } from 'react';
import { ProfileUser } from './profile.types';

interface PreferencesContentProps {
  user: ProfileUser;
  onSavePreferences: (preferences: ProfileUser['preferences']) => void;
}

const PreferencesContent: FC<PreferencesContentProps> = ({ user, onSavePreferences }) => {
  const [preferences, setPreferences] = useState(user.preferences);

  const handleSave = () => {
    onSavePreferences(preferences);
  };

  return (
    <div>
      {/* Learning Preferences */}
      <div className="bg-gray-800/20 border border-gray-700/40 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-100 mb-4">Learning Preferences</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-gray-300 text-sm mb-2">Preferred Learning Style</label>
            <select
              className="w-full bg-gray-800/40 border border-gray-700/40 rounded-lg px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={preferences.learningStyle}
              onChange={(e) => setPreferences({ ...preferences, learningStyle: e.target.value })}
            >
              <option>Visual (Videos & Diagrams)</option>
              <option>Reading (Articles & Documentation)</option>
              <option>Hands-on (Projects & Exercises)</option>
              <option>Mixed Approach</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-300 text-sm mb-2">Difficulty Preference</label>
            <select
              className="w-full bg-gray-800/40 border border-gray-700/40 rounded-lg px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={preferences.difficulty}
              onChange={(e) => setPreferences({ ...preferences, difficulty: e.target.value })}
            >
              <option>Beginner Friendly</option>
              <option>Intermediate</option>
              <option>Advanced</option>
              <option>Challenge Me</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-300 text-sm mb-2">Daily Study Goal</label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="30"
                max="240"
                value={preferences.dailyStudyGoal}
                className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                onChange={(e) => setPreferences({ ...preferences, dailyStudyGoal: Number(e.target.value) })}
              />
              <span className="text-gray-100 font-medium">{preferences.dailyStudyGoal / 60} hours</span>
            </div>
          </div>
          <div>
            <label className="block text-gray-300 text-sm mb-2">Preferred Languages</label>
            <div className="grid grid-cols-2 gap-2">
              {['English', 'Spanish', 'French', 'German'].map((lang) => (
                <label key={lang} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={preferences.languages.includes(lang)}
                    onChange={(e) => {
                      const updatedLanguages = e.target.checked
                        ? [...preferences.languages, lang]
                        : preferences.languages.filter((l) => l !== lang);
                      setPreferences({ ...preferences, languages: updatedLanguages });
                    }}
                    className="text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-100">{lang}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-gray-800/20 border border-gray-700/40 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-100 mb-4">Notification Settings</h3>
        <div className="space-y-4">
          {Object.entries(preferences.notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-100">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                </h4>
                <p className="text-gray-400 text-sm">
                  {key === 'courseUpdates' && 'New content and announcements'}
                  {key === 'studyReminders' && 'Daily learning reminders'}
                  {key === 'communityActivity' && 'Replies and mentions'}
                  {key === 'achievements' && 'Badges and milestones'}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      notifications: { ...preferences.notifications, [key]: e.target.checked },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-gray-800/20 border border-gray-700/40 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-100 mb-4">Privacy Settings</h3>
        <div className="space-y-4">
          {Object.entries(preferences.privacy).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-100">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                </h4>
                <p className="text-gray-400 text-sm">
                  {key === 'publicProfile' && 'Show your profile to other learners'}
                  {key === 'showProgress' && 'Display your learning progress publicly'}
                  {key === 'leaderboardParticipation' && 'Include me in public rankings'}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      privacy: { ...preferences.privacy, [key]: e.target.checked },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default PreferencesContent;