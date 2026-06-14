import Image from 'next/image'
import React from 'react'

const MapPreview = () => {
  return (
    <>
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
        <div className="relative h-[180px] w-full">
          <Image
            src="/map.png"
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
