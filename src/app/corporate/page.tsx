"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import ClientMarquee from "@/components/ClientMarquee";
import ParallaxImage from "@/components/ParallaxImage";
import VideoCarousel from "@/components/VideoCarousel";
import VideoBreak from "@/components/VideoBreak";
import TextReveal from "@/components/TextReveal";
import CountUp from "@/components/CountUp";
import MagneticButton from "@/components/MagneticButton";
import TiltCard from "@/components/TiltCard";
import ImageReveal from "@/components/ImageReveal";
import ParticleField from "@/components/ParticleField";
import FloatingElements from "@/components/FloatingElements";
import KineticText from "@/components/KineticText";
import TextMarquee from "@/components/TextMarquee";
import FluidBackground from "@/components/FluidBackground";
import LottiePlaceholder from "@/components/LottiePlaceholder";
import ConfettiButton from "@/components/ConfettiButton";

/* ═══════════════════════════════════════════════════════════════
   ИНТЕРФУД КЕЙТЕРИНГ — Корпоративный кейтеринг / Corporate Page
   Light theme — warm white, cream, gold accent
   Upgraded: ParticleField, FloatingElements, KineticText (scale),
   3x VideoBreak, TextMarquee, FluidBackground, LottiePlaceholder, ConfettiButton
   ═══════════════════════════════════════════════════════════════ */

const VID = {
  hero: "https://videos.pexels.com/video-files/2759750/2759750-uhd_2560_1440_25fps.mp4",
  corporate1: "https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4",
  corporate2: "https://videos.pexels.com/video-files/4761433/4761433-uhd_2560_1440_25fps.mp4",
  corporate3: "https://videos.pexels.com/video-files/5377703/5377703-uhd_2560_1440_25fps.mp4",
  corporate4: "https://videos.pexels.com/video-files/4763824/4763824-uhd_2560_1440_24fps.mp4",
};

const IMG = {
  corporate: "https://sfile.chatglm.cn/images-ppt/b26bc8017630.png",
  conference: "https://sfile.chatglm.cn/images-ppt/31ca0a361dc4.jpg",
  teambuilding: "https://sfile.chatglm.cn/images-ppt/a2fbd3b8447b.jpg",
  presentation: "https://sfile.chatglm.cn/images-ppt/4f51d25798b0.jpg",
  buffet: "https://sfile.chatglm.cn/images-ppt/b0afca3cdeee.jpg",
  bar: "https://sfile.chatglm.cn/images-ppt/c73dc40e41d4.jpg",
  dessert: "https://sfile.chatglm.cn/images-ppt/cf9ca554baf6.jpg",
  hero: "https://sfile.chatglm.cn/images-ppt/3a442a2e6e71.jpg",
};

/* ─── Data ─── */

const FORMATS = [
  {
    title: "Конференция",
    subtitle: "Кофе-брейки + обед",
    desc: "Полное питание для деловых мероприятий: утренние кофе-брейки, бизнес-ланчи и вечерние приёмы. Быстрая подача, безупречная сервировка.",
    img: IMG.conference,
    features: ["Кофе-брейк от 950 ₽", "Бизнес-ланч от 1 800 ₽", "Несколько станций", "Меню для аллергиков"],
  },
  {
    title: "Форум",
    subtitle: "Полный день питания",
    desc: "Круглосуточное обслуживание масштабных форумов и саммитов. 3–5 приёмов пищи, кофейные зоны, фуршетные станции.",
    img: IMG.buffet,
    features: ["3–5 приёмов пищи", "Кофе-зоны 24/7", "До 5 000 гостей", "Тайминг ±5 мин"],
  },
  {
    title: "Тимбилдинг",
    subtitle: "BBQ / outdoor",
    desc: "Питание на природе для корпоративных выездов. BBQ-станции, гриль-бар, полевая кухня, кейтеринг под открытым небом.",
    img: IMG.teambuilding,
    features: ["BBQ и гриль", "Полевая кухня", "Напитки и бар", "Эко-посуда"],
  },
  {
    title: "Презентация",
    subtitle: "Фуршетный формат",
    desc: "Элегантный фуршет для продуктовых презентаций, выставок и приёмов. Канапе, закуски, шампанская зона.",
    img: IMG.presentation,
    features: ["Канапе и закуски", "Шампанская зона", "Официанты", "Сервировка и текстиль"],
  },
];

const ADVANTAGES = [
  { icon: "⏱", title: "Пунктуальность", desc: "Подача блюд по расписанию с точностью до 5 минут. Координация с вашим сценарием и таймлайном мероприятия.", lottie: "utensils" as const },
  { icon: "📐", title: "Масштаб", desc: "От 15 до 5 000 гостей. Увеличение или сокращение заказа за 48 часов. Резерв блюд на случай доп. участников.", lottie: "star" as const },
  { icon: "🔄", title: "Гибкость", desc: "Меняем меню, тайминг и формат за 24 часа. Адаптируемся под любые изменения в программе мероприятия.", lottie: "glass" as const },
  { icon: "👨‍🍳", title: "Собственная кухня", desc: "Готовим на собственной базе, а не собираем из полуфабрикатов. Контроль качества на каждом этапе.", lottie: "chef" as const },
  { icon: "🏢", title: "Единый подрядчик", desc: "Еда, бар, сервировка, персонал и логистика — одна заявка, один договор, одна команда.", lottie: "heart" as const },
  { icon: "📊", title: "Отчётность", desc: "Полный пакет документов: договор, счета, акты, счета-фактуры. Работаем с НДС и без. Любые формы расчёта.", lottie: "star" as const },
];

const CASES = [
  {
    client: "Газпром",
    title: "Ежегодный корпоративный форум",
    guests: 500,
    duration: "3 дня",
    result: "1 500+ кофе-брейков",
    desc: "Обеспечили полное питание на 3-дневном форуме: утренние кофе-брейки, бизнес-ланчи и вечерние приёмы. 12 станций, 40 официантов, 0 задержек.",
    quote: "Интерфуд безупречно справился с масштабом нашего форума. Всё по расписанию, качество на высоте.",
    quoteAuthor: "Руководитель протокола",
    img: IMG.conference,
  },
  {
    client: "Яндекс",
    title: "Презентация нового продукта",
    guests: 200,
    duration: "Полный день",
    result: "4.9 / 5.0 рейтинг",
    desc: "Фуршетный формат с интерактивными станциями и авторскими коктейлями. Шеф-стол с живой готовкой и десертная зона. Рейтинг мероприятия 4.9 из 5.",
    quote: "Стильно, вкусно, профессионально. Наши сотрудники были в восторге от формата и качества.",
    quoteAuthor: "HR-директор",
    img: IMG.dessert,
  },
  {
    client: "Сбербанк",
    title: "Корпоративный тимбилдинг",
    guests: 300,
    duration: "Outdoor BBQ",
    result: "Безупречное исполнение",
    desc: "Outdoor BBQ на 300 участников. Гриль-станции, полевая кухня, кальянная зона и авторские лимонады. Погода не помеха — установили шатры за 2 часа.",
    quote: "Даже дождь не испортил мероприятие — команда Интерфуда оперативно установила шатры. Всё прошло идеально.",
    quoteAuthor: "Организатор мероприятия",
    img: IMG.teambuilding,
  },
];

/* ─── Animation helpers ─── */

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } },
};

const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const staggerItem = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={fadeUp} transition={{ delay }} className={className}>
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Page Component
   ═══════════════════════════════════════════════════════════════ */

export default function CorporatePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <>
      <SiteNav />

      {/* ═══════════════════════════════════════════════════════
          1. HERO — Video background with ParticleField + FloatingElements + KineticText
          ═══════════════════════════════════════════════════════ */}
      <section className="hero" ref={heroRef} aria-label="Корпоративный кейтеринг">
        {/* Video BG */}
        <motion.div className="hero-video" style={{ y: heroY }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={IMG.hero}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          >
            <source src={VID.hero} type="video/mp4" />
          </video>
        </motion.div>
        {/* Light overlay — warm gradient */}
        <div className="hero-overlay" style={{
          background: "linear-gradient(to bottom, rgba(254,253,251,0.15) 0%, rgba(254,253,251,0.25) 40%, rgba(254,253,251,0.75) 80%, rgba(254,253,251,0.95) 100%)",
        }} />
        {/* ParticleField */}
        <ParticleField count={45} speed={0.2} />
        {/* FloatingElements */}
        <FloatingElements count={8} />
        {/* Content */}
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <motion.div
            style={{
              fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.3em",
              textTransform: "uppercase", color: "var(--color-brand)",
              marginBottom: "1.5rem", display: "inline-block",
              padding: "0.4rem 1.2rem", border: "1px solid var(--color-brand-20)",
              borderRadius: "100px",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Корпоративный кейтеринг
          </motion.div>

          {/* KineticText with "scale" animation */}
          <KineticText
            text="Кейтеринг для бизнеса"
            as="h1"
            animation="scale"
            stagger={0.04}
            duration={0.6}
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
              fontWeight: 400,
              lineHeight: 1.1,
              color: "var(--color-dark)",
              marginBottom: "1.5rem",
            }}
          />

          <motion.p
            style={{
              fontSize: "1.05rem", lineHeight: 1.7, color: "rgba(26,26,26,0.6)",
              maxWidth: 580, margin: "0 auto 2.5rem",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            Профессиональное питание для мероприятий любого масштаба.
            Конференции, форумы, тимбилдинги — с документами и НДС.
          </motion.p>

          <motion.div
            style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <MagneticButton as="a" href="/#contact" className="btn-gold" strength={0.2}>
              Запросить КП →
            </MagneticButton>
            <MagneticButton as="a" href="#formats" className="btn-outline" strength={0.2}>
              Форматы
            </MagneticButton>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Stats Bar ─── */}
      <section style={{
        background: "var(--color-cream)",
        borderBottom: "1px solid rgba(184,149,90,0.12)",
        padding: "3rem 2rem",
      }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2rem",
            textAlign: "center",
          }}
          className="trust-bar-grid"
          >
            {[
              { value: 1200, suffix: "+", label: "мероприятий" },
              { value: 85, suffix: "+", label: "клиентов" },
              { value: 98, suffix: "%", label: "повторных обращений" },
            ].map((stat, i) => (
              <div key={i} style={{ padding: "1rem 0" }}>
                <div style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
                  fontWeight: 400,
                  color: "var(--color-brand)",
                  lineHeight: 1.2,
                }}>
                  <CountUp target={stat.value} suffix={stat.suffix} duration={2.5} />
                </div>
                <div style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#888",
                  marginTop: "0.5rem",
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TextMarquee strip ─── */}
      <section style={{ background: "#FEFDFB", padding: "1.5rem 0", borderTop: "1px solid rgba(184,149,90,0.08)", borderBottom: "1px solid rgba(184,149,90,0.08)" }}>
        <TextMarquee
          texts={["Конференции", "Форумы", "Тимбилдинги", "Кофе-брейки", "Бизнес-ланчи", "Презентации", "BBQ", "Фуршеты", "Корпоративы", "Семинары"]}
          speed={25}
          className="section-title"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.2rem, 2.5vw, 2rem)",
            fontWeight: 300,
            color: "rgba(184,149,90,0.25)",
          }}
        />
      </section>

      {/* ═══════════════════════════════════════════════════════
          2. FORMATS — 4 format cards + FluidBackground
          ═══════════════════════════════════════════════════════ */}
      <section id="formats" style={{ padding: "6rem 0", background: "var(--color-warm-white)", position: "relative", overflow: "hidden" }} aria-label="Форматы">
        {/* FluidBackground behind packages */}
        <FluidBackground
          color1="rgba(184, 149, 90, 0.07)"
          color2="rgba(158, 182, 143, 0.05)"
          color3="rgba(232, 196, 184, 0.04)"
          speed={7}
          style={{ position: "absolute", inset: 0, zIndex: 0 }}
        />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <Reveal>
            <span className="section-label">Форматы</span>
            <h2 className="section-title">
              Подберите <em style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--color-brand)" }}>формат</em>
            </h2>
            <p className="section-subtitle" style={{ marginBottom: "3rem" }}>
              От кофе-брейка на 15 человек до форума на 5 000 гостей. Масштабируемые решения под ваш бюджет.
            </p>
          </Reveal>

          <motion.div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1.5rem",
            }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {FORMATS.map((fmt, i) => (
              <motion.div key={fmt.title} variants={staggerItem}>
                <TiltCard glare>
                  <div className="card" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                    <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
                      <ImageReveal
                        src={fmt.img}
                        alt={fmt.title}
                        direction={i % 2 === 0 ? "left" : "right"}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                    <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
                      <span style={{
                        fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.25em",
                        textTransform: "uppercase", color: "var(--color-brand)",
                        marginBottom: "0.5rem",
                      }}>
                        {fmt.subtitle}
                      </span>
                      <h3 style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.4rem", fontWeight: 400,
                        color: "var(--color-dark)", marginBottom: "0.75rem",
                      }}>
                        {fmt.title}
                      </h3>
                      <p style={{
                        fontSize: "0.88rem", lineHeight: 1.6,
                        color: "#666", marginBottom: "1rem", flex: 1,
                      }}>
                        {fmt.desc}
                      </p>
                      <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                        {fmt.features.map((f, j) => (
                          <span key={j} style={{
                            background: "var(--color-brand-10)",
                            color: "var(--color-brand-dark)",
                            fontSize: "0.65rem", padding: "0.3rem 0.7rem",
                            borderRadius: "100px", fontWeight: 500,
                            letterSpacing: "0.03em",
                          }}>
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── VideoBreak 1 ─── */}
      <VideoBreak
        src={VID.corporate1}
        title="Организация конференций"
        subtitle="Профессиональная команда для вашего бизнеса"
      />

      {/* ═══════════════════════════════════════════════════════
          3. ADVANTAGES — 6 cards with LottiePlaceholder icons
          ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: "6rem 0", background: "var(--color-cream)" }} aria-label="Преимущества">
        <div className="container">
          <Reveal>
            <span className="section-label">Преимущества</span>
            <h2 className="section-title">
              Почему <em style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--color-brand)" }}>компании</em> выбирают нас
            </h2>
          </Reveal>

          <motion.div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.5rem",
              marginTop: "2.5rem",
            }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {ADVANTAGES.map((item, i) => (
              <motion.div key={i} variants={staggerItem}>
                <div className="review-card" style={{ padding: "2rem", height: "100%", display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
                    <div style={{
                      width: 56, height: 56, borderRadius: 16,
                      background: "var(--color-brand-10)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <LottiePlaceholder
                        type={item.lottie}
                        size={36}
                        color="#B8955A"
                      />
                    </div>
                    <h3 style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.2rem", fontWeight: 400,
                      color: "var(--color-dark)",
                    }}>
                      {item.title}
                    </h3>
                  </div>
                  <p style={{
                    fontSize: "0.88rem", lineHeight: 1.7,
                    color: "#777", flex: 1,
                  }}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── VideoBreak 2 ─── */}
      <VideoBreak
        src={VID.corporate2}
        title="Сервировка для форумов"
        subtitle="Быстрая подача, безупречный вид"
      />

      {/* ═══════════════════════════════════════════════════════
          4. CLIENT LOGOS MARQUEE
          ═══════════════════════════════════════════════════════ */}
      <ClientMarquee />

      {/* ═══════════════════════════════════════════════════════
          5. CASE STUDIES — 3 real cases
          ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: "6rem 0", background: "var(--color-warm-white)" }} aria-label="Кейсы">
        <div className="container">
          <Reveal>
            <span className="section-label">Кейсы</span>
            <h2 className="section-title">
              Наши <em style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--color-brand)" }}>кейсы</em>
            </h2>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", marginTop: "2.5rem" }}>
            {CASES.map((cs, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="card" style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1.5fr",
                  overflow: "hidden",
                }}>
                  <div style={{ height: 320, overflow: "hidden" }}>
                    <ImageReveal
                      src={cs.img}
                      alt={cs.title}
                      direction={i % 2 === 0 ? "left" : "right"}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                  <div style={{ padding: "2.5rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                      <span style={{
                        fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.25em",
                        textTransform: "uppercase", color: "var(--color-brand)",
                        background: "var(--color-brand-10)",
                        padding: "0.3rem 0.8rem", borderRadius: "100px",
                      }}>
                        {cs.client}
                      </span>
                      <span style={{ fontSize: "0.75rem", color: "#999" }}>
                        {cs.guests} гостей · {cs.duration}
                      </span>
                    </div>
                    <h3 style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.6rem", fontWeight: 400,
                      color: "var(--color-dark)", marginBottom: "0.75rem",
                    }}>
                      {cs.title}
                    </h3>
                    <p style={{
                      fontSize: "0.9rem", lineHeight: 1.7,
                      color: "#666", marginBottom: "1.25rem",
                    }}>
                      {cs.desc}
                    </p>
                    <div style={{
                      display: "inline-flex", alignItems: "center", gap: "0.5rem",
                      background: "var(--color-brand-10)", borderRadius: "8px",
                      padding: "0.5rem 1rem", marginBottom: "1.25rem", width: "fit-content",
                    }}>
                      <span style={{ fontSize: "1rem" }}>✓</span>
                      <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--color-brand-dark)" }}>
                        {cs.result}
                      </span>
                    </div>
                    <blockquote style={{
                      borderLeft: "2px solid var(--color-brand-20)",
                      paddingLeft: "1rem",
                      fontStyle: "italic",
                      fontSize: "0.85rem",
                      lineHeight: 1.6,
                      color: "#888",
                    }}>
                      &ldquo;{cs.quote}&rdquo;
                      <span style={{ display: "block", marginTop: "0.5rem", fontStyle: "normal", fontSize: "0.75rem", color: "var(--color-brand-dark)" }}>
                        — {cs.quoteAuthor}, {cs.client}
                      </span>
                    </blockquote>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VideoBreak 3 ─── */}
      <VideoBreak
        src={VID.corporate3}
        title="Тимбилдинг на природе"
        subtitle="BBQ и гриль под открытым небом"
      />

      {/* ═══════════════════════════════════════════════════════
          6. VIDEO CAROUSEL — 4 corporate videos
          ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: "6rem 0", background: "var(--color-cream)" }} aria-label="Видео">
        <div className="container">
          <Reveal>
            <span className="section-label">Видео</span>
            <h2 className="section-title" style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", marginBottom: "1.5rem" }}>
              Корпоративный <em style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--color-brand)" }}>сервис</em> в действии
            </h2>
          </Reveal>
          <VideoCarousel
            slides={[
              { src: VID.corporate1, title: "Организация конференций", subtitle: "Профессиональная команда для вашего бизнеса" },
              { src: VID.corporate2, title: "Сервировка для форумов", subtitle: "Быстрая подача, безупречный вид" },
              { src: VID.corporate3, title: "Тимбилдинг на природе", subtitle: "BBQ и гриль под открытым небом" },
              { src: VID.corporate4, title: "Шеф-повар за работой", subtitle: "Контроль качества на каждом этапе" },
            ]}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          7. PARALLAX DIVIDER
          ═══════════════════════════════════════════════════════ */}
      <ParallaxImage
        src={IMG.bar}
        alt="Кейтеринг для корпоративных мероприятий"
        speed={0.2}
        style={{ height: "40vh", minHeight: 250 }}
        overlay
        overlayOpacity={0.4}
      />

      {/* ═══════════════════════════════════════════════════════
          8. CTA — Full-bleed with ConfettiButton
          ═══════════════════════════════════════════════════════ */}
      <section style={{ position: "relative", overflow: "hidden" }} aria-label="Заказать корпоративное питание">
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${IMG.corporate})`,
          backgroundSize: "cover", backgroundPosition: "center",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, rgba(184,149,90,0.92) 0%, rgba(139,111,78,0.95) 100%)",
        }} />
        <div style={{ position: "relative", zIndex: 2, padding: "6rem 2rem" }}>
          <div className="container" style={{ textAlign: "center" }}>
            <Reveal>
              <h2 style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 400, color: "#fff",
                lineHeight: 1.2, marginBottom: "1.5rem",
              }}>
                Заказать <em style={{ fontStyle: "italic" }}>корпоративное</em> питание
              </h2>
              <p style={{
                fontSize: "1.05rem", lineHeight: 1.7,
                color: "rgba(255,255,255,0.8)",
                maxWidth: 560, margin: "0 auto 2.5rem",
              }}>
                Подготовим КП за 2 часа. Полный пакет документов, расчёт по вашему бюджету, бесплатная дегустация.
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
                <ConfettiButton
                  onClick={() => {}}
                  style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    padding: "1rem 2.5rem",
                    background: "#fff", color: "var(--color-brand-dark)",
                    fontSize: "0.75rem", fontWeight: 600,
                    letterSpacing: "0.15em", textTransform: "uppercase",
                    borderRadius: "100px", border: "none", cursor: "pointer",
                    transition: "all 0.4s",
                  }}
                >
                  Запросить КП
                </ConfettiButton>
                <MagneticButton as="a" href="tel:+78129195911" strength={0.2}>
                  <span style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    padding: "1rem 2.5rem",
                    background: "transparent", color: "#fff",
                    fontSize: "0.75rem", fontWeight: 600,
                    letterSpacing: "0.15em", textTransform: "uppercase",
                    border: "1.5px solid rgba(255,255,255,0.5)",
                    borderRadius: "100px", textDecoration: "none",
                    transition: "all 0.4s",
                  }}>
                    +7 (812) 919-59-11
                  </span>
                </MagneticButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          9. FOOTER
          ═══════════════════════════════════════════════════════ */}
      <footer className="footer" role="contentinfo">
        <div className="container">
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "center", flexWrap: "wrap", gap: "1rem",
            padding: "2rem 0",
          }}>
            <Link href="/" style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.5rem", fontWeight: 500,
              color: "#fff", textDecoration: "none",
              letterSpacing: "0.15em",
            }}>
              ИНТЕРФУД
            </Link>
            <nav style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }} aria-label="Навигация подвала">
              {[
                { label: "Меню", href: "/menu" },
                { label: "Свадьбы", href: "/wedding" },
                { label: "Корпоратив", href: "/corporate" },
                { label: "О нас", href: "/about" },
                { label: "Отзывы", href: "/reviews" },
                { label: "Главная", href: "/" },
              ].map((link) => (
                <Link key={link.href} href={link.href} style={{
                  color: "rgba(255,255,255,0.45)",
                  textDecoration: "none", fontSize: "0.85rem",
                  transition: "color 0.3s",
                }}>
                  {link.label}
                </Link>
              ))}
            </nav>
            <div style={{
              fontSize: "0.8rem", color: "rgba(255,255,255,0.35)",
            }}>
              &copy; 2007–2026 Интерфуд Кейтеринг
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Float */}
      <a
        href="https://wa.me/79119417205?text=Здравствуйте! Хочу заказать корпоративный кейтеринг."
        className="wa-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        style={{ fontSize: "1.4rem", color: "#fff", textDecoration: "none" }}
      >
        &#9742;
      </a>
    </>
  );
}
