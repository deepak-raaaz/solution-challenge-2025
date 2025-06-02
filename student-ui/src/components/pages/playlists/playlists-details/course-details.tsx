'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from './header';
import CourseOverview from './course-overview';
import ModuleList from './module-list';
import Sidebar from './sidebar';
import SaveCourseModal from './save-course-model';
import { useGetPlaylistByIdQuery, usePublishPlaylistMutation } from '@/redux/features/api/generate/generateApi';
import { toast } from 'react-toastify';
import Reviews from './tabs/reviews';
import FAQs from './tabs/faq';
import Overview from './tabs/overview';
import Assessment from './tabs/assessment';
import Comments from './tabs/comments';
import { useSelector } from 'react-redux';

interface Playlist {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  userId: any;
  thumbnailUrl: string;
  moduleIds: {
    _id: string;
    title: string;
    description: string;
    lessonIds: {
      _id: string;
      title: string;
      description: string;
      resourceIds: {
        _id: string;
        type: string;
        title: string;
        url: string;
        sentiment: {
          score: string;
          message: string;
        };
        metadata: {
          channel?: string;
          source?: string;
        };
      }[];
      duration: number;
      status: string;
    }[];
    status: string;
  }[];
  status: string;
  modules: number;
  lessons: number;
  duration: number;
}

interface CourseDetailsProps {
  playlistId: string;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ playlistId }) => {
  const { user } = useSelector((state: any) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modulePublished, setModulePublished] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');
  const router = useRouter();
  const { data, isLoading, error, refetch } = useGetPlaylistByIdQuery(playlistId);
  const [publishPlaylist, { isLoading: isPublishingPlaylist }] = usePublishPlaylistMutation();

  const handleSaveCourse = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handlePublishCourse = async () => {
    try {
      await publishPlaylist({ playlistId, modulePublished }).unwrap();
      toast.success('Course published successfully!');
      refetch();
    } catch (error) {
      toast.error('Failed to publish course.');
      console.error('Error publishing course:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = '';
  };

  const handleGoToDashboard = () => {
    handleCloseModal();
    router.push('/dashboard');
  };

  const handleSectionNavigation = (section: string) => {
    router.push(`/${section}`);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  if (isLoading) return <div className="text-center text-gray-100">Loading...</div>;
  if (error || !data?.playlist) return <div className="text-center text-red-400">Error loading playlist</div>;

  const playlist: Playlist = data.playlist;

  const tabs = [
    'Overview',
    'Modules',
    'Assessment',
    'FAQs',
    'Reviews',
    'Comment',
  ];



  return (
    <section id="course-roadmap" className="min-h-screen text-gray-100 py-10">
      <div className="px-6 py-12 max-md:px-4">
        <div className="mx-auto max-w-7xl">
          {/* <Header onSaveCourse={handleSaveCourse} onViewDashboard={() => handleSectionNavigation('dashboard')} /> */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <CourseOverview
                data={playlist}
                handlePublishCourse={handlePublishCourse}
                isPublishingPlaylist={isPublishingPlaylist}
              />
              <div className="">
                <nav className="flex space-x-4  mb-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => handleTabChange(tab)}
                      className={`h-10 px-6 bg-gray-800/40 border border-gray-700/40 flex items-center justify-center  text-gray-200 rounded-full  transition-colors text-sm font-medium ${
                        activeTab === tab
                          ? 'text-gray-100 dark:bg-blue-600 border border-gray-700/40'
                          : 'text-gray-400 hover:text-gray-200'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
                {activeTab === 'Overview' && <Overview user={user} data={playlist}/>}
                {activeTab === 'Modules' && (
                  <ModuleList
                    modules={playlist.moduleIds}
                    onSectionNavigation={handleSectionNavigation}
                  />
                )}
                {activeTab === 'Assessment' && <Assessment user={user} data={playlist}/>}
                {activeTab === 'FAQs' && <FAQs/>}
                {activeTab === 'Reviews' && <Reviews/>}
                {activeTab === 'Comment' && <Comments/>}
              </div>
              {/* <ModuleList modules={playlist.moduleIds} onSectionNavigation={handleSectionNavigation} /> */}
            </div>
            <Sidebar data={playlist} onSectionNavigation={handleSectionNavigation} />
          </div>
        </div>
      </div>
      <SaveCourseModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onGoToDashboard={handleGoToDashboard}
      />
    </section>
  );
};

export default CourseDetails;