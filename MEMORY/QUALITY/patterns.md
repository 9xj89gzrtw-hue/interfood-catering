# QUALITY — Паттерны кода для кейтерингового сайта

> **Schema Version:** 4.0
> **Обновлён:** 2026-07-04
> **Назначение:** Готовые решения для типичных задач

---

## Структура страницы (< 250 строк)

### Шаблон: SubpageLayout (D-004)
```tsx
// src/app/[page]/page.tsx — ~80-150 строк
import SubpageLayout from '@/components/home/SubpageLayout'

export default function PageName() {
  return (
    <SubpageLayout
      title="Заголовок"
      subtitle="Подзаголовок"
      image="/images/hero-image.jpg"
    >
      <FadeIn>Контент</FadeIn>
    </SubpageLayout>
  )
}
```

### Шаблон: Компонент-секция
```tsx
// src/components/[page]/Section.tsx — ~30-80 строк
export default function Section({ data }: Props) {
  return (
    <section className="py-16 md:py-24 bg-[#F5F1EA]">
      <div className="container mx-auto px-4">
        {/* Контент */}
      </div>
    </section>
  )
}
```

## Дизайн-токены (из CORE.md)

| Элемент | CSS |
|---------|-----|
| Фон основной | `bg-[#F5F1EA]` |
| Фон альт. | `bg-[#EDE8DD]` |
| Тёмная секция | `bg-[#1A1A1A] text-white` |
| Акцент | `text-[#D4A843]` или `border-[#D4A843]` |
| CTA кнопка | `bg-[#D4A843] text-white hover:bg-[#C4983A]` |
| Заголовок | `font-serif text-[#1A1A1A]` |
| Боди текст | `font-sans text-[#5C564D]` |

## FadeIn паттерн (T-001)
```tsx
// SSR-safe, IntersectionObserver
export default function FadeIn({ children, delay = 0 }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`transition-all duration-700
      ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
```

## WhatsApp CTA паттерн (T-002)
```tsx
// Номер из CORE.md (SSOT) — НЕ хардкодить!
// См. CORE.md → Контакты → WhatsApp
const waLink = (text: string) =>
  `https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}?text=${encodeURIComponent(text)}`
```

## Карточка блюда (для MenuBuilder)
```tsx
<div className="bg-white rounded-lg p-4 border border-[#D4A843]/20
  hover:shadow-lg transition-shadow duration-300">
  <img src={dish.image} className="w-full h-48 object-cover rounded" />
  <h3 className="font-serif text-lg mt-2">{dish.name}</h3>
  <p className="text-[#5C564D] text-sm">{dish.description}</p>
  <p className="text-[#D4A843] font-semibold">{dish.price} ₽/чел</p>
</div>
```
