'use client';

import CourseDetails from '@/components/pages/playlists/playlists-details/course-details';
import React, { Suspense } from 'react';
import { useParams } from 'next/navigation';

const Page = () => {
  const params = useParams();
  const playlistId = params.id as string; // Extract the 'id' from the dynamic route

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CourseDetails playlistId={playlistId} />
    </Suspense>
  );
};

export default Page;