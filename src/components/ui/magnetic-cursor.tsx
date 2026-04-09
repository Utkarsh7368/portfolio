"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function MagneticCursor() {
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const dot = cursorDot.current;
    const ring = cursorRing.current;

    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;

    const moveCursor = (e: MouseEvent) => {
      dotX = e.clientX;
      dotY = e.clientY;
    };

    const checkPointer = () => {
      const hovered = document.querySelectorAll(':hover');
      let pointer = false;
      hovered.forEach((el) => {
        const style = window.getComputedStyle(el);
        if (style.getPropertyValue('cursor') === 'pointer') pointer = true;
      });
      setIsPointer(pointer);
    };

    document.addEventListener("mousemove", moveCursor);
    document.addEventListener("mousemove", checkPointer);
    document.addEventListener("mouseleave", () => setIsHidden(true));
    document.addEventListener("mouseenter", () => setIsHidden(false));

    let raf: number;
    const animate = () => {
      if (dot && ring) {
        dot.style.left = `${dotX}px`;
        dot.style.top = `${dotY}px`;
        ringX += (dotX - ringX) * 0.12;
        ringY += (dotY - ringY) * 0.12;
        ring.style.left = `${ringX}px`;
        ring.style.top = `${ringY}px`;
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mousemove", checkPointer);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={cursorDot}
        className="fixed pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
        style={{ opacity: isHidden ? 0 : 1 }}
      >
        <div
          className="rounded-full transition-all duration-200"
          style={{
            width: isPointer ? "8px" : "6px",
            height: isPointer ? "8px" : "6px",
            backgroundColor: "#c3e41d",
            boxShadow: "0 0 10px rgba(195, 228, 29, 0.8)",
          }}
        />
      </div>

      {/* Ring */}
      <div
        ref={cursorRing}
        className="fixed pointer-events-none z-[99998] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
        style={{ opacity: isHidden ? 0 : 1 }}
      >
        <div
          className="rounded-full border transition-all duration-300"
          style={{
            width: isPointer ? "44px" : "36px",
            height: isPointer ? "44px" : "36px",
            borderColor: isPointer
              ? "rgba(139, 92, 246, 0.8)"
              : "rgba(195, 228, 29, 0.5)",
            backgroundColor: isPointer
              ? "rgba(139, 92, 246, 0.08)"
              : "transparent",
          }}
        />
      </div>
    </>
  );
}
