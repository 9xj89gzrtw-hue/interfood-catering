import type { Metadata } from "next";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import WhatsAppFloat from "@/components/home/WhatsAppFloat";
import FadeIn from "@/components/home/FadeIn";
import { CONTACTS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Площадки для мероприятий",
  description: "Площадки для кейтеринга в СПб: рестораны, лофты, шатры, природа. Interfood Catering работает на любых площадках.",
};

const VENUES = [
  { name: "Рестораны", desc: "Премиум-рестораны СПб. Полное обслуживание, авторская кухня.", icon: "🏛️", features: ["До 500 гостей", "Собственная кухня", "Парковка"] },
  { name: "Лофты", desc: "Индустриальные лофты для корпоративов и свадеб.", icon: "🏭", features: ["До 200 гостей", "Открытое пространство", "Декор под любой стиль"] },
  { name: "Шатры", desc: "Климатические шатры для мероприятий на природе.", icon: "⛺", features: ["До 1000 гостей", "Любая погода", "Отопление/кондиционер"] },
  { name: "Природа", desc: "Загородные площадки, парки, набережные.", icon: "🌳", features: ["Выездной ресторан", "Барбекю на углях", "Сезонно"] },
  { name: "Офисы", desc: "Кейтеринг прямо в вашем офисе. Обеды, фуршеты, кофе-брейки.", icon: "🏢", features: ["Доставка ежедневно", "Обеды в офис", "Кофе-брейки для конференций"] },
  { name: "Крыши", desc: "Панорамные крыши с видом на СПб. Свадьбы и частные ужины.", icon: "🌆", features: ["До 80 гостей", "Эксклюзивно", "Сезонно"] },
];

export default function VenuesPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#F5F1EA", minHeight: "100vh" }}>
        <section className="relative pt-32 pb-12 sm:pt-40 sm:pb-16" style={{ background: "#1A1A1A" }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeIn>
              <p className="font-sans text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#D4A843" }}>Где мы работаем</p>
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-light mb-6" style={{ color: "#F5F1EA" }}>
                Площадки
              </h1>
              <p className="font-sans text-base sm:text-lg" style={{ color: "rgba(245,241,234,0.8)" }}>
                Работаем на любых площадках в СПб и области. Можем порекомендовать подходящую.
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {VENUES.map((v, i) => (
                <FadeIn key={i} delay={i * 80}>
                  <div className="bg-white rounded-2xl p-6 sm:p-8 h-full border border-[#D4A843]/10 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div className="text-4xl mb-4">{v.icon}</div>
                    <h2 className="font-serif text-xl font-medium mb-2" style={{ color: "#1A1A1A" }}>{v.name}</h2>
                    <p className="font-sans text-sm leading-relaxed mb-4" style={{ color: "#5C564D" }}>{v.desc}</p>
                    <ul className="space-y-1">
                      {v.features.map((f) => (
                        <li key={f} className="font-sans text-xs flex items-center gap-2" style={{ color: "#8B6F47" }}>
                          <span style={{ color: "#D4A843" }}>✓</span> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={200}>
              <div className="mt-12 text-center">
                <p className="font-sans text-base mb-6" style={{ color: "#5C564D" }}>
                  Не нашли подходящую площадку? Поможем подобрать!
                </p>
                <a href={CONTACTS.whatsappText} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-sans text-base px-8 py-4 rounded-full transition-all duration-300 hover:scale-[1.03]" style={{ background: "#D4A843", color: "#fff" }}>
                  Подобрать площадку →
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
