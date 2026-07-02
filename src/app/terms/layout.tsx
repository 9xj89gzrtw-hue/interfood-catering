import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Условия использования",
  description:
    "Условия использования услуг кейтеринга Интерфуд. Правила заказа, оплаты и оказания кейтеринговых услуг компании ООО «Интерфуд».",
  keywords: [
    "условия использования",
    "кейтеринг условия",
    "правила заказа",
    "Интерфуд Кейтеринг",
    "договор кейтеринг",
  ],
  alternates: {
    canonical: "https://interfood-catering.ru/terms",
  },
  openGraph: {
    title: "Условия использования — Интерфуд Кейтеринг",
    description:
      "Правила заказа, оплаты и оказания кейтеринговых услуг компании Интерфуд.",
    url: "https://interfood-catering.ru/terms",
    siteName: "Интерфуд Кейтеринг",
    type: "website",
    locale: "ru_RU",
  },
  twitter: {
    card: "summary",
    title: "Условия использования — Интерфуд Кейтеринг",
    description:
      "Правила заказа, оплаты и оказания кейтеринговых услуг.",
  },
  robots: { index: false, follow: true },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
