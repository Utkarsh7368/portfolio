"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Server, Database, Cloud } from "lucide-react";
import { StickyExperience } from "@/components/ui/sticky-experience";
import { ParticleText } from "@/components/ui/particle-text";

const experiences = [
  {
    role: "Freelance Full Stack Developer",
    period: "Oct 2024 - Present",
    description: "Delivering high-performance full-stack applications, premium business sites, and AI-driven calling agents for global clients. Specialized in turning complex business requirements into scalable, production-ready software with a focus on world-class UX.",
    tags: ["Full Stack", "AI Agents", "Business Solutions"]
  },
  {
    role: "Backend Software Developer @ Ingen Tech",
    period: "Jan 2025 - Present",
    location: "Kanpur, India",
    description: "Architecting scalable RESTful infrastructures and optimizing database operations for multi-collection MongoDB systems. Integrating AWS services for secure file handling and implemented Stripe for seamless financial transactions.",
    tags: ["Node.js", "MongoDB", "AWS", "Stripe"]
  }
];

export default function Experience() {
  const [fontSize, setFontSize] = useState(120);

  useEffect(() => {
    const handleResize = () => {
      const scale = window.innerWidth < 768 ? 12 : 18;
      setFontSize(Math.max(30, Math.min(90, window.innerWidth / scale)));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section id="experience" className="section-padding relative overflow-hidden bg-black/50 overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6">
        <motion.div
           className="mb-16 md:mb-24 flex justify-center w-full"
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
         >
           <div className="w-full text-center">
             <p className="text-xs tracking-[0.4em] text-white/30 uppercase font-mono mb-6">
               05 / Experience
             </p>
             <div className="h-[120px] md:h-[180px] w-full flex justify-center items-center">
               <ParticleText 
                 parts={[
                   { text: "Professional", color: "white" },
                   { text: "Journey", color: "#c3e41d", isItalic: true }
                 ]}
                 fontSize={fontSize} 
                 className="w-full h-full"
                 hoverRadius={120}
               />
             </div>
           </div>
         </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-8 border border-white/5 hover:border-[#c3e41d]/20 transition-all duration-500 group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#c3e41d] transition-colors">
                    {exp.role}
                  </h3>
                  {exp.location && (
                    <p className="text-sm text-white/40 font-mono mt-1">{exp.location}</p>
                  )}
                </div>
                <div className="shrink-0">
                  <span className="px-4 py-1.5 rounded-full bg-white/5 text-[#c3e41d] text-xs font-mono font-bold tracking-wider">
                    {exp.period}
                  </span>
                </div>
              </div>
              
              <p className="text-white/60 leading-relaxed mb-6 text-base md:text-lg">
                {exp.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {exp.tags.map(tag => (
                  <span key={tag} className="text-[10px] uppercase tracking-[0.2em] text-white/20 font-bold border border-white/5 px-3 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
