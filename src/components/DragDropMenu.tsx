"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   DragDropMenu — Interactive drag-and-drop menu for catering
   Drag food items into a "tray" area. Items snap with animation.
   Shows total estimated price.
   ═══════════════════════════════════════════════════════════════ */

interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  emoji: string;
  category: string;
}

interface SelectedItem extends FoodItem {
  uid: string; // unique id for each selection
}

const FOOD_ITEMS: FoodItem[] = [
  { id: "bruschetta", name: "Брускетта с лососем", description: "Хрустящий хлеб, копчёный лосось, сливочный сыр", price: 850, emoji: "🥖", category: "Закуски" },
  { id: "carpaccio", name: "Карпаччо из говядины", description: "Тонко нарезанная вырезка, пармезан, руккола", price: 1200, emoji: "🥩", category: "Закуски" },
  { id: "caesar", name: "Салат Цезарь", description: "Романо, курица, пармезан, соус Цезарь", price: 750, emoji: "🥗", category: "Салаты" },
  { id: "medallion", name: "Медальоны из телятины", description: "Нежная телятина, трюфельный соус, пюре", price: 2200, emoji: "🍖", category: "Горячее" },
  { id: "sea-bass", name: "Сибас на гриле", description: "Целый сибас, лимонное масло, овощи", price: 1800, emoji: "🐟", category: "Горячее" },
  { id: "risotto", name: "Ризотто с белыми грибами", description: "Арборио, белые грибы, пармезан", price: 1400, emoji: "🍚", category: "Горячее" },
  { id: "tiramisu", name: "Тирамису", description: "Маскарпоне, савоярди, эспрессо", price: 650, emoji: "🍰", category: "Десерты" },
  { id: "panna-cotta", name: "Панна-котта", description: "Ванильный крем, ягодный кулис", price: 550, emoji: "🍮", category: "Десерты" },
  { id: "wine", name: "Вино (бутылка)", description: "Белое или красное, выдержка 2 года", price: 3000, emoji: "🍷", category: "Напитки" },
  { id: "champagne", name: "Шампанское", description: "Игристое, 0.75л", price: 4500, emoji: "🥂", category: "Напитки" },
  { id: "canape", name: "Канапе ассорти", description: "10 видов мини-закусок на шпажках", price: 950, emoji: "🍢", category: "Фуршет" },
  { id: "fruit-tower", name: "Фруктовая башня", description: "Ананас, клубника, манго, виноград", price: 3500, emoji: "🍇", category: "Фуршет" },
];

const CATEGORIES = [...new Set(FOOD_ITEMS.map((f) => f.category))];

interface DragDropMenuProps {
  className?: string;
}

export default function DragDropMenu({ className = "" }: DragDropMenuProps) {
  const mountedRef = useRef(false);
  const trayRef = useRef<HTMLDivElement>(null);
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [draggedItem, setDraggedItem] = useState<FoodItem | null>(null);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isOverTray, setIsOverTray] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[0]);
  const [isMobile, setIsMobile] = useState(false);
  const [justAdded, setJustAdded] = useState<string | null>(null);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const update = () => {
      if (mountedRef.current) setIsMobile(mql.matches);
    };
    mql.addEventListener("change", update);
    update();
    return () => mql.removeEventListener("change", update);
  }, []);

  const filteredItems = FOOD_ITEMS.filter((f) => f.category === activeCategory);

  const totalPrice = selectedItems.reduce((sum, item) => sum + item.price, 0);

  const addItem = useCallback(
    (item: FoodItem) => {
      const uid = `${item.id}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      if (mountedRef.current) {
        setSelectedItems((prev) => [...prev, { ...item, uid }]);
        setJustAdded(uid);
        setTimeout(() => {
          if (mountedRef.current) setJustAdded(null);
        }, 600);
      }
    },
    []
  );

  const removeItem = useCallback((uid: string) => {
    if (mountedRef.current) {
      setSelectedItems((prev) => prev.filter((i) => i.uid !== uid));
    }
  }, []);

  /* ─── Drag handlers (pointer-based for maximum compatibility) ─── */
  const handlePointerDown = useCallback(
    (e: React.PointerEvent, item: FoodItem) => {
      e.preventDefault();
      setDraggedItem(item);
      setIsDragging(true);
      setDragPos({ x: e.clientX, y: e.clientY });

      const handleMove = (ev: PointerEvent) => {
        if (!mountedRef.current) return;
        setDragPos({ x: ev.clientX, y: ev.clientY });

        // Check if over tray
        if (trayRef.current) {
          const rect = trayRef.current.getBoundingClientRect();
          const over =
            ev.clientX >= rect.left &&
            ev.clientX <= rect.right &&
            ev.clientY >= rect.top &&
            ev.clientY <= rect.bottom;
          setIsOverTray(over);
        }
      };

      const handleUp = () => {
        if (!mountedRef.current) return;
        if (isOverTray && draggedItem) {
          addItem(draggedItem);
        }
        setDraggedItem(null);
        setIsDragging(false);
        setIsOverTray(false);
        document.removeEventListener("pointermove", handleMove);
        document.removeEventListener("pointerup", handleUp);
      };

      document.addEventListener("pointermove", handleMove);
      document.addEventListener("pointerup", handleUp);
    },
    [isOverTray, draggedItem, addItem]
  );

  /* ─── Click to add for mobile ─── */
  const handleItemClick = useCallback(
    (item: FoodItem) => {
      if (isMobile) {
        addItem(item);
      }
    },
    [isMobile, addItem]
  );

  return (
    <div
      className={className}
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        fontFamily: "var(--font-sans)",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)",
            color: "var(--color-dark)",
            fontWeight: 400,
            marginBottom: 8,
          }}
        >
          Составьте ваше меню
        </h2>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.95rem",
            color: "var(--color-brand-dark)",
          }}
        >
          {isMobile
            ? "Нажмите на блюдо, чтобы добавить в поднос"
            : "Перетащите блюда на поднос или нажмите, чтобы добавить"}
        </p>
      </div>

      {/* Two-column layout */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 24,
          alignItems: "flex-start",
        }}
      >
        {/* LEFT: Food items */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Category tabs */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              marginBottom: 16,
            }}
          >
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  padding: "0.45rem 1rem",
                  borderRadius: 999,
                  border:
                    activeCategory === cat
                      ? "1px solid var(--color-brand)"
                      : "1px solid var(--color-cream-darker, #e8dcc8)",
                  background:
                    activeCategory === cat
                      ? "var(--color-brand)"
                      : "var(--color-warm-white)",
                  color:
                    activeCategory === cat
                      ? "var(--color-warm-white)"
                      : "var(--color-dark)",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.82rem",
                  cursor: "pointer",
                }}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          {/* Food items grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: 12,
            }}
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onPointerDown={(e) => handlePointerDown(e, item)}
                  onClick={() => handleItemClick(item)}
                  whileHover={{ y: -3, boxShadow: "0 8px 30px rgba(184,149,90,0.15)" }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    padding: "0.85rem 1rem",
                    borderRadius: 14,
                    background: "var(--color-warm-white)",
                    border: "1px solid var(--color-cream-darker, #e8dcc8)",
                    cursor: isDragging ? "grabbing" : "grab",
                    userSelect: "none",
                    touchAction: "none",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <span style={{ fontSize: "1.6rem" }}>{item.emoji}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <h4
                          style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "0.95rem",
                            color: "var(--color-dark)",
                            fontWeight: 600,
                            margin: 0,
                          }}
                        >
                          {item.name}
                        </h4>
                        <span
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.85rem",
                            color: "var(--color-brand)",
                            fontWeight: 700,
                            whiteSpace: "nowrap",
                            marginLeft: 8,
                          }}
                        >
                          {item.price.toLocaleString("ru-RU")}₽
                        </span>
                      </div>
                      <p
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.75rem",
                          color: "var(--color-brand-dark, #6b5c3e)",
                          margin: "2px 0 0",
                          lineHeight: 1.4,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT: Tray / selected area */}
        <div
          style={{
            width: isMobile ? "100%" : 320,
            flexShrink: 0,
          }}
        >
          <div
            ref={trayRef}
            style={{
              borderRadius: 20,
              border: isOverTray
                ? "2px dashed var(--color-brand)"
                : "2px dashed var(--color-cream-darker, #e8dcc8)",
              background: isOverTray
                ? "rgba(184,149,90,0.08)"
                : "var(--color-cream)",
              padding: 20,
              minHeight: 280,
              transition: "border-color 0.2s, background 0.2s",
              position: "relative",
            }}
          >
            {/* Tray header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.15rem",
                  color: "var(--color-dark)",
                  fontWeight: 600,
                  margin: 0,
                }}
              >
                🍽️ Ваш поднос
              </h3>
              {selectedItems.length > 0 && (
                <motion.button
                  onClick={() => setSelectedItems([])}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: "0.3rem 0.7rem",
                    borderRadius: 8,
                    border: "1px solid var(--color-cream-darker, #e8dcc8)",
                    background: "var(--color-warm-white)",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.72rem",
                    color: "var(--color-brand-dark, #6b5c3e)",
                    cursor: "pointer",
                  }}
                >
                  Очистить
                </motion.button>
              )}
            </div>

            {/* Selected items list */}
            <div
              style={{
                maxHeight: 300,
                overflowY: "auto",
                paddingRight: 4,
              }}
            >
              <AnimatePresence>
                {selectedItems.length === 0 ? (
                  <motion.p
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.85rem",
                      color: "var(--color-brand-dark, #6b5c3e)",
                      textAlign: "center",
                      padding: "2rem 0",
                      opacity: 0.6,
                    }}
                  >
                    {isMobile
                      ? "Нажмите на блюдо, чтобы добавить"
                      : "Перетащите сюда блюда"}
                  </motion.p>
                ) : (
                  selectedItems.map((item) => (
                    <motion.div
                      key={item.uid}
                      initial={{ opacity: 0, scale: 0.7, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.7, x: 40 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "0.55rem 0.65rem",
                        marginBottom: 8,
                        borderRadius: 10,
                        background:
                          justAdded === item.uid
                            ? "rgba(184,149,90,0.15)"
                            : "var(--color-warm-white)",
                        border: "1px solid var(--color-cream-darker, #e8dcc8)",
                      }}
                    >
                      <span style={{ fontSize: "1.1rem" }}>{item.emoji}</span>
                      <div
                        style={{
                          flex: 1,
                          minWidth: 0,
                          overflow: "hidden",
                        }}
                      >
                        <p
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.78rem",
                            color: "var(--color-dark)",
                            fontWeight: 600,
                            margin: 0,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.name}
                        </p>
                      </div>
                      <span
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.78rem",
                          color: "var(--color-brand)",
                          fontWeight: 700,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.price.toLocaleString("ru-RU")}₽
                      </span>
                      <motion.button
                        onClick={() => removeItem(item.uid)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "var(--color-brand-dark, #6b5c3e)",
                          fontSize: "0.9rem",
                          padding: 0,
                          lineHeight: 1,
                          opacity: 0.5,
                        }}
                      >
                        ✕
                      </motion.button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Total price */}
            <AnimatePresence>
              {selectedItems.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  style={{
                    marginTop: 16,
                    paddingTop: 16,
                    borderTop: "1px solid var(--color-cream-darker, #e8dcc8)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.85rem",
                        color: "var(--color-brand-dark, #6b5c3e)",
                      }}
                    >
                      Блюд: {selectedItems.length}
                    </span>
                    <div>
                      <span
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.78rem",
                          color: "var(--color-brand-dark, #6b5c3e)",
                          marginRight: 8,
                        }}
                      >
                        Итого:
                      </span>
                      <motion.span
                        key={totalPrice}
                        initial={{ scale: 1.2, color: "var(--color-brand)" }}
                        animate={{ scale: 1, color: "var(--color-dark)" }}
                        transition={{ duration: 0.3 }}
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "1.25rem",
                          fontWeight: 700,
                        }}
                      >
                        {totalPrice.toLocaleString("ru-RU")}₽
                      </motion.span>
                    </div>
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.72rem",
                      color: "var(--color-brand-dark, #6b5c3e)",
                      marginTop: 6,
                      opacity: 0.7,
                    }}
                  >
                    * Цена за 1 персону. Итого рассчитано для 1 гостя.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Floating drag ghost */}
      <AnimatePresence>
        {isDragging && draggedItem && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0.8 }}
            animate={{ scale: 1.05, opacity: 0.95 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "fixed",
              left: dragPos.x - 60,
              top: dragPos.y - 30,
              zIndex: 9999,
              pointerEvents: "none",
              padding: "0.5rem 1rem",
              borderRadius: 12,
              background: "var(--color-brand)",
              color: "var(--color-warm-white)",
              fontFamily: "var(--font-sans)",
              fontSize: "0.82rem",
              fontWeight: 600,
              boxShadow: "0 8px 30px rgba(184,149,90,0.3)",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span>{draggedItem.emoji}</span>
            {draggedItem.name}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
