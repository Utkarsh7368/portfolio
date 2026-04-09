"use client";

import { motion } from "framer-motion";
import { TiltCard } from "@/components/ui/tilt-card";
import { Code2, Cpu, Globe, Layers, Terminal, Zap } from "lucide-react";

const skills = {
  Frontend: [
    { name: "React / Next.js", level: 95, icon: <Layers className="w-4 h-4" /> },
    { name: "TypeScript", level: 90, icon: <Code2 className="w-4 h-4" /> },
    { name: "Tailwind CSS", level: 92, icon: <Zap className="w-4 h-4" /> },
    { name: "Framer Motion", level: 85, icon: <Zap className="w-4 h-4" /> },
    { name: "Angular", level: 80, icon: <Code2 className="w-4 h-4" /> },
  ],
  Backend: [
    { name: "Node.js", level: 88, icon: <Terminal className="w-4 h-4" /> },
    { name: "Python", level: 82, icon: <Terminal className="w-4 h-4" /> },
    { name: "REST APIs", level: 90, icon: <Globe className="w-4 h-4" /> },
    { name: "PostgreSQL", level: 80, icon: <Cpu className="w-4 h-4" /> },
    { name: "MongoDB", level: 78, icon: <Cpu className="w-4 h-4" /> },
  ],
  Tools: [
    { name: "Git / GitHub", level: 92, icon: <Terminal className="w-4 h-4" /> },
    { name: "Docker", level: 75, icon: <Cpu className="w-4 h-4" /> },
    { name: "AWS", level: 72, icon: <Globe className="w-4 h-4" /> },
    { name: "Figma", level: 80, icon: <Layers className="w-4 h-4" /> },
    { name: "Linux", level: 78, icon: <Terminal className="w-4 h-4" /> },
  ],
};

const techIcons = [
  "React", "Next.js", "TypeScript", "Node.js", "Python",
  "PostgreSQL", "MongoDB", "Docker", "AWS", "Figma",
  "Angular", "Tailwind", "Git", "Linux", "REST",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Skills() {
  return (
    <section id="skills" className="section-padding relative bg-black overflow-hidden">
      {/* Bg accent */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(139,92,246,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="max-w-screen-xl mx-auto">
        {/* Heading */}
        <motion.div
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs tracking-[0.4em] text-white/30 uppercase font-mono mb-4">
            03 / Skills
          </p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            My
            <span
              className="ml-4"
              style={{ color: "#c3e41d", fontFamily: "var(--font-fira)" }}
            >
              Arsenal
            </span>
          </h2>
        </motion.div>

        {/* Skill categories */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {Object.entries(skills).map(([category, items], ci) => (
            <motion.div key={category} variants={itemVariants}>
              <TiltCard
                glowColor={ci === 0 ? "#c3e41d" : ci === 1 ? "#8b5cf6" : "#06b6d4"}
              >
                <div className="glass rounded-2xl p-6 h-full">
                  <div className="flex items-center gap-2 mb-6">
                    <div
                      className="w-1 h-6 rounded-full"
                      style={{
                        background:
                          ci === 0 ? "#c3e41d" : ci === 1 ? "#8b5cf6" : "#06b6d4",
                      }}
                    />
                    <h3 className="font-bold text-base tracking-widest uppercase text-white/80">
                      {category}
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {items.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2 text-white/70">
                            <span style={{ color: ci === 0 ? "#c3e41d" : ci === 1 ? "#8b5cf6" : "#06b6d4" }}>
                              {skill.icon}
                            </span>
                            <span className="text-sm font-medium">{skill.name}</span>
                          </div>
                          <span className="text-xs text-white/30 font-mono">{skill.level}%</span>
                        </div>
                        <div className="h-1 rounded-full bg-white/8 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{
                              background: ci === 0
                                ? "linear-gradient(90deg, #c3e41d, #9ab515)"
                                : ci === 1
                                ? "linear-gradient(90deg, #8b5cf6, #6d28d9)"
                                : "linear-gradient(90deg, #06b6d4, #0891b2)",
                            }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating tech pills */}
        <motion.div
          className="flex flex-wrap gap-3 justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {techIcons.map((tech, i) => (
            <motion.span
              key={tech}
              className="px-4 py-2 rounded-full text-sm font-mono font-medium border transition-all duration-300"
              style={{
                borderColor: "rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.04)",
                color: "rgba(255,255,255,0.6)",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              whileHover={{
                borderColor: "#c3e41d",
                color: "#c3e41d",
                background: "rgba(195,228,29,0.07)",
                scale: 1.08,
              }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
