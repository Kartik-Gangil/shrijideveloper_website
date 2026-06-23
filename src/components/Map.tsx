import { Language, translations } from '@/utils/translation'
import Image from 'next/image'
import React from 'react'

interface MapProps{
    language: Language
}

const Map = ({ language }: MapProps) => {
    const t = translations[language].navbar;
    return (
        <section id="map-layout" className="py-24 bg-white overflow-hidden text-[#1a1c1c]">
            <div className="max-w-7xl mx-auto px-4 md:px-16">
                <div className="max-w-xl text-left">
                    <h2 className="text-3xl md:text-4xl font-be-vietnam font-extrabold text-[#1a1c1c] tracking-tight">
                        {t.mapLayout}
                    </h2>
                </div>
                <div className="flex justify-center">
                    <div className="object-cover mt-4 p-4 bg-white w-fit h-fit rounded-2xl organic-radius shadow-lg">
                        <Image
                            src="/map.png"
                            className=""
                            width={1000}
                            height={800}
                            alt="map image"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Map
