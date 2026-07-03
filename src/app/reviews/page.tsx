import type { Metadata } from "next";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import WhatsAppFloat from "@/components/home/WhatsAppFloat";
import FadeIn from "@/components/home/FadeIn";
import { CONTACTS, STATS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Отзывы клиентов",
  description: "Реальные отзывы клиентов Interfood Catering. Свадьбы, корпоративы, банкеты — 4.9/5 за 18 лет работы.",
};

const REVIEWS = [
  { name: "Анна и Дмитрий", event: "Свадьба, июль 2025", rating: 5, text: "Организовали свадьбу на 120 человек. Гости до сих пор вспоминают подачу и вкус блюд. Шеф-повар Нилов — настоящий профессионал! Флористическое оформление в подарок стало приятным бонусом." },
  { name: "Елена Смирнова", event: "Корпоратив, IT-компания", rating: 5, text: "Третий год заказываем корпоративный кейтеринг у Интерфуда. Всегда безупречно: вовремя, вкусно, красиво. Рекомендую всем." },
  { name: "Михаил К.", event: "Фуршет, ноябрь 2025", rating: 5, text: "Фуршет на 80 человек — всё было на высшем уровне. Канапе просто таяли во рту. Обязательно закажем ещё на следующий корпоратив." },
  { name: "Ольга и Сергей", event: "Свадьба, сентябрь 2025", rating: 5, text: "Выездная регистрация и банкет — всё идеально. Команда работала слаженно, гости в восторге. Спасибо!" },
  { name: "Ирина В.", event: "Кофе-брейк, конференция", rating: 5, text: "Организовали кофе-брейк на 200 человек для конференции. Всё чётко по времени, вкусно, аккуратно. Цена очень разумная — от 390 ₽." },
  { name: "Дмитрий П.", event: "Банкет, юбилей", rating: 5, text: "Юбилей на 60 человек. Меню составили индивидуально, учли все пожелания. Подача — как в ресторане, но дома. Однозначно рекомендуем!" },
  { name: "Мария и Алексей", event: "Свадьба, август 2025", rating: 5, text: "Заказали выездной ресторан на природу. Шеф готовил на месте — это было шоу! Гости до сих пор обсуждают." },
  { name: "Светлана", event: "Корпоратив, маркетинговое агентство", rating: 5, text: "Заказывали комплексные обеды в офис на неделю. Всё свежее, вкусное, разнообразное. Курьеры пунктуальные. Отличный сервис!" },
];

export default function ReviewsPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#F5F1EA", minHeight: "100vh" }}>
        <section className="relative pt-32 pb-12 sm:pt-40 sm:pb-16" style={{ background: "#1A1A1A" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeIn>
              <p className="font-sans text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#D4A843" }}>Отзывы клиентов</p>
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-light mb-6" style={{ color: "#F5F1EA" }}>
                Нам доверяют
              </h1>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="24" height="24" viewBox="0 0 24 24" fill="#D4A843"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
                <span className="font-serif text-3xl" style={{ color: "#F5F1EA" }}>4.9</span>
                <span className="font-sans text-sm" style={{ color: "rgba(245,241,234,0.6)" }}>/ 5</span>
              </div>
              <p className="font-sans text-sm" style={{ color: "rgba(245,241,234,0.7)" }}>30+ отзывов · {STATS[0].value} мероприятий</p>
            </FadeIn>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {REVIEWS.map((r, i) => (
                <FadeIn key={i} delay={(i % 2) * 80}>
                  <div className="bg-white rounded-2xl p-6 sm:p-8 h-full border border-[#D4A843]/10 transition-all duration-300 hover:shadow-lg">
                    <div className="flex gap-1 mb-4">
                      {[...Array(r.rating)].map((_, j) => (
                        <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill="#D4A843"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                      ))}
                    </div>
                    <p className="font-serif text-lg sm:text-xl leading-relaxed mb-6 italic" style={{ color: "#1A1A1A" }}>
                      «{r.text}»
                    </p>
                    <div className="border-t pt-4" style={{ borderColor: "rgba(212,168,67,0.15)" }}>
                      <p className="font-sans font-medium text-sm" style={{ color: "#1A1A1A" }}>{r.name}</p>
                      <p className="font-sans text-xs" style={{ color: "#8B6F47" }}>{r.event}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={200}>
              <div className="mt-12 text-center">
                <p className="font-sans text-base mb-6" style={{ color: "#5C564D" }}>
                  Хотите стать следующим довольным клиентом?
                </p>
                <a
                  href={CONTACTS.whatsappText}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-sans text-base px-8 py-4 rounded-full transition-all duration-300 hover:scale-[1.03]"
                  style={{ background: "#D4A843", color: "#fff" }}
                >
                  Оставить заявку →
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
