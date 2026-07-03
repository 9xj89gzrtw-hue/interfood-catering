import type { Metadata } from "next";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import WhatsAppFloat from "@/components/home/WhatsAppFloat";
import FadeIn from "@/components/home/FadeIn";
import Stats from "@/components/home/Stats";
import { CONTACTS } from "@/lib/content";

export const metadata: Metadata = {
  title: "О компании",
  description: "Интерфуд Кейтеринг — ресторан выездного обслуживания в СПб с 2007 года. Авторская кухня шеф-повара Дмитрия Нилова. 3500+ мероприятий.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#F5F1EA", minHeight: "100vh" }}>
        <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20" style={{ background: "#1A1A1A" }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeIn>
              <p className="font-sans text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#D4A843" }}>С {CONTACTS.sinceYear} года</p>
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-light mb-6" style={{ color: "#F5F1EA" }}>
                О компании
              </h1>
            </FadeIn>
          </div>
        </section>

        <Stats />

        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="prose prose-lg max-w-none">
                <p className="font-serif text-2xl sm:text-3xl leading-relaxed font-light mb-8" style={{ color: "#1A1A1A" }}>
                  «Для нас организация кейтеринга — не просто работа, а увлечение, которое стало стилем жизни.»
                </p>
                <p className="font-sans text-base sm:text-lg leading-relaxed mb-6" style={{ color: "#5C564D" }}>
                  С {CONTACTS.sinceYear} года мы виртуозно подбираем меню для любого события, завоевывая сердца даже самых искушённых гурманов.
                </p>
                <p className="font-sans text-base sm:text-lg leading-relaxed mb-6" style={{ color: "#5C564D" }}>
                  Профессионализм команды, использование только качественных продуктов, оперативное обслуживание, сотрудничество с лучшими площадками и безупречная подача блюд — философия, которая отражается в каждом моменте нашей работы.
                </p>
                <p className="font-serif text-xl italic mt-8" style={{ color: "#8B6F47" }}>
                  — {CONTACTS.founder}
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="py-16 sm:py-20" style={{ background: "#EDE8DD" }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-center mb-12" style={{ color: "#1A1A1A" }}>
                Почему выбирают нас
              </h2>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: "👨‍🍳", title: "Авторская кухня", desc: "Шеф-повар Дмитрий Нилов лично составляет каждое меню" },
                { icon: "🌿", title: "Качественные продукты", desc: "Только свежие ингредиенты от проверенных поставщиков" },
                { icon: "⚡", title: "Оперативность", desc: "Ответим за 30 минут, организуем мероприятие за 1 день" },
                { icon: "🤝", title: "Лучшие площадки", desc: "Сотрудничаем с топ-площадками Санкт-Петербурга" },
                { icon: "🍽️", title: "Безупречная подача", desc: "Профессиональные официанты и стильный сервировка" },
                { icon: "💐", title: "Флористика в подарок", desc: "При заказе свадебного банкета — оформление в подарок" },
              ].map((f, i) => (
                <FadeIn key={i} delay={i * 80}>
                  <div className="bg-white rounded-2xl p-6 border border-[#D4A843]/10">
                    <div className="text-3xl mb-3">{f.icon}</div>
                    <h3 className="font-serif text-xl font-medium mb-2" style={{ color: "#1A1A1A" }}>{f.title}</h3>
                    <p className="font-sans text-sm" style={{ color: "#5C564D" }}>{f.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 text-center" style={{ background: "#1A1A1A" }}>
          <div className="max-w-3xl mx-auto px-4">
            <FadeIn>
              <h2 className="font-serif text-3xl sm:text-4xl font-light mb-6" style={{ color: "#F5F1EA" }}>Доверьте нам ваше событие</h2>
              <a href={CONTACTS.whatsappText} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-sans text-base px-8 py-4 rounded-full transition-all duration-300 hover:scale-[1.03]" style={{ background: "#D4A843", color: "#fff" }}>
                Обсудить мероприятие →
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
