# LEARNINGS — Правила, паттерны, техники

> **Schema Version:** 2.0
> **Обновлён:** 2026-07-04
> **SSOT:** Жёсткие правила — в CORE.md. Здесь — контекст и обоснование.

---

## RULES (обоснование правил из CORE.md)

### R-001: Каждый файл < 250 строк
- **Обоснование:** Zero Human Code experiment доказал: AI ломает файлы > 400 строк
- **Дата:** 2026-07-02

### R-002: Нет canvas/3D/spring/morphing
- **Обоснование:** 40+ "wow" компонентов → SSR ошибки, пустые зоны, сломанный мобильный
- **Дата:** 2026-07-02

### R-003: Только CSS transitions + FadeIn
- **Обоснование:** SSR-safe, работает на всех устройствах
- **Дата:** 2026-07-02

### R-004: SSR-safe
- **Обоснование:** Math.random/Date.now/window в render → hydration mismatch
- **Дата:** 2026-07-02

### R-005: ringColor → Tailwind ring-[#color]
- **Обоснование:** ringColor не валидный CSS
- **Дата:** 2026-07-03

---

## PATTERNS (подтверждённые подходы)

### P-001: "Painfully Specific Intern" mindset
- Описывать всё для AI как стажёру без контекста
- Anthropic: Context Engineering > Prompt Engineering
- **Дата:** 2026-07-03

### P-002: Incremental Fix Methodology
- Один баг = одно изменение = один коммит
- Массовые фиксы v72 создали новые баги
- **Дата:** 2026-07-03

### P-003: Editorial Restraint = Premium
- Noma.dk, ElevenMadisonPark.com — меньше = больше
- **Дата:** 2026-07-03

### P-004: Фото-меню конвертируют на 25% лучше
- Chowly research
- **Дата:** 2026-07-03

### P-005: Warm colors > cool gray для food
- Coloracci 2026
- **Дата:** 2026-07-03

### P-006: Micro-interactions > heavy animations
- Figma 2026
- **Дата:** 2026-07-03

---

## TECHNIQUES (приёмы)

### T-001: FadeIn через IntersectionObserver
- SSR-safe scroll animation, см. src/components/home/FadeIn.tsx
- **Дата:** 2026-07-03

### T-002: WhatsApp CTA с предзаполненным текстом
- `wa.me/...?text=...` — номер в CORE.md (SSOT)
- **Дата:** 2026-07-03

---

## NEVER (никогда не делать)

### N-001: НЕ использовать ignoreBuildErrors: true
- Скрывало реальные TS ошибки → краш в продакшне
- **Дата:** 2026-07-03

### N-002: НЕ создавать компоненты > 400 строк
- CinematicHero 1332 строк — источник всех бед
- **Дата:** 2026-07-02

### N-003: НЕ использовать MorphingText/GlitchText/TextScramble
- Кривые символы на SSR
- **Дата:** 2026-07-03

### N-004: НЕ ставить самооценку без VLM/browser проверки
- 8/10 было фальшивой — пользователь отверг
- **Дата:** 2026-07-03

### N-005: НЕ дублировать информацию между файлами памяти
- SSOT в CORE.md, остальные ссылаются
- **Дата:** 2026-07-04
