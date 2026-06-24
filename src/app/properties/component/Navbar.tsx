"use client"
import { useState } from "react";
import { Phone, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { id: 1, path: "/", label: "Home" },
        { id: 2, path: "/", label: "Map Layout" },
        { id: 3, path: "/", label: "Ownership Process" },
        { id: 4, path: "/", label: "Contact Us" },
        { id: 5, path: "/aboutus", label: "About Us" },
    ];

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-[#dbc2b0]/20 shadow-xs">
            <nav className="flex justify-between items-center w-full px-4 md:px-16 py-4 max-w-7xl mx-auto">
                {/* Brand Logo and Text */}

                <Link href={"/"} className="flex items-center gap-2 cursor-pointer group">
                    <Image
                        src={"/logo.png"}
                        alt="ShriJi Developer Logo"
                        className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
                        referrerPolicy="no-referrer"
                        width={100}
                        height={100}
                    />
                    <span className="font-be-vietnam text-sm md:text-2xl font-bold text-secondary-green tracking-tight">
                        ShriJi Developer
                    </span>
                </Link>


                {/* Desktop Navigation Links */}
                <div className="hidden md:flex gap-8 items-center font-noto-sans text-sm font-medium">
                    {navItems.map((item) => (
                        <Link
                            key={item.id}
                            href={item.path}
                            className={`pb-1 transition-all cursor-pointer border-b-2 hover:text-secondary-green text-[#554336] border-transparent hover:border-[#dbc2b0]`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                {/* Action Button, Language Toggle & Menu Toggle */}
                <div className="flex gap-2 sm:gap-4 items-center">

                    <a
                        href="tel:+916262777411"
                        className="bg-secondary-green text-white px-4 sm:px-5 py-2 rounded-full font-noto-sans text-xs md:text-sm font-semibold hover:shadow-lg hover:shadow-secondary-green/20 transition-all flex items-center gap-2 cursor-pointer"
                    >
                        <Phone className="h-4 w-4" />
                        <span className="hidden sm:inline">+916262777411</span>
                    </a>

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
                                <Link
                                    key={item.id}
                                    href={item.path}
                                    className={`text-left py-2 hover:text-secondary-green border-b border-[#dbc2b0]/10  text-secondary-green font-bold
                                        `}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <div className="pt-2 text-center text-xs text-[#554336]/60">
                                Verified Layouts
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
