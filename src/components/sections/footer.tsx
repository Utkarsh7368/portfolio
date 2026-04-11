"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-8 px-6 border-t text-center" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <div
          className="text-2xl select-none"
          style={{
            fontFamily: "'Brush Script MT', cursive",
            color: "#c3e41d",
            textShadow: "0 0 15px rgba(195,228,29,0.4)",
          }}
        >
          Utkarsh Gupta
        </div>

        <p className="text-white/30 text-xs font-mono tracking-wide">
          © {year} Utkarsh Gupta
        </p>
      </motion.div>
    </footer>
  );
}
