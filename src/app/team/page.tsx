import type { Metadata } from "next";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import WhatsAppFloat from "@/components/home/WhatsAppFloat";
import FadeIn from "@/components/home/FadeIn";
import { CONTACTS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Команда",
  description: "Команда Interfood Catering: шеф-повар Дмитрий Нилов, официанты, повара. Профессионалы с опытом 18 лет.",
};

const TEAM = [
  { name: "Дмитрий Нилов", role: "Шеф-повар, основатель", bio: "С 2007 года руководит кухней Interfood Catering. Авторская кухня, индивидуальные меню для каждого мероприятия. Признанный эксперт в кейтеринге.", icon: "👨‍🍳" },
  { name: "Команда поваров", role: "Кухня", bio: "12 профессиональных поваров. Готовят на месте или доставляют готовые блюда. Специализации: холодные закуски, горячее, кондитерское дело.", icon: "🍳" },
  { name: "Официанты", role: "Сервис", bio: "25 обученных официантов. Безупречная подача, знание этикета, униформа. Обслуживают от 10 до 2000 гостей одновременно.", icon: "🤵" },
  { name: "Флористы и оформители", role: "Декор", bio: "Команда декораторов и флористов. Оформление банкетных залов, цветочные композиции, тематический декор под любой стиль мероприятия.", icon: "🌸" },
  { name: "Менеджеры", role: "Организация", bio: "Персональные менеджеры для каждого заказа. Сопровождают от первой заявки до завершения мероприятия. Ответ за 30 минут.", icon: "📋" },
  { name: "Логисты", role: "Доставка", bio: "Команда логистики и курьеров. Своевременная доставка в пределах СПб и области. Доставляем обеды в офисы ежедневно.", icon: "🚚" },
];

export default function TeamPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#F5F1EA", minHeight: "100vh" }}>
        <section className="relative pt-32 pb-12 sm:pt-40 sm:pb-16" style={{ background: "#1A1A1A" }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeIn>
              <p className="font-sans text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#D4A843" }}>Наша команда</p>
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-light mb-6" style={{ color: "#F5F1EA" }}>
                Профессионалы
              </h1>
              <p className="font-sans text-base sm:text-lg" style={{ color: "rgba(245,241,234,0.8)" }}>
                Команда из 40+ специалистов, которые делают каждое мероприятие безупречным
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {TEAM.map((m, i) => (
                <FadeIn key={i} delay={i * 80}>
                  <div className="bg-white rounded-2xl p-6 sm:p-8 h-full border border-[#D4A843]/10 transition-all duration-300 hover:shadow-lg">
                    <div className="text-5xl mb-4">{m.icon}</div>
                    <h2 className="font-serif text-xl font-medium mb-1" style={{ color: "#1A1A1A" }}>{m.name}</h2>
                    <p className="font-sans text-xs uppercase tracking-wider mb-4" style={{ color: "#D4A843" }}>{m.role}</p>
                    <p className="font-sans text-sm leading-relaxed" style={{ color: "#5C564D" }}>{m.bio}</p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={200}>
              <div className="mt-12 text-center bg-[#1A1A1A] rounded-2xl p-8 sm:p-12">
                <h2 className="font-serif text-3xl font-light mb-4" style={{ color: "#F5F1EA" }}>Хотите работать с нами?</h2>
                <p className="font-sans text-base mb-8" style={{ color: "rgba(245,241,234,0.7)" }}>Доверьте ваше мероприятие профессионалам</p>
                <a href={CONTACTS.whatsappText} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-sans text-base px-8 py-4 rounded-full transition-all duration-300 hover:scale-[1.03]" style={{ background: "#D4A843", color: "#fff" }}>
                  Обсудить мероприятие →
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
