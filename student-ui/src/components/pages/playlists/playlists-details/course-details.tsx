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
    'Content',
    'Assessment',
    'Announcement',
    'Reviews',
    'Comment',
  ];

  return (
    <section id="course-roadmap" className="min-h-screen text-gray-100 max-lg:py-10">
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
                <nav className="flex space-x-4 border-b border-gray-700/60 mb-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => handleTabChange(tab)}
                      className={`px-3 py-2 text-sm font-medium ${
                        activeTab === tab
                          ? 'border-b-2 border-gray-100 text-gray-100'
                          : 'text-gray-400 hover:text-gray-200'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
                {activeTab === 'Overview' && <div className="text-gray-100">Overview content</div>}
                {activeTab === 'Content' && (
                  <ModuleList
                    modules={playlist.moduleIds}
                    onSectionNavigation={handleSectionNavigation}
                  />
                )}
                {activeTab === 'Assessment' && <div className="text-gray-100">Assessment content</div>}
                {activeTab === 'Announcement' && <div className="text-gray-100">Announcement content</div>}
                {activeTab === 'Reviews' && <div className="text-gray-100">Reviews content</div>}
                {activeTab === 'Comment' && <div className="text-gray-100">Comment content</div>}
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