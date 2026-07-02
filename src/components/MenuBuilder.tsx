"use client";

import { useState, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Plus,
  Minus,
  Trash2,
  ShoppingCart,
  X,
  Download,
  Users,
  ChevronRight,
  Sparkles,
  Gift,
  UtensilsCrossed,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetDescription,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

interface DishItem {
  id: string;
  name: string;
  desc: string;
  weight: string;
  pricePerPerson: number;
  image: string;
}

interface MenuCategory {
  id: string;
  name: string;
  priceRange: string;
  items: DishItem[];
}

const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "furshet",
    name: "Фуршет",
    priceRange: "от 2 450 ₽/чел",
    items: [
      { id: "f1", name: "Канапе с сёмгой и сливочным сыром", desc: "Нежное канапе на хлебце с филе сёмги, сливочным сыром и каперсами", weight: "40 г", pricePerPerson: 180, image: "/images/furshet_canape.jpg" },
      { id: "f2", name: "Тарталетка с креветкой", desc: "Хрустящая тарталетка с тигровой креветкой и соусом тартар", weight: "35 г", pricePerPerson: 220, image: "/images/food_shrimp.jpg" },
      { id: "f3", name: "Брускетта с томатами и моцареллой", desc: "Итальянская брускетта с помидорами черри, моцареллой и базиликом", weight: "50 г", pricePerPerson: 160, image: "/images/furshet_food.jpg" },
      { id: "f4", name: "Ролл с курицей и авокадо", desc: "Лавашный ролл с куриным филе, авокадо и сливочным сыром", weight: "60 г", pricePerPerson: 190, image: "/images/furshet.jpg" },
      { id: "f5", name: "Сырная тарелка", desc: "Ассорти из 5 сортов сыра: бри, дор-блю, пармезан, гауда, чеддер с мёдом и орехами", weight: "80 г", pricePerPerson: 350, image: "/images/banket_food1.jpg" },
    ],
  },
  {
    id: "banquet",
    name: "Банкет",
    priceRange: "от 4 470 ₽/чел",
    items: [
      { id: "b1", name: "Салат с тёплой утиной грудкой", desc: "Микс салат с утиной грудкой, вяленой вишней и кедровыми орешками", weight: "150 г", pricePerPerson: 420, image: "/images/food_salmon.jpg" },
      { id: "b2", name: "Стейк из говядины Medium", desc: "Мраморная говядина степени прожарки Medium с соусом из зелёного перца", weight: "200 г", pricePerPerson: 780, image: "/images/banket_meat.jpg" },
      { id: "b3", name: "Сёмга на гриле", desc: "Филе сёмги на гриле с лимонным соусом и овощами", weight: "180 г", pricePerPerson: 650, image: "/images/food_salmon.jpg" },
      { id: "b4", name: "Ризотто с белыми грибами", desc: "Кремовое ризотто из арборио с белыми грибами и пармезаном", weight: "200 г", pricePerPerson: 450, image: "/images/food_general.jpg" },
      { id: "b5", name: "Десертное ассорти", desc: "Тирамису, панна-котта и шоколадный фондан в мини-порциях", weight: "120 г", pricePerPerson: 380, image: "/images/banket_table1.jpg" },
    ],
  },
  {
    id: "coffee",
    name: "Кофе-брейк",
    priceRange: "от 950 ₽/чел",
    items: [
      { id: "c1", name: "Круассаны свежей выпечки", desc: "Мини-круассаны с маслом — классика французской выпечки", weight: "40 г", pricePerPerson: 120, image: "/images/coffee.jpg" },
      { id: "c2", name: "Фруктовая тарелка", desc: "Сезонные фрукты: клубника, голубика, манго, дыня, виноград", weight: "100 г", pricePerPerson: 280, image: "/images/gallery_3.jpg" },
      { id: "c3", name: "Мини-сэндвичи", desc: "Ассорти мини-сэндвичей с лососем, курицей и овощами", weight: "50 г", pricePerPerson: 190, image: "/images/furshet_canape.jpg" },
      { id: "c4", name: "Кофе и чай", desc: "Американо, капучино, чай чёрный/зелёный — неограниченно", weight: "—", pricePerPerson: 150, image: "/images/coffee.jpg" },
    ],
  },
  {
    id: "bbq",
    name: "BBQ / Выезд",
    priceRange: "от 3 200 ₽/чел",
    items: [
      { id: "bb1", name: "Шашлык из баранины", desc: "Маринованная баранья нога на углях с зеленью и луком", weight: "200 г", pricePerPerson: 520, image: "/images/banket_meat.jpg" },
      { id: "bb2", name: "Стейк Рибай на гриле", desc: "Рибай мраморной говядины на углях с томлёными овощами", weight: "250 г", pricePerPerson: 890, image: "/images/banket_table1.jpg" },
      { id: "bb3", name: "Овощи гриль", desc: "Цукини, перец, баклажан и шампиньоны на гриле с травами", weight: "150 г", pricePerPerson: 280, image: "/images/food_general.jpg" },
      { id: "bb4", name: "Люля-кебаб", desc: "Кебаб из телятины со специями и свежей зеленью", weight: "180 г", pricePerPerson: 450, image: "/images/banket_meat.jpg" },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════
   CART STATE
   ═══════════════════════════════════════════════════════════════ */

interface CartItem {
  dish: DishItem;
  quantity: number;
  categoryId: string;
}

/* ═══════════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════════ */

function formatPrice(price: number): string {
  return price.toLocaleString("ru-RU") + " ₽";
}

function getCategoryIcon(id: string) {
  switch (id) {
    case "furshet":
      return "🥂";
    case "banquet":
      return "🍽️";
    case "coffee":
      return "☕";
    case "bbq":
      return "🔥";
    default:
      return "🍴";
  }
}

/* ═══════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function MenuBuilder() {
  const isMobile = useIsMobile();
  const [activeCategory, setActiveCategory] = useState("furshet");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [guests, setGuests] = useState(50);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  /* ─── Cart operations ─── */
  const addToCart = useCallback((dish: DishItem, categoryId: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.dish.id === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.dish.id === dish.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { dish, quantity: 1, categoryId }];
    });
  }, []);

  const removeFromCart = useCallback((dishId: string) => {
    setCart((prev) => prev.filter((item) => item.dish.id !== dishId));
  }, []);

  const updateQuantity = useCallback((dishId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.dish.id === dishId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const getCartQuantity = useCallback(
    (dishId: string) => {
      return cart.find((item) => item.dish.id === dishId)?.quantity || 0;
    },
    [cart]
  );

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const costPerPerson = useMemo(
    () => cart.reduce((sum, item) => sum + item.dish.pricePerPerson * item.quantity, 0),
    [cart]
  );

  const discountPercent = useMemo(() => {
    if (guests >= 200) return 15;
    if (guests >= 100) return 10;
    return 0;
  }, [guests]);

  const discountAmount = useMemo(
    () => Math.round(costPerPerson * guests * (discountPercent / 100)),
    [costPerPerson, guests, discountPercent]
  );

  const totalCost = useMemo(
    () => costPerPerson * guests - discountAmount,
    [costPerPerson, guests, discountAmount]
  );

  /* ─── PDF generation ─── */
  const generatePDF = useCallback(() => {
    const categoryMap: Record<string, string> = {};
    MENU_CATEGORIES.forEach((cat) => {
      cat.items.forEach((item) => {
        categoryMap[item.id] = cat.name;
      });
    });

    const groupedByCategory: Record<string, CartItem[]> = {};
    cart.forEach((item) => {
      const catName = categoryMap[item.dish.id] || "Другое";
      if (!groupedByCategory[catName]) groupedByCategory[catName] = [];
      groupedByCategory[catName].push(item);
    });

    const html = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Интерфуд Кейтеринг — Ваше меню</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Georgia', 'Times New Roman', serif; color: #1A1714; background: #fff; padding: 40px; max-width: 800px; margin: 0 auto; }
    .header { text-align: center; padding-bottom: 24px; border-bottom: 2px solid #B8860B; margin-bottom: 32px; }
    .header h1 { font-size: 28px; color: #B8860B; margin-bottom: 4px; letter-spacing: 2px; }
    .header p { font-size: 14px; color: #7D5A0D; }
    .category-title { font-size: 20px; color: #B8860B; margin: 24px 0 12px; padding-bottom: 6px; border-bottom: 1px solid #E5BF65; }
    .menu-item { display: flex; justify-content: space-between; align-items: baseline; padding: 8px 0; font-size: 14px; border-bottom: 1px dotted #E5BF65; }
    .menu-item-left { flex: 1; }
    .menu-item-name { font-weight: 600; }
    .menu-item-weight { color: #7D5A0D; font-size: 12px; margin-left: 8px; }
    .menu-item-qty { color: #9A6F0A; font-size: 12px; margin-left: 8px; }
    .menu-item-price { font-weight: 600; white-space: nowrap; margin-left: 16px; color: #1A1714; }
    .totals { margin-top: 32px; padding-top: 16px; border-top: 2px solid #B8860B; }
    .total-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 14px; }
    .total-row.grand { font-size: 18px; font-weight: 700; color: #B8860B; padding-top: 12px; margin-top: 8px; border-top: 1px solid #E5BF65; }
    .discount { color: #2E7D32; }
    .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #E5BF65; text-align: center; font-size: 12px; color: #7D5A0D; }
    .footer a { color: #B8860B; text-decoration: none; }
    @media print { body { padding: 20px; } }
  </style>
</head>
<body>
  <div class="header">
    <h1>ИНТЕРФУД КЕЙТЕРИНГ</h1>
    <p>Ваше персональное меню</p>
  </div>
  ${Object.entries(groupedByCategory)
    .map(
      ([catName, items]) => `
    <div class="category-title">${catName}</div>
    ${items
      .map(
        (item) => `
    <div class="menu-item">
      <div class="menu-item-left">
        <span class="menu-item-name">${item.dish.name}</span>
        <span class="menu-item-weight">${item.dish.weight}</span>
        <span class="menu-item-qty">×${item.quantity}</span>
      </div>
      <span class="menu-item-price">${formatPrice(item.dish.pricePerPerson * item.quantity)}/чел</span>
    </div>`
      )
      .join("")}`
    )
    .join("")}
  <div class="totals">
    <div class="total-row">
      <span>Стоимость на человека:</span>
      <span>${formatPrice(costPerPerson)}</span>
    </div>
    <div class="total-row">
      <span>Количество гостей:</span>
      <span>${guests}</span>
    </div>
    ${
      discountPercent > 0
        ? `<div class="total-row discount">
      <span>Скидка ${discountPercent}% (${guests >= 200 ? "от 200 гостей" : "от 100 гостей"}):</span>
      <span>−${formatPrice(discountAmount)}</span>
    </div>`
        : ""
    }
    <div class="total-row grand">
      <span>Итого:</span>
      <span>${formatPrice(totalCost)}</span>
    </div>
  </div>
  <div class="footer">
    <p>Интерфуд Кейтеринг · Санкт-Петербург</p>
    <p>+7 (812) 919-59-11 · interfood-catering@yandex.ru</p>
    <p><a href="https://interfood-catering.ru">interfood-catering.ru</a></p>
    <p style="margin-top: 8px; font-size: 10px; color: #B8B0A0;">Цены указаны на ${new Date().toLocaleDateString("ru-RU")}. Окончательная стоимость рассчитывается после согласования меню с шеф-поваром.</p>
  </div>
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const printWindow = window.open(url, "_blank");
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print();
      };
    }
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  }, [cart, costPerPerson, guests, discountPercent, discountAmount, totalCost]);

  /* ─── Cart panel content (shared between desktop & mobile) ─── */
  const cartPanelContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 pb-2">
        <h3
          className="text-xl font-semibold"
          style={{ fontFamily: "var(--font-serif)", color: "#1A1714" }}
        >
          Ваше меню
        </h3>
        <p className="text-sm" style={{ color: "#7D5A0D" }}>
          {cart.length === 0
            ? "Добавьте блюда из каталога"
            : `${cart.length} ${cart.length === 1 ? "позиция" : cart.length < 5 ? "позиции" : "позиций"}`}
        </p>
      </div>

      {/* Cart items */}
      <div className="flex-1 overflow-y-auto px-4" style={{ maxHeight: isMobile ? "40vh" : "none" }}>
        <AnimatePresence mode="popLayout">
          {cart.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <UtensilsCrossed
                className="mb-3"
                size={40}
                style={{ color: "#E5BF65" }}
              />
              <p className="text-sm" style={{ color: "#7D5A0D" }}>
                Выберите блюда из каталога,
                <br />
                чтобы составить меню
              </p>
            </motion.div>
          ) : (
            <div className="space-y-2">
              {cart.map((item) => (
                <motion.div
                  key={item.dish.id}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-start gap-3 rounded-xl p-3"
                  style={{ background: "#FAFAF7" }}
                >
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-medium leading-tight truncate"
                      style={{ color: "#1A1714" }}
                    >
                      {item.dish.name}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "#7D5A0D" }}>
                      {item.dish.weight} · {formatPrice(item.dish.pricePerPerson)}/чел
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => updateQuantity(item.dish.id, -1)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-[#E5BF65]/20"
                      style={{ border: "1px solid #E5BF65" }}
                      aria-label="Уменьшить"
                    >
                      <Minus size={14} style={{ color: "#B8860B" }} />
                    </button>
                    <span
                      className="w-7 text-center text-sm font-semibold"
                      style={{ color: "#1A1714" }}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.dish.id, 1)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-[#E5BF65]/20"
                      style={{ border: "1px solid #E5BF65" }}
                      aria-label="Увеличить"
                    >
                      <Plus size={14} style={{ color: "#B8860B" }} />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.dish.id)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-red-50"
                      aria-label="Удалить"
                    >
                      <Trash2 size={14} className="text-red-400" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Calculator & Totals */}
      {cart.length > 0 && (
        <div className="p-4 pt-3" style={{ borderTop: "1px solid #E5BF65" }}>
          {/* Guest input */}
          <div className="flex items-center gap-3 mb-3">
            <Users size={18} style={{ color: "#B8860B" }} />
            <label className="text-sm" style={{ color: "#7D5A0D" }}>
              Гости:
            </label>
            <Input
              type="number"
              min={1}
              max={5000}
              value={guests}
              onChange={(e) => setGuests(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-20 h-8 text-center text-sm"
              style={{ borderColor: "#E5BF65" }}
            />
            <span className="text-xs" style={{ color: "#7D5A0D" }}>
              чел.
            </span>
          </div>

          {/* Cost breakdown */}
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between">
              <span style={{ color: "#7D5A0D" }}>На человека:</span>
              <span className="font-medium" style={{ color: "#1A1714" }}>
                {formatPrice(costPerPerson)}
              </span>
            </div>
            {discountPercent > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between"
              >
                <span className="flex items-center gap-1 text-green-700">
                  <Gift size={14} />
                  Скидка {discountPercent}%:
                </span>
                <span className="font-medium text-green-700">
                  −{formatPrice(discountAmount)}
                </span>
              </motion.div>
            )}
            <div className="flex justify-between pt-2" style={{ borderTop: "1px solid #E5BF65" }}>
              <span className="font-semibold" style={{ color: "#1A1714" }}>
                Итого:
              </span>
              <span
                className="font-bold text-lg"
                style={{ color: "#B8860B" }}
              >
                {formatPrice(totalCost)}
              </span>
            </div>
          </div>

          {/* Discount hint */}
          {discountPercent === 0 && guests < 100 && (
            <p className="text-xs mt-2" style={{ color: "#B8B0A0" }}>
              <Gift size={12} className="inline mr-1" />
              {guests < 100
                ? `Ещё ${100 - guests} гостей до скидки 10%`
                : "Скидка 10% при 100+ гостей"}
            </p>
          )}

          {/* PDF button */}
          <Button
            onClick={generatePDF}
            className="w-full mt-4 h-11 text-sm font-semibold gap-2"
            style={{
              background: "#B8860B",
              color: "#fff",
              borderRadius: "12px",
            }}
          >
            <Download size={16} />
            Скачать PDF
          </Button>
        </div>
      )}
    </div>
  );

  /* ═══════════════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════════════ */

  return (
    <div
      className="w-full"
      style={{ background: "#FAFAF7", color: "#1A1714" }}
    >
      {/* ─── Category Tabs ─── */}
      <div className="sticky top-0 z-30" style={{ background: "#FAFAF7" }}>
        <div
          ref={categoryScrollRef}
          className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all shrink-0"
              style={{
                background:
                  activeCategory === cat.id ? "#B8860B" : "rgba(184,134,11,0.08)",
                color: activeCategory === cat.id ? "#fff" : "#7D5A0D",
                boxShadow:
                  activeCategory === cat.id
                    ? "0 4px 12px rgba(184,134,11,0.3)"
                    : "none",
              }}
            >
              <span>{getCategoryIcon(cat.id)}</span>
              <span>{cat.name}</span>
              <span className="text-xs opacity-70">{cat.priceRange}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ─── Main layout: dishes + cart ─── */}
      <div className="flex gap-6 px-4 pb-4">
        {/* Dish grid */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4"
            >
              {MENU_CATEGORIES.find((c) => c.id === activeCategory)?.items.map(
                (dish, index) => {
                  const inCart = getCartQuantity(dish.id);
                  return (
                    <motion.div
                      key={dish.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.06 }}
                      className="group relative overflow-hidden rounded-2xl"
                      style={{
                        background: "#FFFFFF",
                        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                        border: inCart ? "2px solid #B8860B" : "2px solid transparent",
                      }}
                    >
                      {/* Image */}
                      <div className="relative h-40 overflow-hidden">
                        <Image
                          src={dish.image}
                          alt={dish.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div
                          className="absolute inset-0"
                          style={{
                            background:
                              "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)",
                          }}
                        />
                        {/* Price badge */}
                        <div className="absolute top-3 right-3">
                          <Badge
                            className="text-xs font-semibold px-2.5 py-1"
                            style={{
                              background: "rgba(255,255,255,0.95)",
                              color: "#B8860B",
                              border: "none",
                            }}
                          >
                            {formatPrice(dish.pricePerPerson)}/чел
                          </Badge>
                        </div>
                        {/* Weight badge */}
                        <div className="absolute bottom-3 left-3">
                          <span
                            className="text-xs px-2 py-0.5 rounded-md"
                            style={{
                              background: "rgba(0,0,0,0.5)",
                              color: "#fff",
                            }}
                          >
                            {dish.weight}
                          </span>
                        </div>
                        {/* In-cart indicator */}
                        {inCart > 0 && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-3 left-3 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                            style={{ background: "#B8860B", color: "#fff" }}
                          >
                            {inCart}
                          </motion.div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h4
                          className="font-semibold text-sm leading-tight mb-1.5"
                          style={{
                            fontFamily: "var(--font-serif)",
                            color: "#1A1714",
                          }}
                        >
                          {dish.name}
                        </h4>
                        <p className="text-xs leading-relaxed mb-3" style={{ color: "#7D5A0D" }}>
                          {dish.desc}
                        </p>

                        {/* Add / quantity controls */}
                        {inCart === 0 ? (
                          <button
                            onClick={() => addToCart(dish, activeCategory)}
                            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all hover:shadow-md"
                            style={{
                              background: "rgba(184,134,11,0.1)",
                              color: "#B8860B",
                              border: "1px solid rgba(184,134,11,0.3)",
                            }}
                          >
                            <Plus size={16} />
                            Добавить
                          </button>
                        ) : (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(dish.id, -1)}
                                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                                style={{
                                  border: "1px solid #E5BF65",
                                  color: "#B8860B",
                                }}
                                aria-label="Уменьшить"
                              >
                                <Minus size={14} />
                              </button>
                              <span
                                className="w-6 text-center font-semibold text-sm"
                                style={{ color: "#1A1714" }}
                              >
                                {inCart}
                              </span>
                              <button
                                onClick={() => updateQuantity(dish.id, 1)}
                                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                                style={{
                                  background: "#B8860B",
                                  color: "#fff",
                                }}
                                aria-label="Увеличить"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(dish.id)}
                              className="text-xs px-3 py-1.5 rounded-lg transition-colors hover:bg-red-50"
                              style={{ color: "#dc2626" }}
                            >
                              Убрать
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                }
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ─── Desktop Cart Panel ─── */}
        {!isMobile && (
          <div className="w-80 shrink-0">
            <div
              className="sticky top-20 rounded-2xl overflow-hidden"
              style={{
                background: "#FFFFFF",
                boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                maxHeight: "calc(100vh - 6rem)",
                overflowY: "auto",
              }}
            >
              {cartPanelContent}
            </div>
          </div>
        )}
      </div>

      {/* ─── Mobile Floating Cart Button + Bottom Sheet ─── */}
      {isMobile && (
        <>
          {/* Floating "My Menu" button */}
          <AnimatePresence>
            {totalItems > 0 && !mobileMenuOpen && (
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="fixed bottom-6 left-4 right-4 z-40"
              >
                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <button
                      className="w-full flex items-center justify-between px-5 py-4 rounded-2xl shadow-xl"
                      style={{
                        background: "#B8860B",
                        color: "#fff",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <ShoppingCart size={22} />
                          <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center bg-white text-[#B8860B]">
                            {totalItems}
                          </span>
                        </div>
                        <span className="font-semibold text-sm">Моё меню</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">
                          {formatPrice(costPerPerson)}/чел
                        </span>
                        <ChevronRight size={18} />
                      </div>
                    </button>
                  </SheetTrigger>
                  <SheetContent
                    side="bottom"
                    className="rounded-t-2xl"
                    style={{ height: "85vh" }}
                  >
                    <SheetHeader className="sr-only">
                      <SheetTitle>Ваше меню</SheetTitle>
                      <SheetDescription>Управление выбранными блюдами</SheetDescription>
                    </SheetHeader>
                    {cartPanelContent}
                  </SheetContent>
                </Sheet>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating add-to-cart success indicator */}
          <AnimatePresence>
            {totalItems > 0 && mobileMenuOpen === false && (
              <motion.div
                key="cart-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
