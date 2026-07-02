"use client";
import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

interface BentoItem {
  title: string; price: string; img: string; href: string; desc: string;
  span?: string; accent?: string; stat?: string; statLabel?: string; video?: string;
}
interface BentoGridProps { items: BentoItem[]; }

function BentoTile({ item, index }: { item: BentoItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [videoLoaded, setVideoLoaded] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePos({ x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height });
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.25, 1, 0.5, 1] as const }}
      className={`bento-tile ${item.span || ""}`}
      data-cursor-hover
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setVideoLoaded(false); }}
      onMouseMove={handleMouseMove}
    >
      <Link href={item.href} style={{ textDecoration: "none", color: "inherit", display: "block", height: "100%" }}>
        <div className="bento-tile-img">
          <Image src={item.img} alt={item.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="bento-tile-img-inner" />
        </div>
        {item.video && isHovered && (
          <div className="bento-tile-video-layer">
            <video autoPlay muted loop playsInline preload="none" onCanPlay={() => setVideoLoaded(true)}
              style={{ width: "100%", height: "100%", objectFit: "cover", opacity: videoLoaded ? 1 : 0, transition: "opacity 0.6s ease" }}>
              <source src={item.video} type="video/mp4" />
            </video>
          </div>
        )}
        <div className="bento-tile-glow" style={{ opacity: isHovered ? 0.6 : 0, background: `radial-gradient(600px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(184,149,90,0.12), transparent 40%)` }} />
        <div className="bento-tile-overlay" />
        <div className="bento-tile-content">
          {item.stat && (
            <motion.div className="bento-tile-stat" initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.08 + 0.3, duration: 0.5 }}>
              <span className="bento-tile-stat-value">{item.stat}</span>
              <span className="bento-tile-stat-label">{item.statLabel}</span>
            </motion.div>
          )}
          <div className="bento-tile-badge">{item.price}</div>
          <h3 className="bento-tile-title">{item.title}</h3>
          <p className="bento-tile-desc">{item.desc}</p>
          <div className="bento-tile-arrow">
            <motion.svg width="20" height="20" viewBox="0 0 20 20" fill="none" animate={isHovered ? { x: [0, 4, 0] } : {}}
              transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 0.5 }}>
              <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </div>
        </div>
        {item.accent && <div className="bento-tile-accent" style={{ background: item.accent }}><div className="bento-tile-accent-glow" style={{ background: item.accent }} /></div>}
        {isHovered && <div className="bento-tile-shimmer" />}
      </Link>
    </motion.div>
  );
}

export default function BentoGrid({ items }: BentoGridProps) {
  return <div className="bento-grid">{items.map((item, i) => <BentoTile key={item.title} item={item} index={i} />)}</div>;
}
