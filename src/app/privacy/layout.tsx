import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description:
    "Политика конфиденциальности Интерфуд Кейтеринг. Сбор, обработка и хранение персональных данных пользователей сайта.",
  alternates: {
    canonical: "https://interfood-catering.ru/privacy",
  },
  openGraph: {
    title: "Политика конфиденциальности — Интерфуд Кейтеринг",
    description:
      "Политика конфиденциальности Интерфуд Кейтеринг. Сбор, обработка и хранение персональных данных.",
    url: "https://interfood-catering.ru/privacy",
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
