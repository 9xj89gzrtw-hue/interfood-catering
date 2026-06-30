"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   RippleButton — material design ripple effect on click
   Touch-friendly, perfect for mobile
   ═══════════════════════════════════════════════════════════════ */

interface RippleButtonProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  href?: string;
  as?: "button" | "a";
}

interface Ripple {
  x: number;
  y: number;
  id: number;
}

export default function RippleButton({
  children,
  className = "",
  style,
  onClick,
  href,
  as = "button",
}: RippleButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);

  const handleClick = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    ripplesRef.current = [...ripplesRef.current, { x, y, id }];
    // Clean up ripple after animation
    setTimeout(() => {
      ripplesRef.current = ripplesRef.current.filter((r) => r.id !== id);
    }, 800);
    onClick?.();
  };

  return (
    <div ref={ref} style={{ position: "relative", overflow: "hidden", display: "inline-block", borderRadius: "inherit" }}>
      {as === "a" ? (
        <a href={href} className={className} style={{ ...style, position: "relative", zIndex: 2 }} onClick={handleClick}>
          {children}
        </a>
      ) : (
        <button className={className} style={{ ...style, position: "relative", zIndex: 2 }} onClick={handleClick}>
          {children}
        </button>
      )}
      {/* Ripple effects rendered on top */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", borderRadius: "inherit" }}>
        {ripplesRef.current.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.4 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: ripple.x,
              top: ripple.y,
              width: 20,
              height: 20,
              marginLeft: -10,
              marginTop: -10,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.4)",
              transformOrigin: "center",
            }}
          />
        ))}
      </div>
    </div>
  );
}
