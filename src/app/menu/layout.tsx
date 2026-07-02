import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Меню кейтеринга",
  description:
    "Меню кейтеринга: фуршет, банкет, кофе-брейк, бар, десерты. Авторская кухня от шеф-повара Дмитрия Нилова.",
  keywords: [
    "кейтеринг меню",
    "меню фуршет",
    "меню банкет",
    "кофе-брейк меню",
    "кейтеринг цены",
    "авторская кухня",
  ],
  alternates: {
    canonical: "https://interfood-catering.ru/menu",
  },
  openGraph: {
    title: "Меню кейтеринга — Интерфуд Кейтеринг",
    description:
      "Меню кейтеринга: фуршет, банкет, кофе-брейк, бар, десерты. Авторская кухня от шеф-повара Дмитрия Нилова.",
    url: "https://interfood-catering.ru/menu",
    images: [{ url: "/images/b0afca3cdeee.jpg", width: 1200, height: 630, alt: "Меню кейтеринга Интерфуд" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Меню кейтеринга — Интерфуд Кейтеринг",
    description:
      "Меню кейтеринга: фуршет, банкет, кофе-брейк, бар, десерты.",
    images: ["/images/b0afca3cdeee.jpg"],
  },
};

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: "https://interfood-catering.ru" },
      { "@type": "ListItem", position: 2, name: "Меню", item: "https://interfood-catering.ru/menu" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      {children}
    </>
  );
}
