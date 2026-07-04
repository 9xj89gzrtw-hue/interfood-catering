"use client";

import FadeIn from "@/components/home/FadeIn";
import { CONTACTS } from "@/lib/content";

export default function StorySection() {
  return (
    <section className="py-16 sm:py-28" style={{ background: "#1A1A1A" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <FadeIn>
            <div>
              <p className="font-sans text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#D4A843" }}>Наша история</p>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light mb-6 leading-tight" style={{ color: "#F5F1EA" }}>
                Не просто еда.<br />Настоящее искусство.
              </h2>
              <p className="font-sans text-base sm:text-lg leading-relaxed mb-4" style={{ color: "rgba(245,241,234,0.85)" }}>
                С {CONTACTS.sinceYear} года шеф-повар {CONTACTS.founder} создаёт меню, которые превращают обычные мероприятия в незабываемые события.
              </p>
              <p className="font-sans text-base sm:text-lg leading-relaxed mb-6" style={{ color: "rgba(245,241,234,0.85)" }}>
                3 500+ мероприятий. От свадеб на 200 гостей до камерных ужинов на 10 персон. Каждое — с авторским меню, безупречной подачей и сервисом, который запоминают.
              </p>
              <div className="flex flex-wrap gap-4">
                <div>
                  <p className="font-serif text-3xl font-medium" style={{ color: "#D4A843" }}>3 500+</p>
                  <p className="font-sans text-xs uppercase tracking-wider" style={{ color: "rgba(245,241,234,0.6)" }}>мероприятий</p>
                </div>
                <div>
                  <p className="font-serif text-3xl font-medium" style={{ color: "#D4A843" }}>18 лет</p>
                  <p className="font-sans text-xs uppercase tracking-wider" style={{ color: "rgba(245,241,234,0.6)" }}>опыта</p>
                </div>
                <div>
                  <p className="font-serif text-3xl font-medium" style={{ color: "#D4A843" }}>4.9/5</p>
                  <p className="font-sans text-xs uppercase tracking-wider" style={{ color: "rgba(245,241,234,0.6)" }}>рейтинг</p>
                </div>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/real/chef_about.jpg"
                alt={`Шеф-повар ${CONTACTS.founder} — Interfood Catering`}
                className="w-full aspect-[4/5] object-cover rounded-2xl"
                loading="lazy"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-[#1A1A1A]/90 backdrop-blur rounded-xl p-4">
                <p className="font-serif text-lg font-medium" style={{ color: "#F5F1EA" }}>{CONTACTS.founder}</p>
                <p className="font-sans text-sm" style={{ color: "#D4A843" }}>Шеф-повар · Основатель · С {CONTACTS.sinceYear} года</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
