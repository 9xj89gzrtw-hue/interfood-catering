import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Площадки и 3D-туры",
  description:
    "Площадки для мероприятий с 3D-турами. Выберите идеальное место для вашего события.",
  keywords: [
    "площадки для мероприятий",
    "3D-тур площадка",
    "аренда площадки СПб",
    "локация для свадьбы",
    "зал для банкета",
  ],
  alternates: {
    canonical: "https://interfood-catering.ru/venues",
  },
  openGraph: {
    title: "Площадки и 3D-туры — Интерфуд Кейтеринг",
    description:
      "Площадки для мероприятий с 3D-турами. Выберите идеальное место для вашего события.",
    url: "https://interfood-catering.ru/venues",
    images: [{ url: "/images/31ca0a361dc4.jpg", width: 1200, height: 630, alt: "Площадки для мероприятий" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Площадки и 3D-туры — Интерфуд Кейтеринг",
    description:
      "Площадки для мероприятий с 3D-турами в Санкт-Петербурге.",
    images: ["/images/31ca0a361dc4.jpg"],
  },
};

export default function VenuesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: "https://interfood-catering.ru" },
      { "@type": "ListItem", position: 2, name: "Площадки", item: "https://interfood-catering.ru/venues" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      {children}
    </>
  );
}
