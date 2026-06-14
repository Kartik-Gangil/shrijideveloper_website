import { Verified, ArrowRight, Download } from "lucide-react";
import { motion } from "motion/react";
import { translations, Language } from "../utils/translation";

interface HeroProps {
  onExplore: () => void;
  onOpenBrochure: () => void;
  language: Language;
}

export default function Hero({ onExplore, onOpenBrochure, language }: HeroProps) {
  const t = translations[language].hero;

  return (
    <section className="relative min-h-[92vh] pt-20 overflow-hidden bg-[#fdfbf7] flex items-center">
      {/* Background Section (Right Side on Desktop, Integrated on Mobile) */}
      <div className="absolute right-0 top-0 w-full md:w-2/3 h-full z-0 overflow-hidden">
        <img 
          alt="Lush green premium real estate township" 
          className="w-full h-full object-cover rounded-bl-[120px] md:rounded-bl-[200px]" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQq_Bjg4UE9i_tt4lGvziVvWolmDX2WHy9znhonz888bDjOgdK3cE_CqR7rJuBHoEZLrU_AiAy7ZZMRDR3L9dLhoG7pfuEBhWcMiUY9DA4kH_ZswglgCG_ajrVXqkLI55Z1j_MHgXRBLZ9B5nV7Y7jDxtPfR3ZaAtwtV3YPrzXYLdd_J8i_884mDDQUN97BDvHnRutejwLV9TnOAMG1_f5WGKcDEmHLNxYr7U9cC_aggAQHrQnBtjMx5UIbGXUFI5_AK3xXbi6zkM"
          referrerPolicy="no-referrer"
        />
        {/* Soft, modern ambient gradient overlay (hero-gradient from index.css) */}
        <div className="absolute inset-0 hero-gradient"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-16 py-12 md:py-24">
        <div className="max-w-2xl space-y-8 text-left">
          {/* Trust Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-secondary-green/15 text-secondary-green px-4 py-2 rounded-full text-xs md:text-sm font-semibold border border-secondary-green/20 shadow-xs"
          >
            <Verified className="h-4.5 w-4.5 fill-current text-secondary-green" />
            <span>{t.badge}</span>
          </motion.div>

          {/* Premium Headline with bilingual elements inside */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-3"
          >
            <h1 className="text-4xl md:text-6xl font-be-vietnam text-[#1a1c1c] leading-[1.12] font-extrabold tracking-tight">
              {t.titlePart1} <br />
              <span className="text-secondary-green relative inline-block mt-2">
                {t.titlePart2}
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary-orange/40" preserveAspectRatio="none" viewBox="0 0 100 10">
                  <path d="M0 5 Q 25 2 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4"></path>
                </svg>
              </span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base md:text-lg font-noto-sans text-[#554336] max-w-md leading-relaxed"
          >
            {t.description}
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 pt-2"
          >
            <button 
              onClick={onExplore}
              className="bg-primary-orange text-white px-8 py-4.5 organic-radius text-sm md:text-base font-bold flex items-center justify-center gap-2.5 hover:bg-primary-orange/90 active:scale-[0.98] transition-all shadow-lg shadow-primary-orange/20 cursor-pointer"
            >
              <span>{t.exploreBtn}</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button 
              onClick={onOpenBrochure}
              className="glass-panel text-[#1a1c1c] hover:bg-white px-8 py-4.5 organic-radius text-sm md:text-base font-bold flex items-center justify-center gap-2.5 active:scale-[0.98] transition-all border border-[#dbc2b0] cursor-pointer"
            >
              <span>{t.brochureBtn}</span>
              <Download className="h-5 w-5" />
            </button>
          </motion.div>

          {/* Value Stats list */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-3 gap-4 pt-6 max-w-lg border-t border-[#dbc2b0]/20 font-noto-sans"
          >
            <div>
              <p className="text-xl md:text-2xl font-bold text-secondary-green">100%</p>
              <p className="text-xs text-[#554336]/80">{t.statRegistry}</p>
            </div>
            <div>
              <p className="text-xl md:text-2xl font-bold text-secondary-green">0%</p>
              <p className="text-xs text-[#554336]/80">{t.statEmi}</p>
            </div>
            <div>
              <p className="text-xl md:text-2xl font-bold text-secondary-green">5000+</p>
              <p className="text-xs text-[#554336]/80">{t.statClients}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
