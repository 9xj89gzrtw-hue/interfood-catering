"use client";

import { useDraggable } from "@dnd-kit/core";
import { useCart } from "@/lib/cart-store";
import type { Dish } from "@/lib/dishes";

export function DishCard({ dish }: { dish: Dish }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: dish.id });
  const addDish = useCart((s) => s.addDish);
  const guests = useCart((s) => s.guests);
  const totalPrice = dish.pricePerGuest * guests;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="bg-white rounded-2xl overflow-hidden border border-[#D4A843]/10 transition-all duration-300 hover:shadow-lg"
      style={{ opacity: isDragging ? 0.4 : 1, cursor: "grab", touchAction: "none" }}
    >
      <div className="relative h-40 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute top-2 right-2 font-sans text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: "rgba(26,26,26,0.85)", color: "#D4A843" }}>
          {dish.pricePerGuest} ₽/гость
        </div>
        <div className="absolute bottom-2 left-2 font-sans text-xs px-2 py-1 rounded-full" style={{ background: "rgba(26,26,26,0.85)", color: "#fff" }}>
          {dish.weight}
        </div>
      </div>
      <div className="p-4">
        <p className="font-sans text-xs uppercase tracking-wider mb-1" style={{ color: "#8B6F47" }}>{dish.category}</p>
        <h3 className="font-serif text-base font-medium mb-1" style={{ color: "#1A1A1A" }}>{dish.name}</h3>
        <p className="font-sans text-xs leading-relaxed mb-3" style={{ color: "#5C564D" }}>{dish.desc}</p>
        {/* Price clarity: per-guest + total for current party size */}
        <div className="flex items-baseline justify-between mb-3 py-2 border-t border-b" style={{ borderColor: "rgba(212,168,67,0.1)" }}>
          <div>
            <span className="font-serif text-lg font-medium" style={{ color: "#D4A843" }}>{dish.pricePerGuest}</span>
            <span className="font-sans text-xs" style={{ color: "#8B6F47" }}> ₽/гость</span>
          </div>
          <div className="text-right">
            <span className="font-sans text-xs" style={{ color: "#8B6F47" }}>×{guests} = </span>
            <span className="font-serif text-base font-medium" style={{ color: "#1A1A1A" }}>{totalPrice.toLocaleString("ru")} ₽</span>
          </div>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); addDish(dish); }}
          onPointerDown={(e) => e.stopPropagation()}
          className="w-full font-sans text-sm py-3 rounded-full transition-all duration-200 hover:bg-[#1A1A1A] min-h-[44px]"
          style={{ background: "#D4A843", color: "#fff" }}
        >
          + Добавить в меню
        </button>
      </div>
    </div>
  );
}
