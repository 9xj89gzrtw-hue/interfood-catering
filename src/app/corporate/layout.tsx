import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Корпоративный кейтеринг — Интерфуд Кейтеринг",
  description: "Корпоративный кейтеринг для бизнеса. Фуршеты, банкеты, кофе-брейки от 950 ₽/чел. Полное документальное оформление, НДС, выделенный менеджер.",
  openGraph: {
    title: "Корпоративный кейтеринг — Интерфуд",
    description: "Кейтеринг для бизнеса от 950 ₽/чел. Документы, НДС, менеджер 24/7.",
  },
};

export default function CorporateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
