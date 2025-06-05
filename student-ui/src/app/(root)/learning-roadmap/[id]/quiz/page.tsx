'use client'
import React from 'react'
import { useSearchParams, useParams } from 'next/navigation';
import QuizViewer from '@/components/pages/learning-roadmap/quiz/quiz-viewer';

const Page = () => {
    const searchParams = useSearchParams();

    const quizId = searchParams.get('id');

    const params = useParams();
    const roadmapId = params.id as string;
    console.log(quizId);

    return (
        <QuizViewer roadmapId={roadmapId} quizId={quizId || ''} />
    )
}

export default Page