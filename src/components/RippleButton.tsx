"use client";

import { useRef, useState, useCallback, useEffect } from "react";
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
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  // Clean up all timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t));
    };
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { x, y, id }]);

    // Clean up ripple after animation
    const timeout = setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
      timeoutsRef.current = timeoutsRef.current.filter((t) => t !== timeout);
    }, 800);
    timeoutsRef.current.push(timeout);

    onClick?.();
  }, [onClick]);

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
        {ripples.map((ripple) => (
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
              background: "rgba(255,255,255,0.3)",
              transformOrigin: "center",
            }}
          />
        ))}
      </div>
    </div>
  );
}
