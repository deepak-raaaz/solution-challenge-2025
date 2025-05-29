"use client"
import { FC, useState } from 'react';
import profileData from './profile-data.json';
import { ProfileUser } from './profile.types';
import ProfileHeader from './profile-header';
import ProfileOverview from './profile-overview';
import TabNavigation from './tab-navigation';
import OverviewContent from './overview-content';
import ProgressContent from './progress-content';
import AchievementsContent from './achievements-content';
import PreferencesContent from './prefences-content';
import SettingsModal from './settings-model';

const Profile: FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const handleExportProfile = () => {
    console.log('Exporting profile data...');
  };

  const handleChangeAvatar = () => {
    console.log('Changing avatar...');
  };

  const handleEditSocialLink = (platform: string) => {
    console.log(`Editing social link for ${platform}...`);
  };

  const handleEditPersonalInfo = () => {
    console.log('Editing personal info...');
  };

  const handleEditGoals = () => {
    console.log('Editing learning goals...');
  };

  const handleSavePreferences = (preferences: ProfileUser['preferences']) => {
    console.log('Saving preferences:', preferences);
  };

  const handleChangePassword = () => {
    console.log('Changing password...');
  };

  const handleTwoFactorAuth = () => {
    console.log('Setting up two-factor authentication...');
  };

  const handleDownloadData = () => {
    console.log('Downloading data...');
  };

  const handleDeleteAccount = () => {
    console.log('Deleting account...');
  };

  return (
    <section id="profile-management" className="min-h-screen  p-6 max-lg:px-4 max-lg:py-20">
      <ProfileHeader onExportProfile={handleExportProfile} onOpenSettingsModal={() => setIsSettingsModalOpen(true)} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <ProfileOverview
          user={profileData.user}
          onChangeAvatar={handleChangeAvatar}
          onEditSocialLink={handleEditSocialLink}
        />
        <div className="lg:col-span-2">
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          {activeTab === 'overview' && (
            <OverviewContent user={profileData.user} onEditPersonalInfo={handleEditPersonalInfo} onEditGoals={handleEditGoals} />
          )}
          {activeTab === 'progress' && <ProgressContent user={profileData.user} />}
          {activeTab === 'achievements' && <AchievementsContent user={profileData.user} />}
          {activeTab === 'preferences' && (
            <PreferencesContent user={profileData.user} onSavePreferences={handleSavePreferences} />
          )}
        </div>
      </div>
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        onChangePassword={handleChangePassword}
        onTwoFactorAuth={handleTwoFactorAuth}
        onDownloadData={handleDownloadData}
        onDeleteAccount={handleDeleteAccount}
      />
    </section>
  );
};

export default Profile;