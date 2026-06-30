import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Частые вопросы",
  description: "Ответы на частые вопросы о кейтеринге Интерфуд — заказ, меню, логистика, оплата.",
};
export default function FAQLayout({ children }: { children: React.ReactNode }) { return children; }
