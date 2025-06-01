import { useGenerateThumbnailMutation } from '@/redux/features/api/generate/generateApi';
import { Heart, Share, Share2, WandSparkles } from 'lucide-react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

interface CourseOverviewProps {
  handlePublishCourse: () => void; // Placeholder for publish course handler
  isPublishingPlaylist?: boolean; // Optional prop to indicate if publishing is in progress
  data: {
    userId: any;
    _id: string; // Course ID
    title: string;
    description: string;
    tags: string[];
    modules: number;
    lessons: number;
    duration: number;
    status: string;
    thumbnailUrl?: string; // Optional thumbnail URL
  };
}

const CourseOverview: React.FC<CourseOverviewProps> = ({ data, handlePublishCourse, isPublishingPlaylist }) => {
  const tagColors = ['bg-blue-600', 'bg-green-600', 'bg-purple-600', 'bg-blue-400', 'bg-red-600'];

  const [generateThumbnail, { isLoading: isGeneratingThumbnail }] = useGenerateThumbnailMutation();
  const [thumbnailUrl, setThumbnailUrl] = useState<string | undefined>(data.thumbnailUrl);
  const [liked, setLiked] = useState(false); // Local state to manage like status

  // Handler for generating thumbnail
  const generateThumbnailHandler = async (id: string) => {
    try {
      const response = await generateThumbnail({ playlistId: id }).unwrap();
      setThumbnailUrl(response.thumbnailUrl); // Update local state with new thumbnail URL
      toast.success('Thumbnail generated successfully!');
      console.log('Thumbnail generated successfully:', response);
    } catch (error: any) {
      toast.error(error?.data.message || 'Failed to generate thumbnail. Please try again.');
      console.error('Error generating thumbnail:', error);
    }
  };


  const handleSaveCourse = async () => {
    try {
      // Placeholder: Call API to save course
      // e.g., await saveCourse({ courseId: data._id }).unwrap();
      toast.success('Course saved successfully!');
    } catch (error) {
      toast.error('Failed to save course.');
      console.error('Error saving course:', error);
    }
  };

  const handleCustomize = () => {
    // Placeholder: Open customization modal or navigate to customization page
    toast.info('Customize functionality not implemented yet.');
  };

  const { user } = useSelector((state: any) => state.auth);

  return (
    <div className="bg-gray-800/20 border border-gray-700/40 rounded-xl p-6 mb-8">
      <div className="w-full aspect-video mb-2">
        {!thumbnailUrl ? (
          <div className="w-full h-full bg-gray-700/30 flex flex-col items-center justify-center rounded-lg">
            <span className="text-gray-400">No Thumbnail Available</span>
            {
              user && user._id === data.userId._id &&
              <button
                onClick={() => generateThumbnailHandler(data._id)}
                disabled={isGeneratingThumbnail}
                className={`mt-4 px-4 py-2 cursor-pointer flex items-center bg-gradient-to-br from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white rounded-lg transition-colors duration-200 ${isGeneratingThumbnail ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
              >
                <WandSparkles className="w-4 h-4" />
                <span className="ml-2 font-semibold">
                  {isGeneratingThumbnail ? 'Generating...' : 'Generate Thumbnail'}
                </span>
              </button>
            }
          </div>
        ) : (
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={thumbnailUrl}
              alt={`${data.title} thumbnail`}
              className="aspect-video w-full object-cover rounded-lg"
            />
            {
              user && user._id === data.userId._id &&
              <button
                onClick={() => generateThumbnailHandler(data._id)}
                disabled={isGeneratingThumbnail}
                className={`absolute bottom-4 right-4 px-4 py-2 cursor-pointer flex items-center bg-gradient-to-br from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white rounded-lg transition-colors duration-200 ${isGeneratingThumbnail ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
              >
                <WandSparkles className="w-4 h-4" />
                <span className="ml-2 font-semibold">
                  {isGeneratingThumbnail ? 'Generating...' : 'Regenerate Thumbnail'}
                </span>
              </button>
            }
            {
              user && user._id !== data.userId._id &&
              <div className="absolute gap-3 px-4 py-4 items-end bottom-0 w-full h-20 bg-gradient-to-b from-transparent to-black flex  justify-end text-white ">
                {/* like button  */}
                <button
                  className={`h-10 w-10 cursor-pointer flex items-center justify-center bg-gradient-to-br text-white rounded-full transition-colors duration-200
                   bg-gray-800/80 hover:bg-gray-800/90}
                    `}
                >
                  <Share2 size={20} />
                </button>

                <button
                  onClick={() => setLiked(!liked)} // Toggle liked state
                  className={`h-10 w-10 cursor-pointer flex items-center justify-center bg-gradient-to-br text-white rounded-full transition-colors duration-200
                    ${liked ? 'from-red-600 to-red-800 hover:from-red-700 hover:to-red-900' : 'bg-gray-800/80 hover:from-red-700 hover:to-red-900'}
                    `}
                >
                  <Heart size={20} />
                </button>
              </div>
            }
          </div>
        )}
      </div>
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 justify-between my-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-100 mb-2">{data.title}</h2>
          <p className="text-gray-400 mb-4">{data.description}</p>
          <div className="flex flex-wrap gap-2">
            {data.tags.map((tag, index) => (
              <span
                key={tag}
                className={`bg-${tagColors[index % tagColors.length]} bg-slate-700/50 text-white px-3 py-1 rounded-full text-sm`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        {
          user && user._id === data.userId._id &&
          <div className="flex flex-col gap-4 mt-4 lg:mt-0">
            {data.status === 'draft' ? (
              <button
                disabled={isPublishingPlaylist}
                onClick={handlePublishCourse}
                className="px-4 py-2 cursor-pointer text-nowrap bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
              >
                Publish Course
              </button>
            ) : (
              <button
                onClick={handleSaveCourse}
                className="px-4 py-2 cursor-pointer text-nowrap bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
              >
                Save Course
              </button>
            )}
            <button
              onClick={handleCustomize}
              className="px-6 py-3 cursor-pointer bg-gray-700/30 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors duration-200 font-semibold"
            >
              Customize
            </button>
          </div>
        }
      </div>
      <div className="flex items-center mt-3 mb-6 ">
        <img
          src={`https://avatar.iran.liara.run/public/${Math.floor(Math.random() * 100)}`}
          alt={data?.userId.name}
          className="w-8 h-8 rounded-full mr-3"
        />
        <div>
          <p className="text-sm font-medium text-gray-100">{data?.userId.name}</p>
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-yellow-400 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs text-gray-400">Verified Educator</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-gray-700/30 rounded-lg">
          <div className="text-2xl font-bold text-blue-400 mb-1">{data.modules}</div>
          <p className="text-gray-300 text-sm">Modules</p>
        </div>
        <div className="text-center p-4 bg-gray-700/30 rounded-lg">
          <div className="text-2xl font-bold text-green-400 mb-1">{data.lessons}</div>
          <p className="text-gray-300 text-sm">Lessons</p>
        </div>
        <div className="text-center p-4 bg-gray-700/30 rounded-lg">
          <div className="text-2xl font-bold text-purple-400 mb-1">{data.duration} hrs</div>
          <p className="text-gray-300 text-sm">Duration</p>
        </div>
        <div className="text-center p-4 bg-gray-700/30 rounded-lg">
          <div className="text-2xl font-bold text-blue-400 mb-1">{'TBD'}</div>
          <p className="text-gray-300 text-sm">Assessments</p>
        </div>
      </div>
    </div>
  );
};

export default CourseOverview;