"use client";

import FadeIn from "@/components/home/FadeIn";
import Link from "next/link";
import { SERVICES, CONTACTS } from "@/lib/content";

export default function Services() {
  return (
    <section id="services" className="py-20 sm:py-28" style={{ background: "#F5F1EA" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-12 sm:mb-16">
            <p className="font-sans text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "#8B6F47" }}>Что мы предлагаем</p>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light mb-4" style={{ color: "#1A1A1A" }}>
              Услуги кейтеринга
            </h2>
            <p className="font-sans text-base sm:text-lg max-w-2xl mx-auto" style={{ color: "#5C564D" }}>
              Полный спектр услуг для мероприятий любого формата — от кофе-брейка до свадебного банкета
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES.map((s, i) => (
            <FadeIn key={s.id} delay={i * 60}>
              <Link
                href="/services"
                className="group block h-full bg-white rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-[#D4A843]/10"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl" style={{ filter: "grayscale(0.2)" }}>{s.icon}</span>
                  <span className="font-sans text-xs px-3 py-1 rounded-full" style={{ background: "rgba(212,168,67,0.1)", color: "#8B6F47" }}>
                    от {s.from.toLocaleString("ru")} ₽
                  </span>
                </div>
                <h3 className="font-serif text-xl font-medium mb-2 transition-colors group-hover:text-[#D4A843]" style={{ color: "#1A1A1A" }}>
                  {s.title}
                </h3>
                <p className="font-sans text-sm leading-relaxed" style={{ color: "#5C564D" }}>
                  {s.desc}
                </p>
                <div className="mt-4 flex items-center gap-1 font-sans text-sm transition-all group-hover:gap-2" style={{ color: "#D4A843" }}>
                  Подробнее <span>→</span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={200}>
          <div className="text-center mt-12">
            <a
              href={CONTACTS.whatsappText}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans text-base px-8 py-4 rounded-full transition-all duration-300 hover:scale-[1.03]"
              style={{ background: "#1A1A1A", color: "#F5F1EA" }}
            >
              Обсудить ваше мероприятие →
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
