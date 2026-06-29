"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════
   ИНТЕРФУД КЕЙТЕРИНГ — Меню / Menu Page
   ═══════════════════════════════════════════════════════════════ */

const IMG = {
  hero: "https://sfile.chatglm.cn/images-ppt/3a442a2e6e71.jpg",
  furshet: "https://sfile.chatglm.cn/images-ppt/a2fbd3b8447b.jpg",
  banquet: "https://sfile.chatglm.cn/images-ppt/b0afca3cdeee.jpg",
  coffee: "https://sfile.chatglm.cn/images-ppt/4f51d25798b0.jpg",
  canape: "https://sfile.chatglm.cn/images-ppt/2585575d2db2.jpg",
  dessert: "https://sfile.chatglm.cn/images-ppt/cf9ca554baf6.jpg",
  bar: "https://sfile.chatglm.cn/images-ppt/c73dc40e41d4.jpg",
  tartlets: "https://sfile.chatglm.cn/images-ppt/736bf356163e.jpg",
  appetizers: "https://sfile.chatglm.cn/images-ppt/bccee1eeb146.jpg",
  goldSkewers: "https://sfile.chatglm.cn/images-ppt/42140e1e738d.jpg",
  canape2: "https://sfile.chatglm.cn/images-ppt/75acfcbd3339.jpg",
  colorful: "https://sfile.chatglm.cn/images-ppt/ba950f3cedb1.jpg",
};

const CATEGORIES = [
  {
    key: "furshet",
    label: "Фуршет",
    desc: "Элегантные канапе, тарталетки и закуски для свободного общения. Идеально для приёмов, презентаций и арт-вечеринок.",
    img: IMG.furshet,
    priceFrom: "2 450",
    minGuests: 30,
    items: [
      { name: "Канапе с красной икрой", weight: "30г", price: "165 ₽", tag: "Хит" },
      { name: "Тарталетка с сыром и орехом", weight: "35г", price: "120 ₽" },
      { name: "Брускетта с томатами и базиликом", weight: "40г", price: "145 ₽" },
      { name: "Мини-рулет из сёмги", weight: "35г", price: "190 ₽", tag: "Премиум" },
      { name: "Шашлычок из креветки", weight: "30г", price: "210 ₽" },
      { name: "Канапе с ростбифом и хреном", weight: "35г", price: "175 ₽" },
      { name: "Мини-эклер с паштетом", weight: "25г", price: "130 ₽" },
      { name: "Корзиночка с грибами", weight: "30г", price: "110 ₽" },
      { name: "Канапе с трюфельной пастой", weight: "25г", price: "250 ₽", tag: "Премиум" },
      { name: "Лодочка с авокадо и крабом", weight: "35г", price: "195 ₽" },
      { name: "Шпажка с моцареллой и черри", weight: "30г", price: "115 ₽" },
      { name: "Волован с куриным рийетом", weight: "35г", price: "135 ₽" },
    ],
  },
  {
    key: "banquet",
    label: "Банкет",
    desc: "Многокурсный ужин с авторскими блюдами шеф-повара Дмитрия Нилова, винным сопровождением и безупречной подачей.",
    img: IMG.banquet,
    priceFrom: "4 470",
    minGuests: 20,
    items: [
      { name: "Карпаччо из говядины с рукколой", weight: "80г", price: "420 ₽", tag: "Рекомендуем" },
      { name: "Салат «Цезарь» с курицей", weight: "150г", price: "380 ₽" },
      { name: "Тартар из тунца с авокадо", weight: "100г", price: "520 ₽", tag: "Премиум" },
      { name: "Крем-суп из тыквы с кедровыми орехами", weight: "250мл", price: "290 ₽" },
      { name: "Стейк Рибай с овощами гриль", weight: "200г", price: "890 ₽", tag: "Хит" },
      { name: "Филе сибаса на пару", weight: "180г", price: "750 ₽" },
      { name: "Ризотто с белыми грибами", weight: "200г", price: "450 ₽" },
      { name: "Десерт «Тирамису»", weight: "120г", price: "340 ₽" },
      { name: "Фруктовая тарелка", weight: "200г", price: "350 ₽" },
      { name: "Чай / кофе с мини-десертом", weight: "", price: "150 ₽" },
    ],
  },
  {
    key: "coffee",
    label: "Кофе-брейк",
    desc: "Кофе, чай, выпечка и лёгкие закуски для деловых встреч, конференций и семинаров. Быстрая подача, минимум отвлечений.",
    img: IMG.coffee,
    priceFrom: "950",
    minGuests: 15,
    items: [
      { name: "Кофе зерновой (эспрессо, американо, капучино)", weight: "", price: "120 ₽" },
      { name: "Чай чёрный / зелёный / травяной", weight: "", price: "80 ₽" },
      { name: "Круассаны свежей выпечки", weight: "50г", price: "95 ₽" },
      { name: "Маффины шоколадные", weight: "60г", price: "110 ₽" },
      { name: "Сэндвичи с курицей и овощами", weight: "80г", price: "160 ₽" },
      { name: "Фруктовая нарезка сезонная", weight: "100г", price: "180 ₽" },
      { name: "Печенье ассорти", weight: "40г", price: "65 ₽" },
      { name: "Минеральная вода", weight: "0.5л", price: "70 ₽" },
      { name: "Соки натуральные", weight: "200мл", price: "90 ₽" },
      { name: "Йогурт с мюсли", weight: "120г", price: "130 ₽" },
    ],
  },
  {
    key: "bar",
    label: "Барная стойка",
    desc: "Профессиональные бармены, авторские коктейли и премиальный алкоголь. Вwelcome-дринк до шампанской пирамиды.",
    img: IMG.bar,
    priceFrom: "2 500",
    minGuests: 30,
    items: [
      { name: "Welcome-дринк (игристое/коктейль)", weight: "150мл", price: "350 ₽", tag: "Популярное" },
      { name: "Коктейль «Мохито»", weight: "250мл", price: "450 ₽" },
      { name: "Коктейль «Олд Фэшн»", weight: "150мл", price: "520 ₽" },
      { name: "Вино белое/красное (бокал)", weight: "150мл", price: "380 ₽" },
      { name: "Шампанское (бокал)", weight: "150мл", price: "420 ₽" },
      { name: "Водка премиум (рюмка)", weight: "50мл", price: "280 ₽" },
      { name: "Шампанская пирамида (за бокал)", weight: "150мл", price: "500 ₽", tag: "Вау-эффект" },
      { name: "Безалкогольный коктейль", weight: "250мл", price: "250 ₽" },
    ],
  },
  {
    key: "dessert",
    label: "Десертный стол",
    desc: "Изысканные десерты, макаруны, пирожные и шоколадные фонтаны. Визуальный и гастрономический восторг для гостей.",
    img: IMG.dessert,
    priceFrom: "1 800",
    minGuests: 20,
    items: [
      { name: "Макарон ассорти (6 вкусов)", weight: "72г", price: "380 ₽", tag: "Хит" },
      { name: "Тарталетка с крем-брюле", weight: "60г", price: "220 ₽" },
      { name: "Шоколадный фондан", weight: "80г", price: "340 ₽" },
      { name: "Панна-котта с ягодами", weight: "100г", price: "280 ₽" },
      { name: "Чизкейк «Нью-Йорк»", weight: "100г", price: "300 ₽" },
      { name: "Эклеры с заварным кремом", weight: "50г", price: "180 ₽" },
      { name: "Фруктовая нарезка премиум", weight: "150г", price: "350 ₽" },
      { name: "Шоколадный фонтан (аренда + шоколад)", weight: "", price: "8 500 ₽", tag: "Вау-эффект" },
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } },
};
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
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

export default function MenuPage() {
  const [activeCat, setActiveCat] = useState("furshet");
  const [scrolled, setScrolled] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const currentCategory = CATEGORIES.find((c) => c.key === activeCat) || CATEGORIES[0];

  return (
    <>
      {/* Nav */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`} role="navigation" aria-label="Навигация">
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
      <section className="hero" style={{ minHeight: "55vh" }} aria-label="Меню">
        <div className="hero-bg" style={{ backgroundImage: `url(${IMG.hero})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="hero-overlay" />
        <div className="hero-grain" />
        <div className="hero-content">
          <motion.div className="hero-tag" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            Гастрономия
          </motion.div>
          <h1 className="hero-title" style={{ fontSize: "clamp(2.2rem, 6vw, 4.5rem)" }}>Наше <em>меню</em></h1>
          <p className="hero-sub">Авторские блюда от шеф-повара Дмитрия Нилова. Каждое меню составляется индивидуально под ваше мероприятие.</p>
        </div>
      </section>

      {/* Category Navigation */}
      <div style={{ background: "var(--color-dark)", borderBottom: "1px solid rgba(184,149,90,0.1)", padding: "1.5rem 2rem", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", display: "flex", gap: "0.5rem", overflowX: "auto", scrollbarWidth: "none" }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCat(cat.key)}
              className={`menu-tab ${activeCat === cat.key ? "active" : ""}`}
              style={{ flexShrink: 0, padding: "0.65rem 1.5rem", fontSize: "0.82rem" }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Content */}
      <section className="section section-dark">
        <div className="container">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCat}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Category Header */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center", marginBottom: "3rem" }}>
                <div>
                  <span className="section-label">{currentCategory.label}</span>
                  <h2 className="section-title" style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)" }}>
                    {currentCategory.label} <em>кейтеринг</em>
                  </h2>
                  <p className="section-desc" style={{ maxWidth: "none" }}>{currentCategory.desc}</p>
                  <div style={{ display: "flex", gap: "1.5rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
                    <div style={{ background: "rgba(184,149,90,0.08)", border: "1px solid rgba(184,149,90,0.2)", padding: "0.75rem 1.25rem", borderRadius: "8px" }}>
                      <div style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "0.2rem" }}>От</div>
                      <div style={{ color: "var(--color-brand-light)", fontSize: "1.4rem", fontFamily: "var(--font-serif)", fontWeight: 300 }}>{currentCategory.priceFrom} ₽/чел</div>
                    </div>
                    <div style={{ background: "rgba(184,149,90,0.08)", border: "1px solid rgba(184,149,90,0.2)", padding: "0.75rem 1.25rem", borderRadius: "8px" }}>
                      <div style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "0.2rem" }}>Минимум</div>
                      <div style={{ color: "#fff", fontSize: "1.4rem", fontFamily: "var(--font-serif)", fontWeight: 300 }}>{currentCategory.minGuests} гостей</div>
                    </div>
                  </div>
                </div>
                <div className="about-img" style={{ cursor: "pointer" }} onClick={() => setLightboxSrc(currentCategory.img)}>
                  <img src={currentCategory.img} alt={currentCategory.label} loading="lazy" />
                </div>
              </div>

              {/* Items */}
              <div style={{ marginTop: "2rem" }}>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", fontWeight: 400, color: "var(--color-brand-light)", marginBottom: "1rem", letterSpacing: "0.05em" }}>
                  Позиции меню
                </h3>
                <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}>
                  {currentCategory.items.map((item, i) => (
                    <motion.div key={i} className="menu-item" variants={staggerItem} style={{ padding: "1rem 0", display: "grid", gridTemplateColumns: "1fr auto auto", gap: "1rem", alignItems: "center" }}>
                      <div>
                        <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.95rem" }}>{item.name}</span>
                        {item.tag && (
                          <span style={{ marginLeft: "0.75rem", background: item.tag === "Премиум" ? "rgba(184,149,90,0.15)" : item.tag === "Вау-эффект" ? "rgba(158,182,143,0.15)" : "rgba(255,255,255,0.06)", color: item.tag === "Премиум" ? "var(--color-brand-light)" : item.tag === "Вау-эффект" ? "var(--color-sage)" : "rgba(255,255,255,0.5)", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.15rem 0.5rem", borderRadius: "3px", fontWeight: 600 }}>
                            {item.tag}
                          </span>
                        )}
                      </div>
                      <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem" }}>{item.weight}</span>
                      <span style={{ color: "var(--color-brand-light)", fontWeight: 500, whiteSpace: "nowrap" }}>{item.price}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* CTA */}
          <Reveal>
            <div style={{ textAlign: "center", marginTop: "4rem", padding: "3rem", background: "rgba(184,149,90,0.04)", border: "1px solid rgba(184,149,90,0.15)", borderRadius: "20px" }}>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", fontWeight: 300, marginBottom: "0.75rem" }}>Хотите <em style={{ fontStyle: "italic", color: "var(--color-brand-light)" }}>индивидуальное</em> меню?</h3>
              <p style={{ color: "rgba(255,255,255,0.5)", maxWidth: 500, margin: "0 auto 1.5rem", fontSize: "0.95rem", lineHeight: 1.7 }}>
                Каждое меню разрабатывается персонально. Мы учтём ваши предпочтения, диетические ограничения и бюджет. Бесплатная дегустация от 50 гостей.
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/#contact" className="btn-gold">Заказать меню</Link>
                <Link href="/#calculator" className="btn-outline">Рассчитать стоимость</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Gallery Strip */}
      <section className="section section-dark" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <h3 className="section-title" style={{ fontSize: "1.4rem", marginBottom: "1.5rem" }}>Примеры <em>подачи</em></h3>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
            {[IMG.canape, IMG.tartlets, IMG.appetizers, IMG.goldSkewers, IMG.canape2, IMG.colorful, IMG.dessert, IMG.bar].map((img, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="gallery-item" onClick={() => setLightboxSrc(img)}>
                  <img src={img} alt={`Подача блюд ${i + 1}`} loading="lazy" />
                  <div className="gallery-item-overlay"><span>+</span></div>
                </div>
              </Reveal>
            ))}
          </div>
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
      <a href="https://wa.me/79119417205?text=Здравствуйте! Хочу заказать кейтеринг." className="wa-float" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">&#9742;</a>
    </>
  );
}
