"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   HorizontalScrollGallery — horizontal image gallery driven by 
   vertical scroll, Apple-style. Pin section, scroll horizontally.
   ═══════════════════════════════════════════════════════════════ */

interface ImageItem {
  src: string;
  alt: string;
}

interface HorizontalScrollGalleryProps {
  images: ImageItem[];
  style?: React.CSSProperties;
  className?: string;
}

export default function HorizontalScrollGallery({
  images,
  style,
  className,
}: HorizontalScrollGalleryProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => setViewportWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const cardWidth = 380;
  const gap = 24;
  const totalScrollWidth = images.length * (cardWidth + gap);
  const travelDistance = Math.max(0, totalScrollWidth - viewportWidth);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0px", `-${travelDistance}px`]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        overflow: "hidden",
        position: "relative",
        ...style,
      }}
    >
      <motion.div
        style={{
          x,
          display: "flex",
          gap: `${gap}px`,
          paddingLeft: "max(2rem, calc((100vw - 1200px) / 2 + 2rem))",
          paddingRight: "4rem",
        }}
      >
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              minWidth: cardWidth,
              height: 320,
              borderRadius: 16,
              overflow: "hidden",
              position: "relative",
              flexShrink: 0,
              cursor: "pointer",
            }}
            whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="eager"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
              }}
            />
            {/* Bottom gradient */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 80,
                background: "linear-gradient(to top, rgba(30,27,22,0.5), transparent)",
                pointerEvents: "none",
              }}
            />
            {/* Label */}
            <div
              style={{
                position: "absolute",
                bottom: 16,
                left: 20,
                fontSize: "0.85rem",
                fontFamily: "var(--font-serif)",
                color: "#F0EBE1",
                fontWeight: 400,
                letterSpacing: "0.02em",
              }}
            >
              {img.alt}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
