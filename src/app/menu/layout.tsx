import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Меню кейтеринга — Интерфуд Кейтеринг",
  description: "Авторские блюда от шеф-повара Дмитрия Нилова. Фуршет, банкет, кофе-брейк, барная стойка и десертный стол. Меню от 950 ₽/чел.",
  openGraph: {
    title: "Меню кейтеринга — Интерфуд",
    description: "Фуршет, банкет, кофе-брейк, бар и десерты. Авторская кухня от 950 ₽/чел.",
  },
};

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
