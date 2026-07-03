"use client";
import Image from "next/image";
import Link from "next/link";
import SubpageLayout from "@/components/home/SubpageLayout";
import FadeIn from "@/components/home/FadeIn";

const INCLUDED = [
  "Кофе зерновой (2–3 сорта)",
  "Чай чёрный, зелёный, травяной",
  "Свежая выпечка: круассаны, даныши, маффины",
  "Мини-закуски и канапе",
  "Сервировка зоны подачи и уборка",
];

export default function CoffeeBreakPage() {
  return (
    <SubpageLayout activePage="/coffee-break">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[360px] flex items-end overflow-hidden">
        <Image src="/images/v5/coffee.jpg" alt="Кофе-брейк кейтеринг" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <FadeIn>
            <p className="font-sans text-sm mb-3" style={{ color: "rgba(245,241,234,0.7)" }}>
              <Link href="/" className="hover:text-[#D4A843] transition-colors">Главная</Link> / Кофе-брейк
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold" style={{ color: "#F5F1EA" }}>
              Кофе-брейк
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* About */}
      <section className="py-20" style={{ background: "#F5F1EA" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-serif text-3xl sm:text-4xl text-center mb-4" style={{ color: "#1A1A1A" }}>
              Формат кофе-брейк
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="max-w-2xl mx-auto space-y-5 font-sans text-base leading-relaxed" style={{ color: "#5C564D" }}>
              <p>
                Кофе-брейк — продуманная система питания для перерывов на конференциях, семинарах, презентациях и деловых встречах. Правильно организованная кофейная пауза помогает поддерживать концентрацию участников и создаёт комфортную атмосферу для нетворкинга.
              </p>
              <p>
                Мы понимаем, что на деловых мероприятиях каждая минута на счету. Наша команда прибывает заранее, зона подачи полностью готова к началу перерыва, а уборка происходит незаметно для участников. Тихая и ненавязчивая подача — наш стандарт работы.
              </p>
              <p>
                Свежая выпечка готовится в утреннюю смену и доставляется к началу мероприятия. Круассаны, даныши, мини-сендвичи и канапе — каждое изделие выпекается из премиальных ингредиентов в день события.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Price */}
      <section className="py-20" style={{ background: "#EDE8DD" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-serif text-3xl sm:text-4xl text-center mb-4" style={{ color: "#1A1A1A" }}>
              Стоимость
            </h2>
            <p className="font-sans text-center text-2xl font-semibold mb-8" style={{ color: "#D4A843" }}>
              от 950 ₽/чел
            </p>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="max-w-md mx-auto bg-white rounded-xl p-6">
              <h3 className="font-serif text-xl mb-4" style={{ color: "#1A1A1A" }}>В стоимость включено:</h3>
              <ul className="font-sans text-sm space-y-3" style={{ color: "#5C564D" }}>
                {INCLUDED.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span style={{ color: "#D4A843" }}>•</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="font-sans text-xs text-center mt-6 italic" style={{ color: "#8B6F47" }}>
              Меню формируется индивидуально. Доступны веганские и безглютеновые опции.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: "#1A1A1A" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="font-serif text-3xl sm:text-4xl mb-4" style={{ color: "#F5F1EA" }}>
              Закажите кофе-брейк
            </h2>
            <p className="font-sans text-base mb-8 max-w-lg mx-auto" style={{ color: "rgba(245,241,234,0.6)" }}>
              Оставьте заявку — подберём оптимальное меню под ваш формат и бюджет. Расчёт за 30 минут.
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
