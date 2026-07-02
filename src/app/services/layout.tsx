import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Услуги кейтеринга",
  description:
    "Полный спектр услуг кейтеринга: фуршет, банкет, кофе-брейк, бар, десерт. Авторская кухня и безупречный сервис.",
  keywords: [
    "кейтеринг услуги",
    "фуршет",
    "банкет",
    "кофе-брейк",
    "кейтеринг бар",
    "десерт кейтеринг",
  ],
  alternates: {
    canonical: "https://interfood-catering.ru/services",
  },
  openGraph: {
    title: "Услуги кейтеринга — Интерфуд Кейтеринг",
    description:
      "Полный спектр услуг кейтеринга: фуршет, банкет, кофе-брейк, бар, десерт. Авторская кухня и безупречный сервис.",
    url: "https://interfood-catering.ru/services",
    images: [{ url: "/images/a2fbd3b8447b.jpg", width: 1200, height: 630, alt: "Услуги кейтеринга Интерфуд" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Услуги кейтеринга — Интерфуд Кейтеринг",
    description:
      "Полный спектр услуг кейтеринга: фуршет, банкет, кофе-брейк, бар, десерт.",
    images: ["/images/a2fbd3b8447b.jpg"],
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: "https://interfood-catering.ru" },
      { "@type": "ListItem", position: 2, name: "Услуги", item: "https://interfood-catering.ru/services" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      {children}
    </>
  );
}
