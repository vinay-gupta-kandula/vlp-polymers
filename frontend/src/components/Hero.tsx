"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import RequirementModal from "./RequirementModal";
import { useTheme } from "./ThemeContext";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  decay: number;
  growth: number;
  isFragment?: boolean;
  colorHighlight: string;
  colorShadow: string;
  rotation: number;
  rotationSpeed: number;
}

export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false);
  const { theme } = useTheme();
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, lastX: 0, lastY: 0, lastSpawnTime: 0 });
  const particlesRef = useRef<Particle[]>([]);

  // Live Typewriter Effect states
  const [typedText, setTypedText] = useState("");
  const words = ["Thermocol", "Packaging", "Insulation", "EPS"];
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentWord = words[wordIndex];

    const type = () => {
      if (!isDeleting) {
        setTypedText(currentWord.substring(0, typedText.length + 1));
        if (typedText === currentWord) {
          timer = setTimeout(() => setIsDeleting(true), 2500);
        } else {
          timer = setTimeout(type, 150);
        }
      } else {
        setTypedText(currentWord.substring(0, typedText.length - 1));
        if (typedText === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
          timer = setTimeout(type, 500);
        } else {
          timer = setTimeout(type, 80);
        }
      }
    };

    timer = setTimeout(type, isDeleting ? 80 : 150);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, wordIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      canvas.width = rect?.width || window.innerWidth;
      canvas.height = rect?.height || window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let animationFrameId: number;

    const updateAndDraw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;
      const nextParticles: Particle[] = [];

      // Spontaneous ambient spawn of thermocol balls
      if (Math.random() < 0.015 && particles.length < 40) {
        const startX = Math.random() * canvas.width;
        const startY = canvas.height + 20;
        const maxRadius = 8 + Math.random() * 22;
        
        particles.push({
          x: startX,
          y: startY,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -0.5 - Math.random() * 0.8,
          radius: 0.1,
          maxRadius,
          alpha: 0.6 + Math.random() * 0.4,
          decay: 0.001 + Math.random() * 0.002,
          growth: 0.3 + Math.random() * 0.4,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.01,
          colorHighlight: "rgba(255, 255, 255, ",
          colorShadow: theme === "light" ? "rgba(79, 70, 229, " : "rgba(0, 82, 204, ",
        });
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse hover interaction
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Repulsion
        if (dist < 100 && dist > 0 && !p.isFragment) {
          const force = (100 - dist) / 100;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force * 0.3;
          p.vy += Math.sin(angle) * force * 0.3;
        }

        // Pop on hover touch
        if (dist < (p.radius + 12) && !p.isFragment && p.radius > 4) {
          // Burst fragments!
          const fragmentCount = 5 + Math.floor(Math.random() * 5);
          for (let j = 0; j < fragmentCount; j++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1.5 + Math.random() * 2.5;
            const fragRadius = 2 + Math.random() * (p.radius * 0.25);
            
            nextParticles.push({
              x: p.x,
              y: p.y,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              radius: fragRadius,
              maxRadius: fragRadius,
              alpha: 1.0,
              decay: 0.02 + Math.random() * 0.025,
              growth: 0,
              isFragment: true,
              rotation: Math.random() * Math.PI * 2,
              rotationSpeed: (Math.random() - 0.5) * 0.1,
              colorHighlight: p.colorHighlight,
              colorShadow: p.colorShadow,
            });
          }
          continue; // Skip normal particle update/drawing for this one
        }

        // Physics updates
        p.x += p.vx;
        p.y += p.vy;

        if (!p.isFragment) {
          p.vy -= 0.03; // buoyancy upward force
          p.vx *= 0.97;
          p.vy *= 0.97;
        } else {
          // Fragment gravity
          p.vy += 0.06;
          p.vx *= 0.94;
          p.vy *= 0.94;
        }

        // Pop out scale up
        if (p.radius < p.maxRadius) {
          p.radius += p.growth;
        }

        p.alpha -= p.decay;

        if (p.alpha > 0 && p.radius > 0.1) {
          ctx.save();

          // Drop shadow
          ctx.beginPath();
          ctx.arc(p.x + p.radius * 0.12, p.y + p.radius * 0.15, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 15, 40, ${p.alpha * 0.16})`;
          ctx.fill();

          // 3D Shaded sphere radial gradient
          const gradient = ctx.createRadialGradient(
            p.x - p.radius * 0.25,
            p.y - p.radius * 0.25,
            p.radius * 0.05,
            p.x,
            p.y,
            p.radius
          );

          gradient.addColorStop(0, `${p.colorHighlight}${p.alpha})`);
          gradient.addColorStop(0.2, `${p.colorHighlight}${p.alpha * 0.95})`);
          gradient.addColorStop(0.7, `${theme === "light" ? "rgba(224, 231, 255, " : "rgba(165, 210, 255, "}${p.alpha * 0.9})`);
          gradient.addColorStop(1, `${p.colorShadow}${p.alpha * 0.5})`);

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();

          ctx.restore();
          nextParticles.push(p);
        }
      }

      particlesRef.current = nextParticles;
    };

    const loop = () => {
      updateAndDraw();
      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseRef.current.x = x;
    mouseRef.current.y = y;

    // Normalised for 3D boxes parallax (relative to entire container)

    const dx = x - mouseRef.current.lastX;
    const dy = y - mouseRef.current.lastY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const now = Date.now();

    if (dist > 15 && now - mouseRef.current.lastSpawnTime > 40) {
      const count = 1 + Math.floor(Math.random() * 2);
      const newParticles: Particle[] = [];
      
      for (let i = 0; i < count; i++) {
        const maxRadius = 6 + Math.random() * 18;
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.5 + Math.random() * 1.2;

        newParticles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.5,
          radius: 0.1,
          maxRadius,
          alpha: 1.0,
          decay: 0.008 + Math.random() * 0.01,
          growth: 0.8 + Math.random() * 0.6,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          colorHighlight: "rgba(255, 255, 255, ",
          colorShadow: theme === "light" ? "rgba(79, 70, 229, " : "rgba(0, 82, 204, ",
        });
      }
      
      particlesRef.current.push(...newParticles);
      mouseRef.current.lastX = x;
      mouseRef.current.lastY = y;
      mouseRef.current.lastSpawnTime = now;
    }
  };

  const handleMouseLeave = () => {
    mouseRef.current.x = -9999;
    mouseRef.current.y = -9999;
  };

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen pt-24 flex items-center overflow-hidden bg-[var(--hero-bg)] transition-colors duration-300"
    >
      {/* Custom inline cursor animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blink-cursor {
          from, to { border-color: transparent }
          50% { border-color: var(--hero-span-color); }
        }
        .typewriter-cursor {
          border-right: 3px solid var(--hero-span-color);
          animation: blink-cursor 0.8s step-end infinite;
        }
      `}} />

      {/* High-vibrancy background image - extremely bright and attractive */}
      <img
        src="/assets/hero_bg.png"
        alt="Vibrant polymer structure background"
        className={`absolute inset-0 w-full h-full object-cover filter brightness-[1.20] contrast-[1.12] saturate-[1.15] select-none pointer-events-none z-0 transition-opacity duration-500 ${
          theme === "light" ? "opacity-25" : "opacity-100"
        }`}
      />
      {/* Premium royal blue overlay - left-weighted to guarantee readable text contrast */}
      <div
        className="absolute inset-0 z-10 pointer-events-none transition-all duration-500"
        style={{ backgroundImage: "var(--hero-overlay)" }}
      />

      {/* Interactive canvas for thermocol particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-[15]"
      />

      <div className="container mx-auto px-4 md:px-8 relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full py-16">
        {/* Left Content Side */}
        <div className="lg:col-span-7 flex flex-col items-start text-left animate-fadeInUp">
          {/* Top Floating Badges */}
          <div className="flex flex-wrap gap-3 mb-8 items-center">
            <img
              src="/assets/verified_exporter.png"
              alt="Verified Exporter"
              className="h-6 md:h-7 w-auto object-contain transition-transform duration-300 hover:scale-103"
              style={{ filter: theme === "light" ? "drop-shadow(0px 2px 4px rgba(0,0,0,0.1))" : "none" }}
            />
            <img
              src="/assets/9_year_excellence.png"
              alt="9 Years of Excellence"
              className="h-6 md:h-7 w-auto object-contain transition-transform duration-300 hover:scale-103"
              style={{ filter: theme === "light" ? "drop-shadow(0px 2px 4px rgba(0,0,0,0.1))" : "none" }}
            />
            <img
              src="/assets/gst_registered.png"
              alt="GST Registered"
              className="h-6 md:h-7 w-auto object-contain transition-transform duration-300 hover:scale-103"
              style={{ filter: theme === "light" ? "drop-shadow(0px 2px 4px rgba(0,0,0,0.1))" : "none" }}
            />
          </div>

          {/* Core Title */}
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--hero-title-color)] leading-tight mb-6 transition-colors duration-300">
            Premium <span className="text-[var(--hero-span-color)] transition-colors duration-300 typewriter-cursor pr-1">
              {typedText}
            </span> <br className="hidden md:inline" />Solutions
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-[var(--hero-body-color)] font-medium leading-relaxed max-w-xl mb-10 font-sans transition-colors duration-300">
            High-quality Thermocol products for packaging,<br className="hidden md:inline" />insulation & Industrial applications.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 bg-[var(--hero-btn-primary-bg)] hover:bg-[var(--hero-btn-primary-hover)] text-[var(--hero-btn-primary-text)] font-bold text-sm px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              Submit Requirement
              <i className="fa-solid fa-arrow-right-long transition-transform duration-300 hover:translate-x-1" />
            </button>
            <Link
              href="/product-range"
              className="inline-flex items-center justify-center border border-[var(--hero-btn-secondary-border)] bg-[var(--hero-btn-secondary-bg)] hover:bg-[var(--hero-btn-secondary-hover)] text-[var(--hero-btn-secondary-text)] font-bold text-sm px-8 py-4 rounded-full backdrop-blur-sm hover:-translate-y-0.5 transition-all duration-300"
            >
              View Catalog
            </Link>
          </div>
        </div>

        {/* Right space reserved for the pre-rendered boxes in hero_bg.png */}
        <div className="lg:col-span-5 hidden lg:block" />
      </div>

      {/* Embedded Requirement Form Modal */}
      <RequirementModal isOpen={modalOpen} onOpenChange={setModalOpen} />
    </section>
  );
}
