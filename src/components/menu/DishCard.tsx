"use client";

import { useDraggable } from "@dnd-kit/core";
import { useCart } from "@/lib/cart-store";
import type { Dish } from "@/lib/dishes";

export function DishCard({ dish }: { dish: Dish }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: dish.id });
  const addDish = useCart((s) => s.addDish);

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="bg-white rounded-2xl overflow-hidden border border-[#D4A843]/10 transition-all duration-300 hover:shadow-lg"
      style={{
        opacity: isDragging ? 0.4 : 1,
        cursor: "grab",
        touchAction: "none",
      }}
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
        <button
          onClick={(e) => { e.stopPropagation(); addDish(dish); }}
          onPointerDown={(e) => e.stopPropagation()}
          className="w-full font-sans text-sm py-2 rounded-full transition-all duration-200 hover:bg-[#1A1A1A]"
          style={{ background: "#D4A843", color: "#fff" }}
        >
          + Добавить
        </button>
      </div>
    </div>
  );
}
