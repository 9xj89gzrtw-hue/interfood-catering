import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Галерея",
  description:
    "Фотогалерея мероприятий Интерфуд Кейтеринг: свадьбы, корпоративы, фуршеты, банкеты.",
  keywords: [
    "кейтеринг фото",
    "фотогалерея кейтеринг",
    "свадебный кейтеринг фото",
    "банкет фото",
    "фуршет фото",
  ],
  alternates: {
    canonical: "https://interfood-catering.ru/gallery",
  },
  openGraph: {
    title: "Галерея — Интерфуд Кейтеринг",
    description:
      "Фотогалерея мероприятий Интерфуд Кейтеринг: свадьбы, корпоративы, фуршеты, банкеты.",
    url: "https://interfood-catering.ru/gallery",
    images: [{ url: "/images/3a442a2e6e71.jpg", width: 1200, height: 630, alt: "Галерея мероприятий Интерфуд" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Галерея — Интерфуд Кейтеринг",
    description:
      "Фотогалерея мероприятий Интерфуд Кейтеринг.",
    images: ["/images/3a442a2e6e71.jpg"],
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  const schemaBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: "https://interfood-catering.ru" },
      { "@type": "ListItem", position: 2, name: "Галерея", item: "https://interfood-catering.ru/gallery" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      {children}
    </>
  );
}
