"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   ScrollRevealGallery — Masonry-style image gallery with
   scroll-triggered stagger reveal and lightbox on click
   Respects prefers-reduced-motion
   Lazy loads images via IntersectionObserver
   ═══════════════════════════════════════════════════════════════ */

interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface ScrollRevealGalleryProps {
  images: GalleryImage[];
  columns?: number;
  gap?: number;
  className?: string;
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

/* ─── Simple masonry layout calculation ─── */
function computeMasonry(
  images: GalleryImage[],
  columnCount: number,
  containerWidth: number,
  gap: number
): { src: string; alt: string; top: number; left: number; width: number; height: number }[] {
  if (containerWidth <= 0) return [];

  const colWidth = (containerWidth - (columnCount - 1) * gap) / columnCount;
  const colHeights = new Array(columnCount).fill(0);

  return images.map((img) => {
    const shortest = colHeights.indexOf(Math.min(...colHeights));
    const aspectRatio = img.height / img.width;
    const renderHeight = colWidth * aspectRatio;

    const position = {
      src: img.src,
      alt: img.alt,
      top: colHeights[shortest],
      left: shortest * (colWidth + gap),
      width: colWidth,
      height: renderHeight,
    };

    colHeights[shortest] += renderHeight + gap;
    return position;
  });
}

export default function ScrollRevealGallery({
  images,
  columns = 3,
  gap = 16,
  className = "",
}: ScrollRevealGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-60px" });
  const prefersReduced = usePrefersReducedMotion();

  /* Responsive columns */
  const [effectiveCols, setEffectiveCols] = useState(columns);
  const [containerWidth, setContainerWidth] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const w = el.offsetWidth;
      setContainerWidth(w);
      if (w < 640) setEffectiveCols(1);
      else if (w < 1024) setEffectiveCols(2);
      else setEffectiveCols(columns);
    };

    const observer = new ResizeObserver(update);
    observer.observe(el);
    update();
    return () => observer.disconnect();
  }, [columns]);

  /* Masonry layout */
  const layout = computeMasonry(images, effectiveCols, containerWidth, gap);
  const totalHeight =
    layout.length > 0
      ? Math.max(...layout.map((item) => item.top + item.height))
      : 0;

  /* Lightbox navigation */
  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }, []);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % images.length : null
    );
  }, [images.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : null
    );
  }, [images.length]);

  /* Keyboard navigation for lightbox */
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  /* Touch support for lightbox swiping */
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const handleLightboxTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleLightboxTouchEnd = (e: React.TouchEvent) => {
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;
    // Only horizontal swipes (more X than Y movement)
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 60) {
      if (diffX > 0) goNext();
      else goPrev();
    }
  };

  if (images.length === 0) {
    return (
      <div
        className={className}
        style={{
          padding: "3rem 1.5rem",
          textAlign: "center",
          fontFamily: "var(--font-sans)",
          color: "var(--color-brand-dark)",
          background: "var(--color-cream)",
          borderRadius: 20,
        }}
      >
        No images to display
      </div>
    );
  }

  /* ─── Reduced motion: static grid with lightbox ─── */
  if (prefersReduced) {
    return (
      <div ref={containerRef} className={className}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${effectiveCols}, 1fr)`,
            gap,
          }}
        >
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => openLightbox(i)}
              style={{
                border: "none",
                padding: 0,
                cursor: "pointer",
                borderRadius: 12,
                overflow: "hidden",
                background: "var(--color-cream)",
              }}
            >
              <LazyGalleryImage
                src={img.src}
                alt={img.alt}
                aspectRatio={img.height / img.width}
              />
            </button>
          ))}
        </div>

        {/* Lightbox */}
        <LightboxOverlay
          images={images}
          lightboxIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
          onTouchStart={handleLightboxTouchStart}
          onTouchEnd={handleLightboxTouchEnd}
        />
      </div>
    );
  }

  /* ─── Animated masonry gallery ─── */
  return (
    <div ref={containerRef} className={className}>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: totalHeight || "auto",
        }}
      >
        {layout.map((item, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={
              isInView
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 30, scale: 0.92 }
            }
            transition={{
              duration: 0.5,
              delay: i * 0.06,
              ease: [0.25, 1, 0.5, 1] as [number, number, number, number],
            }}
            whileHover={{
              scale: 1.03,
              zIndex: 2,
              boxShadow: "0 16px 48px rgba(184,149,90,0.18)",
            }}
            onClick={() => openLightbox(i)}
            style={{
              position: "absolute",
              top: item.top,
              left: item.left,
              width: item.width,
              height: item.height,
              border: "none",
              padding: 0,
              cursor: "pointer",
              borderRadius: 12,
              overflow: "hidden",
              background: "var(--color-cream)",
              willChange: "transform, opacity",
            }}
          >
            <LazyGalleryImage
              src={item.src}
              alt={item.alt}
              aspectRatio={item.height / item.width}
            />
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <LightboxOverlay
        images={images}
        lightboxIndex={lightboxIndex}
        onClose={closeLightbox}
        onPrev={goPrev}
        onNext={goNext}
        onTouchStart={handleLightboxTouchStart}
        onTouchEnd={handleLightboxTouchEnd}
      />
    </div>
  );
}

/* ─── Lazy-loaded gallery image ─── */
function LazyGalleryImage({
  src,
  alt,
  aspectRatio,
}: {
  src: string;
  alt: string;
  aspectRatio: number;
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        paddingTop: `${aspectRatio * 100}%`,
        position: "relative",
        background: "var(--color-cream)",
        overflow: "hidden",
      }}
    >
      {error ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--color-cream)",
            color: "var(--color-brand-dark)",
            fontFamily: "var(--font-sans)",
            fontSize: "0.8rem",
          }}
        >
          Image unavailable
        </div>
      ) : inView ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        />
      ) : (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(110deg, var(--color-cream) 8%, var(--color-cream-dark) 18%, var(--color-cream) 33%)",
            backgroundSize: "200% 100%",
            animation: "galleryShimmer 1.5s linear infinite",
          }}
        />
      )}

      <style>{`
        @keyframes galleryShimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}

/* ─── Lightbox overlay ─── */
function LightboxOverlay({
  images,
  lightboxIndex,
  onClose,
  onPrev,
  onNext,
  onTouchStart,
  onTouchEnd,
}: {
  images: GalleryImage[];
  lightboxIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
}) {
  return (
    <AnimatePresence>
      {lightboxIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(26,26,26,0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          {/* Close button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close lightbox"
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              background: "rgba(254,253,251,0.15)",
              border: "1px solid rgba(254,253,251,0.2)",
              color: "var(--color-warm-white)",
              width: 44,
              height: 44,
              borderRadius: "50%",
              fontSize: "1.4rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
              transition: "background 0.2s",
            }}
          >
            ✕
          </button>

          {/* Previous button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Previous image"
            style={{
              position: "absolute",
              left: 16,
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(254,253,251,0.15)",
              border: "1px solid rgba(254,253,251,0.2)",
              color: "var(--color-warm-white)",
              width: 44,
              height: 44,
              borderRadius: "50%",
              fontSize: "1.4rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
              transition: "background 0.2s",
            }}
          >
            ‹
          </button>

          {/* Image */}
          <motion.img
            key={lightboxIndex}
            src={images[lightboxIndex].src}
            alt={images[lightboxIndex].alt}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "90vw",
              maxHeight: "85vh",
              objectFit: "contain",
              borderRadius: 8,
              userSelect: "none",
            }}
          />

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Next image"
            style={{
              position: "absolute",
              right: 16,
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(254,253,251,0.15)",
              border: "1px solid rgba(254,253,251,0.2)",
              color: "var(--color-warm-white)",
              width: 44,
              height: 44,
              borderRadius: "50%",
              fontSize: "1.4rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
              transition: "background 0.2s",
            }}
          >
            ›
          </button>

          {/* Caption */}
          <div
            style={{
              position: "absolute",
              bottom: 20,
              left: "50%",
              transform: "translateX(-50%)",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1rem",
                color: "rgba(254,253,251,0.85)",
                marginBottom: 4,
              }}
            >
              {images[lightboxIndex].alt}
            </p>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.75rem",
                color: "rgba(254,253,251,0.5)",
              }}
            >
              {lightboxIndex + 1} / {images.length}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
