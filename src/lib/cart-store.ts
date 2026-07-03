"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Dish } from "@/lib/dishes";

type CartItem = Dish & { qty: number };

type CartStore = {
  items: CartItem[];
  guests: number;
  addDish: (dish: Dish) => void;
  removeDish: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  setGuests: (n: number) => void;
  totalPrice: () => number;
  totalWeight: () => string;
};

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      guests: 20,
      addDish: (dish) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === dish.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === dish.id ? { ...i, qty: i.qty + 1 } : i
              ),
            };
          }
          return { items: [...state.items, { ...dish, qty: 1 }] };
        }),
      removeDish: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      updateQty: (id, qty) =>
        set((state) => ({
          items: qty <= 0
            ? state.items.filter((i) => i.id !== id)
            : state.items.map((i) => (i.id === id ? { ...i, qty } : i)),
        })),
      clearCart: () => set({ items: [] }),
      setGuests: (n) => set({ guests: Math.max(1, n) }),
      totalPrice: () => {
        const { items, guests } = get();
        return items.reduce((sum, i) => sum + i.pricePerGuest * i.qty * guests, 0);
      },
      totalWeight: () => {
        const { items } = get();
        const totalGrams = items.reduce((sum, i) => {
          const g = parseInt(i.weight);
          return sum + (isNaN(g) ? 0 : g) * i.qty;
        }, 0);
        return totalGrams >= 1000
          ? `${(totalGrams / 1000).toFixed(1)} кг`
          : `${totalGrams} гр`;
      },
    }),
    { name: "interfood-menu-cart" }
  )
);
