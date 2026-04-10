"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SplineScene } from "@/components/ui/splite";
import { ParticleText } from "@/components/ui/particle-text";

const stats = [
  { value: "300+", label: "LeetCode Solved" },
  { value: "8.52", label: "B.Tech CGPA" },
  { value: "11hr", label: "Hackathon Finisher" },
  { value: "2024", label: "GATE Qualified" },
];

export default function About() {
  const [fontSize, setFontSize] = useState(120);

  useEffect(() => {
    const handleResize = () => {
      setFontSize(window.innerWidth < 768 ? 60 : 120);
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section id="about" className="section-padding relative bg-black overflow-hidden">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `linear-gradient(rgba(195,228,29,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(195,228,29,0.03) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="max-w-screen-xl mx-auto">
        {/* Section label */}
        <motion.div
           className="mb-16 md:mb-20 flex justify-center w-full"
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
         >
           <div className="w-full text-center">
             <p className="text-xs tracking-[0.4em] text-white/30 uppercase font-mono mb-6">
               02 / About
             </p>
             <div className="h-[120px] md:h-[180px] w-full flex justify-center items-center">
                <ParticleText 
                  parts={[
                    { text: "Who", color: "white" },
                    { text: "I Am", color: "#c3e41d" }
                  ]}
                  fontSize={fontSize} 
                  className="w-full h-full"
                  hoverRadius={150}
                />
             </div>
           </div>
         </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="space-y-6">
              <p className="text-lg md:text-xl text-white/75 leading-relaxed">
                Hey! I'm{" "}
                <span className="font-bold" style={{ color: "#c3e41d" }}>
                  Utkarsh Gupta
                </span>
                , a Backend Software Developer studying Computer Science & Engineering at Kanpur Institute of Technology.
              </p>
              <p className="text-base text-white/55 leading-relaxed">
                I specialize in building secure, robust backend systems with Node.js, Express, MongoDB, and Next.js. My academic excellence extends to qualifying GATE (2024) and maintaining a 8.52 CGPA, giving me a solid computer science theoretical foundation to complement my practical coding experience.
              </p>
              <p className="text-base text-white/55 leading-relaxed">
                I'm actively solving complex algorithms (300+ LeetCode) and integrating scalable API infrastructure, and I'm currently working at Ingen Technologies delivering impactful database optimization services.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-3 pt-2">
                {[
                  "Open to Work",
                  "Based in India",
                  "Remote Friendly",
                  "Problem Solver",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 rounded-full text-xs font-mono tracking-wide"
                    style={{
                      background: "rgba(195,228,29,0.08)",
                      border: "1px solid rgba(195,228,29,0.2)",
                      color: "#c3e41d",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="pt-4">
                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-sm font-semibold text-black transition-all duration-300 hover:scale-105"
                  style={{
                    background: "#c3e41d",
                    boxShadow: "0 0 25px rgba(195,228,29,0.35)",
                  }}
                >
                  Download Resume
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right — 3D + Stats */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* 3D Spline */}
            <div
              className="w-full h-[500px] md:h-[600px] relative overflow-hidden group"
            >
              <SplineScene
                scene="https://prod.spline.design/LoE7yPdnY3o9OeA4/scene.splinecode"
                className="w-full h-full"
              />
              {/* Gradient fade — hides watermark naturally matching the dark theme */}
              <div
                className="absolute bottom-0 left-0 right-0 pointer-events-none"
                style={{
                  height: '160px',
                  background: 'linear-gradient(to top, #030303 50%, transparent 100%)',
                  zIndex: 9999,
                }}
              />
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="glass rounded-xl p-4 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div
                    className="text-2xl md:text-3xl font-bold font-mono mb-1"
                    style={{ color: "#c3e41d" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/40 tracking-wide">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
