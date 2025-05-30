'use client';

import CourseDetails from '@/components/pages/playlists/playlists-details/course-details';
import React from 'react';
import { useParams } from 'next/navigation';

const Page = () => {
  const params = useParams();
  const playlistId = params.id as string; // Extract the 'id' from the dynamic route

  return (
    <>
      <CourseDetails playlistId={playlistId} />
    </>
  );
};

export default Page;