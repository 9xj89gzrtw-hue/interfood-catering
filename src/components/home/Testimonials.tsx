"use client";

import FadeIn from "@/components/home/FadeIn";
import { CONTACTS } from "@/lib/content";

const REVIEWS = [
  { name: "Анна и Дмитрий", event: "Свадьба, июль 2025", text: "Организовали свадьбу на 120 человек. Гости до сих пор вспоминают подачу и вкус блюд. Шеф-повар Нилов — настоящий профессионал!", rating: 5 },
  { name: "Елена Смирнова", event: "Корпоратив, IT-компания", text: "Третий год заказываем корпоративный кейтеринг у Интерфуда. Всегда безупречно: вовремя, вкусно, красиво. Рекомендую всем.", rating: 5 },
  { name: "Михаил К.", event: "Фуршет, ноябрь 2025", text: "Фуршет на 80 человек — всё было на высшем уровне. Канапе просто таяли во рту. Обязательно закажем ещё на следующий корпоратив.", rating: 5 },
  { name: "Ольга и Сергей", event: "Свадьба, сентябрь 2025", text: "Выездная регистрация и банкет — всё идеально. Флористическое оформление в подарок стало приятным бонусом. Спасибо команде!", rating: 5 },
];

export default function Testimonials() {
  return (
    <section className="py-20 sm:py-28" style={{ background: "#EDE8DD" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-12 sm:mb-16">
            <p className="font-sans text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "#8B6F47" }}>Отзывы клиентов</p>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light mb-4" style={{ color: "#1A1A1A" }}>
              Нам доверяют
            </h2>
            <div className="flex items-center justify-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#D4A843"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                ))}
              </div>
              <span className="font-sans text-sm" style={{ color: "#5C564D" }}>4.9 / 5 — 30+ отзывов</span>
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS.map((r, i) => (
            <FadeIn key={r.name} delay={i * 100}>
              <div className="bg-white rounded-2xl p-6 sm:p-8 h-full border border-[#D4A843]/10 transition-all duration-300 hover:shadow-lg">
                <div className="flex gap-1 mb-4">
                  {[...Array(r.rating)].map((_, j) => (
                    <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill="#D4A843"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
                <p className="font-serif text-lg sm:text-xl leading-relaxed mb-6 italic" style={{ color: "#1A1A1A" }}>
                  «{r.text}»
                </p>
                <div className="flex items-center justify-between border-t pt-4" style={{ borderColor: "rgba(212,168,67,0.15)" }}>
                  <div>
                    <p className="font-sans font-medium text-sm" style={{ color: "#1A1A1A" }}>{r.name}</p>
                    <p className="font-sans text-xs" style={{ color: "#8B6F47" }}>{r.event}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={200}>
          <div className="text-center mt-10">
            <a href="/reviews" className="font-sans text-sm hover:text-[#D4A843] transition-colors" style={{ color: "#5C564D" }}>
              Все отзывы →
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
