import type { Metadata } from "next";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import WhatsAppFloat from "@/components/home/WhatsAppFloat";
import FadeIn from "@/components/home/FadeIn";
import { SERVICES, CONTACTS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Услуги кейтеринга в СПб",
  description: "12 услуг кейтеринга: свадебный банкет, выездной ресторан, фуршет, кофе-брейк, оформление зала, торты на заказ и др. От 390 ₽/чел.",
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#F5F1EA", minHeight: "100vh" }}>
        <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20" style={{ background: "#1A1A1A" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeIn>
              <p className="font-sans text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#D4A843" }}>Что мы предлагаем</p>
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-light mb-6" style={{ color: "#F5F1EA" }}>
                Услуги кейтеринга
              </h1>
              <p className="font-sans text-base sm:text-lg max-w-2xl mx-auto" style={{ color: "rgba(245,241,234,0.8)" }}>
                Полный спектр услуг для мероприятий любого формата. От кофе-брейка до свадебного банкета — под ключ.
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((s, i) => (
                <FadeIn key={s.id} delay={i * 60}>
                  <div className="group bg-white rounded-2xl p-6 h-full border border-[#D4A843]/10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-4xl">{s.icon}</span>
                      <span className="font-sans text-xs px-3 py-1 rounded-full" style={{ background: "rgba(212,168,67,0.1)", color: "#8B6F47" }}>
                        от {s.from.toLocaleString("ru")} ₽
                      </span>
                    </div>
                    <h3 className="font-serif text-xl font-medium mb-2 transition-colors group-hover:text-[#D4A843]" style={{ color: "#1A1A1A" }}>{s.title}</h3>
                    <p className="font-sans text-sm leading-relaxed mb-4" style={{ color: "#5C564D" }}>{s.desc}</p>
                    <a href={`${CONTACTS.whatsappText}%20(${s.title})`} target="_blank" rel="noopener noreferrer" className="font-sans text-sm transition-all group-hover:gap-2 inline-flex items-center gap-1" style={{ color: "#D4A843" }}>
                      Заказать →
                    </a>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 text-center" style={{ background: "#1A1A1A" }}>
          <div className="max-w-3xl mx-auto px-4">
            <FadeIn>
              <h2 className="font-serif text-3xl sm:text-4xl font-light mb-6" style={{ color: "#F5F1EA" }}>Готовы обсудить ваше мероприятие?</h2>
              <p className="font-sans text-base mb-8" style={{ color: "rgba(245,241,234,0.7)" }}>Бесплатная консультация за 30 минут</p>
              <a href={CONTACTS.whatsappText} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-sans text-base px-8 py-4 rounded-full transition-all duration-300 hover:scale-[1.03]" style={{ background: "#D4A843", color: "#fff" }}>
                Связаться с нами →
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
