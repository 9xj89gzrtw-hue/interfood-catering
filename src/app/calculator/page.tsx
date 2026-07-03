"use client";

import { useState } from "react";
import Image from "next/image";
import SubpageLayout from "@/components/home/SubpageLayout";
import FadeIn from "@/components/home/FadeIn";

const EVENTS = [
  { id: "furshet", label: "Фуршет", price: 2450, img: "/images/food_general.jpg" },
  { id: "banquet", label: "Банкет", price: 4470, img: "/images/furshet_food.jpg" },
  { id: "coffee", label: "Кофе-брейк", price: 950, img: "/images/banket_food1.jpg" },
  { id: "wedding", label: "Свадьба", price: 7000, img: "/images/gallery_3.jpg" },
  { id: "corporate", label: "Корпоратив", price: 3500, img: "/images/wedding.jpg" },
] as const;

const OPTIONS = [
  { id: "premium", label: "Premium обслуживание", tag: "+15%" },
  { id: "livecook", label: "Live cooking станция", tag: "+15%" },
  { id: "bar", label: "Выездной бар", tag: "+15%" },
] as const;

export default function CalculatorPage() {
  const [selected, setSelected] = useState<string>(EVENTS[0].id);
  const [guests, setGuests] = useState(50);
  const [options, setOptions] = useState<Set<string>>(new Set());

  const event = EVENTS.find((e) => e.id === selected)!;
  const optionMultiplier = options.size * 0.15;
  const total = Math.round(event.price * guests * (1 + optionMultiplier));

  const toggleOption = (id: string) => {
    setOptions((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const fmt = (n: number) =>
    n.toLocaleString("ru-RU");

  const waText = encodeURIComponent(
    `Здравствуйте! Хочу заказать ${event.label} на ${guests} гостей. Расчётная стоимость: ${fmt(total)} ₽`
  );

  return (
    <SubpageLayout activePage="/calculator">
      {/* Hero */}
      <section className="pt-28 pb-12 sm:pt-36 sm:pb-16" style={{ background: "#F5F1EA" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <FadeIn>
            <h1 className="font-serif text-3xl sm:text-5xl font-semibold" style={{ color: "#1A1A1A" }}>
              Калькулятор стоимости
            </h1>
            <p className="mt-4 font-sans text-base sm:text-lg" style={{ color: "#5C564D" }}>
              Рассчитайте предварительную стоимость мероприятия за несколько кликов
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Calculator */}
      <section className="pb-20" style={{ background: "#F5F1EA" }}>
        <div className="max-w-2xl mx-auto px-4">
          <FadeIn>
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm">
              {/* Event type */}
              <label className="block font-sans text-sm font-medium mb-3" style={{ color: "#5C564D" }}>
                Тип мероприятия
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                {EVENTS.map((e) => (
                  <button
                    key={e.id}
                    onClick={() => setSelected(e.id)}
                    className="rounded-lg p-3 text-left transition-all border-2"
                    style={{
                      borderColor: e.id === selected ? "#D4A843" : "#E8E3D9",
                      background: e.id === selected ? "#FDF8EF" : "#FAFAF7",
                    }}
                  >
                    <span className="font-serif text-sm font-medium block" style={{ color: "#1A1A1A" }}>
                      {e.label}
                    </span>
                    <span className="font-sans text-xs mt-1 block" style={{ color: "#D4A843" }}>
                      {fmt(e.price)} ₽/чел
                    </span>
                  </button>
                ))}
              </div>

              {/* Guests */}
              <label className="block font-sans text-sm font-medium mb-3" style={{ color: "#5C564D" }}>
                Количество гостей
              </label>
              <div className="flex items-center gap-4 mb-8">
                <button
                  onClick={() => setGuests((g) => Math.max(10, g - 10))}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-sans"
                  style={{ background: "#F0EBE2", color: "#1A1A1A" }}
                >
                  −
                </button>
                <input
                  type="number"
                  min={10}
                  max={500}
                  value={guests}
                  onChange={(e) => {
                    const v = parseInt(e.target.value) || 10;
                    setGuests(Math.min(500, Math.max(10, v)));
                  }}
                  className="w-24 text-center font-serif text-2xl border-2 rounded-lg py-2 outline-none focus:ring-2"
                  style={{ borderColor: "#E8E3D9", color: "#1A1A1A" }}
                />
                <button
                  onClick={() => setGuests((g) => Math.min(500, g + 10))}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-sans"
                  style={{ background: "#F0EBE2", color: "#1A1A1A" }}
                >
                  +
                </button>
                <span className="font-sans text-sm" style={{ color: "#5C564D" }}>человек</span>
              </div>

              {/* Options */}
              <label className="block font-sans text-sm font-medium mb-3" style={{ color: "#5C564D" }}>
                Дополнительные опции
              </label>
              <div className="space-y-3 mb-8">
                {OPTIONS.map((opt) => (
                  <label
                    key={opt.id}
                    className="flex items-center gap-3 cursor-pointer p-3 rounded-lg transition-colors"
                    style={{ background: options.has(opt.id) ? "#FDF8EF" : "transparent" }}
                  >
                    <input
                      type="checkbox"
                      checked={options.has(opt.id)}
                      onChange={() => toggleOption(opt.id)}
                      className="w-5 h-5 rounded accent-[#D4A843]"
                    />
                    <span className="font-sans text-sm flex-1" style={{ color: "#1A1A1A" }}>
                      {opt.label}
                    </span>
                    <span className="font-sans text-xs font-medium" style={{ color: "#D4A843" }}>
                      {opt.tag}
                    </span>
                  </label>
                ))}
              </div>

              {/* Total */}
              <div className="text-center pt-6 border-t-2" style={{ borderColor: "#F0EBE2" }}>
                <p className="font-sans text-sm mb-2" style={{ color: "#5C564D" }}>Предварительная стоимость</p>
                <p className="font-serif text-4xl sm:text-5xl font-semibold" style={{ color: "#1A1A1A" }}>
                  {fmt(total)} <span style={{ color: "#D4A843" }}>₽</span>
                </p>
                <p className="font-sans text-xs mt-2" style={{ color: "#5C564D" }}>
                  {event.label} · {guests} гостей{optionMultiplier > 0 ? ` · +${Math.round(optionMultiplier * 100)}% опции` : ""}
                </p>
              </div>

              {/* CTA */}
              <a
                href={`https://wa.me/79119417205?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 block w-full text-center font-sans text-base font-medium py-4 rounded-full transition-opacity hover:opacity-90"
                style={{ background: "#D4A843", color: "#fff" }}
              >
                Получить точный расчёт в WhatsApp
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </SubpageLayout>
  );
}
