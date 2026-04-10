"use client";

import React, { useRef, useEffect, useState } from "react";

interface ParticleTextPart {
  text: string;
  color: string;
  isItalic?: boolean;
}

interface ParticleTextProps {
  parts: ParticleTextPart[];
  className?: string;
  fontSize?: number;
  hoverRadius?: number;
}

class Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  friction: number;
  ease: number;
  r: number;
  g: number;
  b: number;

  constructor(x: number, y: number, r: number, g: number, b: number) {
    this.x = x + (Math.random() - 0.5) * 50;
    this.y = y + (Math.random() - 0.5) * 50;
    this.baseX = x;
    this.baseY = y;
    this.vx = 0;
    this.vy = 0;
    this.size = 1.2;
    this.friction = 0.85;
    this.ease = 0.08;
    this.r = r;
    this.g = g;
    this.b = b;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = `rgb(${this.r}, ${this.g}, ${this.b})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  update(mouse: { x: number | null; y: number | null }, radius: number) {
    // Return to base position (Soft, smooth spring)
    let dxBase = (this.baseX - this.x) * this.ease;
    let dyBase = (this.baseY - this.y) * this.ease;
    this.vx += dxBase;
    this.vy += dyBase;

    // Soft-touch displacement
    if (mouse.x !== null && mouse.y !== null) {
      let dxMouse = mouse.x - this.x;
      let dyMouse = mouse.y - this.y;
      let distance = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

      // We use a smaller effective radius for 'direct touch' feel
      if (distance < radius) {
        let force = (radius - distance) / radius;
        // Dampened impulse to prevent jitter
        this.vx -= (dxMouse / distance) * force * 1.2;
        this.vy -= (dyMouse / distance) * force * 1.2;
      }
    }

    // Apply viscosity and update position
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.x += this.vx;
    this.y += this.vy;
  }
}

export const ParticleText: React.FC<ParticleTextProps> = ({
  parts,
  className = "",
  fontSize = 80,
  hoverRadius = 100,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null }>({
    x: null,
    y: null,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;

    const init = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      particles = [];
      
      // Draw text to buffer first
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      
      // Calculate total width to center multi-part text
      let totalWidth = 0;
      const spacing = 15; // Space between parts
      
      parts.forEach(part => {
        ctx.font = `${part.isItalic ? "italic" : ""} bold ${fontSize}px sans-serif`;
        totalWidth += ctx.measureText(part.text).width + spacing;
      });
      totalWidth -= spacing; // Remove last spacing

      let currentX = (rect.width - totalWidth) / 2;
      const centerY = rect.height / 2;

      parts.forEach(part => {
        ctx.font = `${part.isItalic ? "italic" : ""} bold ${fontSize}px sans-serif`;
        ctx.fillStyle = part.color;
        const textWidth = ctx.measureText(part.text).width;
        ctx.fillText(part.text, currentX + textWidth / 2, centerY);
        currentX += textWidth + spacing;
      });

      const textData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Sampling pixels with color
      for (let y = 0, y2 = textData.height; y < y2; y += 4) {
        for (let x = 0, x2 = textData.width; x < x2; x += 4) {
          const index = (y * 4 * textData.width) + (x * 4);
          const alpha = textData.data[index + 3];
          if (alpha > 128) {
            let positionX = x / dpr;
            let positionY = y / dpr;
            particles.push(new Particle(
              positionX, 
              positionY, 
              textData.data[index],     // R
              textData.data[index + 1], // G
              textData.data[index + 2]  // B
            ));
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].draw(ctx);
        particles[i].update(mouseRef.current, hoverRadius);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      init();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [parts, fontSize, hoverRadius]);

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        onMouseMove={(e) => {
          const rect = canvasRef.current?.getBoundingClientRect();
          if (rect) {
            mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
          }
        }}
        onMouseLeave={() => {
          mouseRef.current = { x: null, y: null };
        }}
        className="w-full h-full block"
      />
    </div>
  );
};
