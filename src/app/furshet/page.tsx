"use client";
import Image from "next/image";
import Link from "next/link";
import SubpageLayout from "@/components/home/SubpageLayout";
import FadeIn from "@/components/home/FadeIn";

const WA = "https://wa.me/79119417205?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!";

const FEATURES = [
  { icon: "🥂", title: "Свободный формат", desc: "Гости не привязаны к местам — свободно общаются и выбирают закуски в комфортном темпе. Идеально для нетворкинга." },
  { icon: "🍽", title: "Разнообразие закусок", desc: "От 15 до 40 наименований в одном меню: канапе, тарталетки, брускетты, шпажки — каждый найдёт блюдо по вкусу." },
  { icon: "✨", title: "Элегантная подача", desc: "Изысканная сервировка, авторские гарниры, декор из свежих трав и съедобных цветов — гастрономический спектакль." },
];

const TIERS = [
  { name: "Классик", price: "1 800 ₽", featured: false, items: ["Канапе и мини-закуски (8–10 видов)", "Холодные закуски и салаты", "Фруктовая тарелка", "Базовая посуда", "Официанты (1 на 15 гостей)"] },
  { name: "Премиум", price: "2 500 ₽", featured: true, items: ["Расширенное меню (14–18 видов)", "Горячие закуски и мини-пирожки", "Десертная станция", "Премиальная посуда и приборы", "Декор и цветочные композиции", "Официанты (1 на 10 гостей)"] },
  { name: "Гранд", price: "3 500 ₽", featured: false, items: ["Авторское меню (20+ видов)", "Живые кулинарные станции", "Сигнатурные блюда от шефа", "Посуда Christofle", "Индивидуальный декор площадки", "Официанты (1 на 8 гостей)", "Премиальный бар"] },
];

const MENU = [
  "Канапе с сёмгой и сливочным сыром", "Тарталетки с красной икрой",
  "Мини-брускетты с томатами и моцареллой", "Рулетики из баклажана с козьим сыром",
  "Шпажки с креветкой и авокадо", "Мини-пирожки с мясом",
  "Фруктовое канапе", "Сырная тарелка",
];

export default function FurshetPage() {
  return (
    <SubpageLayout activePage="/furshet">
      {/* ── Hero ── */}
      <section className="relative h-[50vh] min-h-[360px] flex items-end overflow-hidden">
        <Image src="/images/v5/furshet.jpg" alt="Фуршетное обслуживание" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 via-[#1A1A1A]/30 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14 w-full">
          <FadeIn>
            <p className="font-sans text-xs tracking-widest uppercase mb-3" style={{ color: "#D4A843" }}>
              <Link href="/" className="hover:underline" style={{ color: "rgba(245,241,234,0.6)" }}>Главная</Link>
              <span style={{ color: "rgba(245,241,234,0.4)" }}> / </span>Фуршет
            </p>
          </FadeIn>
          <FadeIn delay={100}>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light" style={{ color: "#F5F1EA" }}>
              Фуршетное обслуживание
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* ── About format ── */}
      <section className="py-16 sm:py-20" style={{ background: "#F5F1EA" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <h2 className="font-serif text-3xl sm:text-4xl text-center mb-4" style={{ color: "#1A1A1A" }}>
              Фуршет — искусство свободного общения
            </h2>
            <div className="w-16 h-0.5 mx-auto mb-8" style={{ background: "#D4A843" }} />
          </FadeIn>
          <FadeIn delay={100}>
            <div className="space-y-5 font-sans text-base leading-relaxed" style={{ color: "#5C564D" }}>
              <p>Фуршет — это не просто формат питания, это философия гостеприимства, идеально подходящая для мероприятий, где ключевое значение имеет живое общение. В отличие от банкета, фуршет не привязывает гостей к столу: каждый волен выбирать, с кем говорить, что пробовать и как проводить время. Именно поэтому фуршетный формат стал стандартом для выставок, презентаций и светских раутов.</p>
              <p>В Интерфуд Кейтеринг мы рассматриваем фуршет как полноценное гастрономическое событие. Каждое канапе — результат работы шеф-повара, который продумывает вкус, текстуру, цвет и аромат блюда. Мы используем только свежие сезонные ингредиенты: дальневосточную сёмгу, камчатскую икру, средиземноморские креветки и органические овощи от локальных фермеров.</p>
              <p>Организация фуршета требует особого профессионализма: блюда должны оставаться свежими на протяжении всего мероприятия, подача — безупречной, а сервис — ненавязчивым и оперативным. Наши официанты следят за чистотой столов, своевременно пополняют закуски и создают ощущение деликатного внимания.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-16 sm:py-20" style={{ background: "#EDE8DD" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <h2 className="font-serif text-3xl sm:text-4xl text-center mb-12" style={{ color: "#1A1A1A" }}>
              Преимущества формата
            </h2>
          </FadeIn>
          <div className="grid sm:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <FadeIn key={i} delay={i * 120}>
                <div className="text-center p-6 rounded-xl" style={{ background: "#F5F1EA" }}>
                  <span className="text-4xl block mb-4">{f.icon}</span>
                  <h3 className="font-serif text-xl mb-2" style={{ color: "#1A1A1A" }}>{f.title}</h3>
                  <p className="font-sans text-sm leading-relaxed" style={{ color: "#5C564D" }}>{f.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Price tiers ── */}
      <section className="py-16 sm:py-20" style={{ background: "#F5F1EA" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <h2 className="font-serif text-3xl sm:text-4xl text-center mb-4" style={{ color: "#1A1A1A" }}>
              Стоимость фуршета
            </h2>
            <p className="font-sans text-center text-sm mb-12" style={{ color: "#8B6F47" }}>Три уровня обслуживания под ваш бюджет</p>
          </FadeIn>
          <div className="grid sm:grid-cols-3 gap-6">
            {TIERS.map((t, i) => (
              <FadeIn key={i} delay={i * 120}>
                <div className={`p-6 rounded-xl flex flex-col ${t.featured ? "ring-2 ring-[#D4A843]" : ""}`} style={{ background: t.featured ? "#1A1A1A" : "#EDE8DD" }}>
                  <h3 className="font-serif text-xl mb-1" style={{ color: t.featured ? "#F5F1EA" : "#1A1A1A" }}>{t.name}</h3>
                  <p className="font-serif text-2xl font-semibold mb-1" style={{ color: t.featured ? "#D4A843" : "#8B6F47" }}>
                    от {t.price}<span className="text-sm font-normal" style={{ color: t.featured ? "rgba(245,241,234,0.5)" : "#8B6F47" }}>/чел</span>
                  </p>
                  {t.featured && <span className="font-sans text-xs uppercase tracking-wider mb-4" style={{ color: "#D4A843" }}>Популярный</span>}
                  <ul className="space-y-2 mb-6 flex-1">
                    {t.items.map((item, j) => (
                      <li key={j} className="font-sans text-sm flex gap-2" style={{ color: t.featured ? "rgba(245,241,234,0.8)" : "#5C564D" }}>
                        <span style={{ color: "#D4A843" }}>•</span>{item}
                      </li>
                    ))}
                  </ul>
                  <a href={WA} target="_blank" rel="noopener noreferrer"
                    className="font-sans text-sm text-center py-3 rounded-full transition-all hover:scale-[1.03]"
                    style={{ background: t.featured ? "#D4A843" : "transparent", color: t.featured ? "#fff" : "#1A1A1A", border: t.featured ? "none" : "1px solid #1A1A1A" }}>
                    Заказать
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Menu examples ── */}
      <section className="py-16 sm:py-20" style={{ background: "#EDE8DD" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <h2 className="font-serif text-3xl sm:text-4xl text-center mb-4" style={{ color: "#1A1A1A" }}>Примеры меню</h2>
            <p className="font-sans text-center text-sm mb-10" style={{ color: "#8B6F47" }}>Каждое меню составляется индивидуально</p>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="grid sm:grid-cols-2 gap-3">
              {MENU.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg" style={{ background: "#F5F1EA" }}>
                  <span className="shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: "#D4A843" }} />
                  <span className="font-sans text-sm" style={{ color: "#5C564D" }}>{item}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA dark ── */}
      <section className="py-16 sm:py-20" style={{ background: "#1A1A1A" }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <FadeIn>
            <h2 className="font-serif text-3xl sm:text-4xl mb-4" style={{ color: "#F5F1EA" }}>Готовы заказать фуршет?</h2>
            <p className="font-sans text-base mb-8" style={{ color: "rgba(245,241,234,0.6)" }}>
              Напишите нам в WhatsApp — ответим за 30 минут
            </p>
            <a href={WA} target="_blank" rel="noopener noreferrer"
              className="inline-block font-sans text-sm px-8 py-3.5 rounded-full transition-all hover:scale-[1.03]"
              style={{ background: "#D4A843", color: "#fff" }}>
              Написать в WhatsApp
            </a>
          </FadeIn>
        </div>
      </section>

      {/* ── Contact form ── */}
      <section className="py-16 sm:py-20" style={{ background: "#F5F1EA" }}>
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <h2 className="font-serif text-3xl sm:text-4xl text-center mb-8" style={{ color: "#1A1A1A" }}>Оставить заявку</h2>
          </FadeIn>
          <FadeIn delay={100}>
            <form className="space-y-4" onSubmit={e => { e.preventDefault(); window.open(WA, "_blank"); }}>
              <input type="text" placeholder="Ваше имя" required className="w-full px-4 py-3 rounded-lg font-sans text-sm outline-none focus:ring-2 focus:ring-[#D4A843] transition" style={{ background: "#EDE8DD", color: "#1A1A1A" }} />
              <input type="tel" placeholder="Телефон" required className="w-full px-4 py-3 rounded-lg font-sans text-sm outline-none focus:ring-2 focus:ring-[#D4A843] transition" style={{ background: "#EDE8DD", color: "#1A1A1A" }} />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Кол-во гостей" className="w-full px-4 py-3 rounded-lg font-sans text-sm outline-none focus:ring-2 focus:ring-[#D4A843] transition" style={{ background: "#EDE8DD", color: "#1A1A1A" }} />
                <input type="text" placeholder="Дата" className="w-full px-4 py-3 rounded-lg font-sans text-sm outline-none focus:ring-2 focus:ring-[#D4A843] transition" style={{ background: "#EDE8DD", color: "#1A1A1A" }} />
              </div>
              <textarea placeholder="Расскажите о мероприятии" rows={3} className="w-full px-4 py-3 rounded-lg font-sans text-sm outline-none focus:ring-2 focus:ring-[#D4A843] transition resize-none" style={{ background: "#EDE8DD", color: "#1A1A1A" }} />
              <button type="submit" className="w-full font-sans text-sm py-3.5 rounded-full transition-all hover:scale-[1.02]" style={{ background: "#D4A843", color: "#fff" }}>
                Отправить заявку
              </button>
            </form>
          </FadeIn>
        </div>
      </section>
    </SubpageLayout>
  );
}
