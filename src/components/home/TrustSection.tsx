"use client";

import FadeIn from "@/components/home/FadeIn";

const TRUST_ITEMS = [
  { icon: "🏆", title: "18 лет на рынке", desc: "С 2007 года — 3 500+ мероприятий" },
  { icon: "👨‍🍳", title: "Шеф-повар", desc: "Дмитрий Нилов, авторская кухня" },
  { icon: "📋", title: "Договор", desc: "Официально, с закрывающими документами" },
  { icon: "🚚", title: "Доставка КАД", desc: "Бесплатно в пределах СПб" },
  { icon: "⏱", title: "30 минут", desc: "Время ответа на заявку" },
  { icon: "🌿", title: "Свежие продукты", desc: "От проверенных поставщиков" },
];

export default function TrustSection() {
  return (
    <section className="py-16 sm:py-20" style={{ background: "#EDE8DD" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-10">
            <p className="font-sans text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "#8B6F47" }}>Почему нам доверяют</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light" style={{ color: "#1A1A1A" }}>
              3 500 мероприятий не врут
            </h2>
          </div>
        </FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {TRUST_ITEMS.map((t, i) => (
            <FadeIn key={i} delay={i * 60}>
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#D4A843]/10 h-full">
                <div className="text-3xl mb-3">{t.icon}</div>
                <h3 className="font-serif text-base sm:text-lg font-medium mb-1" style={{ color: "#1A1A1A" }}>{t.title}</h3>
                <p className="font-sans text-xs sm:text-sm" style={{ color: "#5C564D" }}>{t.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
