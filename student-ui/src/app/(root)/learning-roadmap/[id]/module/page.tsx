'use client'
import React from 'react'
import { useSearchParams, useParams } from 'next/navigation';
import Module from '@/components/pages/learning-roadmap/module/module';

const Page = () => {
    const searchParams = useSearchParams();

    const moduleId = searchParams.get('id');

    const params = useParams();
    const roadmapId = params.id as string;
    console.log(moduleId);

    return (
        <Module roadmapId={roadmapId} moduleId={moduleId || ''} />
    )
}

export default Page