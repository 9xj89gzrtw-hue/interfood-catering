import type { Metadata } from "next";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import WhatsAppFloat from "@/components/home/WhatsAppFloat";
import FadeIn from "@/components/home/FadeIn";
import { CONTACTS, MENU_TYPES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Частые вопросы",
  description: "Ответы на частые вопросы о кейтеринге: цены, меню, заказ, доставка, обслуживание. Interfood Catering СПб.",
};

const FAQ = [
  { q: "Сколько стоит кейтеринг на человека?", a: "Цены зависят от формата: кофе-брейк от 390 ₽, фуршет от 2 450 ₽, банкет от 4 470 ₽ на человека. В стоимость входит обслуживание, посуда, доставка в пределах КАД. Точную цену рассчитаем за 30 минут после заявки." },
  { q: "За сколько дней нужно делать заказ?", a: "Минимум за 3-5 дней для небольших мероприятий (до 50 человек). Для свадеб и крупных банкетов — за 2-4 недели. Но мы также принимаем срочные заказы — свяжитесь с нами, и мы постараемся помочь." },
  { q: "Что входит в стоимость?", a: "В стоимость входит: составление меню, приготовление блюд, обслуживание официантами, стандартная стеклянная и керамическая посуда, сервировочные блюда, столовые приборы, лёгкое цветочное сопровождение, доставка в пределах КАД." },
  { q: "Делаете ли вы дегустацию перед мероприятием?", a: "Да, для свадеб и крупных мероприятий (от 50 человек) мы проводим бесплатную дегустацию выбранных блюд. Это поможет вам окончательно определиться с меню." },
  { q: "Какие площадки вы обслуживаете?", a: "Мы работаем на любых площадках: в офисе, на природе, в лофте, на крыше, в ресторане, в шатре. Также сотрудничаем с лучшими площадками Санкт-Петербурга и можем порекомендовать подходящую." },
  { q: "Можно ли заказать индивидуальное меню?", a: "Конечно! Шеф-повар Дмитрий Нилов составит индивидуальное меню под ваш бюджет, предпочтения гостей и формат мероприятия. Учтём аллергии, вегетарианские предпочтения, религиозные ограничения." },
  { q: "Предоставляете ли вы посуду и мебель?", a: "Да, у нас есть услуга аренды оборудования: мебель, посуда, текстиль, техника. От 3 000 ₽. Полный перечень согласуем при оформлении заказа." },
  { q: "Как происходит оплата?", a: "Предоплата 50% при оформлении заказа, 50% — после мероприятия. Работаем по договору, предоставляем все закрывающие документы. Возможна оплата наличными, картой, безналичным расчётом." },
  { q: "Делаете ли вы оформление зала?", a: "Да! Флористическое сопровождение и оформление банкетного зала — от 8 000 ₽. Наши флористы придумают уникальные цветочные композиции, а оформители декорируют интерьер. При заказе свадебного банкета — до 4 композиций в подарок!" },
  { q: "Какое минимальное количество гостей?", a: "Минимум — от 10 человек. Максимум — не ограничен (обслуживали мероприятия на 2 000 гостей). Для маленьких групп (до 10 человек) рекомендуем доставку закусок." },
];

export default function FAQPage() {
  const jsonld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <Navbar />
      <main style={{ background: "#F5F1EA", minHeight: "100vh" }}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }} />
        <section className="relative pt-32 pb-12 sm:pt-40 sm:pb-16" style={{ background: "#1A1A1A" }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeIn>
              <p className="font-sans text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#D4A843" }}>Полезная информация</p>
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-light mb-6" style={{ color: "#F5F1EA" }}>
                Частые вопросы
              </h1>
              <p className="font-sans text-base sm:text-lg" style={{ color: "rgba(245,241,234,0.8)" }}>
                Ответы на популярные вопросы о кейтеринге
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-4">
              {FAQ.map((f, i) => (
                <FadeIn key={i} delay={i * 40}>
                  <details className="group bg-white rounded-2xl p-6 border border-[#D4A843]/10 transition-all duration-300 hover:shadow-md">
                    <summary className="flex items-center justify-between cursor-pointer list-none">
                      <h2 className="font-serif text-lg sm:text-xl font-medium pr-4" style={{ color: "#1A1A1A" }}>{f.q}</h2>
                      <span className="text-2xl shrink-0 transition-transform duration-300 group-open:rotate-45" style={{ color: "#D4A843" }}>+</span>
                    </summary>
                    <p className="font-sans text-sm sm:text-base leading-relaxed mt-4" style={{ color: "#5C564D" }}>{f.a}</p>
                  </details>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={200}>
              <div className="mt-10 text-center bg-[#1A1A1A] rounded-2xl p-8">
                <h2 className="font-serif text-2xl font-light mb-4" style={{ color: "#F5F1EA" }}>Не нашли ответ?</h2>
                <p className="font-sans text-sm mb-6" style={{ color: "rgba(245,241,234,0.7)" }}>Ответим лично за 30 минут</p>
                <a href={CONTACTS.whatsappText} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-sans text-base px-8 py-4 rounded-full transition-all duration-300 hover:scale-[1.03]" style={{ background: "#D4A843", color: "#fff" }}>
                  Задать вопрос →
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
