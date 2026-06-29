"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════
   ИНТЕРФУД КЕЙТЕРИНГ — Свадебный кейтеринг / Wedding Page
   ═══════════════════════════════════════════════════════════════ */

const IMG = {
  wedding: "https://sfile.chatglm.cn/images-ppt/b77fad9eff9e.jpg",
  roses: "https://sfile.chatglm.cn/images-ppt/85381eb37c45.jpg",
  hall: "https://sfile.chatglm.cn/images-ppt/31ca0a361dc4.jpg",
  elegant: "https://sfile.chatglm.cn/images-ppt/5a35d18ab4c2.jpg",
  tiered: "https://sfile.chatglm.cn/images-ppt/f3e4e2fc7fb8.jpg",
  dessert: "https://sfile.chatglm.cn/images-ppt/cf9ca554baf6.jpg",
  bar: "https://sfile.chatglm.cn/images-ppt/c73dc40e41d4.jpg",
  decor: "https://sfile.chatglm.cn/images-ppt/99f244d30b4d.jpg",
  canape: "https://sfile.chatglm.cn/images-ppt/2585575d2db2.jpg",
  banquet: "https://sfile.chatglm.cn/images-ppt/b0afca3cdeee.jpg",
  staff: "https://sfile.chatglm.cn/images-ppt/73b69f6f313f.jpg",
  cocktail: "https://sfile.chatglm.cn/images-ppt/970cc7881d1a.jpg",
  champagne: "https://sfile.chatglm.cn/images-ppt/ba950f3cedb1.jpg",
  furshet: "https://sfile.chatglm.cn/images-ppt/a2fbd3b8447b.jpg",
  goldSkewers: "https://sfile.chatglm.cn/images-ppt/42140e1e738d.jpg",
};

const PACKAGES = [
  {
    name: "Классика",
    price: "от 6 500 ₽/чел",
    guests: "50–100",
    features: [
      "Индивидуальное меню из 8–12 позиций",
      "Обслуживающий персонал (1 официант на 8 гостей)",
      "Welcome-дринк при встрече гостей",
      "Сервировка столов и текстиль",
      "Координация подачи по таймлайну",
      "Меню для аллергиков и вегетарианцев",
    ],
    img: IMG.elegant,
  },
  {
    name: "Премиум",
    price: "от 9 800 ₽/чел",
    guests: "60–200",
    features: [
      "Всё из «Классика», плюс:",
      "Авторское меню из 14–18 позиций",
      "Барная стойка с коктейлями (4 часа)",
      "Шампанская пирамида",
      "Десертный стол с макаронами",
      "Персональный кейтеринг-менеджер",
      "Декор и цветочные композиции",
    ],
    img: IMG.wedding,
    popular: true,
  },
  {
    name: "Гранд",
    price: "от 14 500 ₽/чел",
    guests: "100–500",
    features: [
      "Всё из «Премиум», плюс:",
      "Шеф-стол с живой готовкой",
      "Винное сопровождение сомелье",
      "Шоколадный фонтан",
      "Полиция сервировки (хрусталь, фарфор)",
      "Выездная дегустация для молодожёнов",
      "Фуршетная зона и зона коктейлей",
      "Круглосуточная поддержка в день события",
    ],
    img: IMG.hall,
  },
];

const GALLERY = [
  { img: IMG.wedding, alt: "Свадебный фуршет у воды" },
  { img: IMG.roses, alt: "Белые розы и орхидеи" },
  { img: IMG.elegant, alt: "Элегантная сервировка" },
  { img: IMG.tiered, alt: "Многоярусная подача" },
  { img: IMG.dessert, alt: "Десертный стол" },
  { img: IMG.decor, alt: "Цветочный декор" },
  { img: IMG.champagne, alt: "Шампанская пирамида" },
  { img: IMG.hall, alt: "Банкетный зал" },
];

const REVIEWS = [
  { name: "Анна и Алексей", date: "Июнь 2025", guests: 120, text: "Интерфуд сделал наш день незабываемым. Внимание к деталям потрясающее — от сервировки до подачи блюд. Гости до сих пор вспоминают стейк и тирамису. Мы бесконечно благодарны команде!" },
  { name: "Екатерина и Пётр", date: "Сентябрь 2024", guests: 85, text: "Выбрали пакет «Премиум» и ни разу не пожалели. Шампанская пирамида стала настоящим хитом, а десертный стол был произведением искусства. Персонал — профессионалы высшего класса." },
  { name: "Мария и Дмитрий", date: "Август 2024", guests: 200, text: "Организовать свадьбу на 200 человек — это вызов, но Интерфуд справился безупречно. Каждый гость получил внимание, каждое блюдо было подано вовремя. Гранд-пакет превзошёл все ожидания." },
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

export default function WeddingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

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
      <section className="hero" ref={heroRef} aria-label="Свадебный кейтеринг">
        <motion.div className="hero-bg" style={{ y: heroY, backgroundImage: `url(${IMG.wedding})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="hero-overlay" style={{ background: "linear-gradient(135deg, rgba(12,11,11,0.75) 0%, rgba(26,42,74,0.5) 50%, rgba(12,11,11,0.7) 100%)" }} />
        <div className="hero-grain" />
        <motion.div className="hero-content" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.3 }}>
          <motion.div className="hero-tag" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
            Свадебный кейтеринг
          </motion.div>
          <h1 className="hero-title">Ваш идеальный<br /><em>свадебный</em> день</h1>
          <p className="hero-sub">От первого тоста до разреза торта — создадим гастрономическое путешествие, которое запомнится на всю жизнь. Авторская кухня, безупречный сервис, внимание к каждой детали.</p>
          <div className="hero-actions">
            <Link href="/#contact" className="btn-gold">Заказать свадьбу &#8594;</Link>
            <a href="#packages" className="btn-outline">Пакеты</a>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <div className="trust-bar">
        <div className="trust-inner">
          {[
            { label: "Свадеб проведено", value: "850+" },
            { label: "Средний рейтинг", value: "4.9" },
            { label: "Бесплатная дегустация", value: "Да" },
            { label: "Персональный менеджер", value: "24/7" },
          ].map((item, i) => (
            <div key={i} className="trust-item">
              <strong style={{ color: "var(--color-brand-light)" }}>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Why Wedding Catering */}
      <section className="section section-dark" aria-label="Почему мы">
        <div className="container">
          <Reveal>
            <span className="section-label">Свадебный кейтеринг</span>
            <h2 className="section-title">Почему выбирают <em>Интерфуд</em></h2>
            <p className="section-desc">Мы понимаем, что свадьба — самый важный день в вашей жизни. Наша команда обеспечивает безупречный сервис, чтобы вы могли наслаждаться каждым моментом, не беспокоясь ни о чём.</p>
          </Reveal>
          <motion.div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginTop: "2.5rem" }} variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {[
              { icon: "🍽", title: "Авторское меню", desc: "Шеф-повар Дмитрий Нилов создаёт уникальные блюда, которые отражают вашу историю любви. Индивидуальная дегустация перед заказом." },
              { icon: "🍾", title: "Шампанская пирамида", desc: "Вау-эффект, который запомнится гостям. Профессиональное приготовление и подача — от первой до последней капли." },
              { icon: "🌸", title: "Декор и флористика", desc: "Цветочные композиции, текстиль, свечи и сервировка в едином стиле. Работаем с лучшими флористами города." },
              { icon: "👨‍🍳", title: "Обслуживающий персонал", desc: "Один официант на каждые 8 гостей. Профессиональная форма, безупречные манеры, невидимый сервис." },
              { icon: "🥂", title: "Бар и коктейли", desc: "Авторские коктейли, винная карта от сомелье, welcome-дринк и безалкогольные опции для всех гостей." },
              { icon: "📞", title: "Персональный менеджер", desc: "Ваш личный кейтеринг-консьерж доступен 24/7. Координация с другими подрядчиками, контроль таймлайна." },
            ].map((item, i) => (
              <motion.div key={i} className="review-card" variants={staggerItem} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{item.icon}</div>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem", fontWeight: 400, marginBottom: "0.5rem", color: "var(--color-brand-light)" }}>{item.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.88rem", lineHeight: 1.6 }}>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Packages */}
      <section className="section section-navy" id="packages" aria-label="Пакеты">
        <div className="container">
          <Reveal>
            <span className="section-label">Пакеты</span>
            <h2 className="section-title">Свадебные <em>пакеты</em></h2>
            <p className="section-desc">Выберите подходящий пакет или обсудите индивидуальные условия с нашим менеджером.</p>
          </Reveal>
          <motion.div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginTop: "2.5rem" }} variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {PACKAGES.map((pkg, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                style={{
                  background: pkg.popular ? "rgba(184,149,90,0.08)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${pkg.popular ? "var(--color-brand)" : "rgba(184,149,90,0.15)"}`,
                  borderRadius: "16px", overflow: "hidden", position: "relative",
                  transition: "transform 0.4s, box-shadow 0.4s",
                }}
                whileHover={{ transform: "translateY(-6px)", boxShadow: "0 24px 60px rgba(0,0,0,0.3)" }}
              >
                {pkg.popular && (
                  <div style={{ position: "absolute", top: "1rem", right: "1rem", background: "var(--color-brand)", color: "#fff", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700, padding: "0.25rem 0.75rem", borderRadius: "4px" }}>
                    Популярный
                  </div>
                )}
                <div style={{ height: 200, overflow: "hidden" }}>
                  <img src={pkg.img} alt={pkg.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
                </div>
                <div style={{ padding: "1.75rem" }}>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", fontWeight: 400, color: "#fff", marginBottom: "0.3rem" }}>{pkg.name}</h3>
                  <div style={{ color: "var(--color-brand-light)", fontSize: "1.3rem", fontFamily: "var(--font-serif)", fontWeight: 300, marginBottom: "0.25rem" }}>{pkg.price}</div>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.78rem", marginBottom: "1.25rem" }}>{pkg.guests} гостей</div>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.5rem" }}>
                    {pkg.features.map((f, j) => (
                      <li key={j} style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.85rem", display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                        <span style={{ color: "var(--color-brand)", flexShrink: 0 }}>&#10003;</span> {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/#contact" className="btn-gold" style={{ width: "100%", justifyContent: "center", display: "inline-flex" }}>
                    Выбрать пакет
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section section-dark" aria-label="Галерея свадеб">
        <div className="container">
          <Reveal>
            <span className="section-label">Галерея</span>
            <h2 className="section-title">Наши <em>свадьбы</em></h2>
          </Reveal>
          <div className="gallery-masonry" style={{ marginTop: "2rem" }}>
            {GALLERY.map((item, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="gallery-item" onClick={() => setLightboxSrc(item.img)}>
                  <img src={item.img} alt={item.alt} loading="lazy" />
                  <div className="gallery-item-overlay"><span>+</span></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section section-dark" aria-label="Отзывы молодожёнов">
        <div className="container">
          <Reveal>
            <span className="section-label">Отзывы</span>
            <h2 className="section-title">Что говорят наши <em>молодожёны</em></h2>
          </Reveal>
          <motion.div className="reviews-grid" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {REVIEWS.map((rev, i) => (
              <motion.div key={i} className="review-card" variants={staggerItem}>
                <div className="review-stars">{"★".repeat(5)}</div>
                <p className="review-text">{rev.text}</p>
                <div className="review-author">{rev.name}</div>
                <div className="review-event">{rev.date} &middot; {rev.guests} гостей</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Full Bleed */}
      <section className="bleed" aria-label="Заказать свадьбу">
        <div className="bleed-bg" style={{ backgroundImage: `url(${IMG.roses})` }} />
        <div className="bleed-overlay" />
        <div className="bleed-content">
          <Reveal>
            <div>
              <h2 className="bleed-title">Создайте свою<br /><em>идеальную</em> свадьбу</h2>
              <p className="section-desc" style={{ margin: "0 auto 2rem", textAlign: "center", color: "rgba(255,255,255,0.7)" }}>
                Оставьте заявку — и наш кейтеринг-консьерж свяжется с вами в течение 30 минут для обсуждения деталей.
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/#contact" className="btn-gold">Заказать свадьбу</Link>
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

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div className="toast" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp */}
      <a href="https://wa.me/79119417205?text=Здравствуйте! Хочу заказать свадебный кейтеринг." className="wa-float" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">&#9742;</a>
    </>
  );
}
