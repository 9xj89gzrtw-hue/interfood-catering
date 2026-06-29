import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Корпоративный кейтеринг",
  description: "Корпоративный кейтеринг для бизнеса в Санкт-Петербурге. Фуршеты, банкеты, кофе-брейки от 950 ₽/чел. Полное документальное оформление, НДС, выделенный менеджер 24/7.",
  alternates: { canonical: "https://interfood-catering.ru/corporate" },
  openGraph: {
    title: "Корпоративный кейтеринг — Интерфуд",
    description: "Кейтеринг для бизнеса от 950 ₽/чел. Документы, НДС, менеджер 24/7.",
    url: "https://interfood-catering.ru/corporate",
    images: [{ url: "/images/hero.jpg", width: 1200, height: 630 }],
  },
};

export default function CorporateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
