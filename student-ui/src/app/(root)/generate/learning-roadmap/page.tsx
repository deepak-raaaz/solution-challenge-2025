"use client";
import { redirect } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { MultiStepLoader as Loader } from '@/components/ui/multi-step-loader';
import { useGenerateRoadmapMutation } from '@/redux/features/api/generate/generateApi';

// Define loading states for the Loader component
const loadingStates = [
  { text: 'Structuring your complete guide' },
  { text: 'Sourcing expert insights' },
  { text: 'Curating the perfect playlist' },
  { text: 'Gathering top-tier resources' },
  { text: 'Verifying content quality' },
  { text: 'Organizing everything neatly' },
  { text: 'Polishing your learning package' },
  { text: 'Finalizing—almost there!' },
];

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const assessmentId = searchParams.get('assessment');
  const personalizationId = searchParams.get('personalization');
  const [generateRoadmap, { isLoading: isGenerating, isError: isGenerateError, error: generateError }] = useGenerateRoadmapMutation();
  const hasGenerated = useRef(false); // Track mutation call

  // Redirect to /generate if query parameters are missing
  if (!assessmentId || !personalizationId) {
    redirect('/generate');
  }

  useEffect(() => {
    let isMounted = true; // Track mount status

    const generate = async () => {
      if (hasGenerated.current) return; // Prevent duplicate calls
      hasGenerated.current = true;

      try {
        const response = await generateRoadmap({
          assessmentId,
          playlistPersonalizationId: personalizationId,
        }).unwrap();

        console.log('Learning Roadmap generated successfully'); // Debug log

        // Redirect to playlist after 2 seconds if still mounted
        if (isMounted) {
          setTimeout(() => {
            router.push(`/learning-roadmap/${response.roadmapId}`);
          }, 2000);
        }
      } catch (err) {
        console.error('Error generating playlist:', err); // Debug log
        // Redirect to error page if still mounted
        if (isMounted) {
          router.push('/generate?error=Failed to generate playlist');
        }
      }
    };

    generate();

    // Cleanup on unmount
    return () => {
      isMounted = false;
    };
  }, [assessmentId, personalizationId, generateRoadmap, router]);

  // Show loader while generating
  return <Loader loadingStates={loadingStates} loading={isGenerating} duration={700} />;
};

export default Page;