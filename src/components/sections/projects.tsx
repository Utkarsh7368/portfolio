"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code2, 
  Plane, 
  Database, 
  ArrowUpRight,
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { ParticleText } from "@/components/ui/particle-text";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card-effect";

const projects = [
  {
    title: "Ghummakad Yatri",
    description: "A premium travel booking engine with integrated payment gateways and role-based administration.",
    tech: ["React", "Node.js", "Stripe"],
    link: "https://ghumakkad-yatri.vercel.app/",
    image: "/projects/ghumakkad.png"
  },
  {
    title: "Advocate Kamlesh",
    description: "Professional portfolio for a Supreme Court Advocate, featuring a refined judicial aesthetic and integrated consultation booking.",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    link: "https://advocate-kamlesh.in/",
    image: "/projects/advocate.png"
  }
];

export default function Projects() {
  const [fontSize, setFontSize] = useState(120);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const scale = window.innerWidth < 768 ? 13 : 18;
      setFontSize(Math.max(28, Math.min(85, window.innerWidth / scale)));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-play with Pause on Hover
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      paginate(1);
    }, 3000);
    return () => clearInterval(timer);
  }, [currentIndex, isPaused]);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + projects.length) % projects.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
  };

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

        <div className="relative flex justify-center items-center h-[600px] w-full max-w-4xl mx-auto overflow-visible">
          {/* Layout hint for mobile: 1.5 projects */}
          <div className="hidden md:block absolute -left-12 z-20">
             <button
                onClick={() => paginate(-1)}
                className="p-4 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-[#c3e41d] hover:border-[#c3e41d]/50 hover:bg-[#c3e41d]/5 transition-all backdrop-blur-md"
             >
                <ChevronLeft size={24} />
             </button>
          </div>

          <div className="w-full h-full relative overflow-visible flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.4 },
                }}
                className="absolute w-full px-4 md:px-0"
              >
                <div 
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  <CardContainer className="inter-var w-full">
                    <CardBody 
                      onClick={() => window.open(projects[currentIndex].link, "_blank")}
                      className="bg-neutral-950/80 backdrop-blur-xl relative group/card border border-white/10 w-full h-auto rounded-3xl p-10 transition-colors hover:border-[#c3e41d]/30 hover:shadow-2xl hover:shadow-[#c3e41d]/[0.1] shadow-2xl cursor-pointer"
                    >
                      <CardItem
                        translateZ={100}
                        translateX={-10}
                        className="text-3xl md:text-4xl font-bold text-white mb-2"
                      >
                        {projects[currentIndex].title}
                      </CardItem>
                      <CardItem
                        as="p"
                        translateZ={120}
                        translateX={-5}
                        className="text-neutral-400 text-sm md:text-base max-w-sm mb-8 leading-relaxed"
                      >
                        {projects[currentIndex].description}
                      </CardItem>

                      <CardItem translateZ={180} translateX={5} translateY={-10} className="w-full mb-10 shadow-3xl">
                        <div className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden group/img border border-white/10 bg-neutral-900 ring-1 ring-white/5">
                          <img
                            src={projects[currentIndex].image}
                            alt={projects[currentIndex].title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/40 group-hover/img:bg-black/20 transition-colors pointer-events-none" />
                          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-[#c3e41d] text-[10px] font-bold uppercase tracking-widest border border-[#c3e41d]/20 pointer-events-none shadow-lg">
                            Project Insight
                          </div>
                        </div>
                      </CardItem>

                      <div className="flex justify-between items-center mt-6">
                        <div className="flex flex-wrap gap-2">
                          {projects[currentIndex].tech.map((t, idx) => (
                            <CardItem
                              key={idx}
                              translateZ={80 + (idx * 10)}
                              className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-white/50"
                            >
                              {t}
                            </CardItem>
                          ))}
                        </div>
                        
                        <CardItem
                          translateZ={100}
                          translateX={15}
                          as="a"
                          href={projects[currentIndex].link}
                          target="_blank"
                          className="px-6 py-2.5 rounded-xl bg-[#c3e41d] text-black hover:scale-110 transition-all font-bold flex items-center gap-2 group/btn shadow-[0_10px_30px_rgba(195,228,29,0.3)]"
                        >
                          <span className="text-xs uppercase tracking-wider">Explore Live</span>
                          <ArrowUpRight size={16} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </CardItem>
                      </div>
                    </CardBody>
                  </CardContainer>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="hidden md:block absolute -right-12 z-20">
             <button
                onClick={() => paginate(1)}
                className="p-4 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-[#c3e41d] hover:border-[#c3e41d]/50 hover:bg-[#c3e41d]/5 transition-all backdrop-blur-md"
             >
                <ChevronRight size={24} />
             </button>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > currentIndex ? 1 : -1);
                setCurrentIndex(i);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentIndex ? "w-8 bg-[#c3e41d]" : "bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
