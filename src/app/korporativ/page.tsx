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

const currentPage = "/korporativ";

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
const ADVANTAGES = [
  {
    icon: "📋",
    title: "Постоплата по договору",
    desc: "Работаем с юридическими лицами по договору с отсрочкой платежа до 14 рабочих дней. Все финансовые документы и закрывающие акты предоставляются в срок и в полном соответствии с требованиями бухгалтерии.",
  },
  {
    icon: "👤",
    title: "Персональный менеджер",
    desc: "За каждым корпоративным клиентом закрепляется выделенный менеджер, который знает историю ваших мероприятий и предпочтения сотрудников. Ваш менеджер доступен ежедневно с 09:00 до 22:00.",
  },
  {
    icon: "💰",
    title: "Скидки от объёма",
    desc: "При регулярном сотрудничестве и крупных заказах предоставляем прогрессивную систему скидок до 15% от базовой стоимости. Специальные условия при заказе от 5 мероприятий в квартал.",
  },
];

const EVENT_TYPES = [
  {
    title: "Корпоративные праздники",
    desc: "Новый год, день компании, юбилей организации — организация торжественных мероприятий любого масштаба. От камерных ужинов для руководства до масштабных корпоративов на 500+ человек.",
    image: "/images/v5/banket.jpg",
  },
  {
    title: "Конференции и форумы",
    desc: "Кофе-брейки, бизнес-ланчи и приём-фуршет для участников деловых мероприятий любой величины. Опыт обслуживания форумов на 1000+ делегатов.",
    image: "/images/v5/coffee.jpg",
  },
  {
    title: "Обеды в офис",
    desc: "Ежедневное или регулярное питание для сотрудников — от бизнес-ланчей до развозных обедов с доставкой прямо в офис. Составляем сбалансированное меню на неделю.",
    image: "/images/v5/furshet.jpg",
  },
  {
    title: "Тимбилдинги",
    desc: "Выездные командные мероприятия на природе, в загородных клубах и на открытых площадках. Организуем пикники, барбекю-вечеринки и кулинарные мастер-классы.",
    image: "/images/v5/gallery_1.jpg",
  },
];

/* ═══════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════ */
export default function KorporativPage() {
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
          <img src="/images/v5/process.jpg" alt="Корпоративным клиентам — Nilov Catering" />
        </div>
        <div className="subpage-hero__content">
          <Reveal>
            <div className="subpage-hero__breadcrumb">
              <Link href="/">Главная</Link> / <span>Корпоратив</span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="subpage-hero__title">Корпоративным <em>клиентам</em></h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="subpage-hero__subtitle">
              Надёжное партнёрство для компаний, которые ценят качество и стабильность
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── ABOUT SECTION ─── */}
      <section className="section" id="about">
        <div className="container">
          <Reveal>
            <h2 style={{ textAlign: "center" }}>
              Кейтеринг для <em>бизнеса</em>
            </h2>
            <p className="section-subtitle">
              Надёжное партнёрство для компаний, которые ценят качество и стабильность
            </p>
          </Reveal>

          <div className="about__grid">
            <Reveal variant="rv-left" delay={100}>
              <div className="about__image">
                <img src="/images/v5/about.jpg" alt="Корпоративный кейтеринг Nilov Catering" />
              </div>
            </Reveal>
            <Reveal variant="rv-right" delay={200}>
              <div className="about__text">
                <p>
                  Nilov Catering — это не просто служба доставки еды на
                  мероприятия. Мы — ваш стратегический партнёр в организации
                  корпоративного питания, который понимает, что каждое
                  деловое событие — это отражение имиджа компании. За 12 лет
                  работы мы обслужили более 850 мероприятий в Санкт-Петербурге
                  и Ленинградской области.
                </p>
                <p>
                  Мы знаем, что в бизнесе важны сроки, бюджеты и
                  предсказуемость результата. Поэтому мы выстроили систему
                  работы, которая исключает сюрпризы: фиксированные цены на
                  период договора, персональный менеджер, который знает
                  историю вашего сотрудничества, и чёткий регламент
                  взаимодействия от заявки до финального акта.
                </p>
                <div className="about__quote">
                  «Бизнес-партнёрство начинается с доверия. Мы строим
                  отношения, а не просто выполняем заказы.»
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── ADVANTAGES ─── */}
      <section className="section" style={{ background: "var(--bg-secondary)" }} id="advantages">
        <div className="container">
          <Reveal>
            <h2 style={{ textAlign: "center" }}>
              Преимущества <em>корпоративного</em> партнёрства
            </h2>
            <p className="section-subtitle">
              Специальные условия, созданные для потребностей бизнеса
            </p>
          </Reveal>
          <div className="features__grid">
            {ADVANTAGES.map((adv, i) => (
              <Reveal key={i} delay={i * 150}>
                <div className="feature-card">
                  <div className="feature-card__icon">{adv.icon}</div>
                  <div className="feature-card__title">{adv.title}</div>
                  <div className="feature-card__desc">{adv.desc}</div>
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
              <h2>Специальные <em>условия</em> для бизнеса</h2>
              <p className="section-subtitle">Постоплата, скидки от объёма и персональный менеджер — оставьте заявку</p>
              <div style={{ marginTop: "2rem" }}>
                <Link href="/contacts" className="btn btn--gold btn--lg">Запросить коммерческое предложение</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── CORPORATE EVENT TYPES ─── */}
      <section className="section" id="events">
        <div className="container">
          <Reveal>
            <h2 style={{ textAlign: "center" }}>
              Типы <em>корпоративных</em> мероприятий
            </h2>
            <p className="section-subtitle">
              Организуем любой формат — от бизнес-завтрака до гала-ужина
            </p>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: "3rem", marginTop: "2rem" }}>
            {EVENT_TYPES.map((event, i) => (
              <Reveal key={i} delay={i * 100} variant={i % 2 === 0 ? "rv-left" : "rv-right"}>
                <div
                  className="korporativ-event-card"
                  style={{
                    display: "grid",
                    gridTemplateColumns: i % 2 === 0 ? "1fr 1.2fr" : "1.2fr 1fr",
                    gap: "2.5rem",
                    alignItems: "center",
                    background: "var(--bg-glass)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    border: "1px solid var(--border-glass)",
                    borderRadius: "20px",
                    overflow: "hidden",
                    transition: "all 0.4s var(--ease-out-expo)",
                  }}
                >
                  {i % 2 === 0 ? (
                    <>
                      <div style={{ borderRadius: "20px 0 0 20px", overflow: "hidden", aspectRatio: "16/10", minHeight: "200px" }}>
                        <img src={event.image} alt={event.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
                      </div>
                      <div style={{ padding: "2rem 2rem 2rem 0" }}>
                        <h3 style={{ marginBottom: "1rem" }}>{event.title}</h3>
                        <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.8 }}>{event.desc}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ padding: "2rem 0 2rem 2rem" }}>
                        <h3 style={{ marginBottom: "1rem" }}>{event.title}</h3>
                        <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.8 }}>{event.desc}</p>
                      </div>
                      <div style={{ borderRadius: "0 20px 20px 0", overflow: "hidden", aspectRatio: "16/10", minHeight: "200px" }}>
                        <img src={event.image} alt={event.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
                      </div>
                    </>
                  )}
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

      {/* ─── CTA SECTION ─── */}
      <section className="section" style={{ background: "var(--bg-secondary)" }} id="cta">
        <div className="container">
          <Reveal>
            <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto" }}>
              <h2 style={{ marginBottom: "1.5rem" }}>
                Запросите <em>коммерческое предложение</em>
              </h2>
              <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "2rem" }}>
                Расскажите о потребностях вашей компании — мы подготовим
                индивидуальное коммерческое предложение с учётом объёма,
                регулярности мероприятий и бюджетных ожиданий.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center", marginBottom: "2.5rem" }}>
                <a href="tel:+78129195911" className="btn btn--gold">Позвонить: +7 (812) 919-59-11</a>
                <a href="https://wa.me/78129195911" className="btn btn--outline" target="_blank" rel="noopener noreferrer">
                  Написать в WhatsApp
                </a>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "center", fontSize: "0.85rem", color: "var(--text-tertiary)" }}>
                <span>Договор с ЮЛ и ИП</span>
                <span style={{ color: "var(--gold)", opacity: 0.5 }}>&#8226;</span>
                <span>Постоплата до 14 дней</span>
                <span style={{ color: "var(--gold)", opacity: 0.5 }}>&#8226;</span>
                <span>Скидки до 15%</span>
                <span style={{ color: "var(--gold)", opacity: 0.5 }}>&#8226;</span>
                <span>Все закрывающие документы</span>
              </div>
            </div>
          </Reveal>
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
