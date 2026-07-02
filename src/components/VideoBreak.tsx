"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   VideoBreak — Full-bleed video section for light theme
   Cinematic interlude with warm overlay
   ═══════════════════════════════════════════════════════════════ */

interface VideoBreakProps {
  src: string;
  title: string;
  subtitle?: string;
}

export default function VideoBreak({ src, title, subtitle }: VideoBreakProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} style={{ position: "relative", height: "60vh", minHeight: 350, overflow: "hidden" }}>
      <motion.div style={{ scale, position: "absolute", inset: "-10%" }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        >
          <source src={src} type="video/mp4" />
        </video>
      </motion.div>
      {/* Warm overlay for light theme */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.5)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.8) 100%)" }} />
      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="container"
        aria-hidden
      >
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "2rem",
        }}>
          <h2 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
            fontWeight: 400,
            color: "var(--color-dark)",
            lineHeight: 1.2,
            marginBottom: "0.5rem",
          }}>
            {title}
          </h2>
          {subtitle && (
            <p style={{
              color: "rgba(26,26,26,0.6)",
              fontSize: "clamp(0.85rem, 2vw, 1.1rem)",
              maxWidth: 500,
            }}>
              {subtitle}
            </p>
          )}
        </div>
      </motion.div>
    </section>
  );
}
