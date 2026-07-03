"use client";
import Image from "next/image";
import Link from "next/link";
import SubpageLayout from "@/components/home/SubpageLayout";
import FadeIn from "@/components/home/FadeIn";
import { useState } from "react";

const CARDS = [
  { icon: "☎", label: "Телефон", value: "+7 (812) 919-59-11", href: "tel:+78129195911" },
  { icon: "📱", label: "Мобильный", value: "+7 (911) 941-72-05", href: "tel:+79119417205" },
  { icon: "✉", label: "Email", value: "info@interfood-catering.ru", href: "mailto:info@interfood-catering.ru" },
  { icon: "📍", label: "Адрес", value: "Новолитовская ул. д.15, СПб", href: undefined },
  { icon: "🕐", label: "Часы работы", value: "Пн–Вс 09:00–22:00", href: undefined },
];

export default function ContactsPage() {
  const [form, setForm] = useState({ name: "", phone: "", type: "", date: "", guests: "", msg: "", consent: false });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = [
      `Заявка с сайта:`,
      `Имя: ${form.name}`,
      `Телефон: ${form.phone}`,
      `Тип: ${form.type}`,
      `Дата: ${form.date}`,
      `Гости: ${form.guests}`,
      `Сообщение: ${form.msg}`,
    ].join("\n");
    window.open(`https://wa.me/79119417205?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <SubpageLayout activePage="/contacts">
      {/* Header */}
      <section className="pt-28 pb-16" style={{ background: "#F5F1EA" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold mb-4" style={{ color: "#1A1A1A" }}>
              Контакты
            </h1>
            <p className="font-sans text-base max-w-lg mx-auto" style={{ color: "#5C564D" }}>
              Свяжитесь с нами любым удобным способом — ответим в течение 30 минут
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16" style={{ background: "#EDE8DD" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CARDS.map((c, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="bg-white rounded-xl p-5 flex items-start gap-4">
                  <span className="text-2xl">{c.icon}</span>
                  <div>
                    <p className="font-sans text-xs uppercase tracking-wider mb-1" style={{ color: "#8B6F47" }}>{c.label}</p>
                    {c.href ? (
                      <a href={c.href} className="font-sans text-sm font-medium hover:text-[#D4A843] transition-colors" style={{ color: "#1A1A1A" }}>{c.value}</a>
                    ) : (
                      <p className="font-sans text-sm font-medium" style={{ color: "#1A1A1A" }}>{c.value}</p>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Messengers */}
          <FadeIn delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <a
                href="https://wa.me/79119417205"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 font-sans text-sm px-6 py-3 rounded-full transition-colors"
                style={{ background: "#25D366", color: "#fff" }}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
              <a
                href="https://t.me/+79119417205"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 font-sans text-sm px-6 py-3 rounded-full transition-colors"
                style={{ background: "#0088cc", color: "#fff" }}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="#fff"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                Telegram
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20" style={{ background: "#F5F1EA" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-serif text-3xl sm:text-4xl text-center mb-12" style={{ color: "#1A1A1A" }}>
              Оставьте заявку
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <form className="max-w-lg mx-auto space-y-4" onSubmit={handleSubmit}>
              <input
                type="text" placeholder="Ваше имя" required
                value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-white rounded-xl px-4 py-3 font-sans text-sm outline-none focus:ring-2 focus:ring-[#D4A843]" style={{ color: "#1A1A1A" }}
              />
              <input
                type="tel" placeholder="Телефон" required
                value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full bg-white rounded-xl px-4 py-3 font-sans text-sm outline-none focus:ring-2 focus:ring-[#D4A843]" style={{ color: "#1A1A1A" }}
              />
              <select
                value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full bg-white rounded-xl px-4 py-3 font-sans text-sm outline-none focus:ring-2 focus:ring-[#D4A843]" style={{ color: "#1A1A1A" }}
              >
                <option value="">Тип мероприятия</option>
                <option value="banket">Банкет</option>
                <option value="furshet">Фуршет</option>
                <option value="coffee">Кофе-брейк</option>
                <option value="corporate">Корпоратив</option>
                <option value="wedding">Свадьба</option>
                <option value="other">Другое</option>
              </select>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date" placeholder="Дата"
                  value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full bg-white rounded-xl px-4 py-3 font-sans text-sm outline-none focus:ring-2 focus:ring-[#D4A843]" style={{ color: "#1A1A1A" }}
                />
                <input
                  type="number" placeholder="Кол-во гостей" min="1"
                  value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })}
                  className="w-full bg-white rounded-xl px-4 py-3 font-sans text-sm outline-none focus:ring-2 focus:ring-[#D4A843]" style={{ color: "#1A1A1A" }}
                />
              </div>
              <textarea
                placeholder="Сообщение" rows={3}
                value={form.msg} onChange={(e) => setForm({ ...form, msg: e.target.value })}
                className="w-full bg-white rounded-xl px-4 py-3 font-sans text-sm outline-none focus:ring-2 focus:ring-[#D4A843] resize-none" style={{ color: "#1A1A1A" }}
              />
              <label className="flex items-start gap-2 font-sans text-xs cursor-pointer" style={{ color: "#5C564D" }}>
                <input
                  type="checkbox" required
                  checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                  className="mt-0.5 accent-[#D4A843]"
                />
                <span>Я согласен(а) на обработку персональных данных</span>
              </label>
              <button
                type="submit"
                className="w-full font-sans text-sm py-3.5 rounded-xl transition-colors"
                style={{ background: "#D4A843", color: "#fff" }}
              >
                Отправить заявку в WhatsApp
              </button>
            </form>
          </FadeIn>
        </div>
      </section>
    </SubpageLayout>
  );
}
