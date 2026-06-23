import { motion } from "motion/react";
import { CheckCircle2, Compass, ShieldCheck, Map, CreditCard } from "lucide-react";
import { translations, Language } from "../utils/translation";

interface JourneyProps {
  language: Language;
}

export default function Journey({ language }: JourneyProps) {
  const t = translations[language].journey;

  const steps = [
    {
      num: "01",
      title: t.steps[0].title,
      desc: t.steps[0].desc,
      details: t.steps[0].details,
      icon: <Compass className="h-6 w-6 text-white" />
    },
    {
      num: "02",
      title: t.steps[1].title,
      desc: t.steps[1].desc,
      details: t.steps[1].details,
      icon: <Map className="h-6 w-6 text-white" />
    },
    {
      num: "03",
      title: t.steps[2].title,
      desc: t.steps[2].desc,
      details: t.steps[2].details,
      icon: <CreditCard className="h-6 w-6 text-white" />
    },
    {
      num: "04",
      title: t.steps[3].title,
      desc: t.steps[3].desc,
      details: t.steps[3].details,
      icon: <ShieldCheck className="h-6 w-6 text-white" />
    }
  ];

  return (
    <section id="process" className="py-24 bg-secondary-green text-white relative overflow-hidden">
      {/* Decorative vectors top-right & bottom-left */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 asymmetric-blob -mr-32 -mt-32"></div>
      <div className="absolute -bottom-24 -left-20 w-80 h-80 bg-white/5 asymmetric-blob"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-16 text-center">

        {/* Header Block */}
        <div className="max-w-xl mx-auto mb-20 space-y-3">
          <span className="text-[10px] sm:text-xs uppercase tracking-widest font-bold text-[#8dfc75] bg-white/10 px-3.5 py-1.5 rounded-full inline-block">
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-be-vietnam font-extrabold tracking-tight">
            {t.heading}
          </h2>
          <p className="font-noto-sans text-xs md:text-sm text-white/85 max-w-md mx-auto leading-relaxed">
            {t.pDesc}
          </p>
        </div>

        {/* Steps Grid System */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => {
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative group p-6 bg-white/5 rounded-[36px] border border-white/10 flex flex-col justify-between h-full font-noto-sans hover:bg-white/10 transition-all duration-300"
              >

                {/* Visual Line connector for desktop */}
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-16 -right-6 w-12 h-[2px] bg-white/25 z-0" />
                )}

                <div>
                  {/* Step Icon and Number */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="w-14 h-14 bg-white/10 rounded-[20px] flex items-center justify-center transform group-hover:bg-primary-orange transition-colors duration-500">
                      {step.icon}
                    </div>
                    <span className="text-3xl font-be-vietnam font-bold text-[#8dfc75]">
                      {step.num}
                    </span>
                  </div>

                  {/* Step Titles & Descriptions */}
                  <div className="text-left space-y-2.5">
                    <h4 className="text-lg md:text-xl font-be-vietnam font-bold">
                      {step.title}
                    </h4>
                    <p className="text-xs md:text-sm text-white/80 leading-relaxed font-normal">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Small Helpful tooltip style details at the bottom of card */}
                {step.details === "" ? <></> : <div className="mt-6 pt-4 border-t border-white/10 text-left">
                  <p className="text-[10px] text-[#8dfc75] font-semibold tracking-wide flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>{language === "en" ? "How it works:" : "कैसे काम करता है:"}</span>
                  </p>
                  <p className="text-[10px] text-white/65 leading-relaxed mt-1 font-medium italic">
                    {step.details}
                  </p>
                </div>}

              </motion.div>
            );
          })}
        </div>

        {/* Small process note block */}
        <div className="mt-16 inline-flex flex-col sm:flex-row items-center gap-3 bg-white/10 p-4 rounded-2xl border border-white/10 text-left font-noto-sans max-w-2xl mx-auto">
          <p className="text-xs font-semibold leading-relaxed text-center sm:text-left">
            💡 {t.tip}
          </p>
        </div>

      </div>
    </section>
  );
}
