import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Свадебный кейтеринг",
  description: "Премиальный свадебный кейтеринг в Санкт-Петербурге. Пакеты от 6 500 ₽/чел. Авторское меню, шампанская пирамида, декор, флористика и безупречный сервис от Интерфуд.",
  alternates: { canonical: "https://interfood-catering.ru/wedding" },
  openGraph: {
    title: "Свадебный кейтеринг — Интерфуд",
    description: "Свадьбы от 6 500 ₽/чел. Авторское меню, декор, шампанская пирамида, персональный менеджер.",
    url: "https://interfood-catering.ru/wedding",
    images: [{ url: "/images/hero.jpg", width: 1200, height: 630 }],
  },
};

export default function WeddingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
