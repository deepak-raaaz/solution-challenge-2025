import React from 'react'

const Resource = ({roadmapId, resourceId}: {roadmapId:string, resourceId:string}) => {
  return (
    <div className='py-20'>
        id
        {roadmapId}
        {resourceId}
    </div>
  )
}

export default Resource