import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Калькулятор стоимости",
  description:
    "Рассчитайте стоимость кейтеринга онлайн. Фуршет, банкет, кофе-брейк — узнайте цену за минуту.",
  alternates: { canonical: "https://interfood-catering.ru/calculator" },
  openGraph: {
    title: "Калькулятор стоимости — Интерфуд Кейтеринг",
    description:
      "Рассчитайте стоимость кейтеринга онлайн. Фуршет, банкет, кофе-брейк — узнайте цену за минуту.",
    url: "https://interfood-catering.ru/calculator",
  },
};

export default function CalcLayout({ children }: { children: React.ReactNode }) {
  return children;
}
