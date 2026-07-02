"use client";

import Link from "next/link";
import { useCallback, ReactNode } from "react";

/**
 * ViewTransitionLink v2 — CSS-only View Transitions (2026)
 *
 * Next.js 16 with experimental.viewTransition: true automatically
 * wraps all App Router navigations in document.startViewTransition().
 * 
 * This component NO LONGER manually calls startViewTransition()
 * to avoid the double-nested transition bug.
 *
 * Instead, it:
 * 1. Tracks mouse position for origin-based clip animations (CSS vars)
 * 2. Passes through as a regular <Link> — Next.js handles the transition
 * 3. All animation styling is done in globals.css via ::view-transition-* pseudo-elements
 */
interface ViewTransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  "aria-label"?: string;
  onClick?: () => void;
}

export default function ViewTransitionLink({
  href,
  children,
  className,
  style,
  "aria-label": ariaLabel,
  onClick,
}: ViewTransitionLinkProps) {
  // Track mouse position for origin-based circle-clip CSS transitions
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    document.documentElement.style.setProperty("--vt-x", `${e.clientX}px`);
    document.documentElement.style.setProperty("--vt-y", `${e.clientY}px`);
  }, []);

  return (
    <Link
      href={href}
      className={className}
      style={style}
      aria-label={ariaLabel}
      onClick={onClick}
      onMouseMove={handleMouseMove}
    >
      {children}
    </Link>
  );
}
