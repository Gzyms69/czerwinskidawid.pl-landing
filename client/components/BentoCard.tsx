import React, { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ReactNode } from "react";
import "./MagicBento.css";

interface Action {
  label: string;
  onClick?: () => void;
  href?: string;
}

interface BentoCardProps {
  title: string;
  description?: string;
  content: ReactNode;
  action?: Action;
  additionalActions?: Action[];
  isTerminal?: boolean;
  glowColor?: "green" | "blue";
  className?: string;
  // Magic Bento Props
  enableTilt?: boolean;
  enableMagnetism?: boolean;
  enableParticles?: boolean;
  particleCount?: number;
  HeadingTag?: "h2" | "h3" | "h4";
}

const DEFAULT_PARTICLE_COUNT = 12;

// Helper to create particle element
const createParticleElement = (x: number, y: number, colorRgb: string): HTMLDivElement => {
  const el = document.createElement("div");
  el.className = "particle";
  el.style.cssText = `
    width: 4px;
    height: 4px;
    background: rgba(${colorRgb}, 1);
    box-shadow: 0 0 6px rgba(${colorRgb}, 0.6);
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

export function BentoCard({
  title,
  description,
  content,
  action,
  additionalActions = [],
  isTerminal = false,
  glowColor = "green",
  className = "",
  enableTilt = true,
  enableMagnetism = true,
  enableParticles = true,
  particleCount = DEFAULT_PARTICLE_COUNT,
  HeadingTag = "h2",
}: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const isHoveredRef = useRef(false);
  const particlesInitialized = useRef(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Map color names to RGB values for CSS variables
  const glowRgb = glowColor === "green" ? "34, 197, 94" : "59, 130, 246";
  const glowHex = glowColor === "green" ? "#22c55e" : "#3b82f6"; // For Tailwind utility matching

  const allActions = action ? [action, ...additionalActions] : additionalActions;

  // --- Particle Logic ---
  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;
    particlesInitialized.current = true;
    // Particles are created on demand during hover to save resources
  }, []);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    particlesRef.current.forEach((particle) => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "back.in(1.7)",
        onComplete: () => {
          particle.remove();
        },
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;

    if (!particlesInitialized.current) initializeParticles();

    const { width, height } = cardRef.current.getBoundingClientRect();
    const particleContainer = cardRef.current.querySelector(".particle-container");

    if (!particleContainer) return;

    // Create a batch of particles
    for (let i = 0; i < particleCount; i++) {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current) return;

        const x = Math.random() * width;
        const y = Math.random() * height;
        const particle = createParticleElement(x, y, glowRgb);
        
        particleContainer.appendChild(particle);
        particlesRef.current.push(particle);

        // Entrance animation
        gsap.fromTo(
          particle,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
        );

        // Floating animation
        gsap.to(particle, {
          x: `+=${(Math.random() - 0.5) * 60}`,
          y: `+=${(Math.random() - 0.5) * 60}`,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });

        // Pulse animation
        gsap.to(particle, {
          opacity: 0.3,
          duration: 1.5,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        });
      }, i * 100);
      timeoutsRef.current.push(timeoutId);
    }
  }, [particleCount, glowRgb, initializeParticles]);

  // --- Interaction Logic ---
  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      if (enableParticles) animateParticles();

      if (enableTilt) {
        gsap.to(element, {
          duration: 0.3,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();

      // Reset Tilt & Magnetism
      gsap.to(element, {
        rotateX: 0,
        rotateY: 0,
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power2.out", // Smooth return
      });
      
      // Reset Glow Intensity
      element.style.setProperty("--glow-intensity", "0");
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Update CSS Variables for Border Glow
      // We calculate percentage relative to the card size
      const relativeX = (x / rect.width) * 100;
      const relativeY = (y / rect.height) * 100;
      
      element.style.setProperty("--glow-x", `${relativeX}%`);
      element.style.setProperty("--glow-y", `${relativeY}%`);
      element.style.setProperty("--glow-intensity", "1");

      // Tilt Physics
      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -5; // Reduced intensity for subtlety
        const rotateY = ((x - centerX) / centerX) * 5;

        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.1,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }

      // Magnetism Physics
      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.02; // Very subtle pull
        const magnetY = (y - centerY) * 0.02;

        gsap.to(element, {
          x: magnetX,
          y: magnetY,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("mousemove", handleMouseMove);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("mousemove", handleMouseMove);
      clearAllParticles();
    };
  }, [enableTilt, enableMagnetism, enableParticles, animateParticles, clearAllParticles]);

  return (
    <div
      ref={cardRef}
      className={`magic-bento-card magic-bento-card--border-glow ${className}`}
      style={
        {
          "--glow-rgb": glowRgb,
        } as React.CSSProperties
      }
    >
      {/* Particle Layer */}
      <div className="particle-container" />

      {/* Content Layer (Above Effects) */}
      <div className="bento-content-layer p-6 sm:p-8 flex flex-col h-full">
        {/* Terminal Dots */}
        {isTerminal && (
          <div className="flex gap-2 mb-6">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
        )}

        <div className="space-y-4 flex-grow">
          <HeadingTag className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {title}
          </HeadingTag>

          {description && (
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              {description}
            </p>
          )}

          <div className="pt-2">{content}</div>
        </div>

        {/* Actions Footer */}
        {allActions.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-8 pt-4 border-t border-white/5">
            {allActions.map((act, idx) => {
              // Dynamic classes based on glow color
              const btnClass = `px-6 py-3 rounded-lg font-mono text-sm font-semibold transition-all duration-300
                ${
                  glowColor === "green"
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                    : "bg-blue-500/10 text-blue-400 border border-blue-500/30 hover:bg-blue-500/20 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                }`;

              const content = (
                <button
                  key={idx}
                  type="button"
                  className={btnClass}
                  onClick={(e) => {
                    if (act.onClick) {
                      e.preventDefault();
                      e.stopPropagation();
                      act.onClick();
                    }
                  }}
                >
                  {act.label}
                </button>
              );

              if (act.href) {
                return (
                  <a
                    key={idx}
                    href={act.href}
                    target={act.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      act.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
                    {content}
                  </a>
                );
              }
              return content;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
