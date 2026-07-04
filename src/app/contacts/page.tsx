import type { Metadata } from "next";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import WhatsAppFloat from "@/components/home/WhatsAppFloat";
import FadeIn from "@/components/home/FadeIn";
import { CONTACTS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Свяжитесь с Интерфуд Кейтеринг: телефон, WhatsApp, Telegram, email. Санкт-Петербург, Новолитовская ул., 15.",
};

export default function ContactsPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#F5F1EA", minHeight: "100vh" }}>
        <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20" style={{ background: "#1A1A1A" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeIn>
              <p className="font-sans text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#D4A843" }}>Свяжитесь с нами</p>
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-light mb-6" style={{ color: "#F5F1EA" }}>Контакты</h1>
              <p className="font-sans text-base sm:text-lg max-w-2xl mx-auto" style={{ color: "rgba(245,241,234,0.8)" }}>
                Ответим в течение 30 минут. Бесплатная консультация и расчёт.
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FadeIn>
                <div className="bg-white rounded-2xl p-8 border border-[#D4A843]/10 h-full">
                  <h2 className="font-serif text-2xl font-medium mb-6" style={{ color: "#1A1A1A" }}>Телефоны</h2>
                  <div className="space-y-4">
                    <a href={CONTACTS.phoneHref} className="block group">
                      <p className="font-sans text-xs uppercase tracking-wider mb-1" style={{ color: "#8B6F47" }}>Офис</p>
                      <p className="font-serif text-2xl transition-colors group-hover:text-[#D4A843]" style={{ color: "#1A1A1A" }}>{CONTACTS.phone}</p>
                    </a>
                    <a href={CONTACTS.mobileHref} className="block group">
                      <p className="font-sans text-xs uppercase tracking-wider mb-1" style={{ color: "#8B6F47" }}>Мобильный / WhatsApp / Telegram</p>
                      <p className="font-serif text-2xl transition-colors group-hover:text-[#D4A843]" style={{ color: "#1A1A1A" }}>{CONTACTS.mobile}</p>
                    </a>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={100}>
                <div className="bg-white rounded-2xl p-8 border border-[#D4A843]/10 h-full">
                  <h2 className="font-serif text-2xl font-medium mb-6" style={{ color: "#1A1A1A" }}>Мессенджеры и почта</h2>
                  <div className="space-y-4">
                    <a href={CONTACTS.whatsappText} target="_blank" rel="noopener noreferrer" className="block group">
                      <p className="font-sans text-xs uppercase tracking-wider mb-1" style={{ color: "#8B6F47" }}>WhatsApp</p>
                      <p className="font-sans text-lg transition-colors group-hover:text-[#D4A843]" style={{ color: "#1A1A1A" }}>Написать в WhatsApp →</p>
                    </a>
                    <a href={CONTACTS.telegram} target="_blank" rel="noopener noreferrer" className="block group">
                      <p className="font-sans text-xs uppercase tracking-wider mb-1" style={{ color: "#8B6F47" }}>Telegram</p>
                      <p className="font-sans text-lg transition-colors group-hover:text-[#D4A843]" style={{ color: "#1A1A1A" }}>@nilov_catering →</p>
                    </a>
                    <a href={CONTACTS.emailHref} className="block group">
                      <p className="font-sans text-xs uppercase tracking-wider mb-1" style={{ color: "#8B6F47" }}>Email</p>
                      <p className="font-sans text-lg transition-colors group-hover:text-[#D4A843] break-all" style={{ color: "#1A1A1A" }}>{CONTACTS.email}</p>
                    </a>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={200}>
                <div className="bg-white rounded-2xl p-8 border border-[#D4A843]/10 h-full">
                  <h2 className="font-serif text-2xl font-medium mb-6" style={{ color: "#1A1A1A" }}>Адрес</h2>
                  <p className="font-sans text-base mb-2" style={{ color: "#5C564D" }}>{CONTACTS.address}</p>
                  <p className="font-sans text-sm mb-4" style={{ color: "#8B6F47" }}>Просим предварительно позвонить, чтобы договориться о встрече</p>
                  <p className="font-sans text-xs uppercase tracking-wider mb-2" style={{ color: "#8B6F47" }}>Часы работы</p>
                  <p className="font-sans text-base" style={{ color: "#1A1A1A" }}>Пн–Вс: 09:00–22:00</p>
                </div>
              </FadeIn>

              <FadeIn delay={300}>
                <div className="bg-white rounded-2xl p-8 border border-[#D4A843]/10 h-full">
                  <h2 className="font-serif text-2xl font-medium mb-6" style={{ color: "#1A1A1A" }}>Соцсети</h2>
                  <div className="space-y-3">
                    <a href={CONTACTS.vk} target="_blank" rel="noopener noreferrer" className="block font-sans text-lg transition-colors hover:text-[#D4A843]" style={{ color: "#1A1A1A" }}>VK → vk.com/nilovcatering</a>
                    <a href={CONTACTS.instagram} target="_blank" rel="noopener noreferrer" className="block font-sans text-lg transition-colors hover:text-[#D4A843]" style={{ color: "#1A1A1A" }}>Instagram → @nilov_catering</a>
                  </div>
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={400}>
              <div className="mt-10 text-center bg-[#1A1A1A] rounded-2xl p-8 sm:p-12">
                <h2 className="font-serif text-3xl font-light mb-4" style={{ color: "#F5F1EA" }}>Готовы оставить заявку?</h2>
                <p className="font-sans text-base mb-8" style={{ color: "rgba(245,241,234,0.7)" }}>Самый быстрый способ — написать в WhatsApp</p>
                <a href={CONTACTS.whatsappText} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-sans text-base px-8 py-4 rounded-full transition-all duration-300 hover:scale-[1.03]" style={{ background: "#D4A843", color: "#fff" }}>
                  Написать в WhatsApp →
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={500}>
              <div className="mt-8 bg-white rounded-2xl p-2 border border-[#D4A843]/10 overflow-hidden">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?text=Санкт-Петербург%20Новолитовская%20улица%2015&z=16"
                  width="100%"
                  height="400"
                  frameBorder="0"
                  style={{ border: 0, borderRadius: "12px" }}
                  allowFullScreen
                  title="Карта — Интерфуд Кейтеринг, Новолитовская ул., 15, СПб"
                  loading="lazy"
                />
                <div className="p-4 text-center">
                  <p className="font-serif text-lg font-medium" style={{ color: "#1A1A1A" }}>{CONTACTS.address}</p>
                  <p className="font-sans text-sm" style={{ color: "#8B6F47" }}>Пн–Вс: 09:00–22:00 · Предварительно позвоните</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
