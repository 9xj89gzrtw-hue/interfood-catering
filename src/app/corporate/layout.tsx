import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Корпоративный кейтеринг",
  description: "Корпоративный кейтеринг в Санкт-Петербурге. Конференции, форумы, тимбилдинги. 1200+ мероприятий.",
};

export default function CorporateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
