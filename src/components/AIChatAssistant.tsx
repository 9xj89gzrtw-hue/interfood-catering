"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

/* ═══════════════════════════════════════════════════════════════
   AI Catering Assistant — Smart chat widget
   Helps visitors get instant quotes, find menu items, and
   answers common questions about catering services.
   
   On mobile: button is higher up to avoid conflicting with
   StickyBottomCTA, WhatsApp, and BackToTop.
   ═══════════════════════════════════════════════════════════════ */

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  quickReplies?: string[];
}

const QUICK_START = [
  "Рассчитать стоимость",
  "Меню на свадьбу",
  "Фуршет на 50 человек",
  "Кофе-брейк цена",
];

/* Pre-built AI responses for common queries */
const AI_RESPONSES: { keywords: string[]; reply: string; quickReplies?: string[] }[] = [
  {
    keywords: ["рассчит", "стоимость", "цена", "сколько", "калькулятор", "цен"],
    reply: "Рассчитаю примерную стоимость! Укажите формат мероприятия:\n\n• Фуршет — от 2 450 ₽/чел\n• Банкет — от 4 470 ₽/чел\n• Кофе-брейк — от 950 ₽/чел\n• Свадьба — от 5 900 ₽/чел\n• Корпоратив — от 3 200 ₽/чел\n\nДля точного расчёта перейдите в наш калькулятор или оставьте заявку!",
    quickReplies: ["Калькулятор", "Оставить заявку", "Фуршет на 50 человек"],
  },
  {
    keywords: ["свадьб", "свадебн", "жених", "невест", "торт"],
    reply: "Свадебный кейтеринг — наша специализация! 🥂\n\nМы организуем:\n• Праздничный банкет от 5 900 ₽/чел\n• Фуршетную линию от 2 800 ₽/чел\n• Выездную церемонию\n• Свадебный торт\n• Бар и коктейли\n\nСредний чек свадьбы на 80 гостей — от 472 000 ₽. Хотите подробности?",
    quickReplies: ["Меню на свадьбу", "Площадки для свадьбы", "Оставить заявку"],
  },
  {
    keywords: ["фуршет", "канапе", "закуски"],
    reply: "Фуршет — идеальный формат для приёмов и презентаций! 🍢\n\nНаш фуршет включает:\n• 10–15 видов канапе и тарталеток\n• Мини-бургеры и брускетты\n• Фруктовые и сырные тарелки\n• Напитки и десерты\n\nЦена: от 2 450 ₽/чел (минимум 30 гостей).\nНа 50 гостей — примерно 122 500 ₽.",
    quickReplies: ["Меню фуршета", "Рассчитать стоимость", "Оставить заявку"],
  },
  {
    keywords: ["кофе", "кофе-брейк", "перерыв", "выпечк"],
    reply: "Кофе-брейк — отличный выбор для конференций и деловых встреч! ☕\n\nВ стандартный набор входят:\n• Кофе, чай, соки\n• Круассаны и выпечка\n• Сэндвичи и снеки\n• Фрукты\n\nЦена: от 950 ₽/чел. На 30 человек — от 28 500 ₽.",
    quickReplies: ["Меню кофе-брейка", "Корпоративный кейтеринг", "Оставить заявку"],
  },
  {
    keywords: ["корпоратив", "команд", "коллектив", "новый год", "нг"],
    reply: "Корпоративный кейтеринг — наш конёк! 🏢\n\nФорматы для компаний:\n• Фуршет — от 3 200 ₽/чел\n• Банкет — от 4 470 ₽/чел\n• Кофе-брейк — от 950 ₽/чел\n• Новогодний корпоратив — от 5 200 ₽/чел\n\nОбслуживаем от 30 до 1000+ гостей. Работаем с топ-компаниями СПб.",
    quickReplies: ["Рассчитать стоимость", "Наши клиенты", "Оставить заявку"],
  },
  {
    keywords: ["меню", "блюд", "кухн", "еда", "готов"],
    reply: "Наше меню включает более 200 авторских блюд шеф-повара! 🍽\n\nКатегории:\n• Фуршетные закуски — от 250 ₽/позиция\n• Банкетные блюда — от 420 ₽/позиция\n• Кофе-брейк — от 950 ₽/чел\n• Барная карта — от 1 200 ₽/чел\n• Десерты — от 350 ₽/порция\n\nЕсть веганские, безглютеновые и халяльные опции!",
    quickReplies: ["Веганское меню", "Рассчитать стоимость", "Смотреть меню"],
  },
  {
    keywords: ["веган", "вегетар", "без глютен", "халяль", "аллерг", "диет"],
    reply: "Мы заботимся о всех гостях! 🌱\n\nСпециальные меню:\n• Веганское — 15+ блюд, от 280 ₽/позиция\n• Вегетарианское — 25+ блюд\n• Безглютеновое — отдельная линейка\n• Халяльное — сертифицированные блюда\n\nПри оформлении заказа укажите dietary требования — подберём меню!",
    quickReplies: ["Рассчитать стоимость", "Оставить заявку"],
  },
  {
    keywords: ["площадк", "место", "зал", "ресторан", "локация"],
    reply: "У нас 20+ партнёрских площадок в СПб и ЛО! 🏛\n\nТипы площадок:\n• Рестораны и усадьбы\n• Лофты и галереи\n• Загородные комплексы\n• Открытые площадки\n• Яхты и теплоходы\n\nПоможем подобрать площадку бесплатно!",
    quickReplies: ["Смотреть площадки", "Оставить заявку"],
  },
  {
    keywords: ["бронир", "заказ", "заявк", "остав", "позвон", "связаться", "контакт"],
    reply: "Свяжитесь с нами удобным способом! 📞\n\n• Телефон: +7 (812) 919-59-11\n• WhatsApp: кнопка внизу слева\n• Email: info@interfood-catering.ru\n• Заявка на сайте — ответ за 30 минут\n\nРаботаем пн–вс, 9:00–22:00",
    quickReplies: ["Позвонить", "Оставить заявку"],
  },
  {
    keywords: ["банкет", "ужин", "подач"],
    reply: "Банкет — королевский формат! 👑\n\nВключает:\n• 4–6 курсов с индивидуальной подачей\n• Винное сопровождение и сомелье\n• Декор стола и цветочные композиции\n• Профессиональные официанты (1 на 6 гостей)\n\nЦена: от 4 470 ₽/чел. На 60 гостей — от 268 200 ₽.",
    quickReplies: ["Меню банкета", "Рассчитать стоимость", "Оставить заявку"],
  },
];

function getAIResponse(input: string): { text: string; quickReplies?: string[] } {
  const lower = input.toLowerCase().trim();

  for (const entry of AI_RESPONSES) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return { text: entry.reply, quickReplies: entry.quickReplies };
    }
  }

  if (/^(привет|здравств|добр|хай|хелло|hello|hi)/i.test(lower)) {
    return {
      text: "Здравствуйте! 👋 Я — виртуальный ассистент Интерфуд Кейтеринг. Помогу с расчётом стоимости, подбором меню и отвечу на вопросы. Что вас интересует?",
      quickReplies: QUICK_START,
    };
  }

  return {
    text: "Спасибо за вопрос! Для точного ответа свяжитесь с нашими менеджерами:\n\n📞 +7 (812) 919-59-11\n💬 WhatsApp (кнопка слева)\n📧 info@interfood-catering.ru\n\nИли оставьте заявку — перезвоним за 30 минут!",
    quickReplies: ["Рассчитать стоимость", "Меню на свадьбу", "Оставить заявку"],
  };
}

export default function AIChatAssistant() {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Hide on mobile — StickyBottomCTA + WhatsApp already provide contact methods
  // On mobile, the chat adds too much visual clutter at the bottom
  if (isMobile) return null;

  return (
    <>
      {/* Chat Toggle Button — Desktop only, positioned higher than BackToTop */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Закрыть чат" : "Открыть чат-ассистент"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: "fixed",
          bottom: "calc(5rem + env(safe-area-inset-bottom))",
          right: "2rem",
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: "linear-gradient(135deg, var(--color-brand) 0%, var(--color-brand-dark) 100%)",
          border: "none",
          cursor: "pointer",
          zIndex: 850,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(184,149,90,0.4)",
          color: "#fff",
          transition: "box-shadow 0.3s",
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            >
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{
              position: "fixed",
              bottom: "calc(8.5rem + env(safe-area-inset-bottom))",
              right: "1rem",
              width: "min(380px, calc(100vw - 2rem))",
              height: "min(520px, 60vh)",
              zIndex: 849,
              background: "#fff",
              borderRadius: 20,
              boxShadow: "0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(184,149,90,0.1)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div style={{
              background: "linear-gradient(135deg, var(--color-brand) 0%, var(--color-brand-dark) 100%)",
              padding: "1rem 1.25rem",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.1rem",
              }}>
                🍽
              </div>
              <div>
                <div style={{ fontSize: "0.9rem", fontWeight: 600, letterSpacing: "0.02em" }}>
                  Ассистент Интерфуд
                </div>
                <div style={{ fontSize: "0.7rem", opacity: 0.8, display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
                  Онлайн
                </div>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                background: "var(--color-cream)",
              }}
            >
              {messages.length === 0 && (
                <div style={{ textAlign: "center", padding: "1rem 0" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>👋</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", marginBottom: "1rem", lineHeight: 1.5 }}>
                    Привет! Я помогу подобрать<br />кейтеринг для вашего мероприятия
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center" }}>
                    {QUICK_START.map((q) => (
                      <button
                        key={q}
                        onClick={() => handleQuickReply(q)}
                        style={{
                          padding: "0.5rem 1rem",
                          borderRadius: 100,
                          border: "1px solid var(--color-brand)",
                          background: "transparent",
                          color: "var(--color-brand-dark)",
                          fontSize: "0.75rem",
                          fontWeight: 500,
                          cursor: "pointer",
                          transition: "all 0.2s",
                          minHeight: 36,
                        }}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    display: "flex",
                    justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "85%",
                      padding: "0.75rem 1rem",
                      borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                      background: msg.role === "user" ? "var(--color-brand)" : "#fff",
                      color: msg.role === "user" ? "#fff" : "var(--color-dark)",
                      fontSize: "0.85rem",
                      lineHeight: 1.6,
                      whiteSpace: "pre-line",
                      boxShadow: msg.role === "user" ? "none" : "0 2px 8px rgba(0,0,0,0.06)",
                    }}
                  >
                    {msg.text}
                    {msg.quickReplies && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.75rem" }}>
                        {msg.quickReplies.map((qr) => (
                          <button
                            key={qr}
                            onClick={() => handleQuickReply(qr)}
                            style={{
                              padding: "0.35rem 0.75rem",
                              borderRadius: 100,
                              border: `1px solid ${msg.role === "user" ? "rgba(255,255,255,0.4)" : "var(--color-brand)"}`,
                              background: "transparent",
                              color: msg.role === "user" ? "#fff" : "var(--color-brand-dark)",
                              fontSize: "0.7rem",
                              fontWeight: 500,
                              cursor: "pointer",
                              transition: "all 0.2s",
                              minHeight: 32,
                            }}
                          >
                            {qr}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <div style={{
                    padding: "0.75rem 1rem",
                    borderRadius: "16px 16px 16px 4px",
                    background: "#fff",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                    display: "flex",
                    gap: 4,
                  }}>
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        style={{
                          width: 6, height: 6, borderRadius: "50%",
                          background: "var(--color-brand)",
                          display: "inline-block",
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
              style={{
                display: "flex",
                gap: "0.5rem",
                padding: "0.75rem 1rem",
                borderTop: "1px solid var(--color-cream-darker)",
                background: "#fff",
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Спросите о кейтеринге..."
                style={{
                  flex: 1,
                  padding: "0.65rem 1rem",
                  border: "1.5px solid var(--color-cream-darker)",
                  borderRadius: 100,
                  fontSize: "0.85rem",
                  outline: "none",
                  fontFamily: "var(--font-sans)",
                  transition: "border-color 0.2s",
                  minWidth: 0,
                }}
                onFocus={(e) => { e.target.style.borderColor = "var(--color-brand)"; }}
                onBlur={(e) => { e.target.style.borderColor = "var(--color-cream-darker)"; }}
              />
              <button
                type="submit"
                disabled={!input.trim()}
                style={{
                  width: 40, height: 40,
                  borderRadius: "50%",
                  border: "none",
                  background: input.trim() ? "var(--color-brand)" : "var(--color-cream-darker)",
                  color: input.trim() ? "#fff" : "var(--color-text-muted)",
                  cursor: input.trim() ? "pointer" : "default",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s",
                  flexShrink: 0,
                }}
                aria-label="Отправить"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  function handleSend(text: string) {
    if (!text.trim()) return;
    const msg: Message = { id: Date.now().toString() + Math.random(), role: "user", text: text.trim() };
    setMessages((prev) => [...prev, msg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getAIResponse(text);
      setIsTyping(false);
      const replyMsg: Message = { id: Date.now().toString() + Math.random(), role: "assistant", text: response.text, quickReplies: response.quickReplies };
      setMessages((prev) => [...prev, replyMsg]);
    }, 800 + Math.random() * 600);
  }

  function handleQuickReply(reply: string) {
    const navMap: Record<string, string> = {
      "Калькулятор": "/calculator",
      "Оставить заявку": "/contacts",
      "Смотреть меню": "/menu",
      "Меню на свадьбу": "/menu",
      "Меню фуршета": "/menu",
      "Меню кофе-брейка": "/menu",
      "Меню банкета": "/menu",
      "Смотреть площадки": "/venues",
      "Площадки для свадьбы": "/venues",
      "Наши клиенты": "/reviews",
      "Позвонить": "tel:+78129195911",
      "Веганское меню": "/menu",
    };

    if (navMap[reply]) {
      const url = navMap[reply];
      if (url.startsWith("tel:")) {
        window.open(url, "_self");
      } else {
        handleSend(reply);
      }
    } else {
      handleSend(reply);
    }
  }
}
