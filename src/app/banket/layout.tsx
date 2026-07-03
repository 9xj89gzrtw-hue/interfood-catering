import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Банкетное обслуживание — Nilov Catering | от 4 000 ₽/гость",
  description: "Заказать банкет в Санкт-Петербурге. Полноценный ужин с обслуживанием от Nilov Catering. От 4 000 ₽/гость. Премиальная подача.",
  alternates: { canonical: "https://nilov-catering.ru/banket" },
  openGraph: { title: "Банкет — Nilov Catering", description: "Заказать банкет в СПб. От 4 000 ₽/гость." },
};
export default function BanketLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
