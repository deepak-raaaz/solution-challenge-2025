"use client"
import { redirect } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useGeneratePlaylistMutation } from '@/redux/features/api/generate/generateApi';
import { MultiStepLoader as Loader } from '@/components/ui/multi-step-loader';

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
  const [generatePlaylist, { isLoading: isGenerating, isError: isGenerateError, error: generateError }] = useGeneratePlaylistMutation();

  // Redirect to /generate if query parameters are missing
  if (!assessmentId || !personalizationId) {
    redirect('/generate');
  }

  useEffect(() => {
    const generate = async () => {
      try {
        const response = await generatePlaylist({
          assessmentId,
          playlistPersonalizationId: personalizationId,
        }).unwrap();

        console.log('Playlist generated successfully'); // Debug log

        // Redirect to playlist after 2 seconds
        setTimeout(() => {
          router.push(`/playlists/${response.playlistId}`);
        }, 2000);
      } catch (err) {
        console.error('Error generating playlist:', err); // Debug log
        // Optionally redirect to an error page or back to /generate
        router.push('/generate?error=Failed to generate playlist');
      }
    };

    generate();
  }, [assessmentId, personalizationId, generatePlaylist, router]);

  // Show loader while generating
  return <Suspense fallback={<Loader loadingStates={loadingStates} loading={true} duration={700} />}>
  <Loader loadingStates={loadingStates} loading={isGenerating} duration={700} />;
</Suspense>
  
  
};

export default Page;