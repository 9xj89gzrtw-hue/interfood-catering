"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import ParallaxImage from "@/components/ParallaxImage";
import VideoBreak from "@/components/VideoBreak";
import TextReveal from "@/components/TextReveal";
import CountUp from "@/components/CountUp";
import MagneticButton from "@/components/MagneticButton";
import TiltCard from "@/components/TiltCard";
import ImageReveal from "@/components/ImageReveal";
import ParticleField from "@/components/ParticleField";
import KineticText from "@/components/KineticText";
import AnimatedTypewriter from "@/components/AnimatedTypewriter";
import FluidBackground from "@/components/FluidBackground";
import MorphingBlob from "@/components/MorphingBlob";
import ConfettiButton from "@/components/ConfettiButton";

/* ═══════════════════════════════════════════════════════════════
   ИНТЕРФУД КЕЙТЕРИНГ — О компании / About Page  (LIGHT THEME)
   Upgraded: ParticleField, KineticText, AnimatedTypewriter,
   2x VideoBreak, FluidBackground, MorphingBlob, ConfettiButton
   ═══════════════════════════════════════════════════════════════ */

/* ─── Media ─── */
const VID = {
  hero: "/videos/hero-catering.mp4",
  kitchen: "/videos/hero-catering.mp4",
  serving: "/videos/hero-catering.mp4",
};

const IMG = {
  hero: "/images/hero.jpg",
  chef: "/images/about.jpg",
  team: "/images/about.jpg",
  kitchen: "/images/food_general.jpg",
  kitchen2: "/images/furshet_food.jpg",
  kitchen3: "/images/food_salmon.jpg",
  serving: "/images/furshet_food.jpg",
  wedding: "/images/wedding.jpg",
  corporate: "/images/hero_rooftop.jpg",
  banquet: "/images/furshet.jpg",
  decor: "/images/banket_table1.jpg",
  bar: "/images/furshet_canape.jpg",
  dessert: "/images/gallery_1.jpg",
  canape: "/images/furshet_canape.jpg",
  roses: "/images/hero_rooftop.jpg",
  hall: "/images/hero_rooftop.jpg",
};

/* ─── Data ─── */
const ACHIEVEMENTS = [
  { target: 18, suffix: "+", label: "лет на рынке кейтеринга" },
  { target: 3500, suffix: "+", label: "мероприятий" },
  { target: 250000, suffix: "+", label: "гостей" },
  { target: 10, suffix: "/10", label: "Restoclub · 14 отзывов" },
  { target: 4.55, suffix: "/5", label: "CaterMe · 30 отзывов", decimals: 2 },
];

const TIMELINE = [
  { year: "2007", title: "Основание компании", desc: "Дмитрий Нилов основал Интерфуд, начав с небольших фуршетов на 30–50 человек. Первый крупный заказ — юбилейный вечер на 120 гостей в особняке на Петроградской стороне." },
  { year: "2010", title: "Первая собственная кухня", desc: "Открыта первая производственная кухня. Инвестиции в собственное оборудование и мобильные кухни позволили контролировать качество на каждом этапе." },
  { year: "2013", title: "1 000-е мероприятие", desc: "Юбилейное тысячное мероприятие — масштабный корпоратив на 1 000 гостей. Компания расширила команду до 45 человек и приобрела первых постоянных корпоративных клиентов." },
  { year: "2016", title: "Расширение команды до 100 человек", desc: "Интерфуд стал одним из лидеров свадебного кейтеринга Санкт-Петербурга. Разработаны три свадебных пакета, проведено более 300 свадеб за сезон." },
  { year: "2019", title: "Новая производственная кухня", desc: "Запущена новая собственная производственная кухня. Новые возможности для создания блюд любой сложности, включая шоу-станции с живой готовкой." },
  { year: "2022", title: "3 000-е мероприятие", desc: "Внедрена собственная система управления мероприятиями и контроль качества HACCP. Клиенты получили личный кабинет для отслеживания заказов." },
  { year: "2025", title: "Новые форматы и цифровизация", desc: "Расширяем форматы мероприятий, запускаем онлайн-расчёт стоимости и цифровое меню. Продолжаем расти и совершенствовать сервис." },
];

const VALUES = [
  {
    icon: "✦",
    title: "Качество без компромиссов",
    desc: "Использование только качественных продуктов от проверенных поставщиков. Контроль качества на каждом этапе — на кухне, при упаковке и перед подачей. Никаких полуфабрикатов, никаких компромиссов.",
  },
  {
    icon: "◆",
    title: "Индивидуальный подход",
    desc: "Мы виртуозно подбираем меню для любого события. Гибкая система составления меню удовлетворяет любые гастрономические и финансовые запросы — от фуршета на 20 гостей до банкета на 500.",
  },
  {
    icon: "❖",
    title: "Невидимый сервис",
    desc: "Оперативное обслуживание и сотрудничество с лучшими площадками. Наши официанты рядом ровно в нужный момент и исчезают, когда не нужны. 1 официант на 8–10 гостей.",
  },
  {
    icon: "⬡",
    title: "Ответственность по договору",
    desc: "Безупречная подача блюд — философия, которая отражается в каждом моменте нашей работы. Полное документальное оформление, резерв блюд, план Б на случай непогоды. Более 3 500 проведённых мероприятий.",
  },
];

const TEAM = [
  {
    name: "Дмитрий Нилов",
    role: "Шеф-повар и основатель",
    desc: "Более 20 лет в гастрономии. Основатель компании «Интерфуд», создатель концепции «Гастрономическое путешествие».",
    img: IMG.chef,
  },
];

const CLIENTS = [
  {
    name: "Pepsico",
    event: "Кофе-брейк на 300 персон",
    icon: "☕",
  },
  {
    name: "Ростелеком",
    event: "Выездное барбекю",
    icon: "🔥",
  },
  {
    name: "Emporio Armani",
    event: "Выездной фуршет для презентации",
    icon: "👔",
  },
  {
    name: "Aurora Concert Hall",
    event: "Корпоратив на 250 персон, 20 официантов, 5 шеф-поваров",
    icon: "🎵",
  },
  {
    name: "Harley Days",
    event: "260 байкеров в день",
    icon: "🏍",
  },
];

const GALLERY = [
  { img: IMG.canape, alt: "Канапе-станция" },
  { img: IMG.wedding, alt: "Свадебная сервировка" },
  { img: IMG.kitchen2, alt: "Наша кухня" },
  { img: IMG.dessert, alt: "Десертный стол" },
  { img: IMG.roses, alt: "Выездное мероприятие" },
  { img: IMG.kitchen3, alt: "Производственная кухня" },
  { img: IMG.decor, alt: "Праздничный декор" },
  { img: IMG.banquet, alt: "Банкетная подача" },
];

/* ─── Typewriter phrases ─── */
const VALUE_PHRASES = [
  "Профессионализм команды",
  "Качественные продукты",
  "Оперативное обслуживание",
  "Лучшие площадки",
  "Безупречная подача блюд",
  "С 2007 года в кейтеринге",
];

/* ─── Animation helpers ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] as const } },
};

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
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

/* ═══════════════════════════════════════════════════════════════
   Page
   ═══════════════════════════════════════════════════════════════ */
export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main>
      <SiteNav />

      {/* ────────────────────────────────────────────
          1. HERO — Video background + ParticleField + KineticText
          ──────────────────────────────────────────── */}
      <section ref={heroRef} aria-label="О компании" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "#FEFDFB" }}>
        {/* Video BG */}
        <motion.div style={{ position: "absolute", inset: 0, y: heroY, zIndex: 0 }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/hero-poster.jpg"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          >
            <source src={VID.hero} type="video/mp4" />
          </video>
        </motion.div>
        {/* Light overlay */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to bottom, rgba(254,253,251,0.25) 0%, rgba(254,253,251,0.15) 30%, rgba(254,253,251,0.4) 60%, rgba(254,253,251,0.92) 100%)" }} />
        {/* ParticleField overlay */}
        <ParticleField count={50} speed={0.25} style={{ zIndex: 2 }} />
        {/* Content */}
        <motion.div
          style={{ position: "relative", zIndex: 3, textAlign: "center", padding: "2rem", maxWidth: 900, opacity: heroOpacity }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <motion.div
            style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: "#B8955A", marginBottom: "1.5rem" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            О компании
          </motion.div>
          {/* KineticText with fadeUp animation */}
          <KineticText
            text="Кейтеринг — не просто работа, а увлечение, которое стало стилем жизни"
            as="h1"
            animation="fadeUp"
            className="section-title"
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.4rem, 6vw, 4.5rem)", fontWeight: 400, lineHeight: 1.1, color: "#1A1A1A" }}
            stagger={0.04}
          />
          {/* AnimatedTypewriter for values */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            style={{ marginTop: "1rem", fontSize: "1.15rem", color: "#B8955A", fontFamily: "var(--font-serif)", minHeight: "2rem" }}
          >
            <AnimatedTypewriter
              texts={VALUE_PHRASES}
              speed={70}
              deleteSpeed={35}
              pauseDuration={2500}
            />
          </motion.div>
          <motion.p
            style={{ marginTop: "1.5rem", fontSize: "1.05rem", lineHeight: 1.7, color: "rgba(26,26,26,0.65)", maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            Для нас организация кейтеринга – не просто работа, а увлечение, которое стало стилем жизни. С 2007 года мы виртуозно подбираем меню для любого события, завоевывая сердца даже самых искушенных гурманов. Профессионализм команды, использование только качественных продуктов, оперативное обслуживание, сотрудничество с лучшими площадками и безупречная подача блюд – философия, которая отражается в каждом моменте нашей работы.
          </motion.p>
          <motion.p
            style={{ marginTop: "0.75rem", fontSize: "0.9rem", fontStyle: "italic", lineHeight: 1.7, color: "#B8955A", maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            Дмитрий Нилов. Основатель компании
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            style={{ marginTop: "2rem" }}
          >
            <ConfettiButton
              onClick={() => {}}
              className="btn-gold"
              style={{ padding: "1rem 2.5rem", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", borderRadius: "100px", cursor: "pointer" }}
            >
              Узнать подробнее
            </ConfettiButton>
          </motion.div>
        </motion.div>
      </section>

      {/* ────────────────────────────────────────────
          2. ACHIEVEMENTS BAR — CountUp animated stats
          ──────────────────────────────────────────── */}
      <section aria-label="Достижения" style={{ padding: "4rem 2rem", background: "#FAFAF8" }}>
        <div className="container">
          <div className="about-stats-grid">
            {ACHIEVEMENTS.map((item, i) => (
              <div key={i} className="stat-item">
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)", fontWeight: 400, color: "#B8955A" }}>
                  <CountUp
                    target={item.target}
                    suffix={item.suffix}
                    decimals={item.decimals || 0}
                    duration={2.5}
                  />
                </h3>
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-text-muted)", marginTop: "0.25rem" }}>
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          3. STORY — Two-column: ImageReveal + Text + MorphingBlob
          ──────────────────────────────────────────── */}
      <section aria-label="Наша история" style={{ padding: "6rem 2rem", background: "#FEFDFB", position: "relative", overflow: "hidden" }}>
        {/* MorphingBlob decoration */}
        <MorphingBlob
          size={500}
          color1="rgba(184,149,90,0.08)"
          color2="rgba(158,182,143,0.05)"
          opacity={0.5}
          speed={10}
          style={{ position: "absolute", top: "-10%", right: "-8%", zIndex: 0 }}
        />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="about-story-grid">
            {/* Left — Image */}
            <ImageReveal
              src={IMG.chef}
              alt="Дмитрий Нилов, основатель Интерфуд"
              direction="left"
              style={{ borderRadius: 20, height: 560 }}
            />
            {/* Right — Text */}
            <div>
              <Reveal>
                <span className="section-label">Наша история</span>
              </Reveal>
              <TextReveal
                text="С 2007 года — виртуозно подбираем меню"
                as="h2"
                className="section-title"
                stagger={0.03}
              />
              <Reveal delay={0.15}>
                <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--color-text-subtle)", maxWidth: 520 }}>
                  Для нас организация кейтеринга — не просто работа, а увлечение, которое стало стилем жизни. Дмитрий Нилов основал компанию в 2007 году, посвятив себя кулинарному мастерству и убеждению: каждое мероприятие заслуживает гастрономии ресторанного уровня.
                </p>
              </Reveal>
              <Reveal delay={0.25}>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "var(--color-text-muted)", marginTop: "1.25rem", maxWidth: 520 }}>
                  Профессионализм команды, использование только качественных продуктов, оперативное обслуживание, сотрудничество с лучшими площадками и безупречная подача блюд — философия, которая отражается в каждом моменте нашей работы. С 2007 года мы виртуозно подбираем меню для любого события, завоевывая сердца даже самых искушённых гурманов.
                </p>
              </Reveal>
              <Reveal delay={0.35}>
                <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", flexWrap: "wrap" }}>
                  <MagneticButton as="a" href="/menu" className="btn-gold">Наше меню</MagneticButton>
                  <MagneticButton as="a" href="/gallery" className="btn-outline">Галерея</MagneticButton>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          Video interlude 1
          ──────────────────────────────────────────── */}
      <VideoBreak
        src={VID.kitchen}
        title="Искусство в каждом блюде"
        subtitle="Наша кухня — это сердце компании"
      />

      {/* ────────────────────────────────────────────
          4. TIMELINE — 7 milestones, alternating
          ──────────────────────────────────────────── */}
      <section aria-label="Хронология" style={{ padding: "6rem 2rem", background: "#FAFAF8" }}>
        <div className="container">
          <Reveal>
            <span className="section-label">Хронология</span>
          </Reveal>
          <TextReveal
            text="Путь Интерфуда"
            as="h2"
            className="section-title"
            stagger={0.03}
          />

          <div style={{ position: "relative", marginTop: "3rem", maxWidth: 900, marginLeft: "auto", marginRight: "auto" }}>
            {/* Central gold line */}
            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 2, background: "rgba(184,149,90,0.2)", transform: "translateX(-50%)" }} />

            {TIMELINE.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <Reveal key={i} delay={i * 0.05}>
                  <div className="about-timeline-row">
                    {/* Left column */}
                    <div style={{ textAlign: "right" }}>
                      {isLeft ? (
                        <>
                          <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", fontWeight: 400, color: "#1A1A1A", marginBottom: "0.5rem" }}>{item.title}</h3>
                          <p style={{ color: "var(--color-text-muted)", fontSize: "0.88rem", lineHeight: 1.7 }}>{item.desc}</p>
                        </>
                      ) : (
                        <div style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 7vw, 4.5rem)", fontWeight: 300, color: "rgba(184,149,90,0.12)", lineHeight: 1 }}>{item.year}</div>
                      )}
                    </div>
                    {/* Dot */}
                    <div className="about-timeline-dot" style={{
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      background: "#B8955A",
                      border: "3px solid #FAFAF8",
                      zIndex: 2,
                      position: "relative",
                      boxShadow: "0 0 0 4px rgba(184,149,90,0.15)",
                    }} />
                    {/* Right column */}
                    <div style={{ textAlign: "left" }}>
                      {isLeft ? (
                        <div style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 7vw, 4.5rem)", fontWeight: 300, color: "rgba(184,149,90,0.12)", lineHeight: 1 }}>{item.year}</div>
                      ) : (
                        <>
                          <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", fontWeight: 400, color: "#1A1A1A", marginBottom: "0.5rem" }}>{item.title}</h3>
                          <p style={{ color: "var(--color-text-muted)", fontSize: "0.88rem", lineHeight: 1.7 }}>{item.desc}</p>
                        </>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          Video interlude 2
          ──────────────────────────────────────────── */}
      <VideoBreak
        src={VID.serving}
        title="Сервис, который не замечают"
        subtitle="Невидимое совершенство в каждом жесте"
      />

      {/* ────────────────────────────────────────────
          Parallax Divider
          ──────────────────────────────────────────── */}
      <ParallaxImage
        src={IMG.wedding}
        alt="Свадебная сервировка"
        speed={0.25}
        style={{ height: "45vh", minHeight: 280 }}
        overlay
        overlayOpacity={0.35}
        className="parallax-ken-burns"
      />

      {/* ────────────────────────────────────────────
          5. VALUES — 4 TiltCards + FluidBackground + MorphingBlob
          ──────────────────────────────────────────── */}
      <section aria-label="Наши ценности" style={{ padding: "6rem 2rem", background: "#FEFDFB", position: "relative", overflow: "hidden" }}>
        {/* FluidBackground behind values */}
        <FluidBackground
          color1="rgba(184, 149, 90, 0.06)"
          color2="rgba(158, 182, 143, 0.04)"
          color3="rgba(232, 196, 184, 0.04)"
          speed={6}
          style={{ position: "absolute", inset: 0, zIndex: 0 }}
        />
        {/* MorphingBlob decoration */}
        <MorphingBlob
          size={350}
          color1="rgba(184,149,90,0.10)"
          color2="rgba(232,196,184,0.06)"
          opacity={0.4}
          speed={12}
          style={{ position: "absolute", bottom: "-5%", left: "-5%", zIndex: 0 }}
        />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <Reveal>
            <span className="section-label">Во что мы верим</span>
          </Reveal>
          <TextReveal
            text="Принципы, которые защищают ваш праздник"
            as="h2"
            className="section-title"
            stagger={0.03}
          />
          <Reveal delay={0.1}>
            <p className="section-subtitle" style={{ marginBottom: "2.5rem" }}>
              Наши ценности — не слова на стене, а гарантии, которые вы получаете по договору.
            </p>
          </Reveal>

          <div className="about-values-grid">
            {VALUES.map((val, i) => (
              <TiltCard key={i} glare maxTilt={8}>
                <div style={{
                  background: "var(--color-warm-white)",
                  border: "1px solid rgba(184,149,90,0.12)",
                  borderRadius: 20,
                  padding: "2.5rem",
                  position: "relative",
                  overflow: "hidden",
                }}>
                  {/* Decorative corner */}
                  <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: 80, background: "linear-gradient(135deg, transparent 50%, rgba(184,149,90,0.06) 50%)", borderRadius: "0 20px 0 0" }} />
                  <div style={{ fontSize: "1.5rem", color: "#B8955A", marginBottom: "1rem" }}>{val.icon}</div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", fontWeight: 400, color: "#1A1A1A", marginBottom: "0.75rem" }}>{val.title}</h3>
                  <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", lineHeight: 1.7 }}>{val.desc}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          5b. NOTABLE CLIENTS — Carousel / Grid
          ──────────────────────────────────────────── */}
      <section aria-label="Наши клиенты" style={{ padding: "6rem 2rem", background: "#FFFFFF", position: "relative", overflow: "hidden" }}>
        <MorphingBlob
          size={400}
          color1="rgba(184,149,90,0.08)"
          color2="rgba(212,184,124,0.04)"
          opacity={0.4}
          speed={14}
          style={{ position: "absolute", top: "-15%", left: "-10%", zIndex: 0 }}
        />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <Reveal>
            <span className="section-label" style={{ color: "#B8955A" }}>Нам доверяют</span>
          </Reveal>
          <TextReveal
            text="Клиенты, которые выбрали Интерфуд"
            as="h2"
            className="section-title"
            style={{ color: "#1A1A1A" }}
            stagger={0.03}
          />
          <Reveal delay={0.1}>
            <p className="section-subtitle" style={{ marginBottom: "2.5rem", color: "var(--color-text-muted)" }}>
              Крупнейшие компании и культовые мероприятия Санкт-Петербурга
            </p>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", maxWidth: 1100, margin: "0 auto" }}>
            {CLIENTS.map((client, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div style={{
                  background: "var(--color-warm-white)",
                  border: "1px solid rgba(184,149,90,0.15)",
                  borderRadius: 16,
                  padding: "2rem",
                  transition: "transform 0.4s cubic-bezier(0.25,1,0.5,1), border-color 0.4s",
                  cursor: "default",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "rgba(184,149,90,0.35)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(184,149,90,0.15)"; }}
                >
                  <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{client.icon}</div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem", fontWeight: 400, color: "#1A1A1A", marginBottom: "0.5rem" }}>{client.name}</h3>
                  <p style={{ color: "var(--color-text-muted)", fontSize: "0.88rem", lineHeight: 1.6 }}>{client.event}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          6. TEAM — founder
          ──────────────────────────────────────────── */}
      <section aria-label="Команда" style={{ padding: "6rem 2rem", background: "#FAFAF8" }}>
        <div className="container">
          <Reveal>
            <span className="section-label">Команда</span>
          </Reveal>
          <TextReveal
            text="Профессионалы, которым доверяют 98% клиентов"
            as="h2"
            className="section-title"
            stagger={0.03}
          />
          <Reveal delay={0.1}>
            <p className="section-subtitle" style={{ marginBottom: "2.5rem" }}>
              За каждым безупречным мероприятием стоят профессионалы, которые любят своё дело и несут личную ответственность за результат.
            </p>
          </Reveal>

          <div className="about-team-grid">
            {TEAM.map((member, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="card" style={{ overflow: "hidden" }}>
                  <div style={{ height: 300, overflow: "hidden" }}>
                    <img
                      src={member.img}
                      alt={member.name}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s cubic-bezier(0.25,1,0.5,1)" }}
                      onMouseEnter={(e) => { (e.target as HTMLImageElement).style.transform = "scale(1.05)"; }}
                      onMouseLeave={(e) => { (e.target as HTMLImageElement).style.transform = "scale(1)"; }}
                    />
                  </div>
                  <div style={{ padding: "1.5rem" }}>
                    <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem", fontWeight: 400, color: "#1A1A1A", marginBottom: "0.25rem" }}>{member.name}</h3>
                    <div style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#B8955A", fontWeight: 600, marginBottom: "0.75rem" }}>{member.role}</div>
                    <p style={{ color: "var(--color-text-muted)", fontSize: "0.82rem", lineHeight: 1.65 }}>{member.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          7. MASONRY GALLERY — 8 images
          ──────────────────────────────────────────── */}
      <section aria-label="Фотогалерея" style={{ padding: "6rem 2rem", background: "#FEFDFB", position: "relative", overflow: "hidden" }}>
        <MorphingBlob
          size={300}
          color1="rgba(184,149,90,0.07)"
          color2="rgba(158,182,143,0.04)"
          opacity={0.5}
          speed={14}
          style={{ position: "absolute", top: "20%", right: "-5%", zIndex: 0 }}
        />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <Reveal>
            <span className="section-label">Галерея</span>
          </Reveal>
          <TextReveal
            text="Моменты, которые мы создаём для вас"
            as="h2"
            className="section-title"
            stagger={0.03}
          />

          <div className="gallery-masonry" style={{ marginTop: "2rem" }}>
            {GALLERY.map((item, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="gallery-item">
                  <img src={item.img} alt={item.alt} loading="lazy" />
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.4s", background: "linear-gradient(to top, rgba(250,250,247,0.85) 0%, transparent 50%)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.opacity = "1"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.opacity = "0"; }}
                  >
                    <span style={{ color: "#1A1A1A", fontSize: "1.5rem", fontWeight: 300 }}>+</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          8. CTA — Full bleed with ConfettiButton
          ──────────────────────────────────────────── */}
      <section aria-label="Стать клиентом" style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src={IMG.hall} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
        </div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(250,250,247,0.88) 0%, rgba(254,253,251,0.92) 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, padding: "6rem 2rem", textAlign: "center", maxWidth: 700, margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400, color: "#1A1A1A", lineHeight: 1.15, marginBottom: "1.5rem" }}>
              Станьте частью нашей <em style={{ color: "#D4B87C", fontStyle: "italic" }}>истории</em>
            </h2>
            <p style={{ color: "var(--color-text-subtle)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "2rem" }}>
              Оставьте заявку — и наш кейтеринг-консьерж свяжется с вами в течение 30 минут. Бесплатная консультация, расчёт и подбор меню.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
              <ConfettiButton
                onClick={() => {}}
                style={{
                  padding: "1rem 2.5rem",
                  background: "linear-gradient(135deg, #B8955A, #D4B87C)",
                  color: "#fff",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  borderRadius: "100px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Заказать кейтеринг
              </ConfettiButton>
              <MagneticButton as="a" href="tel:+78129195911" className="btn-outline btn-outline-light">+7 (812) 919-59-11</MagneticButton>
              <MagneticButton as="a" href="https://wa.me/79119417205?text=Здравствуйте! Хочу узнать подробнее о кейтеринге." className="btn-outline btn-outline-light" target="_blank" rel="noopener noreferrer">WhatsApp</MagneticButton>
            </div>
            <div style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap", marginTop: "1.5rem", color: "var(--color-text-muted)", fontSize: "0.85rem" }}>
              <a href="mailto:interfood-catering@yandex.ru" style={{ color: "var(--color-text-muted)", textDecoration: "none", transition: "color 0.3s" }} onMouseEnter={(e) => { e.currentTarget.style.color = "#D4B87C"; }} onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-text-muted)"; }}>interfood-catering@yandex.ru</a>
              <span>Новолитовская ул., 15</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          9. FOOTER
          ──────────────────────────────────────────── */}
      <footer className="footer" role="contentinfo" style={{ background: "#FAFAF7", borderTop: "1px solid rgba(184,149,90,0.12)" }}>
        <div className="container" style={{ padding: "5rem 2rem 2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <Link href="/" style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", fontWeight: 500, color: "#1A1A1A", textDecoration: "none", letterSpacing: "0.15em" }}>
              ИНТЕРФУД
            </Link>
            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
              <Link href="/menu" style={{ color: "var(--color-text-muted)", textDecoration: "none", fontSize: "0.85rem" }}>Меню</Link>
              <Link href="/wedding" style={{ color: "var(--color-text-muted)", textDecoration: "none", fontSize: "0.85rem" }}>Свадьбы</Link>
              <Link href="/corporate" style={{ color: "var(--color-text-muted)", textDecoration: "none", fontSize: "0.85rem" }}>Корпоратив</Link>
              <Link href="/about" style={{ color: "var(--color-text-muted)", textDecoration: "none", fontSize: "0.85rem" }}>О нас</Link>
              <Link href="/reviews" style={{ color: "var(--color-text-muted)", textDecoration: "none", fontSize: "0.85rem" }}>Отзывы</Link>
              <Link href="/" style={{ color: "var(--color-text-muted)", textDecoration: "none", fontSize: "0.85rem" }}>Главная</Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.25rem", color: "var(--color-text-muted)", fontSize: "0.8rem" }}>
              <span>&copy; 2007–2026 Интерфуд Кейтеринг</span>
              <span>Новолитовская ул., 15 · <a href="mailto:interfood-catering@yandex.ru" style={{ color: "var(--color-text-muted)", textDecoration: "none" }}>interfood-catering@yandex.ru</a></span>
              <span>WhatsApp: +7 (911) 941-72-05</span>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp float */}
      <a
        href="https://wa.me/79119417205?text=Здравствуйте! Хочу узнать подробнее о компании."
        className="wa-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
      >
        &#9742;
      </a>
    </main>
  );
}
