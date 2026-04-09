"use client";

import { motion } from "framer-motion";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-32 pb-16 px-6 md:px-12 flex flex-col justify-center items-center overflow-hidden">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      
      <div className="w-full max-w-screen-xl flex flex-col lg:flex-row items-center gap-12 lg:gap-8 z-10 relative mt-12 lg:mt-0">
        
        {/* Left Side: Animated Text and Intro */}
        <div className="flex-1 flex flex-col justify-center text-center lg:text-left z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 flex justify-center lg:justify-start"
          >
            <AnimatedText 
              text="Namaste World!" 
              textClassName="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400"
              underlineClassName="text-white/40"
              underlineDuration={1.5}
            />
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-white/50 max-w-lg mx-auto lg:mx-0 mb-10"
          >
            I'm <span className="text-white font-bold tracking-wider uppercase text-sm">Utkarsh Gupta</span>. 
            Backend Software Developer crafting high-performance REST APIs, cloud workflows, and interactive web experiences.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex gap-4 justify-center lg:justify-start"
          >
            <a href="#projects" className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform duration-300">
              View Work
            </a>
            <a href="#contact" className="px-8 py-4 bg-transparent border border-white/20 text-white font-semibold rounded-full hover:bg-white/5 transition-colors duration-300">
              Contact Me
            </a>
          </motion.div>
        </div>

        {/* Right Side: 3D Robot Spline */}
        <motion.div 
          className="flex-1 w-full relative h-[400px] md:h-[600px] lg:h-[700px] pointer-events-none lg:pointer-events-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent z-10 hidden lg:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
          
          {/* Embedding user's Robot 3D URL directly via Splite */}
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full object-contain filter contrast-[1.1] brightness-[1.1]"
          />
        </motion.div>

      </div>
    </section>
  );
}
