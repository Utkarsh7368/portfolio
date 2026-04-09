"use client";

import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, useAnimation, useInView } from "framer-motion";

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ className }: SplineSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className={cn("w-full h-full relative flex items-center justify-center overflow-hidden", className)} ref={containerRef}>
      {/* 3D Ambient Orb */}
      <motion.div
        className="relative w-64 h-64 md:w-96 md:h-96 rounded-full"
        style={{
          background: "radial-gradient(circle at 30% 30%, rgba(195,228,29,0.8) 0%, rgba(139,92,246,0.6) 40%, rgba(0,0,0,0.8) 80%)",
          boxShadow: "inset -20px -20px 60px rgba(0,0,0,0.5), inset 20px 20px 60px rgba(255,255,255,0.2), 0 0 100px rgba(195,228,29,0.3)",
          filter: "drop-shadow(0 0 30px rgba(139,92,246,0.5))",
        }}
        animate={{
          rotate: [0, 10, -5, 15, 0],
          scale: [1, 1.05, 0.95, 1.02, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 15,
          ease: "easeInOut",
        }}
      >
        {/* Orb grid lines for 3D effect */}
        <div 
          className="absolute inset-0 rounded-full opacity-30"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm20 20h20v20H20V20zM0 20h20v20H0V20z' fill='none' stroke='white' stroke-opacity='0.1' stroke-width='1'/%3E%3C/svg%3E\")",
            backgroundSize: "cover",
            mixBlendMode: "overlay",
          }}
        />
        {/* Core highlight */}
        <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 bg-white rounded-full opacity-20 blur-xl" />
      </motion.div>

      {/* Orbiting rings */}
      <motion.div
        className="absolute w-80 h-80 md:w-[28rem] md:h-[28rem] rounded-full border border-white/10"
        style={{ borderTopColor: "rgba(195,228,29,0.5)", borderRightColor: "rgba(139,92,246,0.3)" }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      />
      <motion.div
        className="absolute w-96 h-96 md:w-[32rem] md:h-[32rem] rounded-full border border-white/5"
        style={{ borderBottomColor: "rgba(195,228,29,0.3)", borderLeftColor: "rgba(139,92,246,0.2)" }}
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
      />
    </div>
  );
}
