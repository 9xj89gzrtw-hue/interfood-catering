# Nilov Catering — Сайт кейтеринговой компании

## Как использовать

1. Открой `PROMPT.md` — это полная спецификация сайта (1063 строки)
2. Скопируй содержимое `PROMPT.md` и отправь как инструкцию для GLM 5.2 (agent mode)
3. GLM 5.2 создаст сайт в текущей директории репозитория

## Структура репозитория

```
/PROMPT.md                          — Полная спецификация сайта для GLM 5.2 (READ THIS FIRST)
/research/catering/
  menu/catalog.json                 — Каталог: 42 блюда, 8 категорий, цены, БЖУ
  menu/photos/                      — 42 фото блюд (PNG, по ID)
  extra-photos/                     — 17 фото для галереи (PNG)
  assets/ai-images/                 — 4 AI-генерированных изображения (hero, wedding, corporate)
  CATERING_WEBSITE_RESEARCH.md      — SEO-исследование
  EXTRA_ASSETS_SUMMARY.md           — Описание дополнительных фото
  website_spec.json                 — Техническая спецификация
  CATERING_TOOLS_AND_ASSETS.md      — Инструменты и ассеты
  interfood/SUMMARY.md              — Суммаризация по interfood
```

## Технологический стек (из промпта)

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS 4 (@theme, НЕ tailwind.config.ts)
- shadcn/ui (Base UI, render prop вместо asChild)
- Framer Motion (анимации)
- React Hook Form + Zod
- react-yandex-maps, @react-pdf/renderer

## Ключевые правила (критические для GLM 5.2)

Промпт содержит подробные предупреждения об известных ловушках:
- `asChild` не существует в Base UI (июль 2026+) — использовать `render` или стилизованный Link
- `@base-ui/react/label` модуль не существует — переписать FormLabel
- `z.coerce.number()` несовместим с zodResolver
- Карта Яндекс — ТОЛЬКО dynamic import с ssr:false
- Все интерактивные компоненты — `"use client"`

Полный список запрещённых паттернов и чек-лист качества — в конце `PROMPT.md`.