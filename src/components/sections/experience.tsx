"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Server, Database, Cloud } from "lucide-react";
import { StickyExperience } from "@/components/ui/sticky-experience";
import { ParticleText } from "@/components/ui/particle-text";

const timelineData = [
  {
    id: 1,
    title: "RESTful APIs",
    date: "Feb 2025",
    content: "Engineered RESTful APIs for multi-collection MongoDB data operations, improving CRUD efficiency.",
    category: "Backend",
    icon: Server,
    relatedIds: [2, 3],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "AWS S3 Integration",
    date: "Mar 2025",
    content: "Integrated AWS S3 for scalable file handling, with validation, parsing, and structured storage.",
    category: "Cloud",
    icon: Cloud,
    relatedIds: [1, 3],
    status: "in-progress" as const,
    energy: 85,
  },
  {
    id: 3,
    title: "Modular API Services",
    date: "Present",
    content: "Developed modular API services reducing direct DB queries across teams, improving maintainability.",
    category: "Architecture",
    icon: Database,
    relatedIds: [1],
    status: "in-progress" as const,
    energy: 70,
  },
];

export default function Experience() {
  const [fontSize, setFontSize] = useState(120);

  useEffect(() => {
    const handleResize = () => {
      setFontSize(window.innerWidth < 768 ? 50 : 100);
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
             <div className="mt-8 flex flex-col items-center">
                <span className="text-xl md:text-2xl font-medium text-white/80">Backend Software Developer @ Ingen Tech</span>
                <span className="text-sm font-mono text-white/30 tracking-widest mt-2 uppercase">Jaipur, India</span>
             </div>
           </div>
         </motion.div>

        <StickyExperience items={timelineData} />
      </div>
    </section>
  );
}
