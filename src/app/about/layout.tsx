import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "О компании — История, команда и ценности",
  description:
    "Интерфуд Кейтеринг — премиальный кейтеринг в Санкт-Петербурге с 2007 года. История компании, команда шеф-поваров, достижения и ценности.",
  alternates: { canonical: "https://interfood-catering.ru/about" },
  openGraph: {
    title: "О компании — Интерфуд Кейтеринг",
    description: "Премиальный кейтеринг в Санкт-Петербурге с 2007 года. Узнайте нашу историю и команду.",
    url: "https://interfood-catering.ru/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
