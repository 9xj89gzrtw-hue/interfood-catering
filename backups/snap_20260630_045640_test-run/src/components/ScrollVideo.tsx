"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   ScrollVideo — video playback controlled by scroll position
   Like Apple's AirPods product page scroll-driven video
   ═══════════════════════════════════════════════════════════════ */

interface ScrollVideoProps {
  src: string;
  className?: string;
  title?: string;
  subtitle?: string;
}

export default function ScrollVideo({ src, className = "", title, subtitle }: ScrollVideoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { margin: "-20%" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Scale effect
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, 40]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Control video playback based on scroll
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (inView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [inView]);

  // Scroll-driven playback rate
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const video = videoRef.current;
      if (!video || !video.duration) return;
      // Map scroll progress to video time
      video.currentTime = video.duration * Math.max(0, Math.min(1, v));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section
      ref={ref}
      className={className}
      style={{ position: "relative", height: "150vh", display: "flex", alignItems: "center" }}
    >
      <div className="container" style={{ position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <motion.div
          style={{
            scale,
            borderRadius,
            opacity,
            overflow: "hidden",
            width: "100%",
            maxWidth: 1200,
            aspectRatio: "16/9",
            position: "relative",
            boxShadow: "0 30px 100px rgba(0,0,0,0.15)",
          }}
        >
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          >
            <source src={src} type="video/mp4" />
          </video>
          {/* Overlay text */}
          {title && (
            <motion.div
              style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(254,253,251,0.8) 0%, transparent 50%)",
                display: "flex", flexDirection: "column",
                justifyContent: "flex-end", padding: "2rem",
                opacity,
              }}
            >
              <h3 style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.2rem, 4vw, 2.5rem)",
                fontWeight: 400,
                color: "var(--color-dark)",
                marginBottom: "0.3rem",
              }}>
                {title}
              </h3>
              {subtitle && (
                <p style={{ color: "#666", fontSize: "clamp(0.8rem, 2vw, 1rem)" }}>
                  {subtitle}
                </p>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
