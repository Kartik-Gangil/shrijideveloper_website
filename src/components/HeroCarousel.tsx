import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import React, { useCallback, useEffect } from 'react'

interface HeroCarouselProps {
    images: string[];
}

const HeroCarousel = ({ images }: HeroCarouselProps) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true
    })
 // Auto slide every 4 seconds
    useEffect(() => {
        if (!emblaApi || images.length <= 1) return;

        const interval = setInterval(() => {
            emblaApi.scrollNext();
        }, 4000);

        return () => clearInterval(interval);
    }, [emblaApi, images.length]);
    return (
        // The container matches the exact width/height constraints of the original <img> slot
        <div className="w-full h-full overflow-hidden rounded-bl-[120px] md:rounded-bl-[200px]" ref={emblaRef}>
            <div className="flex h-full w-full">
                {images.map((data, index) => (
                    <div
                        key={index}
                        className="flex-[0_0_100%] min-w-0 h-full w-full relative"
                    >
                        <Image
                            src={data}
                            alt={`Premium real estate township slide ${index + 1}`}
                            width={1000}
                            height={1000}
                            priority={index === 0}
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HeroCarousel;