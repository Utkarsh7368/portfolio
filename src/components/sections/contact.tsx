"use client";

import { motion } from "framer-motion";

import { Mail, ArrowRight, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { ParticleText } from "@/components/ui/particle-text";
import emailjs from "@emailjs/browser";

const socials = [
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

            {/* Placeholder for social handles later */}
            <div className="p-8">
              <p className="text-sm text-white/20 font-mono italic">
                 Social handles coming soon...
              </p>
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
