"use client";
import Image from "next/image";
import Link from "next/link";
import SubpageLayout from "@/components/home/SubpageLayout";
import FadeIn from "@/components/home/FadeIn";

const FEATURES = [
  { icon: "🍽", title: "Полное обслуживание", desc: "Профессиональные официанты обеспечивают безупречный сервис — подача блюд, смена приборов, наполнение бокалов и внимание к каждой детали." },
  { icon: "📖", title: "Индивидуальное меню", desc: "Шеф-повар разрабатывает меню с учётом ваших предпочтений, сезона и формата. Каждое блюдо — авторская работа для вашего торжества." },
  { icon: "✨", title: "Премиальная сервировка", desc: "Фарфор, хрусталь, столовое серебро и текстиль от ведущих европейских брендов. Каждое место за столом задаёт тон всему вечеру." },
];

const TIERS = [
  { name: "Классик", price: "4 000", featured: false, items: ["Трёхкурсовый ужин", "Стандартное обслуживание", "Базовая сервировка", "Доставка и уборка", "1 официант на 12 гостей"] },
  { name: "Премиум", price: "5 500", featured: true, items: ["Пятикурсовый ужин", "Винное сопровождение", "Премиальная сервировка", "Доставка и уборка", "1 официант на 8 гостей", "Координатор мероприятия"] },
  { name: "Гранд", price: "7 500", featured: false, items: ["Семикурсовый дегустационный сет", "Личный сомелье", "Live cooking станция", "Премиальная сервировка", "1 официант на 6 гостей", "Декоратор и координатор"] },
];

const DISHES = ["Салат с тигровыми креветками", "Крем-суп из тыквы", "Стейк из говядины с овощами гриль", "Филе сибаса с лимонным соусом", "Тирамису"];

export default function BanketPage() {
  return (
    <SubpageLayout activePage="/banket">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[360px] flex items-end overflow-hidden">
        <Image src="/images/v5/banket.jpg" alt="Банкетное обслуживание" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <FadeIn>
            <p className="font-sans text-sm mb-3" style={{ color: "rgba(245,241,234,0.7)" }}>
              <Link href="/" className="hover:text-[#D4A843] transition-colors">Главная</Link> / Банкет
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold" style={{ color: "#F5F1EA" }}>
              Банкетное обслуживание
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* About */}
      <section className="py-20" style={{ background: "#F5F1EA" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn><h2 className="font-serif text-3xl sm:text-4xl text-center mb-4" style={{ color: "#1A1A1A" }}>Формат банкета</h2></FadeIn>
          <FadeIn delay={100}>
            <div className="max-w-2xl mx-auto space-y-5 font-sans text-base leading-relaxed" style={{ color: "#5C564D" }}>
              <p>Банкетное обслуживание — вершина кейтерингового искусства, где каждый элемент вечера подчинён единой гармонии вкуса, эстетики и безупречного сервиса. В отличие от фуршета, банкет предполагает торжественную рассадку и полноценный ужин за красиво накрытыми столами. Этот формат идеально подходит для свадеб, юбилеев, корпоративных торжеств и дипломатических приёмов.</p>
              <p>Наша команда подходит к организации банкета как к созданию произведения искусства. Шеф-повар лично составляет меню, учитывая сезонность продуктов, гастрономические тренды и ваши предпочтения. Каждое блюдо проходит дегустационный отбор — мы приглашаем вас на пробную дегустацию, чтобы вкус превзошёл ожидания.</p>
              <p>Профессиональные официанты, обученные по стандартам fine dining, обеспечивают безупречную подачу. От первого приветственного бокала до последней чашки кофе — ваш вечер будет безупречен.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Features */}
      <section className="py-20" style={{ background: "#EDE8DD" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn><h2 className="font-serif text-3xl sm:text-4xl text-center mb-12" style={{ color: "#1A1A1A" }}>Почему банкет</h2></FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <FadeIn key={i} delay={i * 150}>
                <div className="bg-white rounded-xl p-6 text-center">
                  <span className="text-4xl mb-4 block">{f.icon}</span>
                  <h3 className="font-serif text-xl mb-3" style={{ color: "#1A1A1A" }}>{f.title}</h3>
                  <p className="font-sans text-sm leading-relaxed" style={{ color: "#5C564D" }}>{f.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Price Tiers */}
      <section className="py-20" style={{ background: "#F5F1EA" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn><h2 className="font-serif text-3xl sm:text-4xl text-center mb-12" style={{ color: "#1A1A1A" }}>Стоимость банкета</h2></FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {TIERS.map((t, i) => (
              <FadeIn key={i} delay={i * 150}>
                <div className={`bg-white rounded-xl p-6 flex flex-col ${t.featured ? "ring-2 ring-[#D4A843]" : ""}`}>
                  {t.featured && <span className="font-sans text-xs font-medium tracking-wider uppercase mb-3 self-start px-3 py-1 rounded-full" style={{ background: "#D4A843", color: "#fff" }}>Популярный</span>}
                  <h3 className="font-serif text-2xl" style={{ color: "#1A1A1A" }}>{t.name}</h3>
                  <p className="font-sans text-sm mt-1 mb-4" style={{ color: "#8B6F47" }}>от {t.price} ₽/чел</p>
                  <ul className="font-sans text-sm space-y-2 flex-1 mb-6" style={{ color: "#5C564D" }}>
                    {t.items.map((item, j) => <li key={j} className="flex gap-2"><span style={{ color: "#D4A843" }}>•</span>{item}</li>)}
                  </ul>
                  <a href="https://wa.me/79119417205" target="_blank" rel="noopener noreferrer" className="font-sans text-sm text-center py-3 rounded-lg transition-colors" style={{ background: t.featured ? "#D4A843" : "transparent", color: t.featured ? "#fff" : "#8B6F47", border: t.featured ? "none" : "1px solid #8B6F47" }}>Заказать</a>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Examples */}
      <section className="py-20" style={{ background: "#EDE8DD" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn><h2 className="font-serif text-3xl sm:text-4xl text-center mb-12" style={{ color: "#1A1A1A" }}>Примеры блюд</h2></FadeIn>
          <FadeIn delay={100}>
            <div className="max-w-md mx-auto space-y-3">
              {DISHES.map((d, i) => (
                <div key={i} className="bg-white rounded-xl px-5 py-4 flex items-center gap-3 font-sans text-sm" style={{ color: "#1A1A1A" }}>
                  <span style={{ color: "#D4A843" }}>◆</span>{d}
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={200}><p className="font-sans text-xs text-center mt-6 italic" style={{ color: "#8B6F47" }}>Меню формируется индивидуально. Доступны веганские, безглютеновые и халяльные опции.</p></FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: "#1A1A1A" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="font-serif text-3xl sm:text-4xl mb-4" style={{ color: "#F5F1EA" }}>Закажите банкет мечты</h2>
            <p className="font-sans text-base mb-8 max-w-lg mx-auto" style={{ color: "rgba(245,241,234,0.6)" }}>Оставьте заявку — и мы организуем безупречный вечер, который превзойдёт все ожидания.</p>
            <a href="https://wa.me/79119417205" target="_blank" rel="noopener noreferrer" className="inline-block font-sans text-sm px-8 py-3.5 rounded-full transition-colors" style={{ background: "#D4A843", color: "#fff" }}>Написать в WhatsApp</a>
          </FadeIn>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20" style={{ background: "#F5F1EA" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn><h2 className="font-serif text-3xl sm:text-4xl text-center mb-12" style={{ color: "#1A1A1A" }}>Свяжитесь с нами</h2></FadeIn>
          <FadeIn delay={100}>
            <form className="max-w-lg mx-auto space-y-4" onSubmit={(e) => { e.preventDefault(); }}>
              <input type="text" placeholder="Ваше имя" required className="w-full bg-white rounded-xl px-4 py-3 font-sans text-sm outline-none focus:ring-2 focus:ring-[#D4A843]" style={{ color: "#1A1A1A" }} />
              <input type="tel" placeholder="Телефон" required className="w-full bg-white rounded-xl px-4 py-3 font-sans text-sm outline-none focus:ring-2 focus:ring-[#D4A843]" style={{ color: "#1A1A1A" }} />
              <select className="w-full bg-white rounded-xl px-4 py-3 font-sans text-sm outline-none" style={{ color: "#1A1A1A" }}>
                <option value="banket">Банкет</option><option value="furshet">Фуршет</option><option value="coffee">Кофе-брейк</option><option value="other">Другое</option>
              </select>
              <textarea placeholder="Расскажите о мероприятии" rows={3} className="w-full bg-white rounded-xl px-4 py-3 font-sans text-sm outline-none focus:ring-2 focus:ring-[#D4A843] resize-none" style={{ color: "#1A1A1A" }} />
              <label className="flex items-start gap-2 font-sans text-xs cursor-pointer" style={{ color: "#5C564D" }}>
                <input type="checkbox" className="mt-0.5 accent-[#D4A843]" />
                <span>Я согласен(а) на обработку персональных данных</span>
              </label>
              <button type="submit" className="w-full font-sans text-sm py-3.5 rounded-xl transition-colors" style={{ background: "#D4A843", color: "#fff" }}>Отправить заявку</button>
            </form>
          </FadeIn>
        </div>
      </section>
    </SubpageLayout>
  );
}
