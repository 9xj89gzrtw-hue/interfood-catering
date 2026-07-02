"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import MenuBuilder from "@/components/MenuBuilder";
import SiteNav from "@/components/SiteNav";
import BackToTop from "@/components/BackToTop";

/* ═══════════════════════════════════════════════════════════════
   ИНТЕРФУД КЕЙТЕРИНГ — Меню / Menu Page
   Light Premium design with interactive MenuBuilder
   ═══════════════════════════════════════════════════════════════ */

export default function MenuPage() {
  const builderRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });

  return (
    <>
      <SiteNav />

      {/* ─── HERO ─── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #FAFAF7 0%, #F5F3EE 50%, #EDE9E1 100%)",
          minHeight: "50vh",
        }}
      >
        {/* Decorative elements */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(circle, #E5BF65 0%, transparent 70%)",
            transform: "translate(30%, -30%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-10 blur-3xl"
          style={{
            background: "radial-gradient(circle, #B8860B 0%, transparent 70%)",
            transform: "translate(-20%, 20%)",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 pt-32 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Eyebrow */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 text-sm font-medium tracking-widest uppercase mb-6"
              style={{ color: "#B8860B" }}
            >
              <span className="w-8 h-px" style={{ background: "#B8860B" }} />
              Авторская кухня
              <span className="w-8 h-px" style={{ background: "#B8860B" }} />
            </motion.span>

            {/* Title */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
              style={{
                fontFamily: "var(--font-serif)",
                color: "#1A1714",
                lineHeight: 1.1,
              }}
            >
              Составьте
              <br />
              <span style={{ color: "#B8860B" }}>ваше меню</span>
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl max-w-2xl mx-auto mb-8"
              style={{ color: "#7D5A0D", lineHeight: 1.6 }}
            >
              Выберите блюда из наших коллекций, настройте количество гостей
              и получите расчёт — с скидками для больших компаний
            </motion.p>

            {/* CTA to scroll down */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              onClick={() =>
                builderRef.current?.scrollIntoView({ behavior: "smooth" })
              }
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-semibold transition-all hover:shadow-lg"
              style={{
                background: "#B8860B",
                color: "#fff",
              }}
            >
              Начать подбор
              <motion.span
                animate={{ y: [0, 3, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                ↓
              </motion.span>
            </motion.button>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap justify-center gap-8 mt-12"
          >
            {[
              { value: "4", label: "Формата" },
              { value: "18+", label: "Блюд" },
              { value: "950₽", label: "От / чел" },
              { value: "15%", label: "Макс. скидка" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div
                  className="text-2xl font-bold"
                  style={{ fontFamily: "var(--font-serif)", color: "#B8860B" }}
                >
                  {stat.value}
                </div>
                <div className="text-xs mt-1" style={{ color: "#7D5A0D" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── MENU BUILDER ─── */}
      <section ref={builderRef} className="relative">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center pt-12 pb-2 px-4">
            <h2
              className="text-2xl sm:text-3xl font-bold mb-2"
              style={{ fontFamily: "var(--font-serif)", color: "#1A1714" }}
            >
              Конструктор меню
            </h2>
            <p className="text-sm" style={{ color: "#7D5A0D" }}>
              Добавляйте блюда в корзину — стоимость рассчитается автоматически
            </p>
          </div>

          <MenuBuilder />
        </div>
      </section>

      {/* ─── INFO SECTION ─── */}
      <section className="py-16 px-4" style={{ background: "#FAFAF7" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🎯",
                title: "Персональный подход",
                desc: "Шеф-повар адаптирует меню под ваш формат мероприятия и предпочтения гостей",
              },
              {
                icon: "💰",
                title: "Прозрачные цены",
                desc: "Стоимость на сайте — окончательная. Без скрытых наценок и доплат",
              },
              {
                icon: "🎉",
                title: "Скидки от объёма",
                desc: "10% при 100+ гостей и 15% при 200+ гостей — экономия для больших мероприятий",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center p-6 rounded-2xl"
                style={{
                  background: "#FFFFFF",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
                }}
              >
                <span className="text-3xl mb-3 block">{item.icon}</span>
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{
                    fontFamily: "var(--font-serif)",
                    color: "#1A1714",
                  }}
                >
                  {item.title}
                </h3>
                <p className="text-sm" style={{ color: "#7D5A0D", lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ─── */}
      <section
        className="py-20 px-4 text-center"
        style={{
          background: "linear-gradient(135deg, #1A1714 0%, #2C261E 100%)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{
              fontFamily: "var(--font-serif)",
              color: "#E5BF65",
            }}
          >
            Нужна помощь с меню?
          </h2>
          <p
            className="text-lg mb-8"
            style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}
          >
            Наш шеф-повар поможет составить идеальное меню
            <br />
            для вашего мероприятия — бесплатно
          </p>
          <a
            href="https://wa.me/79119417205?text=Здравствуйте! Хочу обсудить меню для мероприятия."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-semibold transition-all hover:shadow-lg"
            style={{ background: "#B8860B", color: "#fff" }}
          >
            📞 Обсудить с шеф-поваром
          </a>
        </motion.div>
      </section>

      <BackToTop />
    </>
  );
}
