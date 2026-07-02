import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "О компании",
  description:
    "Интерфуд Кейтеринг — ресторан выездного обслуживания с 2007 года. История, команда, ценности.",
  keywords: [
    "о компании Интерфуд",
    "кейтеринг история",
    "ресторан выездного обслуживания",
    "кейтеринг СПб",
  ],
  alternates: {
    canonical: "https://interfood-catering.ru/about",
  },
  openGraph: {
    title: "О компании — Интерфуд Кейтеринг",
    description:
      "Интерфуд Кейтеринг — ресторан выездного обслуживания с 2007 года. История, команда, ценности.",
    url: "https://interfood-catering.ru/about",
    images: [{ url: "/images/7d1938ffb3e1.jpg", width: 1200, height: 630, alt: "О компании Интерфуд Кейтеринг" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "О компании — Интерфуд Кейтеринг",
    description:
      "Интерфуд Кейтеринг — ресторан выездного обслуживания с 2007 года.",
    images: ["/images/7d1938ffb3e1.jpg"],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  const schemaBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: "https://interfood-catering.ru" },
      { "@type": "ListItem", position: 2, name: "О компании", item: "https://interfood-catering.ru/about" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      {children}
    </>
  );
}
