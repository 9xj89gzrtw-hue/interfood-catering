"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   HorizontalVideoScroll — горизонтальный скролл видео-ряда
   Тренд 2026: horizontal scroll sections, Apple-style showcases
   ═══════════════════════════════════════════════════════════════ */

interface VideoItem {
  src: string;
  title: string;
  subtitle: string;
}

interface HorizontalVideoScrollProps {
  videos: VideoItem[];
  style?: React.CSSProperties;
}

export default function HorizontalVideoScroll({
  videos,
  style,
}: HorizontalVideoScrollProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(videos.length - 1) * 40}%`]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      <div style={{ height: `${videos.length * 60}vh`, position: "relative" }}>
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <motion.div
            style={{
              display: "flex",
              gap: "2rem",
              paddingLeft: "5vw",
              paddingRight: "5vw",
              x,
            }}
          >
            {videos.map((video, i) => (
              <VideoCard key={i} video={video} index={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function VideoCard({ video, index }: { video: VideoItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] as const }}
      style={{
        flex: "0 0 70vw",
        maxWidth: 900,
        aspectRatio: "16/9",
        borderRadius: 24,
        overflow: "hidden",
        position: "relative",
        boxShadow: "0 30px 80px rgba(0,0,0,0.15)",
      }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source src={video.src} type="video/mp4" />
      </video>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "2rem 2.5rem",
          color: "#fff",
        }}
      >
        <span
          style={{
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            opacity: 0.7,
            display: "block",
            marginBottom: "0.3rem",
          }}
        >
          0{index + 1}
        </span>
        <h3
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.3rem, 3vw, 2rem)",
            fontWeight: 400,
            margin: 0,
          }}
        >
          {video.title}
        </h3>
        <p style={{ fontSize: "0.9rem", opacity: 0.7, margin: "0.3rem 0 0" }}>
          {video.subtitle}
        </p>
      </div>
    </motion.div>
  );
}
