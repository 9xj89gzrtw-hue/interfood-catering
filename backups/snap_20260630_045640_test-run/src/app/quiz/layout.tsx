import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Подбор мероприятия",
  description:
    "Пройдите квиз и узнайте, какой формат кейтеринга вам подходит. 5 вопросов — персональная рекомендация.",
};

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
