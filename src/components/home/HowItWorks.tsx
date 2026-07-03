"use client";

import FadeIn from "@/components/home/FadeIn";

const STEPS = [
  { n: "01", title: "Заявка", desc: "Свяжитесь с нами по телефону или WhatsApp. Обсудим формат, дату и количество гостей." },
  { n: "02", title: "Меню", desc: "Шеф-повар составит индивидуальное меню под ваш бюджет и предпочтения гостей." },
  { n: "03", title: "Дегустация", desc: "Для свадеб и крупных мероприятий — бесплатная дегустация выбранных блюд." },
  { n: "04", title: "Событие", desc: "В день мероприятия команда официантов и поваров всё организует под ключ." },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-20 sm:py-28" style={{ background: "#F5F1EA" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-12 sm:mb-16">
            <p className="font-sans text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "#8B6F47" }}>Простой процесс</p>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light" style={{ color: "#1A1A1A" }}>
              Как это работает
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {STEPS.map((step, i) => (
            <FadeIn key={step.n} delay={i * 120}>
              <div className="relative">
                <div className="font-serif text-6xl sm:text-7xl font-light mb-4" style={{ color: "rgba(212,168,67,0.25)" }}>
                  {step.n}
                </div>
                <h3 className="font-serif text-xl font-medium mb-3" style={{ color: "#1A1A1A" }}>{step.title}</h3>
                <p className="font-sans text-sm leading-relaxed" style={{ color: "#5C564D" }}>{step.desc}</p>
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-4 text-2xl" style={{ color: "#D4A843" }}>→</div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
