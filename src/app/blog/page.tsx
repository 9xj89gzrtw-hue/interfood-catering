import type { Metadata } from "next";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import WhatsAppFloat from "@/components/home/WhatsAppFloat";
import FadeIn from "@/components/home/FadeIn";
import { NEWS, CONTACTS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Новости и акции",
  description: "Новости Interfood Catering: акции, спецпредложения, новые меню. Кейтеринг СПб.",
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#F5F1EA", minHeight: "100vh" }}>
        <section className="relative pt-32 pb-12 sm:pt-40 sm:pb-16" style={{ background: "#1A1A1A" }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeIn>
              <p className="font-sans text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#D4A843" }}>Что нового</p>
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-light mb-6" style={{ color: "#F5F1EA" }}>
                Новости
              </h1>
              <p className="font-sans text-base sm:text-lg" style={{ color: "rgba(245,241,234,0.8)" }}>
                Акции, спецпредложения и события компании
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              {NEWS.map((n, i) => (
                <FadeIn key={i} delay={i * 100}>
                  <article className="bg-white rounded-2xl p-6 sm:p-8 border border-[#D4A843]/10 transition-all duration-300 hover:shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-sans text-xs px-3 py-1 rounded-full" style={{ background: "rgba(212,168,67,0.12)", color: "#8B6F47" }}>{n.tag}</span>
                      <time className="font-sans text-xs" style={{ color: "#8B6F47" }}>
                        {new Date(n.date).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
                      </time>
                    </div>
                    <h2 className="font-serif text-2xl font-medium mb-4" style={{ color: "#1A1A1A" }}>{n.title}</h2>
                    <p className="font-sans text-base leading-relaxed mb-4" style={{ color: "#5C564D" }}>{n.text}</p>
                    <a href={CONTACTS.whatsappText} target="_blank" rel="noopener noreferrer" className="font-sans text-sm inline-flex items-center gap-1 hover:gap-2 transition-all" style={{ color: "#D4A843" }}>
                      Воспользоваться предложением →
                    </a>
                  </article>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={200}>
              <div className="mt-12 text-center bg-[#1A1A1A] rounded-2xl p-8 sm:p-12">
                <h2 className="font-serif text-3xl font-light mb-4" style={{ color: "#F5F1EA" }}>Подпишитесь на новости</h2>
                <p className="font-sans text-base mb-8" style={{ color: "rgba(245,241,234,0.7)" }}>Первыми узнавайте об акциях и спецпредложениях</p>
                <a href={CONTACTS.telegram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-sans text-base px-8 py-4 rounded-full transition-all duration-300 hover:scale-[1.03]" style={{ background: "#D4A843", color: "#fff" }}>
                  Подписаться в Telegram →
                </a>
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
