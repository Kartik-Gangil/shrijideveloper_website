import React from 'react';
import Image from 'next/image';
import Navbar from '../properties/component/Navbar';

// Types for structural data
interface CoreValue {
    title: string;
    description: string;
    icon: string;
}

export const metadata = {
    title: 'About Us , ShriJi Developers',
    description: 'Learn about ShriJi Developers, our mission, vision, and flagship RERA-approved project, ShriJi Enclave. Building modern, sustainable, and value-driven communities.',
};

export default function AboutUsPage() {
    const whyChooseUs: string[] = [
        "RERA Approved Projects",
        "Transparent Documentation",
        "Prime Growth Locations",
        "Quality Infrastructure",
        "Customer-Centric Approach",
        "Long-Term Investment Value"
    ];

    const missionPoints: string[] = [
        "Deliver legally compliant and transparent real estate projects.",
        "Develop modern infrastructure and quality amenities.",
        "Create secure and well-planned residential communities.",
        "Build lasting relationships through trust and customer satisfaction."
    ];

    return (
        <>
            <Navbar />
            <div className="bg-emerald-50/40 min-h-screen pt-5 font-sans text-gray-800">

                {/* Hero Section */}
                <section className="bg-[#056E00] text-white py-20 px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
                            About ShriJi Developers
                        </h1>
                        <p className="text-lg md:text-xl text-green-100 max-w-2xl mx-auto opacity-90">
                            Building trust, transparent communities, and long-term value for families and investors.
                        </p>
                    </div>
                </section>

                {/* Main Content & Story */}
                <section className="py-16 px-4 max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-gray-900 border-b-4 border-[#056E00] w-fit pb-2">
                                Our Journey & Commitment
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                At ShriJi Developers, we are committed to creating thoughtfully planned communities that combine modern infrastructure, legal transparency, and long-term value. Our mission is to provide families and investors with secure opportunities to build their future in well-developed and strategically located townships.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                With a strong focus on quality planning and customer satisfaction, we strive to develop projects that offer not just plots, but complete lifestyles. Every development is designed with attention to infrastructure, connectivity, green spaces, and essential amenities to ensure a comfortable and sustainable living environment.
                            </p>
                        </div>
                        <div className="relative h-72 md:h-96 w-full rounded-xl overflow-hidden shadow-lg bg-green-50 border border-green-100 organic-radius ">
                            {/* Replace with your actual image path */}
                            <div className="absolute inset-0 flex items-center justify-center bg-[#056E00]/5 text-[#056E00] font-semibold">
                                <Image src={"https://res.cloudinary.com/drd6gndvh/image/upload/v1782237156/Screenshot_2026-06-23_232021_svikyt.png"} width={1000} height={1000} alt='[ ShriJi Developers Township Concept Image ]' />

                            </div>
                        </div>
                    </div>
                </section>

                {/* Flagship Project Highlight */}
                <section className="bg-white py-16 px-4 border-y border-green-100">
                    <div className="max-w-4xl mx-auto text-center space-y-6">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#056E00] bg-green-50 px-3 py-1 rounded-full border border-green-200/60">
                            Flagship Project
                        </span>
                        <h2 className="text-3xl font-bold text-gray-900">ShriJi Enclave</h2>
                        <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
                            ShriJi Enclave is a landmark development and one of the region's pioneering
                            <strong className="text-[#056E00] font-bold"> RERA-approved townships</strong>. Developed with all necessary approvals and a commitment to transparency, ShriJi Enclave reflects our vision of delivering reliable and future-ready residential destinations.
                        </p>
                        <div className="flex flex-col items-center justify-center gap-2 p-4 bg-gray-50 border border-gray-100 rounded-xl shadow-sm max-w-3xl mx-auto">
                            <p className="font-semibold text-gray-700 text-lg leading-relaxed m-0">
                                Call Us at
                            </p>

                            <div className="flex flex-wrap justify-center gap-2 text-lg font-bold text-[#056E00]">
                                <a href="tel:6262777411" className="border-b-2 border-transparent hover:border-[#056E00] transition-colors ease-in-out duration-300 pb-0.5">6262777411</a>
                                <span className="text-gray-300 font-normal">|</span>
                                <a href="tel:6262777412" className="border-b-2 border-transparent hover:border-[#056E00] transition-colors ease-in-out duration-300 pb-0.5">6262777412</a>
                                <span className="text-gray-300 font-normal">|</span>
                                <a href="tel:6262777413" className="border-b-2 border-transparent hover:border-[#056E00] transition-colors ease-in-out duration-300 pb-0.5">6262777413</a>
                                <span className="text-gray-300 font-normal">|</span>
                                <a href="tel:6262777414" className="border-b-2 border-transparent hover:border-[#056E00] transition-colors ease-in-out duration-300 pb-0.5">6262777414</a>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 italic max-w-2xl mx-auto">
                            "At ShriJi Developers, we believe that trust is the foundation of every successful relationship. Through ethical business practices, clear documentation, and customer-centric service, we aim to become a preferred name in real estate development."
                        </p>
                    </div>
                </section>

                {/* Vision & Mission Grid */}
                <section className="py-16 px-4 max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
                    {/* Vision Card */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-green-100/70 flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 bg-green-50 text-[#056E00] flex items-center justify-center rounded-xl mb-6 font-bold text-xl border border-green-100">
                                👁️
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                            <p className="text-gray-600 leading-relaxed">
                                To create modern, sustainable, and value-driven communities that enhance the quality of life for residents while delivering strong long-term returns for investors.
                            </p>
                        </div>
                    </div>

                    {/* Mission Card */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-green-100/70">
                        <div className="w-12 h-12 bg-green-50 text-[#056E00] flex items-center justify-center rounded-xl mb-6 font-bold text-xl border border-green-100">
                            🎯
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                        <ul className="space-y-3">
                            {missionPoints.map((point, index) => (
                                <li key={index} className="flex items-start gap-3 text-gray-600">
                                    <span className="text-[#056E00] mt-1 font-bold">➔</span>
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Why Choose Us Section */}
                <section className="bg-[#056E00] text-white py-16 px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <h2 className="text-3xl font-bold tracking-tight mb-4 text-white">Why Choose Us</h2>
                            <p className="text-green-100/80">
                                We focus on core legalities, infrastructure excellence, and growth prospects.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {whyChooseUs.map((feature, index) => (
                                <div
                                    key={index}
                                    className="bg-white/10 p-6 rounded-xl border border-white/10 flex items-center gap-4 hover:bg-white/15 hover:border-white/30 transition-all duration-300 group"
                                >
                                    <span className="text-lg bg-white text-[#056E00] px-2 py-0.5 rounded-lg font-bold shadow-sm">
                                        ✓
                                    </span>
                                    <span className="font-semibold text-white">
                                        {feature}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            </div>
        </>
    );
}