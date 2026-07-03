# LEARNINGS — Правила, паттерны, техники

> **Формат:** CATEGORY → Правило → Контекст → Дата

---

## RULES (никогда не нарушать)

### R-001: Каждый файл < 250 строк
- **Контекст:** AI-агенты ломают файлы > 400 строк (доказано Zero Human Code experiment)
- **Дата:** 2026-07-02

### R-002: Никаких canvas particles, 3D tilt, spring physics, morphing text
- **Контекст:** Все 40+ "wow" компонентов вызвали SSR ошибки, пустые белые зоны, сломанную мобильную версию
- **Дата:** 2026-07-02

### R-003: Только CSS transitions + FadeIn (IntersectionObserver)
- **Контекст:** SSR-safe, просто, работает на всех устройствах
- **Дата:** 2026-07-02

### R-004: SSR-safe — нет Math.random(), Date.now(), window в render
- **Контекст:** Вызывают hydration mismatch и краши
- **Дата:** 2026-07-02

### R-005: ringColor НЕ валидный CSS
- **Контекст:** Использовать Tailwind класс `ring-[#color]`
- **Дата:** 2026-07-03

### R-006: Никогда не говорить "исправлено" без объективного подтверждения
- **Контекст:** Пользователь отклонил 8/10 оценку как фальшивую
- **Дата:** 2026-07-03

### R-007: git commit + push после каждого значимого изменения
- **Контекст:** Без этого потеряны результаты нескольких сессий
- **Дата:** 2026-07-02

---

## PATTERNS (подтверждённые работающие подходы)

### P-001: "Painfully Specific Intern" mindset
- **Суть:** Описывать всё для AI так, будто это стажёр без контекста. Не предполагать знание.
- **Контекст:** Anthropic "Context Engineering > Prompt Engineering" — курируй оптимальные токены
- **Дата:** 2026-07-03

### P-002: Incremental Fix Methodology
- **Суть:** Один баг = одно изменение = один коммит. Не чинить 10 вещей одновременно.
- **Контекст:** Массовые фиксы в v72 создали новые баги (262 замены в 34 файлах)
- **Дата:** 2026-07-03

### P-003: Editorial Restraint = Premium
- **Суть:** 2026高端餐饮设计 = редакционная сдержанность (Noma.dk, ElevenMadisonPark.com). Меньше = больше.
- **Контекст:** Исследование 15 успешных кейтеринговых сайтов
- **Дата:** 2026-07-03

### P-004: Photo-based menus конвертируют на 25% лучше
- **Суть:** Меню с фотографиями блюд конвертируют лучше текстовых
- **Контекст:** Chowly research
- **Дата:** 2026-07-03

### P-005: Warm colors > cool gray для food/hospitality
- **Суть:** Тёплые тона (#F5F1EA, #D4A843) конвертируют лучше холодных (#FAFAF7, серый)
- **Контекст:** Coloracci 2026
- **Дата:** 2026-07-03

### P-006: Micro-interactions > heavy animations
- **Суть:** Лёгкие hover-эффекты чувствуются "дороже" чем тяжёлые анимации
- **Контекст:** Figma 2026 design trends
- **Дата:** 2026-07-03

### P-007: Component self-containment
- **Суть:** Каждый компонент должен быть автономным — без сложных inter-dependencies
- **Контекст:** Сложные зависимости между 40+ компонентами делали баги каскадными
- **Дата:** 2026-07-02

---

## TECHNIQUES (конкретные технические приёмы)

### T-001: FadeIn через IntersectionObserver
```tsx
"use client";
import { useEffect, useRef } from "react";
export default function FadeIn({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; obs.disconnect(); }
    }, { threshold: 0.1 });
    el.style.opacity = "0"; el.style.transform = "translateY(20px)"; el.style.transition = "opacity 0.6s, transform 0.6s";
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}
```
- **Дата:** 2026-07-03

### T-002: SSR-safe next/image
```tsx
<Image src="/images/photo.jpg" alt="..." fill sizes="(max-width:768px) 100vw, 50vw" style={{ objectFit: "cover" }} />
```
- **Дата:** 2026-07-03

### T-003: WhatsApp CTA с предзаполненным текстом
```tsx
<a href={`https://wa.me/79119417205?text=${encodeURIComponent("Хочу заказать кейтеринг на 50 персон")}`}>
  Заказать
</a>
```
- **Дата:** 2026-07-03

---

## NEVER (никогда больше не делать)

### N-001: НЕ использовать ignoreBuildErrors: true
- **Контекст:** Скрывало реальные TS ошибки, привело к крашу в продакшне
- **Дата:** 2026-07-03

### N-002: НЕ создавать компоненты > 400 строк
- **Контекст:** CinematicHero был 1332 строки — источник всех бед
- **Дата:** 2026-07-02

### N-003: НЕ использовать ssr: false в Server Components
- **Контекст:** Next.js 16 не поддерживает — вызывает ошибку
- **Дата:** 2026-07-02

### N-004: НЕ использовать MorphingText / GlitchText / TextScramble
- **Контекст:** Всегда показывают кривые символы на SSR
- **Дата:** 2026-07-03

### N-005: НЕ использовать ParticleField / WebGLShaderBG / Canvas
- **Контекст:** SSR краш + мобильный лаг
- **Дата:** 2026-07-02

### N-006: НЕ ставить самооценку без VLM/browser проверки
- **Контекст:** 8/10 было фальшивой оценкой — пользователь это отверг
- **Дата:** 2026-07-03

---

## AUTOMATE (что можно автоматизировать)

### A-001: Pre-commit hook — проверка длины файлов (< 250 строк)
- **Статус:** НЕ РЕАЛИЗОВАНО
- **Дата:** 2026-07-03

### A-002: CI check — запрещённые паттерны (canvas particles, MorphingText, etc.)
- **Статус:** НЕ РЕАЛИЗОВАНО
- **Дата:** 2026-07-03

### A-003: Автоматическое обновление INDEX.md при создании новых файлов памяти
- **Статус:** НЕ РЕАЛИЗОВАНО
- **Дата:** 2026-07-03
