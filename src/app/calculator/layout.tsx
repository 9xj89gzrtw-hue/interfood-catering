import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Калькулятор стоимости",
  description:
    "Рассчитайте стоимость кейтеринга онлайн. Фуршет, банкет, кофе-брейк — узнайте цену за минуту.",
  keywords: [
    "калькулятор кейтеринга",
    "стоимость кейтеринга",
    "цена кейтеринг",
    "рассчитать кейтеринг",
    "кейтеринг цены",
  ],
  alternates: { canonical: "https://interfood-catering.ru/calculator" },
  openGraph: {
    title: "Калькулятор стоимости — Интерфуд Кейтеринг",
    description:
      "Рассчитайте стоимость кейтеринга онлайн. Фуршет, банкет, кофе-брейк — узнайте цену за минуту.",
    url: "https://interfood-catering.ru/calculator",
    images: [{ url: "/images/gallery_1.jpg", width: 1200, height: 630, alt: "Калькулятор стоимости кейтеринга" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Калькулятор стоимости — Интерфуд Кейтеринг",
    description:
      "Рассчитайте стоимость кейтеринга онлайн за минуту.",
    images: ["/images/gallery_1.jpg"],
  },
};

export default function CalcLayout({ children }: { children: React.ReactNode }) {
  const schemaBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: "https://interfood-catering.ru" },
      { "@type": "ListItem", position: 2, name: "Калькулятор", item: "https://interfood-catering.ru/calculator" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      {children}
    </>
  );
}
