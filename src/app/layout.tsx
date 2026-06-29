import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://interfood-catering.ru"),
  title: "Интерфуд Кейтеринг — Премиальный кейтеринг в Санкт-Петербурге",
  description:
    "Ресторан выездного обслуживания. Премиальный кейтеринг для свадеб, корпоративов, фуршетов и кофе-брейков. Авторская кухня Дмитрия Нилова с 2007 года.",
  keywords: [
    "кейтеринг Санкт-Петербург",
    "премиальный кейтеринг",
    "кейтеринг на свадьбу",
    "корпоративный кейтеринг",
    "выездной банкет",
    "фуршет",
    "кофе-брейк",
    "Интерфуд",
    "Нилов кейтеринг",
  ],
  authors: [{ name: "Интерфуд Кейтеринг" }],
  icons: { icon: "/logo.svg" },
  robots: { index: true, follow: true },
  other: {
    "theme-color": "#0c0b0b",
  },
  openGraph: {
    title: "Интерфуд Кейтеринг — Ресторан выездного обслуживания",
    description:
      "Премиальный кейтеринг для свадеб, корпоративов и закрытых мероприятий. Авторская кухня, безупречный сервис.",
    url: "https://interfood-catering.ru",
    siteName: "Интерфуд Кейтеринг",
    type: "website",
    images: [{ url: "/images/hero.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Интерфуд Кейтеринг — Ресторан выездного обслуживания",
    description:
      "Премиальный кейтеринг для свадеб, корпоративов и закрытых мероприятий.",
    images: ["/images/hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Интерфуд Кейтеринг",
    alternateName: "Nilov Catering",
    description:
      "Премиальный кейтеринг в Санкт-Петербурге. Ресторан выездного обслуживания. Авторская кухня Дмитрия Нилова.",
    url: "https://interfood-catering.ru",
    telephone: "+7 (812) 919-59-11",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Невский проспект, д. 100",
      addressLocality: "Санкт-Петербург",
      postalCode: "191186",
      addressCountry: "RU",
    },
    priceRange: "$$$$",
    foundingDate: "2007",
    founder: { "@type": "Person", name: "Дмитрий Нилов" },
    image: "https://interfood-catering.ru/images/hero.jpg",
    sameAs: [
      "https://vk.com/nilovcatering",
      "https://instagram.com/nilov_catering",
    ],
  };

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
        name: "Минимальное количество гостей?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "От 20 человек для банкета и от 30 для фуршета. Для камерных мероприятий обсудим индивидуально.",
        },
      },
      {
        "@type": "Question",
        name: "Есть ли бесплатная дегустация?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Да, мы проводим бесплатную дегустацию для заказов от 50 гостей. Вы сможете оценить качество блюд и скорректировать меню.",
        },
      },
      {
        "@type": "Question",
        name: "Работаете ли вы за городом?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Да, обслуживаем мероприятия по всей Ленинградской области. Транспортные расходы рассчитываются индивидуально.",
        },
      },
      {
        "@type": "Question",
        name: "Можно заказать только еду без сервиса?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Да, доступна доставка готовых блюд (мобильный фуршет). Меню от 650 ₽ за блюдо в термопаковке.",
        },
      },
    ],
  };

  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="canonical" href="https://interfood-catering.ru" />
        <meta name="theme-color" content="#0c0b0b" />
        <link rel="apple-touch-icon" href="/logo.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }}
        />
      </head>
      <body className={`${cormorant.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
