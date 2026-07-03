"use client";

import FadeIn from "@/components/home/FadeIn";
import { CONTACTS } from "@/lib/content";

export default function CTA() {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden" style={{ background: "#1A1A1A" }}>
      {/* Gold accent line top */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #D4A843, transparent)" }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <FadeIn>
          <p className="font-sans text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#D4A843" }}>Начните планировать</p>
        </FadeIn>
        <FadeIn delay={200}>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light mb-6 leading-tight" style={{ color: "#F5F1EA" }}>
            Проведём ваше мероприятие<br />на высшем уровне
          </h2>
        </FadeIn>
        <FadeIn delay={400}>
          <p className="font-sans text-base sm:text-lg mb-10 max-w-xl mx-auto" style={{ color: "rgba(245,241,234,0.7)" }}>
            Ответим в течение 30 минут. Бесплатная консультация и расчёт. Без обязательств.
          </p>
        </FadeIn>
        <FadeIn delay={600}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={CONTACTS.whatsappText}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 font-sans text-base px-8 py-4 rounded-full transition-all duration-300 hover:scale-[1.03]"
              style={{ background: "#D4A843", color: "#fff", animation: "cta-glow 3s ease-in-out infinite" }}
            >
              Рассчитать стоимость
            </a>
            <a
              href={CONTACTS.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 font-sans text-base px-8 py-4 rounded-full border transition-all duration-300 hover:bg-white/10"
              style={{ borderColor: "rgba(245,241,234,0.4)", color: "#F5F1EA" }}
            >
              Обсудить в Telegram
            </a>
          </div>
        </FadeIn>
        <FadeIn delay={800}>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-10 font-sans text-sm" style={{ color: "rgba(245,241,234,0.6)" }}>
            <span>✓ Бесплатно</span>
            <span>✓ Без обязательств</span>
            <span>✓ За 30 минут</span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
