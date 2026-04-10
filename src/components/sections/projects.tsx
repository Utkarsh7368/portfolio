"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Code2, 
  Plane, 
  Database, 
  ArrowUpRight,
  ExternalLink
} from "lucide-react";
import { ParticleText } from "@/components/ui/particle-text";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card-effect";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const projects = [
  {
    title: "Ghummakad Yatri",
    description: "A premium travel booking engine with integrated payment gateways and role-based administration.",
    image: "https://images.unsplash.com/photo-1463123081488-789f998ac9c4?q=80&w=2670&auto=format&fit=crop",
    tech: ["React", "Node.js", "Stripe"],
    link: "https://ghumakkad-yatri.vercel.app/"
  }
];

export default function Projects() {
  const [fontSize, setFontSize] = useState(120);

  useEffect(() => {
    const handleResize = () => {
      const scale = window.innerWidth < 768 ? 13 : 18;
      setFontSize(Math.max(28, Math.min(85, window.innerWidth / scale)));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section id="projects" className="section-padding relative overflow-hidden bg-black pb-32">
      {/* Background accents */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(195,228,29,0.05) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-screen-xl mx-auto relative z-10 px-6">
        <motion.div
           className="mb-16 md:mb-24 flex justify-center w-full"
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
         >
           <div className="w-full text-center">
             <p className="text-xs tracking-[0.4em] text-white/30 uppercase font-mono mb-6">
               03 / Featured Work
             </p>
             <div className="h-[120px] md:h-[180px] w-full flex justify-center items-center">
               <ParticleText 
                 parts={[
                   { text: "Selected", color: "white" },
                   { text: "Innovations", color: "#c3e41d" }
                 ]}
                 fontSize={fontSize} 
                 className="w-full h-full"
                 hoverRadius={120}
               />
             </div>
             <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-8"
            >
                <p className="text-white/40 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
                    A collection of production-grade applications focusing on performance, security, and world-class UX.
                </p>
            </motion.div>
           </div>
         </motion.div>

        <div className="flex justify-center">
          <div className="max-w-2xl w-full">
            {projects.map((project, i) => (
              <CardContainer key={i} className="inter-var">
                <CardBody className="bg-neutral-950/50 backdrop-blur-sm relative group/card border border-white/10 w-full h-[450px] rounded-2xl p-6 transition-colors hover:border-[#c3e41d]/30">
                  <CardItem
                    translateZ="50"
                    className="text-2xl font-bold text-white mb-2"
                  >
                    {project.title}
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-400 text-sm max-w-sm mb-6"
                  >
                    {project.description}
                  </CardItem>
                  
                  <CardItem translateZ="100" className="w-full mb-8">
                    <div className="relative h-56 w-full rounded-xl overflow-hidden group/img">
                      <img
                        src={project.image}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                        alt={project.title}
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover/img:bg-black/20 transition-colors" />
                    </div>
                  </CardItem>

                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      {project.tech.map((t, idx) => (
                        <CardItem
                          key={idx}
                          translateZ={20 + (idx * 10)}
                          className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-white/50"
                        >
                          {t}
                        </CardItem>
                      ))}
                    </div>
                    
                    <div className="flex gap-3">
                      <CardItem
                        translateZ={20}
                        as="a"
                        href={project.link}
                        className="p-3 rounded-full bg-[#c3e41d] text-black hover:scale-110 transition-all font-bold flex items-center gap-2"
                      >
                         <span className="text-xs uppercase tracking-wider">View Project</span>
                        <ArrowUpRight size={16} />
                      </CardItem>
                    </div>
                  </div>
                </CardBody>
              </CardContainer>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
