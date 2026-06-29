import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Меню кейтеринга",
  description: "Авторские блюда от шеф-повара Дмитрия Нилова. Фуршет от 2 450 ₽/чел, банкет от 4 470 ₽/чел, кофе-брейк от 950 ₽/чел, барная стойка и десертный стол.",
  alternates: { canonical: "https://interfood-catering.ru/menu" },
  openGraph: {
    title: "Меню кейтеринга — Интерфуд",
    description: "Фуршет, банкет, кофе-брейк, бар и десерты. Авторская кухня от 950 ₽/чел.",
    url: "https://interfood-catering.ru/menu",
    images: [{ url: "/images/hero.jpg", width: 1200, height: 630 }],
  },
};

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
