import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Отзывы клиентов — Рекомендации и оценки",
  description:
    "Отзывы клиентов Интерфуд Кейтеринг. Свадьбы, корпоративы, банкеты — реальные истории и оценки нашего сервиса.",
  alternates: { canonical: "https://interfood-catering.ru/reviews" },
  openGraph: {
    title: "Отзывы клиентов — Интерфуд Кейтеринг",
    description: "Реальные отзывы клиентов о кейтеринге Интерфуд. Свадьбы, корпоративы, банкеты.",
    url: "https://interfood-catering.ru/reviews",
  },
};

export default function ReviewsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
