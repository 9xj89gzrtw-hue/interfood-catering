import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Фуршетное обслуживание — Nilov Catering | от 1 800 ₽/гость",
  description: "Заказать фуршет в Санкт-Петербурге. Канапе, тарталетки, мини-брускетты от Nilov Catering. От 1 800 ₽/гость. 12 лет опыта, 850+ мероприятий.",
  alternates: { canonical: "https://nilov-catering.ru/furshet" },
  openGraph: {
    title: "Фуршетное обслуживание — Nilov Catering",
    description: "Заказать фуршет в СПб. От 1 800 ₽/гость.",
    type: "website",
  },
};
export default function FurshetLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
