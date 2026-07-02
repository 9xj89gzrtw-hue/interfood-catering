import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Отзывы",
  description:
    "Отзывы клиентов Интерфуд Кейтеринг. Реальные истории свадеб, корпоративов и праздников.",
  keywords: [
    "кейтеринг отзывы",
    "отзывы свадебный кейтеринг",
    "Интерфуд отзывы",
    "кейтеринг СПб отзывы",
  ],
  alternates: {
    canonical: "https://interfood-catering.ru/reviews",
  },
  openGraph: {
    title: "Отзывы — Интерфуд Кейтеринг",
    description:
      "Отзывы клиентов Интерфуд Кейтеринг. Реальные истории свадеб, корпоративов и праздников.",
    url: "https://interfood-catering.ru/reviews",
    images: [{ url: "/images/3a442a2e6e71.jpg", width: 1200, height: 630, alt: "Отзывы клиентов Интерфуд" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Отзывы — Интерфуд Кейтеринг",
    description:
      "Отзывы клиентов Интерфуд Кейтеринг. Реальные истории.",
    images: ["/images/3a442a2e6e71.jpg"],
  },
};

export default function ReviewsLayout({ children }: { children: React.ReactNode }) {
  const schemaBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: "https://interfood-catering.ru" },
      { "@type": "ListItem", position: 2, name: "Отзывы", item: "https://interfood-catering.ru/reviews" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      {children}
    </>
  );
}
