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
  metadataBase: new URL("https://nilov-catering.ru"),
  title: "Nilov Catering — Премиальный кейтеринг в Москве",
  description:
    "Роскошный кейтеринг для свадеб, корпоративов и закрытых мероприятий. Авторская кухня, безупречный сервис и внимание к каждой детали. Более 15 лет опыта.",
  keywords: [
    "кейтеринг Москва",
    "премиальный кейтеринг",
    "кейтеринг на свадьбу",
    "корпоративный кейтеринг",
    "выездной банкет",
    "фуршет",
    "Nilov Catering",
  ],
  authors: [{ name: "Nilov Catering" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Nilov Catering — Премиальный кейтеринг в Москве",
    description:
      "Роскошный кейтеринг для свадеб, корпоративов и закрытых мероприятий. Авторская кухня, безупречный сервис.",
    url: "https://nilov-catering.ru",
    siteName: "Nilov Catering",
    type: "website",
    images: [{ url: "/images/hero.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nilov Catering — Премиальный кейтеринг",
    description:
      "Роскошный кейтеринг для свадеб, корпоративов и закрытых мероприятий.",
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
    name: "Nilov Catering",
    description:
      "Премиальный кейтеринг в Москве. Авторская кухня, безупречный сервис.",
    url: "https://nilov-catering.ru",
    telephone: "+7 (495) 123-45-67",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Москва",
      addressCountry: "RU",
    },
    priceRange: "$$$$",
    image: "https://nilov-catering.ru/images/hero.jpg",
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
          text: "Оставьте заявку на сайте или позвоните нам. Менеджер свяжется в течение 30 минут для обсуждения деталей.",
        },
      },
      {
        "@type": "Question",
        name: "За сколько дней нужно бронировать?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Рекомендуем бронировать за 14–30 дней до мероприятия. В высокий сезон (май–сентябрь) — за 45 дней.",
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
    ],
  };

  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
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
