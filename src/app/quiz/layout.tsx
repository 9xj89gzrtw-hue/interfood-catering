import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Подбор мероприятия",
  description:
    "Пройдите квиз и узнайте, какой формат кейтеринга вам подходит. 5 вопросов — персональная рекомендация.",
  keywords: [
    "подбор кейтеринга",
    "квиз кейтеринг",
    "какой кейтеринг выбрать",
    "формат мероприятия",
  ],
  alternates: {
    canonical: "https://interfood-catering.ru/quiz",
  },
  openGraph: {
    title: "Подбор мероприятия — Интерфуд Кейтеринг",
    description:
      "Пройдите квиз и узнайте, какой формат кейтеринга вам подходит. 5 вопросов — персональная рекомендация.",
    url: "https://interfood-catering.ru/quiz",
    images: [{ url: "/images/3a442a2e6e71.jpg", width: 1200, height: 630, alt: "Подбор формата кейтеринга" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Подбор мероприятия — Интерфуд Кейтеринг",
    description:
      "Пройдите квиз и узнайте, какой формат кейтеринга вам подходит.",
    images: ["/images/3a442a2e6e71.jpg"],
  },
};

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: "https://interfood-catering.ru" },
      { "@type": "ListItem", position: 2, name: "Подбор мероприятия", item: "https://interfood-catering.ru/quiz" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      {children}
    </>
  );
}
