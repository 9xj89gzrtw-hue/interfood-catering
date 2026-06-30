import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Услуги кейтеринга",
  description:
    "Полный спектр услуг кейтеринга: фуршет, банкет, кофе-брейк, бар, десерт. Авторская кухня и безупречный сервис.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
