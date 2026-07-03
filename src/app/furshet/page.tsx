"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════
   NAV LINKS (subpage version — routed, not anchors)
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

const currentPage = "/furshet";

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

/* ═══════════════════════════════════════════════════════════
   WA SVG
   ═══════════════════════════════════════════════════════════ */
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
    icon: "🥂",
    title: "Свободный формат",
    desc: "Гости не привязаны к местам — они свободно перемещаются по площадке, общаются и выбирают закуски в комфортном для себя темпе. Фуршет создаёт непринуждённую атмосферу, идеальную для нетворкинга и живого общения.",
  },
  {
    icon: "🍽",
    title: "Разнообразие закусок",
    desc: "Фуршетное меню включает десятки видов канапе, тарталеток, мини-брускетт и шпажек — каждый гость обязательно найдёт блюдо по вкусу. Мы предлагаем от 15 до 40 наименований в одном меню.",
  },
  {
    icon: "✨",
    title: "Элегантная подача",
    desc: "Каждое блюдо — миниатюрное произведение кулинарного искусства. Изысканная сервировка, авторские гарниры, декор из свежих трав и съедобных цветов превращают фуршетный стол в настоящий гастрономический спектакль.",
  },
];

const PRICE_TIERS = [
  {
    name: "Классик",
    price: "от 1 800 ₽",
    per: "/чел",
    featured: false,
    items: [
      "Канапе и мини-закуски (8–10 видов)",
      "Холодные закуски и салаты",
      "Фруктовая тарелка",
      "Базовая одноразовая посуда",
      "Сервировка стола",
      "Официанты (1 на 15 гостей)",
    ],
  },
  {
    name: "Премиум",
    price: "от 2 500 ₽",
    per: "/чел",
    featured: true,
    badge: "Популярный",
    items: [
      "Расширенное меню (14–18 видов)",
      "Горячие закуски и мини-пирожки",
      "Десертная станция",
      "Премиальная посуда и приборы",
      "Декор стола и цветочные композиции",
      "Официанты (1 на 10 гостей)",
      "Напитки в ассортименте",
    ],
  },
  {
    name: "Гранд",
    price: "от 3 500 ₽",
    per: "/чел",
    featured: false,
    items: [
      "Авторское меню (20+ видов)",
      "Живые кулинарные станции",
      "Сигнатурные блюда от шеф-повара",
      "Премиальная посуда Christofle",
      "Индивидуальный декор площадки",
      "Официанты (1 на 8 гостей)",
      "Премиальный бар",
      "Координация мероприятия",
    ],
  },
];

const MENU_ITEMS = [
  "Канапе с сёмгой и сливочным сыром",
  "Тарталетки с красной икрой",
  "Мини-брускетты с томатами и моцареллой",
  "Рулетики из баклажана с козьим сыром",
  "Шпажки с креветкой и авокадо",
  "Мини-пирожки с мясом",
  "Фруктовое канапе",
  "Сырная тарелка",
];

/* ═══════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════ */
export default function FurshetPage() {
  const [navSolid, setNavSolid] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentChecked) return;
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 4000);
    (e.target as HTMLFormElement).reset();
    setConsentChecked(false);
  };

  return (
    <>
      {/* ─── NAV ─── */}
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

      {/* ─── MOBILE MENU ─── */}
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

      {/* ─── HERO ─── */}
      <section className="subpage-hero" style={{ minHeight: "40vh" }}>
        <div className="subpage-hero__bg">
          <img src="/images/v5/furshet.jpg" alt="Фуршетное обслуживание — Nilov Catering" />
        </div>
        <div className="subpage-hero__content">
          <Reveal>
            <div className="subpage-hero__breadcrumb">
              <Link href="/">Главная</Link> / <span>Фуршет</span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="subpage-hero__title">Фуршетное <em>обслуживание</em></h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="subpage-hero__subtitle">
              Изысканные закуски и безупречная подача для мероприятий, где важна
              свобода общения и впечатляющая гастрономия
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── ABOUT FORMAT ─── */}
      <section className="section">
        <div className="container">
          <Reveal>
            <h2 style={{ textAlign: "center" }}>
              Фуршет — <em>искусство</em> свободного общения
            </h2>
            <p className="section-subtitle">
              Самый популярный формат для деловых и светских мероприятий
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div style={{ maxWidth: "900px", margin: "0 auto" }}>
              <p>
                Фуршет — это не просто формат питания, это философия
                гостеприимства, которая идеально подходит для мероприятий, где
                ключевое значение имеет живое общение. В отличие от классического
                банкета, фуршет не привязывает гостей к столу: каждый волен
                выбирать, с кем говорить, что пробовать и как проводить время.
                Именно поэтому фуршетный формат стал абсолютным стандартом для
                выставок, презентаций, корпоративных праздников, юбилеев и
                светских раутов.
              </p>
              <p>
                В Nilov Catering мы рассматриваем фуршет как полноценное
                гастрономическое событие. Каждое канапе, каждая тарталетка и
                каждый шпажок — это результат кропотливой работы шеф-повара,
                который продумывает не только вкус, но и текстуру, цвет и
                аромат блюда. Мы используем только свежие сезонные ингредиенты:
                дальневосточную сёмгу, камчатскую икру, средиземноморские
                креветки, французские сыры и органические овощи от локальных
                фермеров Ленинградской области.
              </p>
              <p>
                Организация фуршета требует особого профессионализма: блюда
                должны оставаться свежими и аппетитными на протяжении всего
                мероприятия, подача — безупречной, а сервис — ненавязчивым и
                при этом оперативным. Наши официанты следят за чистотой столов,
                своевременно пополняют закуски и напитки, помогают гостям с
                выбором и создают ощущение заботливого, но деликатного
                внимания.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="section" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <Reveal>
            <h2 style={{ textAlign: "center" }}>
              Преимущества <em>формата</em>
            </h2>
            <p className="section-subtitle">
              Почему фуршет выбирают для самых значимых мероприятий
            </p>
          </Reveal>
          <div className="features__grid">
            {FEATURES.map((f, i) => (
              <Reveal key={i} delay={i * 150}>
                <div className="feature-card">
                  <div className="feature-card__icon">{f.icon}</div>
                  <div className="feature-card__title">{f.title}</div>
                  <div className="feature-card__desc">{f.desc}</div>
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
              <h2>Готовы <em>заказать</em> фуршет?</h2>
              <p className="section-subtitle">Оставьте заявку и мы свяжемся с вами в течение 30 минут</p>
              <div style={{ marginTop: "2rem" }}>
                <Link href="/contacts" className="btn btn--gold btn--lg">Рассчитать стоимость</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── PRICE TIERS ─── */}
      <section className="section">
        <div className="container">
          <Reveal>
            <h2 style={{ textAlign: "center" }}>
              Стоимость <em>фуршета</em>
            </h2>
            <p className="section-subtitle">
              Три уровня обслуживания под ваш бюджет и задачи
            </p>
          </Reveal>
          <div className="price-tiers">
            {PRICE_TIERS.map((tier, i) => (
              <Reveal key={i} delay={i * 150}>
                <div className={`price-tier${tier.featured ? " price-tier--featured" : ""}`}>
                  {tier.badge && <div className="price-tier__badge">{tier.badge}</div>}
                  <div className="price-tier__name">{tier.name}</div>
                  <div className="price-tier__price">
                    {tier.price}
                    <span>{tier.per}</span>
                  </div>
                  <ul className="price-tier__list">
                    {tier.items.map((item, j) => <li key={j}>{item}</li>)}
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
                <div className="review__text" style={{ fontStyle: "italic", margin: "1rem 0" }}>"Организовали корпоратив на 120 человек — всё было безупречно!"</div>
                <div className="review__author" style={{ color: "var(--gold)" }}>Ольга Михайлова</div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-tertiary)" }}>корпоратив • Яндекс Карты</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── MENU EXAMPLES ─── */}
      <section className="section" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <Reveal>
            <h2 style={{ textAlign: "center" }}>
              Примеры <em>меню</em>
            </h2>
            <p className="section-subtitle">
              Каждое меню составляется индивидуально — это лишь малая часть наших возможностей
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="menu-content">
              {MENU_ITEMS.map((item, i) => (
                <div className="menu-item" key={i}>
                  <div className="menu-item__name">{item}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <p style={{ fontSize: "0.85rem", color: "var(--text-tertiary)", fontStyle: "italic" }}>
                Финальный состав блюд обсуждается с шеф-поваром индивидуально.
                Мы учитываем все диетические пожелания, аллергии и предпочтения.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── CTA / CONTACT ─── */}
      <section className="section" id="contact">
        <div className="container">
          <Reveal>
            <h2 style={{ textAlign: "center" }}>
              Заказать <em>фуршет</em>
            </h2>
            <p className="section-subtitle">
              Оставьте заявку — ответим в течение 30 минут в рабочее время
            </p>
          </Reveal>

          <div className="contact__grid">
            <Reveal variant="rv-left" delay={100}>
              <div className="contact__info">
                <p>
                  Организация фуршета с Nilov Catering — это гарантия
                  безупречного вкуса, элегантной подачи и профессионального
                  сервиса. Мы берём на себя все заботы: от разработки меню до
                  уборки после мероприятия.
                </p>
                <p>
                  Свяжитесь с нами удобным способом — по телефону, через форму
                  или в мессенджере. Менеджер уточнит детали, предложит
                  оптимальное меню и рассчитает точную стоимость.
                </p>
                <div className="contact__info-item">
                  <div className="contact__info-label">Телефон</div>
                  <div className="contact__info-value">
                    <a href="tel:+78129195911">+7 (812) 919-59-11</a>
                  </div>
                </div>
                <div className="contact__info-item">
                  <div className="contact__info-label">Email</div>
                  <div className="contact__info-value">
                    <a href="mailto:info@interfood-catering.ru">info@interfood-catering.ru</a>
                  </div>
                </div>
                <div className="contact__info-item">
                  <div className="contact__info-label">Адрес</div>
                  <div className="contact__info-value">Санкт-Петербург, 20 линия В.О., д. 11</div>
                </div>
                <div className="contact__info-item">
                  <div className="contact__info-label">Время работы</div>
                  <div className="contact__info-value">Пн&ndash;Вс: 09:00 &mdash; 22:00</div>
                </div>
              </div>
            </Reveal>

            <Reveal variant="rv-right" delay={200}>
              <form className="contact__form" onSubmit={handleFormSubmit}>
                <input type="text" className="contact__input" placeholder="Ваше имя" required />
                <input type="text" className="contact__input" inputMode="tel" placeholder="Телефон" required />
                <div className="contact__form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <input type="text" className="contact__input" placeholder="Кол-во гостей" />
                  <input type="text" className="contact__input" placeholder="Дата мероприятия" />
                </div>
                <select className="contact__select" defaultValue="furshet">
                  <option value="furshet">Фуршет</option>
                  <option value="banket">Банкет</option>
                  <option value="coffee">Кофе-брейк</option>
                  <option value="wedding">Свадебный ужин</option>
                  <option value="other">Другое</option>
                </select>
                <textarea className="contact__textarea" placeholder="Расскажите о мероприятии" rows={3} />
                <label className="contact__consent">
                  <input
                    type="checkbox"
                    checked={consentChecked}
                    onChange={(e) => setConsentChecked(e.target.checked)}
                  />
                  <span>
                    Даю согласие на обработку персональных данных в соответствии
                    с <Link href="/privacy">политикой конфиденциальности</Link>
                  </span>
                </label>
                <button
                  type="submit"
                  className="btn btn--gold"
                  style={{ width: "100%" }}
                  disabled={!consentChecked}
                >
                  Заказать фуршет
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
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

      {/* ─── TOAST ─── */}
      <div className={`toast${toastVisible ? " show" : ""}`}>
        Заявка отправлена! Мы свяжемся с вами в течение 30 минут.
      </div>

      {/* ─── WHATSAPP FLOAT ─── */}
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
