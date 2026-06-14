'use client';

import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
    images: string[];
}

export default function PropertyCarousel({ images }: Props) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
    });

    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollPrev = useCallback(() => {
        emblaApi?.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        emblaApi?.scrollNext();
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            setSelectedIndex(emblaApi.selectedScrollSnap());
        };

        onSelect();
        emblaApi.on('select', onSelect);

        return () => {
            emblaApi.off('select', onSelect);
        };
    }, [emblaApi]);

    // Auto slide every 4 seconds
    useEffect(() => {
        if (!emblaApi || images.length <= 1) return;

        const interval = setInterval(() => {
            emblaApi.scrollNext();
        }, 4000);

        return () => clearInterval(interval);
    }, [emblaApi, images.length]);

    return (
        <div className="absolute inset-0">
            {/* Carousel */}
            <div
                ref={emblaRef}
                className="overflow-hidden h-full"
            >
                <div className="flex h-full">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="flex-[0_0_100%] relative"
                        >
                            <Image
                                src={image}
                                alt={`Property Image ${index + 1}`}
                                fill
                                priority={index === 0}
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Show controls only if multiple images */}
            {images.length > 1 && (
                <>
                    {/* Previous Button */}
                    <button title='previous'
                        onClick={scrollPrev}
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    {/* Next Button */}
                    <button title='forward'
                        onClick={scrollNext}
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
                    >
                        <ChevronRight size={20} />
                    </button>

                    {/* Dots Indicator */}
                    {/* <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => emblaApi?.scrollTo(index)}
                                className={`h-2 w-2 rounded-full transition-all ${selectedIndex === index
                                    ? 'bg-white w-6'
                                    : 'bg-white/50'
                                    }`}
                            />
                        ))}
                    </div> */}
                </>
            )}
        </div>
    );
}