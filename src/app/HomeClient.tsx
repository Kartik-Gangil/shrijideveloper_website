'use client'
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check, Download, HelpCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustSection from "@/components/TrustSection";
import Projects from "@/components/Projects";
import Journey from "@/components/Journey";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { translations, Language } from "@/utils/translation";
import Image from "next/image";
import Features from "@/components/Features";
import Map from "@/components/Map";
import AboutUsSummary from "@/components/About";
import Link from "next/link";

interface Submissions {
    name: string;
    phone: string;
    project: string;
    dateTime: string;
    ticketId: string;
}


// const message = "Hello, I’m looking to inquire about your available plots. Please share a brochure or have a representative call me back at your earliest convenience."

export default function App() {
    const [language, setLanguage] = useState<Language>("hi");
    const [activeSection, setActiveSection] = useState("hero");
    const [prefilledProject, setPrefilledProject] = useState<string>("");

    const t = translations[language];
    // Interactive Brochure State

    const [brochureOpen, setBrochureOpen] = useState(false);
    const [offerOpen, setOfferOpen] = useState(false);
    const [brochureName, setBrochureName] = useState("");
    const [brochurePhone, setBrochurePhone] = useState("");
    const [brochureError, setBrochureError] = useState("");
    const [brochureSuccess, setBrochureSuccess] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [hasBrochureClosed, setHasBrochureClosed] = useState(false);

    useEffect(() => {
        const hasSeenPopup = sessionStorage.getItem('hasSeenPopup');
        if (!hasSeenPopup) {
            // 2. Agar nahi aaya hai, toh 5 second ka timer start karein
            const timer = setTimeout(() => {
                setBrochureOpen(true);
                // 3. sessionStorage me mark kar dein ki popup dikha diya gaya hai
                sessionStorage.setItem('hasSeenPopup', 'true');
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, []);


    // 2. Custom close handler for the Brochure Dialog
    const closeBrochureAndOpenOffers = () => {
        setBrochureOpen(false);

        // Only trigger the offer dialog if it hasn't been handled yet
        if (!hasBrochureClosed) {
            setHasBrochureClosed(true);

            // Optional: Add a tiny micro-delay (e.g., 300ms) so the exit animation finishes smoothly
            setTimeout(() => {
                setOfferOpen(true);
            }, 3000);
        }
    };



    // Smooth scroll handler
    const handleScrollToSection = (sectionId: string) => {
        setActiveSection(sectionId);
        const element = document.getElementById(sectionId);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    // Prefill callback form when user clicks Details or Inquire
    const handleInquireProject = (projectName: string) => {
        setPrefilledProject(projectName);
        handleScrollToSection("contact");
    };

    // Handles simulated Brochure generation & mock PDF download
    const handleBrochureSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setBrochureError("");

        if (!brochureName.trim()) {
            setBrochureError(t.brochure.errName);
            return;
        }
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(brochurePhone.trim().replace(/\D/g, ""))) {
            setBrochureError(t.brochure.errPhone);
            return;
        }
        const res = await fetch("/api/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: brochureName,
                phone: brochurePhone,
            }),
        })
        // console.log("Response from server:", res);

        setBrochureName("");
        setBrochurePhone("");

        setBrochureSuccess(true);
        let currentProgress = 0;
        setDownloadProgress(0);

        // Simulate PDF compilation countdown progress bar
        const interval = setInterval(() => {
            currentProgress += 20;

            if (currentProgress >= 100) {
                clearInterval(interval);
                setDownloadProgress(100);
                triggerBrochureDownload(); // Bina kisi event ke normal call karo
            } else {
                setDownloadProgress(currentProgress);
            }
        }, 200);
    };



    const triggerBrochureDownload = (e?: React.FormEvent) => {
        if (e) {
            e.preventDefault();    // Browser ka default action roko
            e.stopPropagation();   // Event ko upar bubble hone se roko
        }
        // 1. Apne Cloudinary ke actual URLs yahan paste karein
        const PdfUrl = "/shri ji pdf.pdf";

        // 2. Language ke basis par sahi URL aur file name select karein
        let targetUrl = PdfUrl;
        const fileName = "ShriJi_Developers_Brochure_2026.pdf";

        // 3. Cloudinary URL me 'fl_attachment' jodna taaki browser me PDF khulne ki jagah download ho
        if (targetUrl.includes('upload/')) {
            targetUrl = targetUrl.replace('upload/', 'upload/fl_attachment/');
        }

        // 4. Temporary link create karke click karwana
        const link = document.createElement("a");
        link.href = targetUrl;
        link.setAttribute('download', fileName);

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    const feature = [
        {
            id: 1,
            image: "https://upload.wikimedia.org/wikipedia/commons/5/5a/House_with_flag_Pinhead_icon.svg",
            text: "club house"
        },
        {
            id: 2,
            image: "https://upload.wikimedia.org/wikipedia/commons/9/94/Noun_Temple_tower_346642.svg",
            text: "temple"
        },
        {
            id: 3,
            image: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Pool_%28CoreUI_Icons_v1.0.0%29.svg",
            text: "swimming pool"
        },
        {
            id: 4,
            image: "https://upload.wikimedia.org/wikipedia/commons/8/82/Maki1-garden-10.svg",
            text: "garden"
        },
        {
            id: 5,
            image: "https://upload.wikimedia.org/wikipedia/commons/7/75/Map_icons_by_Scott_de_Jonge_-_gym.svg",
            text: "gym"
        },
        {
            id: 6,
            image: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Maki2-town-hall-24.svg",
            text: "party hall"
        },
        {
            id: 7,
            image: "https://upload.wikimedia.org/wikipedia/commons/4/44/Car_-_The_Noun_Project.svg",
            text: "big parking"
        },
        {
            id: 8,
            image: "https://upload.wikimedia.org/wikipedia/commons/6/66/Manhole_cover_with_sewage_pipe_cross_section_Pinhead_icon.svg",
            text: "underground sewer line"
        },
        {
            id: 9,
            image: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Road_-_Delapouite_-_game-icons.svg",
            text: "40 feet wide roads"
        },
        {
            id: 10,
            image: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Adwaita_thunderbolt-symbolic.svg",
            text: "electricity"
        },
        {
            id: 11,
            image: "https://upload.wikimedia.org/wikipedia/commons/0/01/Safety_and_Security_-_The_Noun_Project.svg",
            text: "24 x 7 security"
        },
        {
            id: 12,
            image: "https://upload.wikimedia.org/wikipedia/commons/4/41/CCTV_surveillance_camera.svg",
            text: "cctv camera"
        },
        {
            id: 13,
            image: "https://upload.wikimedia.org/wikipedia/commons/d/df/Solar_panel_-_The_Noun_Project.svg",
            text: "solar light"
        }
    ];

    // Detect which section is in view to highlight in navbar
    useEffect(() => {
        const handleIntersectionScroll = () => {
            const sections = ["hero", "projects", "emi-plans", "process", "contact"];
            const scrollPosition = window.scrollY + 150;

            for (const section of sections) {
                const el = document.getElementById(section === "emi-plans" ? "emi-plans" : section);
                if (el) {
                    const top = el.offsetTop;
                    const height = el.offsetHeight;
                    if (scrollPosition >= top && scrollPosition < top + height) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleIntersectionScroll);
        return () => window.removeEventListener("scroll", handleIntersectionScroll);
    }, []);

    const quickChips = language === "en"
        ? ["Plot Starting Rates?", "zero EMI details?", "RERA Approved layouts?", "Book a cab site visit?"]
        : ["प्लॉट का शुरुआत रेट?", "0% ब्याज ईएमआई?", "रेरा पास नक्शा कहाँ है?", "निःशुल्क साइट गाड़ी?"];

    return (
        <div className="bg-[#fdfbf7] text-[#1a1c1c] font-noto-sans min-h-screen relative antialiased selection:bg-secondary-green/20">

            {/* 1. Header Navigation System */}
            <Navbar
                activeSection={activeSection}
                onNavigate={handleScrollToSection}
                language={language}
                onToggleLanguage={() => setLanguage(prev => prev === "en" ? "hi" : "en")}
            />
            {/* 2. Hero Interactive Stage */}
            <div id="hero">
                <Hero
                    language={language}
                    onExplore={() => handleScrollToSection("projects")}
                    onOpenBrochure={() => {
                        setBrochureOpen(true);
                        setBrochureSuccess(false);
                        setBrochureName("");
                        setBrochurePhone("");
                        setBrochureError("");
                    }}
                />
            </div>
            <Features feature={feature} />
            {/* 4. Listed townships vertical stack with active layout grid tap Selection */}
            <Projects language={language} onInquireProject={handleInquireProject} />

            <Map language={language} />

            {/* 3. Why Choose trust framework & EMI interactive slider Math */}
            <TrustSection language={language} />


            {/* 5. Process flow map */}
            <Journey language={language} />

            {/* 6. Form submissions with callback and detailed feedback popup logs */}
            <Contact
                language={language}
                prefilledProject={prefilledProject}
                onClearPrefill={() => setPrefilledProject("")}
            />
            <AboutUsSummary language={language} />
            {/* 7. Footer standard clearances */}
            <Footer language={language} onNavigate={handleScrollToSection} />

            {/* 8. Interactive Brochure Generation Modal */}
            <AnimatePresence>
                {brochureOpen && (
                    <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setBrochureOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 15 }}
                            className="relative bg-white rounded-[36px] max-w-md w-full p-6 md:p-8 shadow-2xl border border-[#dbc2b0]/50 z-10 font-noto-sans"
                        >
                            <button
                                onClick={() => closeBrochureAndOpenOffers()}
                                className="absolute top-5 right-5 p-2 rounded-full hover:bg-secondary-green/10 text-[#554336] cursor-pointer"
                                aria-label="Close brochure modal"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            {!brochureSuccess ? (
                                <form onSubmit={handleBrochureSubmit} className="space-y-6">
                                    <div className="text-center space-y-1">
                                        <Download className="h-10 w-10 text-secondary-green mx-auto mb-2" />
                                        <h4 className="text-xl md:text-2xl font-be-vietnam font-bold text-[#1a1c1c] tracking-tight">
                                            {t.brochure.formTitle}
                                        </h4>
                                        <p className="text-xs text-[#554336]">
                                            {t.brochure.formDesc}
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-[11px] font-bold uppercase text-[#554336]/80 mb-1.5 text-left">
                                                {t.brochure.labelName}
                                            </label>
                                            <input
                                                type="text"
                                                value={brochureName}
                                                onChange={(e) => setBrochureName(e.target.value)}
                                                placeholder={t.brochure.placeholderName}
                                                className="w-full bg-[#fdfbf7] p-3.5 border border-[#dbc2b0]/40 rounded-xl outline-hidden text-xs md:text-sm focus:ring-2 focus:ring-secondary-green"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[11px] font-bold uppercase text-[#554336]/80 mb-1.5 text-left">
                                                {t.brochure.labelPhone}
                                            </label>
                                            <input
                                                type="tel"
                                                value={brochurePhone}
                                                onChange={(e) => setBrochurePhone(e.target.value)}
                                                placeholder={t.brochure.placeholderPhone}
                                                className="w-full bg-[#fdfbf7] p-3.5 border border-[#dbc2b0]/40 rounded-xl outline-hidden text-xs md:text-sm focus:ring-2 focus:ring-secondary-green"
                                            />
                                        </div>
                                    </div>

                                    {brochureError && (
                                        <p className="text-xs text-red-500 font-bold bg-red-50 p-2.5 rounded-lg text-center flex items-center justify-center gap-1">
                                            <HelpCircle className="h-4 w-4" />
                                            <span>{brochureError}</span>
                                        </p>
                                    )}

                                    <button
                                        type="submit"
                                        className="w-full py-4 bg-primary-orange text-white rounded-xl font-bold text-xs md:text-sm shadow-md cursor-pointer hover:bg-primary-orange/95 tracking-wide"
                                    >
                                        {t.brochure.submitBtn}
                                    </button>
                                </form>
                            ) : (
                                <div className="text-center py-6 space-y-6">
                                    {/* Progress state */}
                                    <div className="w-16 h-16 bg-secondary-green/10 text-secondary-green rounded-full flex items-center justify-center mx-auto mb-4 scale-110">
                                        <Check className="h-8 w-8" />
                                    </div>

                                    <h4 className="text-xl font-be-vietnam font-bold text-secondary-green tracking-tight">
                                        {t.brochure.successMsg}
                                    </h4>

                                    <div className="space-y-2">
                                        <div className="w-full h-2 bg-[#f4f1ea] rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${downloadProgress}%` }}
                                                className="h-full bg-secondary-green"
                                            />
                                        </div>
                                        <p className="text-[10px] text-[#554336]/70 font-semibold uppercase tracking-wider">
                                            {t.brochure.progressBar} ({downloadProgress}%)
                                        </p>
                                    </div>

                                    {downloadProgress >= 100 ? (
                                        <div className="space-y-4">
                                            <p className="text-xs text-[#554336] leading-relaxed max-w-sm mx-auto">
                                                {t.brochure.downloadSuccess}
                                            </p>
                                            <button
                                                onClick={triggerBrochureDownload}
                                                className="inline-flex items-center gap-1.5 font-bold text-xs bg-secondary-green text-white px-5 py-3 rounded-lg hover:shadow-md cursor-pointer transition-shadow"
                                            >
                                                <Download className="h-4 w-4" />
                                                <span>{t.brochure.forceDownload}</span>
                                            </button>
                                        </div>
                                    ) : null}
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <div className="w-full max-w-4xl mx-auto p-4 space-y-6">

                {/* Primary Display (First 2 Offers Shown) */}


                {/* Modal Overlay Sheet */}
                <AnimatePresence>
                    {offerOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

                            {/* Backdrop Background Click-to-Dismiss */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setBrochureOpen(false)}
                                className="absolute inset-0 bg-black/60 backdrop-blur-xs"
                            />

                            {/* Modal Pop Card Content container */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                                className="relative bg-white rounded-[36px] max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-gray-200 z-10 space-y-4"
                            >
                                <button
                                    title="close"
                                    onClick={() => setOfferOpen(false)}
                                    className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-700 cursor-pointer transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>

                                <h3 className="text-xl font-bold text-gray-900 tracking-tight pb-2 border-b border-gray-100">
                                    Additional Premium Tiers
                                </h3>

                                {/* Remaining locked offers directly shown without forms */}
                                <div className="space-y-3">
                                    <Image src={"https://res.cloudinary.com/drd6gndvh/image/upload/v1782210697/offer_qhgky9.png"} width={1000} height={1000} alt="offer image" />
                                </div>
                                <div className="text-center">
                                    <Link
                                        href={'/offers'}
                                        className="bg-[#056E00] hover:bg-[#045200] text-white font-bold px-6 py-3 rounded-xl transition-all duration-200 cursor-pointer text-sm shadow-sm"
                                    >
                                        View More Offers
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>


            {/* 9. Floating WhatsApp Widget Support Panel */}
            {/* Chat Drawer Widget Panel */}
            {/* <AnimatePresence>
          {chatOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="bg-white rounded-[32px] w-[330px] sm:w-[370px] shadow-2xl border border-secondary-green/25 overflow-hidden flex flex-col h-[460px] pointer-events-auto"
            >
             
              <div className="bg-secondary-green p-4 flex justify-between items-center text-white">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <img 
                      src="https://lh3.googleusercontent.com/aida/AP1WRLsy7uNc3YT1Js7q2ANZPwqT99W_HypKtNw9mTRmxT2gjwz1TJ2jp_tHyD1h3oxDfQu3yGMdzgpDYV6JAY6XM0abMEWQWnQLRGXRgu6MLbi72fCQVQeUiXfdkCGbzHXeGBF7zsGljYczFluj7o_-UuLe28eOZLrKkRBpsjhK-Wm0ehpPowLtd6SPzJMGt3_uhbnPxk3vQuOm6J3rRAY0EAnyiB3ehgdW0TAjObxQWylD7xitpkeCvZjBrpU" 
                      className="w-10 h-10 object-contain bg-white rounded-full p-1"
                      alt="Agent Avatar"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#8dfc75] rounded-full border border-secondary-green"></span>
                  </div>
                  <div className="text-left">
                    <h5 className="font-be-vietnam font-bold text-sm tracking-wide">{t.whatsapp.title}</h5>
                    <p className="text-[10px] text-white/80">{t.whatsapp.status}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setChatOpen(false)}
                  className="p-1 hover:bg-white/10 rounded-full cursor-pointer text-white"
                  aria-label="Close WhatsApp simulation"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

            
              <div className="flex-1 p-4 overflow-y-auto bg-[#faf7f2] space-y-3 scrollbar-none flex flex-col">
                {chatMessages.map((msg, idx) => {
                  const isAgent = msg.sender === "agent";
                  return (
                    <div 
                      key={idx}
                      className={`max-w-[80%] rounded-[20px] p-3.5 text-xs font-medium leading-relaxed text-left ${
                        isAgent 
                          ? "bg-white text-[#1a1c1c] self-start rounded-tl-sm border border-[#dbc2b0]/30" 
                          : "bg-secondary-green text-white self-end rounded-tr-sm"
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>
                      <span className={`text-[8px] mt-1 block text-right font-bold ${isAgent ? "text-[#554336]/60" : "text-white/60"}`}>
                        {msg.time}
                      </span>
                    </div>
                  );
                })}

                {isTyping && (
                  <div className="bg-white text-[#1a1c1c] max-w-[40%] self-start rounded-[24px] rounded-tl-sm border border-[#dbc2b0]/30 p-3 italic text-[10px] font-bold text-secondary-green text-left">
                    {t.whatsapp.typing}
                  </div>
                )}
              </div>

             
              <div className="px-3 py-2 bg-white flex gap-1.5 flex-wrap overflow-x-auto border-t border-[#dbc2b0]/20 scrollbar-none">
                {quickChips.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => selectQuickQuestion(q)}
                    className="text-[10px] font-semibold text-secondary-green bg-secondary-green/5 border border-secondary-green/10 rounded-md py-1 px-2 hover:bg-secondary-green/15 cursor-pointer whitespace-nowrap active:scale-95"
                  >
                    {q}
                  </button>
                ))}
              </div>

             
              <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-[#dbc2b0]/20 flex gap-2">
                <input 
                  id="chat-input-box"
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={t.whatsapp.placeholder} 
                  className="flex-1 text-sm bg-[#fdfbf7] border border-[#dbc2b0]/40 rounded-xl px-3 outline-hidden"
                />
                <button 
                  type="submit"
                  className="p-3 bg-secondary-green text-white rounded-xl hover:bg-secondary-green/95 active:scale-95 transition-transform cursor-pointer"
                  aria-label="Send Message"
                >
                  <Send className="h-4.5 w-4.5" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence> */}
            {/* instagram */}


        </div>
    );
}