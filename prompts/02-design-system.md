# Суб-промпт 2: Дизайн-система и анимации
## Nilov Catering — Часть 2 из 6

### КОНТЕКСТ
Ты создаёшь кейтеринговый сайт. Этот суб-промпт описывает визуальную систему: цвета, типографику, spacing и ВСЕ анимационные компоненты с полными кодами. Другие суб-промпты: 01-архитектура, 03-данные, 04-домашняя, 05-внутренние, 06-SEO/patterns.

---

## ДИЗАЙН-ФИЛОСОФИЯ (research-backed: Awwwards Food & Drink 2024-2026, Noma, Eleven Madison Park)

- **Cinematic reveal**: контент появляется через staggered animation (Framer Motion useInView), не fade-in — Awwwards SOTD стандарт 2025
- **Warm minimalism**: умеренный whitespace, тёплые тона, дружелюбная атмосфера. Крупные фотографии, один фокусный элемент на секцию
- **Trust everywhere**: social proof распределены по всему сайту — conversion lift 42% (Trustpilot 2025)
- **Thumb-zone mobile**: все primary actions в нижней трети экрана, bottom nav для мобильных (2025 mobile UX research)
- **Micro-interactions**: каждый hover, click, scroll trigger имеет meaningful feedback — не декоративный, а информативный (Framer Motion 2025 patterns)

## ЦВЕТА (в формате rgb() для opacity-модификаторов bg-background/80)

В `app/globals.css`:
```css
@import "tailwindcss";

@theme {
  --color-background: rgb(250 250 248);
  --color-foreground: rgb(26 26 26);
  --color-card: rgb(255 255 255);
  --color-card-foreground: rgb(26 26 26);
  --color-primary: rgb(44 44 44);
  --color-primary-foreground: rgb(250 250 248);
  --color-accent: rgb(200 169 126);
  --color-accent-foreground: rgb(26 26 26);
  --color-muted: rgb(240 237 232);
  --color-muted-foreground: rgb(107 107 107);
  --color-border: rgb(232 228 222);
  --color-destructive: rgb(220 38 38);
  --color-ring: rgb(200 169 126);
  --color-input: rgb(232 228 222);
  --color-popover: rgb(255 255 255);
  --color-popover-foreground: rgb(26 26 26);
  --color-secondary: rgb(240 237 232);
  --color-secondary-foreground: rgb(26 26 26);
  --radius: 0.5rem;
  --font-heading: 'Cormorant_Garamond', Georgia, serif;
  --font-body: 'Inter', system-ui, sans-serif;
}

/* Custom scrollbar — Awwwards standard */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: var(--color-muted); }
::-webkit-scrollbar-thumb { background: var(--color-accent); border-radius: 4px; }

/* Selection — brand accent */
::selection { background: var(--color-accent); color: var(--color-background); }

/* Smooth scroll globally */
html { scroll-behavior: smooth; }

body {
  font-family: var(--font-body);
  color: var(--color-foreground);
  background: var(--color-background);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

Все кастомные классы типа `bg-background`, `text-foreground`, `text-muted-foreground`, `font-heading`, `font-body`, `text-accent` работают **только** через этот `@theme` mapping. Не создавай `tailwind.config.ts` — в Tailwind CSS 4 он не нужен.

## ТИПОГРАФИЯ (2025 catering standard — крупный масштаб, щедрый line-height)

- H1: `text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight leading-[0.95]`
- H2: `text-3xl sm:text-4xl md:text-5xl font-heading font-semibold leading-tight`
- H3: `text-2xl md:text-3xl font-heading font-semibold`
- Body: `text-base md:text-lg font-body leading-relaxed`
- Small: `text-sm font-body text-muted-foreground`
- Caption: `text-xs font-body uppercase tracking-[0.2em]` (letter-spacing шире стандартного — Awwwards trend 2025)
- Accent text: `text-accent font-heading italic` (для выделения фраз в тексте — editorial стиль Noma/EMP)

## SPACING (комфортный — medium catering feel)
- Section padding: `py-16 md:py-24 lg:py-32`
- Container: `max-w-7xl mx-auto px-5 sm:px-6 lg:px-8`
- Grid gap: `gap-6 md:gap-8 lg:gap-10`
- Card padding: `p-5 md:p-6 lg:p-8`
- Max content width для текста: `max-w-3xl` (читаемость 60-75 символов на строку)

## АНИМАЦИИ (Framer Motion) — ПОЛНЫЕ КОДЫ ВСЕХ КОМПОНЕНТОВ

Все анимации основаны на паттернах Awwwards Food & Drink SOTD 2024-2026. Каждый компонент имеет `useInView` с `once: true` и `margin: "-100px"` (триггер раньше чем центр экрана — пользователь видит начало анимации). **Все компоненты ниже — полный рабочий код, НЕ описания.**

### AnimatedSection (используется на КАЖДОЙ странице — базовый reveal)
```tsx
"use client";
import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

const directionOffsets = {
  up: { y: 60, x: 0 }, down: { y: -60, x: 0 },
  left: { x: 60, y: 0 }, right: { x: -60, y: 0 },
  fade: { y: 0, x: 0 },
};

type Direction = keyof typeof directionOffsets;

export default function AnimatedSection({
  children, delay = 0, direction = "up", className, stagger = false,
}: {
  children: ReactNode; delay?: number; direction?: Direction; className?: string; stagger?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const offset = directionOffsets[direction];

  const containerVariants = stagger ? {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: delay } },
  } : undefined;

  const childVariants = {
    hidden: { opacity: 0, ...offset, filter: "blur(8px)" },
    visible: {
      opacity: 1, x: 0, y: 0, filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
    },
  };

  if (stagger) {
    return (
      <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} className={className}>
        {Array.isArray(children) ? children.map((child, i) => (
          <motion.div key={i} variants={childVariants}>{child}</motion.div>
        )) : <motion.div variants={childVariants}>{children}</motion.div>}
      </motion.div>
    );
  }

  return (
    <motion.div ref={ref} initial={{ opacity: 0, ...offset, filter: "blur(8px)" }}
      animate={isInView ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}
```

### ParallaxImage (для hero background — глубокий parallax с scale на scroll)
```tsx
"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function ParallaxImage({ src, alt, className, speed = 0.3 }: { src: string; alt: string; className?: string; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${-speed * 100}%`]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.05, 1]);

  return (
    <div ref={ref} className={className} style={{ overflow: "hidden" }}>
      <motion.div style={{ y, scale }} className="absolute inset-0 bg-cover bg-center will-change-transform" />
    </div>
  );
}
```

### CountUpNumber (для счётчиков — с easing и suffix анимацией)
```tsx
"use client";
import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function CountUpNumber({ target, suffix = "", label, prefix = "" }: { target: number; suffix?: string; label: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, target, {
      duration: 2.5, ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setCount(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, target]);

  return (
    <div className="text-center">
      <span ref={ref} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tabular-nums">
        {prefix}{count.toLocaleString()}{suffix}
      </span>
      <p className="mt-3 text-sm uppercase tracking-[0.2em] opacity-70">{label}</p>
    </div>
  );
}
```

### MarqueeText (бесконечный бегущий текст — Awwwards 2025 trend, trust-марки)
```tsx
"use client";
import { motion } from "framer-motion";

export default function MarqueeText({ children, speed = 30, reverse = false, className }: {
  children: React.ReactNode; speed?: number; reverse?: boolean; className?: string;
}) {
  const direction = reverse ? "reverse" : "normal";
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className ?? ""}`}>
      <motion.div
        className="inline-flex gap-12"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ x: { repeat: Infinity, duration: speed, ease: "linear", direction } }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
```

### RevealText (пословное появление текста — editorial style, для hero и секций)
```tsx
"use client";
import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

export default function RevealText({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const words = typeof children === "string" ? children.split(" ") : [];

  if (words.length === 0) return <div className={className}>{children}</div>;

  return (
    <motion.span ref={ref} className={className} aria-label={typeof children === "string" ? children : undefined}>
      {words.map((word, i) => (
        <motion.span key={i} className="inline-block mr-[0.25em]"
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.5, delay: delay + i * 0.04, ease: [0.22, 1, 0.36, 1] }}>
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
```

## МИКРО-АНИМАЦИИ (Awwwards 2025 standard — информативные, не декоративные)
- **Card hover**: `whileHover={{ y: -8, scale: 1.02 }}` + `transition={{ duration: 0.4, ease: "easeOut" }}` + shadow elevation (md → xl) — карточка «приподнимается», показывая интерактивность
- **Button hover**: `whileHover={{ scale: 1.05 }}` + `whileTap={{ scale: 0.97 }}` + background color shift — tactile feedback
- **Image reveal**: `initial={{ clipPath: "inset(0 100% 0 0)" }}` → `animate={{ clipPath: "inset(0 0% 0 0)" }}` — wipe-reveal слева направо, duration 1.2s (Awwwards 2026 hero layout trend)
- **Service card icon**: `whileHover={{ rotate: 5, scale: 1.1 }}` — subtle rotation показывает что иконка кликабельна
- **Pricing card popular**: subtle `box-shadow: 0 0 0 2px var(--color-accent)` + `scale: 1.03` — frame-highlight эффект
- **Scroll progress indicator**: тонкая полоса `h-1 bg-accent` фиксированная сверху, width привязан к scrollYProgress (0% → 100%)

**ЗАПРЕЩЕНО**: AnimatePresence для page transitions — в App Router это не работает. Используй AnimatedSection. AnimatePresence допускается ТОЛЬКО для условного показа (ScrollToTop, CookieBanner).

## ScrollProgress
```tsx
"use client";
import { useScroll, useTransform, motion } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return <motion.div className="h-0.5 fixed top-0 z-50 bg-accent origin-left" style={{ scaleX, willChange: "transform" }} />;
}
```

## ScrollToTop
```tsx
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-24 right-6 z-40 bg-accent text-background p-3 rounded-full shadow-lg md:bottom-8"
          aria-label="Наверх"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
```

## CookieBanner — GDPR/152-ФЗ compliant (NO dark patterns)
```tsx
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const [settings, setSettings] = useState(false);
  const [prefs, setPrefs] = useState({ necessary: true, analytics: false, marketing: false });

  useEffect(() => {
    if (!localStorage.getItem("cookie-consent")) {
      const timer = setTimeout(() => setShow(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const save = (p: typeof prefs) => {
    localStorage.setItem("cookie-consent", JSON.stringify(p));
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 z-50 bg-card border-t p-4 md:p-6 w-full"
        >
          <div className="max-w-7xl mx-auto">
            {!settings ? (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">Мы используем файлы cookie для улучшения вашего опыта. Подробнее в нашей <a href="/privacy" className="underline">политике конфиденциальности</a>.</p>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => save(prefs)} className="h-10 px-4 bg-primary text-primary-foreground rounded-md text-sm font-medium">Принять все</button>
                  <button onClick={() => save({ necessary: true, analytics: false, marketing: false })} className="h-10 px-4 border rounded-md text-sm font-medium">Только необходимые</button>
                  <button onClick={() => setSettings(true)} className="h-10 px-4 border rounded-md text-sm font-medium">Настроить</button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked disabled /> Необходимые (всегда включены)</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={prefs.analytics} onChange={(e) => setPrefs({...prefs, analytics: e.target.checked})} /> Аналитика</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={prefs.marketing} onChange={(e) => setPrefs({...prefs, marketing: e.target.checked})} /> Маркетинг</label>
                <button onClick={() => save(prefs)} className="h-10 px-4 bg-primary text-primary-foreground rounded-md text-sm font-medium">Сохранить</button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

## Breadcrumbs
```tsx
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface Crumb { label: string; href?: string; }

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center gap-2 text-sm text-muted-foreground">
        <li><Link href="/" className="flex items-center gap-1 hover:text-foreground"><Home className="w-4 h-4" /></Link></li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            <ChevronRight className="w-3 h-3" />
            {item.href ? <Link href={item.href} className="hover:text-foreground">{item.label}</Link> : <span className="text-foreground">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
```

## ЧЕК-ЛИСТ ДИЗАЙН-СИСТЕМЫ

- [ ] Все 18 color tokens определены в @theme
- [ ] Custom scrollbar (accent color, 8px width)
- [ ] ::selection использует accent
- [ ] smooth scroll глобально
- [ ] body: antialiased + font-body + foreground + background
- [ ] Все 7 анимационных компонентов (AnimatedSection, ParallaxImage, CountUpNumber, MarqueeText, RevealText, ScrollProgress, ScrollToTop) имеют "use client"
- [ ] useInView margin: "-100px" (AnimatedSection, CountUpNumber) и "-50px" (RevealText)
- [ ] Единый easing: [0.22, 1, 0.36, 1] на всех анимациях
- [ ] filter: "blur(8px)" в initial state (не только opacity)
- [ ] tabular-nums на CountUpNumber для стабильной ширины цифр
- [ ] will-change-transform на ParallaxImage и ScrollProgress
- [ ] AnimatePresence НЕ используется для page transitions
- [ ] CookieBanner: 3 кнопки (granular consent), no pre-checked checkboxes, no dark patterns
- [ ] Breadcrumbs используют ТОЛЬКО существующие Lucide иконки (Home, ChevronRight)