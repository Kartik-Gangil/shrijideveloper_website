import { useState } from "react";
import { Phone, Menu, X, Globe, User2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { translations, Language } from "../utils/translation";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface NavbarProps {
  onNavigate?: (section: string) => void;
  activeSection?: string;
  language?: Language;
  onToggleLanguage?: () => void;
}

export default function Navbar({ onNavigate, activeSection, language = 'hi', onToggleLanguage }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = translations[language].navbar;
  const router = useRouter();
  // const location = usePathname();
  // console.log("Current path:", location);


  const navItems = [
    { id: "projects", label: t.projects },
    { id: "emi-plans", label: t.emiPlans },
    { id: "process", label: t.process },
    { id: "contact", label: t.contact },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-[#dbc2b0]/20 shadow-xs">
      <nav className="flex justify-between items-center w-full px-4 md:px-16 py-4 max-w-7xl mx-auto">
        {/* Brand Logo and Text */}
        <div
          onClick={() => handleNavClick("hero")}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <Image
            src={"/logo.png"}
            alt="ShriJi Developer Logo"
            className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
            referrerPolicy="no-referrer"
            width={100}
            height={100}
          />
          <span className="font-be-vietnam text-sm md:text-2xl font-bold text-secondary-green tracking-tight">
            {t.brand}
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex gap-8 items-center font-noto-sans text-sm font-medium">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`pb-1 transition-all cursor-pointer border-b-2 hover:text-secondary-green ${activeSection === item.id
                  ? "text-secondary-green border-secondary-green font-bold"
                  : "text-[#554336] border-transparent hover:border-[#dbc2b0]"
                }`}
            >
              {item.label}
            </button>
          ))}
          <button

            onClick={() => router.push("/properties")}
            className={`pb-1 transition-all cursor-pointer border-b-2 hover:text-secondary-green "text-[#554336] border-transparent hover:border-[#dbc2b0]"
              }`}
          >
            Properties
          </button>


        </div>

        {/* Action Button, Language Toggle & Menu Toggle */}
        <div className="flex gap-2 sm:gap-4 items-center">
          {/* Language Toggle Button */}
          <button
            onClick={onToggleLanguage}
            className="flex items-center gap-1.5 bg-secondary-green/10 text-secondary-green hover:bg-[#056e00]/20 px-3 py-2 rounded-full font-noto-sans font-bold text-xs transition-all border border-secondary-green/20 cursor-pointer active:scale-95 shadow-2xs"
            aria-label="Toggle language between English and Hindi"
          >
            <Globe className="h-3.5 w-3.5" />
            <span className="hidden sm:inline-block">{language === "en" ? "हिन्दी" : "English"}</span>
            <span className="sm:hidden">{language === "en" ? "हि" : "En"}</span>
          </button>

          <a
            href="tel:+916262777411"
            className="bg-secondary-green text-white px-4 sm:px-5 py-2 rounded-full font-noto-sans text-xs md:text-sm font-semibold hover:shadow-lg hover:shadow-secondary-green/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">+916262777411</span>
            {/* <span className="sm:hidden">{t.call}</span> */}
          </a>
          <button
            title="user"
            onClick={() => router.push("/dashboard")}
            className={`pb-1 transition-all cursor-pointer border-b-2 hover:text-secondary-green "text-[#554336] border-transparent hover:border-[#dbc2b0]"
              }`}
          >
            <User2 />
          </button>
          {/* Toggle Hamburger on Mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-[#554336] hover:text-secondary-green focus:outline-hidden cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#fdfbf7] border-b border-[#dbc2b0]/30"
          >
            <div className="px-6 py-4 flex flex-col gap-4 font-noto-sans text-base font-medium">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left py-2 hover:text-secondary-green border-b border-[#dbc2b0]/10 ${activeSection === item.id
                      ? "text-secondary-green font-bold"
                      : "text-[#554336]"
                    }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 text-center text-xs text-[#554336]/60">
                {t.verifiedLayouts}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
