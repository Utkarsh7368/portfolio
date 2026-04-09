"use client";

import { motion } from "framer-motion";
import { Server, Database, Cloud } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

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
  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      <div className="max-w-screen-xl mx-auto">
        <motion.div
          className="mb-16 md:mb-20 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs tracking-[0.4em] text-white/30 uppercase font-mono mb-4">
            05 / Experience
          </p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Ingen Technologies
            <span
              className="ml-4 block mt-2 text-2xl"
              style={{ color: "#c3e41d", fontFamily: "var(--font-fira)" }}
            >
              Backend Software Developer
            </span>
          </h2>
        </motion.div>

        <RadialOrbitalTimeline timelineData={timelineData} />
      </div>
    </section>
  );
}
