import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Условия использования",
  description:
    "Условия использования сервиса Интерфуд Кейтеринг. Правила заказа, оплаты и оказания кейтеринговых услуг.",
  alternates: {
    canonical: "https://interfood-catering.ru/terms",
  },
  openGraph: {
    title: "Условия использования — Интерфуд Кейтеринг",
    description:
      "Условия использования сервиса Интерфуд Кейтеринг. Правила заказа, оплаты и оказания кейтеринговых услуг.",
    url: "https://interfood-catering.ru/terms",
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
