"use client";

import { useState } from "react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import WhatsAppFloat from "@/components/home/WhatsAppFloat";
import FadeIn from "@/components/home/FadeIn";
import { CONTACTS, MENU_TYPES } from "@/lib/content";

const STEPS = [
  { id: "type", title: "Тип мероприятия", options: ["Свадьба", "Корпоратив", "Банкет", "Фуршет", "Кофе-брейк", "Другое"] },
  { id: "guests", title: "Количество гостей", options: ["10-30", "30-50", "50-100", "100-200", "200+"] },
  { id: "menu", title: "Формат меню", options: MENU_TYPES.map((m) => `${m.title} от ${m.fromPrice}₽`) },
  { id: "date", title: "Когда мероприятие?", options: ["В течение недели", "В течение месяца", "Через 2-3 месяца", "Дата не выбрана"] },
];

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [STEPS[step].id]: value };
    setAnswers(newAnswers);
    if (step < STEPS.length - 1) setStep(step + 1);
    else setDone(true);
  };

  const message = encodeURIComponent(
    `Заявка с квиза:\n${STEPS.map((s) => `${s.title}: ${answers[s.id] || "-"}`).join("\n")}`
  );
  const waLink = `https://wa.me/79119417205?text=${message}`;

  const restart = () => { setAnswers({}); setStep(0); setDone(false); };

  return (
    <>
      <Navbar />
      <main style={{ background: "#F5F1EA", minHeight: "100vh" }}>
        <section className="relative pt-32 pb-12 sm:pt-40 sm:pb-16" style={{ background: "#1A1A1A" }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeIn>
              <p className="font-sans text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#D4A843" }}>Быстрый расчёт</p>
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-light mb-6" style={{ color: "#F5F1EA" }}>
                Калькулятор
              </h1>
              <p className="font-sans text-base sm:text-lg" style={{ color: "rgba(245,241,234,0.8)" }}>
                Ответьте на 4 вопроса — рассчитаем стоимость за 30 минут
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            {!done ? (
              <FadeIn key={step}>
                <div className="bg-white rounded-2xl p-6 sm:p-10 border border-[#D4A843]/10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-sans text-xs uppercase tracking-wider" style={{ color: "#8B6F47" }}>
                      Шаг {step + 1} из {STEPS.length}
                    </span>
                    <div className="flex gap-1">
                      {STEPS.map((_, i) => (
                        <div key={i} className="h-1 rounded-full transition-all" style={{ width: i === step ? "32px" : "12px", background: i <= step ? "#D4A843" : "rgba(212,168,67,0.2)" }} />
                      ))}
                    </div>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-light mb-6" style={{ color: "#1A1A1A" }}>{STEPS[step].title}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {STEPS[step].options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleAnswer(opt)}
                        className="text-left font-sans text-sm sm:text-base px-5 py-4 rounded-xl border transition-all duration-200 hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A]"
                        style={{ borderColor: "rgba(212,168,67,0.2)", color: "#1A1A1A", background: "#fff" }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {step > 0 && (
                    <button onClick={() => setStep(step - 1)} className="mt-6 font-sans text-sm hover:underline" style={{ color: "#8B6F47" }}>
                      ← Назад
                    </button>
                  )}
                </div>
              </FadeIn>
            ) : (
              <FadeIn>
                <div className="bg-white rounded-2xl p-6 sm:p-10 border border-[#D4A843]/10 text-center">
                  <div className="text-5xl mb-4">✓</div>
                  <h2 className="font-serif text-3xl font-light mb-4" style={{ color: "#1A1A1A" }}>Заявка готова!</h2>
                  <p className="font-sans text-base mb-6" style={{ color: "#5C564D" }}>Отправьте её в WhatsApp — рассчитаем стоимость за 30 минут</p>
                  <div className="text-left bg-[#F5F1EA] rounded-xl p-5 mb-6">
                    {STEPS.map((s) => (
                      <div key={s.id} className="flex justify-between py-1 text-sm">
                        <span style={{ color: "#8B6F47" }}>{s.title}:</span>
                        <span className="font-medium text-right" style={{ color: "#1A1A1A" }}>{answers[s.id]}</span>
                      </div>
                    ))}
                  </div>
                  <a href={waLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-sans text-base px-8 py-4 rounded-full transition-all duration-300 hover:scale-[1.03] mb-3" style={{ background: "#D4A843", color: "#fff" }}>
                    Отправить в WhatsApp →
                  </a>
                  <button onClick={restart} className="block mx-auto font-sans text-sm hover:underline" style={{ color: "#8B6F47" }}>
                    Пройти заново
                  </button>
                </div>
              </FadeIn>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
