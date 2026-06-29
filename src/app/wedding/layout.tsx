import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Свадебный кейтеринг — Интерфуд Кейтеринг",
  description: "Премиальный свадебный кейтеринг в Санкт-Петербурге. Пакеты от 6 500 ₽/чел. Авторское меню, шампанская пирамида, декор и безупречный сервис.",
  openGraph: {
    title: "Свадебный кейтеринг — Интерфуд",
    description: "Свадьбы от 6 500 ₽/чел. Авторское меню, декор, шампанская пирамида.",
  },
};

export default function WeddingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
