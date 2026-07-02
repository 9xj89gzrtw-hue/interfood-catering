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
  Star,
  FileText,
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
  popular?: boolean;
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
    priceRange: "2 450 / 2 950 / 3 950 / 5 350 ₽/чел",
    items: [
      { id: "f1", name: "Канапе с салями и маскарпоне", desc: "Ломтик итальянского салями с сыром маскарпоне и миндалём на пшеничном крутоне", weight: "35 г", pricePerPerson: 2450, image: "/images/furshet_canape.jpg", popular: true },
      { id: "f2", name: "Канапе с форелью и каперсами", desc: "Форель шеф-посол на тосте с лаймом, укропом и каперсами", weight: "35 г", pricePerPerson: 2450, image: "/images/food_shrimp.jpg" },
      { id: "f3", name: "Канапе с креветкой и икрой", desc: "Королевская креветка, завёрнутая в слайс цукини, украшенная икрой летучей рыбы", weight: "35 г", pricePerPerson: 2950, image: "/images/furshet_food.jpg", popular: true },
      { id: "f4", name: "Брускетта с овощами-гриль и песто", desc: "Брускетта с овощами-гриль и соусом песто", weight: "75 г", pricePerPerson: 2450, image: "/images/furshet.jpg" },
      { id: "f5", name: "Брускетта с моцареллой и бальзамиком", desc: "Брускетта с моцареллой, томатом, рукколой и бальзамиком", weight: "75 г", pricePerPerson: 2450, image: "/images/banket_food1.jpg" },
      { id: "f6", name: "Салат с тигровыми креветками", desc: "Салат с тигровыми креветками, ромейн, руккола, кисло-сладкий соус с кунжутом", weight: "50 г", pricePerPerson: 2950, image: "/images/food_salmon.jpg" },
    ],
  },
  {
    id: "banquet",
    name: "Банкет",
    priceRange: "4 470 / 4 970 / 6 970 ₽/чел",
    items: [
      { id: "b1", name: "Речная форель слабой соли", desc: "Речная форель, белая масляная рыба холодного копчения, королевские креветки, лимон и свежая зелень", weight: "150 г", pricePerPerson: 4470, image: "/images/food_salmon.jpg", popular: true },
      { id: "b2", name: "Домашняя буженина и куриный рулет", desc: "Буженина в чесночном пюре и горчице, куриный рулет су-вид, бруски из свиной вырезки в беконе", weight: "200 г", pricePerPerson: 4470, image: "/images/banket_meat.jpg", popular: true },
      { id: "b3", name: "Ростбиф medium rare", desc: "Ростбиф из говяжьей вырезки, пармская ветчина с грушей конфи и пармезаном", weight: "250 г", pricePerPerson: 4970, image: "/images/banket_meat.jpg" },
      { id: "b4", name: "Салат Нисуаз с тунцом", desc: "Салат Нисуаз с тунцом, листьями салата, перепелиным яйцом, томатами черри и фирменным соусом", weight: "150 г", pricePerPerson: 4470, image: "/images/food_general.jpg" },
      { id: "b5", name: "Салат Цезарь с куриным бедром", desc: "Салат Цезарь с сочным куриным бедром, айсбергом, пармезаном, гренками и фирменным соусом", weight: "150 г", pricePerPerson: 4470, image: "/images/furshet_canape.jpg" },
    ],
  },
  {
    id: "coffee",
    name: "Кофе-брейк",
    priceRange: "950 / 1 250 / 1 950 / 2 450 ₽/чел",
    items: [
      { id: "c1", name: "Клаб-сэндвич с ветчиной и сыром", desc: "Клаб-сэндвич с ветчиной, сыром и овощами", weight: "70 г", pricePerPerson: 950, image: "/images/coffee.jpg", popular: true },
      { id: "c2", name: "Круассан с куриным филе", desc: "Круассан с куриным филе, овощами и рукколой", weight: "80 г", pricePerPerson: 1250, image: "/images/furshet_food.jpg" },
      { id: "c3", name: "Мини-бургер с говядиной", desc: "Мини-бургер с говядиной, маринованными огурцами, томатами и соусом", weight: "50 г", pricePerPerson: 1950, image: "/images/furshet_canape.jpg" },
      { id: "c4", name: "Клаб-сэндвич с лососем", desc: "Клаб-сэндвич с лососем шеф-посол, творожным сыром и свежими огурцами", weight: "70 г", pricePerPerson: 2450, image: "/images/food_salmon.jpg" },
    ],
  },
  {
    id: "bbq",
    name: "BBQ / Выезд",
    priceRange: "от 3 200 ₽/чел",
    items: [
      { id: "bb1", name: "Шашлычок из свинины", desc: "Шашлычок из свинины на углях", weight: "200 г", pricePerPerson: 1950, image: "/images/banket_meat.jpg", popular: true },
      { id: "bb2", name: "Шашлычок из морепродуктов", desc: "Шашлычок из морепродуктов на углях", weight: "200 г", pricePerPerson: 1950, image: "/images/food_shrimp.jpg" },
      { id: "bb3", name: "Шашлычок из лосося", desc: "Шашлычок из лосося на углях", weight: "200 г", pricePerPerson: 1950, image: "/images/food_salmon.jpg" },
      { id: "bb4", name: "Свинина по-французски", desc: "Свинина по-французски с картофелем бейби или картофельным гратеном", weight: "250 г", pricePerPerson: 650, image: "/images/banket_table1.jpg" },
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
   SKELETON LOADER
   ═══════════════════════════════════════════════════════════════ */

function ImageSkeleton() {
  return (
    <div className="absolute inset-0 animate-pulse" style={{ background: "linear-gradient(110deg, #F5F3EE 30%, #FAFAF7 50%, #F5F3EE 70%)" }} />
  );
}

/* ═══════════════════════════════════════════════════════════════
   DISH CARD
   ═══════════════════════════════════════════════════════════════ */

function DishCard({
  dish,
  inCart,
  onAdd,
  onRemove,
  onUpdateQty,
  activeCategory,
  isMobile,
}: {
  dish: DishItem;
  inCart: number;
  onAdd: (dish: DishItem, categoryId: string) => void;
  onRemove: (dishId: string) => void;
  onUpdateQty: (dishId: string, delta: number) => void;
  activeCategory: string;
  isMobile: boolean;
}) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative overflow-hidden"
      style={{
        background: "#FFFFFF",
        borderRadius: "16px",
        boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
        border: inCart ? "2px solid #B8860B" : "2px solid transparent",
        transition: "box-shadow 0.35s ease, transform 0.35s ease",
      }}
      onMouseEnter={(e) => {
        if (!isMobile) {
          (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 40px rgba(0,0,0,0.10)";
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isMobile) {
          (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 16px rgba(0,0,0,0.04)";
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        }
      }}
    >
      {/* Horizontal on desktop, vertical on mobile */}
      <div className={`flex ${isMobile ? "flex-col" : "flex-col sm:flex-row"}`}>
        {/* Image */}
        <div className={`relative overflow-hidden shrink-0 ${isMobile ? "h-48" : "h-48 sm:h-auto sm:w-48 lg:w-56"}`}>
          {!imgLoaded && <ImageSkeleton />}
          <Image
            src={dish.image}
            alt={dish.name}
            fill
            className={`object-cover transition-transform duration-700 group-hover:scale-110 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
            sizes={isMobile ? "100vw" : "(max-width: 640px) 100vw, 224px"}
            onLoad={() => setImgLoaded(true)}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 60%)",
            }}
          />
          {/* Popular badge */}
          {dish.popular && (
            <div className="absolute top-3 left-3">
              <span
                className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                style={{ background: "#B8860B", color: "#fff" }}
              >
                <Star size={10} fill="#fff" />
                Хит
              </span>
            </div>
          )}
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
              className="absolute bottom-3 right-3 min-w-[28px] h-7 rounded-full flex items-center justify-center text-xs font-bold px-2"
              style={{ background: "#B8860B", color: "#fff" }}
            >
              ×{inCart}
            </motion.div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <h4
              className="font-semibold text-sm leading-tight mb-1.5"
              style={{
                fontFamily: "var(--font-serif)",
                color: "#1A1714",
                fontSize: "0.95rem",
              }}
            >
              {dish.name}
            </h4>
            <p
              className="text-xs leading-relaxed mb-3"
              style={{ color: "#7D5A0D", fontFamily: "var(--font-sans)" }}
            >
              {dish.desc}
            </p>
          </div>

          {/* Add / quantity controls */}
          <div>
            {inCart === 0 ? (
              <button
                onClick={() => onAdd(dish, activeCategory)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: "rgba(184,134,11,0.1)",
                  color: "#B8860B",
                  border: "1px solid rgba(184,134,11,0.25)",
                  minHeight: "44px",
                  fontFamily: "var(--font-sans)",
                }}
              >
                <Plus size={16} />
                Добавить
              </button>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onUpdateQty(dish.id, -1)}
                    className="min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center transition-colors"
                    style={{
                      border: "1px solid #E5BF65",
                      color: "#B8860B",
                      background: "transparent",
                    }}
                    aria-label="Уменьшить"
                  >
                    <Minus size={16} />
                  </button>
                  <span
                    className="w-8 text-center font-semibold text-base"
                    style={{ color: "#1A1714" }}
                  >
                    {inCart}
                  </span>
                  <button
                    onClick={() => onUpdateQty(dish.id, 1)}
                    className="min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center transition-colors"
                    style={{
                      background: "#B8860B",
                      color: "#fff",
                    }}
                    aria-label="Увеличить"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <button
                  onClick={() => onRemove(dish.id)}
                  className="min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center transition-colors hover:bg-red-50"
                  style={{ color: "#dc2626" }}
                  aria-label="Убрать из меню"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
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
  const [pdfGenerating, setPdfGenerating] = useState(false);
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

  /* ─── PDF generation with jspdf ─── */
  const generatePDF = useCallback(async () => {
    setPdfGenerating(true);
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      const contentWidth = pageWidth - margin * 2;
      let y = margin;

      // Helper: check page overflow
      const checkPage = (needed: number) => {
        if (y + needed > doc.internal.pageSize.getHeight() - 20) {
          doc.addPage();
          y = margin;
        }
      };

      // ─── Company Header ───
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(184, 134, 11); // #B8860B
      doc.text("INTERFOOD CATERING", pageWidth / 2, y, { align: "center" });
      y += 8;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(125, 90, 13); // #7D5A0D
      doc.text("Ваше персональное меню", pageWidth / 2, y, { align: "center" });
      y += 4;

      // Gold divider line
      doc.setDrawColor(184, 134, 11);
      doc.setLineWidth(0.8);
      doc.line(margin, y, pageWidth - margin, y);
      y += 10;

      // ─── Menu items by category ───
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

      Object.entries(groupedByCategory).forEach(([catName, items]) => {
        checkPage(20);

        // Category title
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(184, 134, 11);
        doc.text(catName, margin, y);
        y += 2;

        // Gold underline
        doc.setDrawColor(229, 191, 101); // #E5BF65
        doc.setLineWidth(0.4);
        doc.line(margin, y, margin + 50, y);
        y += 7;

        // Items
        items.forEach((item) => {
          checkPage(14);

          // Name + weight
          doc.setFont("helvetica", "bold");
          doc.setFontSize(10);
          doc.setTextColor(26, 23, 20); // #1A1714
          const nameText = item.dish.name;
          doc.text(nameText, margin, y);

          // Weight
          doc.setFont("helvetica", "normal");
          doc.setFontSize(9);
          doc.setTextColor(125, 90, 13);
          const nameWidth = doc.getTextWidth(nameText);
          doc.text(`  ${item.dish.weight}`, margin + nameWidth, y);

          // Quantity
          doc.setTextColor(154, 111, 10); // #9A6F0A
          doc.text(`x${item.quantity}`, margin + 2, y + 5);

          // Price (right-aligned)
          doc.setFont("helvetica", "bold");
          doc.setFontSize(10);
          doc.setTextColor(26, 23, 20);
          const priceText = formatPrice(item.dish.pricePerPerson * item.quantity) + "/чел";
          doc.text(priceText, pageWidth - margin, y, { align: "right" });

          // Dotted line
          doc.setDrawColor(229, 191, 101);
          doc.setLineDashPattern([0.5, 1.5], 0);
          doc.setLineWidth(0.2);
          doc.line(margin + 5, y + 2, pageWidth - margin - 5, y + 2);
          doc.setLineDashPattern([], 0);

          y += 12;
        });

        y += 4;
      });

      // ─── Totals ───
      checkPage(50);
      doc.setDrawColor(184, 134, 11);
      doc.setLineWidth(0.8);
      doc.line(margin, y, pageWidth - margin, y);
      y += 10;

      // Cost per person
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(125, 90, 13);
      doc.text("Стоимость на человека:", margin, y);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(26, 23, 20);
      doc.text(formatPrice(costPerPerson), pageWidth - margin, y, { align: "right" });
      y += 7;

      // Guests
      doc.setFont("helvetica", "normal");
      doc.setTextColor(125, 90, 13);
      doc.text("Количество гостей:", margin, y);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(26, 23, 20);
      doc.text(String(guests), pageWidth - margin, y, { align: "right" });
      y += 7;

      // Discount
      if (discountPercent > 0) {
        doc.setFont("helvetica", "normal");
        doc.setTextColor(46, 125, 50); // green
        doc.text(`Скидка ${discountPercent}%:`, margin, y);
        doc.setFont("helvetica", "bold");
        doc.text("-" + formatPrice(discountAmount), pageWidth - margin, y, { align: "right" });
        y += 7;
      }

      // Grand total line
      doc.setDrawColor(229, 191, 101);
      doc.setLineWidth(0.4);
      doc.line(margin, y, pageWidth - margin, y);
      y += 9;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(184, 134, 11);
      doc.text("Итого:", margin, y);
      doc.text(formatPrice(totalCost), pageWidth - margin, y, { align: "right" });
      y += 14;

      // ─── Footer / Contact ───
      checkPage(30);
      doc.setDrawColor(229, 191, 101);
      doc.setLineWidth(0.3);
      doc.line(margin, y, pageWidth - margin, y);
      y += 8;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(125, 90, 13);
      doc.text("Интерфуд Кейтеринг · Санкт-Петербург", pageWidth / 2, y, { align: "center" });
      y += 5;
      doc.text("+7 (812) 919-59-11 · interfood-catering@yandex.ru", pageWidth / 2, y, { align: "center" });
      y += 5;
      doc.text("interfood-catering.ru", pageWidth / 2, y, { align: "center" });
      y += 5;
      doc.setFontSize(7);
      doc.setTextColor(184, 176, 160); // #B8B0A0
      doc.text(
        `Цены указаны на ${new Date().toLocaleDateString("ru-RU")}. Окончательная стоимость рассчитывается после согласования меню с шеф-поваром.`,
        pageWidth / 2,
        y,
        { align: "center" }
      );

      // Save
      doc.save("interfood-menu.pdf");
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setPdfGenerating(false);
    }
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
        <p className="text-sm" style={{ color: "#7D5A0D", fontFamily: "var(--font-sans)" }}>
          {cart.length === 0
            ? "Добавьте блюда из каталога"
            : `${cart.length} ${cart.length === 1 ? "позиция" : cart.length < 5 ? "позиции" : "позиций"}`}
        </p>
      </div>

      {/* Cart items */}
      <div className="flex-1 overflow-y-auto px-4" style={{ maxHeight: isMobile ? "50vh" : "none" }}>
        <AnimatePresence mode="popLayout">
          {cart.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
                style={{ background: "rgba(184,134,11,0.08)" }}
              >
                <UtensilsCrossed size={32} style={{ color: "#D4A63E" }} />
              </div>
              <p
                className="text-base font-medium mb-1"
                style={{ color: "#1A1714", fontFamily: "var(--font-serif)" }}
              >
                Пусто
              </p>
              <p className="text-sm" style={{ color: "#7D5A0D", fontFamily: "var(--font-sans)" }}>
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
                      style={{ color: "#1A1714", fontFamily: "var(--font-sans)" }}
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
                      className="min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center transition-colors hover:bg-[#E5BF65]/20"
                      style={{ border: "1px solid #E5BF65" }}
                      aria-label="Уменьшить"
                    >
                      <Minus size={16} style={{ color: "#B8860B" }} />
                    </button>
                    <span
                      className="w-8 text-center text-sm font-semibold"
                      style={{ color: "#1A1714" }}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.dish.id, 1)}
                      className="min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center transition-colors"
                      style={{ background: "#B8860B", color: "#fff" }}
                      aria-label="Увеличить"
                    >
                      <Plus size={16} />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.dish.id)}
                      className="min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center transition-colors hover:bg-red-50"
                      aria-label="Удалить"
                    >
                      <Trash2 size={16} className="text-red-400" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Calculator & Totals — always show, even with empty cart */}
      <div className="p-4 pt-3" style={{ borderTop: "1px solid #E5BF65" }}>
        {cart.length > 0 && (
          <>
            {/* Guest input */}
            <div className="flex items-center gap-3 mb-3">
              <Users size={18} style={{ color: "#B8860B" }} />
              <label className="text-sm" style={{ color: "#7D5A0D", fontFamily: "var(--font-sans)" }}>
                Гости:
              </label>
              <Input
                type="number"
                min={1}
                max={5000}
                value={guests}
                onChange={(e) => setGuests(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 h-11 text-center text-sm"
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
                  style={{ color: "#B8860B", fontFamily: "var(--font-serif)" }}
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
          </>
        )}

        {/* PDF button — ALWAYS visible */}
        <Button
          onClick={generatePDF}
          disabled={pdfGenerating}
          className="w-full mt-3 h-12 text-sm font-semibold gap-2"
          style={{
            background: cart.length > 0 ? "#B8860B" : "rgba(184,134,11,0.15)",
            color: cart.length > 0 ? "#fff" : "#B8860B",
            borderRadius: "12px",
            fontFamily: "var(--font-sans)",
          }}
        >
          {pdfGenerating ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            />
          ) : (
            <Download size={16} />
          )}
          Скачать PDF меню
        </Button>
      </div>
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
      {/* ─── Header with PDF download button ─── */}
      <div
        className="sticky top-0 z-30"
        style={{ background: "#FAFAF7" }}
      >
        <div className="flex items-center gap-3 px-4 pt-3 pb-1">
          <h2
            className="text-lg font-semibold shrink-0"
            style={{ fontFamily: "var(--font-serif)", color: "#1A1714" }}
          >
            Составьте меню
          </h2>
          <div className="flex-1" />
          {/* Prominent PDF download button — ALWAYS visible */}
          <button
            onClick={generatePDF}
            disabled={pdfGenerating}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all shrink-0"
            style={{
              background: "#B8860B",
              color: "#fff",
              minHeight: "44px",
              fontFamily: "var(--font-sans)",
              boxShadow: "0 4px 12px rgba(184,134,11,0.25)",
            }}
            aria-label="Скачать PDF меню"
          >
            {pdfGenerating ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              <FileText size={16} />
            )}
            <span className="hidden sm:inline">Скачать PDF меню</span>
            <span className="sm:hidden">PDF</span>
          </button>
        </div>

        {/* ─── Category Tabs — Pill style ─── */}
        <div
          ref={categoryScrollRef}
          className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {MENU_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all shrink-0"
                style={{
                  background: isActive
                    ? "#B8860B"
                    : "rgba(184,134,11,0.06)",
                  color: isActive ? "#fff" : "#7D5A0D",
                  boxShadow: isActive
                    ? "0 4px 16px rgba(184,134,11,0.3)"
                    : "none",
                  minHeight: "44px",
                  fontFamily: "var(--font-sans)",
                  border: isActive ? "1.5px solid #B8860B" : "1.5px solid rgba(184,134,11,0.15)",
                }}
                whileTap={{ scale: 0.96 }}
                layout
              >
                <span>{getCategoryIcon(cat.id)}</span>
                <span>{cat.name}</span>
                <span className="text-xs opacity-60">{cat.priceRange}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Gold divider */}
        <div className="mx-4">
          <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #E5BF65, transparent)" }} />
        </div>
      </div>

      {/* ─── Main layout: dishes + cart ─── */}
      <div className="flex gap-6 px-4 pb-4 pt-2">
        {/* Dish grid */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4"
            >
              {MENU_CATEGORIES.find((c) => c.id === activeCategory)?.items.map(
                (dish, index) => (
                  <DishCard
                    key={dish.id}
                    dish={dish}
                    inCart={getCartQuantity(dish.id)}
                    onAdd={addToCart}
                    onRemove={removeFromCart}
                    onUpdateQty={updateQuantity}
                    activeCategory={activeCategory}
                    isMobile={isMobile}
                  />
                )
              )}

              {/* Gold divider after last item */}
              <div className="py-2">
                <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #E5BF65, transparent)" }} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ─── Desktop Cart Panel ─── */}
        {!isMobile && (
          <div className="w-80 shrink-0">
            <div
              className="sticky top-28 rounded-2xl overflow-hidden"
              style={{
                background: "#FFFFFF",
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                maxHeight: "calc(100vh - 8rem)",
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
          {/* Floating "My Menu" button — offset to not overlap WhatsApp button */}
          <AnimatePresence>
            {totalItems > 0 && !mobileMenuOpen && (
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="fixed left-4 right-4 z-40"
                style={{
                  bottom: "calc(5.5rem + env(safe-area-inset-bottom, 0px))",
                }}
              >
                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <button
                      className="w-full flex items-center justify-between px-5 py-4 rounded-2xl shadow-xl"
                      style={{
                        background: "#B8860B",
                        color: "#fff",
                        minHeight: "56px",
                        fontFamily: "var(--font-sans)",
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
                    style={{ height: "90vh" }}
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
        </>
      )}
    </div>
  );
}
