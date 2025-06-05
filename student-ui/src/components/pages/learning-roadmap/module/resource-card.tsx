
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

interface Resource {
  roadmapId:string;
  moduleId: string;
  _id: string;
  lessonId: string;
  url: string;
  thumbnailUrl: string;
  sentiment: {
    score: string;
    message: string;
  };
  metadata: {
    duration: string;
  }
  type: 'video' | 'article' | 'quiz' | 'project' | 'youtube';
  title: string;
  duration: string;
  status: 'completed' | 'in-progress' | 'locked' | 'unlocked';
  icon: React.ReactNode;
}

interface ResourceCardProps {
  resource: Resource;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {

  const buttonStyles = {
    completed: 'bg-gray-600/40 text-gray-300 cursor-pointer',
    'in-progress': 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer',
    locked: 'bg-gray-600 text-gray-400 cursor-not-allowed',
    unlocked: 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer',
  };
  console.log(resource);


  const buttonText = {
    completed: resource.type === 'video' || 'youtube' ? '✓ Watched' : resource.type === 'article' ? '✓ Read' : resource.type === 'quiz' ? '✓ Passed (85%)' : '✓ Submitted',
    'in-progress': resource.type === 'article' ? 'Continue Reading' : 'Start',
    locked: 'Locked',
    unlocked: resource.type === 'video' || 'youtube' ? 'Watch' : resource.type === 'article' ? 'Read' : 'dfdf'
  };

  return (
    <div className="bg-gray-700/20 border  border-gray-600/40 rounded-lg p-4 flex flex-col">
      <div className="flex items-center space-x-3 mb-3">
        <div className={`p-2 rounded ${resource.status === 'completed' ? 'bg-green-600' : resource.status === 'in-progress' ? 'bg-blue-600' : resource.status === 'unlocked' ? (resource.type === 'video' ? 'bg-red-600' : 'bg-red-600') : 'bg-gray-500'} `}>
          {resource.icon}
        </div>
        <div>
          <h4 className="font-medium text-gray-100 line-clamp-1 max-md:line-clamp-2">{resource.title}</h4>
          <p className="text-gray-400 text-sm">{resource.duration}
            {
              resource.type === 'video' || (resource.type === 'youtube' && <>
                {" "}{" "} • <span className="text-gray-400 text-sm">score: {resource.sentiment.score}</span>
              </>)
            }
          </p>

        </div>
      </div>
      {
        resource.status !== 'locked' ?
        <Link target='_blank' href={`/learning-roadmap/${resource.roadmapId}/resource?id=${resource._id}&lesson=${resource.lessonId}`}
          className={`w-full py-2 rounded flex items-center justify-center text-sm transition-colors duration-200 ${buttonStyles[resource.status]}`}
        >
          {buttonText[resource.status]}
        </Link> : 
       <button
       className={`w-full py-2 rounded text-sm transition-colors duration-200 ${buttonStyles[resource.status]}`}>
        {buttonText[resource.status]}
      </button>
      }
    </div>
  );
};