import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Корпоративное питание — Nilov Catering | Специальные условия",
  description: "Кейтеринг для корпоративных клиентов в Санкт-Петербурге. Специальные условия, постоплата, регулярные мероприятия. Nilov Catering.",
  alternates: { canonical: "https://nilov-catering.ru/korporativ" },
  openGraph: { title: "Корпоративное питание — Nilov Catering" },
};
export default function KorporativLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
