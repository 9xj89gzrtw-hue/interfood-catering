import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Свяжитесь с Интерфуд Кейтеринг. Телефон, email, адрес, карта. Заказ кейтеринга в Санкт-Петербурге.",
  keywords: [
    "кейтеринг контакты",
    "заказать кейтеринг",
    "кейтеринг телефон",
    "кейтеринг адрес СПб",
    "Интерфуд контакты",
  ],
  alternates: { canonical: "https://interfood-catering.ru/contacts" },
  openGraph: {
    title: "Контакты — Интерфуд Кейтеринг",
    description:
      "Свяжитесь с Интерфуд Кейтеринг. Телефон, email, адрес, карта. Заказ кейтеринга в Санкт-Петербурге.",
    url: "https://interfood-catering.ru/contacts",
    images: [{ url: "/images/31ca0a361dc4.jpg", width: 1200, height: 630, alt: "Контакты Интерфуд Кейтеринг" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Контакты — Интерфуд Кейтеринг",
    description:
      "Свяжитесь с Интерфуд Кейтеринг. Телефон, email, адрес.",
    images: ["/images/31ca0a361dc4.jpg"],
  },
};

export default function ContactsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: "https://interfood-catering.ru" },
      { "@type": "ListItem", position: 2, name: "Контакты", item: "https://interfood-catering.ru/contacts" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      {children}
    </>
  );
}
