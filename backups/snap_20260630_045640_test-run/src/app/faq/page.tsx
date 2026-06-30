"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";

/* ═══════════════════════════════════════════════════════════════
   ИНТЕРФУД КЕЙТЕРИНГ — Частые вопросы / FAQ Page
   ═══════════════════════════════════════════════════════════════ */

const FAQ_CATEGORIES = [
  {
    id: "order",
    title: "Заказ и бронирование",
    icon: "📋",
    questions: [
      {
        q: "Как оформить заказ на кейтеринг?",
        a: "Оставьте заявку на сайте, позвоните по телефону +7 (812) 919-59-11 или напишите нам в WhatsApp. Менеджер свяжется с вами в течение 30 минут для уточнения деталей: формат мероприятия, количество гостей, пожелания по меню и дату.",
      },
      {
        q: "За сколько дней нужно бронировать кейтеринг?",
        a: "Мы рекомендуем бронировать за 7–14 дней до мероприятия. Для крупных событий (от 100 гостей) желательно обратиться за 3–4 недели. В высокий сезон (май–сентябрь, декабрь) бронь лучше делать за месяц. В срочных случаях мы готовы организовать мероприятие за 2–3 дня.",
      },
      {
        q: "Можно ли изменить заказ после бронирования?",
        a: "Да, изменения можно внести не позднее чем за 48 часов до мероприятия. Корректировка количества гостей — за 24 часа. Изменение меню возможно за 72 часа. Все правки согласовываются с вашим персональным менеджером.",
      },
      {
        q: "Есть ли минимальное количество гостей для заказа?",
        a: "Минимальный заказ — от 15 человек для фуршета и от 20 человек для банкета. Для кофе-брейка минимальный заказ — от 10 человек. Для мероприятий с меньшим количеством гостей мы предлагаем специальные мини-пакеты.",
      },
      {
        q: "Предоставляете ли вы договор и все необходимые документы?",
        a: "Да, мы работаем официально. Предоставляем договор, счёт, акт выполненных работ и все необходимые закрывающие документы. Работаем с юридическими и физическими лицами, принимаем оплату по безналичному расчёту и наличными.",
      },
    ],
  },
  {
    id: "menu",
    title: "Меню и кухня",
    icon: "🍽️",
    questions: [
      {
        q: "Какие форматы меню вы предлагаете?",
        a: "Мы предлагаем пять основных форматов: фуршет (лёгкие закуски, канапе, тарталетки), банкет (полноценный ужин с обслуживанием), кофе-брейк (напитки и выпечка для конференций), барбекю (выездное приготовление на гриле) и тематическое меню (национальная кухня, авторские концепции). Каждый формат адаптируется под ваше мероприятие.",
      },
      {
        q: "Можно ли составить индивидуальное меню?",
        a: "Безусловно! Шеф-повар разработает меню специально для вашего мероприятия с учётом концепции, бюджета и предпочтений гостей. Мы предлагаем дегустацию перед заказом — вы сможете оценить блюда и внести коррективы.",
      },
      {
        q: "Учитываете ли вы диетические ограничения и аллергии?",
        a: "Да, мы готовим блюда для вегетарианцев, веганов, людей с непереносимостью глютена и лактозы. Учитываем аллергии на орехи, морепродукты и другие продукты. Предупредите менеджера заранее — мы обеспечим безопасное меню для каждого гостя.",
      },
      {
        q: "Проводите ли вы дегустацию перед мероприятием?",
        a: "Да, для заказов от 30 человек мы проводим бесплатную дегустацию на нашей кухне. Вы сможете попробовать 5–8 ключевых позиций из вашего меню. Дегустация согласовывается за 5–7 дней до мероприятия и длится около 1,5 часов.",
      },
      {
        q: "Из каких продуктов вы готовите?",
        a: "Мы работаем только с проверенными поставщиками и используем свежие, сезонные продукты. Мясо — фермерское охлаждённое, рыба — свежевыловленная, овощи и зелень — локальные фермерские хозяйства. Все продукты сертифицированы и проходят контроль качества.",
      },
    ],
  },
  {
    id: "logistics",
    title: "Логистика и сервис",
    icon: "🚚",
    questions: [
      {
        q: "Вы работаете по всей территории Санкт-Петербурга и ЛО?",
        a: "Да, мы обслуживаем мероприятия в Санкт-Петербурге и Ленинградской области в радиусе 80 км. Доставка за пределы города рассчитывается индивидуально. Популярные направления: Репино, Комарово, Зеленогорск, Петергоф, Царское Село.",
      },
      {
        q: "Что входит в услугу обслуживания персоналом?",
        a: "В стандартный пакет входит: официанты (1 на 10–15 гостей), повар-сушист, бармен, менеджер мероприятия. Персонал прибывает за 2 часа до начала, проводит сервировку и остаётся до окончания + 1 час на уборку. Форма персонала — классическая чёрно-белая или по вашему пожеланию.",
      },
      {
        q: "Предоставляете ли вы оборудование и мебель?",
        a: "Да, у нас собственный склад оборудования: столы, стулья, скатерти, посуду, столовые приборы, бокалы, коктейльные стойки, шатры, грили и многое другое. Полный список предоставит менеджер. Аренда оборудования рассчитывается отдельно.",
      },
      {
        q: "Как происходит доставка и установка?",
        a: "Доставка осуществляется в термобоксах, сохраняющих температуру блюд. Команда приезжает за 2–3 часа до начала, проводит расстановку мебели, сервировку столов и подготовку зоны кухни. Все процессы контролирует менеджер мероприятия.",
      },
      {
        q: "Что делать, если количество гостей изменилось в день мероприятия?",
        a: "Мы всегда закладываем запас порций +10% от согласованного количества. Если гостей стало больше — до +5 человек, мы обеспечим питание без доплат. При значительном увеличении (более 5 человек) возможна оперативная корректировка за дополнительную стоимость.",
      },
    ],
  },
  {
    id: "payment",
    title: "Оплата и гарантии",
    icon: "💰",
    questions: [
      {
        q: "Какие способы оплаты вы принимаете?",
        a: "Мы принимаем: безналичный расчёт для юрлиц (с НДС и без), банковские карты Visa/Mastercard/МИР, наличные, переводы по реквизитам. Для постоянных клиентов доступна отсрочка платежа до 5 рабочих дней после мероприятия.",
      },
      {
        q: "Каков порядок оплаты?",
        a: "Стандартная схема: предоплата 50% при подписании договора, оставшиеся 50% — за 24 часа до мероприятия. Для корпоративных клиентов возможна постоплата. При срочных заказах — полная предоплата.",
      },
      {
        q: "Есть ли гарантия качества?",
        a: "Мы гарантируем: свежесть продуктов, соответствие меню согласованному заказу, вовремя прибывший персонал, температуру подачи блюд по стандартам. При нарушении условий — компенсация до 100% стоимости. За 18 лет работы не было ни одного судебного разбирательства.",
      },
      {
        q: "Какова политика отмены и возврата?",
        a: "Отмена за 7+ дней — полный возврат предоплаты. Отмена за 3–7 дней — возврат 70%. Отмена менее чем за 3 дня — возврат 30%. Перенос мероприятия на другую дату — без штрафов при уведомлении за 5+ дней. Форс-мажорные ситуации обсуждаются индивидуально.",
      },
      {
        q: "Есть ли скрытые платежи или доплаты?",
        a: "Нет, мы работаем прозрачно. В договоре фиксируется полная стоимость: меню, персонал, оборудование, доставка. Дополнительные расходы возможны только при ваших запросах, не предусмотренных изначальным заказом — все они согласовываются заранее.",
      },
    ],
  },
];

/* ─── Chevron Icon ─── */
function ChevronDown({ open }: { open: boolean }) {
  return (
    <motion.svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
      style={{ flexShrink: 0 }}
    >
      <polyline points="6 9 12 15 18 9" />
    </motion.svg>
  );
}

/* ─── FAQ Accordion Item ─── */
function FAQItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 1, 0.5, 1] }}
      style={{
        borderBottom: "1px solid rgba(184,149,90,0.12)",
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          padding: "1.5rem 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          color: open ? "var(--color-brand-dark)" : "var(--color-dark)",
          transition: "color 0.3s",
        }}
        aria-expanded={open}
      >
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "1.05rem",
            fontWeight: 500,
            lineHeight: 1.5,
          }}
        >
          {question}
        </span>
        <ChevronDown open={open} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                paddingBottom: "1.5rem",
                fontSize: "0.95rem",
                lineHeight: 1.75,
                color: "#555",
                maxWidth: 720,
              }}
            >
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Main Page ─── */
export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const heroRef = useRef(null);
  const categoriesRef = useRef(null);
  const faqRef = useRef(null);
  const ctaRef = useRef(null);
  const categoriesInView = useInView(categoriesRef, { once: true, margin: "-80px" });
  const faqInView = useInView(faqRef, { once: true, margin: "-80px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  /* ── Filter logic ── */
  const filteredCategories = FAQ_CATEGORIES.filter((cat) => {
    if (activeCategory && cat.id !== activeCategory) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return cat.questions.some(
      (item) =>
        item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
    );
  });

  const filteredQuestions = (catId: string) => {
    const cat = FAQ_CATEGORIES.find((c) => c.id === catId);
    if (!cat) return [];
    if (!searchQuery.trim()) return cat.questions;
    const q = searchQuery.toLowerCase();
    return cat.questions.filter(
      (item) =>
        item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
    );
  };

  /* ── Total matching count ── */
  const totalMatches = searchQuery.trim()
    ? FAQ_CATEGORIES.reduce((acc, cat) => {
        const q = searchQuery.toLowerCase();
        return (
          acc +
          cat.questions.filter(
            (item) =>
              item.q.toLowerCase().includes(q) ||
              item.a.toLowerCase().includes(q)
          ).length
        );
      }, 0)
    : FAQ_CATEGORIES.reduce((acc, cat) => acc + cat.questions.length, 0);

  return (
    <>
      <SiteNav />

      {/* ═══════════════ Hero with Video ═══════════════ */}
      <section className="hero" ref={heroRef} style={{ minHeight: "70vh" }}>
        <motion.div className="hero-video" style={{ y: heroY }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="https://sfile.chatglm.cn/images-ppt/3a442a2e6e71.jpg"
          >
            <source
              src="https://videos.pexels.com/video-files/4761433/4761433-uhd_2560_1440_25fps.mp4"
              type="video/mp4"
            />
          </video>
        </motion.div>
        <div className="hero-overlay" />
        <motion.div
          className="hero-content"
          style={{ opacity: heroOpacity, y: heroY }}
        >
          <motion.p
            className="section-label"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Ответы на ваши вопросы
          </motion.p>
          <motion.h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 400,
              lineHeight: 1.1,
              color: "var(--color-dark)",
              marginBottom: "1.5rem",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Частые вопросы
          </motion.h1>
          <motion.p
            style={{
              fontSize: "1.1rem",
              lineHeight: 1.7,
              color: "#555",
              maxWidth: 560,
              margin: "0 auto",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Всё, что нужно знать о кейтеринге Интерфуд — от оформления заказа
            до гарантий качества
          </motion.p>
        </motion.div>
      </section>

      {/* ═══════════════ Search Bar ═══════════════ */}
      <section
        className="section-light"
        style={{ padding: "3rem 0" }}
      >
        <div className="container" style={{ maxWidth: 720 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-brand)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  position: "absolute",
                  left: "1.25rem",
                  flexShrink: 0,
                }}
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Поиск по вопросам..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "1rem 1.25rem 1rem 3rem",
                  fontSize: "1rem",
                  fontFamily: "var(--font-sans)",
                  border: "1.5px solid rgba(184,149,90,0.2)",
                  borderRadius: "100px",
                  background: "#fff",
                  color: "var(--color-dark)",
                  outline: "none",
                  transition: "border-color 0.3s, box-shadow 0.3s",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-brand)";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 4px rgba(184,149,90,0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(184,149,90,0.2)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                aria-label="Поиск по вопросам"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  style={{
                    position: "absolute",
                    right: "1rem",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#999",
                    fontSize: "1.2rem",
                    lineHeight: 1,
                    padding: 4,
                  }}
                  aria-label="Очистить поиск"
                >
                  ✕
                </button>
              )}
            </div>
            {searchQuery.trim() && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  marginTop: "0.75rem",
                  fontSize: "0.85rem",
                  color: "#888",
                  textAlign: "center",
                }}
              >
                Найдено {totalMatches}{" "}
                {totalMatches === 1
                  ? "вопрос"
                  : totalMatches < 5
                  ? "вопроса"
                  : "вопросов"}
              </motion.p>
            )}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ Category Cards ═══════════════ */}
      <section className="section-cream" style={{ padding: "4rem 0" }}>
        <div className="container">
          <motion.div
            ref={categoriesRef}
            initial={{ opacity: 0, y: 30 }}
            animate={categoriesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ textAlign: "center", marginBottom: "3rem" }}
          >
            <p className="section-label">Категории</p>
            <h2 className="section-title">Выберите интересующую тему</h2>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {FAQ_CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                animate={categoriesInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: [0.25, 1, 0.5, 1],
                }}
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
                }}
                onClick={() =>
                  setActiveCategory(activeCategory === cat.id ? null : cat.id)
                }
                className="card"
                style={{
                  cursor: "pointer",
                  padding: "2rem",
                  textAlign: "center",
                  border:
                    activeCategory === cat.id
                      ? "2px solid var(--color-brand)"
                      : "2px solid transparent",
                  background:
                    activeCategory === cat.id
                      ? "var(--color-brand-10)"
                      : "#fff",
                }}
                role="button"
                aria-pressed={activeCategory === cat.id}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveCategory(
                      activeCategory === cat.id ? null : cat.id
                    );
                  }
                }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
                  {cat.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.3rem",
                    fontWeight: 400,
                    color: "var(--color-dark)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {cat.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "#888",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {cat.questions.length} вопросов
                </p>
              </motion.div>
            ))}
          </div>

          {activeCategory && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ textAlign: "center", marginTop: "1.5rem" }}
            >
              <button
                className="btn-outline"
                onClick={() => setActiveCategory(null)}
                style={{ fontSize: "0.7rem", padding: "0.6rem 1.5rem" }}
              >
                Показать все категории
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ═══════════════ FAQ Accordion ═══════════════ */}
      <section className="section-light" style={{ padding: "4rem 0" }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <motion.div
            ref={faqRef}
            initial={{ opacity: 0, y: 30 }}
            animate={faqInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ textAlign: "center", marginBottom: "3rem" }}
          >
            <p className="section-label">Вопросы и ответы</p>
            <h2 className="section-title">
              {searchQuery.trim()
                ? `Результаты поиска`
                : activeCategory
                ? FAQ_CATEGORIES.find((c) => c.id === activeCategory)?.title
                : "Все вопросы"}
            </h2>
          </motion.div>

          <AnimatePresence mode="wait">
            {filteredCategories.length === 0 ? (
              <motion.div
                key="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  textAlign: "center",
                  padding: "3rem 1rem",
                  color: "#999",
                }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>
                  🔍
                </div>
                <p style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
                  Ничего не найдено
                </p>
                <p style={{ fontSize: "0.9rem" }}>
                  Попробуйте изменить поисковый запрос или выбрать другую
                  категорию
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={activeCategory || "all"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {filteredCategories.map((cat) => (
                  <div key={cat.id} style={{ marginBottom: "3rem" }}>
                    {!activeCategory && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                          marginBottom: "1.5rem",
                        }}
                      >
                        <span style={{ fontSize: "1.5rem" }}>{cat.icon}</span>
                        <h3
                          style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "1.5rem",
                            fontWeight: 400,
                            color: "var(--color-dark)",
                          }}
                        >
                          {cat.title}
                        </h3>
                      </div>
                    )}

                    <div
                      style={{
                        background: "#fff",
                        borderRadius: 20,
                        padding: "0 2rem",
                        boxShadow: "0 4px 30px rgba(0,0,0,0.04)",
                      }}
                    >
                      {filteredQuestions(cat.id).map((item, i) => (
                        <FAQItem
                          key={i}
                          question={item.q}
                          answer={item.a}
                          index={i}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ═══════════════ CTA Section ═══════════════ */}
      <section
        className="section-cream"
        style={{ padding: "5rem 0" }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <motion.div
            ref={ctaRef}
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="section-label">Остались вопросы?</p>
            <h2
              className="section-title"
              style={{ marginBottom: "1rem" }}
            >
              Мы всегда на связи
            </h2>
            <p
              className="section-subtitle"
              style={{
                margin: "0 auto 2.5rem",
                textAlign: "center",
              }}
            >
              Не нашли ответ? Свяжитесь с нами — менеджер ответит на все
              вопросы и поможет подобрать идеальное решение для вашего
              мероприятия.
            </p>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link href="/contacts" className="btn-gold">
                Связаться с нами
              </Link>
              <a
                href="https://wa.me/79119417205?text=Здравствуйте! Хочу узнать подробнее о компании."
                className="btn-outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Написать в WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ Footer ═══════════════ */}
      <footer className="footer" role="contentinfo">
        <div className="container">
          <div className="footer-grid" style={{ marginBottom: "3rem" }}>
            {/* Brand */}
            <div>
              <Link
                href="/"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.5rem",
                  fontWeight: 500,
                  color: "#fff",
                  textDecoration: "none",
                  letterSpacing: "0.15em",
                  display: "inline-block",
                  marginBottom: "1rem",
                }}
              >
                ИНТЕРФУД
              </Link>
              <p
                style={{
                  fontSize: "0.85rem",
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.5)",
                  maxWidth: 300,
                }}
              >
                Премиальный кейтеринг в Санкт-Петербурге с 2007 года.
                Авторская кухня, безупречный сервис.
              </p>
            </div>

            {/* Услуги */}
            <div>
              <h4
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--color-brand-light)",
                  marginBottom: "1.2rem",
                }}
              >
                Услуги
              </h4>
              {[
                { label: "Фуршет", href: "/menu#furshet" },
                { label: "Банкет", href: "/menu#banquet" },
                { label: "Кофе-брейк", href: "/menu#coffee" },
                { label: "Свадьбы", href: "/wedding" },
                { label: "Корпоратив", href: "/corporate" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    display: "block",
                    fontSize: "0.85rem",
                    color: "rgba(255,255,255,0.5)",
                    textDecoration: "none",
                    marginBottom: "0.6rem",
                    transition: "color 0.3s",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Компания */}
            <div>
              <h4
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--color-brand-light)",
                  marginBottom: "1.2rem",
                }}
              >
                Компания
              </h4>
              {[
                { label: "О нас", href: "/about" },
                { label: "Команда", href: "/team" },
                { label: "Галерея", href: "/gallery" },
                { label: "Отзывы", href: "/reviews" },
                { label: "Блог", href: "/blog" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    display: "block",
                    fontSize: "0.85rem",
                    color: "rgba(255,255,255,0.5)",
                    textDecoration: "none",
                    marginBottom: "0.6rem",
                    transition: "color 0.3s",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Контакты */}
            <div>
              <h4
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--color-brand-light)",
                  marginBottom: "1.2rem",
                }}
              >
                Контакты
              </h4>
              <a
                href="tel:+78129195911"
                style={{
                  display: "block",
                  fontSize: "0.85rem",
                  color: "rgba(255,255,255,0.5)",
                  textDecoration: "none",
                  marginBottom: "0.6rem",
                  transition: "color 0.3s",
                }}
              >
                +7 (812) 919-59-11
              </a>
              <a
                href="mailto:info@interfood-catering.ru"
                style={{
                  display: "block",
                  fontSize: "0.85rem",
                  color: "rgba(255,255,255,0.5)",
                  textDecoration: "none",
                  marginBottom: "0.6rem",
                  transition: "color 0.3s",
                }}
              >
                info@interfood-catering.ru
              </a>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.6,
                  marginTop: "0.6rem",
                }}
              >
                Пн–Вс: 9:00–22:00
              </p>
              <Link
                href="/contacts"
                style={{
                  display: "inline-block",
                  marginTop: "0.75rem",
                  fontSize: "0.85rem",
                  color: "var(--color-brand-light)",
                  textDecoration: "none",
                  transition: "color 0.3s",
                }}
              >
                Все контакты →
              </Link>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.08)",
              paddingTop: "2rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <span
              style={{
                fontSize: "0.8rem",
                color: "rgba(255,255,255,0.35)",
              }}
            >
              &copy; 2007–2026 Интерфуд Кейтеринг
            </span>
            <div
              style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}
            >
              <Link
                href="/faq"
                style={{
                  color: "rgba(255,255,255,0.45)",
                  textDecoration: "none",
                  fontSize: "0.85rem",
                }}
              >
                Частые вопросы
              </Link>
              <Link
                href="/calculator"
                style={{
                  color: "rgba(255,255,255,0.45)",
                  textDecoration: "none",
                  fontSize: "0.85rem",
                }}
              >
                Калькулятор
              </Link>
              <Link
                href="/contacts"
                style={{
                  color: "rgba(255,255,255,0.45)",
                  textDecoration: "none",
                  fontSize: "0.85rem",
                }}
              >
                Контакты
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Float */}
      <a
        href="https://wa.me/79119417205?text=Здравствуйте! Хочу узнать подробнее о компании."
        className="wa-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
      >
        &#9742;
      </a>
    </>
  );
}
