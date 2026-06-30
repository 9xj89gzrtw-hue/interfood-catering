import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Меню кейтеринга",
  description:
    "Меню кейтеринга: фуршет, банкет, кофе-брейк, бар, десерты. Авторская кухня от шеф-повара Дмитрия Нилова.",
};

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
