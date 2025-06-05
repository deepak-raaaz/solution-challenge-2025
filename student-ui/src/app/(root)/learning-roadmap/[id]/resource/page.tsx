'use client';

import React from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Resource from '@/components/pages/learning-roadmap/resource/resource';

const Page = () => {
    const searchParams = useSearchParams();
    const resourceId = searchParams.get('id') as string;
    
    const params = useParams();
    const roadmapId = params.id as string; // Extract the 'id' from the dynamic route

    return (
        <>
            <Resource roadmapId={roadmapId} resourceId={resourceId} />
        </>
    );
};

export default Page;