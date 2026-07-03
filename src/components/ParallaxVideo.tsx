"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   ParallaxVideo — Video with parallax scrolling effect
   Video moves at different speed than content
   Uses useScroll/useTransform from framer-motion
   Includes poster fallback, lazy loading, and overlay
   Respects prefers-reduced-motion
   ═══════════════════════════════════════════════════════════════ */

interface ParallaxVideoProps {
  src: string;
  poster?: string;
  title?: string;
  subtitle?: string;
  speed?: number;
  overlayOpacity?: number;
  height?: string;
  className?: string;
  muted?: boolean;
}

/* ─── Reduced-motion hook ─── */
function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mql.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);
  return prefersReduced;
}

export default function ParallaxVideo({
  src,
  poster,
  title,
  subtitle,
  speed = 0.3,
  overlayOpacity = 0.45,
  height = "70vh",
  className = "",
  muted = true,
}: ParallaxVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  /* Lazy loading: only load video when in viewport */
  const [shouldLoad, setShouldLoad] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* Play/pause based on visibility */
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad || videoError) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [shouldLoad, videoError]);

  /* Parallax scroll transforms */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const videoY = useTransform(
    scrollYProgress,
    [0, 1],
    [`${-speed * 100}%`, `${speed * 100}%`]
  );

  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    [`${speed * 30}%`, `${-speed * 30}%`]
  );

  const overlayFade = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.6, overlayOpacity, overlayOpacity, 0.6]
  );

  /* Error handler */
  const handleVideoError = useCallback(() => {
    setVideoError(true);
  }, []);

  const handleVideoReady = useCallback(() => {
    setVideoReady(true);
  }, []);

  /* ─── Reduced motion: static image / poster ─── */
  if (prefersReduced) {
    return (
      <div
        ref={containerRef}
        className={className}
        style={{
          position: "relative",
          height,
          overflow: "hidden",
          background: "var(--color-cream)",
        }}
      >
        {/* Static background */}
        {(videoError ? poster : poster || src) && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${poster || "/images/hero.jpg"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `rgba(26,26,26,${overlayOpacity})`,
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          {title && (
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                color: "var(--color-warm-white)",
                fontWeight: 400,
                marginBottom: "0.5rem",
              }}
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(1rem, 2vw, 1.25rem)",
                color: "rgba(254,253,251,0.85)",
                maxWidth: 600,
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
    );
  }

  /* ─── Animated parallax video ─── */
  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "relative",
        height,
        overflow: "hidden",
        background: "var(--color-cream)",
      }}
    >
      {/* Parallax video layer */}
      <motion.div
        style={{
          position: "absolute",
          top: "-20%",
          left: 0,
          right: 0,
          bottom: "-20%",
          y: videoY,
          willChange: "transform",
        }}
      >
        {videoError ? (
          /* Fallback to poster image on error */
          poster ? (
            <img
              src={poster}
              alt={title || "Video"}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "var(--color-cream-dark)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-sans)",
                color: "var(--color-brand-dark)",
                fontSize: "0.875rem",
              }}
            >
              Video unavailable
            </div>
          )
        ) : shouldLoad ? (
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            autoPlay
            muted={muted}
            loop
            playsInline
            preload="none"
            onLoadedData={handleVideoReady}
            onError={handleVideoError}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: videoReady ? 1 : 0,
              transition: "opacity 0.8s ease",
            }}
          />
        ) : (
          /* Placeholder before lazy load */
          poster ? (
            <img
              src={poster}
              alt={title || "Video placeholder"}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "blur(4px)",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "linear-gradient(110deg, var(--color-cream) 8%, var(--color-cream-dark) 18%, var(--color-cream) 33%)",
                backgroundSize: "200% 100%",
                animation: "parallaxShimmer 1.5s linear infinite",
              }}
            />
          )
        )}
      </motion.div>

      {/* Animated overlay */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background: `rgba(26,26,26,${overlayOpacity})`,
          opacity: overlayFade,
        }}
      />

      {/* Parallax content */}
      <motion.div
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          textAlign: "center",
          y: contentY,
          willChange: "transform",
        }}
      >
        {title && (
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "var(--color-warm-white)",
              fontWeight: 400,
              marginBottom: "0.5rem",
            }}
          >
            {title}
          </motion.h2>
        )}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              color: "rgba(254,253,251,0.85)",
              maxWidth: 600,
              lineHeight: 1.6,
            }}
          >
            {subtitle}
          </motion.p>
        )}
      </motion.div>

      <style>{`
        @keyframes parallaxShimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
