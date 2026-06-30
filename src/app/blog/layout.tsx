import type { Metadata } from "next";
export const metadata: Metadata = { title: "Блог и рецепты", description: "Блог о кейтеринге, рецепты от шеф-повара Дмитрия Нилова, советы по организации мероприятий." };
export default function BlogLayout({ children }: { children: React.ReactNode }) { return children; }
