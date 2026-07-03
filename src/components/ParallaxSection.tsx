"use client";

import { useRef, useEffect, useState } from "react";

/* ═══════════════════════════════════════════════════════════════
   ParallaxSection — section with parallax background image
   Moves background at different speed than content
   2026 trend: depth, parallax, scroll-driven animation
   ═══════════════════════════════════════════════════════════════ */

interface ParallaxSectionProps {
  imageUrl: string;
  children: React.ReactNode;
  speed?: number;
  overlay?: string;
  height?: string;
  className?: string;
}

export default function ParallaxSection({
  imageUrl,
  children,
  speed = 0.5,
  overlay = "rgba(26,26,26,0.55)",
  height = "70vh",
  className = "",
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrolled = -rect.top * speed;
      setOffset(scrolled);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        position: "relative",
        height,
        overflow: "hidden",
      }}
    >
      {/* Parallax background */}
      <div
        style={{
          position: "absolute",
          inset: -50,
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `translate3d(0, ${offset}px, 0)`,
          willChange: "transform",
        }}
      />
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: overlay,
        }}
      />
      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
}
