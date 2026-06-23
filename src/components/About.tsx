
import { Language, translations } from '@/utils/translation';
import Link from 'next/link';

interface About {
    language: Language
}

export default function AboutUsSummary({ language }: About) {
    const t = translations[language].about
    const highlights: string[] = [
        "RERA Approved Projects",
        "Transparent Documentation",
        "Prime Growth Locations",
        "Quality Infrastructure",
    ];

    return (
        <section id='about' className="py-20 px-4 bg-white border-b border-gray-100">
            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-12 gap-12 items-start">

                    {/* Left Column: Short Intro */}
                    <div className="lg:col-span-5 space-y-6">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#056E00] bg-green-50 px-3 py-1 rounded-full border border-green-200/60">
                            {t.title}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight">
                            {t.headline}
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            {t.description}
                        </p>
                        <div>
                            <Link
                                href="/aboutus"
                                className="inline-flex items-center justify-center font-semibold text-white bg-[#056E00] hover:bg-[#045200] px-6 py-3 rounded-xl transition-all duration-200 shadow-sm shadow-green-900/10"
                            >
                                {t.ctaBTN}
                                <span className="ml-2 font-bold">➔</span>
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Dynamic Feature Grid */}
                    <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6 w-full">
                        {t.highlights.map((feature, index) => (
                            <div
                                key={index}
                                className="p-6 bg-emerald-50/30 rounded-2xl border border-green-100/70 flex flex-col justify-between hover:shadow-md hover:border-green-200 transition-all duration-300"
                            >
                                <div className="space-y-4">
                                    <div className="w-10 h-10 bg-white text-[#056E00] flex items-center justify-center rounded-lg font-bold text-lg shadow-sm border border-green-100/60">
                                        ✓
                                    </div>
                                    <h3 className="font-bold text-lg text-gray-900">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                       {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}