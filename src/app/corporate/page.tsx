"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════
   ИНТЕРФУД КЕЙТЕРИНГ — Корпоративный кейтеринг / Corporate Page
   ═══════════════════════════════════════════════════════════════ */

const IMG = {
  corporate: "https://sfile.chatglm.cn/images-ppt/b26bc8017630.png",
  coffee: "https://sfile.chatglm.cn/images-ppt/4f51d25798b0.jpg",
  furshet: "https://sfile.chatglm.cn/images-ppt/a2fbd3b8447b.jpg",
  banquet: "https://sfile.chatglm.cn/images-ppt/b0afca3cdeee.jpg",
  hall: "https://sfile.chatglm.cn/images-ppt/31ca0a361dc4.jpg",
  bar: "https://sfile.chatglm.cn/images-ppt/c73dc40e41d4.jpg",
  staff: "https://sfile.chatglm.cn/images-ppt/73b69f6f313f.jpg",
  canape: "https://sfile.chatglm.cn/images-ppt/2585575d2db2.jpg",
  cocktail: "https://sfile.chatglm.cn/images-ppt/970cc7881d1a.jpg",
  festive: "https://sfile.chatglm.cn/images-ppt/7b99135d2e61.jpg",
  buffet: "https://sfile.chatglm.cn/images-ppt/75acfcbd3339.jpg",
  dessert: "https://sfile.chatglm.cn/images-ppt/cf9ca554baf6.jpg",
};

const FORMATS = [
  {
    name: "Корпоративный фуршет",
    price: "от 2 450 ₽/чел",
    guests: "30–500",
    desc: "Элегантные канапе и закуски для свободного общения. Идеально для юбилеев компании, выставок и приёмов.",
    img: IMG.furshet,
    features: ["30+ позиций меню", "Официанты и бармены", "Сервировка и текстиль", "Барная стойка"],
  },
  {
    name: "Бизнес-банкет",
    price: "от 4 470 ₽/чел",
    guests: "20–300",
    desc: "Многокурсный ужин с авторскими блюдами для статусных мероприятий и награждений.",
    img: IMG.banquet,
    features: ["5–7 курсов", "Винная карта от сомелье", "Индивидуальная сервировка", "Координация таймлайна"],
  },
  {
    name: "Кофе-брейк",
    price: "от 950 ₽/чел",
    guests: "15–1000",
    desc: "Кофе, чай, выпечка и лёгкие закуски для конференций, семинаров и деловых встреч.",
    img: IMG.coffee,
    features: ["Быстрая подача", "Несколько станций", "Меню для аллергиков", "Гибкий тайминг"],
  },
  {
    name: "Шведский стол",
    price: "от 2 800 ₽/чел",
    guests: "50–1000",
    desc: "Разнообразные станции с блюдами разных кухонь мира. Масштабируемое решение для крупных мероприятий.",
    img: IMG.buffet,
    features: ["5–8 станций", "Живая готовка", "Вегетарианские опции", "Эко-посуда"],
  },
];

const CLIENTS = [
  "Газпром", "Сбербанк", "Яндекс", "VK", "Тинькофф", "Росатом",
  "Лукойл", "МТС", "Ростелеком", "СИБУР", "Норникель", "Магнит",
];

const CASES = [
  {
    title: "Годовой форум IT-компании",
    client: "Крупный IT-холдинг",
    guests: 500,
    format: "Кофе-брейк + Фуршет",
    desc: "Обеспечили питание на 3-дневном форуме: утренние кофе-брейки, обеденные фуршеты и вечерние приёмы. 12 станций, 40 официантов, 0 задержек.",
    img: IMG.hall,
  },
  {
    title: "Юбилей промышленного концерна",
    client: "Промышленный холдинг",
    guests: 300,
    format: "Банкет",
    desc: "Премиальный банкет на 300 персон в историческом особняке. Авторское меню из 7 курсов, живая музыка, шампанская пирамида.",
    img: IMG.banquet,
  },
  {
    title: "Открытие нового офиса",
    client: "Финтех-стартап",
    guests: 150,
    format: "Фуршет + Коктейльная зона",
    desc: "Современный формат с фуршетными станциями и авторскими коктейлями. Шеф-стол с живой готовкой и десертная зона.",
    img: IMG.festive,
  },
];

const ADVANTAGES = [
  { icon: "📋", title: "Полное документальное оформление", desc: "Договор, счета, акты выполненных работ, счета-фактуры. Работаем с НДС и без. Любые формы расчёта." },
  { icon: "👨‍💼", title: "Выделенный менеджер проекта", desc: "Персональный менеджер курирует ваш проект от заявки до финальной уборки. Доступен 24/7 в день мероприятия." },
  { icon: "🕐", title: "Точное соблюдение таймлайна", desc: "Подача блюд по расписанию с точностью до 5 минут. Координация с вашим сценаристом и ведущим." },
  { icon: "🌿", title: "Экологичные решения", desc: "Биоразлагаемая посуда, сортировка отходов, локальные поставщики. Экологичный кейтеринг для осознанного бизнеса." },
  { icon: "🔒", title: "NDA и конфиденциальность", desc: "Подписываем NDA. Дискретный персонал, закрытые площадки. Ваше мероприятие остаётся вашим." },
  { icon: "📊", title: "Гибкое масштабирование", desc: "От 15 до 5000 гостей. Увеличение или сокращение за 48 часов. Резерв блюд на случай доп. гостей." },
];

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

export default function CorporatePage() {
  const [scrolled, setScrolled] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Nav */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`} role="navigation">
        <div className="nav-inner">
          <Link href="/" className="nav-logo">ИНТЕРФУД</Link>
          <ul className="nav-links">
            <li><Link href="/menu">Меню</Link></li>
            <li><Link href="/wedding">Свадьбы</Link></li>
            <li><Link href="/corporate">Корпоратив</Link></li>
            <li><Link href="/#about">О нас</Link></li>
            <li><Link href="/#gallery">Галерея</Link></li>
            <li><Link href="/#contact" className="nav-cta">Заказать</Link></li>
          </ul>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero" ref={heroRef} aria-label="Корпоративный кейтеринг">
        <motion.div className="hero-bg" style={{ y: heroY, backgroundImage: `url(${IMG.corporate})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="hero-overlay" style={{ background: "linear-gradient(135deg, rgba(10,22,40,0.85) 0%, rgba(12,11,11,0.7) 50%, rgba(10,22,40,0.8) 100%)" }} />
        <div className="hero-grain" />
        <motion.div className="hero-content" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.3 }}>
          <motion.div className="hero-tag" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
            Корпоративный кейтеринг
          </motion.div>
          <h1 className="hero-title">Кейтеринг для<br /><em>бизнеса</em></h1>
          <p className="hero-sub">Профессиональное питание для мероприятий любого масштаба. Полное документальное оформление, выделенный менеджер и безупречный сервис.</p>
          <div className="hero-actions">
            <Link href="/#contact" className="btn-gold">Запросить КП &#8594;</Link>
            <a href="#formats" className="btn-outline">Форматы</a>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <div className="trust-bar">
        <div className="trust-inner">
          {[
            { label: "Корпоративов проведено", value: "1 200+" },
            { label: "Постоянных клиентов", value: "85+" },
            { label: "Макс. гостей на мероп.", value: "5 000" },
            { label: "Работаем с НДС", value: "Да" },
          ].map((item, i) => (
            <div key={i} className="trust-item">
              <strong style={{ color: "var(--color-brand-light)" }}>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Formats */}
      <section className="section section-dark" id="formats" aria-label="Форматы">
        <div className="container">
          <Reveal>
            <span className="section-label">Форматы</span>
            <h2 className="section-title">Подберите <em>формат</em></h2>
            <p className="section-desc">От кофе-брейка на 15 человек до банкета на 5000 гостей. Масштабируемые решения под ваш бюджет.</p>
          </Reveal>
          <motion.div className="services-grid" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            {FORMATS.map((fmt) => (
              <motion.div key={fmt.name} className="service-card" variants={staggerItem}>
                <img src={fmt.img} alt={fmt.name} loading="lazy" />
                <div className="service-overlay" />
                <div className="service-info">
                  <span className="service-tag">{fmt.guests} гостей</span>
                  <div className="service-name">{fmt.name}</div>
                  <div className="service-price">{fmt.price}</div>
                  <div className="service-desc">{fmt.desc}</div>
                  <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginTop: "0.75rem" }}>
                    {fmt.features.map((f, j) => (
                      <span key={j} style={{ background: "rgba(184,149,90,0.12)", color: "var(--color-brand-light)", fontSize: "0.65rem", padding: "0.2rem 0.5rem", borderRadius: "3px", letterSpacing: "0.05em" }}>
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Advantages */}
      <section className="section section-navy" aria-label="Преимущества">
        <div className="container">
          <Reveal>
            <span className="section-label">Преимущества</span>
            <h2 className="section-title">Почему <em>компании</em> выбирают нас</h2>
          </Reveal>
          <motion.div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginTop: "2.5rem" }} variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {ADVANTAGES.map((item, i) => (
              <motion.div key={i} className="review-card" variants={staggerItem}>
                <div style={{ fontSize: "1.8rem", marginBottom: "0.75rem" }}>{item.icon}</div>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", fontWeight: 400, marginBottom: "0.5rem", color: "var(--color-brand-light)" }}>{item.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.88rem", lineHeight: 1.6 }}>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="section section-dark" aria-label="Наши клиенты">
        <div className="container" style={{ textAlign: "center" }}>
          <Reveal>
            <span className="section-label">Клиенты</span>
            <h2 className="section-title">Нам <em>доверяют</em></h2>
          </Reveal>
          <motion.div
            style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap", marginTop: "2rem" }}
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            {CLIENTS.map((client, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                style={{
                  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
                  padding: "1rem 2rem", borderRadius: "8px", fontSize: "0.9rem",
                  color: "rgba(255,255,255,0.5)", fontWeight: 500, letterSpacing: "0.05em",
                }}
              >
                {client}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="section section-dark" aria-label="Кейсы">
        <div className="container">
          <Reveal>
            <span className="section-label">Кейсы</span>
            <h2 className="section-title">Наши <em>кейсы</em></h2>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem", marginTop: "2.5rem" }}>
            {CASES.map((cs, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "2rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(184,149,90,0.1)", borderRadius: "16px", overflow: "hidden" }}>
                  <div style={{ height: 280, overflow: "hidden" }}>
                    <img src={cs.img} alt={cs.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
                  </div>
                  <div style={{ padding: "2rem 2rem 2rem 0" }}>
                    <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-brand)", fontWeight: 600 }}>{cs.format}</span>
                    <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", fontWeight: 400, color: "#fff", margin: "0.5rem 0" }}>{cs.title}</h3>
                    <div style={{ display: "flex", gap: "1.5rem", marginBottom: "0.75rem" }}>
                      <span style={{ fontSize: "0.82rem", color: "var(--color-brand-light)" }}>{cs.client}</span>
                      <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.4)" }}>{cs.guests} гостей</span>
                    </div>
                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.92rem", lineHeight: 1.7 }}>{cs.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bleed" aria-label="Запросить КП">
        <div className="bleed-bg" style={{ backgroundImage: `url(${IMG.bar})` }} />
        <div className="bleed-overlay" />
        <div className="bleed-content">
          <Reveal>
            <div>
              <h2 className="bleed-title">Запросите <em>коммерческое</em><br />предложение</h2>
              <p className="section-desc" style={{ margin: "0 auto 2rem", textAlign: "center", color: "rgba(255,255,255,0.7)" }}>
                Подготовим КП за 2 часа. Полный пакет документов, расчёт по вашему бюджету, бесплатная дегустация.
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/#contact" className="btn-gold">Запросить КП</Link>
                <a href="tel:+78129195911" className="btn-outline">+7 (812) 919-59-11</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" role="contentinfo">
        <div className="footer-inner">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <Link href="/" className="footer-brand" style={{ textDecoration: "none" }}>ИНТЕРФУД</Link>
            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
              <Link href="/menu" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none", fontSize: "0.85rem" }}>Меню</Link>
              <Link href="/wedding" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none", fontSize: "0.85rem" }}>Свадьбы</Link>
              <Link href="/corporate" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none", fontSize: "0.85rem" }}>Корпоратив</Link>
              <Link href="/" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none", fontSize: "0.85rem" }}>Главная</Link>
            </div>
            <div className="footer-copy">&copy; 2007–2026 Интерфуд Кейтеринг</div>
          </div>
        </div>
      </footer>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxSrc && (
          <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightboxSrc(null)}>
            <motion.img src={lightboxSrc} alt="Увеличенное фото" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ duration: 0.3 }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp */}
      <a href="https://wa.me/79119417205?text=Здравствуйте! Хочу заказать корпоративный кейтеринг." className="wa-float" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">&#9742;</a>
    </>
  );
}
