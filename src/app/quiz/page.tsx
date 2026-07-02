"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import MagneticButton from "@/components/MagneticButton";
import CountUp from "@/components/CountUp";
import FluidBackground from "@/components/FluidBackground";
import MorphingBlob from "@/components/MorphingBlob";
import KineticText from "@/components/KineticText";
import ConfettiButton from "@/components/ConfettiButton";
import ParticleField from "@/components/ParticleField";
import LottiePlaceholder from "@/components/LottiePlaceholder";

/* ═══════════════════════════════════════════════════════════════
   ИНТЕРФУД КЕЙТЕРИНГ — Interactive Quiz Page
   5-step quiz → personalised catering recommendation
   ═══════════════════════════════════════════════════════════════ */

/* ─── Quiz step data ─── */
interface QuizOption {
  label: string;
  value: string;
  icon?: string;
}

interface QuizStep {
  question: string;
  subtitle: string;
  options: QuizOption[];
}

const STEPS: QuizStep[] = [
  {
    question: "Какой тип мероприятия?",
    subtitle: "Выберите тип вашего события",
    options: [
      { label: "Свадьба", value: "wedding", icon: "💒" },
      { label: "Корпоратив", value: "corporate", icon: "🏢" },
      { label: "День рождения", value: "birthday", icon: "🎂" },
      { label: "Юбилей", value: "anniversary", icon: "🍾" },
      { label: "Выпускной", value: "graduation", icon: "🎓" },
      { label: "Другое", value: "other", icon: "✨" },
    ],
  },
  {
    question: "Сколько гостей ожидается?",
    subtitle: "Примерное количество приглашённых",
    options: [
      { label: "До 30", value: "0-30", icon: "👫" },
      { label: "30–50", value: "30-50", icon: "👨‍👩‍👧‍👦" },
      { label: "50–100", value: "50-100", icon: "🎉" },
      { label: "100–200", value: "100-200", icon: "🎪" },
      { label: "200+", value: "200+", icon: "🏛" },
    ],
  },
  {
    question: "Какой формат предпочитаете?",
    subtitle: "Как вам видится подача блюд",
    options: [
      { label: "Фуршет", value: "furshet", icon: "🥂" },
      { label: "Банкет", value: "banquet", icon: "🍽" },
      { label: "Кофе-брейк", value: "coffeebreak", icon: "☕" },
      { label: "Шведский стол", value: "buffet", icon: "🍗" },
      { label: "Не уверен", value: "unsure", icon: "🤔" },
    ],
  },
  {
    question: "Что для вас важнее?",
    subtitle: "Выберите главный приоритет",
    options: [
      { label: "Вкусная еда", value: "taste", icon: "👨‍🍳" },
      { label: "Красивая подача", value: "presentation", icon: "✨" },
      { label: "Разнообразие", value: "variety", icon: "🌮" },
      { label: "Бюджет", value: "budget", icon: "💰" },
      { label: "Сервис", value: "service", icon: "🤵" },
    ],
  },
  {
    question: "Ваш бюджет на человека?",
    subtitle: "Ориентировочная сумма на одного гостя",
    options: [
      { label: "До 2 000 ₽", value: "0-2000", icon: "💵" },
      { label: "2 000–4 000 ₽", value: "2000-4000", icon: "💰" },
      { label: "4 000–7 000 ₽", value: "4000-7000", icon: "💎" },
      { label: "7 000+ ₽", value: "7000+", icon: "👑" },
    ],
  },
];

/* ─── Recommendation logic ─── */
interface Recommendation {
  title: string;
  priceRange: string;
  description: string;
  features: string[];
  icon: string;
}

function getRecommendation(answers: Record<number, string>): Recommendation {
  const eventType = answers[0] ?? "";
  const guestCount = answers[1] ?? "";
  const format = answers[2] ?? "";
  const priority = answers[3] ?? "";
  const budget = answers[4] ?? "";

  // Wedding + 50+ guests + banquet
  if (
    eventType === "wedding" &&
    (guestCount === "50-100" || guestCount === "100-200" || guestCount === "200+") &&
    format === "banquet"
  ) {
    return {
      title: "Свадебный банкет",
      priceRange: "6 500 – 14 500 ₽/чел",
      description:
        "Роскошный свадебный банкет с авторским меню, шампанской пирамидой и персональным менеджером. Каждое блюдо — произведение кулинарного искусства, а обслуживание на высочайшем уровне создаст незабываемую атмосферу вашего праздника.",
      features: [
        "Авторское меню из 12–18 позиций",
        "Шампанская пирамида",
        "Персональный кейтеринг-менеджер",
        "Декор и цветочные композиции",
        "1 официант на 8 гостей",
        "Welcome-дринк при встрече",
      ],
      icon: "💒",
    };
  }

  // Corporate + 100+
  if (
    eventType === "corporate" &&
    (guestCount === "100-200" || guestCount === "200+")
  ) {
    return {
      title: "Корпоративный фуршет",
      priceRange: "3 000 – 7 000 ₽/чел",
      description:
        "Элегантный фуршетный формат для масштабного корпоратива. Гости свободно общаются, пробуют изысканные закуски и наслаждаются профессиональным обслуживанием. Идеально для нетворкинга и праздничной атмосферы.",
      features: [
        "Фуршетное меню из 15–20 позиций",
        "Коктейльная зона",
        "Живые станции с готовкой",
        "Профессиональный бар",
        "Координация по таймлайну",
        "Брендирование блюд",
      ],
      icon: "🏢",
    };
  }

  // Birthday + 30-50 + budget priority
  if (
    eventType === "birthday" &&
    (guestCount === "30-50" || guestCount === "0-30") &&
    (priority === "budget" || budget === "0-2000" || budget === "2000-4000")
  ) {
    return {
      title: "Фуршет",
      priceRange: "2 000 – 4 500 ₽/чел",
      description:
        "Лёгкий и стильный фуршет — идеальный выбор для дня рождения в кругу друзей и близких. Разнообразные закуски, канапе и десерты создадут праздничную атмосферу без лишних формальностей.",
      features: [
        "Фуршетное меню из 10–15 позиций",
        "Канапе и тарталетки",
        "Десертная станция",
        "Безалкогольные напитки",
        "Сервировка и текстиль",
        "Меню для аллергиков",
      ],
      icon: "🥂",
    };
  }

  // Coffee-break selected
  if (format === "coffeebreak") {
    return {
      title: "Кофе-брейк",
      priceRange: "1 500 – 3 500 ₽/чел",
      description:
        "Компактный и уютный формат для деловых встреч, конференций и презентаций. Свежая выпечка, ароматный кофе и лёгкие закуски поддержат работоспособность и создадят комфортную атмосферу.",
      features: [
        "Кофе и чайная станция",
        "Свежая выпечка и круассаны",
        "Лёгкие закуски и снеки",
        "Фруктовые тарелки",
        "Сок и вода",
        "Сервировка на 2 перерыва",
      ],
      icon: "☕",
    };
  }

  // Default: Фуршет
  return {
    title: "Фуршет",
    priceRange: "2 500 – 6 000 ₽/чел",
    description:
      "Универсальный и элегантный формат, который подходит для любого мероприятия. Гости свободно перемещаются, общаются и наслаждаются разнообразными закусками. Самый популярный выбор наших клиентов.",
    features: [
      "Фуршетное меню из 12–18 позиций",
      "Канапе, тарталетки, брускетты",
      "Десертная станция",
      "Коктейльная зона",
      "Профессиональные официанты",
      "Сервировка и декор",
    ],
    icon: "🥂",
  };
}

/* ─── Animation variants ─── */
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 80 : -80,
    opacity: 0,
  }),
};

const optionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.06, duration: 0.45, ease: [0.4, 0, 0.2, 1] },
  }),
};

const resultVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

/* ─── Quiz Page ─── */
export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [direction, setDirection] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [contactForm, setContactForm] = useState({ name: "", phone: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const quizContainerRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const totalSteps = STEPS.length;
  const isLastStep = currentStep === totalSteps - 1;
  const hasAnswer = answers[currentStep] !== undefined;

  /* Toast auto-dismiss */
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  /* Focus trap & keyboard navigation */
  useEffect(() => {
    if (showResults) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const step = STEPS[currentStep];
      if (!step) return;
      const maxIdx = step.options.length - 1;

      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        setFocusedIndex((prev) => (prev < maxIdx ? prev + 1 : 0));
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : maxIdx));
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        selectOption(step.options[focusedIndex].value);
      } else if (e.key === "Tab") {
        // Focus trap: keep Tab within quiz options
        if (!e.shiftKey && focusedIndex === maxIdx) {
          e.preventDefault();
          setFocusedIndex(0);
        } else if (e.shiftKey && focusedIndex === 0) {
          e.preventDefault();
          setFocusedIndex(maxIdx);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStep, focusedIndex, showResults]);

  /* Focus the option button when focusedIndex changes */
  useEffect(() => {
    const el = optionsRef.current[focusedIndex];
    if (el && !showResults) {
      el.focus();
    }
  }, [focusedIndex, currentStep, showResults]);

  /* Reset focusedIndex when step changes */
  useEffect(() => {
    setFocusedIndex(0);
    optionsRef.current = [];
  }, [currentStep]);

  const selectOption = useCallback(
    (value: string) => {
      setAnswers((prev) => ({ ...prev, [currentStep]: value }));
    },
    [currentStep]
  );

  const goNext = useCallback(() => {
    if (!hasAnswer) return;
    if (isLastStep) {
      setShowResults(true);
    } else {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    }
  }, [hasAnswer, isLastStep]);

  const goBack = useCallback(() => {
    if (showResults) {
      setShowResults(false);
      return;
    }
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep, showResults]);

  /* Auto-advance on select */
  useEffect(() => {
    if (!hasAnswer) return;
    const timer = setTimeout(goNext, 450);
    return () => clearTimeout(timer);
  }, [hasAnswer, goNext]);

  /* Contact form submit */
  const handleSubmitContact = async () => {
    if (!contactForm.name.trim() || !contactForm.phone.trim()) {
      setToast("Пожалуйста, заполните все поля");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactForm.name,
          phone: contactForm.phone,
          message: `Квиз: рекомендация — ${getRecommendation(answers).title}, бюджет — ${getRecommendation(answers).priceRange}`,
        }),
      });
      if (res.ok) {
        setFormSubmitted(true);
        setToast("Заявка отправлена! Мы свяжемся с вами в ближайшее время.");
      } else {
        setToast("Ошибка отправки. Попробуйте ещё раз.");
      }
    } catch {
      setToast("Ошибка сети. Попробуйте ещё раз.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const recommendation = getRecommendation(answers);

  /* ─── Render ─── */
  return (
    <>
      <SiteNav />

      <main
        style={{
          minHeight: "100vh",
          background: "#0F0F0F",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* ── Hero header ── */}
        <section
          style={{
            paddingTop: "clamp(6rem, 12vh, 8rem)",
            paddingBottom: "2rem",
            textAlign: "center",
            background: "#111111",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <FluidBackground
            color1="rgba(184,149,90,0.06)"
            color2="rgba(158,182,143,0.04)"
            color3="rgba(232,196,184,0.03)"
            speed={6}
          />
          <ParticleField count={20} speed={0.15} style={{ opacity: 0.4 }} />
          <MorphingBlob
            size={280}
            color1="rgba(184,149,90,0.10)"
            color2="rgba(158,182,143,0.06)"
            opacity={0.45}
            speed={10}
            style={{ position: "absolute", top: "5%", right: "8%", zIndex: 0 }}
          />
          <MorphingBlob
            size={200}
            color1="rgba(232,196,184,0.07)"
            color2="rgba(184,149,90,0.04)"
            opacity={0.35}
            speed={13}
            style={{ position: "absolute", bottom: "10%", left: "5%", zIndex: 0 }}
          />
          <div className="container" style={{ position: "relative", zIndex: 2 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="section-label">Подбор мероприятия</span>
              <KineticText
                text="Какой формат кейтеринга вам подходит?"
                as="h1"
                animation="scale"
                className="section-title"
                stagger={0.03}
                duration={0.5}
                style={{ maxWidth: 700, margin: "0 auto 1rem" }}
              />
              <p
                className="section-subtitle"
                style={{ margin: "0 auto", textAlign: "center" }}
              >
                Ответьте на 5 вопросов — и мы подберём идеальный формат для
                вашего мероприятия
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Quiz area ── */}
        <section
          ref={quizContainerRef}
          style={{
            flex: 1,
            padding: "3rem 0 5rem",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <div
            className="container"
            style={{ maxWidth: 720 }}
          >
            <AnimatePresence mode="wait" custom={direction}>
              {!showResults ? (
                <motion.div
                  key={`step-${currentStep}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                >
                  {/* Progress bar */}
                  <div style={{ marginBottom: "2.5rem" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "0.75rem",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.7rem",
                          fontWeight: 600,
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "var(--color-brand)",
                        }}
                      >
                        Шаг {currentStep + 1} из {totalSteps}
                      </span>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "rgba(255,255,255,0.4)",
                        }}
                      >
                        {Math.round(((currentStep + 1) / totalSteps) * 100)}%
                      </span>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        height: 4,
                        borderRadius: 2,
                        background: "#2D2D2D",
                        overflow: "hidden",
                      }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${((currentStep + 1) / totalSteps) * 100}%`,
                        }}
                        transition={{
                          duration: 0.5,
                          ease: [0.4, 0, 0.2, 1],
                        }}
                        style={{
                          height: "100%",
                          borderRadius: 2,
                          background:
                            "linear-gradient(90deg, var(--color-brand), var(--color-brand-light))",
                        }}
                      />
                    </div>
                  </div>

                  {/* Question */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    style={{ marginBottom: "2rem" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                      <LottiePlaceholder
                        type={currentStep === 0 ? "star" : currentStep === 1 ? "utensils" : currentStep === 2 ? "glass" : currentStep === 3 ? "heart" : "chef"}
                        size={40}
                        color="#B8955A"
                      />
                      <h2
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
                          fontWeight: 400,
                          color: "var(--color-dark)",
                          lineHeight: 1.2,
                        }}
                      >
                        {STEPS[currentStep].question}
                      </h2>
                    </div>
                    <p
                      style={{
                        fontSize: "0.95rem",
                        color: "#777",
                        lineHeight: 1.5,
                      }}
                    >
                      {STEPS[currentStep].subtitle}
                    </p>
                  </motion.div>

                  {/* Options */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        STEPS[currentStep].options.length <= 4
                          ? "repeat(2, 1fr)"
                          : "repeat(auto-fill, minmax(180px, 1fr))",
                      gap: "0.75rem",
                    }}
                  >
                    {STEPS[currentStep].options.map((opt, i) => {
                      const isSelected = answers[currentStep] === opt.value;
                      const isFocused = focusedIndex === i;
                      return (
                        <motion.button
                          key={opt.value}
                          ref={(el) => {
                            optionsRef.current[i] = el;
                          }}
                          className={`quiz-option ${isSelected ? "selected" : ""}`}
                          custom={i}
                          variants={optionVariants}
                          initial="hidden"
                          animate="visible"
                          onClick={() => selectOption(opt.value)}
                          onFocus={() => setFocusedIndex(i)}
                          aria-pressed={isSelected}
                          aria-label={opt.label}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem",
                            outline: "none",
                            border:
                              isFocused && !isSelected
                                ? "1.5px solid var(--color-brand-light)"
                                : isSelected
                                ? "1.5px solid var(--color-brand)"
                                : "1.5px solid var(--color-cream-darker)",
                            background: isSelected
                              ? "var(--color-brand-10)"
                              : isFocused
                              ? "rgba(184,149,90,0.05)"
                              : "#fff",
                          }}
                        >
                          {opt.icon && (
                            <span
                              style={{
                                fontSize: "1.4rem",
                                flexShrink: 0,
                                width: 32,
                                textAlign: "center",
                              }}
                            >
                              {opt.icon}
                            </span>
                          )}
                          <span
                            style={{
                              fontSize: "0.95rem",
                              fontWeight: isSelected ? 600 : 400,
                              color: isSelected
                                ? "var(--color-brand-dark)"
                                : "var(--color-dark)",
                              transition: "all 0.3s",
                            }}
                          >
                            {opt.label}
                          </span>
                          {isSelected && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              style={{
                                marginLeft: "auto",
                                width: 20,
                                height: 20,
                                borderRadius: "50%",
                                background: "var(--color-brand)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#fff",
                                fontSize: "0.65rem",
                                flexShrink: 0,
                              }}
                            >
                              ✓
                            </motion.span>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Navigation */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "2.5rem",
                      gap: "1rem",
                    }}
                  >
                    <button
                      onClick={goBack}
                      disabled={currentStep === 0}
                      style={{
                        background: "none",
                        border: "none",
                        color:
                          currentStep === 0
                            ? "transparent"
                            : "var(--color-brand-dark)",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        cursor: currentStep === 0 ? "default" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        transition: "color 0.3s",
                        padding: "0.5rem 0",
                      }}
                    >
                      ← Назад
                    </button>

                    <ConfettiButton
                      className={`btn-gold ${!hasAnswer ? "opacity-50 cursor-not-allowed" : ""}`}
                      onClick={goNext}
                      style={{ padding: "0.85rem 2rem", borderRadius: "100px", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.05em", border: "none", cursor: hasAnswer ? "pointer" : "not-allowed" }}
                    >
                      {isLastStep ? "Узнать результат" : "Далее →"}
                    </ConfettiButton>
                  </div>
                </motion.div>
              ) : (
                /* ── Results ── */
                <motion.div
                  key="results"
                  variants={resultVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Result card */}
                  <div
                    style={{
                      background: "#1A1A1A",
                      borderRadius: 24,
                      overflow: "hidden",
                      boxShadow: "0 8px 50px rgba(0,0,0,0.08)",
                      marginBottom: "2rem",
                    }}
                  >
                    {/* Result header */}
                    <div
                      style={{
                        background:
                          "linear-gradient(135deg, var(--color-brand) 0%, var(--color-brand-dark) 100%)",
                        padding: "3rem 2rem",
                        textAlign: "center",
                        color: "#fff",
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
                          fontSize: "3rem",
                          marginBottom: "1rem",
                          display: "block",
                        }}
                      >
                        {recommendation.icon}
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <span
                          style={{
                            fontSize: "0.65rem",
                            fontWeight: 600,
                            letterSpacing: "0.3em",
                            textTransform: "uppercase",
                            opacity: 0.8,
                            display: "block",
                            marginBottom: "0.75rem",
                          }}
                        >
                          Мы рекомендуем
                        </span>
                        <h2
                          style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
                            fontWeight: 400,
                            marginBottom: "1rem",
                            lineHeight: 1.15,
                          }}
                        >
                          {recommendation.title}
                        </h2>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.5rem",
                            fontSize: "1.3rem",
                            fontFamily: "var(--font-serif)",
                            fontWeight: 300,
                            opacity: 0.95,
                          }}
                        >
                          <CountUp
                            target={parseInt(
                              recommendation.priceRange.replace(/\D/g, "").slice(0, 4)
                            ) || 3000}
                            duration={1.5}
                            prefix="от "
                            suffix=" ₽/чел"
                          />
                        </div>
                      </motion.div>
                    </div>

                    {/* Result body */}
                    <div style={{ padding: "2rem" }}>
                      <p
                        style={{
                          fontSize: "1rem",
                          lineHeight: 1.7,
                          color: "rgba(255,255,255,0.6)",
                          marginBottom: "2rem",
                        }}
                      >
                        {recommendation.description}
                      </p>

                      {/* Features */}
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns:
                            "repeat(auto-fill, minmax(220px, 1fr))",
                          gap: "0.75rem",
                          marginBottom: "2rem",
                        }}
                      >
                        {recommendation.features.map((feature, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + i * 0.08 }}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                              fontSize: "0.88rem",
                              color: "var(--color-dark)",
                            }}
                          >
                            <span
                              style={{
                                color: "var(--color-brand)",
                                flexShrink: 0,
                              }}
                            >
                              ✓
                            </span>
                            {feature}
                          </motion.div>
                        ))}
                      </div>

                      {/* Price range detail */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        style={{
                          background: "#111111",
                          borderRadius: 16,
                          padding: "1.25rem 1.5rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          flexWrap: "wrap",
                          gap: "0.75rem",
                          marginBottom: "2rem",
                        }}
                      >
                        <div>
                          <span
                            style={{
                              fontSize: "0.7rem",
                              fontWeight: 600,
                              letterSpacing: "0.15em",
                              textTransform: "uppercase",
                              color: "var(--color-brand)",
                              display: "block",
                              marginBottom: "0.25rem",
                            }}
                          >
                            Ориентировочный бюджет
                          </span>
                          <span
                            style={{
                              fontFamily: "var(--font-serif)",
                              fontSize: "1.3rem",
                              fontWeight: 400,
                              color: "var(--color-dark)",
                            }}
                          >
                            {recommendation.priceRange}
                          </span>
                        </div>
                        <Link
                          href="/#contact"
                          className="btn-outline"
                          style={{ fontSize: "0.7rem" }}
                        >
                          Точный расчёт →
                        </Link>
                      </motion.div>

                      {/* CTA buttons */}
                      <div
                        style={{
                          display: "flex",
                          gap: "1rem",
                          flexWrap: "wrap",
                        }}
                      >
                        <MagneticButton
                          className="btn-gold"
                          as="a"
                          href="/#contact"
                          strength={0.2}
                        >
                          Заказать
                        </MagneticButton>
                        <MagneticButton
                          className="btn-outline"
                          onClick={goBack}
                          strength={0.2}
                        >
                          ← Пройти ещё раз
                        </MagneticButton>
                      </div>
                    </div>
                  </div>

                  {/* Contact form */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    style={{
                      background: "#1A1A1A",
                      borderRadius: 24,
                      padding: "2rem",
                      boxShadow: "0 4px 30px rgba(0,0,0,0.05)",
                    }}
                  >
                    <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                      <span className="section-label">Персональное предложение</span>
                      <h3
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "1.5rem",
                          fontWeight: 400,
                          color: "var(--color-dark)",
                          marginTop: "0.5rem",
                        }}
                      >
                        Получите расчёт за 30 минут
                      </h3>
                      <p
                        style={{
                          fontSize: "0.9rem",
                          color: "#777",
                          marginTop: "0.5rem",
                        }}
                      >
                        Оставьте контакты — наш менеджер свяжется с вами
                      </p>
                    </div>

                    {formSubmitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{
                          textAlign: "center",
                          padding: "2rem 0",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "2.5rem",
                            display: "block",
                            marginBottom: "1rem",
                          }}
                        >
                          ✅
                        </span>
                        <h4
                          style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "1.3rem",
                            fontWeight: 400,
                            marginBottom: "0.5rem",
                          }}
                        >
                          Заявка отправлена!
                        </h4>
                        <p style={{ color: "#777", fontSize: "0.9rem" }}>
                          Мы свяжемся с вами в течение 30 минут
                        </p>
                      </motion.div>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "1rem",
                          maxWidth: 400,
                          margin: "0 auto",
                        }}
                      >
                        <div>
                          <label
                            htmlFor="quiz-name"
                            style={{
                              display: "block",
                              fontSize: "0.75rem",
                              fontWeight: 600,
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                              color: "var(--color-dark)",
                              marginBottom: "0.5rem",
                            }}
                          >
                            Ваше имя
                          </label>
                          <input
                            id="quiz-name"
                            type="text"
                            placeholder="Иван"
                            value={contactForm.name}
                            onChange={(e) =>
                              setContactForm((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                            style={{
                              width: "100%",
                              padding: "0.85rem 1.2rem",
                              border: "1.5px solid var(--color-cream-darker)",
                              borderRadius: 12,
                              fontSize: "0.95rem",
                              background: "#0F0F0F",
                              outline: "none",
                              transition: "border-color 0.3s",
                              fontFamily: "var(--font-sans)",
                            }}
                            onFocus={(e) =>
                              (e.target.style.borderColor =
                                "var(--color-brand)")
                            }
                            onBlur={(e) =>
                              (e.target.style.borderColor =
                                "#2D2D2D")
                            }
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="quiz-phone"
                            style={{
                              display: "block",
                              fontSize: "0.75rem",
                              fontWeight: 600,
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                              color: "var(--color-dark)",
                              marginBottom: "0.5rem",
                            }}
                          >
                            Телефон
                          </label>
                          <input
                            id="quiz-phone"
                            type="tel"
                            placeholder="+7 (___) ___-__-__"
                            value={contactForm.phone}
                            onChange={(e) =>
                              setContactForm((prev) => ({
                                ...prev,
                                phone: e.target.value,
                              }))
                            }
                            style={{
                              width: "100%",
                              padding: "0.85rem 1.2rem",
                              border: "1.5px solid var(--color-cream-darker)",
                              borderRadius: 12,
                              fontSize: "0.95rem",
                              background: "#0F0F0F",
                              outline: "none",
                              transition: "border-color 0.3s",
                              fontFamily: "var(--font-sans)",
                            }}
                            onFocus={(e) =>
                              (e.target.style.borderColor =
                                "var(--color-brand)")
                            }
                            onBlur={(e) =>
                              (e.target.style.borderColor =
                                "#2D2D2D")
                            }
                          />
                        </div>
                        <MagneticButton
                          className="btn-gold"
                          onClick={handleSubmitContact}
                          strength={0.15}
                          style={{
                            width: "100%",
                            marginTop: "0.5rem",
                            opacity: isSubmitting ? 0.7 : 1,
                          }}
                        >
                          {isSubmitting
                            ? "Отправляем..."
                            : "Получить расчёт →"}
                        </MagneticButton>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      {/* Footer */}
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
                fontSize: "1.3rem",
                fontWeight: 500,
                letterSpacing: "0.15em",
                color: "#fff",
                textDecoration: "none",
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
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.35)",
                fontSize: "0.8rem",
              }}
            >
              &copy; 2007–2026 Интерфуд Кейтеринг
            </div>
          </div>
        </div>
      </footer>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            style={{
              position: "fixed",
              bottom: "2rem",
              right: "2rem",
              background: "var(--color-dark)",
              color: "#fff",
              padding: "1rem 1.5rem",
              borderRadius: 12,
              fontSize: "0.88rem",
              boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
              zIndex: 9999,
              maxWidth: 360,
            }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp float */}
      <a
        href="https://wa.me/79119417205?text=Здравствуйте! Прошёл квиз на сайте — хочу узнать подробнее."
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
