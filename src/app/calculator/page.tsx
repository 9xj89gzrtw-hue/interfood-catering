"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import TextReveal from "@/components/TextReveal";
import MagneticButton from "@/components/MagneticButton";
import TiltCard from "@/components/TiltCard";
import FluidBackground from "@/components/FluidBackground";
import KineticText from "@/components/KineticText";
import MorphingBlob from "@/components/MorphingBlob";
import ConfettiButton from "@/components/ConfettiButton";
import ParticleField from "@/components/ParticleField";
import VideoBreak from "@/components/VideoBreak";

/* ═══════════════════════════════════════════════════════════════
   ИНТЕРФУД КЕЙТЕРИНГ — Калькулятор стоимости
   Interactive price calculator with animated count-up
   ═══════════════════════════════════════════════════════════════ */

const IMG = {
  furshet: "/images/food_general.jpg",
  banquet: "/images/furshet_food.jpg",
  coffee: "/images/banket_food1.jpg",
  wedding: "/images/gallery_3.jpg",
  corporate: "/images/wedding.jpg",
  bar: "/images/gallery_4.jpg",
};

/* ─── Data ─── */

const EVENT_TYPES = [
  {
    id: "furshet",
    label: "Фуршет",
    basePrice: 2450,
    img: IMG.furshet,
    desc: "Лёгкие закуски и канапе",
  },
  {
    id: "banquet",
    label: "Банкет",
    basePrice: 4470,
    img: IMG.banquet,
    desc: "Полноценный ужин с подачей",
  },
  {
    id: "coffee",
    label: "Кофе-брейк",
    basePrice: 950,
    img: IMG.coffee,
    desc: "Кофе, выпечка и снеки",
  },
  {
    id: "wedding",
    label: "Свадьба",
    basePrice: 5900,
    img: IMG.wedding,
    desc: "Праздничный банкет с декором",
  },
  {
    id: "corporate",
    label: "Корпоратив",
    basePrice: 3200,
    img: IMG.corporate,
    desc: "Меню для делового мероприятия",
  },
] as const;

const ADDONS = [
  { id: "bar", label: "Бар", pricePerPerson: 1200, isFlat: false, img: IMG.bar },
  { id: "dessert", label: "Десерт", pricePerPerson: 800, isFlat: false },
  { id: "decor", label: "Декор", pricePerPerson: 500, isFlat: false },
  { id: "service", label: "Обслуживание", pricePerPerson: 0, isFlat: false },
  { id: "transport", label: "Транспорт", pricePerPerson: 15000, isFlat: true },
  { id: "dishes", label: "Аренда посуды", pricePerPerson: 300, isFlat: false },
] as const;

const COMPARISON = [
  {
    format: "Фуршет",
    price: "от 2 450 ₽/чел",
    guests: "30–500",
    duration: "3–5 ч",
    features: ["Канапе и закуски", "Фуршетные линии", "Официанты", "Посуда"],
  },
  {
    format: "Банкет",
    price: "от 4 470 ₽/чел",
    guests: "30–300",
    duration: "4–8 ч",
    features: ["Полный ужин", "Индивидуальная подача", "Сомелье", "Декор стола"],
  },
  {
    format: "Кофе-брейк",
    price: "от 950 ₽/чел",
    guests: "20–200",
    duration: "2–3 ч",
    features: ["Кофе и чай", "Выпечка", "Фрукты", "Снеки"],
  },
  {
    format: "Свадьба",
    price: "от 5 900 ₽/чел",
    guests: "50–300",
    duration: "6–12 ч",
    features: ["Банкет + фуршет", "Торт", "Декор", "Координатор"],
  },
  {
    format: "Корпоратив",
    price: "от 3 200 ₽/чел",
    guests: "50–500",
    duration: "4–8 ч",
    features: ["Фуршет + горячее", "Бар", "Обслуживание", "Логистика"],
  },
];

const FAQS = [
  {
    q: "Что входит в базовую стоимость?",
    a: "Базовая стоимость включает: разработку меню, приготовление блюд, доставку, сервировку, одноразовую посуду и работу официантов. Обслуживание уже включено в базовую цену — вы не платите за него дополнительно.",
  },
  {
    q: "Можно ли изменить меню после расчёта?",
    a: "Да, меню можно корректировать вплоть до 3 дней до мероприятия. После согласования финального меню изменения возможны с доплатой. Мы всегда находим гибкое решение для наших клиентов.",
  },
  {
    q: "Как рассчитывается стоимость напитков?",
    a: "Стоимость барного обслуживания рассчитывается отдельно — от 1 200 ₽ на человека. В пакет включены: вино, пиво, крепкий алкоголь, безалкогольные напитки и соки. Мы подбираем ассортимент под формат мероприятия.",
  },
  {
    q: "Есть ли скидки при большом количестве гостей?",
    a: "Да, при количестве гостей от 150 человек действует скидка 5%, от 300 — 8%. Для постоянных клиентов предусмотрена программа лояльности с накопительными скидками до 12%.",
  },
  {
    q: "Что такое «обслуживание включено»?",
    a: "В базовую стоимость уже входит работа официантов (1 официант на 10–15 гостей), поваров на выезде и менеджера мероприятия. Дополнительная оплата за обслуживание не требуется.",
  },
  {
    q: "Сколько стоит доставка за город?",
    a: "Доставка по Санкт-Петербургу бесплатна. За городом — фиксированная сумма 15 000 ₽, включающая логистику туда и обратно, а также аренду термоконтейнеров для сохранения температуры блюд.",
  },
];

/* ─── Animated Price Hook ─── */

function useAnimatedPrice(target: number) {
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 120, damping: 30 });
  const display = useTransform(spring, (v: number) => Math.round(v));
  const [shown, setShown] = useState("0");

  useEffect(() => {
    motionVal.set(target);
  }, [target, motionVal]);

  useEffect(() => {
    const unsub = display.on("change", (v: number) => {
      setShown(v.toLocaleString("ru-RU"));
    });
    return unsub;
  }, [display]);

  return shown;
}

/* ─── Animated Count Hook (for guest count etc.) ─── */

function useAnimatedCount(target: number) {
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 300, damping: 35 });
  const display = useTransform(spring, (v: number) => Math.round(v));
  const [shown, setShown] = useState(String(target));

  useEffect(() => {
    motionVal.set(target);
  }, [target, motionVal]);

  useEffect(() => {
    const unsub = display.on("change", (v: number) => {
      setShown(String(v));
    });
    return unsub;
  }, [display]);

  return shown;
}

/* ─── Reveal Component ─── */

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] as const } },
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

/* ─── FAQ Item ─── */

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      layout
      style={{
        borderBottom: "1px solid var(--color-cream-darker)",
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.5rem 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
        aria-expanded={open}
      >
        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.15rem",
            fontWeight: 400,
            color: "var(--color-dark)",
            maxWidth: "85%",
          }}
        >
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            fontSize: "1.5rem",
            color: "var(--color-brand)",
            flexShrink: 0,
            lineHeight: 1,
          }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] as const }}
          >
            <p
              style={{
                color: "var(--color-text-secondary)",
                fontSize: "0.95rem",
                lineHeight: 1.7,
                paddingBottom: "1.5rem",
                maxWidth: 700,
              }}
            >
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Main Page Component
   ═══════════════════════════════════════════════════════════════ */

export default function CalculatorPage() {
  const [eventType, setEventType] = useState<string>("furshet");
  const [guests, setGuests] = useState<number>(80);
  const [duration, setDuration] = useState<number>(4);
  const [selectedAddons, setSelectedAddons] = useState<Set<string>>(
    new Set(["service"])
  );

  const animatedGuests = useAnimatedCount(guests);
  const animatedDuration = useAnimatedCount(duration);

  /* ─── Calculate Price ─── */
  const getEventTypeData = useCallback(() => {
    return EVENT_TYPES.find((t) => t.id === eventType) || EVENT_TYPES[0];
  }, [eventType]);

  const calculatePrice = useCallback(() => {
    const type = getEventTypeData();
    /* Duration multiplier: base rate covers 4 h; each extra hour adds 15% */
    const durationFactor = 1 + Math.max(0, duration - 4) * 0.15;
    const baseTotal = Math.round(type.basePrice * guests * durationFactor);

    let addonsTotal = 0;
    selectedAddons.forEach((addonId) => {
      const addon = ADDONS.find((a) => a.id === addonId);
      if (addon) {
        if (addon.isFlat) {
          addonsTotal += addon.pricePerPerson;
        } else {
          addonsTotal += Math.round(addon.pricePerPerson * guests * durationFactor);
        }
      }
    });

    return { baseTotal, addonsTotal, total: baseTotal + addonsTotal };
  }, [getEventTypeData, guests, duration, selectedAddons]);

  const priceData = calculatePrice();
  const animatedTotal = useAnimatedPrice(priceData.total);
  const animatedBase = useAnimatedPrice(priceData.baseTotal);
  const animatedAddons = useAnimatedPrice(priceData.addonsTotal);

  /* ─── Toggle Addon ─── */
  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectedType = getEventTypeData();

  return (
    <>
      {/* ─── Hero ─── */}
      <section
        className="hero"
        style={{ minHeight: "60vh", background: "var(--color-cream)", position: "relative", overflow: "hidden" }}
        aria-label="Калькулятор стоимости"
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${IMG.banquet})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.15,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(254,253,251,0.5) 0%, rgba(254,253,251,0.9) 70%, var(--color-warm-white) 100%)",
          }}
        />
        <FluidBackground
          color1="rgba(184,149,90,0.06)"
          color2="rgba(158,182,143,0.04)"
          color3="rgba(232,196,184,0.03)"
          speed={6}
        />
        <ParticleField count={25} speed={0.2} style={{ opacity: 0.5 }} />
        <MorphingBlob
          size={350}
          color1="rgba(184,149,90,0.10)"
          color2="rgba(158,182,143,0.06)"
          opacity={0.5}
          speed={10}
          style={{ position: "absolute", top: "10%", right: "5%", zIndex: 0 }}
        />
        <MorphingBlob
          size={250}
          color1="rgba(232,196,184,0.08)"
          color2="rgba(184,149,90,0.05)"
          opacity={0.4}
          speed={12}
          style={{ position: "absolute", bottom: "15%", left: "3%", zIndex: 0 }}
        />
        <motion.div
          className="hero-content"
          style={{ position: "relative", zIndex: 2 }}
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
            Онлайн-расчёт
          </motion.div>
          <h1 className="sr-only">Калькулятор стоимости</h1>
          <KineticText
            text="Калькулятор стоимости кейтеринга — с гарантией по договору"
            as="h2"
            animation="scale"
            className="hero-title"
            stagger={0.04}
            duration={0.6}
          />
          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            Рассчитайте предварительную стоимость кейтеринга за минуту.
            Выберите формат, укажите количество гостей — и получите цену мгновенно. Никаких скрытых доплат.
          </motion.p>
        </motion.div>
      </section>

      {/* ─── Video Break ─── */}
      <VideoBreak
        src="/videos/hero-catering.mp4"
        title="Рассчитайте ваш праздник"
        subtitle="Точная стоимость за 60 секунд — без скрытых доплат"
      />

      {/* ─── Calculator Section ─── */}
      <section
        className="section section-light"
        aria-label="Калькулятор"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <FluidBackground
          color1="rgba(184,149,90,0.05)"
          color2="rgba(158,182,143,0.03)"
          color3="rgba(232,196,184,0.02)"
          speed={5}
        />
        <ParticleField count={15} speed={0.15} style={{ opacity: 0.35 }} />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <Reveal>
            <span className="section-label">Настройте мероприятие</span>
            <h2 className="section-title">
            text="Найдите <em>формат</em>, который покорит ваших гостей"
            </h2>
          </Reveal>

          {/* Event Type Cards */}
          <motion.div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1.25rem",
              marginTop: "2rem",
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
          >
            {EVENT_TYPES.map((type) => (
              <motion.div
                key={type.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                <TiltCard
                  className="quiz-option"
                  glare={eventType === type.id}
                  maxTilt={6}
                  style={{
                    ...(eventType === type.id
                      ? {
                          borderColor: "var(--color-brand)",
                          background: "var(--color-brand-10)",
                          boxShadow:
                            "0 4px 20px rgba(184,149,90,0.15)",
                        }
                      : {}),
                    padding: 0,
                    overflow: "hidden",
                    cursor: "pointer",
                  }}
                >
                  <div
                    onClick={() => setEventType(type.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      e.key === "Enter" && setEventType(type.id)
                    }
                    aria-pressed={eventType === type.id}
                    style={{ cursor: "pointer" }}
                  >
                    {/* Image */}
                    <div
                      style={{
                        height: 120,
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      <img
                        src={type.img}
                        alt={type.label}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.6s cubic-bezier(0.25,1,0.5,1)",
                        }}
                      />
                      {eventType === type.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          style={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            background: "var(--color-brand)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            fontSize: "0.8rem",
                            fontWeight: 700,
                          }}
                        >
                          ✓
                        </motion.div>
                      )}
                    </div>
                    {/* Content */}
                    <div style={{ padding: "1rem 1.2rem" }}>
                      <h3
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "1.15rem",
                          fontWeight: 400,
                          color: "var(--color-dark)",
                          marginBottom: "0.25rem",
                        }}
                      >
                        {type.label}
                      </h3>
                      <p
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--color-text-muted)",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {type.desc}
                      </p>
                      <div
                        style={{
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          color: "var(--color-brand-dark)",
                        }}
                      >
                        от {type.basePrice.toLocaleString("ru-RU")} ₽/чел
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>

          {/* Sliders Section */}
          <div className="calc-sliders-grid">
            {/* Guest Count */}
            <motion.div
              layout
              style={{
                background: "var(--color-warm-white)",
                borderRadius: 20,
                padding: "2rem",
                boxShadow: "0 4px 30px rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: "1rem",
                }}
              >
                <label
                  htmlFor="guests-slider"
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--color-brand)",
                  }}
                >
                  Количество гостей
                </label>
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "2.5rem",
                    fontWeight: 400,
                    color: "var(--color-dark)",
                    lineHeight: 1,
                  }}
                >
                  {animatedGuests}
                </span>
              </div>
              <input
                id="guests-slider"
                type="range"
                min={20}
                max={500}
                step={5}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="calc-slider"
                aria-label="Количество гостей"
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "0.5rem",
                  fontSize: "0.75rem",
                  color: "var(--color-text-muted)",
                }}
              >
                <span>20</span>
                <span>500</span>
              </div>
            </motion.div>

            {/* Duration */}
            <motion.div
              layout
              style={{
                background: "var(--color-warm-white)",
                borderRadius: 20,
                padding: "2rem",
                boxShadow: "0 4px 30px rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: "1rem",
                }}
              >
                <label
                  htmlFor="duration-slider"
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--color-brand)",
                  }}
                >
                  Длительность
                </label>
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "2.5rem",
                    fontWeight: 400,
                    color: "var(--color-dark)",
                    lineHeight: 1,
                  }}
                >
                  {animatedDuration}
                  <span
                    style={{
                      fontSize: "1rem",
                      color: "var(--color-text-muted)",
                      marginLeft: "0.3rem",
                    }}
                  >
                    ч
                  </span>
                </span>
              </div>
              <input
                id="duration-slider"
                type="range"
                min={2}
                max={12}
                step={1}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="calc-slider"
                aria-label="Длительность мероприятия"
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "0.5rem",
                  fontSize: "0.75rem",
                  color: "var(--color-text-muted)",
                }}
              >
                <span>2 ч</span>
                <span>12 ч</span>
              </div>
            </motion.div>
          </div>

          {/* Additional Options */}
          <Reveal>
            <div style={{ marginTop: "3rem" }}>
              <span
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--color-brand)",
                  display: "block",
                  marginBottom: "1rem",
                }}
              >
                Дополнительные услуги
              </span>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "1rem",
                }}
              >
                {ADDONS.map((addon) => {
                  const isSelected = selectedAddons.has(addon.id);
                  return (
                    <motion.button
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "1rem 1.25rem",
                        background: isSelected
                          ? "var(--color-brand-10)"
                          : "#fff",
                        border: isSelected
                          ? "1.5px solid var(--color-brand)"
                          : "1.5px solid var(--color-cream-darker)",
                        borderRadius: 14,
                        cursor: "pointer",
                        textAlign: "left",
                        transition:
                          "all 0.3s cubic-bezier(0.25,1,0.5,1)",
                        boxShadow: isSelected
                          ? "0 4px 16px rgba(184,149,90,0.12)"
                          : "none",
                      }}
                      aria-pressed={isSelected}
                    >
                      {/* Checkbox indicator */}
                      <div
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: 6,
                          border: isSelected
                            ? "2px solid var(--color-brand)"
                            : "2px solid var(--color-cream-darker)",
                          background: isSelected
                            ? "var(--color-brand)"
                            : "transparent",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          transition: "all 0.3s",
                        }}
                      >
                        {isSelected && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            style={{
                              color: "#fff",
                              fontSize: "0.7rem",
                              fontWeight: 700,
                            }}
                          >
                            ✓
                          </motion.span>
                        )}
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: "0.9rem",
                            fontWeight: 500,
                            color: "var(--color-dark)",
                          }}
                        >
                          {addon.label}
                        </div>
                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--color-text-muted)",
                            marginTop: 2,
                          }}
                        >
                          {addon.pricePerPerson === 0
                            ? "Включено"
                            : addon.isFlat
                            ? `+${addon.pricePerPerson.toLocaleString("ru-RU")} ₽`
                            : `+${addon.pricePerPerson.toLocaleString("ru-RU")} ₽/чел`}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* ─── Live Price Display ─── */}
          <Reveal>
            <motion.div
              layout
              style={{
                marginTop: "3rem",
                background:
                  "linear-gradient(135deg, var(--color-dark) 0%, var(--color-navy) 100%)",
                borderRadius: 24,
                padding: "3rem",
                color: "#fff",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Decorative circles */}
              <div
                style={{
                  position: "absolute",
                  top: -60,
                  right: -60,
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(184,149,90,0.15) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: -40,
                  left: -40,
                  width: 150,
                  height: 150,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(184,149,90,0.1) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />

              <div
                className="calc-price-grid"
                style={{ position: "relative", zIndex: 1 }}
              >
                {/* Left: Breakdown */}
                <div>
                  <span
                    style={{
                      fontSize: "0.65rem",
                      fontWeight: 600,
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "var(--color-brand-light)",
                    }}
                  >
                    Предварительная стоимость
                  </span>

                  <div style={{ marginTop: "2rem" }}>
                    {/* Base price line */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingBottom: "1rem",
                        borderBottom: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>
                        {selectedType.label} × {guests} гостей × {duration} ч
                      </span>
                      <span style={{ color: "#fff", fontWeight: 500, fontSize: "1rem" }}>
                        {animatedBase} ₽
                      </span>
                    </div>

                    {/* Addons breakdown */}
                    <AnimatePresence mode="popLayout">
                      {ADDONS.filter((a) => selectedAddons.has(a.id)).map(
                        (addon) => (
                          <motion.div
                            key={addon.id}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "0.75rem 0",
                              borderBottom: "1px solid rgba(255,255,255,0.05)",
                              overflow: "hidden",
                            }}
                          >
                            <span
                              style={{
                                color: "rgba(255,255,255,0.5)",
                                fontSize: "0.85rem",
                              }}
                            >
                              {addon.label}
                              {addon.pricePerPerson === 0
                                ? ""
                                : addon.isFlat
                                ? ""
                                : ` × ${guests}`}
                            </span>
                            <span
                              style={{
                                color: "rgba(255,255,255,0.8)",
                                fontSize: "0.9rem",
                              }}
                            >
                              {addon.pricePerPerson === 0
                                ? "Включено"
                                : addon.isFlat
                                ? `+${addon.pricePerPerson.toLocaleString("ru-RU")} ₽`
                                : `+${(
                                    addon.pricePerPerson * guests
                                  ).toLocaleString("ru-RU")} ₽`}
                            </span>
                          </motion.div>
                        )
                      )}
                    </AnimatePresence>

                    {/* Total line */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingTop: "1.25rem",
                        marginTop: "0.5rem",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.7rem",
                          fontWeight: 600,
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "var(--color-brand-light)",
                        }}
                      >
                        Итого
                      </span>
                      <span
                        style={{
                          color: "rgba(255,255,255,0.5)",
                          fontSize: "0.85rem",
                        }}
                      >
                        {animatedAddons} ₽ доп. услуг
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Total */}
                <div
                  style={{
                    textAlign: "right",
                    minWidth: 220,
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.65rem",
                      fontWeight: 600,
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.4)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Итого
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(2.5rem, 5vw, 4rem)",
                      fontWeight: 400,
                      color: "#fff",
                      lineHeight: 1.1,
                    }}
                  >
                    {animatedTotal}{" "}
                    <span style={{ fontSize: "0.5em" }}>₽</span>
                  </div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "rgba(255,255,255,0.4)",
                      marginTop: "0.5rem",
                    }}
                  >
                    ≈{" "}
                    {Math.round(
                      priceData.total / guests
                    ).toLocaleString("ru-RU")}{" "}
                    ₽/чел
                  </div>
                  <div
                    style={{
                      fontSize: "0.7rem",
                      color: "rgba(255,255,255,0.3)",
                      marginTop: "0.75rem",
                      lineHeight: 1.5,
                      maxWidth: 220,
                      marginLeft: "auto",
                    }}
                  >
                    В базу: меню, готовка, доставка, сервировка, официанты (1 на 10–15 гостей), уборка
                  </div>
                </div>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* ─── Comparison Table ─── */}
      <section
        className="section section-cream"
        aria-label="Сравнение форматов"
      >
        <div className="container">
          <Reveal>
            <span className="section-label">Сравнение форматов</span>
            <h2 className="section-title">
            text="Сравните форматы и цены — выберите лучший для вашего мероприятия"
            </h2>
            <p className="section-subtitle">
              Каждый формат имеет свои преимущества. Сравните цены и возможности,
              чтобы выбрать лучший вариант для вашего мероприятия.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div
              style={{
                overflowX: "auto",
                marginTop: "2rem",
                borderRadius: 20,
                boxShadow: "0 4px 30px rgba(0,0,0,0.06)",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  background: "var(--color-warm-white)",
                  borderRadius: 20,
                  overflow: "hidden",
                  minWidth: 700,
                }}
              >
                <thead>
                  <tr
                    style={{
                      background:
                        "linear-gradient(135deg, var(--color-dark) 0%, var(--color-navy) 100%)",
                    }}
                  >
                    <th
                      style={{
                        padding: "1.25rem 1.5rem",
                        textAlign: "left",
                        color: "rgba(255,255,255,0.5)",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                      }}
                    >
                      Формат
                    </th>
                    <th
                      style={{
                        padding: "1.25rem 1.5rem",
                        textAlign: "left",
                        color: "rgba(255,255,255,0.5)",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                      }}
                    >
                      Стоимость
                    </th>
                    <th
                      style={{
                        padding: "1.25rem 1.5rem",
                        textAlign: "center",
                        color: "rgba(255,255,255,0.5)",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                      }}
                    >
                      Гости
                    </th>
                    <th
                      style={{
                        padding: "1.25rem 1.5rem",
                        textAlign: "center",
                        color: "rgba(255,255,255,0.5)",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                      }}
                    >
                      Длительность
                    </th>
                    <th
                      style={{
                        padding: "1.25rem 1.5rem",
                        textAlign: "left",
                        color: "rgba(255,255,255,0.5)",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                      }}
                    >
                      Что входит
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row, i) => (
                    <tr
                      key={row.format}
                      style={{
                        borderBottom:
                          i < COMPARISON.length - 1
                            ? "1px solid var(--color-cream-darker)"
                            : "none",
                        transition: "background 0.3s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background =
                          "var(--color-brand-10)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      <td
                        style={{
                          padding: "1.25rem 1.5rem",
                          fontFamily: "var(--font-serif)",
                          fontSize: "1.1rem",
                          fontWeight: 400,
                          color: "var(--color-dark)",
                        }}
                      >
                        {row.format}
                      </td>
                      <td
                        style={{
                          padding: "1.25rem 1.5rem",
                          fontWeight: 600,
                          color: "var(--color-brand-dark)",
                          fontSize: "0.95rem",
                        }}
                      >
                        {row.price}
                      </td>
                      <td
                        style={{
                          padding: "1.25rem 1.5rem",
                          textAlign: "center",
                          color: "var(--color-text-secondary)",
                          fontSize: "0.9rem",
                        }}
                      >
                        {row.guests}
                      </td>
                      <td
                        style={{
                          padding: "1.25rem 1.5rem",
                          textAlign: "center",
                          color: "var(--color-text-secondary)",
                          fontSize: "0.9rem",
                        }}
                      >
                        {row.duration}
                      </td>
                      <td
                        style={{
                          padding: "1.25rem 1.5rem",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "0.4rem",
                          }}
                        >
                          {row.features.map((f) => (
                            <span
                              key={f}
                              style={{
                                display: "inline-block",
                                padding: "0.25rem 0.6rem",
                                background: "var(--color-cream)",
                                borderRadius: 100,
                                fontSize: "0.72rem",
                                color: "var(--color-text-secondary)",
                              }}
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section
        className="section section-light"
        aria-label="Вопросы и ответы"
      >
        <div className="container">
          <Reveal>
            <span className="section-label">Вопросы и ответы</span>
            <h2 className="section-title">
            text="Часто задаваемые <em>вопросы</em> о стоимости и гарантиях"
            </h2>
            <p className="section-subtitle">
              Узнайте больше о формировании стоимости, гарантиях и условиях работы.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div style={{ marginTop: "2rem", maxWidth: 800 }}>
              {FAQS.map((faq) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section
        className="section section-brand"
        aria-label="Получить точный расчёт"
        style={{ textAlign: "center" }}
      >
        <div className="container">
          <Reveal>
            <span
              style={{
                fontSize: "0.65rem",
                fontWeight: 600,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.6)",
                display: "block",
                marginBottom: "1rem",
              }}
            >
              Готовы заказать?
            </span>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 400,
                color: "#fff",
                lineHeight: 1.15,
                marginBottom: "1.5rem",
              }}
            >
            text="Получите <em>точный</em> расчёт — с гарантией по договору"
            </h2>
            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.75)",
                maxWidth: 500,
                margin: "0 auto 2.5rem",
              }}
            >
              Онлайн-калькулятор показывает предварительную стоимость. Для
              точного расчёта свяжитесь с нами — мы учтём все нюансы вашего
              мероприятия и зафиксируем цену в договоре.
            </p>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <ConfettiButton
                className="btn-gold"
                style={{ background: "var(--color-warm-white)", color: "var(--color-brand-dark)", padding: "1rem 2.5rem", borderRadius: "100px", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.05em", border: "none", cursor: "pointer" }}
                onClick={() => {
                  const eventType = selectedType?.label || "кейтеринг";
                  const msg = `Здравствуйте! Рассчитал(а) стоимость на сайте: ${eventType}, ${guests} гостей — ~${priceData.total.toLocaleString("ru-RU")} ₽. Хочу получить точный расчёт!`;
                  window.open(`https://wa.me/79119417205?text=${encodeURIComponent(msg)}`, "_blank");
                }}
              >
                Получить точный расчёт
              </ConfettiButton>
              <MagneticButton as="a" href="tel:+78129195911" strength={0.2}>
                <span className="btn-outline" style={{ borderColor: "rgba(255,255,255,0.4)", color: "#fff" }}>
                  +7 (812) 919-59-11
                </span>
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="footer" role="contentinfo">
        <div className="container">
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
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.5rem",
                fontWeight: 500,
                color: "#fff",
                textDecoration: "none",
                letterSpacing: "0.15em",
              }}
            >
              ИНТЕРФУД
            </Link>
            <div
              style={{
                display: "flex",
                gap: "1.5rem",
                flexWrap: "wrap",
              }}
            >
              {[
                { label: "Меню", href: "/menu" },
                { label: "Свадьбы", href: "/wedding" },
                { label: "Корпоратив", href: "/corporate" },
                { label: "О нас", href: "/about" },
                { label: "Отзывы", href: "/reviews" },
                { label: "Калькулятор", href: "/calculator" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    color: "rgba(255,255,255,0.45)",
                    textDecoration: "none",
                    fontSize: "0.85rem",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.3)",
                fontSize: "0.8rem",
              }}
            >
              &copy; 2007–2026 Интерфуд Кейтеринг
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp */}
      <a
        href="https://wa.me/79119417205?text=Здравствуйте! Хочу рассчитать стоимость кейтеринга."
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
