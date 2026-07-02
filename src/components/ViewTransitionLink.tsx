"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, ReactNode } from "react";

/**
 * View Transitions API Link Component (2026)
 * Uses native browser View Transitions for smooth page transitions
 * Falls back to regular navigation on unsupported browsers
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
  const router = useRouter();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      onClick?.();

      // Check if View Transitions API is supported
      const documentWithTransition = document as Document & {
        startViewTransition?: (callback: () => void) => {
          finished: Promise<void>;
          ready: Promise<void>;
        };
      };

      if (documentWithTransition.startViewTransition) {
        // Use native View Transitions API
        const transition = documentWithTransition.startViewTransition(() => {
          router.push(href);
        });

        // Animate the transition with custom keyframes
        transition.ready.then(() => {
          // Custom animation via Web Animations API
          document.documentElement.animate(
            {
              clipPath: [
                "circle(0% at var(--vt-x, 50%) var(--vt-y, 50%))",
                "circle(150% at var(--vt-x, 50%) var(--vt-y, 50%))",
              ],
              opacity: [0.8, 1],
            },
            {
              duration: 500,
              easing: "cubic-bezier(0.25, 1, 0.5, 1)",
              pseudoElement: "::view-transition-new(root)",
            }
          );
        });
      } else {
        // Fallback: smooth opacity transition
        document.body.style.opacity = "0.7";
        document.body.style.transition = "opacity 0.2s ease";
        setTimeout(() => {
          router.push(href);
          setTimeout(() => {
            document.body.style.opacity = "1";
          }, 50);
        }, 200);
      }
    },
    [href, router, onClick]
  );

  // Track mouse position for origin-based transitions
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    document.documentElement.style.setProperty(
      "--vt-x",
      `${e.clientX}px`
    );
    document.documentElement.style.setProperty(
      "--vt-y",
      `${e.clientY}px`
    );
  }, []);

  return (
    <Link
      href={href}
      className={className}
      style={style}
      aria-label={ariaLabel}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
    >
      {children}
    </Link>
  );
}
