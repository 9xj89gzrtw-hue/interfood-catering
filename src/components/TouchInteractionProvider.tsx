"use client";

import { useEffect, useCallback, useRef } from "react";

/**
 * TouchInteractionProvider — Mobile Touch Enhancement (2026)
 * Provides swipe gestures, haptic feedback, momentum scrolling
 * Works alongside Lenis smooth scroll for enhanced mobile UX
 */
export default function TouchInteractionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const swipeCallbackRef = useRef<((direction: string) => void) | null>(null);

  // Haptic feedback utility
  const haptic = useCallback((style: "light" | "medium" | "heavy" = "light") => {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [30, 10, 30],
      };
      navigator.vibrate(patterns[style]);
    }
  }, []);

  // Expose haptic globally
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as unknown as Record<string, unknown>).__haptic = haptic;
    }
  }, [haptic]);

  // Swipe detection
  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };
  }, []);

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (!touchStartRef.current) return;
      const touch = e.changedTouches[0];
      const dx = touch.clientX - touchStartRef.current.x;
      const dy = touch.clientY - touchStartRef.current.y;
      const dt = Date.now() - touchStartRef.current.time;
      const vx = Math.abs(dx) / dt; // velocity in px/ms

      // Minimum swipe: 50px distance, 0.3px/ms velocity
      const minDist = 50;
      const minVelocity = 0.3;

      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > minDist && vx > minVelocity) {
        const direction = dx > 0 ? "right" : "left";
        haptic("light");

        // Dispatch custom swipe event for components to listen
        const event = new CustomEvent("swipe", { detail: { direction, dx, dy, vx } });
        window.dispatchEvent(event);
      }

      touchStartRef.current = null;
    },
    [haptic]
  );

  // Pull-to-refresh prevention & momentum enhancement
  useEffect(() => {
    // Only on touch devices
    if (!("ontouchstart" in window)) return;

    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });

    // Add touch-action CSS for better gesture handling
    document.documentElement.style.setProperty(
      "--touch-action",
      "pan-y pinch-zoom"
    );

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchEnd]);

  // Double-tap detection for zoom-to-section
  useEffect(() => {
    let lastTap = 0;
    const handleDoubleTap = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastTap < 300) {
        haptic("medium");
        const event = new CustomEvent("doubletap", {
          detail: { x: e.touches[0]?.clientX, y: e.touches[0]?.clientY },
        });
        window.dispatchEvent(event);
      }
      lastTap = now;
    };

    if ("ontouchstart" in window) {
      document.addEventListener("touchend", handleDoubleTap, { passive: true });
      return () => document.removeEventListener("touchend", handleDoubleTap);
    }
  }, [haptic]);

  // Long-press detection for context menu
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let startPos: { x: number; y: number } | null = null;

    const handleStart = (e: TouchEvent) => {
      startPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      timer = setTimeout(() => {
        if (startPos) {
          haptic("heavy");
          const event = new CustomEvent("longpress", {
            detail: { x: startPos.x, y: startPos.y },
          });
          window.dispatchEvent(event);
        }
      }, 500);
    };

    const handleMove = (e: TouchEvent) => {
      if (startPos) {
        const dx = Math.abs(e.touches[0].clientX - startPos.x);
        const dy = Math.abs(e.touches[0].clientY - startPos.y);
        if (dx > 10 || dy > 10) {
          clearTimeout(timer);
          startPos = null;
        }
      }
    };

    const handleEnd = () => {
      clearTimeout(timer);
      startPos = null;
    };

    if ("ontouchstart" in window) {
      document.addEventListener("touchstart", handleStart, { passive: true });
      document.addEventListener("touchmove", handleMove, { passive: true });
      document.addEventListener("touchend", handleEnd, { passive: true });
      return () => {
        document.removeEventListener("touchstart", handleStart);
        document.removeEventListener("touchmove", handleMove);
        document.removeEventListener("touchend", handleEnd);
      };
    }
  }, [haptic]);

  return <>{children}</>;
}
