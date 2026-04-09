"use client";

import { motion } from "framer-motion";
import AnimatedCardStack from "@/components/ui/animate-card-animation";

export default function Projects() {
  return (
    <section id="projects" className="section-padding relative overflow-hidden bg-black">
      {/* Background accents */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-screen-xl mx-auto relative z-10">
        <motion.div
          className="mb-16 md:mb-20 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs tracking-[0.4em] text-white/30 uppercase font-mono mb-4">
            04 / Works
          </p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Selected
            <span
              className="ml-4"
              style={{ color: "#c3e41d", fontFamily: "var(--font-fira)" }}
            >
              Projects
            </span>
          </h2>
        </motion.div>

        <div className="flex justify-center w-full mt-24 pb-32">
          <AnimatedCardStack />
        </div>
      </div>
    </section>
  );
}
