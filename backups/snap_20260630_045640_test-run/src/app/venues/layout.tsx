import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Площадки и 3D-туры",
  description:
    "Площадки для мероприятий с 3D-турами. Выберите идеальное место для вашего события.",
};

export default function VenuesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
