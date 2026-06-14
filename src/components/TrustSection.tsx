import { useState } from "react";
import { FileText, CreditCard, MapPin, ShieldCheck, Calculator } from "lucide-react";
import { motion } from "motion/react";
import { translations, Language } from "../utils/translation";

interface TrustSectionProps {
  language: Language;
}

export default function TrustSection({ language }: TrustSectionProps) {
  const t = translations[language].trust;

  // EMI Calculator State
  const [plotValue, setPlotValue] = useState(1500000); // 15 Lakhs default
  const [duration, setDuration] = useState(24); // 24 months default
  const [downpaymentPercent, setDownpaymentPercent] = useState(25); // 25% downpayment

  // Calculate values
  const downpaymentAmount = Math.round((plotValue * downpaymentPercent) / 100);
  const remainingAmount = plotValue - downpaymentAmount;
  const monthlyInstallment = Math.round(remainingAmount / duration);

  const icons = [
    <FileText className="h-7 w-7 text-secondary-green" />,
    <CreditCard className="h-7 w-7 text-primary-orange" />,
    <MapPin className="h-7 w-7 text-secondary-green" />,
    <ShieldCheck className="h-7 w-7 text-primary-orange" />
  ];

  const bgColors = ["bg-secondary-green/10", "bg-primary-orange/10", "bg-secondary-green/10", "bg-primary-orange/10"];
  const translateClasses = ["md:translate-y-6", "", "md:translate-y-6", ""];

  const trustCards = t.cards.map((card, idx) => ({
    ...card,
    icon: icons[idx],
    bgColor: bgColors[idx],
    translateClass: translateClasses[idx]
  }));

  return (
    <section id="emi-plans" className="py-24 bg-[#f4f1ea] relative">
      <div className="max-w-7xl mx-auto px-4 md:px-16">

        {/* Core Grid: Content Header On Left, Asymmetric Trust Cards On Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Why Choose Info Side */}
          <div className="lg:col-span-4 space-y-6">
            <span className="text-xs uppercase tracking-widest font-bold text-primary-orange bg-primary-orange/10 px-3.5 py-1.5 rounded-full font-noto-sans">
              {t.badge}
            </span>
            <h2 className="text-3xl md:text-4xl font-be-vietnam font-extrabold text-secondary-green tracking-tight leading-tight">
              {t.heading}
            </h2>
            <div className="w-16 h-1.5 bg-primary-orange rounded-full"></div>
            <p className="text-sm md:text-base font-noto-sans text-[#554336] leading-relaxed">
              {t.description}
            </p>

            {/* Interactive Badge */}
            <div className="p-4 bg-white/70 backdrop-blur-xs rounded-2xl border border-[#dbc2b0]/30 shadow-xs flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-secondary-green/10 flex items-center justify-center text-secondary-green">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="font-be-vietnam text-xs font-bold text-[#1a1c1c]">{t.badgeTitle}</p>
                <p className="font-noto-sans text-[11px] text-[#554336]">{t.badgeDesc}</p>
              </div>
            </div>
          </div>

          {/* Asymmetric Cards Panel */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6">
            {trustCards.map((card, idx) => (
              <div
                key={idx}
                className={`bg-white p-8 rounded-[36px] shadow-xs border border-secondary-green/5 hover:border-[#dbc2b0]/40 transition-all duration-300 group hover:-translate-y-1 ${card.translateClass}`}
              >
                <div className={`${card.bgColor} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300`}>
                  {card.icon}
                </div>
                <h3 className="font-be-vietnam text-lg md:text-xl font-bold text-[#1a1c1c] mb-2.5">
                  {card.title}
                </h3>
                <p className="font-noto-sans text-xs md:text-sm text-[#554336] leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
        {/* emi calculator */}
        {/* Interactive EMI Planner Sub-section 
        <div className="mt-20 bg-white rounded-[40px] shadow-sm p-6 md:p-10 border border-[#dbc2b0]/30">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary-green bg-secondary-green/10 px-3 py-1 rounded-full mb-3">
              <Calculator className="h-3.5 w-3.5" />
              {t.emi.pBadge}
            </span>
            <h3 className="text-2xl md:text-3xl font-be-vietnam font-extrabold text-[#1a1c1c] tracking-tight">
              {t.emi.pTitle}
            </h3>
            <p className="font-noto-sans text-xs md:text-sm text-[#554336] mt-1.5">
              {t.emi.pDesc}
            </p>
          </div>

          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            {/* Input Slider Controls 
            <div className="space-y-6 font-noto-sans text-sm">
              
              {/* Slider 1: Total Value 
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[#554336]">
                  <span className="font-semibold text-xs uppercase tracking-wider">{t.emi.estimatedPrice}</span>
                  <span className="text-secondary-green font-extrabold text-base">
                    ₹{(plotValue / 100000).toFixed(1)} {t.emi.lakhs}
                  </span>
                </div>
                <input 
                  type="range" 
                  min="800000" 
                  max="4000000" 
                  step="50000"
                  value={plotValue}
                  onChange={(e) => setPlotValue(Number(e.target.value))}
                  className="w-full accent-secondary-green h-2 bg-[#f4f1ea] rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#554336]/60">
                  <span>₹8.0 L</span>
                  <span>₹20.0 L</span>
                  <span>₹40.0 L</span>
                </div>
              </div>

              {/* Slider 2: Downpayment Percentage 
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[#554336]">
                  <span className="font-semibold text-xs uppercase tracking-wider">
                    {t.emi.downpayment}: {downpaymentPercent}%
                  </span>
                  <span className="text-primary-orange font-bold">
                    ₹{downpaymentAmount.toLocaleString("en-IN")}
                  </span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="50" 
                  step="5"
                  value={downpaymentPercent}
                  onChange={(e) => setDownpaymentPercent(Number(e.target.value))}
                  className="w-full accent-primary-orange h-2 bg-[#f4f1ea] rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#554336]/60">
                  <span>10% ({t.emi.min})</span>
                  <span>25%</span>
                  <span>50% ({t.emi.max})</span>
                </div>
              </div>

              {/* Selection Buttons: Duration 
              <div className="space-y-2.5">
                <span className="font-semibold text-xs uppercase tracking-wider text-[#554336] block">
                  {t.emi.tenure}
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {[12, 18, 24, 36].map((months) => (
                    <button
                      key={months}
                      onClick={() => setDuration(months)}
                      className={`py-3 px-1.5 rounded-xl text-center text-xs font-bold transition-all border cursor-pointer ${
                        duration === months 
                          ? "bg-secondary-green text-white border-secondary-green shadow-xs" 
                          : "bg-[#fdfbf7] text-[#554336] border-[#dbc2b0]/50 hover:bg-[#f4f1ea]"
                      }`}
                    >
                      {months} {t.emi.months}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Results Side 
            <div className="bg-[#fdfbf7] p-6 rounded-3xl border border-[#dbc2b0]/50 flex flex-col justify-between h-full font-noto-sans">
              <div className="space-y-5">
                <p className="text-center font-be-vietnam text-xs font-bold uppercase tracking-wider text-[#554336]/70">
                  {t.emi.summaryTitle}
                </p>
                
                <div className="space-y-3.5 text-sm">
                  <div className="flex justify-between items-center border-b border-[#dbc2b0]/20 pb-2">
                    <span className="text-[#554336]">{t.emi.immediateDownpayment}:</span>
                    <span className="font-bold text-[#1a1c1c]">₹{downpaymentAmount.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-[#dbc2b0]/20 pb-2">
                    <span className="text-[#554336]">{t.emi.principal}:</span>
                    <span className="font-bold text-[#1a1c1c]">₹{remainingAmount.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-[#554336]">{t.emi.roi}:</span>
                    <span className="font-extrabold text-secondary-green bg-secondary-green/10 px-2 py-0.5 rounded-sm text-xs">
                      {t.emi.roiFree}
                    </span>
                  </div>
                </div>
              </div>

              {/* Monthly Amount Display 
              <div className="text-center bg-secondary-green/5 rounded-2xl p-5 border border-secondary-green/10 mt-6 space-y-1">
                <span className="text-[11px] font-bold uppercase text-secondary-green tracking-widest block">
                  {t.emi.monthlyPayment}
                </span>
                <span className="text-3xl md:text-4xl font-extrabold font-be-vietnam text-secondary-green">
                  ₹{monthlyInstallment.toLocaleString("en-IN")}
                </span>
                <span className="text-[10px] text-[#554336]/70 block font-semibold">
                  {t.emi.zeroInterestText.replace("{duration}", String(duration))}
                </span>
              </div>
            </div>

          </div> 
      </div>*/}

    </div>
    </section >
  );
}
