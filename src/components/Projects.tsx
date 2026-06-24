import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Map, Layers, Compass, Zap, Check, Shield, TicketPercent } from "lucide-react";
import { translations, Language } from "../utils/translation";
import Image from "next/image";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  location: string;
  size: string;
  badge: string;
  badgeType: "available" | "selling";
  image: string;
  teaser: string;
  amenities: string[];
  landmarks: string[];
  roadWidth: string;
  pricing: string;
  // layoutPlots: { id: number; size: string; status: "Available" | "Sold" | "Reserved" }[];
}

interface ProjectsProps {
  onInquireProject: (projectName: string) => void;
  language: Language;
}

export default function Projects({ onInquireProject, language }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showMapProject, setShowMapProject] = useState<Project | null>(null);
  const [selectedPlot, setSelectedPlot] = useState<number | null>(null);

  const t = translations[language].projects;

  const mapStatusLabel = (status: "Available" | "Sold" | "Reserved") => {
    if (status === "Available") return language === "en" ? "Available" : "उपलब्ध";
    if (status === "Sold") return language === "en" ? "Sold" : "बिक चुका";
    return language === "en" ? "Reserved" : "आरक्षित";
  };

  const projects: Project[] = [
    {
      id: "Morena",
      title: t.lucknowTitle,
      location: language === "en" ? "Hingona Khurd Near Toll Plaza, Morena" : "हिंगोना खुर्द टोल प्लाजा के पास, मुरैना",
      size: "800 - 2500 Sq.Ft.",
      badge: language === "en" ? "Fast Selling" : "तेजी से बिक्री",
      badgeType: "selling",
      image: "https://res.cloudinary.com/drd6gndvh/image/upload/v1782237156/Screenshot_2026-06-23_232021_svikyt.png",
      teaser: t.teaserLucknow,
      amenities: t.amenitiesListLucknow,
      landmarks: t.landmarksLucknow,
      roadWidth: t.specRoadsLucknow,
      pricing: t.lucknowPricing
    }
  ];

  const handleInquireNow = (pName: string) => {
    setSelectedProject(null);
    setShowMapProject(null);
    onInquireProject(pName);
  };

  return (
    <section id="projects" className="py-24 bg-white overflow-hidden text-[#1a1c1c]">
      <div className="max-w-7xl mx-auto px-4 md:px-16">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
          <div className="max-w-xl text-left">
            <span className="text-xs uppercase tracking-widest font-extrabold text-secondary-green bg-secondary-green/10 px-3 py-1 rounded-full mb-3 inline-block font-noto-sans">
              {t.badge}
            </span>
            <h2 className="text-3xl md:text-4xl font-be-vietnam font-extrabold text-[#1a1c1c] tracking-tight">
              {t.heading}
            </h2>
            <p className="font-noto-sans text-xs md:text-sm text-[#554336] mt-2 leading-relaxed">
              {t.pDesc}
            </p>
          </div>
          <button
            onClick={() => handleInquireNow("General Inquiry")}
            className="bg-secondary-green/5 text-secondary-green px-6 py-3 rounded-full font-bold border border-secondary-green/20 hover:bg-secondary-green hover:text-white transition-all text-xs cursor-pointer active:scale-95"
          >
            {t.requestCab}
          </button>
        </div>

        {/* Project Vertical List */}
        <div className="space-y-24">
          {projects.map((project, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={project.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center`}
              >
                {/* Image Section */}
                <div className={`lg:col-span-7 relative ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                  <div className={`absolute -top-6 ${isEven ? "-left-6" : "-right-6"} w-32 h-32 bg-primary-orange/5 asymmetric-blob -z-10`}></div>
                  <Image
                    alt={project.title}
                    className="w-full aspect-16/10 object-cover organic-radius shadow-xl hover:scale-[1.01] transition-transform duration-500"
                    src={project.image}
                    referrerPolicy="no-referrer"
                    width={1000}
                    height={1000}
                  />
                </div>

                {/* Info Card Section */}
                <div className={`lg:col-span-5 z-10 ${isEven ? "lg:order-2 lg:-ml-12" : "lg:order-1 lg:-mr-12"}`}>
                  <div className="bg-white p-6 md:p-10 organic-radius shadow-lg border border-[#dbc2b0]/30">
                    <span
                      className={`inline-block text-[11px] uppercase tracking-wider font-bold px-3 py-1 rounded-full mb-4 ${project.badgeType === "available"
                        ? "bg-secondary-green text-white"
                        : "bg-primary-orange text-white"
                        }`}
                    >
                      {project.badge}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-be-vietnam font-bold text-[#1a1c1c] mb-3 text-left">
                      {project.title}
                    </h3>
                    <p className="font-noto-sans text-[#554336] text-xs md:text-sm mb-6 leading-relaxed text-left">
                      {project.teaser}
                    </p>

                    {/* Size and Pricing Details */}
                    <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-[#dbc2b0]/20 mb-6 font-noto-sans text-xs">
                      <div className="text-left">
                        <p className="text-[#554336]/60 font-semibold uppercase tracking-wider">{t.dimensions}</p>
                        <p className="text-sm font-bold text-secondary-green mt-1">{project.size}</p>
                      </div>
                      <div className="text-left">
                        <p className="text-[#554336]/60 font-semibold uppercase tracking-wider">{t.pricing}</p>
                        <p className="text-sm font-bold text-primary-orange mt-1">{project.pricing}</p>
                      </div>
                    </div>

                    {/* Interactive Actions Grid */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="bg-primary-orange text-white px-4 sm:px-6 rounded-full font-bold text-xs md:text-sm shadow-md shadow-primary-orange/20 cursor-pointer hover:bg-primary-orange/95 hover:shadow-lg active:scale-95 transition-all flex h-11 items-center justify-center gap-1.5 w-full sm:w-auto whitespace-nowrap"
                      >
                        <Layers className="h-4 w-4 shrink-0" />
                        <span>{t.detailsBtn}</span>
                      </button>

                      <button
                        onClick={() => {
                          setShowMapProject(project);
                          setSelectedPlot(null);
                        }}
                        className="border border-secondary-green text-secondary-green px-4 sm:px-6 rounded-full font-bold text-xs md:text-sm hover:bg-secondary-green/5 cursor-pointer active:scale-95 transition-all flex h-11 items-center justify-center gap-1.5 w-full sm:w-auto whitespace-nowrap"
                      >
                        <Map className="h-4 w-4 shrink-0" />
                        <span>{t.mapBtn}</span>
                      </button>

                      <Link
                        href={"/offers"}
                        className="border border-secondary-green text-secondary-green px-4 sm:px-6 rounded-full font-bold text-xs md:text-sm hover:bg-secondary-green/5 cursor-pointer active:scale-95 transition-all flex h-11 items-center justify-center gap-1.5 w-full sm:w-auto whitespace-nowrap"
                      >
                        <TicketPercent className="h-4 w-4 shrink-0" />
                        <span>Offers</span>
                      </Link>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Modal: Project Technical Specifications & Highlights */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
              {/* Blur backdrop overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-black/60 backdrop-blur-xs"
              />

              {/* Specification Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative bg-[#fdfbf7] rounded-[36px] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl border border-[#dbc2b0]/50 z-10 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]"
              >
                {/* Close Button */}
                <button
                  title="close"
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-5 right-5 p-2 rounded-full hover:bg-secondary-green/10 text-[#554336] transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Specifications Header */}
                <div className="space-y-1.5 mb-6">
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-primary-orange bg-primary-orange/10 px-2.5 py-1 rounded-sm">
                    Verified Specifications
                  </span>
                  <h4 className="text-2xl md:text-3xl font-be-vietnam font-bold text-secondary-green">
                    {selectedProject.title}
                  </h4>
                  <p className="font-noto-sans text-xs text-[#554336]">{selectedProject.location}</p>
                </div>

                {/* Specs Details */}
                <div className="space-y-6 font-noto-sans text-sm">

                  {/* Road details & price */}
                  <div className="bg-white p-4.5 rounded-2xl border border-[#dbc2b0]/30 space-y-1.5">
                    <div className="text-[11px] font-bold text-[#554336]/60 uppercase tracking-widest flex items-center gap-1">
                      <Compass className="h-3.5 w-3.5 text-primary-orange" />
                      Infrastructure Highlights
                    </div>
                    <p className="text-xs text-[#1a1c1c] font-semibold">
                      🛣️ Main Road Width: <span className="font-bold text-secondary-green">{selectedProject.roadWidth}</span>
                    </p>
                    <p className="text-xs text-[#1a1c1c] font-semibold mt-1">
                      💳 Price Indexation: <span className="font-bold text-primary-orange">{selectedProject.pricing}</span>
                    </p>
                  </div>

                  {/* Amenities List */}
                  <div>
                    <h5 className="font-be-vietnam text-sm font-extrabold text-[#1a1c1c] mb-2.5 flex items-center gap-2">
                      <Zap className="h-4.5 w-4.5 text-secondary-green" />
                      Modern Amenities Included
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {selectedProject.amenities.map((amenity, i) => (
                        <div key={i} className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-[#dbc2b0]/20">
                          <Check className="h-4 w-4 text-secondary-green shrink-0" />
                          <span className="text-[#554336]">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Neighborhood Landmarks */}
                  <div>
                    <h5 className="font-be-vietnam text-sm font-extrabold text-[#1a1c1c] mb-2.5 flex items-center gap-2">
                      <Map className="h-4.5 w-4.5 text-primary-orange" />
                      Proximity & Key Distances
                    </h5>
                    <div className="space-y-2 text-xs">
                      {selectedProject.landmarks.map((landmark, i) => (
                        <div key={i} className="flex items-center justify-between bg-white px-3.5 py-2.5 rounded-lg border border-[#dbc2b0]/20">
                          <span className="text-[#554336] font-semibold">{landmark.split(":")[0]}</span>
                          <span className="text-secondary-green font-bold bg-secondary-green/5 px-2 py-0.5 rounded-sm">
                            {landmark.split(":")[1]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions inside Modal */}
                  <div className="pt-4 flex gap-3">
                    <button
                      title="inquire"
                      onClick={() => handleInquireNow(selectedProject.title)}
                      className="flex-1 bg-secondary-green text-white py-3.5 rounded-xl font-bold text-xs hover:bg-[#035300] shadow-sm transition-all text-center cursor-pointer"
                    >
                      Inquire About {selectedProject.title}
                    </button>
                    <button
                      title="map"
                      onClick={() => {
                        setSelectedProject(null);
                        setShowMapProject(selectedProject);
                      }}
                      className="bg-white text-secondary-green border border-secondary-green py-3.5 px-5 rounded-xl font-bold text-xs hover:bg-secondary-green/5 transition-all cursor-pointer"
                    >
                      View Map Layout
                    </button>
                  </div>

                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Modal: Interactive Township Plot Selection map Layout */}
        <AnimatePresence>
          {showMapProject && (
            <div className="fixed inset-0 z-55 flex items-center justify-center p-4 ">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowMapProject(null)}
                className="absolute inset-0 bg-black/60 backdrop-blur-xs"
              />

              {/* Spec Layout Sheet */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative bg-[#fdfbf7] rounded-[36px] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl border border-[#dbc2b0]/50 z-10 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]"
              >
                {/* Close */}
                <button
                  title="close"
                  onClick={() => setShowMapProject(null)}
                  className="absolute top-5 right-5 p-2 rounded-full hover:bg-secondary-green/10 text-[#554336] transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Head */}
                <div className="space-y-1 mb-6 text-left">
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-secondary-green bg-secondary-green/10 px-2.5 py-1 rounded-sm">
                    Interactive Plotting Map Layout
                  </span>
                  <h4 className="text-xl md:text-2xl font-be-vietnam font-bold text-[#1a1c1c] mt-1">
                    {showMapProject.title} Map View
                  </h4>
                  <p className="font-noto-sans text-xs text-[#554336] leading-relaxed">
                    Tap a specific layout plot to view size dimension details, availability status and reserve instantly.
                  </p>
                </div>

                {/* Layout and Interaction Panel Info */}
                <div className="items-start font-noto-sans text-xs">

                  {/* Left: The simulated Plot grid */}
                  <div className="">
                    <div className="bg-white p-5 rounded-3xl border border-[#dbc2b0]/40 shadow-inner">
                      {/* Grid representation */}
                      <div className="flex justify-between items-center text-[10px] text-[#554336]/60 border-b border-[#dbc2b0]/20 pb-3 mb-4 font-bold tracking-wider">
                        <span>🚧 MAIN ENTRANCE GATE & SECURITY COMPOUND (40FT ROAD)</span>
                      </div>

                      <div>
                        <Image
                          src={"https://res.cloudinary.com/drd6gndvh/image/upload/f_auto,q_auto,w_800/v1781807042/copy_of_map_ewtvp3.png"}
                          alt="map image"
                          className="w-full h-full object-cover rounded-2xl"
                          width={1000}
                          height={1000}
                        />
                        {/* {showMapProject.layoutPlots.map((plot) => {
                          const isSelected = selectedPlot === plot.id;
                          let bgClass = "bg-[#eeeeee]/60 border-[#eeeeee]";
                          let textClass = "text-[#554336]/70";

                          if (plot.status === "Available") {
                            bgClass = isSelected ? "bg-secondary-green text-white border-secondary-green ring-3 ring-secondary-green/30 font-bold" : "bg-secondary-green/10 border-secondary-green/30 text-secondary-green hover:bg-secondary-green/20";
                          } else if (plot.status === "Sold") {
                            bgClass = "bg-red-50 border-red-200/50 text-red-400 opacity-60 cursor-not-allowed";
                          } else {
                            bgClass = "bg-amber-50 border-amber-200/50 text-amber-500 hover:bg-amber-100/50";
                          }

                          return (
                            <button
                              key={plot.id}
                              onClick={() => plot.status !== "Sold" && setSelectedPlot(plot.id)}
                              disabled={plot.status === "Sold"}
                              className={`p-3 rounded-xl border text-center transition-all cursor-pointer font-bold duration-200 ${bgClass}`}
                            >
                              <p className="text-xs">Plot {plot.id}</p>
                              <p className="text-[9px] opacity-85 mt-0.5">{plot.size}</p>
                              <span className="text-[8px] font-semibold uppercase tracking-wider block mt-1">
                                {plot.status}
                              </span>
                            </button>
                          );
                        })} */}
                      </div>

                      <div className="flex justify-between items-center text-[9px] text-[#554336]/60 border-t border-[#dbc2b0]/20 pt-3 mt-4">
                        <span>🌳 Vedic Park Corridor & Green belt layout</span>
                        <span>🛣️ 30ft secondary access roads</span>
                      </div>
                    </div>

                    {/* Color Index labels */}
                    <div className="flex flex-wrap gap-4 px-2">
                      <div className="flex items-center gap-1.5 font-bold">
                        <span className="w-2.5 h-2.5 rounded-xs bg-secondary-green/20 border border-secondary-green/30 block"></span>
                        <span>Available for Registry</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-bold">
                        <span className="w-2.5 h-2.5 rounded-xs bg-red-100 border border-red-200 block"></span>
                        <span>Already Registered (Sold)</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-bold">
                        <span className="w-2.5 h-2.5 rounded-xs bg-amber-100 border border-amber-200 block"></span>
                        <span>Under Inquiry (Reserved)</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Selected Plot actions panel */}
                  {/* <div className="lg:col-span-4 bg-white p-5 rounded-3xl border border-[#dbc2b0]/40 flex flex-col justify-between h-full min-h-[220px]">
                    {selectedPlot ? (() => {
                      const plotData = showMapProject.layoutPlots.find(p => p.id === selectedPlot);
                      return (
                        <div className="space-y-4">
                          <p className="font-be-vietnam text-xs font-bold uppercase tracking-wider text-[#554336]/60">
                            Selected Plot Details
                          </p>
                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between">
                              <span className="text-[#554336]">Plot ID:</span>
                              <span className="font-bold">#{plotData?.id}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#554336]">Dimensions:</span>
                              <span className="font-bold text-secondary-green">{plotData?.size}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#554336]">Legal Clearance:</span>
                              <span className="text-secondary-green font-bold flex items-center gap-0.5">
                                <Shield className="h-3 w-3 fill-current" />
                                Clear Title
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#554336]">Status:</span>
                              <span className="font-extrabold text-[#1a1c1c] uppercase tracking-wider">
                                {plotData?.status}
                              </span>
                            </div>
                          </div>

                          <div className="pt-2">
                            <button
                              onClick={() => handleInquireNow(`${showMapProject.title} (Plot #${selectedPlot})`)}
                              className="w-full bg-primary-orange text-white py-3.5 rounded-xl font-bold text-center cursor-pointer hover:bg-primary-orange/95 shadow-sm active:scale-95 transition-all text-xs"
                            >
                              Inquire Plot #{selectedPlot}
                            </button>
                            <p className="text-[10px] text-center text-[#554336]/60 mt-1.5 font-medium">
                              Secure price block layout instantly
                            </p>
                          </div>
                        </div>
                      );
                    })() : (
                      <div className="flex flex-col items-center justify-center text-center h-full text-[#554336]/60 py-8 min-h-[180px]">
                        <Compass className="h-8 w-8 text-[#dbc2b0] mb-2 animate-pulse" />
                        <p className="font-bold text-xs mt-1">Select an active Plot</p>
                        <p className="text-[10px] text-[#554336]/60 mt-0.5 max-w-[150px]">
                          Tap any plot on the layout grid to inspect detailed possession info.
                        </p>
                      </div>
                    )}
                  </div> */}

                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
