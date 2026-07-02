import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Блог и рецепты",
  description:
    "Блог о кейтеринге, рецепты от шеф-повара Дмитрия Нилова, советы по организации мероприятий.",
  keywords: [
    "кейтеринг блог",
    "рецепты кейтеринг",
    "советы мероприятие",
    "шеф-повар рецепты",
    "кейтеринг статьи",
  ],
  alternates: {
    canonical: "https://interfood-catering.ru/blog",
  },
  openGraph: {
    title: "Блог и рецепты — Интерфуд Кейтеринг",
    description:
      "Блог о кейтеринге, рецепты от шеф-повара Дмитрия Нилова, советы по организации мероприятий.",
    url: "https://interfood-catering.ru/blog",
    images: [{ url: "/images/coffee.jpg", width: 1200, height: 630, alt: "Блог и рецепты Интерфуд" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Блог и рецепты — Интерфуд Кейтеринг",
    description:
      "Рецепты от шеф-повара Дмитрия Нилова, советы по организации мероприятий.",
    images: ["/images/coffee.jpg"],
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  const schemaBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: "https://interfood-catering.ru" },
      { "@type": "ListItem", position: 2, name: "Блог", item: "https://interfood-catering.ru/blog" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      {children}
    </>
  );
}
