import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Корпоративный кейтеринг",
  description:
    "Корпоративный кейтеринг в Санкт-Петербурге. Конференции, форумы, тимбилдинги. 1200+ мероприятий.",
  keywords: [
    "корпоративный кейтеринг",
    "кейтеринг для корпоратива",
    "кейтеринг конференция",
    "кейтеринг тимбилдинг",
    "корпоративное питание СПб",
  ],
  alternates: {
    canonical: "https://interfood-catering.ru/corporate",
  },
  openGraph: {
    title: "Корпоративный кейтеринг — Интерфуд Кейтеринг",
    description:
      "Корпоративный кейтеринг в Санкт-Петербурге. Конференции, форумы, тимбилдинги. 1200+ мероприятий.",
    url: "https://interfood-catering.ru/corporate",
    images: [{ url: "/images/wedding.jpg", width: 1200, height: 630, alt: "Корпоративный кейтеринг Интерфуд" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Корпоративный кейтеринг — Интерфуд Кейтеринг",
    description:
      "Корпоративный кейтеринг в Санкт-Петербурге. 1200+ мероприятий.",
    images: ["/images/wedding.jpg"],
  },
};

export default function CorporateLayout({ children }: { children: React.ReactNode }) {
  const schemaBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: "https://interfood-catering.ru" },
      { "@type": "ListItem", position: 2, name: "Корпоративный кейтеринг", item: "https://interfood-catering.ru/corporate" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      {children}
    </>
  );
}
