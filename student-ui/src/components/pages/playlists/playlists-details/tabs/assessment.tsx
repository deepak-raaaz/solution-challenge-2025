import { WandSparkles } from 'lucide-react';
import React from 'react'

const Assessment = ({user, data}:{user:any; data:any}) => {
  console.log(data.overview);
  
  return (
    <div id="reviews" className="space-y-6 max-md:space-y-3 bg-gray-800/10 border border-gray-700/40 p-4 rounded-lg ">
      <div className="flex justify-between">

        <h1 className='text-xl font-semibold mx-2'>Assessment</h1>
        {
              user && user._id === data.userId._id &&
              <button
                // onClick={() => generateThumbnailHandler(data._id)}
                // disabled={isGeneratingThumbnail}
                className={`px-4 py-2 cursor-pointer flex items-center bg-gradient-to-br from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white rounded-lg transition-colors duration-200 ${false ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
              >
                <WandSparkles className="w-4 h-4" />
                <span className="ml-2 text-sm font-semibold">
                  Generate Assessment
                  {/* {isGeneratingThumbnail ? 'Generating...' : 'Generate Thumbnail'} */}
                </span>
              </button>
            }
      </div>

      <div className="">
        {
          !data?.assessment  && <div className="">
            <p className="text-gray-400 text-sm text-center">No assessment available for this playlist.</p>
          </div>
        }
      </div>
        
    </div>
  )
}

export default Assessment