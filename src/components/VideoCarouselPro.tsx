"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface VideoSlide {
  src: string;
  srcMobile?: string;
  poster?: string;
  title: string;
  subtitle?: string;
}

interface VideoCarouselProProps {
  slides: VideoSlide[];
  autoplay?: boolean;
  interval?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function VideoCarouselPro({ slides, autoplay = true, interval = 8000, className = "", style }: VideoCarouselProProps) {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const mountedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    mountedRef.current = true;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mountedRef.current) setReducedMotion(mq.matches);
    const h = (e: MediaQueryListEvent) => { if (mountedRef.current) setReducedMotion(e.matches); };
    mq.addEventListener("change", h);

    const el = containerRef.current;
    if (el) {
      const obs = new IntersectionObserver(([entry]) => { if (mountedRef.current) setIsVisible(entry.isIntersecting); }, { rootMargin: "100px", threshold: 0.01 });
      obs.observe(el);
      return () => {
        mountedRef.current = false;
        mq.removeEventListener("change", h);
        obs.disconnect();
      };
    }
    return () => { mountedRef.current = false; mq.removeEventListener("change", h); };
  }, []);

  useEffect(() => {
    if (!autoplay || !playing || !isVisible) return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => { if (mountedRef.current) setCurrent((prev) => (prev + 1) % slides.length); }, interval);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [autoplay, playing, isVisible, interval, slides.length]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isLoaded || hasError || reducedMotion) return;
    if (isVisible && playing) {
      video.play().catch(() => { if (mountedRef.current) setPlaying(false); });
    } else {
      video.pause();
    }
  }, [isVisible, isLoaded, hasError, playing, reducedMotion]);

  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [current]);

  const goTo = (index: number) => { setCurrent(index); if (timerRef.current) clearInterval(timerRef.current); };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) { video.pause(); setPlaying(false); if (timerRef.current) clearInterval(timerRef.current); }
    else { video.play().catch(() => {}); setPlaying(true); }
  };

  const slide = slides[current];

  return (
    <div ref={containerRef} className={className} style={{ position: "relative", borderRadius: 24, overflow: "hidden", aspectRatio: "16/9", background: "#000", ...style }}>
      {!isLoaded && !hasError && <div style={{ position: "absolute", inset: 0, background: "linear-gradient(110deg, #1A1A1A 30%, #2D2D2D 50%, #1A1A1A 70%)", backgroundSize: "200% 100%", animation: "vcp-shimmer 1.5s infinite", zIndex: 2 }} />}
      {hasError && slide.poster && <img src={slide.poster} alt={slide.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.7 }} />}
      {!reducedMotion && (
        <video key={current} ref={videoRef} autoPlay={playing && isVisible} muted loop playsInline preload={isVisible ? "metadata" : "none"} poster={slide.poster} onLoadedData={() => setIsLoaded(true)} onError={() => setHasError(true)} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: isLoaded ? 1 : 0, transition: "opacity 0.5s ease" }}>
          {slide.srcMobile && <source src={slide.srcMobile} type="video/mp4" media="(max-width: 768px)" />}
          <source src={slide.src.replace(/\.mp4$/, ".webm")} type="video/webm" />
          <source src={slide.src} type="video/mp4" />
        </video>
      )}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(12,11,11,0.8) 0%, rgba(12,11,11,0.2) 40%, transparent 70%)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "2rem", zIndex: 3 }}>
        <motion.h3 key={`title-${current}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.2rem, 3vw, 2rem)", color: "#fff", fontWeight: 300, marginBottom: "0.3rem" }}>{slide.title}</motion.h3>
        {slide.subtitle && <motion.p key={`sub-${current}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }} style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>{slide.subtitle}</motion.p>}
      </div>
      <button onClick={togglePlay} aria-label={playing ? "Пауза" : "Воспроизвести"} style={{ position: "absolute", bottom: "1.5rem", right: "1.5rem", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", width: 36, height: 36, borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", zIndex: 5, transition: "background 0.3s" }}>{playing ? "❚❚" : "▶"}</button>
      <button onClick={() => goTo((current - 1 + slides.length) % slides.length)} aria-label="Предыдущее видео" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", width: 44, height: 44, borderRadius: "50%", cursor: "pointer", fontSize: "1.2rem", zIndex: 5 }}>‹</button>
      <button onClick={() => goTo((current + 1) % slides.length)} aria-label="Следующее видео" style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", width: 44, height: 44, borderRadius: "50%", cursor: "pointer", fontSize: "1.2rem", zIndex: 5 }}>›</button>
      <div style={{ position: "absolute", bottom: "1.5rem", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "0.5rem", zIndex: 5 }}>
        {slides.map((_, i) => (<button key={i} onClick={() => goTo(i)} aria-label={`Видео ${i + 1}`} style={{ width: i === current ? 24 : 8, height: 8, borderRadius: 4, background: i === current ? "var(--color-brand)" : "rgba(255,255,255,0.3)", border: "none", cursor: "pointer", transition: "all 0.3s" }} />))}
      </div>
      <style>{`@keyframes vcp-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`}</style>
    </div>
  );
}