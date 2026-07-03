# QUALITY — Pipeline проверок и стандарты

> **Обновлён:** 2026-07-03

---

## Обязательные проверки перед commit

### S1: Статический анализ
- [ ] `next build` — PASSED (0 ошибок)
- [ ] Нет `ignoreBuildErrors: true` в next.config.ts
- [ ] TypeScript: 0 ошибок в src/

### S2: Код-стандарты
- [ ] Каждый файл < 250 строк
- [ ] Нет canvas particles, 3D tilt, spring physics, morphing text
- [ ] Нет Math.random(), Date.now(), window в render
- [ ] Нет `ringColor` как CSS свойство
- [ ] Нет console.log в продакшн-коде

### S3: Ресурсы и маршруты
- [ ] Все изображения в /public/images/ существуют
- [ ] Все маршруты доступны (200)
- [ ] WhatsApp/Telegram ссылки корректны

### S4: Кросс-устройства
- [ ] Десктоп: корректный рендеринг
- [ ] Мобильный: бургер-меню работает, нет overflow
- [ ] Планшет: адаптивная сетка

### S5: Контакты
- [ ] WhatsApp: wa.me/79119417205
- [ ] Telegram: t.me/nilov_catering
- [ ] Email: info@interfood-catering.ru
- [ ] Телефон: +7 (812) 919-59-11

---

## Быстрая проверка (5 минут)

```bash
cd /home/z/my-project
next build 2>&1 | tail -5
wc -l src/components/home/*.tsx | sort -rn | head -5
rg "Math\.random|Date\.now|window\." src/ --type tsx -l
rg "canvas|particle|morphing|spring" src/ --type tsx -l
```
