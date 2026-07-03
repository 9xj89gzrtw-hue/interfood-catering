"use client";

/* ═══════════════════════════════════════════════════════════════════════════
   MenuBuilder v80 — Interfood Catering
   ───────────────────────────────────────────────────────────────────────────
   A premium, 2026-era menu builder with:
   • Always-visible sticky header with PDF download, guest count, cart summary
   • 3D tilt dish cards with animated gold border & gradient accents
   • Animated floating cart with spring physics & drawer
   • Full PDF generation via jspdf
   • Mobile-first responsive design
   • Staggered cross-fade category transitions
   ═══════════════════════════════════════════════════════════════════════════ */

import { useState, useCallback, useRef, useMemo, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import {
  Plus,
  Minus,
  Trash2,
  ShoppingCart,
  Download,
  Users,
  Sparkles,
  Gift,
  Check,
  FileText,
  X,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

/* ═══════════════════════════════════════════════════════════════════════════
   DESIGN TOKENS
   ═══════════════════════════════════════════════════════════════════════════ */

const COLORS = {
  bg: "#FAFAF7",
  card: "#FFFFFF",
  textPrimary: "#1A1714",
  textSecondary: "#5C564D",
  gold: "#B8860B",
  goldLight: "#D4A63E",
  goldLighter: "#E5BF65",
  goldFaint: "rgba(184,134,11,0.08)",
  goldBorder: "rgba(184,134,11,0.15)",
  goldShadow: "rgba(184,134,11,0.25)",
};

/* ═══════════════════════════════════════════════════════════════════════════
   DATA — Real Interfood Catering prices
   ═══════════════════════════════════════════════════════════════════════════ */

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
    priceRange: "2 450 – 5 350 ₽/чел",
    items: [
      {
        id: "f1",
        name: "Канапе с салями и маскарпоне",
        desc: "Ломтик итальянского салями с кремом маскарпоне на пшеничном крутоне",
        weight: "35г",
        pricePerPerson: 2450,
        image: "/images/furshet_canape.jpg",
        popular: true,
      },
      {
        id: "f2",
        name: "Тарталетка с крабом и авокадо",
        desc: "Хрустящая тарталетка с мясом краба, авокадо и соусом айоли",
        weight: "40г",
        pricePerPerson: 2750,
        image: "/images/food_shrimp.jpg",
        popular: true,
      },
      {
        id: "f3",
        name: "Брускетта с томатами и моцареллой",
        desc: "Брускетта с томатами черри, моцареллой и свежим базиликом",
        weight: "45г",
        pricePerPerson: 2450,
        image: "/images/furshet_food.jpg",
      },
      {
        id: "f4",
        name: "Мини-бургер с вагю",
        desc: "Мини-бургер с мраморной говядиной вагю, карамелизированным луком",
        weight: "50г",
        pricePerPerson: 3200,
        image: "/images/banket_food1.jpg",
      },
      {
        id: "f5",
        name: "Шпажка с креветкой гриль",
        desc: "Креветка гриль на шпажке с лимонным соусом и зеленью",
        weight: "35г",
        pricePerPerson: 3500,
        image: "/images/food_salmon.jpg",
      },
    ],
  },
  {
    id: "banquet",
    name: "Банкет",
    priceRange: "4 470 – 6 970 ₽/чел",
    items: [
      {
        id: "b1",
        name: "Салат с тигровой креветкой",
        desc: "Салат с тигровой креветкой, романо, манго и соусом чили-лайм",
        weight: "150г",
        pricePerPerson: 4470,
        image: "/images/food_shrimp.jpg",
        popular: true,
      },
      {
        id: "b2",
        name: "Стейк рибай с овощами гриль",
        desc: "Стейк рибай medium rare с сезонными овощами гриль и соусом чимичурри",
        weight: "250г",
        pricePerPerson: 5970,
        image: "/images/banket_meat.jpg",
        popular: true,
      },
      {
        id: "b3",
        name: "Филе сибаса с соусом бер блан",
        desc: "Филе сибаса на пару с нежным соусом бер блан и спаржей",
        weight: "200г",
        pricePerPerson: 5470,
        image: "/images/food_salmon.jpg",
      },
      {
        id: "b4",
        name: "Десерт тирамису",
        desc: "Классический тирамису с маскарпоне, эспрессо и какао",
        weight: "120г",
        pricePerPerson: 4470,
        image: "/images/coffee.jpg",
      },
      {
        id: "b5",
        name: "Сырная тарелка",
        desc: "Ассорти из 5 видов сыра с мёдом, виноградом и грецким орехом",
        weight: "200г",
        pricePerPerson: 4970,
        image: "/images/furshet_canape.jpg",
      },
    ],
  },
  {
    id: "coffee",
    name: "Кофе-брейк",
    priceRange: "950 – 2 450 ₽/чел",
    items: [
      {
        id: "c1",
        name: "Кофе капучино",
        desc: "Свежесваренный капучино с плотной молочной пенкой",
        weight: "200мл",
        pricePerPerson: 950,
        image: "/images/coffee.jpg",
      },
      {
        id: "c2",
        name: "Круассан с миндалём",
        desc: "Хрустящий круассан с миндальным кремом и фруктами",
        weight: "80г",
        pricePerPerson: 950,
        image: "/images/furshet_food.jpg",
        popular: true,
      },
      {
        id: "c3",
        name: "Маффин шоколадный",
        desc: "Шоколадный маффин с тёмным шоколадом и какао",
        weight: "90г",
        pricePerPerson: 1200,
        image: "/images/banket_food1.jpg",
      },
      {
        id: "c4",
        name: "Фруктовая тарелка",
        desc: "Ассорти из свежих сезонных фруктов и ягод",
        weight: "200г",
        pricePerPerson: 1500,
        image: "/images/food_general.jpg",
      },
      {
        id: "c5",
        name: "Сок свежевыжатый",
        desc: "Свежевыжатый сок на выбор: апельсин, яблоко, грейпфрут",
        weight: "200мл",
        pricePerPerson: 1350,
        image: "/images/furshet_canape.jpg",
      },
    ],
  },
  {
    id: "bbq",
    name: "BBQ Гриль",
    priceRange: "3 200 – 5 800 ₽/чел",
    items: [
      {
        id: "bb1",
        name: "Стейк рибай на гриле",
        desc: "Рибай на углях с розмарином и чесночным маслом",
        weight: "300г",
        pricePerPerson: 4800,
        image: "/images/banket_meat.jpg",
        popular: true,
      },
      {
        id: "bb2",
        name: "Шашлык из баранины",
        desc: "Шашлык из баранины с зирой, кинзой и маринованным луком",
        weight: "250г",
        pricePerPerson: 4200,
        image: "/images/food_shrimp.jpg",
      },
      {
        id: "bb3",
        name: "Овощи гриль ассорти",
        desc: "Ассорти овощей гриль с оливковым маслом и тимьяном",
        weight: "200г",
        pricePerPerson: 3200,
        image: "/images/furshet_food.jpg",
      },
      {
        id: "bb4",
        name: "Соус барбекю домашний",
        desc: "Домашний соус барбекю с копчёной паприкой и мёдом",
        weight: "50г",
        pricePerPerson: 3200,
        image: "/images/banket_food1.jpg",
      },
      {
        id: "bb5",
        name: "Картофель запечённый с розмарином",
        desc: "Картофель бейби запечённый с розмарином и чесноком",
        weight: "150г",
        pricePerPerson: 3500,
        image: "/images/food_general.jpg",
      },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   CART TYPE
   ═══════════════════════════════════════════════════════════════════════════ */

interface CartItem {
  dish: DishItem;
  quantity: number;
  categoryId: string;
}

/* ═══════════════════════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════════════════════ */

/** Format number as Russian price: "2 450 ₽" */
function formatPrice(price: number): string {
  return price.toLocaleString("ru-RU") + " ₽";
}

/** Category emoji icon */
function getCategoryIcon(id: string) {
  switch (id) {
    case "furshet":
      return "🥂";
    case "banquet":
      return "🍽";
    case "coffee":
      return "☕";
    case "bbq":
      return "🔥";
    default:
      return "🍴";
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   ANIMATED COUNTER — Counts up/down to a target value
   ═══════════════════════════════════════════════════════════════════════════ */

function AnimatedCounter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const spring = useSpring(0, { stiffness: 120, damping: 25 });
  const display = useTransform(spring, (v) => {
    const rounded = Math.round(v);
    return prefix + rounded.toLocaleString("ru-RU") + suffix;
  });

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span>{display}</motion.span>;
}

/* ═══════════════════════════════════════════════════════════════════════════
   IMAGE SKELETON — Shimmer loading placeholder
   ═══════════════════════════════════════════════════════════════════════════ */

function ImageSkeleton() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: "linear-gradient(110deg, #F0EDE6 30%, #FAFAF7 50%, #F0EDE6 70%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.8s ease-in-out infinite",
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   3D TILT DISH CARD — Premium hover effect with perspective transform
   ═══════════════════════════════════════════════════════════════════════════ */

function DishCard({
  dish,
  inCart,
  onAdd,
  onRemove,
  onUpdateQty,
  activeCategory,
  isMobile,
  index,
}: {
  dish: DishItem;
  inCart: number;
  onAdd: (dish: DishItem, categoryId: string) => void;
  onRemove: (dishId: string) => void;
  onUpdateQty: (dishId: string, delta: number) => void;
  activeCategory: string;
  isMobile: boolean;
  index: number;
}) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // 3D tilt motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6]);

  /** Handle mouse move for 3D tilt effect */
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isMobile) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      x.set(px);
      y.set(py);
    },
    [isMobile, x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }, [x, y]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group relative"
      style={{
        perspective: "800px",
      }}
    >
      <motion.div
        style={{
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden"
        /* ─── Card shell ─── */
      >
        {/* Animated gold gradient border on hover */}
        <motion.div
          animate={{
            opacity: isHovered || inCart > 0 ? 1 : 0,
          }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 rounded-2xl"
          style={{
            padding: "2px",
            background: isHovered
              ? "linear-gradient(135deg, #B8860B, #D4A63E, #E5BF65, #D4A63E, #B8860B)"
              : inCart > 0
                ? "#B8860B"
                : "transparent",
            backgroundSize: isHovered ? "300% 300%" : "100% 100%",
            animation: isHovered ? "goldBorderShift 3s ease infinite" : "none",
          }}
        >
          <div
            className="w-full h-full rounded-2xl"
            style={{ background: COLORS.card }}
          />
        </motion.div>

        {/* Inner card content */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: COLORS.card,
            boxShadow: isHovered
              ? "0 20px 60px rgba(0,0,0,0.12), 0 8px 24px rgba(184,134,11,0.08)"
              : "0 2px 12px rgba(0,0,0,0.04)",
            transition: "box-shadow 0.4s ease",
          }}
        >
          <div
            className={`flex ${isMobile ? "flex-col" : "flex-col sm:flex-row"}`}
          >
            {/* ─── Image section ─── */}
            <div
              className={`relative overflow-hidden shrink-0 ${
                isMobile ? "h-52" : "h-52 sm:h-auto sm:w-48 lg:w-56"
              }`}
              style={{ transformStyle: "preserve-3d" }}
            >
              {!imgLoaded && <ImageSkeleton />}
              <Image
                src={dish.image}
                alt={dish.name}
                fill
                className={`object-cover transition-transform duration-700 group-hover:scale-110 ${
                  imgLoaded ? "opacity-100" : "opacity-0"
                }`}
                sizes={isMobile ? "100vw" : "(max-width: 640px) 100vw, 224px"}
                onLoad={() => setImgLoaded(true)}
              />

              {/* Bottom gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 55%)",
                }}
              />

              {/* Popular badge — gold with subtle pulse */}
              {dish.popular && (
                <div className="absolute top-3 left-3">
                  <motion.span
                    className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full"
                    style={{
                      background: COLORS.gold,
                      color: "#fff",
                      boxShadow: "0 4px 16px rgba(184,134,11,0.4)",
                    }}
                    animate={{
                      boxShadow: [
                        "0 4px 16px rgba(184,134,11,0.4)",
                        "0 4px 24px rgba(184,134,11,0.6)",
                        "0 4px 16px rgba(184,134,11,0.4)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Sparkles size={10} />
                    Популярное
                  </motion.span>
                </div>
              )}

              {/* Weight badge */}
              <div className="absolute bottom-3 left-3">
                <span
                  className="text-xs px-2.5 py-1 rounded-lg font-medium"
                  style={{
                    background: "rgba(0,0,0,0.5)",
                    color: "#fff",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {dish.weight}
                </span>
              </div>

              {/* In-cart indicator with spring animation */}
              {inCart > 0 && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="absolute bottom-3 right-3 min-w-[32px] h-8 rounded-full flex items-center justify-center text-xs font-bold px-2.5"
                  style={{
                    background: COLORS.gold,
                    color: "#fff",
                    boxShadow: "0 2px 12px rgba(184,134,11,0.5)",
                  }}
                >
                  ×{inCart}
                </motion.div>
              )}
            </div>

            {/* ─── Content section ─── */}
            <div className="flex-1 p-5 flex flex-col justify-between min-h-[130px]">
              <div>
                {/* Dish name */}
                <h4
                  className="font-semibold leading-tight mb-1.5"
                  style={{
                    fontFamily: "var(--font-serif)",
                    color: COLORS.textPrimary,
                    fontSize: "1rem",
                  }}
                >
                  {dish.name}
                </h4>
                {/* Description */}
                <p
                  className="text-xs leading-relaxed mb-3"
                  style={{
                    color: COLORS.textSecondary,
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {dish.desc}
                </p>
              </div>

              {/* Price + Add/Remove controls */}
              <div className="flex items-center justify-between gap-3">
                {/* Price */}
                <div>
                  <span
                    className="text-lg font-bold"
                    style={{
                      color: COLORS.gold,
                      fontFamily: "var(--font-serif)",
                    }}
                  >
                    {formatPrice(dish.pricePerPerson)}
                  </span>
                  <span
                    className="text-xs ml-1"
                    style={{ color: COLORS.textSecondary }}
                  >
                    /чел
                  </span>
                </div>

                {/* Add/Remove button */}
                {inCart === 0 ? (
                  <motion.button
                    onClick={() => onAdd(dish, activeCategory)}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
                    style={{
                      background: COLORS.goldFaint,
                      color: COLORS.gold,
                      border: `1.5px solid ${COLORS.goldBorder}`,
                      minHeight: "44px",
                      fontFamily: "var(--font-sans)",
                    }}
                    whileHover={{
                      background: COLORS.gold,
                      color: "#fff",
                      scale: 1.04,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus size={16} />
                    Добавить
                  </motion.button>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <motion.button
                      onClick={() => onUpdateQty(dish.id, -1)}
                      className="min-w-[40px] min-h-[40px] rounded-xl flex items-center justify-center transition-colors"
                      style={{
                        border: `1.5px solid ${COLORS.goldLighter}`,
                        color: COLORS.gold,
                        background: "transparent",
                      }}
                      whileHover={{ background: COLORS.goldFaint }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Уменьшить"
                    >
                      <Minus size={14} />
                    </motion.button>

                    {/* Quantity with spring count animation */}
                    <motion.span
                      key={inCart}
                      initial={{ scale: 1.5, color: COLORS.gold }}
                      animate={{ scale: 1, color: COLORS.textPrimary }}
                      transition={{ type: "spring", stiffness: 400, damping: 12 }}
                      className="w-8 text-center text-sm font-bold"
                    >
                      {inCart}
                    </motion.span>

                    <motion.button
                      onClick={() => onUpdateQty(dish.id, 1)}
                      className="min-w-[40px] min-h-[40px] rounded-xl flex items-center justify-center transition-colors"
                      style={{
                        background: COLORS.gold,
                        color: "#fff",
                      }}
                      whileHover={{ background: COLORS.goldLight }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Увеличить"
                    >
                      <Plus size={14} />
                    </motion.button>

                    {/* Remove button */}
                    <motion.button
                      onClick={() => onRemove(dish.id)}
                      className="min-w-[40px] min-h-[40px] rounded-xl flex items-center justify-center transition-colors ml-1"
                      style={{ color: "#dc2626" }}
                      whileHover={{ background: "rgba(220,38,38,0.06)" }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Убрать из меню"
                    >
                      <Trash2 size={14} />
                    </motion.button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* CSS for the gold border animation — injected per card */}
      <style jsx>{`
        @keyframes goldBorderShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN MENU BUILDER COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */

export default function MenuBuilder() {
  const isMobile = useIsMobile();
  const [activeCategory, setActiveCategory] = useState("furshet");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [guests, setGuests] = useState(50);
  const [cartOpen, setCartOpen] = useState(false);
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
    (dishId: string) => cart.find((item) => item.dish.id === dishId)?.quantity || 0,
    [cart]
  );

  /* ─── Derived values ─── */
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

  /* ─── PDF generation using jspdf ─── */
  const generatePDF = useCallback(async () => {
    if (cart.length === 0) return;
    setPdfGenerating(true);
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      let y = margin;

      /** Check if we need a new page */
      const checkPage = (needed: number) => {
        if (y + needed > pageHeight - 25) {
          doc.addPage();
          y = margin;
        }
      };

      // ─── Header: Company name ───
      doc.setFont("helvetica", "bold");
      doc.setFontSize(24);
      doc.setTextColor(184, 134, 11);
      doc.text("INTERFOOD CATERING", pageWidth / 2, y, { align: "center" });
      y += 8;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(92, 86, 77); // #5C564D
      doc.text("Ваше персональное меню", pageWidth / 2, y, { align: "center" });
      y += 5;

      // Gold divider
      doc.setDrawColor(184, 134, 11);
      doc.setLineWidth(0.8);
      doc.line(margin, y, pageWidth - margin, y);
      y += 10;

      // ─── Timestamp ───
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(160, 155, 145);
      doc.text(
        `Дата формирования: ${new Date().toLocaleDateString("ru-RU")} ${new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}`,
        margin,
        y
      );
      y += 8;

      // ─── Group cart items by category ───
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
        checkPage(25);

        // Category title
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(184, 134, 11);
        doc.text(catName, margin, y);
        y += 2;

        // Gold underline
        doc.setDrawColor(229, 191, 101);
        doc.setLineWidth(0.4);
        doc.line(margin, y, margin + 50, y);
        y += 7;

        items.forEach((item) => {
          checkPage(16);

          // Dish name
          doc.setFont("helvetica", "bold");
          doc.setFontSize(10);
          doc.setTextColor(26, 23, 20);
          doc.text(item.dish.name, margin, y);

          // Weight after name
          doc.setFont("helvetica", "normal");
          doc.setFontSize(9);
          doc.setTextColor(92, 86, 77);
          const nameWidth = doc.getTextWidth(item.dish.name);
          doc.text(`  ${item.dish.weight}`, margin + nameWidth, y);
          y += 5;

          // Description (truncated if too long)
          doc.setFontSize(8);
          doc.setTextColor(140, 135, 125);
          const descLines = doc.splitTextToSize(item.dish.desc, pageWidth - margin * 2 - 30);
          doc.text(descLines.slice(0, 2), margin + 3, y);
          y += descLines.length > 1 ? 8 : 5;

          // Quantity
          doc.setTextColor(154, 111, 10);
          doc.setFontSize(9);
          doc.text(`×${item.quantity}`, margin + 3, y);

          // Price right-aligned
          doc.setFont("helvetica", "bold");
          doc.setFontSize(10);
          doc.setTextColor(26, 23, 20);
          const priceText = formatPrice(item.dish.pricePerPerson * item.quantity) + "/чел";
          doc.text(priceText, pageWidth - margin, y, { align: "right" });

          // Dotted separator
          doc.setDrawColor(229, 191, 101);
          doc.setLineDashPattern([0.5, 1.5], 0);
          doc.setLineWidth(0.15);
          doc.line(margin + 5, y + 2.5, pageWidth - margin - 5, y + 2.5);
          doc.setLineDashPattern([], 0);

          y += 10;
        });

        y += 4;
      });

      // ─── Totals section ───
      checkPage(55);
      doc.setDrawColor(184, 134, 11);
      doc.setLineWidth(0.8);
      doc.line(margin, y, pageWidth - margin, y);
      y += 10;

      // Cost per person
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(92, 86, 77);
      doc.text("Стоимость на человека:", margin, y);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(26, 23, 20);
      doc.text(formatPrice(costPerPerson), pageWidth - margin, y, { align: "right" });
      y += 7;

      // Guest count
      doc.setFont("helvetica", "normal");
      doc.setTextColor(92, 86, 77);
      doc.text("Количество гостей:", margin, y);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(26, 23, 20);
      doc.text(String(guests), pageWidth - margin, y, { align: "right" });
      y += 7;

      // Discount
      if (discountPercent > 0) {
        doc.setFont("helvetica", "normal");
        doc.setTextColor(46, 125, 50);
        doc.text(`Скидка ${discountPercent}%:`, margin, y);
        doc.setFont("helvetica", "bold");
        doc.text("-" + formatPrice(discountAmount), pageWidth - margin, y, { align: "right" });
        y += 7;
      }

      // Grand total
      doc.setDrawColor(229, 191, 101);
      doc.setLineWidth(0.4);
      doc.line(margin, y, pageWidth - margin, y);
      y += 9;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(184, 134, 11);
      doc.text("Итого:", margin, y);
      doc.text(formatPrice(totalCost), pageWidth - margin, y, { align: "right" });
      y += 14;

      // ─── Footer ───
      checkPage(30);
      doc.setDrawColor(229, 191, 101);
      doc.setLineWidth(0.3);
      doc.line(margin, y, pageWidth - margin, y);
      y += 8;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(92, 86, 77);
      doc.text("Интерфуд Кейтеринг · Санкт-Петербург", pageWidth / 2, y, { align: "center" });
      y += 5;
      doc.text("+7 (812) 919-59-11 · interfood-catering@yandex.ru", pageWidth / 2, y, { align: "center" });
      y += 5;
      doc.text("interfood-catering.ru", pageWidth / 2, y, { align: "center" });
      y += 5;
      doc.setFontSize(7);
      doc.setTextColor(184, 176, 160);
      doc.text(
        `Цены указаны на ${new Date().toLocaleDateString("ru-RU")}. Окончательная стоимость рассчитывается после согласования меню с шеф-поваром.`,
        pageWidth / 2,
        y,
        { align: "center" }
      );

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
      {/* Cart header */}
      <div className="p-5 pb-3">
        <h3
          className="text-xl font-semibold"
          style={{ fontFamily: "var(--font-serif)", color: COLORS.textPrimary }}
        >
          Ваше меню
        </h3>
        <p
          className="text-sm mt-1"
          style={{ color: COLORS.textSecondary, fontFamily: "var(--font-sans)" }}
        >
          {cart.length === 0
            ? "Добавьте блюда из каталога"
            : `${cart.length} ${cart.length === 1 ? "позиция" : cart.length < 5 ? "позиции" : "позиций"}`}
        </p>
      </div>

      {/* Cart items list */}
      <div
        className="flex-1 overflow-y-auto px-5"
        style={{ maxHeight: isMobile ? "45vh" : "calc(100vh - 20rem)" }}
      >
        <AnimatePresence mode="popLayout">
          {cart.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-14 text-center"
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
                style={{ background: COLORS.goldFaint }}
              >
                <Sparkles size={32} style={{ color: COLORS.goldLight }} />
              </div>
              <p
                className="text-base font-medium mb-1"
                style={{ color: COLORS.textPrimary, fontFamily: "var(--font-serif)" }}
              >
                Меню пока пусто
              </p>
              <p
                className="text-sm"
                style={{ color: COLORS.textSecondary, fontFamily: "var(--font-sans)" }}
              >
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
                  initial={{ opacity: 0, x: 30, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -30, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="flex items-start gap-3 rounded-xl p-3"
                  style={{ background: COLORS.bg }}
                >
                  {/* Mini image */}
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={item.dish.image}
                      alt={item.dish.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-medium leading-tight truncate"
                      style={{ color: COLORS.textPrimary, fontFamily: "var(--font-sans)" }}
                    >
                      {item.dish.name}
                    </p>
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: COLORS.textSecondary }}
                    >
                      {item.dish.weight} · {formatPrice(item.dish.pricePerPerson)}/чел
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => updateQuantity(item.dish.id, -1)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                      style={{ border: `1px solid ${COLORS.goldLighter}`, color: COLORS.gold }}
                      aria-label="Уменьшить"
                    >
                      <Minus size={12} />
                    </button>
                    <span
                      className="w-7 text-center text-sm font-bold"
                      style={{ color: COLORS.textPrimary }}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.dish.id, 1)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: COLORS.gold, color: "#fff" }}
                      aria-label="Увеличить"
                    >
                      <Plus size={12} />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.dish.id)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors ml-0.5"
                      style={{ color: "#dc2626" }}
                      aria-label="Удалить"
                    >
                      <X size={12} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Calculator & totals */}
      <div className="p-5 pt-3" style={{ borderTop: `1px solid ${COLORS.goldLighter}` }}>
        {cart.length > 0 && (
          <>
            {/* Guest input */}
            <div className="flex items-center gap-3 mb-3">
              <Users size={18} style={{ color: COLORS.gold }} />
              <label
                className="text-sm"
                style={{ color: COLORS.textSecondary, fontFamily: "var(--font-sans)" }}
              >
                Гости:
              </label>
              <Input
                type="number"
                min={10}
                max={1000}
                value={guests}
                onChange={(e) =>
                  setGuests(Math.min(1000, Math.max(10, parseInt(e.target.value) || 10)))
                }
                className="w-20 h-11 text-center text-sm"
                style={{ borderColor: COLORS.goldLighter }}
              />
              <span className="text-xs" style={{ color: COLORS.textSecondary }}>
                чел.
              </span>
            </div>

            {/* Cost breakdown */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span style={{ color: COLORS.textSecondary }}>На человека:</span>
                <span className="font-medium" style={{ color: COLORS.textPrimary }}>
                  <AnimatedCounter value={costPerPerson} suffix=" ₽" />
                </span>
              </div>

              {discountPercent > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -5, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  className="flex justify-between"
                >
                  <span className="flex items-center gap-1 text-green-700">
                    <Gift size={14} />
                    Скидка {discountPercent}%:
                  </span>
                  <span className="font-medium text-green-700">
                    −<AnimatedCounter value={discountAmount} suffix=" ₽" />
                  </span>
                </motion.div>
              )}

              <div
                className="flex justify-between pt-2"
                style={{ borderTop: `1px solid ${COLORS.goldLighter}` }}
              >
                <span className="font-semibold" style={{ color: COLORS.textPrimary }}>
                  Итого:
                </span>
                <span
                  className="font-bold text-lg"
                  style={{ color: COLORS.gold, fontFamily: "var(--font-serif)" }}
                >
                  <AnimatedCounter value={totalCost} suffix=" ₽" />
                </span>
              </div>
            </div>

            {/* Discount hint */}
            {discountPercent === 0 && (
              <p
                className="text-xs mt-2 flex items-center gap-1"
                style={{ color: "#B8B0A0" }}
              >
                <Gift size={12} />
                {guests < 100
                  ? `Ещё ${100 - guests} гостей до скидки 10%`
                  : guests < 200
                    ? `Ещё ${200 - guests} гостей до скидки 15%`
                    : ""}
              </p>
            )}
          </>
        )}

        {/* PDF download button — always visible in cart */}
        <Button
          onClick={generatePDF}
          disabled={pdfGenerating || cart.length === 0}
          className="w-full mt-4 h-12 text-sm font-semibold gap-2"
          style={{
            background: cart.length > 0 ? COLORS.gold : COLORS.goldFaint,
            color: cart.length > 0 ? "#fff" : COLORS.gold,
            borderRadius: "12px",
            fontFamily: "var(--font-sans)",
            boxShadow: cart.length > 0 ? "0 4px 16px rgba(184,134,11,0.3)" : "none",
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

  /* ═══════════════════════════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════════════════════════ */

  return (
    <section
      className="w-full"
      style={{
        background: `linear-gradient(180deg, rgba(184,134,11,0.04) 0%, ${COLORS.bg} 30%)`,
        color: COLORS.textPrimary,
      }}
    >
      {/* ─── SECTION TITLE ─── */}
      <div className="text-center px-4 pt-16 pb-6 relative">
        {/* Gold decorative border at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "80%",
            maxWidth: 600,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${COLORS.gold}, transparent)`,
          }}
        />

        {/* Label above title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            fontSize: "0.65rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: COLORS.gold,
            fontWeight: 600,
            fontFamily: "var(--font-sans)",
            marginBottom: "0.75rem",
          }}
        >
          Интерактивный конструктор
        </motion.div>

        {/* Gold ornamental line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            width: 60,
            height: 2,
            background: COLORS.gold,
            margin: "0 auto 1.25rem",
            transformOrigin: "center",
          }}
        />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold"
          style={{ fontFamily: "var(--font-serif)", color: COLORS.textPrimary }}
        >
          Составьте ваше меню
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-base sm:text-lg mt-3 max-w-xl mx-auto"
          style={{ color: COLORS.textSecondary, fontFamily: "var(--font-sans)" }}
        >
          Выберите формат и блюда, укажите количество гостей — получите расчёт и PDF-меню
        </motion.p>

        {/* Animated "try it" hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "1.25rem",
            gap: 4,
          }}
        >
          <span
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: COLORS.goldLight,
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
            }}
          >
            Попробуйте
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={18} style={{ color: COLORS.gold }} />
          </motion.div>
        </motion.div>
      </div>

      {/* ─── STICKY HEADER: Category pills + PDF + Cart summary ─── */}
      <div
        className="sticky top-16 z-40"
        style={{ background: COLORS.bg }}
      >
        {/* Top row: Guest count + PDF button + Cart summary */}
        <div className="flex items-center gap-3 px-4 py-2">
          {/* Guest count */}
          <div className="flex items-center gap-2 shrink-0">
            <Users size={16} style={{ color: COLORS.gold }} />
            <Input
              type="number"
              min={10}
              max={1000}
              value={guests}
              onChange={(e) =>
                setGuests(Math.min(1000, Math.max(10, parseInt(e.target.value) || 10)))
              }
              className="w-16 h-9 text-center text-sm rounded-lg"
              style={{
                borderColor: COLORS.goldLighter,
                fontFamily: "var(--font-sans)",
              }}
            />
            <span className="text-xs shrink-0" style={{ color: COLORS.textSecondary }}>
              гостей
            </span>
          </div>

          <div className="flex-1" />

          {/* Cart summary — always visible */}
          <motion.button
            onClick={() => setCartOpen(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all"
            style={{
              background: totalItems > 0 ? COLORS.goldFaint : "transparent",
              border: `1.5px solid ${totalItems > 0 ? COLORS.goldLighter : "transparent"}`,
              minHeight: "40px",
              fontFamily: "var(--font-sans)",
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <ShoppingCart size={16} style={{ color: COLORS.gold }} />
            {totalItems > 0 && (
              <motion.span
                key={totalItems}
                initial={{ scale: 1.4 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 12 }}
                className="text-sm font-bold"
                style={{ color: COLORS.gold }}
              >
                {totalItems}
              </motion.span>
            )}
            {totalItems > 0 && (
              <span className="hidden sm:inline text-sm font-medium" style={{ color: COLORS.textPrimary }}>
                {formatPrice(costPerPerson)}/чел
              </span>
            )}
          </motion.button>

          {/* ★ ALWAYS VISIBLE PDF DOWNLOAD BUTTON ★ */}
          <motion.button
            onClick={generatePDF}
            disabled={pdfGenerating || cart.length === 0}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shrink-0"
            style={{
              background: cart.length > 0 ? COLORS.gold : "rgba(184,134,11,0.12)",
              color: cart.length > 0 ? "#fff" : COLORS.gold,
              minHeight: "44px",
              fontFamily: "var(--font-sans)",
              boxShadow:
                cart.length > 0
                  ? "0 4px 16px rgba(184,134,11,0.35)"
                  : "none",
            }}
            whileHover={
              cart.length > 0
                ? { scale: 1.04, boxShadow: "0 6px 24px rgba(184,134,11,0.5)" }
                : {}
            }
            whileTap={cart.length > 0 ? { scale: 0.96 } : {}}
            aria-label="Скачать PDF меню"
          >
            {pdfGenerating ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
              />
            ) : (
              <FileText size={16} />
            )}
            <span className="hidden sm:inline">Скачать PDF</span>
            <span className="sm:hidden">PDF</span>
          </motion.button>
        </div>

        {/* ─── Category pills — horizontal scroll ─── */}
        <div
          ref={categoryScrollRef}
          className="flex gap-2 overflow-x-auto px-4 pb-3"
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
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all shrink-0"
                style={{
                  background: isActive ? COLORS.gold : COLORS.goldFaint,
                  color: isActive ? "#fff" : COLORS.textSecondary,
                  boxShadow: isActive
                    ? "0 4px 20px rgba(184,134,11,0.3)"
                    : "none",
                  minHeight: "44px",
                  fontFamily: "var(--font-sans)",
                  border: isActive
                    ? `1.5px solid ${COLORS.gold}`
                    : `1.5px solid ${COLORS.goldBorder}`,
                }}
                whileTap={{ scale: 0.95 }}
                layout
              >
                <span className="text-base">{getCategoryIcon(cat.id)}</span>
                <span>{cat.name}</span>
                <span
                  className="text-xs"
                  style={{ opacity: isActive ? 0.7 : 0.5 }}
                >
                  {cat.priceRange}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Gold divider line */}
        <div className="mx-4">
          <div
            style={{
              height: "1px",
              background: "linear-gradient(90deg, transparent, #E5BF65, transparent)",
            }}
          />
        </div>
      </div>

      {/* ─── MAIN LAYOUT: Dish grid + Desktop cart ─── */}
      <div className="flex gap-6 px-4 pb-4 pt-4">
        {/* Dish grid */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
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
                    index={index}
                  />
                )
              )}

              {/* Decorative end divider */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="py-6"
              >
                <div
                  style={{
                    height: "1px",
                    background:
                      "linear-gradient(90deg, transparent, #E5BF65, transparent)",
                  }}
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ─── Desktop Cart Panel ─── */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-80 shrink-0"
          >
            <div
              className="sticky top-28 rounded-2xl overflow-hidden"
              style={{
                background: COLORS.card,
                boxShadow: "0 4px 32px rgba(0,0,0,0.06)",
                maxHeight: "calc(100vh - 8rem)",
                overflowY: "auto",
              }}
            >
              {cartPanelContent}
            </div>
          </motion.div>
        )}
      </div>

      {/* ─── MOBILE: Floating cart button + Bottom sheet ─── */}
      {isMobile && (
        <>
          {/* Floating cart button */}
          <AnimatePresence>
            {totalItems > 0 && !cartOpen && (
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
                className="fixed left-4 right-4 z-40"
                style={{
                  bottom: "calc(5.5rem + env(safe-area-inset-bottom, 0px))",
                }}
              >
                <Sheet open={cartOpen} onOpenChange={setCartOpen}>
                  <SheetTrigger asChild>
                    <button
                      className="w-full flex items-center justify-between px-5 py-4 rounded-2xl shadow-xl"
                      style={{
                        background: COLORS.gold,
                        color: "#fff",
                        minHeight: "56px",
                        fontFamily: "var(--font-sans)",
                        boxShadow: "0 8px 32px rgba(184,134,11,0.4)",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <ShoppingCart size={22} />
                          <motion.span
                            key={totalItems}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 12,
                            }}
                            className="absolute -top-2 -right-2.5 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center"
                            style={{ background: "#fff", color: COLORS.gold }}
                          >
                            {totalItems}
                          </motion.span>
                        </div>
                        <span className="font-semibold text-sm">Моё меню</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm">
                          {formatPrice(costPerPerson)}/чел
                        </span>
                        <ChevronUp size={18} />
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

          {/* Cart open via header button — separate Sheet for non-trigger access */}
          <Sheet open={cartOpen && totalItems === 0} onOpenChange={setCartOpen}>
            <SheetContent
              side="bottom"
              className="rounded-t-2xl"
              style={{ height: "70vh" }}
            >
              <SheetHeader className="sr-only">
                <SheetTitle>Ваше меню</SheetTitle>
                <SheetDescription>Управление выбранными блюдами</SheetDescription>
              </SheetHeader>
              {cartPanelContent}
            </SheetContent>
          </Sheet>
        </>
      )}

      {/* Global CSS for shimmer and gold border animation */}
      <style jsx global>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes goldBorderShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        /* Hide scrollbar on category pills */
        .flex.overflow-x-auto::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
