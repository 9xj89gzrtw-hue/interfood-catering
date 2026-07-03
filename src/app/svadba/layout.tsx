import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Свадебный ужин — Nilov Catering | от 5 500 ₽/гость",
  description: "Свадебный кейтеринг в Санкт-Петербурге. Романтический ужин от Nilov Catering. От 5 500 ₽/гость. Индивидуальное меню.",
  alternates: { canonical: "https://nilov-catering.ru/svadba" },
  openGraph: { title: "Свадебный ужин — Nilov Catering", description: "Свадебный кейтеринг в СПб." },
};
export default function SvadbaLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
