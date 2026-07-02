"use client";

import { useRef, useState, useCallback } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";

const EASE = [0.16, 1, 0.3, 1] as const;

const CONTACTS = [
  {
    icon: "phone",
    label: "Телефон",
    value: "+7 (812) 919-59-11",
    href: "tel:+78129195911",
  },
  {
    icon: "whatsapp",
    label: "WhatsApp",
    value: "Написать в WhatsApp",
    href: "https://wa.me/79119417205",
  },
  {
    icon: "telegram",
    label: "Telegram",
    value: "@nilov_catering",
    href: "https://t.me/nilov_catering",
  },
  {
    icon: "email",
    label: "Email",
    value: "info@interfood-catering.ru",
    href: "mailto:info@interfood-catering.ru",
  },
  {
    icon: "location",
    label: "Адрес",
    value: "Санкт-Петербург, Новолитовская ул., д. 15",
    href: "#",
  },
];

function ContactIcon({ name }: { name: string }) {
  const p = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "phone": return <svg {...p}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.11 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>;
    case "whatsapp": return <svg {...p}><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>;
    case "telegram": return <svg {...p}><path d="M21.198 2.433a2.242 2.242 0 00-1.022.215l-8.609 3.33c-2.068.8-4.133 1.598-5.724 2.21a382.1 382.1 0 01-2.748 1.06c-.437.164-.836.316-1.167.46-.165.073-.314.14-.444.21-.13.07-.26.13-.41.24-.075.055-.24.18-.3.39-.06.21.02.41.08.52.1.18.22.26.32.32.2.12.38.17.56.22.56.15 1.27.3 1.84.44l4.32 1.16c.18.57.69 2.16.83 2.62.09.28.17.48.28.65.05.09.12.17.2.23.04.03.08.06.13.08l.04.02c.14.06.3.08.42.06.2-.02.36-.1.48-.18.24-.17.42-.38.6-.58l1.48-1.62 4.34 3.2c.08.06.26.2.5.24.12.02.26.02.4-.03.12-.05.22-.12.3-.2.1-.1.16-.22.2-.33.08-.22.12-.46.16-.72l2.28-13.46c.04-.24.08-.48.06-.72a1.1 1.1 0 00-.24-.62.96.96 0 00-.46-.3z"/></svg>;
    case "email": return <svg {...p}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
    case "location": return <svg {...p}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>;
    default: return null;
  }
}

/* ─── Animated contact item ─── */
function ContactItem({ item, index }: { item: typeof CONTACTS[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      ref={ref}
      href={item.href}
      target={item.href.startsWith("http") ? "_blank" : undefined}
      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        padding: "1rem 0",
        textDecoration: "none",
        position: "relative",
        borderBottom: "1px solid rgba(184,134,11,0.08)",
        cursor: "pointer",
        minHeight: 44,
      }}
    >
      {/* Pulsing icon container */}
      <div style={{
        width: 44, height: 44, borderRadius: "50%",
        border: "1.5px solid rgba(184,134,11,0.15)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#B8860B",
        flexShrink: 0,
        position: "relative",
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
        background: hovered ? "rgba(184,134,11,0.06)" : "transparent",
        borderColor: hovered ? "rgba(184,134,11,0.4)" : "rgba(184,134,11,0.15)",
        boxShadow: hovered ? "0 0 16px rgba(184,134,11,0.1)" : "none",
      }}>
        <motion.div
          animate={hovered ? { scale: [1, 1.15, 1] } : {}}
          transition={{ duration: 0.4 }}
        >
          <ContactIcon name={item.icon} />
        </motion.div>
        {/* Pulse ring */}
        {isInView && (
          <motion.div
            style={{ position: "absolute", inset: -4, borderRadius: "50%", border: "1px solid rgba(184,134,11,0.2)", pointerEvents: "none" }}
            animate={{ scale: [1, 1.2], opacity: [0.4, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.3, ease: "easeOut" }}
          />
        )}
      </div>
      <div style={{ flex: 1 }}>
        <span style={{ display: "block", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#5C564D", marginBottom: "0.2rem" }}>
          {item.label}
        </span>
        <span style={{ display: "inline", fontSize: "clamp(0.9rem, 2vw, 1rem)", color: "#1A1714", fontWeight: 400, position: "relative" }}>
          {item.value}
          {/* Gold underline animation */}
          <motion.span
            style={{
              position: "absolute", bottom: -2, left: 0, height: 1.5,
              background: "linear-gradient(90deg, #B8860B, #D4A63E)",
              borderRadius: 1,
            }}
            animate={{ width: hovered ? "100%" : "0%" }}
            transition={{ duration: 0.4, ease: EASE }}
          />
        </span>
      </div>
    </motion.a>
  );
}

/* ─── Magnetic CTA ─── */
function MagneticCTA({ isMobile }: { isMobile: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current || isMobile) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) * 0.12;
    const dy = (e.clientY - rect.top - rect.height / 2) * 0.12;
    x.set(Math.max(-6, Math.min(6, dx)));
    y.set(Math.max(-6, Math.min(6, dy)));
  }, [x, y, isMobile]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ x: springX, y: springY, display: "inline-block" }}>
      <Link
        href="/contacts"
        style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
          padding: "1rem 2.5rem", borderRadius: 14,
          background: "linear-gradient(135deg, #B8860B, #D4A63E)",
          color: "#1A1714", fontWeight: 500, fontSize: "0.85rem",
          letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none",
          minHeight: 48, transition: "box-shadow 0.4s",
          boxShadow: "0 4px 20px rgba(184,134,11,0.15)",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 40px rgba(184,134,11,0.3)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(184,134,11,0.15)"; }}
      >
        Оставить заявку
        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </Link>
    </motion.div>
  );
}

export default function ContactShowcase() {
  const isMobile = useIsMobile();
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });

  return (
    <section
      style={{ position: "relative", background: "#FAFAF7", padding: "clamp(3rem, 8vw, 7rem) 0" }}
      aria-label="Свяжитесь с нами"
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(1.25rem, 3vw, 2rem)" }}>
        {/* Section header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <span style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.35em", textTransform: "uppercase", color: "#B8860B", display: "inline-flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <span style={{ width: 24, height: 1, background: "rgba(184,134,11,0.3)", display: "inline-block" }} />
            Контакты
            <span style={{ width: 24, height: 1, background: "rgba(184,134,11,0.3)", display: "inline-block" }} />
          </span>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 300, color: "#1A1714", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
            Свяжитесь с нами
          </h2>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? "2rem" : "4rem",
          alignItems: "start",
        }}>
          {/* Left: Contact items */}
          <div>
            {CONTACTS.map((item, i) => (
              <ContactItem key={item.icon} item={item} index={i} />
            ))}

            {/* CTA button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
              style={{ marginTop: "2rem" }}
            >
              <MagneticCTA isMobile={isMobile} />
            </motion.div>
          </div>

          {/* Right: Map placeholder */}
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : 40, y: isMobile ? 30 : 0 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            style={{
              borderRadius: 20,
              overflow: "hidden",
              border: "1px solid rgba(184,134,11,0.1)",
              aspectRatio: isMobile ? "16/10" : "1",
              position: "relative",
              background: "#EDE9E1",
            }}
          >
            {/* Stylized map placeholder */}
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
              {/* Map pin */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg width={48} height={48} viewBox="0 0 24 24" fill="none" stroke="#B8860B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3" fill="rgba(184,134,11,0.15)"/>
                </svg>
              </motion.div>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", color: "#5C564D", textAlign: "center", lineHeight: 1.5, fontWeight: 300 }}>
                Санкт-Петербург<br />
                <span style={{ fontSize: "0.8rem", color: "#8A8478" }}>Новолитовская ул., д. 15</span>
              </p>
            </div>

            {/* Decorative grid lines */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.06 }}>
              {Array.from({ length: 8 }, (_, i) => (
                <div key={`h-${i}`} style={{ position: "absolute", left: 0, right: 0, top: `${(i + 1) * 11}%`, height: 1, background: "#5C564D" }} />
              ))}
              {Array.from({ length: 8 }, (_, i) => (
                <div key={`v-${i}`} style={{ position: "absolute", top: 0, bottom: 0, left: `${(i + 1) * 11}%`, width: 1, background: "#5C564D" }} />
              ))}
            </div>

            {/* Gold accent corner */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, #B8860B, transparent)" }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
