"use client";

import { motion } from "framer-motion";

import { Mail, ArrowRight, Send } from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
  </svg>
);

const socials = [
  {
    icon: <GithubIcon className="w-5 h-5" />,
    label: "GitHub",
    href: "https://github.com/utkarshgupta",
    color: "#ffffff",
  },
  {
    icon: <LinkedinIcon className="w-5 h-5" />,
    label: "LinkedIn",
    href: "https://linkedin.com/in/utkarshgupta",
    color: "#0077b5",
  },
  {
    icon: <TwitterIcon className="w-5 h-5" />,
    label: "Twitter",
    href: "https://twitter.com/utkarshgupta",
    color: "#1da1f2",
  },
  {
    icon: <Mail className="w-5 h-5" />,
    label: "Email",
    href: "mailto:utkarsh@example.com",
    color: "#c3e41d",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="section-padding relative bg-black overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(195,228,29,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-screen-xl mx-auto">
        {/* Heading */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs tracking-[0.4em] text-white/30 uppercase font-mono mb-4">
            06 / Contact
          </p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Let's Build
            <span
              className="ml-4"
              style={{ color: "#c3e41d", fontFamily: "var(--font-fira)" }}
            >
              Together
            </span>
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-xl mx-auto">
            I'm always open to new opportunities, collaborations, and conversations.
            Drop me a message — I respond within 24 hours.
          </p>
        </motion.div>

        {/* Main contact card */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Email big CTA */}
          <div
            className="glass rounded-2xl p-8 md:p-12 text-center mb-6"
            style={{
              background: "linear-gradient(135deg, rgba(195,228,29,0.06) 0%, rgba(139,92,246,0.04) 100%)",
              border: "1px solid rgba(195,228,29,0.12)",
            }}
          >
            <p className="text-white/40 text-sm font-mono tracking-widest uppercase mb-4">
              Reach me at
            </p>
            <a
              href="mailto:utkarsh@example.com"
              className="group inline-flex items-center gap-3 text-2xl md:text-3xl font-bold transition-colors duration-300 hover:text-[#c3e41d] text-white"
            >
              utkarsh@example.com
              <ArrowRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2" style={{ color: "#c3e41d" }} />
            </a>

            <div className="mt-8">
              <a
                href="mailto:utkarsh@example.com"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                style={{
                  background: "#c3e41d",
                  boxShadow: "0 0 40px rgba(195,228,29,0.35)",
                }}
              >
                <Send className="w-4 h-4" />
                Send a Message
              </a>
            </div>
          </div>

          {/* Social links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {socials.map((social, i) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-xl p-4 flex flex-col items-center gap-3 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.06, y: -4 }}
                style={{ border: "1px solid rgba(255,255,255,0.06)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${social.color}40`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 10px 40px ${social.color}20`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div style={{ color: social.color }}>{social.icon}</div>
                <span className="text-sm text-white/60 font-medium">{social.label}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Location badge */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 text-white/30 text-sm font-mono">
            <span className="text-green-400">●</span>
            Based in India · Available for remote work worldwide
          </span>
        </motion.div>
      </div>
    </section>
  );
}
