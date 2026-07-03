"use client";

import FadeIn from "@/components/home/FadeIn";
import Link from "next/link";
import { MENU_TYPES, CONTACTS } from "@/lib/content";

export default function MenuPreview() {
  return (
    <section id="menu" className="py-20 sm:py-28" style={{ background: "#EDE8DD" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-12 sm:mb-16">
            <p className="font-sans text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "#8B6F47" }}>Меню от шеф-повара</p>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light mb-4" style={{ color: "#1A1A1A" }}>
              Авторская кухня
            </h2>
            <p className="font-sans text-base sm:text-lg max-w-2xl mx-auto" style={{ color: "#5C564D" }}>
              Реальные меню с ценами и блюдами. Выберите формат — остальное мы возьмём на себя
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {MENU_TYPES.map((m, i) => (
            <FadeIn key={m.id} delay={i * 100}>
              <div id={m.id} className="bg-white rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl border border-[#D4A843]/10">
                {/* Image header */}
                <div className="relative h-48 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.image} alt={m.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(26,26,26,0.7) 0%, transparent 60%)" }} />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-serif text-2xl font-medium text-white mb-1">{m.title}</h3>
                    <p className="font-sans text-xs text-white/80">{m.desc}</p>
                  </div>
                  <div className="absolute top-4 right-4 bg-[#D4A843] text-white font-sans text-sm px-3 py-1.5 rounded-full font-medium">
                    от {m.fromPrice.toLocaleString("ru")} ₽
                  </div>
                </div>

                {/* Menu items preview */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="space-y-4 mb-4 flex-1">
                    {m.items.slice(0, 2).map((cat) => (
                      <div key={cat.cat}>
                        <p className="font-sans text-xs uppercase tracking-wider mb-2" style={{ color: "#8B6F47" }}>{cat.cat}</p>
                        {cat.dishes.slice(0, 2).map((d, j) => (
                          <div key={j} className="flex justify-between items-baseline gap-2 mb-1">
                            <span className="font-sans text-sm" style={{ color: "#5C564D" }}>{d.n}</span>
                            <span className="font-sans text-xs shrink-0" style={{ color: "#8B6F47" }}>{d.w}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  {m.totalWeight && (
                    <p className="font-sans text-xs mb-4" style={{ color: "#8B6F47" }}>Общий вес: {m.totalWeight}</p>
                  )}

                  <Link
                    href="/menu"
                    className="block text-center font-sans text-sm py-3 rounded-full border transition-all duration-300 hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A]"
                    style={{ borderColor: "#1A1A1A", color: "#1A1A1A" }}
                  >
                    Смотреть полное меню →
                  </Link>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Price packages */}
        <FadeIn delay={300}>
          <div className="mt-10 text-center">
            <p className="font-sans text-sm mb-4" style={{ color: "#5C564D" }}>
              Доступны пакеты на любой бюджет — от кофе-брейка до премиум-банкета
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {["390 ₽", "950 ₽", "1 250 ₽", "2 450 ₽", "4 470 ₽", "6 970 ₽"].map((p) => (
                <span key={p} className="font-sans text-sm px-4 py-2 rounded-full" style={{ background: "rgba(212,168,67,0.12)", color: "#8B6F47" }}>
                  {p}/чел
                </span>
              ))}
            </div>
            <a
              href={CONTACTS.whatsappText}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 font-sans text-base px-8 py-4 rounded-full transition-all duration-300 hover:scale-[1.03]"
              style={{ background: "#D4A843", color: "#fff" }}
            >
              Рассчитать стоимость →
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
