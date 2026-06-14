import { Language, translations } from "@/utils/translation";
import { MapPin, Shield, CheckCircle, FileText } from "lucide-react";
import Image from "next/image";

interface FooterProps {
  onNavigate: (section: string) => void;
  language: Language;
}

export default function Footer({ onNavigate, language }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const t = translations[language].footer;
  const b = translations[language].navbar;

  return (
    <footer className="bg-[#f4f1ea] py-16 border-t border-[#dbc2b0]/35 font-noto-sans text-xs md:text-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-16 text-center space-y-10">

        {/* Brand alignment */}
        <div className="flex flex-col items-center gap-3.5">
          <Image
            src={"/logo.png"}
            alt="ShriJi Developer Logo"
            className="h-14 w-auto object-contain"
            referrerPolicy="no-referrer"
            width={120}
            height={56}
          />
          <div className="font-be-vietnam text-xl font-bold text-secondary-green tracking-tight">
            {b.brand}
          </div>
          <p className="max-w-md text-[#554336]/80 text-xs text-center mt-1 leading-relaxed">
           {t.desc}
          </p>
        </div>

        {/* Navigation columns */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 font-semibold">
          <button
            onClick={() => onNavigate("projects")}
            className="text-[#554336] hover:text-secondary-green transition-colors cursor-pointer"
          >
            {b.projects}
          </button>
          <button
            onClick={() => onNavigate("emi-plans")}
            className="text-[#554336] hover:text-secondary-green transition-colors cursor-pointer"
          >
            {b.emiPlans}
          </button>
          <button
            onClick={() => onNavigate("process")}
            className="text-[#554336] hover:text-secondary-green transition-colors cursor-pointer"
          >
            {b.process}
          </button>
          <button
            onClick={() => onNavigate("contact")}
            className="text-[#554336] hover:text-secondary-green transition-colors cursor-pointer"
          >
            {b.contact}
          </button>
        </div>

        {/* Legal clearances list labels */}
        <div className="flex flex-wrap justify-center items-center gap-6 text-[11px] text-[#554336]/60 border-t border-b border-[#dbc2b0]/25 py-6 max-w-3xl mx-auto font-medium">
          <div className="flex items-center gap-1.5">
            <Shield className="h-4 w-4 text-secondary-green" />
            <span>{t.clearanceRera}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle className="h-4 w-4 text-secondary-green" />
            <span>{t.clearanceBoundary}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FileText className="h-4 w-4 text-secondary-green" />
            <span>{t.clearanceRegistry}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-secondary-green" />
            <span>{t.clearanceCabs}</span>
          </div>
        </div>

        {/* Copyright notice */}
        <div className="space-y-1.5 text-xs text-[#554336]/60 font-semibold pt-4">
          <p>© {currentYear} ShriJi Developer. Govt. Verified & RERA Approved Layouts.</p>
          <p className="text-[10px] font-medium opacity-80 leading-relaxed">
            All images, blueprints, landmarks shown are reference representations of actual developments and subject to mutual final registry contracts.
          </p>
        </div>

      </div>
    </footer>
  );
}
