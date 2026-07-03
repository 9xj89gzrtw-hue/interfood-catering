"use client";
import Image from "next/image";
import Link from "next/link";
import SubpageLayout from "@/components/home/SubpageLayout";
import FadeIn from "@/components/home/FadeIn";

const TIERS = [
  {
    name: "Стандарт",
    price: "2 000",
    featured: false,
    items: [
      "Фуршетный набор на 5 позиций",
      "Кофе, чай, вода",
      "Стандартная сервировка",
      "Обслуживание официантами",
      "Доставка и уборка",
    ],
  },
  {
    name: "Бизнес",
    price: "3 500",
    featured: true,
    items: [
      "Расширенный фуршет на 8 позиций",
      "Кофе-брейк зона с бариста",
      "Премиальная сервировка",
      "1 официант на 10 гостей",
      "Координатор мероприятия",
      "Доставка, сервировка и уборка",
    ],
  },
  {
    name: "Премиум",
    price: "5 000",
    featured: false,
    items: [
      "Авторское меню от шеф-повара",
      "Живая кулинарная станция",
      "Винное сопровождение",
      "1 официант на 6 гостей",
      "Декоратор и координатор",
      "Премиальная сервировка и текстиль",
      "Полный цикл обслуживания",
    ],
  },
];

export default function KorporativPage() {
  return (
    <SubpageLayout activePage="/korporativ">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[360px] flex items-end overflow-hidden">
        <Image src="/images/real/event_loft.jpg" alt="Корпоративный кейтеринг" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <FadeIn>
            <p className="font-sans text-sm mb-3" style={{ color: "rgba(245,241,234,0.7)" }}>
              <Link href="/" className="hover:text-[#D4A843] transition-colors">Главная</Link> / Корпоратив
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold" style={{ color: "#F5F1EA" }}>
              Корпоративный кейтеринг
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* About */}
      <section className="py-20" style={{ background: "#F5F1EA" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-serif text-3xl sm:text-4xl text-center mb-4" style={{ color: "#1A1A1A" }}>
              Кейтеринг для бизнеса
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="max-w-2xl mx-auto space-y-5 font-sans text-base leading-relaxed" style={{ color: "#5C564D" }}>
              <p>
                Корпоративный кейтеринг — это не просто доставка еды на мероприятие. Это стратегическое партнёрство в организации питания для компаний, которые ценят качество и стабильность. Мы обслуживаем мероприятия любого масштаба — от камерных деловых завтраков на 20 человек до масштабных корпоративов на 2000 гостей.
              </p>
              <p>
                Мы знаем, что в бизнесе важны сроки, бюджеты и предсказуемость результата. Поэтому мы выстроили систему работы с фиксированными ценами на период договора, персональным менеджером и чётким регламентом — от заявки до финального акта. Работаем по договору с постоплатой до 14 рабочих дней.
              </p>
              <p>
                За каждым корпоративным клиентом закреплён выделенный менеджер, который знает историю ваших мероприятий и предпочтения сотрудников. Специальные условия при регулярном сотрудничестве — прогрессивные скидки до 15%.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Price Tiers */}
      <section className="py-20" style={{ background: "#EDE8DD" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-serif text-3xl sm:text-4xl text-center mb-12" style={{ color: "#1A1A1A" }}>
              Тарифы
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {TIERS.map((t, i) => (
              <FadeIn key={i} delay={i * 150}>
                <div className={`bg-white rounded-xl p-6 flex flex-col ${t.featured ? "ring-2 ring-[#D4A843]" : ""}`}>
                  {t.featured && (
                    <span className="font-sans text-xs font-medium tracking-wider uppercase mb-3 self-start px-3 py-1 rounded-full" style={{ background: "#D4A843", color: "#fff" }}>
                      Популярный
                    </span>
                  )}
                  <h3 className="font-serif text-2xl" style={{ color: "#1A1A1A" }}>{t.name}</h3>
                  <p className="font-sans text-sm mt-1 mb-4" style={{ color: "#8B6F47" }}>от {t.price} ₽/чел</p>
                  <ul className="font-sans text-sm space-y-2 flex-1 mb-6" style={{ color: "#5C564D" }}>
                    {t.items.map((item, j) => (
                      <li key={j} className="flex gap-2">
                        <span style={{ color: "#D4A843" }}>•</span>{item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="https://wa.me/79119417205"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-sm text-center py-3 rounded-lg transition-colors"
                    style={{
                      background: t.featured ? "#D4A843" : "transparent",
                      color: t.featured ? "#fff" : "#8B6F47",
                      border: t.featured ? "none" : "1px solid #8B6F47",
                    }}
                  >
                    Заказать
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: "#1A1A1A" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="font-serif text-3xl sm:text-4xl mb-4" style={{ color: "#F5F1EA" }}>
              Запросите предложение
            </h2>
            <p className="font-sans text-base mb-8 max-w-lg mx-auto" style={{ color: "rgba(245,241,234,0.6)" }}>
              Расскажите о потребностях вашей компании — подготовим индивидуальное предложение с учётом объёма и бюджета.
            </p>
            <a
              href="https://wa.me/79119417205"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-sans text-sm px-8 py-3.5 rounded-full transition-colors"
              style={{ background: "#D4A843", color: "#fff" }}
            >
              Написать в WhatsApp
            </a>
          </FadeIn>
        </div>
      </section>
    </SubpageLayout>
  );
}
