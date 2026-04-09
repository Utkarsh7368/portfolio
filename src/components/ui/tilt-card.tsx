"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export function TiltCard({ children, className, glowColor = "#c3e41d" }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(relX);
    y.set(relY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      className={cn("relative", className)}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
    >
      {/* Glow */}
      <div
        className="absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${glowColor}20 0%, transparent 70%)`,
          opacity: isHovered ? 1 : 0,
          filter: "blur(20px)",
          transform: "translateZ(-10px)",
        }}
      />
      {/* Shimmer */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
        style={{ opacity: isHovered ? 1 : 0, transition: "opacity 0.3s" }}
      >
        <div className="shimmer absolute inset-0" />
      </div>
      {children}
    </motion.div>
  );
}
