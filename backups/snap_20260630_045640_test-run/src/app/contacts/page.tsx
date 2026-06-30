"use client";

import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import TextReveal from "@/components/TextReveal";
import MagneticButton from "@/components/MagneticButton";
import TiltCard from "@/components/TiltCard";
import ImageReveal from "@/components/ImageReveal";

/* ═══════════════════════════════════════════════════════════════
   ИНТЕРФУД КЕЙТЕРИНГ — Контакты / Contacts Page
   ═══════════════════════════════════════════════════════════════ */

const IMG = {
  hero: "https://sfile.chatglm.cn/images-ppt/31ca0a361dc4.jpg",
  office: "https://sfile.chatglm.cn/images-ppt/5a35d18ab4c2.jpg",
  kitchen: "https://sfile.chatglm.cn/images-ppt/a2fbd3b8447b.jpg",
};

const CONTACT_CARDS = [
  {
    icon: "☎",
    title: "Телефон",
    value: "+7 (812) 919-59-11",
    href: "tel:+78129195911",
    desc: "Звоните пн–вс с 9:00 до 22:00",
  },
  {
    icon: "✉",
    title: "Email",
    value: "info@interfood-catering.ru",
    href: "mailto:info@interfood-catering.ru",
    desc: "Ответим в течение 2 часов",
  },
  {
    icon: "◉",
    title: "Адрес",
    value: "Невский проспект, д. 100",
    href: "https://yandex.ru/maps/-/CDaZiE~P",
    desc: "Санкт-Петербург",
  },
  {
    icon: "◷",
    title: "Часы работы",
    value: "Пн–Вс: 9:00–22:00",
    href: null,
    desc: "Без выходных и праздников",
  },
];

const EVENT_TYPES = [
  "Свадьба",
  "Корпоратив",
  "Фуршет",
  "Кофе-брейк",
  "Юбилей",
  "День рождения",
  "Новый год",
  "Выездное мероприятие",
  "Другое",
];

const SOCIAL_LINKS = [
  {
    name: "ВКонтакте",
    href: "https://vk.com/nilovcatering",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2zm3.08 14.27h-1.57c-.6 0-.78-.48-1.86-1.56-1-.93-1.39-1.05-1.63-1.05-.34 0-.44.1-.44.57v1.43c0 .41-.13.65-1.2.65-1.77 0-3.74-1.07-5.12-3.07-2.08-2.92-2.65-5.12-2.65-5.56 0-.25.1-.48.57-.48h1.57c.42 0 .58.19.74.64.81 2.36 2.18 4.43 2.74 4.43.21 0 .31-.1.31-.65V8.71c-.06-1.16-.68-1.26-.68-1.67 0-.19.16-.39.42-.39h2.47c.35 0 .48.19.48.62v3.34c0 .35.16.48.26.48.21 0 .38-.13.77-.52 1.2-1.34 2.05-3.41 2.05-3.41.11-.24.3-.48.71-.48h1.57c.48 0 .58.25.48.59-.2.94-2.16 3.71-2.16 3.71-.17.28-.23.41 0 .72.17.21.72.71 1.09 1.14.68.77 1.2 1.42 1.34 1.87.15.44-.06.67-.51.67z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com/nilov_catering",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 011.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772 4.915 4.915 0 01-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.684-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.055-.058 1.37-.058 4.04 0 2.67.01 2.986.058 4.04.045.977.207 1.505.344 1.858.182.466.399.8.748 1.15.35.35.684.566 1.15.748.353.137.882.3 1.857.344 1.055.048 1.37.058 4.04.058 2.67 0 2.987-.01 4.04-.058.977-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.684.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.04 0-2.67-.01-2.986-.058-4.04-.045-.977-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.054-.047-1.37-.058-4.04-.058zm0 3.063a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 8.468a3.333 3.333 0 100-6.666 3.333 3.333 0 000 6.666zm6.538-8.671a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" />
      </svg>
    ),
  },
  {
    name: "Telegram",
    href: "https://t.me/nilov_catering",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
];

/* ─── Animation helpers ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
  },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const staggerItem = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeUp}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Form types ─── */
interface FormState {
  name: string;
  phone: string;
  email: string;
  eventType: string;
  date: string;
  guests: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  guests?: string;
}

const INITIAL_FORM: FormState = {
  name: "",
  phone: "",
  email: "",
  eventType: "",
  date: "",
  guests: "",
  message: "",
};

/* ═══════════════════════════════════════════════════════════════ */
export default function ContactsPage() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  /* Hero parallax */
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  /* ─── Validation ─── */
  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = "Введите ваше имя";
    if (!form.phone.trim()) {
      errs.phone = "Введите номер телефона";
    } else {
      const phoneClean = form.phone.replace(/[\s\-\(\)]/g, "");
      if (!/^(\+7|7|8)\d{10}$/.test(phoneClean)) {
        errs.phone = "Введите корректный номер телефона";
      }
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Введите корректный email";
    }
    if (form.guests) {
      const n = parseInt(form.guests, 10);
      if (isNaN(n) || n < 1) errs.guests = "Введите количество гостей";
    }
    return errs;
  }

  /* ─── Submit ─── */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setSubmitted(true);
    setForm(INITIAL_FORM);
    setErrors({});
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  return (
    <>
      <SiteNav />

      {/* ═══════════════ Hero ═══════════════ */}
      <section className="hero" ref={heroRef} aria-label="Контакты">
        <motion.div
          className="hero-bg"
          style={{
            y: heroY,
            backgroundImage: `url(${IMG.hero})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          className="hero-overlay"
          style={{
            background:
              "linear-gradient(135deg, rgba(12,11,11,0.82) 0%, rgba(27,42,74,0.6) 50%, rgba(12,11,11,0.78) 100%)",
          }}
        />
        <div className="hero-grain" />
        <motion.div
          className="hero-content"
          style={{ opacity: heroOpacity }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <motion.div
            className="hero-tag"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Контакты
          </motion.div>
          <h1 className="hero-title">
            Свяжитесь<br />
            <em>с нами</em>
          </h1>
          <p className="hero-sub">
            Мы всегда рады ответить на ваши вопросы и обсудить детали будущего
            мероприятия. Оставьте заявку или позвоните — ответим в течение 30
            минут.
          </p>
        </motion.div>
      </section>

      {/* ═══════════════ Contact Cards ═══════════════ */}
      <section
        className="section section-cream"
        aria-label="Контактная информация"
      >
        <div className="container">
          <Reveal>
            <span className="section-label">Как нас найти</span>
            <TextReveal
              text="Мы всегда на связи"
              as="h2"
              className="section-title"
            />
            <p className="section-subtitle">
              Выберите удобный способ связаться с нами — по телефону, email или
              посетите наш офис лично.
            </p>
          </Reveal>

          <motion.div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1.5rem",
              marginTop: "2.5rem",
            }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {CONTACT_CARDS.map((card, i) => (
              <motion.div key={i} variants={staggerItem}>
                <TiltCard>
                  <div
                    className="card"
                    style={{
                      padding: "2rem",
                      textAlign: "center",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: card.href ? "pointer" : "default",
                    }}
                    onClick={() => card.href && window.open(card.href, "_blank")}
                  >
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        background: "var(--color-brand-10)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "1.25rem",
                        fontSize: "1.5rem",
                        color: "var(--color-brand)",
                      }}
                    >
                      {card.icon}
                    </div>
                    <div
                      style={{
                        fontSize: "0.65rem",
                        fontWeight: 600,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "var(--color-brand)",
                        marginBottom: "0.75rem",
                      }}
                    >
                      {card.title}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.15rem",
                        fontWeight: 400,
                        color: "var(--color-dark)",
                        marginBottom: "0.5rem",
                        lineHeight: 1.3,
                      }}
                    >
                      {card.href ? (
                        <a
                          href={card.href}
                          style={{
                            color: "inherit",
                            textDecoration: "none",
                            transition: "color 0.3s",
                          }}
                          onMouseEnter={(e) =>
                            ((e.target as HTMLElement).style.color =
                              "var(--color-brand)")
                          }
                          onMouseLeave={(e) =>
                            ((e.target as HTMLElement).style.color =
                              "var(--color-dark)")
                          }
                          onClick={(e) => e.stopPropagation()}
                        >
                          {card.value}
                        </a>
                      ) : (
                        card.value
                      )}
                    </div>
                    <div
                      style={{
                        fontSize: "0.82rem",
                        color: "#888",
                        lineHeight: 1.5,
                      }}
                    >
                      {card.desc}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ Contact Form + Image ═══════════════ */}
      <section className="section section-light" aria-label="Форма заявки">
        <div className="container">
          <Reveal>
            <span className="section-label">Оставить заявку</span>
            <TextReveal
              text="Расскажите о вашем мероприятии"
              as="h2"
              className="section-title"
            />
            <p className="section-subtitle">
              Заполните форму, и наш кейтеринг-консьерж свяжется с вами в
              течение 30 минут для обсуждения деталей.
            </p>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "3rem",
              marginTop: "2.5rem",
              alignItems: "start",
            }}
          >
            {/* ─── Form ─── */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      background: "#fff",
                      borderRadius: "20px",
                      padding: "3rem 2rem",
                      textAlign: "center",
                      boxShadow: "0 4px 30px rgba(0,0,0,0.06)",
                    }}
                  >
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
                        width: 72,
                        height: 72,
                        borderRadius: "50%",
                        background:
                          "linear-gradient(135deg, var(--color-brand) 0%, var(--color-brand-dark) 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 1.5rem",
                        fontSize: "2rem",
                        color: "#fff",
                      }}
                    >
                      ✓
                    </motion.div>
                    <h3
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.5rem",
                        fontWeight: 400,
                        color: "var(--color-dark)",
                        marginBottom: "0.75rem",
                      }}
                    >
                      Заявка отправлена!
                    </h3>
                    <p
                      style={{
                        color: "#666",
                        fontSize: "0.95rem",
                        lineHeight: 1.7,
                        marginBottom: "1.5rem",
                      }}
                    >
                      Мы свяжемся с вами в течение 30 минут.
                      <br />
                      Спасибо за доверие!
                    </p>
                    <MagneticButton className="btn-outline" as="button">
                      Отправить ещё
                    </MagneticButton>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    style={{
                      background: "#fff",
                      borderRadius: "20px",
                      padding: "2.5rem",
                      boxShadow: "0 4px 30px rgba(0,0,0,0.06)",
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "1.25rem",
                      }}
                    >
                      {/* Name */}
                      <div>
                        <label
                          htmlFor="name"
                          style={{
                            display: "block",
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            color: "var(--color-dark)",
                            marginBottom: "0.5rem",
                          }}
                        >
                          Имя *
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Ваше имя"
                          style={{
                            width: "100%",
                            padding: "0.85rem 1rem",
                            border: `1.5px solid ${
                              errors.name
                                ? "#e53e3e"
                                : "var(--color-cream-darker)"
                            }`,
                            borderRadius: "12px",
                            fontSize: "0.9rem",
                            fontFamily: "var(--font-sans)",
                            background: errors.name
                              ? "rgba(229,62,62,0.04)"
                              : "var(--color-warm-white)",
                            outline: "none",
                            transition: "border-color 0.3s, background 0.3s",
                          }}
                          onFocus={(e) => {
                            if (!errors.name)
                              e.target.style.borderColor =
                                "var(--color-brand)";
                          }}
                          onBlur={(e) => {
                            if (!errors.name)
                              e.target.style.borderColor =
                                "var(--color-cream-darker)";
                          }}
                        />
                        {errors.name && (
                          <motion.span
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                              color: "#e53e3e",
                              fontSize: "0.75rem",
                              marginTop: "0.35rem",
                              display: "block",
                            }}
                          >
                            {errors.name}
                          </motion.span>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label
                          htmlFor="phone"
                          style={{
                            display: "block",
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            color: "var(--color-dark)",
                            marginBottom: "0.5rem",
                          }}
                        >
                          Телефон *
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+7 (___) ___-__-__"
                          style={{
                            width: "100%",
                            padding: "0.85rem 1rem",
                            border: `1.5px solid ${
                              errors.phone
                                ? "#e53e3e"
                                : "var(--color-cream-darker)"
                            }`,
                            borderRadius: "12px",
                            fontSize: "0.9rem",
                            fontFamily: "var(--font-sans)",
                            background: errors.phone
                              ? "rgba(229,62,62,0.04)"
                              : "var(--color-warm-white)",
                            outline: "none",
                            transition: "border-color 0.3s, background 0.3s",
                          }}
                          onFocus={(e) => {
                            if (!errors.phone)
                              e.target.style.borderColor =
                                "var(--color-brand)";
                          }}
                          onBlur={(e) => {
                            if (!errors.phone)
                              e.target.style.borderColor =
                                "var(--color-cream-darker)";
                          }}
                        />
                        {errors.phone && (
                          <motion.span
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                              color: "#e53e3e",
                              fontSize: "0.75rem",
                              marginTop: "0.35rem",
                              display: "block",
                            }}
                          >
                            {errors.phone}
                          </motion.span>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="email"
                          style={{
                            display: "block",
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            color: "var(--color-dark)",
                            marginBottom: "0.5rem",
                          }}
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          style={{
                            width: "100%",
                            padding: "0.85rem 1rem",
                            border: `1.5px solid ${
                              errors.email
                                ? "#e53e3e"
                                : "var(--color-cream-darker)"
                            }`,
                            borderRadius: "12px",
                            fontSize: "0.9rem",
                            fontFamily: "var(--font-sans)",
                            background: errors.email
                              ? "rgba(229,62,62,0.04)"
                              : "var(--color-warm-white)",
                            outline: "none",
                            transition: "border-color 0.3s, background 0.3s",
                          }}
                          onFocus={(e) => {
                            if (!errors.email)
                              e.target.style.borderColor =
                                "var(--color-brand)";
                          }}
                          onBlur={(e) => {
                            if (!errors.email)
                              e.target.style.borderColor =
                                "var(--color-cream-darker)";
                          }}
                        />
                        {errors.email && (
                          <motion.span
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                              color: "#e53e3e",
                              fontSize: "0.75rem",
                              marginTop: "0.35rem",
                              display: "block",
                            }}
                          >
                            {errors.email}
                          </motion.span>
                        )}
                      </div>

                      {/* Event Type */}
                      <div>
                        <label
                          htmlFor="eventType"
                          style={{
                            display: "block",
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            color: "var(--color-dark)",
                            marginBottom: "0.5rem",
                          }}
                        >
                          Тип мероприятия
                        </label>
                        <select
                          id="eventType"
                          name="eventType"
                          value={form.eventType}
                          onChange={handleChange}
                          style={{
                            width: "100%",
                            padding: "0.85rem 1rem",
                            border: "1.5px solid var(--color-cream-darker)",
                            borderRadius: "12px",
                            fontSize: "0.9rem",
                            fontFamily: "var(--font-sans)",
                            background: "var(--color-warm-white)",
                            outline: "none",
                            color: form.eventType
                              ? "var(--color-dark)"
                              : "#aaa",
                            cursor: "pointer",
                            transition: "border-color 0.3s",
                            appearance: "none",
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 1rem center",
                          }}
                          onFocus={(e) =>
                            (e.target.style.borderColor =
                              "var(--color-brand)")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor =
                              "var(--color-cream-darker)")
                          }
                        >
                          <option value="" disabled>
                            Выберите тип
                          </option>
                          {EVENT_TYPES.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Date */}
                      <div>
                        <label
                          htmlFor="date"
                          style={{
                            display: "block",
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            color: "var(--color-dark)",
                            marginBottom: "0.5rem",
                          }}
                        >
                          Дата мероприятия
                        </label>
                        <input
                          id="date"
                          name="date"
                          type="date"
                          value={form.date}
                          onChange={handleChange}
                          style={{
                            width: "100%",
                            padding: "0.85rem 1rem",
                            border: "1.5px solid var(--color-cream-darker)",
                            borderRadius: "12px",
                            fontSize: "0.9rem",
                            fontFamily: "var(--font-sans)",
                            background: "var(--color-warm-white)",
                            outline: "none",
                            color: form.date
                              ? "var(--color-dark)"
                              : "#aaa",
                            transition: "border-color 0.3s",
                          }}
                          onFocus={(e) =>
                            (e.target.style.borderColor =
                              "var(--color-brand)")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor =
                              "var(--color-cream-darker)")
                          }
                        />
                      </div>

                      {/* Guests */}
                      <div>
                        <label
                          htmlFor="guests"
                          style={{
                            display: "block",
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            color: "var(--color-dark)",
                            marginBottom: "0.5rem",
                          }}
                        >
                          Количество гостей
                        </label>
                        <input
                          id="guests"
                          name="guests"
                          type="number"
                          min="1"
                          value={form.guests}
                          onChange={handleChange}
                          placeholder="Например, 100"
                          style={{
                            width: "100%",
                            padding: "0.85rem 1rem",
                            border: `1.5px solid ${
                              errors.guests
                                ? "#e53e3e"
                                : "var(--color-cream-darker)"
                            }`,
                            borderRadius: "12px",
                            fontSize: "0.9rem",
                            fontFamily: "var(--font-sans)",
                            background: errors.guests
                              ? "rgba(229,62,62,0.04)"
                              : "var(--color-warm-white)",
                            outline: "none",
                            transition: "border-color 0.3s, background 0.3s",
                          }}
                          onFocus={(e) => {
                            if (!errors.guests)
                              e.target.style.borderColor =
                                "var(--color-brand)";
                          }}
                          onBlur={(e) => {
                            if (!errors.guests)
                              e.target.style.borderColor =
                                "var(--color-cream-darker)";
                          }}
                        />
                        {errors.guests && (
                          <motion.span
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                              color: "#e53e3e",
                              fontSize: "0.75rem",
                              marginTop: "0.35rem",
                              display: "block",
                            }}
                          >
                            {errors.guests}
                          </motion.span>
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div style={{ marginTop: "1.25rem" }}>
                      <label
                        htmlFor="message"
                        style={{
                          display: "block",
                          fontSize: "0.7rem",
                          fontWeight: 600,
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "var(--color-dark)",
                          marginBottom: "0.5rem",
                        }}
                      >
                        Сообщение
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Расскажите подробнее о вашем мероприятии, пожеланиях к меню, бюджете..."
                        style={{
                          width: "100%",
                          padding: "0.85rem 1rem",
                          border: "1.5px solid var(--color-cream-darker)",
                          borderRadius: "12px",
                          fontSize: "0.9rem",
                          fontFamily: "var(--font-sans)",
                          background: "var(--color-warm-white)",
                          outline: "none",
                          resize: "vertical",
                          transition: "border-color 0.3s",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "var(--color-brand)")
                        }
                        onBlur={(e) =>
                          (e.target.style.borderColor =
                            "var(--color-cream-darker)")
                        }
                      />
                    </div>

                    {/* Submit */}
                    <div
                      style={{
                        marginTop: "1.75rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <MagneticButton
                        className="btn-gold"
                        as="button"
                        onClick={() => {}}
                        style={{
                          width: "100%",
                          opacity: submitting ? 0.7 : 1,
                          pointerEvents: submitting ? "none" : "auto",
                        }}
                      >
                        {submitting ? (
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.5rem",
                            }}
                          >
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                              style={{ display: "inline-block" }}
                            >
                              ⟳
                            </motion.span>
                            Отправляем...
                          </span>
                        ) : (
                          "Отправить заявку"
                        )}
                      </MagneticButton>
                    </div>

                    <p
                      style={{
                        fontSize: "0.72rem",
                        color: "#999",
                        marginTop: "1rem",
                        lineHeight: 1.5,
                      }}
                    >
                      Нажимая кнопку, вы соглашаетесь с обработкой персональных
                      данных в соответствии с ФЗ-152.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* ─── Right side image ─── */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
            >
              <ImageReveal
                src={IMG.office}
                alt="Офис Интерфуд Кейтеринг"
                direction="right"
                style={{ borderRadius: "20px", height: 280 }}
              />
              <ImageReveal
                src={IMG.kitchen}
                alt="Производственная кухня Интерфуд"
                direction="right"
                delay={0.15}
                style={{ borderRadius: "20px", height: 280 }}
              />
              <div
                style={{
                  background: "#fff",
                  borderRadius: "20px",
                  padding: "2rem",
                  boxShadow: "0 4px 30px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--color-brand)",
                    marginBottom: "1rem",
                  }}
                >
                  Быстрая связь
                </div>
                <p
                  style={{
                    color: "#666",
                    fontSize: "0.9rem",
                    lineHeight: 1.7,
                    marginBottom: "1.25rem",
                  }}
                >
                  Для срочных вопросов или быстрого расчёта — напишите нам в
                  мессенджер. Отвечаем за 5 минут.
                </p>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <MagneticButton
                    as="a"
                    href="https://wa.me/79119417205?text=Здравствуйте! Хочу узнать подробнее о кейтеринге."
                    className="btn-gold"
                    style={{ fontSize: "0.7rem", padding: "0.75rem 1.5rem" }}
                  >
                    WhatsApp
                  </MagneticButton>
                  <MagneticButton
                    as="a"
                    href="https://t.me/nilov_catering"
                    className="btn-outline"
                    style={{ fontSize: "0.7rem", padding: "0.75rem 1.5rem" }}
                  >
                    Telegram
                  </MagneticButton>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ Map ═══════════════ */}
      <section className="section-wide" aria-label="Карта">
        <div style={{ width: "100%" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <span className="section-label">Мы на карте</span>
              <TextReveal
                text="Наш офис в центре Санкт-Петербурга"
                as="h2"
                className="section-title"
              />
            </div>
          </Reveal>
          <div
            className="contact-map"
            style={{
              height: "450px",
              maxWidth: "1320px",
              margin: "0 auto",
              padding: "0 2rem",
            }}
          >
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A3cf8c4e6d4b4f5b5d4b4f5b5d4b4f5b5d4b4f5b5d4b4f5b5&source=constructor"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ borderRadius: "20px" }}
              title="Карта — Интерфуд Кейтеринг, Невский проспект д. 100"
            />
          </div>
        </div>
      </section>

      {/* ═══════════════ Social Media ═══════════════ */}
      <section
        className="section section-dark"
        aria-label="Социальные сети"
      >
        <div className="container" style={{ textAlign: "center" }}>
          <Reveal>
            <span className="section-label" style={{ color: "var(--color-brand-light)" }}>
              Мы в соцсетях
            </span>
            <TextReveal
              text="Подписывайтесь и вдохновляйтесь"
              as="h2"
              className="section-title section-title-light"
            />
            <p
              className="section-subtitle section-subtitle-light"
              style={{ margin: "0 auto" }}
            >
              Следите за нашими мероприятиями, новыми блюдами и закулисьем
              кейтеринга в социальных сетях.
            </p>
          </Reveal>

          <motion.div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "2rem",
              marginTop: "2.5rem",
            }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {SOCIAL_LINKS.map((social, i) => (
              <motion.div key={i} variants={staggerItem}>
                <TiltCard maxTilt={6}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "1rem",
                      padding: "2.5rem 3rem",
                      background:
                        "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(184,149,90,0.12)",
                      borderRadius: "20px",
                      textDecoration: "none",
                      transition:
                        "border-color 0.4s, box-shadow 0.4s, background 0.4s",
                      minWidth: 180,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(184,149,90,0.35)";
                      e.currentTarget.style.boxShadow =
                        "0 20px 50px rgba(0,0,0,0.25)";
                      e.currentTarget.style.background =
                        "rgba(184,149,90,0.06)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(184,149,90,0.12)";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.03)";
                    }}
                    aria-label={social.name}
                  >
                    <div
                      style={{
                        color: "rgba(255,255,255,0.7)",
                        transition: "color 0.3s, transform 0.3s",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.color =
                          "var(--color-brand-light)";
                        (e.currentTarget as HTMLElement).style.transform =
                          "scale(1.15)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color =
                          "rgba(255,255,255,0.7)";
                        (e.currentTarget as HTMLElement).style.transform =
                          "scale(1)";
                      }}
                    >
                      {social.icon}
                    </div>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.6)",
                        transition: "color 0.3s",
                      }}
                    >
                      {social.name}
                    </span>
                  </a>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ Footer ═══════════════ */}
      <footer className="footer" role="contentinfo">
        <div className="footer-inner">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <Link
              href="/"
              className="footer-brand"
              style={{ textDecoration: "none" }}
            >
              ИНТЕРФУД
            </Link>
            <div
              style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}
            >
              <Link
                href="/menu"
                style={{
                  color: "rgba(255,255,255,0.45)",
                  textDecoration: "none",
                  fontSize: "0.85rem",
                }}
              >
                Меню
              </Link>
              <Link
                href="/wedding"
                style={{
                  color: "rgba(255,255,255,0.45)",
                  textDecoration: "none",
                  fontSize: "0.85rem",
                }}
              >
                Свадьбы
              </Link>
              <Link
                href="/corporate"
                style={{
                  color: "rgba(255,255,255,0.45)",
                  textDecoration: "none",
                  fontSize: "0.85rem",
                }}
              >
                Корпоратив
              </Link>
              <Link
                href="/about"
                style={{
                  color: "rgba(255,255,255,0.45)",
                  textDecoration: "none",
                  fontSize: "0.85rem",
                }}
              >
                О нас
              </Link>
              <Link
                href="/reviews"
                style={{
                  color: "rgba(255,255,255,0.45)",
                  textDecoration: "none",
                  fontSize: "0.85rem",
                }}
              >
                Отзывы
              </Link>
              <Link
                href="/contacts"
                style={{
                  color: "rgba(255,255,255,0.45)",
                  textDecoration: "none",
                  fontSize: "0.85rem",
                }}
              >
                Контакты
              </Link>
              <Link
                href="/"
                style={{
                  color: "rgba(255,255,255,0.45)",
                  textDecoration: "none",
                  fontSize: "0.85rem",
                }}
              >
                Главная
              </Link>
            </div>
            <div className="footer-copy">
              &copy; 2007–2026 Интерфуд Кейтеринг
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Float */}
      <a
        href="https://wa.me/79119417205?text=Здравствуйте! Хочу узнать подробнее о компании."
        className="wa-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
      >
        &#9742;
      </a>
    </>
  );
}
