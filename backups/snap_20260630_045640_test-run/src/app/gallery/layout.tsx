import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Галерея",
  description: "Фотогалерея мероприятий Интерфуд Кейтеринг: свадьбы, корпоративы, фуршеты, банкеты.",
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
