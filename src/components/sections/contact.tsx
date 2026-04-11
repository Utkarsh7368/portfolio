"use client";

import { motion } from "framer-motion";

import { Mail, ArrowRight, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { ParticleText } from "@/components/ui/particle-text";
import emailjs from "@emailjs/browser";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const socials = [
  {
    icon: <GithubIcon className="w-5 h-5" />,
    label: "GitHub",
    href: "https://github.com/Utkarsh7368/",
    color: "#ffffff",
  },
  {
    icon: <LinkedinIcon className="w-5 h-5" />,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/utkarsh-gupta-029238218/",
    color: "#0077b5",
  },
  {
    icon: <Mail className="w-5 h-5" />,
    label: "Email",
    href: "mailto:dev.utkarshg@gmail.com",
    color: "#c3e41d",
  },
];

export default function Contact() {
  const [fontSize, setFontSize] = useState(120);
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const handleResize = () => {
      const scale = window.innerWidth < 768 ? 13 : 18;
      setFontSize(Math.max(28, Math.min(85, window.innerWidth / scale)));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      // NOTE: User needs to provide these IDs. Using placeholders for now.
      // You can set these in .env.local:
      // NEXT_PUBLIC_EMAILJS_SERVICE_ID
      // NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
      // NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS is not fully configured. Please check your .env.local file.");
      }

      await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current,
        publicKey
      );

      setStatus("success");
      formRef.current.reset();
      
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error: any) {
      console.error("Email Error:", error);
      setStatus("error");
      setErrorMessage(error.message || "Failed to send message. Please try again.");
    }
  };

  return (
    <section id="contact" className="section-padding relative bg-black overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(195,228,29,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-screen-xl mx-auto px-6">
        {/* Heading */}
        <motion.div
           className="mb-12 md:mb-16 flex justify-center w-full"
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
         >
           <div className="w-full text-center">
             <p className="text-xs tracking-[0.4em] text-white/30 uppercase font-mono mb-6">
               06 / Contact
             </p>
             <div className="h-[120px] md:h-[180px] w-full flex justify-center items-center">
               <ParticleText 
                 parts={[
                   { text: "Let's Build", color: "white" },
                   { text: "Together", color: "#c3e41d" }
                 ]}
                 fontSize={fontSize} 
                 className="w-full h-full"
                 hoverRadius={120}
               />
             </div>
             <p className="text-white/50 text-base md:text-lg max-w-xl mx-auto mt-8">
                Ready to elevate your digital presence? Drop me a line and let's start something great.
             </p>
           </div>
         </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          {/* Info side */}
          <motion.div 
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="glass rounded-2xl p-8 border border-white/5">
              <h3 className="text-xl font-bold text-white mb-6">Contact Details</h3>
              
              <div className="space-y-6">
                <a 
                  href="mailto:dev.utkarshg@gmail.com" 
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#c3e41d]/40 transition-colors">
                    <Mail className="w-5 h-5 text-[#c3e41d]" />
                  </div>
                  <div>
                    <p className="text-xs text-white/30 uppercase font-mono tracking-widest">Email</p>
                    <p className="text-white/80 font-medium group-hover:text-[#c3e41d] transition-colors">dev.utkarshg@gmail.com</p>
                  </div>
                </a>

                {/* Additional info placeholder */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <span className="text-green-400">●</span>
                  </div>
                  <div>
                    <p className="text-xs text-white/30 uppercase font-mono tracking-widest">Availability</p>
                    <p className="text-white/80 font-medium">Remote Worldwide</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="grid grid-cols-2 gap-4">
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

          {/* Form side */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form 
              ref={formRef} 
              onSubmit={sendEmail}
              className="glass rounded-2xl p-8 border border-white/5 space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="user_name" className="text-xs font-mono text-white/40 uppercase tracking-widest px-1">Name</label>
                  <input
                    type="text"
                    id="user_name"
                    name="user_name"
                    required
                    placeholder="Your Name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#c3e41d]/50 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="user_email" className="text-xs font-mono text-white/40 uppercase tracking-widest px-1">Email</label>
                  <input
                    type="email"
                    id="user_email"
                    name="user_email"
                    required
                    placeholder="your@email.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#c3e41d]/50 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-xs font-mono text-white/40 uppercase tracking-widest px-1">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  placeholder="What's this about?"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#c3e41d]/50 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-mono text-white/40 uppercase tracking-widest px-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="How can I help you?"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#c3e41d]/50 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full group relative flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold transition-all duration-300 disabled:opacity-50"
                style={{
                  background: status === "success" ? "#22c55e" : (status === "error" ? "#ef4444" : "#c3e41d"),
                  color: status === "idle" || status === "loading" ? "black" : "white",
                  boxShadow: status === "idle" ? "0 0 30px rgba(195,228,29,0.2)" : "none"
                }}
              >
                {status === "idle" && (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
                {status === "loading" && (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending...</span>
                  </>
                )}
                {status === "success" && (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Message Sent!</span>
                  </>
                )}
                {status === "error" && (
                  <>
                    <AlertCircle className="w-5 h-5" />
                    <span>Error Occurred</span>
                  </>
                )}
              </button>

              {status === "error" && (
                <p className="text-red-400 text-xs text-center font-mono mt-4">
                  {errorMessage}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
