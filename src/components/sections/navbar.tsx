"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT", href: "#about" },
  { label: "SKILLS", href: "#skills" },
  { label: "PROJECTS", href: "#projects" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "CONTACT", href: "#contact" },
];

const menuVariants = {
  hidden: { opacity: 0, x: -20, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
  exit: { opacity: 0, x: -20, scale: 0.95, transition: { duration: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-6 py-5"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <nav className="flex items-center justify-between max-w-screen-xl mx-auto">
        {/* Hamburger */}
        <div className="relative">
          <motion.button
            type="button"
            className="relative z-50 p-2 text-white/50 hover:text-white transition-colors"
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-7 h-7" />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-7 h-7" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                ref={menuRef}
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute top-full left-0 mt-3 ml-2 py-3 px-2 rounded-2xl min-w-[200px]"
                style={{
                  background: "rgba(10,10,10,0.95)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 25px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
                }}
              >
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.label}
                    variants={itemVariants}
                    className="block w-full text-left text-base font-bold tracking-widest py-2 px-3 rounded-lg transition-colors duration-200"
                    style={{ color: i === 0 ? "#c3e41d" : "rgba(255,255,255,0.7)" }}
                    onHoverStart={(e) => {
                      (e.target as HTMLElement).style.color = "#c3e41d";
                      (e.target as HTMLElement).style.background = "rgba(195,228,29,0.07)";
                    }}
                    onHoverEnd={(e) => {
                      (e.target as HTMLElement).style.color = i === 0 ? "#c3e41d" : "rgba(255,255,255,0.7)";
                      (e.target as HTMLElement).style.background = "transparent";
                    }}
                    onClick={() => scrollTo(item.href)}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Signature Logo */}
        <motion.div
          className="text-4xl select-none"
          style={{
            fontFamily: "'Brush Script MT', cursive",
            color: "#c3e41d",
            textShadow: "0 0 20px rgba(195,228,29,0.5)",
          }}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          U
        </motion.div>

        {/* Status indicator */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-60" />
          </div>
          <span className="text-xs text-white/40 font-mono tracking-wider hidden sm:block">
            Available for work
          </span>
        </div>
      </nav>
    </motion.header>
  );
}
