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

const currentPage = "/svadba";

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
    icon: "👩‍🍳",
    title: "Персональный шеф",
    desc: "Ваш собственный шеф-повар, который посвятит всё внимание исключительно вашей паре. Он разработает меню, учитывая ваши вкусы, истории и семейные традиции, предложит неожиданные сочетания и превратит каждое блюдо в маленькое произведение искусства.",
  },
  {
    icon: "🍷",
    title: "Дегустация перед свадьбой",
    desc: "За две недели до торжества мы приглашаем вас на персональную дегустацию. Вы попробуете каждое блюдо из вашего меню, оцените текстуры и ароматы, внесёте последние коррективы. Это репетиция самого вкусного вечера вашей жизни.",
  },
  {
    icon: "⏰",
    title: "Координация вечера",
    desc: "Наш менеджер следит за безупречным таймингом: подача блюд синхронизирована с программой вечера, торт выносят в идеальный момент, а шампанское — к первому тосту. Вы наслаждаетесь праздником, а мы заботимся о каждой минуте.",
  },
];

const PRICE_TIERS = [
  {
    name: "Классик",
    price: "5 500",
    featured: false,
    items: [
      "Банкетное меню из 6 перемен блюд",
      "Стандартная сервировка и посуда",
      "Обслуживание официантами",
      "Доставка и уборка",
      "Консультация по меню",
    ],
  },
  {
    name: "Премиум",
    price: "7 000",
    featured: true,
    items: [
      "Расширенное меню из 8 перемен блюд",
      "Welcome-зона с канапе и закусками",
      "Шампанское для приветствия гостей",
      "Премиальная сервировка и текстиль",
      "Персональный менеджер вечера",
      "Декор стола живыми цветами",
    ],
  },
  {
    name: "Гранд",
    price: "10 000",
    featured: false,
    items: [
      "Дегустационное меню от шефа",
      "Интерактивные кулинарные станции",
      "Сомелье и винное сопровождение",
      "Полный декор площадки",
      "Шеф-кондитер: свадебный торт",
      "Координация всего вечера",
      "Премиальная посуда и хрусталь",
    ],
  },
];

const MENU_EXAMPLES = [
  {
    title: "Welcome-канапе с шампанским",
    desc: "Изысканные миниатюры с икрой, сёмгой и трюфельным маслом под бокал охлаждённого шампанского — первое касание вечера.",
  },
  {
    title: "Салат с трюфельной заправкой",
    desc: "Нежный микс весенних зелёных листьев с козьим сыром, грецким орехом и авторской трюфельной заправкой.",
  },
  {
    title: "Интерактивная станция с ризотто",
    desc: "Шеф-повар готовит кремовое ризотто прямо при гостях — с белыми грибами, пармезаном и ароматом свежего тимьяна.",
  },
  {
    title: "Стейк вагю с овощами",
    desc: "Мраморная говядина вагю, приготовленная с ювелирной точностью, подаётся с сезонными овощами гриль и соусом из выдержанного бальзамико.",
  },
  {
    title: "Свадебный торт от шеф-кондитера",
    desc: "Многоярусный шедевр ручной работы — нежные бисквиты, воздушный крем и декор, вдохновлённый стилистикой вашей свадьбы.",
  },
];

/* ═══════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════ */
export default function SvadbaPage() {
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
          <img src="/images/v5/wedding.jpg" alt="Свадебный ужин от Nilov Catering" loading="eager" />
        </div>
        <div className="subpage-hero__content">
          <Reveal>
            <div className="subpage-hero__breadcrumb">
              <Link href="/">Главная</Link> / <span>Свадьба</span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="subpage-hero__title">Свадебный <em>ужин</em></h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="subpage-hero__subtitle">
              День, который вы будете вспоминать вечно — каждое блюдо рассказывает историю вашей любви
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── About Format ─── */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="about__grid" style={{ gridTemplateColumns: "1fr" }}>
              <div className="about__text" style={{ maxWidth: "100%" }}>
                <h2 style={{ marginBottom: "2rem" }}>
                  День, который вы будете <em>вспоминать</em> вечно
                </h2>
                <p>
                  Свадьба — это не просто праздник. Это мгновение, которое определяет начало вашей
                  общей истории, и каждая деталь этого дня должна быть безупречной. Мы в Nilov
                  Catering понимаем: свадебный ужин — это не просто еда на тарелке. Это разговор
                  двух сердец, рассказанный языком вкуса, аромата и красоты. Это момент, когда ваши
                  близкие замолкают после первого кусочка, потому что вкус оказался совершенством,
                  которого они не ожидали.
                </p>
                <p>
                  Представьте: свечи мерцают на ваших столах, наполняя зал тёплым золотистым светом.
                  Официанты в белых перчатках бесшумно скользят между столами, подача каждого блюда
                  — маленький ритуал, объединяющий гостей в едином переживании. Свадебный ужин с
                  Nilov Catering — это гастрономическая симфония, где каждое блюдо — нота, а весь
                  вечер — мелодия вашей любви. Наш шеф-повар работает с вами лично,
                  чтобы меню отражало вашу историю.
                </p>
                <div className="about__quote">
                  «Свадебный ужин — это не меню из десяти пунктов. Это обещание, которое вы даёте
                  друг другу, переведённое на язык вкуса.»
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Features Grid ─── */}
      <section className="section" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <Reveal>
            <h2 style={{ textAlign: "center" }}>
              Почему пары выбирают <em>нас</em>
            </h2>
            <p className="section-subtitle">
              Три причины, по которым ваш свадебный ужин станет незабываемым
            </p>
          </Reveal>
          <div className="features__grid">
            {FEATURES.map((f, i) => (
              <Reveal key={i} delay={i * 150} variant={i === 0 ? "rv-left" : i === 2 ? "rv-right" : "rv"}>
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
              <h2>Создайте <em>идеальный</em> вечер</h2>
              <p className="section-subtitle">Оставьте заявку и мы организуем свадебный ужин вашей мечты</p>
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
              Форматы свадебного <em>ужина</em>
            </h2>
            <p className="section-subtitle">
              Выберите уровень, который соответствует вашим ожиданиям
            </p>
          </Reveal>
          <div className="price-tiers">
            {PRICE_TIERS.map((tier, i) => (
              <Reveal key={i} delay={i * 150} variant={i === 0 ? "rv-left" : i === 2 ? "rv-right" : "rv-scale"}>
                <div className={`price-tier${tier.featured ? " price-tier--featured" : ""}`}>
                  {tier.featured && <div className="price-tier__badge">Популярный</div>}
                  <h3 className="price-tier__name">{tier.name}</h3>
                  <div className="price-tier__price">
                    от {tier.price}₽ <span>/ чел</span>
                  </div>
                  <ul className="price-tier__list">
                    {tier.items.map((item, j) => <li key={j}>{item}</li>)}
                  </ul>
                  <Link href="/contacts" className="btn btn--gold btn--sm" style={{ width: "100%" }}>
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
                <div className="review__text" style={{ fontStyle: "italic", margin: "1rem 0" }}>"Наш свадебный ужин превзошёл все ожидания! Гости до сих пор вспоминают тот вечер."</div>
                <div className="review__author" style={{ color: "var(--gold)" }}>Анна и Дмитрий Вороновы</div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-tertiary)" }}>свадьба • Яндекс Карты</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Wedding Menu Examples ─── */}
      <section className="section" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <Reveal>
            <h2 style={{ textAlign: "center" }}>
              Ваше меню — ваша <em>история</em>
            </h2>
            <p className="section-subtitle">
              Примеры блюд, которые могут стать частью вашего свадебного ужина
            </p>
          </Reveal>
          <div className="svadba-menu-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.25rem" }}>
            {MENU_EXAMPLES.map((item, i) => (
              <Reveal key={i} delay={i * 100}>
                <div
                  style={{
                    background: "var(--bg-glass)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    border: "1px solid var(--border-glass)",
                    borderRadius: "16px",
                    padding: "2rem",
                    transition: "all 0.4s var(--ease-out-expo)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "var(--gold)";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-glass)";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  }}
                >
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem", fontWeight: 600, marginBottom: "0.75rem", color: "var(--text-primary)" }}>
                    {item.title}
                  </div>
                  <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p style={{ textAlign: "center", marginTop: "2rem", fontSize: "0.85rem", color: "var(--text-tertiary)", fontStyle: "italic" }}>
              Меню формируется индивидуально для каждой пары. Указанные блюда — лишь вдохновение для нашей совместной работы.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto" }}>
              <h2 style={{ marginBottom: "1rem" }}>
                Запишитесь на <em>дегустацию</em>
              </h2>
              <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "2rem" }}>
                Приходите к нам на персональную дегустацию — попробуйте блюда, почувствуйте
                атмосферу и влюбитесь в свой будущий свадебный ужин. Это первый шаг к вечеру,
                о котором вы будете рассказывать с улыбкой всю жизнь.
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/contacts" className="btn btn--gold">Записаться на дегустацию</Link>
                <a href="tel:+78129195911" className="btn btn--outline">Позвонить</a>
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
