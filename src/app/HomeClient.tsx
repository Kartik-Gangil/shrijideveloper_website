'use client'
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, Send, X, Phone, User, Check, Download, HelpCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustSection from "@/components/TrustSection";
import Projects from "@/components/Projects";
import Journey from "@/components/Journey";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { translations, Language } from "@/utils/translation";

interface Submissions {
    name: string;
    phone: string;
    project: string;
    dateTime: string;
    ticketId: string;
}

const message = "Hello, I’m looking to inquire about your available plots. Please share a brochure or have a representative call me back at your earliest convenience."

export default function App() {
    const [language, setLanguage] = useState<Language>("hi");
    const [activeSection, setActiveSection] = useState("hero");
    const [prefilledProject, setPrefilledProject] = useState<string>("");

    const t = translations[language];

    // Interactive Brochure State
    const [brochureOpen, setBrochureOpen] = useState(false);
    const [brochureName, setBrochureName] = useState("");
    const [brochurePhone, setBrochurePhone] = useState("");
    const [brochureError, setBrochureError] = useState("");
    const [brochureSuccess, setBrochureSuccess] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(0);

    // WhatsApp Interactive Chat State
    const [chatOpen, setChatOpen] = useState(false);
    const [chatMessages, setChatMessages] = useState<
        { sender: "client" | "agent"; text: string; time: string }[]
    >([]);
    const [chatInput, setChatInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    // Reset/Initialize chat when language toggles
    useEffect(() => {
        setChatMessages([
            {
                sender: "agent",
                text: translations[language].whatsapp.welcomeMsg,
                time: language === "en" ? "Just now" : "अभी-अभी"
            }
        ]);
    }, [language]);

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
    const handleBrochureSubmit = (e: React.FormEvent) => {
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

        setBrochureSuccess(true);
        setDownloadProgress(0);

        // Simulate PDF compilation countdown progress bar
        const interval = setInterval(() => {
            setDownloadProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    triggerBrochureDownload();
                    return 100;
                }
                return prev + 20;
            });
        }, 200);
    };

    const triggerBrochureDownload = () => {
        // Generate a temporary browser download for mockup brochure
        const brochureContent = language === "en" ? `
      =======================================================
               SHRIJI DEVELOPER - OFFICIAL PROPERTY PORTFOLIO
      =======================================================
      DATE OF PUBLISHING: JUNE 2026

      PROJECT HIGHLIGHTS:

      1. ShriJI ENCLAVE (Hingona Khurd , Morena)
         - Plot sizes: 1000+ Sq.Ft.
         - High-tech solar grid street lighting and direct drainage.
         - 2 min connectivity access to active Shaheed Path.

      REGISTRY POLICIES:
         - Immediate 100% Registry & Dakhil Kharij guaranteed.
         - EMI structures for up to 36 Months.

      THANK YOU FOR DOWNLOADING!
      We look forward to hosting your physical site visit.
      =======================================================
    ` : `
      =======================================================
               श्रीजी डेवलपर - आधिकारिक संपत्ति पोर्टफोलियो
      =======================================================
      प्रकाशन तिथि: जून 2026

      परियोजना की मुख्य विशेषताएं:
     1. श्रीजी एन्क्लेव (हिंगोना खुर्द टोल प्लाजा के पास, मुरैना)
         - प्लॉट आकार: 1000+ वर्ग फीट।
         - उन्नत सोलर ग्रिड स्ट्रीट लाइट और सुदृढ़ ड्रेनेज।

      पंजीकरण नियमावली:
         - तत्काल 100% रजिस्ट्री और दाखिल-खारिज की गारंटी।
         - 36 महीने तक की पूर्ण ब्याज-मूक आसान ईएमआई।

      डाउनलोड करने के लिए धन्यवाद!
      हम आपकी सपरिवार साइट विजिट की प्रतीक्षा कर रहे हैं।
      =======================================================
    `;
        const blob = new Blob([brochureContent], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = language === "en" ? `ShriJi_Developers_Brochure_2026.txt` : `ShriJi_Developers_Brochure_Hindi_2026.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    // WhatsApp chat simulation engine response trees
    // const handleSendMessage = (e?: React.FormEvent) => {
    //   if (e) e.preventDefault();
    //   if (!chatInput.trim()) return;

    //   const userMessage = chatInput.trim();
    //   const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    //   setChatMessages((prev) => [
    //     ...prev,
    //     { sender: "client", text: userMessage, time: timeString }
    //   ]);
    //   setChatInput("");
    //   setIsTyping(true);

    //   // Match keywords to respond intelligently (bilingual support)
    //   setTimeout(() => {
    //     let botResponse = language === "en"
    //       ? "Our specialist will connect shortly. For immediate details, please use our callback request form or call 1800-000-0000."
    //       : "हमारे विशेषज्ञ शीघ्र ही आपसे संपर्क करेंगे। तत्काल विवरण के लिए, कृपया हमारे कॉल बैक फॉर्म का उपयोग करें या 1800-000-0000 पर कॉल करें।";

    //     const cleanMsg = userMessage.toLowerCase();

    //     const hasPrice = cleanMsg.includes("price") || cleanMsg.includes("rate") || cleanMsg.includes("budget") || cleanMsg.includes("cost") || cleanMsg.includes("रेट") || cleanMsg.includes("दाम") || cleanMsg.includes("बजट") || cleanMsg.includes("कीमत") || cleanMsg.includes("पैसा");
    //     const hasLocation = cleanMsg.includes("location") || cleanMsg.includes("where") || cleanMsg.includes("address") || cleanMsg.includes("site") || cleanMsg.includes("कहाँ") || cleanMsg.includes("एड्रेस") || cleanMsg.includes("लोकेशन") || cleanMsg.includes("जगह");
    //     const hasEmi = cleanMsg.includes("emi") || cleanMsg.includes("installment") || cleanMsg.includes("pay") || cleanMsg.includes("किस्त") || cleanMsg.includes("ईएमआई") || cleanMsg.includes("भुगतान");
    //     const hasRegistry = cleanMsg.includes("registry") || cleanMsg.includes("legal") || cleanMsg.includes("rera") || cleanMsg.includes("रजिस्ट्री") || cleanMsg.includes("रेरा") || cleanMsg.includes("कागज");
    //     const hasHello = cleanMsg.includes("hello") || cleanMsg.includes("hi") || cleanMsg.includes("namaste") || cleanMsg.includes("नमस्ते") || cleanMsg.includes("राम राम") || cleanMsg.includes("हेलो");

    //     if (hasPrice) {
    //       botResponse = t.whatsapp.resRates;
    //     } else if (hasLocation) {
    //       botResponse = t.whatsapp.resLocations;
    //     } else if (hasEmi) {
    //       botResponse = t.whatsapp.resEmi;
    //     } else if (hasRegistry) {
    //       botResponse = t.whatsapp.resRegistry;
    //     } else if (hasHello) {
    //       botResponse = t.whatsapp.resWelcome;
    //     }

    //     setChatMessages((prev) => [
    //       ...prev,
    //       { sender: "agent", text: botResponse, time: timeString }
    //     ]);
    //     setIsTyping(false);
    //   }, 1000);
    // };

    // WhatsApp quick trigger prompt links
    const selectQuickQuestion = (question: string) => {
        setChatInput(question);
        setTimeout(() => {
            const msgInput = document.getElementById("chat-input-box");
            if (msgInput) msgInput.focus();
        }, 100);
    };

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

            {/* 4. Listed townships vertical stack with active layout grid tap Selection */}
            <Projects language={language} onInquireProject={handleInquireProject} />
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
                                onClick={() => setBrochureOpen(false)}
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

            {/* 9. Floating WhatsApp Widget Support Panel */}
            <div className="fixed bottom-8 right-8 z-[100] font-noto-sans flex flex-col items-end gap-3 pointer-events-none">

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

                {/* The Action green WhatsApp Pill Button itself */}
                <a
                    // onClick={() => setChatOpen(!chatOpen)}
                    href={`https://wa.me/916262777411?text=${message}`}
                    className="relative flex items-center justify-center w-16 h-16 bg-[#25D366] text-[#ffffff] rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer pointer-events-auto"
                    aria-label="Open Assistance Chat"
                >
                    <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>
                    <MessageCircle className="h-8 w-8 relative z-10 text-white fill-current" />
                </a>

            </div>

        </div>
    );
}