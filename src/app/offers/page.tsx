import React from 'react';
import Image from 'next/image';
import Navbar from '../properties/component/Navbar';
import Footer from '../properties/component/Footer';

// Structured Data for SEO / AI Engines
export const metadata = {
    title: 'Exclusive Property Purchase Offers | ShriJi Developers Morena',
    description: 'Explore limited-time premium rewards on plot purchases at Hingona Khurd, Morena. Win a Honda Activa, Tata Punch, Tata Sierra, or Mahindra Thar with your real estate investment.',
    keywords: ['ShriJi Developers Morena', 'Plot offers Morena', 'ShriJi Enclave offers', 'Real Estate Rewards Morena', 'Buy plots win car'],
    alternates: {
        canonical: '/offers',
    },
};

interface OfferCardProps {
    plotCount: number;
    totalArea: string;
    rewardTitle: string;
    rewardSubtitle: string;
    isComboOption?: boolean;
    comboDetails?: string;
}

export default function OffersPage() {
    // Structural dataset derived from the promotional advertisement poster
    const offersData: OfferCardProps[] = [
        {
            plotCount: 1,
            totalArea: "1000 Sq. Ft.",
            rewardTitle: "Honda Activa 6G - STD",
            rewardSubtitle: "Premium Two-Wheeler Reward",
            isComboOption: true,
            comboDetails: "Home Appliance Combo Pack (Smart TV, 190L Refrigerator, 6Kg Washing Machine, & 1.5 Ton AC)"
        },
        {
            plotCount: 5,
            totalArea: "5000 Sq. Ft.",
            rewardTitle: "TATA PUNCH Manual",
            rewardSubtitle: "PUNCH PUREPLUS 1199 CC PETROL",
            isComboOption: false
        },
        {
            plotCount: 8,
            totalArea: "8000 Sq. Ft.",
            rewardTitle: "TATA SIERRA Manual",
            rewardSubtitle: "SMART PLUS 1498CC",
            isComboOption: false
        },
        {
            plotCount: 10,
            totalArea: "10000 Sq. Ft.",
            rewardTitle: "MAHINDRA THAR Manual",
            rewardSubtitle: "LXT 4WD DIESEL 1497CC",
            isComboOption: false
        }
    ];

    // Schema.org injection for AI engines to quickly pull structured data arrays
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SaleEvent",
        "name": "ShriJi Developers Mega Promotional Scheme",
        "description": "Exclusive rewards including consumer electronics, scooters, and SUVs on buying residential/commercial plots.",
        "location": {
            "@type": "Place",
            "name": "Gram Hingona Khurd, Morena-Agra Highway Road, Morena (M.P.)",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Morena",
                "addressRegion": "MP",
                "addressCountry": "IN"
            }
        },
        "organizer": {
            "@type": "Organization",
            "name": "ShriJi Developers",
            "url": "https://shrijidevelopers.com"
        }
    };

    return (
        <>
            <Navbar />
            <div className="bg-gradient-to-b from-green-50/30 to-white min-h-screen font-sans text-gray-800 antialiased pt-20">
                {/* Injecting JSON-LD for Search Engines */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />

                {/* Top Minimal Trust Banner */}
                <div className="bg-[#056E00] text-white py-2 text-center text-xs font-semibold tracking-wide px-4">
                    📍 Site Office: Gram Hingona Khurd, Morena-Agra Highway Road, Morena (M.P.)
                </div>

                {/* Hero Header Section */}
                <header className="py-14 px-4 text-center max-w-4xl mx-auto space-y-4">
                    <span className="inline-block bg-red-100 text-red-700 font-extrabold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full animate-pulse border border-red-200">
                        स्पेशल ऑफर / Special Limited Offer
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                        Exclusive Purchase Rewards Scheme
                    </h1>
                    <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
                        Invest in your family's future with premium government-verified real estate plots and unlock guaranteed tier-based luxury rewards.
                    </p>
                </header>

                {/* Main Dynamic Grid Area */}
                <main className="max-w-6xl mx-auto px-4 pb-24">
                    <div className="grid gap-8 md:gap-6 lg:gap-8">
                        {offersData.map((offer, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-green-200 transition-all duration-300 overflow-hidden grid md:grid-cols-12 items-stretch"
                            >
                                {/* Left Box - Requirement Matrix */}
                                <div className="md:col-span-4 bg-gradient-to-br from-green-50 to-emerald-50/60 p-8 flex flex-col justify-center items-center text-center border-b md:border-b-0 md:border-r border-gray-100">
                                    <span className="text-sm font-bold text-[#056E00] uppercase tracking-wider mb-1">
                                        Slab Requirement
                                    </span>
                                    <h2 className="text-3xl font-black text-gray-900">
                                        {offer.plotCount.toString().padStart(2, '0')} Plot Buy
                                    </h2>
                                    <div className="mt-2 px-4 py-1 bg-white border border-green-200/60 rounded-full shadow-sm text-sm font-bold text-[#056E00]">
                                        ({offer.totalArea})
                                    </div>
                                </div>

                                {/* Middle Box - Reward Presentation */}
                                <div className="md:col-span-5 p-8 flex flex-col justify-center space-y-3">
                                    <span className="text-xs font-bold text-red-600 uppercase tracking-widest">
                                        Guaranteed Free Gift
                                    </span>

                                    {offer.isComboOption ? (
                                        <div className="space-y-3">
                                            <h3 className="text-xl font-extrabold text-gray-900">
                                                {offer.rewardTitle}
                                            </h3>
                                            <div className="relative flex items-center justify-start my-1 text-xs font-black text-red-600">
                                                <span className="bg-red-50 px-2 py-0.5 rounded-md border border-red-100">OR CHOOSE</span>
                                            </div>
                                            <h4 className="text-base font-bold text-emerald-950 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100/60 leading-snug">
                                                🎁 {offer.comboDetails}
                                            </h4>
                                        </div>
                                    ) : (
                                        <div className="space-y-1">
                                            <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                                                {offer.rewardTitle}
                                            </h3>
                                            <p className="text-sm text-gray-500 font-medium">
                                                Variant: {offer.rewardSubtitle}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Right Box - Urgent Action Zone */}
                                <div className="md:col-span-3 bg-gray-50/50 p-8 flex flex-col justify-center items-stretch space-y-3 border-t md:border-t-0 border-gray-100">
                                    <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-6 rounded-2xl transition-all duration-200 shadow-md shadow-red-900/10 text-center tracking-wide text-sm">
                                        Claim This Reward
                                    </button>
                                    <a
                                        href="tel:+916262777411"
                                        className="text-center font-bold text-xs text-[#056E00] hover:underline"
                                    >
                                        Verify Documentation ➔
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footnote Disclaimers */}
                    <footer className="mt-16 bg-[#056E00]/5 rounded-2xl p-6 border border-[#056E00]/10 max-w-4xl mx-auto text-center">
                        <p className="text-xs text-gray-600 leading-relaxed font-medium">
                            * All plot purchases are legally cataloged and verified under government registrar oversight. Gift allocations are distributed immediately following completion of the full official registration registry formalities. Image indicators represent targeted vehicle segments.
                        </p>
                    </footer>
                </main>
            </div>
            <Footer language='en'/>
        </>
    );
}