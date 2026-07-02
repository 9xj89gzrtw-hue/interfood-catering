"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   ContactShowcase — Modern Contact Section with Animated Form
   Two-column layout: info on the left, animated form on the right.
   Floating labels, magnetic submit button with ripple, success state.
   ═══════════════════════════════════════════════════════════════ */

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

// ─── Floating Label Input ──────────────────────────────────
function FloatingLabelInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  textarea = false,
  rows,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  const inputStyles: React.CSSProperties = {
    width: "100%",
    padding: "1.5rem 1.25rem 0.5rem",
    background: "var(--color-surface-3)",
    border: focused
      ? "1px solid var(--color-brand-30)"
      : "1px solid var(--color-brand-12)",
    borderRadius: "14px",
    color: "var(--color-text-primary)",
    fontSize: "0.95rem",
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 0.4s, box-shadow 0.4s, background 0.3s",
    boxShadow: focused ? "0 0 0 3px var(--color-brand-8)" : "none",
  };

  const labelStyles: React.CSSProperties = {
    position: "absolute",
    left: "1.25rem",
    top: isActive ? "-8px" : "1rem",
    fontSize: isActive ? "0.68rem" : "0.95rem",
    fontWeight: isActive ? 500 : 400,
    color: isActive ? "var(--color-brand)" : "var(--color-text-muted)",
    letterSpacing: isActive ? "0.1em" : "0",
    textTransform: isActive ? "uppercase" as const : "none" as const,
    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
    pointerEvents: "none",
    zIndex: 1,
    background: isActive ? "var(--color-surface-3)" : "transparent",
    padding: isActive ? "0 0.35rem" : "0",
    lineHeight: isActive ? 1 : 1.5,
  };

  return (
    <div style={{ position: "relative" }}>
      <label htmlFor={id} style={labelStyles}>
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={rows || 4}
          style={{
            ...inputStyles,
            resize: "vertical" as const,
            minHeight: "120px",
          }}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={inputStyles}
        />
      )}
    </div>
  );
}

// ─── Custom Select with Floating Label ─────────────────────
function FloatingLabelSelect({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  return (
    <div style={{ position: "relative" }}>
      <label
        htmlFor={id}
        style={{
          position: "absolute",
          left: "1.25rem",
          top: isActive ? "-8px" : "1rem",
          fontSize: isActive ? "0.68rem" : "0.95rem",
          fontWeight: isActive ? 500 : 400,
          color: isActive ? "var(--color-brand)" : "var(--color-text-muted)",
          letterSpacing: isActive ? "0.1em" : "0",
          textTransform: isActive ? ("uppercase" as const) : ("none" as const),
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          pointerEvents: "none",
          zIndex: 1,
          background: isActive ? "var(--color-surface-3)" : "transparent",
          padding: isActive ? "0 0.35rem" : "0",
          lineHeight: isActive ? 1 : 1.5,
        }}
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          padding: "1.5rem 1.25rem 0.5rem",
          background: "var(--color-surface-3)",
          border: focused
            ? "1px solid var(--color-brand-30)"
            : "1px solid var(--color-brand-12)",
          borderRadius: "14px",
          color: value
            ? "var(--color-text-primary)"
            : "transparent",
          fontSize: "0.95rem",
          fontFamily: "inherit",
          outline: "none",
          transition: "border-color 0.4s, box-shadow 0.4s, background 0.3s",
          boxShadow: focused ? "0 0 0 3px var(--color-brand-8)" : "none",
          appearance: "none" as const,
          cursor: "pointer",
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23C9A96A' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 1.25rem center",
        }}
      >
        <option value="" disabled style={{ color: "var(--color-text-muted)" }}>
          {label}
        </option>
        {options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            style={{ background: "var(--color-surface-3)", color: "var(--color-text-primary)" }}
          >
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// ─── Magnetic Submit Button with Ripple ────────────────────
function MagneticSubmitButton({
  onClick,
  disabled = false,
}: {
  onClick: () => void;
  disabled?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<
    { x: number; y: number; id: number }[]
  >([]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * 0.1);
      y.set((e.clientY - centerY) * 0.1);
    },
    [x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }, [x, y]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const rippleX = e.clientX - rect.left;
      const rippleY = e.clientY - rect.top;
      const id = Date.now();
      setRipples((prev) => [...prev, { x: rippleX, y: rippleY, id }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 800);
      onClick();
    },
    [onClick, disabled]
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        x: springX,
        y: springY,
        display: "inline-block",
        width: "100%",
      }}
    >
      <motion.button
        type="submit"
        onClick={handleClick}
        disabled={disabled}
        animate={{
          boxShadow: isHovered
            ? "0 8px 40px rgba(201,169,106,0.3), 0 0 80px rgba(201,169,106,0.15)"
            : "0 4px 20px rgba(201,169,106,0.15)",
        }}
        transition={{ duration: 0.4 }}
        className="btn-gold"
        style={{
          width: "100%",
          minWidth: "44px",
          minHeight: "44px",
          padding: "1.1rem 2rem",
          fontSize: "0.8rem",
          letterSpacing: "0.14em",
          position: "relative",
          overflow: "hidden",
          opacity: disabled ? 0.6 : 1,
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        {disabled ? "Отправка..." : "Отправить заявку"}
        {ripples.map((r) => (
          <span
            key={r.id}
            style={{
              position: "absolute",
              left: r.x,
              top: r.y,
              width: 0,
              height: 0,
              borderRadius: "50%",
              background: "rgba(201, 169, 106, 0.25)",
              transform: "translate(-50%, -50%)",
              animation: "ripple-expand 0.8s ease-out forwards",
              pointerEvents: "none",
            }}
          />
        ))}
      </motion.button>
    </motion.div>
  );
}

// ─── Success State with Animated Checkmark ─────────────────
function SuccessState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: EASE_PREMIUM }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 2rem",
        textAlign: "center",
        minHeight: "400px",
      }}
    >
      {/* Animated Checkmark Circle */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.2,
        }}
        style={{
          width: "72px",
          height: "72px",
          borderRadius: "50%",
          background: "var(--color-brand-12)",
          border: "2px solid var(--color-brand)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1.5rem",
        }}
      >
        <motion.svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            d="M5 12l5 5L19 7"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
          />
        </motion.svg>
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "1.5rem",
          fontWeight: 300,
          color: "var(--color-text-primary)",
          marginBottom: "0.75rem",
        }}
      >
        Заявка отправлена!
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.75 }}
        style={{
          fontSize: "0.9rem",
          color: "var(--color-text-secondary)",
          lineHeight: 1.7,
          maxWidth: "320px",
        }}
      >
        Мы свяжемся с вами в ближайшие 30 минут для обсуждения деталей вашего мероприятия.
      </motion.p>
    </motion.div>
  );
}

// ─── Social Link with Hover Glow ───────────────────────────
function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        border: "1px solid var(--color-brand-20)",
        background: "var(--color-surface-3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--color-brand)",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        textDecoration: "none",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--color-brand)";
        e.currentTarget.style.background = "var(--color-brand-8)";
        e.currentTarget.style.boxShadow =
          "0 0 20px rgba(201,169,106,0.2)";
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--color-brand-20)";
        e.currentTarget.style.background = "var(--color-surface-3)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {children}
    </a>
  );
}

// ─── VK Icon ───────────────────────────────────────────────
function VKIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.02-1.304.587-1.496c.598-.189 1.367 1.258 2.182 1.814.616.42 1.084.328 1.084.328l2.175-.03s1.138-.07.598-.964c-.044-.073-.314-.662-1.618-1.872-1.366-1.268-1.183-1.062.462-3.255.998-1.332 1.398-2.144 1.273-2.492-.119-.332-.856-.244-.856-.244l-2.45.015s-.182-.025-.316.056c-.131.079-.216.264-.216.264s-.387 1.03-.903 1.906c-1.089 1.855-1.524 1.953-1.702 1.838-.414-.268-.311-1.075-.311-1.648 0-1.792.272-2.539-.529-2.732-.266-.064-.462-.107-1.142-.114-.872-.009-1.61.003-2.028.208-.278.136-.493.44-.362.457.162.022.529.099.723.363.251.342.242 1.11.242 1.11s.145 2.111-.337 2.373c-.33.181-.784-.188-1.758-1.877-.499-.864-.876-1.82-.876-1.82s-.073-.178-.203-.274c-.158-.116-.378-.153-.378-.153l-2.328.015s-.35.01-.478.162c-.114.135-.009.413-.009.413s1.83 4.28 3.901 6.439c1.899 1.978 4.054 1.848 4.054 1.848h.977z" />
    </svg>
  );
}

// ─── Instagram Icon ────────────────────────────────────────
function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

// ─── Contact Info Row ──────────────────────────────────────
function ContactInfoRow({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "var(--color-brand-8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── Event Type Options ────────────────────────────────────
const EVENT_TYPES = [
  { value: "", label: "" },
  { value: "banquet", label: "Банкет" },
  { value: "furshet", label: "Фуршет" },
  { value: "wedding", label: "Свадьба" },
  { value: "corporate", label: "Корпоратив" },
  { value: "coffee-break", label: "Кофе-брейк" },
  { value: "bbq", label: "Барбекю" },
  { value: "other", label: "Другое" },
];

// ─── Main Component ────────────────────────────────────────
export default function ContactShowcase() {
  // Responsive detection
  const [isDesktop, setIsDesktop] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [eventType, setEventType] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const checkWidth = () => setIsDesktop(window.innerWidth >= 768);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  // ─── Submit Handler ──────────────────────────────────
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (isSubmitting) return;
      setIsSubmitting(true);
      // Simulated submission — 1 second timeout
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 1000);
    },
    [isSubmitting]
  );

  // Shared SVG props for contact icons
  const iconSvgProps = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--color-brand)" as const,
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <section
      style={{
        position: "relative",
        background: "var(--color-surface-1)",
        padding: "clamp(4rem, 8vw, 8rem) 0",
        overflow: "hidden",
      }}
      aria-label="Контакты"
    >
      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "0 2rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isDesktop ? "1fr 1.2fr" : "1fr",
            gap: "3rem",
          }}
        >
          {/* ═══ Left Column — Contact Info ═══ */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          >
            {/* Title */}
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 300,
                color: "var(--color-text-primary)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                marginBottom: "2.5rem",
              }}
            >
              Свяжитесь с нами
            </h2>

            {/* Phone */}
            <ContactInfoRow
              icon={
                <svg {...iconSvgProps}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              }
            >
              <a
                href="tel:+78129195911"
                style={{
                  fontSize: "1.35rem",
                  fontWeight: 500,
                  color: "var(--color-brand)",
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--color-brand-light)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--color-brand)";
                }}
              >
                +7 (812) 919-59-11
              </a>
            </ContactInfoRow>

            {/* Email */}
            <ContactInfoRow
              icon={
                <svg {...iconSvgProps}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              }
            >
              <a
                href="mailto:interfood-catering@yandex.ru"
                style={{
                  fontSize: "0.95rem",
                  color: "var(--color-text-secondary)",
                  textDecoration: "none",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--color-brand)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--color-text-secondary)";
                }}
              >
                interfood-catering@yandex.ru
              </a>
            </ContactInfoRow>

            {/* Address */}
            <ContactInfoRow
              icon={
                <svg {...iconSvgProps}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              }
            >
              <span
                style={{
                  fontSize: "0.95rem",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.6,
                }}
              >
                Новолитовская ул., д. 15, СПб
              </span>
            </ContactInfoRow>

            {/* Working hours */}
            <ContactInfoRow
              icon={
                <svg {...iconSvgProps}>
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              }
            >
              <span
                style={{
                  fontSize: "0.95rem",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.6,
                }}
              >
                Пн-Вс 9:00–22:00
              </span>
            </ContactInfoRow>

            {/* Social Links */}
            <div style={{ marginTop: "1rem" }}>
              <p
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--color-text-muted)",
                  marginBottom: "1rem",
                }}
              >
                Мы в соцсетях
              </p>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <SocialLink
                  href="https://vk.com/interfood_catering"
                  label="ВКонтакте"
                >
                  <VKIcon />
                </SocialLink>
                <SocialLink
                  href="https://instagram.com/interfood_catering"
                  label="Instagram"
                >
                  <InstagramIcon />
                </SocialLink>
              </div>
            </div>
          </motion.div>

          {/* ═══ Right Column — Form ═══ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE_PREMIUM }}
          >
            <div
              style={{
                padding: "clamp(1.5rem, 4vw, 2.5rem)",
                borderRadius: "20px",
                background: "var(--color-surface-2)",
                border: "1px solid var(--color-brand-8)",
              }}
            >
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <SuccessState key="success" />
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1.25rem",
                    }}
                  >
                    {/* Name */}
                    <FloatingLabelInput
                      id="contact-name"
                      label="Ваше имя"
                      value={name}
                      onChange={setName}
                    />

                    {/* Phone */}
                    <FloatingLabelInput
                      id="contact-phone"
                      label="Телефон"
                      type="tel"
                      value={phone}
                      onChange={setPhone}
                    />

                    {/* Event Type Select */}
                    <FloatingLabelSelect
                      id="contact-event-type"
                      label="Тип мероприятия"
                      value={eventType}
                      onChange={setEventType}
                      options={EVENT_TYPES}
                    />

                    {/* Guest Count */}
                    <FloatingLabelInput
                      id="contact-guests"
                      label="Количество гостей"
                      type="number"
                      value={guestCount}
                      onChange={setGuestCount}
                    />

                    {/* Message */}
                    <FloatingLabelInput
                      id="contact-message"
                      label="Сообщение"
                      value={message}
                      onChange={setMessage}
                      textarea
                      rows={4}
                    />

                    {/* Submit Button */}
                    <div style={{ marginTop: "0.5rem" }}>
                      <MagneticSubmitButton
                        onClick={() => {
                          // The form's onSubmit handler will be called
                          // because the button is type="submit"
                          // This onClick is for the ripple effect
                        }}
                        disabled={isSubmitting}
                      />
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
