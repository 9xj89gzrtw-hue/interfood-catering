"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   Video Carousel Component
   Displays a carousel of video clips with navigation
   ═══════════════════════════════════════════════════════════════ */

interface VideoSlide {
  src: string;
  poster?: string;
  title: string;
  subtitle?: string;
}

interface VideoCarouselProps {
  slides: VideoSlide[];
  autoplay?: boolean;
  interval?: number;
}

export default function VideoCarousel({ slides, autoplay = true, interval = 8000 }: VideoCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const goTo = (index: number) => {
    setCurrent(index);
    if (videoRef.current) {
      videoRef.current.load();
      if (playing) videoRef.current.play().catch(() => {});
    }
    resetTimer();
  };

  const next = () => goTo((current + 1) % slides.length);
  const prev = () => goTo((current - 1 + slides.length) % slides.length);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (autoplay) {
      timerRef.current = setInterval(next, interval);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      videoRef.current.play().catch(() => {});
      resetTimer();
    }
    setPlaying(!playing);
  };

  return (
    <div className="video-carousel" style={{ position: "relative", borderRadius: "20px", overflow: "hidden", aspectRatio: "16/9", background: "#000" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{ position: "absolute", inset: 0 }}
        >
          <video
            ref={videoRef}
            autoPlay={playing}
            muted
            loop
            playsInline
            poster={slides[current].poster}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          >
            <source src={slides[current].src} type="video/mp4" />
          </video>
          {/* Overlay with title */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(12,11,11,0.8) 0%, rgba(12,11,11,0.2) 40%, transparent 70%)",
            display: "flex", flexDirection: "column", justifyContent: "flex-end",
            padding: "2rem"
          }}>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.2rem, 3vw, 2rem)", color: "#fff", fontWeight: 300, marginBottom: "0.3rem" }}>
              {slides[current].title}
            </h3>
            {slides[current].subtitle && (
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>
                {slides[current].subtitle}
              </p>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div style={{ position: "absolute", bottom: "1.5rem", right: "1.5rem", display: "flex", gap: "0.5rem", zIndex: 5 }}>
        <button
          onClick={togglePlay}
          aria-label={playing ? "Пауза" : "Воспроизвести"}
          style={{
            background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.2)",
            color: "#fff", width: 36, height: 36, borderRadius: "50%", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem",
            transition: "background 0.3s",
          }}
        >
          {playing ? "❚❚" : "▶"}
        </button>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        aria-label="Предыдущее видео"
        style={{
          position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.15)",
          color: "#fff", width: 44, height: 44, borderRadius: "50%", cursor: "pointer",
          fontSize: "1.2rem", zIndex: 5, transition: "background 0.3s",
        }}
      >
        ‹
      </button>
      <button
        onClick={next}
        aria-label="Следующее видео"
        style={{
          position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.15)",
          color: "#fff", width: 44, height: 44, borderRadius: "50%", cursor: "pointer",
          fontSize: "1.2rem", zIndex: 5, transition: "background 0.3s",
        }}
      >
        ›
      </button>

      {/* Dots */}
      <div style={{
        position: "absolute", bottom: "1.5rem", left: "50%", transform: "translateX(-50%)",
        display: "flex", gap: "0.5rem", zIndex: 5,
      }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Видео ${i + 1}`}
            style={{
              width: i === current ? 24 : 8, height: 8,
              borderRadius: 4,
              background: i === current ? "var(--color-brand)" : "rgba(255,255,255,0.3)",
              border: "none", cursor: "pointer",
              transition: "all 0.3s",
            }}
          />
        ))}
      </div>
    </div>
  );
}
