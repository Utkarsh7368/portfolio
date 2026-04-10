"use client";

import { motion } from "framer-motion";
import { Spotlight } from "@/components/ui/spotlight";

import { useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { AnimatedPongHero } from "@/components/ui/animated-hero-section";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 3D Rotation and scaling effects based on scroll
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [0, 15]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  
  const smoothRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 });
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });

  return (
    <section ref={containerRef} className="relative h-[150vh] bg-black">
      {/* Expanded Pong Arena in the background */}
      <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none z-0">
        <AnimatedPongHero />
      </div>

      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden px-6 md:px-12 pointer-events-none z-10">
        
        <motion.div
          style={{ 
            rotateX: smoothRotateX,
            scale: smoothScale,
            perspective: "1000px",
            transformStyle: "preserve-3d"
          }}
          className="w-full max-w-screen-xl flex flex-col items-center justify-center text-center relative pointer-events-auto"
        >
        </motion.div>
      </div>
    </section>
  );
}
