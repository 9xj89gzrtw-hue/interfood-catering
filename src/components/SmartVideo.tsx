"use client";

import { useRef, useEffect, useState, useCallback } from "react";

interface VideoSource {
  src: string;
  type?: string;
  media?: string;
}

interface SmartVideoProps {
  src: string;
  srcMobile?: string;
  srcWebm?: string;
  srcAv1?: string;
  sources?: VideoSource[];
  poster?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  preload?: "none" | "metadata" | "auto";
  className?: string;
  style?: React.CSSProperties;
  showPlayButton?: boolean;
  onPlay?: () => void;
  onError?: (err: Event) => void;
  aspectRatio?: string;
  objectFit?: React.CSSProperties["objectFit"];
}

export default function SmartVideo({
  src,
  srcMobile,
  srcWebm,
  srcAv1,
  sources,
  poster,
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  preload = "metadata",
  className = "",
  style,
  showPlayButton = false,
  onPlay,
  onError,
  aspectRatio = "16/9",
  objectFit = "cover",
}: SmartVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mountedRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    mountedRef.current = true;

    // prefers-reduced-motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mountedRef.current) setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => {
      if (mountedRef.current) setReducedMotion(e.matches);
    };
    mq.addEventListener("change", handler);

    // IntersectionObserver for lazy loading
    const container = containerRef.current;
    if (container) {
      const observer = new IntersectionObserver(
        ([entry]) => { if (mountedRef.current) setIsVisible(entry.isIntersecting); },
        { rootMargin: "200px 0px", threshold: 0.01 }
      );
      observer.observe(container);
      return () => {
        mountedRef.current = false;
        mq.removeEventListener("change", handler);
        observer.disconnect();
      };
    }

    return () => {
      mountedRef.current = false;
      mq.removeEventListener("change", handler);
    };
  }, []);

  // Play/pause based on visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isLoaded || hasError || reducedMotion) return;

    if (isVisible && autoPlay) {
      const playPromise = video.play();
      if (playPromise) {
        playPromise
          .then(() => { if (mountedRef.current) { setIsPlaying(true); onPlay?.(); } })
          .catch(() => { if (mountedRef.current) setIsPlaying(false); });
      }
    } else if (!isVisible) {
      video.pause();
      if (mountedRef.current) setIsPlaying(false);
    }
  }, [isVisible, isLoaded, hasError, autoPlay, reducedMotion, onPlay]);

  const handleError = useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement>) => {
      if (mountedRef.current) {
        setHasError(true);
        setIsPlaying(false);
      }
      onError?.(e.nativeEvent);
    },
    [onError]
  );

  const handleLoadedData = useCallback(() => {
    if (mountedRef.current) setIsLoaded(true);
  }, []);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      if (mountedRef.current) setIsPlaying(false);
    } else {
      video.play()
        .then(() => { if (mountedRef.current) setIsPlaying(true); })
        .catch(() => {});
    }
  }, [isPlaying]);

  // Reduced motion — show poster
  if (reducedMotion && poster) {
    return (
      <div ref={containerRef} className={className} style={{ position: "relative", overflow: "hidden", aspectRatio, borderRadius: 20, ...style }}>
        <img src={poster} alt="" style={{ width: "100%", height: "100%", objectFit }} loading="lazy" />
      </div>
    );
  }

  // Error fallback — show poster
  if (hasError) {
    return (
      <div ref={containerRef} className={className} style={{ position: "relative", overflow: "hidden", aspectRatio, borderRadius: 20, background: "#1A1A1A", ...style }}>
        {poster && <img src={poster} alt="" style={{ width: "100%", height: "100%", objectFit, opacity: 0.85 }} loading="lazy" />}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.6)", fontSize: "0.8rem" }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none" /></svg>
        </div>
      </div>
    );
  }

  // Try to auto-generate WebM from mp4 URL
  const autoWebm = srcWebm || src.replace(/\.mp4$/, ".webm");
  const autoAv1 = srcAv1 || src.replace(/\.mp4$/, "-av1.mp4");

  return (
    <div ref={containerRef} className={className} style={{ position: "relative", overflow: "hidden", aspectRatio, borderRadius: 20, background: "#000", ...style }}>
      {!isLoaded && (
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(110deg, #1A1A1A 30%, #2D2D2D 50%, #1A1A1A 70%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite", zIndex: 1 }} />
      )}
      <video
        ref={videoRef}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        preload={isVisible ? preload : "none"}
        poster={poster}
        onLoadedData={handleLoadedData}
        onError={handleError}
        style={{ width: "100%", height: "100%", objectFit, opacity: isLoaded ? 1 : 0, transition: "opacity 0.5s ease" }}
      >
        {/* Mobile source (smaller) */}
        {srcMobile && <source src={srcMobile} type="video/mp4" media="(max-width: 768px)" />}
        {/* AV1 — best compression, Chrome/Firefox */}
        <source src={autoAv1} type="video/mp4; codecs=av01.0.05M.08" />
        {/* WebM — good compression, Chrome/Firefox/Edge */}
        <source src={autoWebm} type="video/webm" />
        {/* Additional sources */}
        {sources?.map((s, i) => <source key={i} src={s.src} type={s.type || "video/mp4"} media={s.media} />)}
        {/* Default MP4 fallback */}
        <source src={src} type="video/mp4" />
      </video>

      {showPlayButton && !isPlaying && isLoaded && (
        <button onClick={togglePlay} aria-label="Воспроизвести видео" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.3)", border: "none", cursor: "pointer", zIndex: 2 }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(255,255,255,0.95)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--color-brand)"><polygon points="8,5 19,12 8,19" /></svg>
          </div>
        </button>
      )}
      <style>{`@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`}</style>
    </div>
  );
}