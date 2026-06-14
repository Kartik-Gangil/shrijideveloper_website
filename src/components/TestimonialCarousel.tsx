"use client"

import useEmblaCarousel from "embla-carousel-react"
import { useCallback } from "react"

interface Testimonial {
    text: string;
    author: string;
    role: string;
}

export default function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true
    })

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    return (

        <div>

            {/* Carousel */}

            <div
                className="overflow-hidden py-5"
                ref={emblaRef}
            >

                <div className="flex">

                    {testimonials.map((testimonial, index) => (

                        <div
                            key={index}
                            className="flex-[0_0_100%] min-w-0 pr-4"
                        >

                            <div className="relative border border-[#E8D7CA] rounded-[32px] sm:rounded-[42px] p-8 sm:p-10">

                                {/* Quote */}

                                <div className="absolute -top-6 left-8 bg-[#f8f5f1] px-3">

                                    <span className="text-[#B56C00] text-6xl">

                                        ”

                                    </span>

                                </div>


                                <p className="italic text-[#666] md:leading-9 md:text-lg sm:text-sm mt-6">

                                    {testimonial.text}

                                </p>


                                <div className="flex items-center gap-4 mt-12">

                                    <div className="w-14 h-14 rounded-full bg-[#FFD9B5] sm:flex items-center justify-center hidden ">

                                        👤

                                    </div>

                                    <div>

                                        <h3 className="font-semibold text-2xl sm:text-lg">

                                            {testimonial.author}

                                        </h3>

                                        <p className="text-[#777] sm:text-sm">

                                            {testimonial.role}

                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>


            {/* Buttons */}

            <div className="flex gap-4 mt-8">

                <button
                    onClick={scrollPrev}
                    className="w-12 h-12 rounded-full border border-[#E8D7CA] hover:bg-white transition"
                >

                    ←

                </button>


                <button
                    onClick={scrollNext}
                    className="w-12 h-12 rounded-full border border-[#E8D7CA] hover:bg-white transition"
                >

                    →

                </button>

            </div>

        </div>

    )
}