"use client";

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { useState } from "react";
import { useCart } from "@/lib/cart-store";
import { DISHES, CATEGORIES, type Dish } from "@/lib/dishes";
import { CartPanel } from "@/components/menu/CartPanel";
import { DishCard } from "@/components/menu/DishCard";

export default function MenuBuilder() {
  const [activeDish, setActiveDish] = useState<Dish | null>(null);
  const [activeCat, setActiveCat] = useState<string>("Все");
  const addDish = useCart((s) => s.addDish);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } })
  );

  const handleDragStart = (e: DragStartEvent) => {
    const dish = DISHES.find((d) => d.id === e.active.id);
    if (dish) setActiveDish(dish);
  };

  const handleDragEnd = (e: DragEndEvent) => {
    setActiveDish(null);
    if (e.over && e.over.id === "cart-dropzone") {
      const dish = DISHES.find((d) => d.id === e.active.id);
      if (dish) addDish(dish);
    }
  };

  const filteredDishes = activeCat === "Все" ? DISHES : DISHES.filter((d) => d.category === activeCat);
  const cats = ["Все", ...CATEGORIES];

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2">
          <div className="flex flex-wrap gap-2 mb-6">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className="font-sans text-sm px-4 py-2 rounded-full transition-all duration-200"
                style={{
                  background: activeCat === c ? "#D4A843" : "rgba(212,168,67,0.1)",
                  color: activeCat === c ? "#fff" : "#8B6F47",
                }}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredDishes.map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>
          <p className="font-sans text-xs mt-6 flex items-center gap-2" style={{ color: "#8B6F47" }}>
            <span style={{ color: "#D4A843" }}>💡</span>
            Перетащите блюдо в корзину справа или нажмите «+», чтобы добавить
          </p>
        </div>
        <div className="lg:col-span-1">
          <CartPanel />
        </div>
      </div>

      <DragOverlay>
        {activeDish ? (
          <div className="bg-white rounded-xl shadow-2xl p-3 opacity-90 rotate-3 max-w-xs" style={{ cursor: "grabbing" }}>
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={activeDish.image} alt={activeDish.name} className="w-16 h-16 rounded-lg object-cover" />
              <div>
                <p className="font-serif text-sm font-medium" style={{ color: "#1A1A1A" }}>{activeDish.name}</p>
                <p className="font-sans text-xs" style={{ color: "#D4A843" }}>{activeDish.pricePerGuest} ₽/гость</p>
              </div>
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
