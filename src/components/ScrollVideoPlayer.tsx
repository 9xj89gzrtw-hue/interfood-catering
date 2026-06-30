"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   ScrollVideoPlayer — Scroll-driven video playback
   Video plays/pauses based on scroll position
   ═══════════════════════════════════════════════════════════════ */

interface ScrollVideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function ScrollVideoPlayer({ src, poster, className = "", style }: ScrollVideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  /* Smooth the scroll value */
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  /* Map scroll progress to video currentTime */
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isLoaded) return;

    const unsubscribe = smoothProgress.on("change", (v: number) => {
      if (video.duration && isFinite(video.duration)) {
        video.currentTime = v * video.duration;
      }
    });

    return () => unsubscribe();
  }, [smoothProgress, isLoaded]);

  /* Parallax scale effect */
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.15]);
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 24,
        ...style,
      }}
    >
      <motion.div style={{ scale: smoothScale }}>
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setIsLoaded(true)}
          style={{
            width: "100%",
            display: "block",
            objectFit: "cover",
          }}
        />
      </motion.div>
      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "1.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          color: "#fff",
          fontSize: "0.65rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          textShadow: "0 2px 8px rgba(0,0,0,0.5)",
          pointerEvents: "none",
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
        Прокрутите для воспроизведения
      </div>
    </div>
  );
}
