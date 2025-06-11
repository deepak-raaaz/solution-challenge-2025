'use client';

import React, { Suspense } from 'react';
import { useParams } from 'next/navigation';
import LearningRoadmap from '@/components/pages/learning-roadmap/learning-roadmap';

const Page = () => {
  const params = useParams();
  const roadmapId = params.id as string; // Extract the 'id' from the dynamic route

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LearningRoadmap roadmapId={roadmapId} />
    </Suspense>
  );
};

export default Page;