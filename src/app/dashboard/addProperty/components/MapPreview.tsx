import Image from 'next/image'
import React from 'react'

const MapPreview = () => {
  return (
    <>
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
        <div className="relative h-[180px] w-full">
          <Image
            src="https://res.cloudinary.com/drd6gndvh/image/upload/f_auto,q_auto,w_800/v1781807042/copy_of_map_ewtvp3.png"
            alt="Map Preview"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </>
  )
}

export default MapPreview
