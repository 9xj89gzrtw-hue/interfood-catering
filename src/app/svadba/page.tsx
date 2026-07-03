"use client";
import Image from "next/image";
import Link from "next/link";
import SubpageLayout from "@/components/home/SubpageLayout";
import FadeIn from "@/components/home/FadeIn";

const features = [
  { icon: "👩‍🍳", title: "Персональный шеф", text: "Шеф-повар, который создаёт меню под вашу историю любви" },
  { icon: "🍷", title: "Дегустация перед свадьбой", text: "Попробуйте каждое блюдо до торжества — без сюрпризов" },
  { icon: "⏰", title: "Координация вечера", text: "Тайминг подачи идеально синхронизирован с программой" },
];

const tiers = [
  { name: "Классик", price: "от 5 500 ₽/чел", desc: "Изысканный ужин в классическом ключе", featured: false },
  { name: "Премиум", price: "от 7 000 ₽/чел", desc: "Авторское меню с деликатесами и винным сопровождением", featured: true },
  { name: "Гранд", price: "от 10 000 ₽/чел", desc: "Безупречный гастрономический спектакль для самых требовательных", featured: false },
];

const menu = [
  { name: "Welcome-канапе", desc: "С лососем, трюфельной пастой и икрой судака" },
  { name: "Салат «Нежность»", desc: "Крем-суп из цветной капусты, перепелиное яйцо, пармезан" },
  { name: "Ризотто с белыми грибами", desc: "Арборио, пармезан, трюфельное масло, свежий тимьян" },
  { name: "Стейк вагю A5", desc: "С соусом из чёрного трюфеля и овощами гриль" },
  { name: "Свадебный торт", desc: "Трёхъярусный бисквит с ягодами и цветами по вашему выбору" },
];

export default function SvadbaPage() {
  return (
    <SubpageLayout activePage="/svadba">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[480px] flex items-end">
        <Image src="/images/v5/wedding.jpg" alt="Свадебный ужин" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 via-[#1A1A1A]/30 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14">
          <FadeIn>
            <p className="font-sans text-xs tracking-widest uppercase mb-3" style={{ color: "#D4A843" }}>
              Главная / Свадьба
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl" style={{ color: "#F5F1EA" }}>
              Свадебный ужин
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* About */}
      <section className="py-16 sm:py-24" style={{ background: "#F5F1EA" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="font-serif text-3xl sm:text-4xl mb-8" style={{ color: "#1A1A1A" }}>
              Формат, достойный вашего дня
            </h2>
            <div className="space-y-5 font-sans text-base sm:text-lg leading-relaxed" style={{ color: "#5C564D" }}>
              <p>Свадебный ужин — это не просто приём пищи. Это кульминация дня, когда близкие собираются за одним столом, поднимают бокалы и создают воспоминания, которые останутся навсегда. Мы убеждены: каждая свадьба заслуживает меню, написанного специально для неё.</p>
              <p>Наш шеф-повар работает с вами лично: узнает ваши вкусы, учитывает предпочтения гостей и продумывает каждое блюдо до мельчайших деталей. Незадолго до торжества мы приглашаем вас на дегустацию — вы попробуете каждое блюдо и внесёте последние штрихи.</p>
              <p>В вечер торжества наша команда незаметно и безупречно координирует подачу, синхронизируя её с программой — от первого тоста до разрезания торта. Вам останется лишь наслаждаться моментом.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-24" style={{ background: "#F5F1EA" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={i * 120}>
              <div className="text-center p-6 rounded-2xl" style={{ background: "#fff", boxShadow: "0 1px 8px rgba(0,0,0,0.04)" }}>
                <span className="text-4xl mb-4 block">{f.icon}</span>
                <h3 className="font-serif text-lg mb-2" style={{ color: "#1A1A1A" }}>{f.title}</h3>
                <p className="font-sans text-sm leading-relaxed" style={{ color: "#5C564D" }}>{f.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Price tiers */}
      <section className="py-16 sm:py-24" style={{ background: "#1A1A1A" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="font-serif text-3xl sm:text-4xl mb-10" style={{ color: "#F5F1EA" }}>Форматы сервировки</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-3 gap-6">
            {tiers.map((t, i) => (
              <FadeIn key={t.name} delay={i * 120}>
                <div
                  className="p-6 sm:p-8 rounded-2xl transition-transform hover:scale-[1.02]"
                  style={{
                    background: t.featured ? "#D4A843" : "rgba(245,241,234,0.06)",
                    border: t.featured ? "none" : "1px solid rgba(245,241,234,0.12)",
                  }}
                >
                  <h3 className="font-serif text-xl mb-2" style={{ color: t.featured ? "#fff" : "#F5F1EA" }}>{t.name}</h3>
                  <p className="font-serif text-2xl sm:text-3xl mb-3" style={{ color: t.featured ? "#fff" : "#D4A843" }}>{t.price}</p>
                  <p className="font-sans text-sm leading-relaxed" style={{ color: t.featured ? "rgba(255,255,255,0.85)" : "rgba(245,241,234,0.6)" }}>{t.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Menu examples */}
      <section className="py-16 sm:py-24" style={{ background: "#F5F1EA" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-serif text-3xl sm:text-4xl mb-10 text-center" style={{ color: "#1A1A1A" }}>Пример меню</h2>
          </FadeIn>
          <div className="space-y-4">
            {menu.map((d, i) => (
              <FadeIn key={d.name} delay={i * 80}>
                <div className="flex justify-between items-baseline gap-4 py-3" style={{ borderBottom: "1px solid rgba(26,26,26,0.1)" }}>
                  <span className="font-serif text-base sm:text-lg" style={{ color: "#1A1A1A" }}>{d.name}</span>
                  <span className="font-sans text-xs sm:text-sm text-right shrink-0" style={{ color: "#5C564D" }}>{d.desc}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 text-center" style={{ background: "#1A1A1A" }}>
        <FadeIn>
          <h2 className="font-serif text-3xl sm:text-4xl mb-4" style={{ color: "#F5F1EA" }}>Запишитесь на дегустацию</h2>
          <p className="font-sans text-base mb-8" style={{ color: "rgba(245,241,234,0.6)" }}>Попробуйте меню вашего свадебного ужина до торжества</p>
          <a
            href="https://wa.me/79119417205?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D0%B0%D1%82%D1%8C%D1%81%D1%8F%20%D0%BD%D0%B0%20%D0%B4%D0%B5%D0%B3%D1%83%D1%81%D1%82%D0%B0%D1%86%D0%B8%D1%8E"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-sans text-base px-8 py-3.5 rounded-full transition-all hover:scale-[1.03]"
            style={{ background: "#D4A843", color: "#fff" }}
          >
            Написать в WhatsApp
          </a>
        </FadeIn>
      </section>

      {/* Contact form */}
      <section className="py-16 sm:py-24" style={{ background: "#F5F1EA" }}>
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-serif text-3xl sm:text-4xl mb-8 text-center" style={{ color: "#1A1A1A" }}>Связаться с нами</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const msg = `Имя: ${fd.get("name")}\nТелефон: ${fd.get("phone")}\nДата: ${fd.get("date")}\nГости: ${fd.get("guests")}`;
                window.open(`https://wa.me/79119417205?text=${encodeURIComponent(msg)}`, "_blank");
              }}
              className="space-y-4"
            >
              {[
                { name: "name", placeholder: "Ваше имя", type: "text" },
                { name: "phone", placeholder: "Телефон", type: "tel" },
                { name: "date", placeholder: "Дата свадьбы", type: "text" },
                { name: "guests", placeholder: "Количество гостей", type: "text" },
              ].map((f) => (
                <input
                  key={f.name}
                  name={f.name}
                  type={f.type}
                  placeholder={f.placeholder}
                  required
                  className="w-full px-5 py-3 rounded-xl font-sans text-sm outline-none transition-shadow focus:ring-2 focus:ring-[#D4A843]/30"
                  style={{ background: "#fff", color: "#1A1A1A", border: "1px solid rgba(26,26,26,0.08)" }}
                />
              ))}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-sans text-sm font-medium transition-all hover:scale-[1.01]"
                style={{ background: "#D4A843", color: "#fff" }}
              >
                Отправить заявку
              </button>
            </form>
          </FadeIn>
        </div>
      </section>
    </SubpageLayout>
  );
}
