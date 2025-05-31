import { useGenerateThumbnailMutation } from '@/redux/features/api/generate/generateApi';
import { WandSparkles } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface CourseOverviewProps {
  handlePublishCourse: () => void; // Placeholder for publish course handler
  isPublishingPlaylist?: boolean; // Optional prop to indicate if publishing is in progress
  data: {
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

  // Handler for generating thumbnail
  const generateThumbnailHandler = async (id: string) => {
    try {
      const response = await generateThumbnail({ playlistId: id }).unwrap();
      setThumbnailUrl(response.thumbnailUrl); // Update local state with new thumbnail URL
      toast.success('Thumbnail generated successfully!');
      console.log('Thumbnail generated successfully:', response);
    } catch (error:any) {
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

  return (
    <div className="bg-gray-800/20 border border-gray-700/40 rounded-xl p-6 mb-8">
      <div className="w-full aspect-video mb-2">
        {!thumbnailUrl ? (
          <div className="w-full h-full bg-gray-700/30 flex flex-col items-center justify-center rounded-lg">
            <span className="text-gray-400">No Thumbnail Available</span>
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
          </div>
        ) : (
          <div className="relative">
            <img
              src={thumbnailUrl}
              alt={`${data.title} thumbnail`}
              className="aspect-video w-full object-cover rounded-lg"
            />
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
          </div>
        )}
      </div>
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 justify-between mb-6">
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
        <div className="flex flex-row gap-4 mt-4 lg:mt-0">
          {data.status === 'draft' ? (
            <button
              disabled={isPublishingPlaylist}
              onClick={handlePublishCourse}
              className="px-6 py-3 cursor-pointer text-nowrap bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
            >
              Publish Course
            </button>
          ) : (
            <button
              onClick={handleSaveCourse}
              className="px-6 py-3 cursor-pointer text-nowrap bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
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