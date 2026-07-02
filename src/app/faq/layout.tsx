import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Частые вопросы",
  description:
    "Ответы на частые вопросы о кейтеринге Интерфуд — заказ, меню, логистика, оплата.",
  keywords: [
    "кейтеринг вопросы",
    "кейтеринг FAQ",
    "как заказать кейтеринг",
    "кейтеринг оплата",
    "кейтеринг бронирование",
  ],
  alternates: {
    canonical: "https://interfood-catering.ru/faq",
  },
  openGraph: {
    title: "Частые вопросы — Интерфуд Кейтеринг",
    description:
      "Ответы на частые вопросы о кейтеринге Интерфуд — заказ, меню, логистика, оплата.",
    url: "https://interfood-catering.ru/faq",
    images: [{ url: "/images/3a442a2e6e71.jpg", width: 1200, height: 630, alt: "Частые вопросы о кейтеринге" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Частые вопросы — Интерфуд Кейтеринг",
    description:
      "Ответы на частые вопросы о кейтеринге Интерфуд.",
    images: ["/images/3a442a2e6e71.jpg"],
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  const schemaFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Как заказать кейтеринг?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Оставьте заявку на сайте или позвоните нам по телефону +7 (812) 919-59-11. Менеджер свяжется в течение 30 минут.",
        },
      },
      {
        "@type": "Question",
        name: "За сколько дней нужно бронировать?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Рекомендуем бронировать за 14–30 дней. В высокий сезон (май–сентябрь) — за 45 дней.",
        },
      },
      {
        "@type": "Question",
        name: "Какие форматы кейтеринга вы предлагаете?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Фуршет, банкет, кофе-брейк, бар, десерт, свадебный и корпоративный кейтеринг. Каждый формат адаптируется под ваше мероприятие.",
        },
      },
      {
        "@type": "Question",
        name: "Какова минимальная стоимость заказа?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Минимальная стоимость зависит от формата: кофе-брейк от 950 ₽/чел, фуршет от 2 450 ₽/чел, банкет от 4 470 ₽/чел.",
        },
      },
      {
        "@type": "Question",
        name: "Есть ли дегустация перед мероприятием?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Да, мы проводим бесплатную дегустацию для заказов от 50 гостей. Запись через менеджера после утверждения меню.",
        },
      },
    ],
  };

  const schemaBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: "https://interfood-catering.ru" },
      { "@type": "ListItem", position: 2, name: "Частые вопросы", item: "https://interfood-catering.ru/faq" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      {children}
    </>
  );
}
