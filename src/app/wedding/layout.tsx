import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Свадебный кейтеринг",
  description:
    "Свадебный кейтеринг в Санкт-Петербурге. Более 850 свадеб, авторское меню, изысканная сервировка.",
  keywords: [
    "свадебный кейтеринг",
    "кейтеринг на свадьбу",
    "свадебное меню",
    "свадебный банкет СПб",
    "кейтеринг свадьба",
  ],
  alternates: {
    canonical: "https://interfood-catering.ru/wedding",
  },
  openGraph: {
    title: "Свадебный кейтеринг — Интерфуд Кейтеринг",
    description:
      "Свадебный кейтеринг в Санкт-Петербурге. Более 850 свадеб, авторское меню, изысканная сервировка.",
    url: "https://interfood-catering.ru/wedding",
    images: [{ url: "/images/gallery_3.jpg", width: 1200, height: 630, alt: "Свадебный кейтеринг Интерфуд" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Свадебный кейтеринг — Интерфуд Кейтеринг",
    description:
      "Свадебный кейтеринг в Санкт-Петербурге. Более 850 свадеб.",
    images: ["/images/gallery_3.jpg"],
  },
};

export default function WeddingLayout({ children }: { children: React.ReactNode }) {
  const schemaBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: "https://interfood-catering.ru" },
      { "@type": "ListItem", position: 2, name: "Свадебный кейтеринг", item: "https://interfood-catering.ru/wedding" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      {children}
    </>
  );
}
