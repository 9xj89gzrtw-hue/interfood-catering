"use client";

import { useRef, useEffect, useState } from "react";

/* ═══════════════════════════════════════════════════════════════
   ConfettiButton — кнопка с конфетти при клике
   Тренд 2026: micro-interactions, delight moments
   ═══════════════════════════════════════════════════════════════ */

interface ConfettiButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  rotation: number;
  rotationSpeed: number;
}

export default function ConfettiButton({
  children,
  onClick,
  className = "",
  style,
}: ConfettiButtonProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const btnRef = useRef<HTMLButtonElement>(null);

  const colors = ["#B8955A", "#9EB68F", "#E8C4B8", "#D4AF37", "#F5DEB3"];

  const handleClick = (e: React.MouseEvent) => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      x,
      y,
      vx: (Math.random() - 0.5) * 12,
      vy: -Math.random() * 10 - 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 6 + 3,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 15,
    }));

    setParticles((prev) => [...prev, ...newParticles]);

    // Clean up after animation
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.includes(p)));
    }, 1000);

    onClick?.();
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        ref={btnRef}
        onClick={handleClick}
        className={className}
        style={{ position: "relative", zIndex: 1, ...style }}
      >
        {children}
      </button>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            background: p.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            pointerEvents: "none",
            zIndex: 2,
            animation: `confetti-fly 0.8s ease-out forwards`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        />
      ))}
      <style>{`
        @keyframes confetti-fly {
          0% { opacity: 1; transform: translate(0, 0) rotate(0deg) scale(1); }
          100% { opacity: 0; transform: translate(var(--vx), var(--vy)) rotate(720deg) scale(0); }
        }
      `}</style>
    </div>
  );
}
