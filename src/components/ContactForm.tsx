"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   ContactForm — Multi-step lead capture form with:
   - 2-step progressive disclosure (less friction)
   - Lead qualification (event type + date = hot lead)
   - Urgency messaging ("Ответим за 30 минут")
   - Social proof near form
   - Phone auto-formatting
   - Accessible, mobile-optimized
   - Premium success state with next action
   ═══════════════════════════════════════════════════════════════ */

interface FormData {
  name: string;
  phone: string;
  email: string;
  eventType: string;
  guests: string;
  date: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

interface ContactFormProps {
  source?: string;
  compact?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const EVENT_TYPES = [
  { value: "", label: "Выберите тип мероприятия" },
  { value: "wedding", label: "💒 Свадьба" },
  { value: "corporate", label: "🏢 Корпоратив" },
  { value: "banquet", label: "🍽 Банкет" },
  { value: "furshet", label: "🥂 Фуршет" },
  { value: "coffee", label: "☕ Кофе-брейк" },
  { value: "birthday", label: "🎂 День рождения" },
  { value: "jubilee", label: "🎉 Юбилей" },
  { value: "outdoor", label: "🏕 Выездное мероприятие" },
  { value: "other", label: "✨ Другое" },
];

/* ─── Phone formatter ─── */
function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 0) return "";
  if (digits.length <= 1) return "+7";
  if (digits.length <= 4) return `+7 (${digits.slice(1)}`;
  if (digits.length <= 7)
    return `+7 (${digits.slice(1, 4)}) ${digits.slice(4)}`;
  if (digits.length <= 9)
    return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`;
}

export default function ContactForm({
  source = "website",
  compact = false,
  className,
  style,
}: ContactFormProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    eventType: "",
    guests: "",
    date: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  /* ─── Handlers ─── */
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setForm((f) => ({ ...f, phone: formatPhone(value) }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  /* ─── Validate step 1 ─── */
  const validateStep1 = (): FormErrors => {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = "Введите ваше имя";
    if (!form.phone.trim()) {
      errs.phone = "Введите номер телефона";
    } else {
      const phoneClean = form.phone.replace(/[\s\-()]/g, "");
      if (!/^(\+7|7|8)\d{10}$/.test(phoneClean)) {
        errs.phone = "Введите корректный номер";
      }
    }
    return errs;
  };

  /* ─── Validate step 2 ─── */
  const validateStep2 = (): FormErrors => {
    const errs: FormErrors = {};
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Введите корректный email";
    }
    return errs;
  };

  /* ─── Next step ─── */
  const handleNext = () => {
    const errs = validateStep1();
    setErrors(errs);
    if (Object.keys(errs).length === 0) setStep(2);
  };

  /* ─── Submit ─── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = { ...validateStep1(), ...validateStep2() };
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim() || undefined,
          eventType: form.eventType || undefined,
          date: form.date || undefined,
          guests: form.guests ? parseInt(form.guests, 10) : undefined,
          message: form.message.trim() || undefined,
          source,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setErrors({ form: "Ошибка отправки. Попробуйте ещё раз." });
      }
    } catch {
      setErrors({ form: "Ошибка сети. Попробуйте ещё раз." });
    } finally {
      setSubmitting(false);
    }
  };

  /* ─── Styles ─── */
  const inputStyle = (hasError: boolean): React.CSSProperties => ({
    width: "100%",
    padding: "0.85rem 1rem",
    border: `1.5px solid ${hasError ? "#e53e3e" : "var(--color-cream-darker)"}`,
    borderRadius: "12px",
    fontSize: "max(16px, 0.9rem)",
    fontFamily: "var(--font-sans)",
    background: hasError ? "rgba(229,62,62,0.04)" : "var(--color-warm-white)",
    outline: "none",
    transition: "border-color 0.3s, background 0.3s, box-shadow 0.3s",
    minHeight: "48px", // Touch target
  });

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.7rem",
    fontWeight: 600,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "var(--color-dark)",
    marginBottom: "0.5rem",
  };

  const errorStyle: React.CSSProperties = {
    color: "#e53e3e",
    fontSize: "0.75rem",
    marginTop: "0.35rem",
    display: "block",
  };

  /* ─── Success state — premium with next action ─── */
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={className}
        style={{
          textAlign: "center",
          padding: "3rem 2rem",
          background: "#fff",
          borderRadius: "20px",
          boxShadow: "0 4px 40px rgba(0,0,0,0.06)",
          ...style,
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
          style={{
            width: 56, height: 56, borderRadius: "50%",
            background: "var(--color-brand-8)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 1.25rem",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </motion.div>
        <h3
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.6rem",
            fontWeight: 400,
            color: "var(--color-dark)",
            marginBottom: "0.5rem",
          }}
        >
          Заявка принята!
        </h3>
        <p
          style={{
            fontSize: "0.9rem",
            color: "#666",
            lineHeight: 1.6,
            maxWidth: "400px",
            margin: "0 auto 1.5rem",
          }}
        >
          Мы свяжемся с вами в течение <strong style={{ color: "var(--color-brand)" }}>30 минут</strong> в рабочее время.
          Персональный менеджер подберёт лучшее решение для вашего мероприятия.
        </p>
        {/* Next action CTAs to keep user engaged */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: 280, margin: "0 auto" }}>
          <a
            href="/calculator"
            style={{
              display: "block",
              padding: "0.75rem",
              background: "var(--color-brand-8)",
              color: "var(--color-brand-dark)",
              borderRadius: 12,
              fontSize: "0.8rem",
              fontWeight: 600,
              fontFamily: "var(--font-sans)",
              textDecoration: "none",
              letterSpacing: "0.05em",
              transition: "background 0.3s",
            }}
          >
            Рассчитать стоимость →
          </a>
          <a
            href="/menu"
            style={{
              display: "block",
              padding: "0.75rem",
              background: "transparent",
              color: "var(--color-text-muted)",
              borderRadius: 12,
              fontSize: "0.8rem",
              fontWeight: 500,
              fontFamily: "var(--font-sans)",
              textDecoration: "none",
              letterSpacing: "0.02em",
              transition: "color 0.3s",
            }}
          >
            Посмотреть меню
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <div
      className={className}
      style={{
        background: "#fff",
        borderRadius: "20px",
        boxShadow: "0 4px 40px rgba(0,0,0,0.06)",
        overflow: "hidden",
        ...style,
      }}
    >
      {/* Header with urgency + social proof */}
      <div
        style={{
          background: "linear-gradient(135deg, #1A1A1A 0%, #2A2520 100%)",
          padding: compact ? "1.25rem 1.5rem" : "1.75rem 2rem",
          textAlign: "center",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: compact ? "1.2rem" : "1.5rem",
            fontWeight: 400,
            color: "#fff",
            marginBottom: "0.5rem",
          }}
        >
          Получить предложение
        </h3>
        {/* Urgency + Social Proof */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.6)",
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
            }}
          >
            ⚡ Ответим за 30 минут
          </span>
          <span
            style={{
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.6)",
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
            }}
          >
            🎉 3 500+ мероприятий
          </span>
          <span
            style={{
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.6)",
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
            }}
          >
            ⭐ 10/10 Restoclub · 4.55/5 CaterMe
          </span>
        </div>
      </div>

      {/* Progress indicator */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "1rem 2rem",
          gap: "0.75rem",
          borderBottom: "1px solid var(--color-cream-darker)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            flex: 1,
          }}
        >
          {[1, 2].map((s) => (
            <div
              key={s}
              style={{
                height: 3,
                flex: 1,
                borderRadius: 2,
                background:
                  step >= s
                    ? "var(--color-brand)"
                    : "var(--color-cream-darker)",
                transition: "background 0.4s",
              }}
            />
          ))}
        </div>
        <span
          style={{
            fontSize: "0.7rem",
            color: "#999",
            fontFamily: "var(--font-sans)",
            whiteSpace: "nowrap",
          }}
        >
          Шаг {step} из 2
        </span>
      </div>

      {/* Form body */}
      <form
        onSubmit={handleSubmit}
        style={{ padding: compact ? "1.25rem 1.5rem" : "1.75rem 2rem" }}
      >
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              {/* Name */}
              <div>
                <label htmlFor="cf-name" style={labelStyle}>
                  Имя <span style={{ color: "#e53e3e" }}>*</span>
                </label>
                <input
                  id="cf-name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Ваше имя"
                  autoComplete="name"
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "cf-name-error" : undefined}
                  style={inputStyle(!!errors.name)}
                  onFocus={(e) => { e.target.style.borderColor = "var(--color-brand)"; e.target.style.boxShadow = "0 0 0 3px var(--color-brand-8)"; }}
                  onBlur={(e) => { e.target.style.borderColor = errors.name ? "#e53e3e" : "var(--color-cream-darker)"; e.target.style.boxShadow = "none"; }}
                />
                {errors.name && (
                  <span id="cf-name-error" role="alert" style={errorStyle}>{errors.name}</span>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="cf-phone" style={labelStyle}>
                  Телефон <span style={{ color: "#e53e3e" }}>*</span>
                </label>
                <input
                  id="cf-phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+7 (___) ___-__-__"
                  autoComplete="tel"
                  aria-required="true"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "cf-phone-error" : undefined}
                  style={inputStyle(!!errors.phone)}
                  onFocus={(e) => { e.target.style.borderColor = "var(--color-brand)"; e.target.style.boxShadow = "0 0 0 3px var(--color-brand-8)"; }}
                  onBlur={(e) => { e.target.style.borderColor = errors.phone ? "#e53e3e" : "var(--color-cream-darker)"; e.target.style.boxShadow = "none"; }}
                />
                {errors.phone && (
                  <span id="cf-phone-error" role="alert" style={errorStyle}>{errors.phone}</span>
                )}
              </div>

              {/* Next button */}
              <button
                type="button"
                onClick={handleNext}
                style={{
                  width: "100%",
                  padding: "0.9rem",
                  background:
                    "linear-gradient(135deg, #B8955A 0%, #9A7B45 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  fontFamily: "var(--font-sans)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  boxShadow: "0 4px 20px rgba(184,149,90,0.3)",
                  minHeight: "52px",
                }}
              >
                Далее — расскажите о мероприятии →
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              {/* Event Type - Lead Qualification */}
              <div>
                <label htmlFor="cf-eventType" style={labelStyle}>
                  Тип мероприятия
                </label>
                <select
                  id="cf-eventType"
                  name="eventType"
                  value={form.eventType}
                  onChange={handleChange}
                  style={{
                    ...inputStyle(false),
                    appearance: "none",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23999' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                    paddingRight: "2.5rem",
                  }}
                >
                  {EVENT_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date + Guests row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                }}
              >
                <div>
                  <label htmlFor="cf-date" style={labelStyle}>
                    Дата
                  </label>
                  <input
                    id="cf-date"
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={handleChange}
                    style={inputStyle(false)}
                  />
                </div>
                <div>
                  <label htmlFor="cf-guests" style={labelStyle}>
                    Гости
                  </label>
                  <input
                    id="cf-guests"
                    name="guests"
                    type="number"
                    min="1"
                    value={form.guests}
                    onChange={handleChange}
                    placeholder="50"
                    style={inputStyle(!!errors.guests)}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="cf-email" style={labelStyle}>
                  Email
                </label>
                <input
                  id="cf-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "cf-email-error" : undefined}
                  style={inputStyle(!!errors.email)}
                  onFocus={(e) => { e.target.style.borderColor = "var(--color-brand)"; e.target.style.boxShadow = "0 0 0 3px var(--color-brand-8)"; }}
                  onBlur={(e) => { e.target.style.borderColor = errors.email ? "#e53e3e" : "var(--color-cream-darker)"; e.target.style.boxShadow = "none"; }}
                />
                {errors.email && (
                  <span id="cf-email-error" role="alert" style={errorStyle}>{errors.email}</span>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="cf-message" style={labelStyle}>
                  Пожелания
                </label>
                <textarea
                  id="cf-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Расскажите о вашем мероприятии..."
                  rows={3}
                  style={{
                    ...inputStyle(false),
                    resize: "vertical",
                    minHeight: "80px",
                  }}
                />
              </div>

              {errors.form && (
                <div
                  style={{
                    background: "rgba(229,62,62,0.06)",
                    padding: "0.75rem",
                    borderRadius: "8px",
                    color: "#e53e3e",
                    fontSize: "0.85rem",
                    textAlign: "center",
                  }}
                >
                  {errors.form}
                </div>
              )}

              {/* Actions */}
              <div
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  alignItems: "center",
                }}
              >
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  style={{
                    padding: "0.9rem 1.25rem",
                    background: "transparent",
                    color: "var(--color-dark)",
                    border: "1.5px solid var(--color-cream-darker)",
                    borderRadius: "12px",
                    fontSize: "0.8rem",
                    fontFamily: "var(--font-sans)",
                    cursor: "pointer",
                    transition: "border-color 0.2s",
                    minHeight: "52px",
                  }}
                >
                  ← Назад
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    flex: 1,
                    padding: "0.9rem",
                    background: submitting
                      ? "#ccc"
                      : "linear-gradient(135deg, #B8955A 0%, #9A7B45 100%)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "12px",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    fontFamily: "var(--font-sans)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    cursor: submitting ? "not-allowed" : "pointer",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    boxShadow: "0 4px 20px rgba(184,149,90,0.3)",
                    minHeight: "52px",
                  }}
                >
                  {submitting ? "Отправляем..." : "Получить предложение"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Privacy note — reduces friction */}
        <p
          style={{
            fontSize: "0.7rem",
            color: "#aaa",
            textAlign: "center",
            marginTop: "1rem",
            lineHeight: 1.4,
          }}
        >
          🔒 Ваши данные защищены. Мы не передаём информацию третьим лицам.
          Также вы можете написать нам в WhatsApp: +7 (911) 941-72-05 или Telegram.
        </p>
      </form>
    </div>
  );
}
