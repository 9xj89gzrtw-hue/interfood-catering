import type { Metadata } from "next";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import WhatsAppFloat from "@/components/home/WhatsAppFloat";
import FadeIn from "@/components/home/FadeIn";
import MenuBuilder from "@/components/menu/MenuBuilder";

export const metadata: Metadata = {
  title: "Конструктор меню — соберите своё меню",
  description: "Интерактивный конструктор меню: перетащите блюда, узнайте стоимость в реальном времени, скачайте PDF. Кейтеринг СПб.",
};

export default function MenuBuilderPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#F5F1EA", minHeight: "100vh" }}>
        <section className="relative pt-32 pb-10 sm:pt-40 sm:pb-12" style={{ background: "#1A1A1A" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeIn>
              <p className="font-sans text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#D4A843" }}>
                Интерактивный конструктор
              </p>
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-light mb-6" style={{ color: "#F5F1EA" }}>
                Соберите своё меню
              </h1>
              <p className="font-sans text-base sm:text-lg max-w-2xl mx-auto" style={{ color: "rgba(245,241,234,0.8)" }}>
                Перетащите блюда в корзину — стоимость рассчитается автоматически. Скачайте PDF или отправьте заявку.
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MenuBuilder />
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
