"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   ImageGallery3D — 3D rotating image gallery carousel
   2026 trend: 3D carousels, spatial interfaces
   ═══════════════════════════════════════════════════════════════ */

interface ImageGallery3DProps {
  images: { src: string; alt: string }[];
  autoRotate?: boolean;
  rotateSpeed?: number;
}

export default function ImageGallery3D({
  images,
  autoRotate = true,
  rotateSpeed = 5000,
}: ImageGallery3DProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoRotate = useCallback(() => {
    if (!autoRotate) return;
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, rotateSpeed);
  }, [autoRotate, rotateSpeed, images.length]);

  const stopAutoRotate = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const handlePrev = () => {
    stopAutoRotate();
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
    if (!isPaused) startAutoRotate();
  };

  const handleNext = () => {
    stopAutoRotate();
    setActiveIndex((prev) => (prev + 1) % images.length);
    if (!isPaused) startAutoRotate();
  };

  // Auto-rotate
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  // Using a separate effect pattern to avoid hooks issues
  if (autoRotate && !intervalRef.current && !isPaused) {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, rotateSpeed);
  }

  const getCardStyle = (index: number): React.CSSProperties => {
    const diff = index - activeIndex;
    const absDiff = Math.abs(diff);
    const adjustedDiff =
      diff > images.length / 2
        ? diff - images.length
        : diff < -images.length / 2
        ? diff + images.length
        : diff;

    const isCenter = adjustedDiff === 0;
    const scale = isCenter ? 1 : 0.75;
    const translateX = adjustedDiff * 120;
    const translateZ = isCenter ? 50 : -50;
    const rotateY = -adjustedDiff * 15;
    const opacity = absDiff <= 2 ? 1 : 0.3;
    const zIndex = images.length - Math.abs(adjustedDiff);

    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      zIndex,
      position: "absolute" as const,
      left: "50%",
      top: "50%",
      marginLeft: -160,
      marginTop: -120,
      transition: "all 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
    };
  };

  return (
    <div
      style={{
        position: "relative",
        height: 320,
        perspective: 1000,
        overflow: "visible",
      }}
      onMouseEnter={() => {
        setIsPaused(true);
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
      }}
      onMouseLeave={() => {
        setIsPaused(false);
      }}
    >
      {images.map((img, i) => (
        <div key={i} style={getCardStyle(i)}>
          <div
            style={{
              width: 320,
              height: 220,
              borderRadius: 16,
              overflow: "hidden",
              boxShadow:
                i === activeIndex
                  ? "0 20px 60px rgba(0,0,0,0.2)"
                  : "0 8px 24px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={img.src}
              alt={img.alt}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              loading="lazy"
            />
          </div>
          {i === activeIndex && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                textAlign: "center",
                marginTop: 12,
                fontFamily: "var(--font-serif)",
                fontSize: "1rem",
                color: "var(--color-dark)",
              }}
            >
              {img.alt}
            </motion.p>
          )}
        </div>
      ))}

      {/* Navigation dots */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 8,
          zIndex: 100,
        }}
      >
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              stopAutoRotate();
              setActiveIndex(i);
            }}
            style={{
              width: i === activeIndex ? 24 : 8,
              height: 8,
              borderRadius: 4,
              background:
                i === activeIndex
                  ? "var(--color-brand)"
                  : "rgba(184,149,90,0.3)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
            aria-label={`Слайд ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
