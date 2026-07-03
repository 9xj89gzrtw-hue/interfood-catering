import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Кофе-брейк — Nilov Catering | от 800 ₽/гость",
  description: "Кофе-брейк для конференций в Санкт-Петербурге. Круассаны, маффины, фрукты от Nilov Catering. От 800 ₽/гость.",
  alternates: { canonical: "https://nilov-catering.ru/coffee-break" },
  openGraph: { title: "Кофе-брейк — Nilov Catering", description: "Кофе-брейк в СПб. От 800 ₽/гость." },
};
export default function CoffeeLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
