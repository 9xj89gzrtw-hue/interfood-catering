import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Свяжитесь с Интерфуд Кейтеринг. Телефон, email, адрес, карта. Заказ кейтеринга в Санкт-Петербурге.",
  alternates: { canonical: "https://interfood-catering.ru/contacts" },
  openGraph: {
    title: "Контакты — Интерфуд Кейтеринг",
    description:
      "Свяжитесь с Интерфуд Кейтеринг. Телефон, email, адрес, карта. Заказ кейтеринга в Санкт-Петербурге.",
    url: "https://interfood-catering.ru/contacts",
  },
};

export default function ContactsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
