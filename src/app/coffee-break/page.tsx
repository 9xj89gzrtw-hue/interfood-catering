"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════
   NAV LINKS
   ═══════════════════════════════════════════════════════════ */
const NAV_LINKS = [
  { href: "/", label: "Главная" },
  { href: "/furshet", label: "Фуршет" },
  { href: "/banket", label: "Банкет" },
  { href: "/svadba", label: "Свадьба" },
  { href: "/coffee-break", label: "Кофе-брейк" },
  { href: "/korporativ", label: "Корпоратив" },
  { href: "/gallery", label: "Галерея" },
  { href: "/about", label: "О компании" },
  { href: "/contacts", label: "Контакты" },
];

const currentPage = "/coffee-break";

/* ═══════════════════════════════════════════════════════════
   REVEAL HOOK & COMPONENT
   ═══════════════════════════════════════════════════════════ */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function Reveal({
  children,
  className = "",
  variant = "rv",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "rv" | "rv-left" | "rv-right" | "rv-scale";
  delay?: number;
}) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className={`${variant} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

const WA_ICON = (
  <svg viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

/* ═══════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════ */
const FEATURES = [
  {
    icon: "⚡",
    title: "Быстрая организация",
    desc: "Размещение кофе-брейк зоны за 30 минут. Наша команда прибывает заранее, полностью оборудует зону подачи и готова встретить гостей точно к началу перерыва. Минимум времени на подготовку — максимум комфорта для участников.",
  },
  {
    icon: "🎤",
    title: "Формат конференции",
    desc: "Специально адаптированный формат для деловых мероприятий: компактная расстановка, удобный доступ для большого потока гостей, тихая подача без отвлечения от программы.",
  },
  {
    icon: "🥐",
    title: "Свежая выпечка",
    desc: "Вся выпечка готовится в утреннюю смену и доставляется свежей. Круассаны, маффины, даныши и сендвичи — каждое изделие выпекается из премиальных ингредиентов в день мероприятия.",
  },
];

const PRICE_TIERS = [
  {
    name: "Стандарт",
    price: "800",
    featured: false,
    items: [
      "Кофе зерновой (2 сорта)",
      "Чай чёрный и зелёный",
      "Печенье ассорти",
      "Мини-сендвичи с ветчиной и сыром",
      "Одноразовая посуда и салфетки",
      "Сервировка зоны подачи",
    ],
  },
  {
    name: "Бизнес",
    price: "1 200",
    featured: true,
    items: [
      "Кофе зерновой (3 сорта)",
      "Чай ассортимент (5 видов)",
      "Круассаны и даныши",
      "Мини-сендвичи с лососем и огурцом",
      "Свежие фрукты: виноград, клубника",
      "Мини-десерты: тирамису, панна-котта",
      "Фирменная сервировка",
    ],
  },
  {
    name: "Премиум",
    price: "2 000",
    featured: false,
    items: [
      "Станция бариста",
      "Авторская выпечка от шеф-кондитера",
      "Канапе с красной икрой и сёмгой",
      "Свежие фрукты и ягоды премиум-сорта",
      "Healthy-зона: смузи, гранола, авокадо-тосты",
      "Фарфоровая посуда и текстиль",
      "Персональный бариста на мероприятии",
    ],
  },
];

const MENU_EXAMPLES = [
  "Круассаны сливочные",
  "Маффины шоколадные",
  "Свежие фрукты",
  "Сендвичи с лососем",
  "Чай, кофе, сок",
  "Даныши с яблоком и корицей",
];

/* ═══════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════ */
export default function CoffeeBreakPage() {
  const [navSolid, setNavSolid] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* ─── Navigation ─── */}
      <nav className={`nav${navSolid ? " nav--solid" : ""}`}>
        <div className="nav__inner">
          <Link href="/">
            <img src="/logo.svg" alt="Nilov Catering" className="nav__logo" />
          </Link>
          <div className="nav__links">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={`nav__link${l.href === currentPage ? " nav__link--active" : ""}`}>
                {l.label}
              </Link>
            ))}
          </div>
          <div className="nav__right">
            <a href="tel:+78129195911" className="nav__phone">+7 (812) 919-59-11</a>
            <button
              className={`nav__burger${mobileOpen ? " open" : ""}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Меню"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* ─── Mobile Menu ─── */}
      <div className={`mobile-menu${mobileOpen ? " open" : ""}`}>
        {NAV_LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`mobile-menu__link${l.href === currentPage ? " mobile-menu__link--active" : ""}`}
            onClick={() => setMobileOpen(false)}
          >
            {l.label}
          </Link>
        ))}
        <div className="mobile-menu__divider" />
        <a href="tel:+78129195911" className="mobile-menu__phone">
          +7 (812) 919-59-11
        </a>
      </div>

      {/* ─── Subpage Hero ─── */}
      <section className="subpage-hero" style={{ minHeight: "40vh" }}>
        <div className="subpage-hero__bg">
          <img src="/images/v5/coffee.jpg" alt="Кофе-брейк обслуживание — Nilov Catering" />
        </div>
        <div className="subpage-hero__content">
          <Reveal>
            <div className="subpage-hero__breadcrumb">
              <Link href="/">Главная</Link> / <span>Кофе-брейк</span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="subpage-hero__title">Кофе-брейк <em>обслуживание</em></h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="subpage-hero__subtitle">
              Элегантная кофейная пауза для деловых мероприятий. Ароматный кофе,
              свежая выпечка и безупречная подача — всё, чтобы ваши гости
              чувствовали себя комфортно между сессиями.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── About Format ─── */}
      <section className="section">
        <div className="container">
          <Reveal>
            <h2 style={{ textAlign: "center" }}>
              Формат <em>кофе-брейк</em>
            </h2>
            <p className="section-subtitle">
              Идеальное решение для перерывов на конференциях, семинарах и деловых встречах
            </p>
          </Reveal>

          <div className="about__grid">
            <div className="about__text">
              <Reveal variant="rv-left" delay={100}>
                <p>
                  Кофе-брейк — это не просто перерыв на чашку кофе. Это
                  продуманная до мелочей система питания, которая обеспечивает
                  участников конференций, семинаров, презентаций и деловых встреч
                  вкусными закусками и напитками в формате свободного доступа.
                  Правильно организованная кофейная пауза помогает поддерживать
                  высокий уровень концентрации участников и создаёт комфортную
                  атмосферу для нетворкинга.
                </p>
              </Reveal>
              <Reveal variant="rv-left" delay={200}>
                <p>
                  Мы понимаем, что на деловых мероприятиях каждая минута на счету.
                  Поэтому наша служба работает чётко в рамках установленного
                  регламента: зона кофе-брейк полностью готова к началу перерыва,
                  подача осуществляется бесшумно и ненавязчиво, а уборка
                  происходит незаметно для участников.
                </p>
              </Reveal>
              <Reveal variant="rv-left" delay={300}>
                <div className="about__quote">
                  Кофе-брейк с Nilov Catering — это когда перерыв становится
                  лучшей частью конференции
                </div>
              </Reveal>
            </div>
            <div className="about__image">
              <Reveal variant="rv-right" delay={150}>
                <img src="/images/v5/coffee.jpg" alt="Кофе-брейк сервировка — Nilov Catering" />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Features Grid ─── */}
      <section className="section" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <Reveal>
            <h2 style={{ textAlign: "center" }}>
              Преимущества <em>нашего кофе-брейк</em>
            </h2>
            <p className="section-subtitle">
              Три причины, почему компании выбирают Nilov Catering для деловых мероприятий
            </p>
          </Reveal>

          <div className="features__grid">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 150}>
                <div className="feature-card">
                  <div className="feature-card__icon">{f.icon}</div>
                  <h3 className="feature-card__title">{f.title}</h3>
                  <p className="feature-card__desc">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MID-CONTENT CTA ─── */}
      <section className="section" style={{ background: "var(--bg-glass)", borderTop: "1px solid var(--border-glass)", borderBottom: "1px solid var(--border-glass)" }}>
        <div className="container">
          <Reveal>
            <div style={{ textAlign: "center" }}>
              <h2>Нужен <em>кофе-брейк</em> на мероприятие?</h2>
              <p className="section-subtitle">Оставьте заявку — подберём оптимальное меню под ваш бюджет</p>
              <div style={{ marginTop: "2rem" }}>
                <Link href="/contacts" className="btn btn--gold btn--lg">Рассчитать стоимость</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Price Tiers ─── */}
      <section className="section">
        <div className="container">
          <Reveal>
            <h2 style={{ textAlign: "center" }}>
              Тарифы <em>кофе-брейк</em>
            </h2>
            <p className="section-subtitle">
              Выберите оптимальный пакет для вашего мероприятия или запросите индивидуальное предложение
            </p>
          </Reveal>

          <div className="price-tiers">
            {PRICE_TIERS.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 150}>
                <div className={`price-tier${tier.featured ? " price-tier--featured" : ""}`}>
                  {tier.featured && <div className="price-tier__badge">Популярный</div>}
                  <h3 className="price-tier__name">{tier.name}</h3>
                  <div className="price-tier__price">
                    от {tier.price}₽ <span>/ чел</span>
                  </div>
                  <ul className="price-tier__list">
                    {tier.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <Link
                    href="/contacts"
                    className={`btn ${tier.featured ? "btn--gold" : "btn--outline"}`}
                    style={{ width: "100%" }}
                  >
                    Заказать
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIAL ─── */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div style={{ maxWidth: "700px", margin: "0 auto" }}>
              <div className="review" style={{ textAlign: "center" }}>
                <div className="review__stars" style={{ justifyContent: "center", display: "flex", gap: "4px" }}>
                  {[1,2,3,4,5].map(i => <span key={i} style={{ color: "var(--gold)", fontSize: "18px" }}>★</span>)}
                </div>
                <div className="review__text" style={{ fontStyle: "italic", margin: "1rem 0" }}>"Кофе-брейк на конференцию был организован идеально — быстро, вкусно и профессионально!"</div>
                <div className="review__author" style={{ color: "var(--gold)" }}>Игорь Соколов</div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-tertiary)" }}>конференция • Яндекс Карты</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Menu Examples ─── */}
      <section className="section" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <Reveal>
            <h2 style={{ textAlign: "center" }}>
              Пример <em>меню</em>
            </h2>
            <p className="section-subtitle">
              Типичный набор для кофе-брейк формата «Бизнес». Меню корректируется под ваши пожелания
            </p>
          </Reveal>

          <div className="menu-content">
            {MENU_EXAMPLES.map((item, i) => (
              <Reveal key={item} delay={i * 80}>
                <div className="menu-item">
                  <span className="menu-item__name">{item}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p style={{ fontSize: "0.85rem", color: "var(--text-tertiary)", textAlign: "center", marginTop: "2rem", fontStyle: "italic" }}>
              Меню может быть изменено по вашему желанию. Шеф-повар подберёт блюда с учётом бюджета, аллергий и диетических предпочтений.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto" }}>
              <h2>Закажите <em>кофе-брейк</em> для вашего мероприятия</h2>
              <p className="section-subtitle" style={{ marginBottom: "2.5rem" }}>
                Оставьте заявку — мы свяжемся с вами в течение 30 минут и
                подберём оптимальное меню под ваш формат и бюджет.
                Бесплатная дегустация для заказов от 50 человек.
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
                <Link href="/contacts" className="btn btn--gold">Оставить заявку</Link>
                <a href="tel:+78129195911" className="btn btn--outline">Позвонить</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="footer">
        <div className="container">
          <div className="footer__inner">
            <div className="footer__left">
              <img src="/logo.svg" alt="Nilov Catering" className="footer__logo" />
              <div className="footer__copy">
                ИП Нилов Д.И. &middot; ИНН 781643753900 &middot; &copy; 2014&ndash;2026
              </div>
            </div>
            <div className="footer__links">
              <Link href="/about">О компании</Link>
              <Link href="/privacy">Политика конфиденциальности</Link>
              <Link href="/contacts">Контакты</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* ─── WhatsApp Float ─── */}
      <a
        href="https://wa.me/78129195911"
        className="wa-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
      >
        {WA_ICON}
      </a>
    </>
  );
}
