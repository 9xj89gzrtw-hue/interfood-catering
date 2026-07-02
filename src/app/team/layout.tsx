import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Команда",
  description:
    "Команда Интерфуд Кейтеринг — профессионалы, которые делают каждое мероприятие незабываемым. Шеф-повара, менеджеры, сомелье.",
  keywords: [
    "кейтеринг команда",
    "шеф-повар кейтеринг",
    "Дмитрий Нилов шеф",
    "сомелье кейтеринг",
  ],
  alternates: {
    canonical: "https://interfood-catering.ru/team",
  },
  openGraph: {
    title: "Команда — Интерфуд Кейтеринг",
    description:
      "Команда Интерфуд Кейтеринг — профессионалы, которые делают каждое мероприятие незабываемым. Шеф-повара, менеджеры, сомелье.",
    url: "https://interfood-catering.ru/team",
    images: [{ url: "/images/gallery_2.jpg", width: 1200, height: 630, alt: "Команда Интерфуд Кейтеринг" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Команда — Интерфуд Кейтеринг",
    description:
      "Команда Интерфуд Кейтеринг — профессионалы вашего мероприятия.",
    images: ["/images/gallery_2.jpg"],
  },
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  const schemaBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: "https://interfood-catering.ru" },
      { "@type": "ListItem", position: 2, name: "Команда", item: "https://interfood-catering.ru/team" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      {children}
    </>
  );
}
