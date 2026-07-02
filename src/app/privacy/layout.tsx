import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description:
    "Политика конфиденциальности сайта Интерфуд Кейтеринг. Порядок обработки и защиты персональных данных пользователей в соответствии с ФЗ-152.",
  keywords: [
    "политика конфиденциальности",
    "персональные данные",
    "Интерфуд Кейтеринг",
    "защита данных",
    "ФЗ-152",
  ],
  alternates: {
    canonical: "https://interfood-catering.ru/privacy",
  },
  openGraph: {
    title: "Политика конфиденциальности — Интерфуд Кейтеринг",
    description:
      "Порядок обработки и защиты персональных данных пользователей сайта Интерфуд Кейтеринг.",
    url: "https://interfood-catering.ru/privacy",
    siteName: "Интерфуд Кейтеринг",
    type: "website",
    locale: "ru_RU",
  },
  twitter: {
    card: "summary",
    title: "Политика конфиденциальности — Интерфуд Кейтеринг",
    description:
      "Порядок обработки и защиты персональных данных.",
  },
  robots: { index: false, follow: true },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
