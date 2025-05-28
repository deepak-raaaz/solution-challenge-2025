'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from './header';
import CourseOverview from './course-overview';
import ModuleList from './module-list';
import SaveCourseModal from './save-course-model';
import { courseData } from './course-data';
import Sidebar from './sidebar';

const CourseDetails: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleSaveCourse = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
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

  return (
    <section id="course-roadmap" className="min-h-screen text-gray-100">
      <div className="px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Header onSaveCourse={handleSaveCourse} onViewDashboard={() => handleSectionNavigation('dashboard')} />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <CourseOverview data={courseData} />
              <ModuleList modules={courseData.modulesList} onSectionNavigation={handleSectionNavigation} />
            </div>
            <Sidebar data={courseData} onSectionNavigation={handleSectionNavigation} />
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