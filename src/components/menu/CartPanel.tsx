"use client";

import { useDroppable } from "@dnd-kit/core";
import { useCart } from "@/lib/cart-store";
import { Plus, Minus, Trash2, ShoppingCart, FileDown, Send } from "lucide-react";
import { generateMenuPDF } from "@/lib/pdf-generator";
import { CONTACTS } from "@/lib/content";

export function CartPanel() {
  const { items, guests, addDish, removeDish, updateQty, clearCart, setGuests, totalPrice, totalWeight } = useCart();
  const { isOver, setNodeRef } = useDroppable({ id: "cart-dropzone" });

  const total = totalPrice();
  const weight = totalWeight();

  const handleWhatsApp = () => {
    const lines = items.map((i) => `• ${i.name} ×${i.qty} — ${i.weight}`).join("\n");
    const msg = `Собранное меню:\nГостей: ${guests}\n\n${lines}\n\nОбщий вес: ${weight}\nИтого: ${total.toLocaleString("ru")} ₽`;
    window.open(`${CONTACTS.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const handlePDF = () => generateMenuPDF(items, guests, total, weight);

  return (
    <div
      ref={setNodeRef}
      className="bg-white rounded-2xl border-2 transition-all duration-200 sticky top-24"
      style={{
        borderColor: isOver ? "#D4A843" : "rgba(212,168,67,0.15)",
        background: isOver ? "rgba(212,168,67,0.05)" : "#fff",
        minHeight: "300px",
      }}
    >
      {/* Header */}
      <div className="p-5 border-b" style={{ borderColor: "rgba(212,168,67,0.15)" }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-xl font-medium flex items-center gap-2" style={{ color: "#1A1A1A" }}>
            <ShoppingCart size={20} style={{ color: "#D4A843" }} />
            Ваше меню
          </h3>
          {items.length > 0 && (
            <button onClick={clearCart} className="font-sans text-xs hover:text-red-500 transition-colors" style={{ color: "#8B6F47" }}>
              Очистить
            </button>
          )}
        </div>

        {/* Guests counter */}
        <div className="flex items-center justify-between">
          <span className="font-sans text-sm" style={{ color: "#5C564D" }}>Количество гостей</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setGuests(guests - 1)}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-[#1A1A1A] hover:text-white"
              style={{ background: "rgba(212,168,67,0.12)", color: "#8B6F47" }}
              aria-label="Меньше гостей"
            >
              <Minus size={14} />
            </button>
            <span className="font-serif text-lg font-medium w-10 text-center" style={{ color: "#1A1A1A" }}>{guests}</span>
            <button
              onClick={() => setGuests(guests + 1)}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-[#1A1A1A] hover:text-white"
              style={{ background: "rgba(212,168,67,0.12)", color: "#8B6F47" }}
              aria-label="Больше гостей"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="p-5 max-h-80 overflow-y-auto">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-3 opacity-40">🍽️</div>
            <p className="font-sans text-sm" style={{ color: "#8B6F47" }}>
              {isOver ? "Отпустите, чтобы добавить" : "Перетащите блюда сюда"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 py-2 border-b last:border-0" style={{ borderColor: "rgba(212,168,67,0.08)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-sans text-sm font-medium truncate" style={{ color: "#1A1A1A" }}>{item.name}</p>
                  <p className="font-sans text-xs" style={{ color: "#8B6F47" }}>{item.weight} · {item.pricePerGuest} ₽</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "rgba(212,168,67,0.1)", color: "#8B6F47" }} aria-label="Меньше">
                    <Minus size={12} />
                  </button>
                  <span className="font-sans text-sm w-5 text-center" style={{ color: "#1A1A1A" }}>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "rgba(212,168,67,0.1)", color: "#8B6F47" }} aria-label="Больше">
                    <Plus size={12} />
                  </button>
                  <button onClick={() => removeDish(item.id)} className="ml-1 text-red-400 hover:text-red-600" aria-label="Удалить">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer with total + actions */}
      {items.length > 0 && (
        <div className="p-5 border-t" style={{ borderColor: "rgba(212,168,67,0.15)", background: "#F5F1EA" }}>
          <div className="mb-4 space-y-1">
            <div className="flex justify-between font-sans text-sm" style={{ color: "#5C564D" }}>
              <span>Общий вес:</span>
              <span style={{ color: "#1A1A1A" }}>{weight}</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="font-sans text-sm" style={{ color: "#5C564D" }}>Итого ({guests} чел.):</span>
              <span className="font-serif text-2xl font-medium" style={{ color: "#D4A843" }}>{total.toLocaleString("ru")} ₽</span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={handleWhatsApp}
              className="font-sans text-sm py-3 rounded-full transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2"
              style={{ background: "#D4A843", color: "#fff" }}
            >
              <Send size={16} /> Отправить в WhatsApp
            </button>
            <button
              onClick={handlePDF}
              className="font-sans text-sm py-3 rounded-full border transition-all duration-200 hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A] flex items-center justify-center gap-2"
              style={{ borderColor: "#1A1A1A", color: "#1A1A1A" }}
            >
              <FileDown size={16} /> Скачать PDF меню
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
