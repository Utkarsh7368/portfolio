"use client";

import React, { useRef } from "react";
import { useScroll, motion, useTransform, useSpring } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ExperienceItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: LucideIcon;
}

interface StickyExperienceProps {
  items: ExperienceItem[];
}

export const StickyExperience: React.FC<StickyExperienceProps> = ({ items }) => {
  return (
    <div className="flex flex-col gap-20">
      {items.map((item, index) => (
        <ExperienceCard key={item.id} item={item} index={index} />
      ))}
    </div>
  );
};

const ExperienceCard = ({ item, index }: { item: ExperienceItem; index: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  const Icon = item.icon;

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale, y }}
      className="relative z-10 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 glass transition-colors hover:border-[#c3e41d]/30"
    >
      <div className="flex flex-col gap-2">
        <span className="text-xs font-mono text-[#c3e41d] tracking-widest uppercase">
          {item.date}
        </span>
        <div className="w-12 h-12 rounded-2xl bg-[#c3e41d]/10 flex items-center justify-center text-[#c3e41d]">
          <Icon className="w-6 h-6" />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-2xl md:text-4xl font-bold tracking-tight">
          {item.title}
        </h3>
        <p className="text-white/60 text-lg leading-relaxed max-w-2xl">
          {item.content}
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/40">
            {item.category}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
