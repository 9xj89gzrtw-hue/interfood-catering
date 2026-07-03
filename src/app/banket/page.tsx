"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════
   NAV LINKS (subpage version)
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

const currentPage = "/banket";

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
    icon: "🍽",
    title: "Полное обслуживание за столом",
    desc: "Профессиональные официанты обеспечивают безупречный сервис: подача блюд, наполнение бокалов, смена приборов и внимание к каждой детали. Гости наслаждаются вечером, не отвлекаясь ни на что.",
  },
  {
    icon: "📖",
    title: "Индивидуальное меню",
    desc: "Шеф-повар лично разрабатывает меню с учётом ваших предпочтений, сезона и формата мероприятия. Каждое блюдо — авторская работа, созданная специально для вашего торжества.",
  },
  {
    icon: "✨",
    title: "Премиальная сервировка",
    desc: "Фарфор, хрусталь, столовое серебро и текстиль от ведущих европейских брендов. Каждое место за столом — произведение искусства, задающее тон всему вечеру.",
  },
];

const PRICE_TIERS = [
  {
    name: "Классик",
    price: "4 000",
    unit: "₽/чел",
    featured: false,
    items: [
      "Трёхкурсовый ужин",
      "Стандартное обслуживание",
      "Базовая сервировка",
      "Доставка и уборка",
      "1 официант на 12 гостей",
    ],
  },
  {
    name: "Премиум",
    price: "5 500",
    unit: "₽/чел",
    featured: true,
    items: [
      "Пятикурсовый ужин",
      "Винное сопровождение",
      "Премиальная сервировка",
      "Доставка и уборка",
      "1 официант на 8 гостей",
      "Координатор мероприятия",
    ],
  },
  {
    name: "Гранд",
    price: "7 500",
    unit: "₽/чел",
    featured: false,
    items: [
      "Семикурсовый дегустационный сет",
      "Личный сомелье",
      "Live cooking станция",
      "Премиальная сервировка",
      "1 официант на 6 гостей",
      "Декоратор и координатор",
    ],
  },
];

const MENU_EXAMPLES = [
  "Салат с тигровыми креветками",
  "Крем-суп из тыквы",
  "Стейк из говядины с овощами гриль",
  "Филе сибаса с лимонным соусом",
  "Десерт — тирамису",
];

/* ═══════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════ */
export default function BanketPage() {
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

      {/* ─── SUBPAGE HERO ─── */}
      <section className="subpage-hero" style={{ minHeight: "40vh" }}>
        <div className="subpage-hero__bg">
          <img src="/images/v5/banket.jpg" alt="Банкетное обслуживание — Nilov Catering" />
        </div>
        <div className="subpage-hero__content">
          <Reveal>
            <div className="subpage-hero__breadcrumb">
              <Link href="/">Главная</Link> / <span>Банкет</span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="subpage-hero__title">Банкетное <em>обслуживание</em></h1>
          </Reveal>
        </div>
      </section>

      {/* ─── ABOUT FORMAT ─── */}
      <section className="section" id="about">
        <div className="container">
          <Reveal>
            <h2 style={{ textAlign: "center" }}>
              Формат <em>банкета</em>
            </h2>
            <p className="section-subtitle">
              Вершина кейтерингового искусства — торжественная рассадка и безупречный сервис
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div style={{ maxWidth: "900px", margin: "0 auto" }}>
              <p>
                Банкетное обслуживание — это вершина кейтерингового искусства, где
                каждый элемент вечера подчинён единой гармонии вкуса, эстетики и
                безупречного сервиса. В отличие от фуршета, где гости свободно
                перемещаются между столами, банкет предполагает торжественную
                рассадку и полноценный ужин за красиво накрытыми столами. Этот
                формат идеально подходит для свадеб, юбилеев, корпоративных
                торжеств и дипломатических приёмов.
              </p>
              <p>
                Наша команда подходит к организации банкета как к созданию
                произведения искусства. Шеф-повар лично составляет меню, учитывая
                сезонность продуктов, гастрономические тренды и ваши личные
                предпочтения. Каждое блюдо проходит дегустационный отбор — мы
                приглашаем вас на пробную дегустацию, чтобы убедиться, что вкус
                превзойдёт ожидания. Профессиональные официанты, обученные по
                стандартам fine dining, обеспечивают безупречную подачу.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── FEATURES GRID ─── */}
      <section className="section" style={{ background: "var(--bg-secondary)" }} id="features">
        <div className="container">
          <Reveal>
            <h2 style={{ textAlign: "center" }}>
              Почему <em>банкет</em>
            </h2>
            <p className="section-subtitle">
              Три причины выбрать банкетный формат для вашего торжества
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
              <h2>Готовы <em>заказать</em> банкет?</h2>
              <p className="section-subtitle">Оставьте заявку и мы свяжемся с вами в течение 30 минут</p>
              <div style={{ marginTop: "2rem" }}>
                <Link href="/contacts" className="btn btn--gold btn--lg">Рассчитать стоимость</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── PRICE TIERS ─── */}
      <section className="section" id="pricing">
        <div className="container">
          <Reveal>
            <h2 style={{ textAlign: "center" }}>
              Стоимость <em>банкета</em>
            </h2>
            <p className="section-subtitle">
              Три уровня обслуживания под любой бюджет и масштаб мероприятия
            </p>
          </Reveal>
          <div className="price-tiers">
            {PRICE_TIERS.map((tier, i) => (
              <Reveal key={i} delay={i * 150}>
                <div className={`price-tier${tier.featured ? " price-tier--featured" : ""}`}>
                  {tier.featured && <div className="price-tier__badge">Популярный</div>}
                  <div className="price-tier__name">{tier.name}</div>
                  <div className="price-tier__price">
                    от {tier.price}<span> {tier.unit}</span>
                  </div>
                  <ul className="price-tier__list">
                    {tier.items.map((item, j) => <li key={j}>{item}</li>)}
                  </ul>
                  <Link href="/contacts" className="btn btn--gold btn--sm">
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
                <div className="review__text" style={{ fontStyle: "italic", margin: "1rem 0" }}>"Банкет на юбилей был просто великолепен! Каждое блюдо — шедевр!"</div>
                <div className="review__author" style={{ color: "var(--gold)" }}>Елена Петрова</div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-tertiary)" }}>юбилей • Яндекс Карты</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── MENU EXAMPLES ─── */}
      <section className="section" style={{ background: "var(--bg-secondary)" }} id="menu">
        <div className="container">
          <Reveal>
            <h2 style={{ textAlign: "center" }}>
              Примеры <em>блюд</em>
            </h2>
            <p className="section-subtitle">
              Авторское меню от шеф-повара для банкета уровня Премиум
            </p>
          </Reveal>
          <div className="menu-content">
            {MENU_EXAMPLES.map((item, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="menu-item">
                  <div className="menu-item__name">{item}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p style={{ fontSize: "0.85rem", color: "var(--text-tertiary)", textAlign: "center", marginTop: "1.5rem", fontStyle: "italic" }}>
              Меню формируется индивидуально. Доступны веганские, безглютеновые и халяльные опции.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── CTA SECTION ─── */}
      <section className="section" id="cta">
        <div className="container">
          <Reveal>
            <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto" }}>
              <h2>Закажите <em>банкет</em> мечты</h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.8, margin: "1.5rem 0 2.5rem" }}>
                Оставьте заявку — и мы организуем безупречный вечер, который
                превзойдёт все ваши ожидания. Шеф-повар составит
                индивидуальное меню, координатор продумает каждую деталь.
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/contacts" className="btn btn--gold">Оставить заявку</Link>
                <a href="tel:+78129195911" className="btn btn--outline">Позвонить</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── CONTACT FORM ─── */}
      <section className="section" style={{ background: "var(--bg-secondary)" }} id="contact">
        <div className="container">
          <Reveal>
            <h2 style={{ textAlign: "center" }}>
              Свяжитесь <em>с нами</em>
            </h2>
            <p className="section-subtitle">Ответим в течение 30 минут в рабочее время</p>
          </Reveal>
          <div className="contact__grid">
            <Reveal variant="rv-left" delay={100}>
              <div className="contact__info">
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
                <select className="contact__select" defaultValue="banket">
                  <option value="banket">Банкет</option>
                  <option value="furshet">Фуршет</option>
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
                    Я согласен(а) на обработку персональных данных в соответствии с{" "}
                    <Link href="/privacy">политикой конфиденциальности</Link>
                  </span>
                </label>
                <button type="submit" className="btn btn--gold" style={{ width: "100%" }} disabled={!consentChecked}>
                  Отправить заявку
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
