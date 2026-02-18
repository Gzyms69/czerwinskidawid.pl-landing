import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./MagicBento.css";

interface GlobalSpotlightProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  spotlightRadius?: number;
  glowColor?: string;
  enabled?: boolean;
}

const GlobalSpotlight: React.FC<GlobalSpotlightProps> = ({
  containerRef,
  spotlightRadius = 400,
  glowColor = "255, 255, 255", // Default white
  enabled = true,
}) => {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !enabled) return;

    const ctx = gsap.context(() => {});

    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current) return;

      try {
        // 1. Move the spotlight visual GLOBALLY (no bounds check)
        ctx.add(() => {
          gsap.to(spotlightRef.current, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.3, // Slightly smoother
            ease: "power2.out",
            opacity: 0.25, // Subtle glow intensity
            overwrite: "auto"
          });
        });

        // 2. Update card borders only IF container exists
        if (containerRef.current) {
          const cards = containerRef.current.querySelectorAll(".magic-bento-card");
          
          cards.forEach((card) => {
            const el = card as HTMLElement;
            const rect = el.getBoundingClientRect();
            
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);
            
            let intensity = 0;
            if (distance < spotlightRadius) {
              intensity = 1 - (distance / spotlightRadius);
            }

            el.style.setProperty("--glow-intensity", intensity.toFixed(2));
            
            const relX = ((e.clientX - rect.left) / rect.width) * 100;
            const relY = ((e.clientY - rect.top) / rect.height) * 100;
            
            el.style.setProperty("--glow-x", `${relX}%`);
            el.style.setProperty("--glow-y", `${relY}%`);
          });
        }

      } catch (err) {
        // Silent safety
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ctx.revert();
    };
  }, [isMounted, enabled, spotlightRadius, containerRef]);

  if (!enabled) return null;

  return (
    <div
      ref={spotlightRef}
      className="global-spotlight"
      style={{
        width: spotlightRadius * 2,
        height: spotlightRadius * 2,
        background: `radial-gradient(circle, rgba(${glowColor}, 0.2) 0%, transparent 70%)`,
        opacity: 0,
        pointerEvents: "none",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 30,
        transform: "translate(-50%, -50%)",
        willChange: "transform, opacity"
      }}
    />
  );
};

export default GlobalSpotlight;
