"use client"
import { useLearningResourceQuery } from '@/redux/features/api/generate/generateApi';
import React from 'react'
import VideoContent from './video/video-content';
import ArticleContent from './article/article-content';

const Resource = ({ roadmapId, resourceId }: { roadmapId: string, resourceId: string }) => {

  const { data, isLoading, error } = useLearningResourceQuery(resourceId);

  if (isLoading) return <div className="py-20 text-gray-100">Loading...</div>;
  if (error || !data?.resource) return <div className="py-20 text-red-500">Error loading module</div>;

  const resource = data.resource;


  return (
    <section id="module-viewer" className="min-h-screen my-20 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          {/* <ModuleHeader module={transformedModule} roadmapTitle={roadmapData.title} /> */}
          <div className="relative">
            {/* left side  */}
            {
              resource.type === 'article' ?
              <ArticleContent resource={resource}/> :

              <VideoContent
                resource={resource}
              />
            }
            
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-6">
            {/* Right side  */}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Resource