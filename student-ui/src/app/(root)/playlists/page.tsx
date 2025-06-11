'use client';

import Playlists from '@/components/pages/playlists/playlists';
import React, { Suspense } from 'react';

const Page = () => {
  return (
    <Suspense fallback={<div>Loading playlists...</div>}>
      <Playlists />
    </Suspense>
  );
};

export default Page;