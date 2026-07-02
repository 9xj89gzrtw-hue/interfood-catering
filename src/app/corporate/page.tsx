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
  hero: "/videos/hero-catering.mp4",
  corporate1: "/videos/hero-catering.mp4",
  corporate2: "/videos/hero-catering.mp4",
  corporate3: "/videos/hero-catering.mp4",
  corporate4: "/videos/hero-catering.mp4",
};

const IMG = {
  corporate: "/images/wedding.jpg",
  conference: "/images/hero_ship.jpg",
  teambuilding: "/images/food_general.jpg",
  presentation: "/images/banket_food1.jpg",
  buffet: "/images/furshet_food.jpg",
  bar: "/images/gallery_4.jpg",
  dessert: "/images/coffee.jpg",
  hero: "/images/gallery_1.jpg",
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
  { icon: "⏱", title: "Пунктуальность", desc: "Подача блюд по расписанию с точностью до 5 минут. Мы координируем каждый этап с вашим сценарием и таймлайном мероприятия. Опытная логистическая команда гарантирует отсутствие задержек даже при масштабных заказах.", lottie: "utensils" as const },
  { icon: "📐", title: "Масштаб", desc: "Организуем питание для мероприятий от 15 до 5 000 гостей. Увеличение или сокращение заказа возможно за 48 часов до события. Мы всегда держим резерв блюд на случай дополнительных участников, чтобы никто не остался голодным.", lottie: "star" as const },
  { icon: "🔄", title: "Гибкость", desc: "Меняем меню, тайминг и формат обслуживания за 24 часа до мероприятия. Адаптируемся под любые изменения в программе, будь то перенос обеда на час позже или добавление вегетариальной станции. Ваш комфорт — наш приоритет.", lottie: "glass" as const },
  { icon: "👨‍🍳", title: "Собственная кухня", desc: "Все блюда готовятся на собственной производственной базе площадью 800 м², а не собираются из покупных полуфабрикатов. Многоуровневый контроль качества на каждом этапе — от закупки продуктов до выезда на площадку. Это гарантирует свежесть и неизменный вкус.", lottie: "chef" as const },
  { icon: "🏢", title: "Единый подрядчик", desc: "Еда, бар, сервировка, персонал и логистика — одна заявка, один договор, одна команда. Вам не нужно координировать десятки подрядчиков: мы берём на себя всё от разработки концепции до финальной уборки. Экономия времени и бюджета гарантирована.", lottie: "heart" as const },
  { icon: "📊", title: "Отчётность", desc: "Полный пакет документов для бухгалтерии: договор, счета, акты выполненных работ, счета-фактуры. Работаем с НДС и без НДС, принимаем любые формы расчёта включая корпоративные карты. Прозрачная отчётность без скрытых доплат.", lottie: "star" as const },
];

const CASES = [
  {
    client: "Крупная энергетическая компания",
    title: "Ежегодный корпоративный форум",
    guests: 500,
    duration: "3 дня",
    result: "1 500+ кофе-брейков",
    desc: "Обеспечили полное питание на 3-дневном форуме: утренние кофе-брейки, бизнес-ланчи и вечерние приёмы. 12 станций, 40 официантов, подача строго по расписанию.",
    quote: "Интерфуд безупречно справился с масштабом нашего форума. Всё по расписанию, качество на высоте.",
    quoteAuthor: "Руководитель протокола",
    img: IMG.conference,
  },
  {
    client: "IT-компания (топ-3 в РФ)",
    title: "Презентация нового продукта",
    guests: 200,
    duration: "Полный день",
    result: "4.9 / 5.0 рейтинг",
    desc: "Фуршетный формат с интерактивными станциями и авторскими коктейлями для продуктовой презентации. Шеф-стол с живой готовкой позволил гостям наблюдать за приготовлением блюд в реальном времени, а десертная зона с шоколадным фонтаном стала главной фотозоной вечера. Брендированный сет-меню в корпоративных цветах компании. Рейтинг мероприятия — 4.9 из 5 по опросу участников.",
    quote: "Стильно, вкусно, профессионально. Наши сотрудники были в восторге от формата и качества.",
    quoteAuthor: "HR-директор",
    img: IMG.dessert,
  },
  {
    client: "Финансовая корпорация",
    title: "Корпоративный тимбилдинг",
    guests: 300,
    duration: "Outdoor BBQ",
    result: "Безупречное исполнение",
    desc: "Outdoor BBQ на 300 участников для корпоративного тимбилдинга на природе. Мы развернули гриль-станции с мраморной говядиной и стейками, полевую кухню с пловом на костре, кальянную зону и бар с авторскими лимонадами. Непогода не помешала — команда оперативно установила шатры с обогревом за 2 часа, а горячие блюда и глинтвейн согрели гостей. Мероприятие получило высшую оценку от участников.",
    quote: "Даже дождь не испортил мероприятие — команда Интерфуда оперативно установила шатры. Всё прошло идеально.",
    quoteAuthor: "Организатор мероприятия",
    img: IMG.teambuilding,
  },
];

/* ─── Animation helpers ─── */

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] as const } },
};

const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const staggerItem = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const } },
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
            preload="metadata"
            aria-hidden="true"
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
            text="Кейтеринг, который работает на ваш результат"
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
            Конференции, форумы, тимбилдинги — с документами, НДС и гарантией по договору.
          </motion.p>

          <motion.div
            style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <MagneticButton as="a" href="/#contact" className="btn-gold" strength={0.2}>
              Запросить КП — ответим за 2 часа
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
                  color: "var(--color-text-muted)",
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
            className="corporate-formats-grid"
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
                        color: "var(--color-text-secondary)", marginBottom: "1rem", flex: 1,
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
        subtitle="Питание, которое не отвлекает от деловой программы"
      />

      {/* ═══════════════════════════════════════════════════════
          3. ADVANTAGES — 6 cards with LottiePlaceholder icons
          ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: "6rem 0", background: "var(--color-cream)" }} aria-label="Преимущества">
        <div className="container">
          <Reveal>
            <span className="section-label">Преимущества</span>
            <h2 className="section-title">
              Почему <em style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--color-brand)" }}>компании</em> возвращаются к нам
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
                    color: "var(--color-text-muted)", flex: 1,
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
        subtitle="Подача с точностью до 5 минут — без задержек"
      />

      {/* ═══════════════════════════════════════════════════════
          4. CLIENT LOGOS MARQUEE + CLIENT NAMES
          ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: "6rem 0", background: "#FEFDFB" }} aria-label="Наши клиенты">
        <div className="container">
          <Reveal>
            <span className="section-label">Клиенты</span>
          </Reveal>
          <TextReveal
            text="Нам доверяют лидеры"
            as="h2"
            className="section-title"
          />
          <Reveal delay={0.15}>
            <p className="section-subtitle" style={{ margin: "0 auto 3rem" }}>
              Более 85 корпоративных клиентов доверяют нам своё реноме. 98% обращаются повторно — потому что мы не подводим.
            </p>
          </Reveal>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.5rem",
            textAlign: "center",
          }}>
            {[
              { name: "Ведущая энергетическая компания", sector: "Энергетика" },
              { name: "Топ-3 банк РФ", sector: "Финансы" },
              { name: "IT-гигант", sector: "Технологии" },
              { name: "Крупнейшая соцсеть", sector: "IT и медиа" },
              { name: "Финтех-лидер", sector: "Финтех" },
              { name: "Госкорпорация", sector: "Атомная энергетика" },
              { name: "Нефтегазовый холдинг", sector: "Нефтегаз" },
              { name: "Телеком-оператор №1", sector: "Телекоммуникации" },
              { name: "Федеральный оператор связи", sector: "Телекоммуникации" },
              { name: "Нефтехимический концерн", sector: "Нефтехимия" },
            ].map((client, i) => (
              <Reveal key={client.name} delay={i * 0.05}>
                <div className="review-card" style={{
                  padding: "1.5rem 1rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.5rem",
                }}>
                  <span style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.1rem",
                    fontWeight: 500,
                    color: "var(--color-dark)",
                  }}>
                    {client.name}
                  </span>
                  <span style={{
                    fontSize: "0.7rem",
                    color: "var(--color-brand)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}>
                    {client.sector}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
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
                <div className="card corporate-case-card" style={{
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
                      <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
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
                      color: "var(--color-text-secondary)", marginBottom: "1.25rem",
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
                      color: "var(--color-text-muted)",
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
              { src: VID.corporate1, title: "Организация конференций", subtitle: "500 гостей, 12 станций — ни один участник не ждал дольше 3 минут" },
              { src: VID.corporate2, title: "Сервировка для форумов", subtitle: "Подача с точностью до 5 минут — координация с вашим таймлайном" },
              { src: VID.corporate3, title: "Тимбилдинг на природе", subtitle: "BBQ с мраморной говядиной, полевая кухня и бар под открытым небом" },
              { src: VID.corporate4, title: "Шеф-повар за работой", subtitle: "Живая готовка на шеф-столе — шоу, которое запоминается" },
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
        className="parallax-ken-burns"
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
                Заказать <em style={{ fontStyle: "italic" }}>корпоративное</em> питание — с гарантией по договору
              </h2>
              <p style={{
                fontSize: "1.05rem", lineHeight: 1.7,
                color: "rgba(255,255,255,0.8)",
                maxWidth: 560, margin: "0 auto 2.5rem",
              }}>
                Подготовим КП за 2 часа. Полный пакет документов, расчёт по вашему бюджету, бесплатная дегустация от 30 человек.
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
                <ConfettiButton
                  onClick={() => {}}
                  style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    padding: "1rem 2.5rem",
                    background: "var(--color-warm-white)", color: "var(--color-brand-dark)",
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
        aria-label="Написать в WhatsApp"
      >
        <svg
          width="28"
          height="28"
          fill="#fff"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* ═══ Responsive overrides for corporate grids ═══ */}
      <style jsx global>{`
        @media (max-width: 1024px) {
          .corporate-formats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .corporate-formats-grid {
            grid-template-columns: 1fr !important;
          }
          .corporate-case-card {
            grid-template-columns: 1fr !important;
          }
          .corporate-case-card > div:first-child {
            height: 200px !important;
          }
          .trust-bar-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
        }
      `}</style>
    </>
  );
}
