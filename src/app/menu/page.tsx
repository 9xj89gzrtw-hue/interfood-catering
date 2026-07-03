import type { Metadata } from "next";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import WhatsAppFloat from "@/components/home/WhatsAppFloat";
import FadeIn from "@/components/home/FadeIn";
import { MENU_TYPES, CONTACTS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Меню кейтеринга с ценами",
  description: "Фуршет от 2450 ₽, банкет от 4470 ₽, кофе-брейк от 390 ₽ на человека. Реальные блюда и цены. Авторская кухня шеф-повара Дмитрия Нилова.",
};

export default function MenuPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#F5F1EA", minHeight: "100vh" }}>
        {/* Hero header */}
        <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20" style={{ background: "#1A1A1A" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeIn>
              <p className="font-sans text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#D4A843" }}>Меню от шеф-повара</p>
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-light mb-6" style={{ color: "#F5F1EA" }}>
                Авторская кухня
              </h1>
              <p className="font-sans text-base sm:text-lg max-w-2xl mx-auto" style={{ color: "rgba(245,241,234,0.8)" }}>
                Реальные меню с блюдами и ценами. Авторская кухня шеф-повара {CONTACTS.founder} с {CONTACTS.sinceYear} года.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Menu cards */}
        {MENU_TYPES.map((m) => (
          <section key={m.id} id={m.id} className="py-16 sm:py-20" style={{ background: m.id === "banket" ? "#EDE8DD" : "#F5F1EA" }}>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                  <div>
                    <p className="font-sans text-xs tracking-[0.3em] uppercase mb-2" style={{ color: "#8B6F47" }}>{m.desc}</p>
                    <h2 className="font-serif text-4xl sm:text-5xl font-light" style={{ color: "#1A1A1A" }}>{m.title}</h2>
                  </div>
                  <div className="text-right">
                    <p className="font-sans text-xs uppercase tracking-wider" style={{ color: "#8B6F47" }}>от</p>
                    <p className="font-serif text-3xl font-medium" style={{ color: "#D4A843" }}>{m.fromPrice.toLocaleString("ru")} ₽</p>
                    <p className="font-sans text-xs" style={{ color: "#8B6F47" }}>на человека</p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={200}>
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#D4A843]/10">
                  {m.items.map((cat) => (
                    <div key={cat.cat} className="mb-8 last:mb-0">
                      <h3 className="font-serif text-xl font-medium mb-4 pb-2 border-b" style={{ color: "#1A1A1A", borderColor: "rgba(212,168,67,0.2)" }}>
                        {cat.cat}
                      </h3>
                      <div className="space-y-3">
                        {cat.dishes.map((d, j) => (
                          <div key={j} className="flex justify-between items-baseline gap-4">
                            <span className="font-sans text-sm sm:text-base" style={{ color: "#5C564D" }}>{d.n}</span>
                            <span className="font-sans text-xs sm:text-sm shrink-0 whitespace-nowrap" style={{ color: "#8B6F47" }}>{d.w}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  {m.totalWeight && (
                    <div className="mt-6 pt-4 border-t" style={{ borderColor: "rgba(212,168,67,0.15)" }}>
                      <p className="font-sans text-sm" style={{ color: "#8B6F47" }}>📊 Общий вес меню: <strong style={{ color: "#1A1A1A" }}>{m.totalWeight}</strong></p>
                    </div>
                  )}

                  <div className="mt-6 pt-4 border-t" style={{ borderColor: "rgba(212,168,67,0.15)" }}>
                    <p className="font-sans text-xs uppercase tracking-wider mb-3" style={{ color: "#8B6F47" }}>В стоимость входит:</p>
                    <div className="flex flex-wrap gap-2">
                      {m.included.map((inc) => (
                        <span key={inc} className="font-sans text-xs px-3 py-1.5 rounded-full" style={{ background: "rgba(212,168,67,0.1)", color: "#5C564D" }}>✓ {inc}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={300}>
                <div className="mt-8 flex flex-wrap gap-2 items-center">
                  <span className="font-sans text-sm mr-2" style={{ color: "#5C564D" }}>Доступные пакеты:</span>
                  {m.prices.map((p) => (
                    <span key={p} className="font-sans text-sm px-3 py-1.5 rounded-full font-medium" style={{ background: p === m.fromPrice ? "#D4A843" : "rgba(212,168,67,0.12)", color: p === m.fromPrice ? "#fff" : "#8B6F47" }}>
                      {p.toLocaleString("ru")} ₽
                    </span>
                  ))}
                </div>
              </FadeIn>

              <FadeIn delay={400}>
                <div className="mt-8 text-center">
                  <a
                    href={`${CONTACTS.whatsappText}%20(${m.title})`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-sans text-base px-8 py-4 rounded-full transition-all duration-300 hover:scale-[1.03]"
                    style={{ background: "#1A1A1A", color: "#F5F1EA" }}
                  >
                    Заказать {m.title.toLowerCase()} →
                  </a>
                </div>
              </FadeIn>
            </div>
          </section>
        ))}

        {/* CTA */}
        <section className="py-16 sm:py-20 text-center" style={{ background: "#1A1A1A" }}>
          <div className="max-w-3xl mx-auto px-4">
            <FadeIn>
              <h2 className="font-serif text-3xl sm:text-4xl font-light mb-6" style={{ color: "#F5F1EA" }}>
                Не нашли подходящий формат?
              </h2>
              <p className="font-sans text-base mb-8" style={{ color: "rgba(245,241,234,0.7)" }}>
                Шеф-повар составит индивидуальное меню под ваш бюджет и предпочтения
              </p>
              <a href={CONTACTS.whatsappText} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-sans text-base px-8 py-4 rounded-full transition-all duration-300 hover:scale-[1.03]" style={{ background: "#D4A843", color: "#fff" }}>
                Обсудить меню →
              </a>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
