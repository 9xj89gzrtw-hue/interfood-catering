import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#F5F1EA",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://interfood-catering.ru"),
  title: {
    default: "Интерфуд Кейтеринг — Ресторан выездного обслуживания в Санкт-Петербурге",
    template: "%s — Интерфуд Кейтеринг",
  },
  description:
    "Кейтеринг для свадеб, корпоративов, фуршетов и кофе-брейков. Авторская кухня, безупречный сервис. Более 3500 мероприятий с 2007 года.",
  keywords: [
    "кейтеринг Санкт-Петербург",
    "кейтеринг",
    "кейтеринг на свадьбу",
    "корпоративный кейтеринг",
    "выездной банкет",
    "фуршет",
    "кофе-брейк",
    "Интерфуд",
    "кейтеринг СПб",
    "ресторан выездного обслуживания",
  ],
  authors: [{ name: "Интерфуд Кейтеринг" }],
  creator: "Интерфуд Кейтеринг",
  icons: {
    icon: "/favicon.ico",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://interfood-catering.ru" },
  openGraph: {
    title: "Интерфуд Кейтеринг — Ресторан выездного обслуживания",
    description:
      "Кейтеринг для свадеб, корпоративов и закрытых мероприятий. Авторская кухня, безупречный сервис.",
    url: "https://interfood-catering.ru",
    siteName: "Интерфуд Кейтеринг",
    type: "website",
    locale: "ru_RU",
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
    "@id": "https://interfood-catering.ru/#business",
    name: "Интерфуд Кейтеринг",
    alternateName: ["Nilov Catering", "Интерфуд"],
    description:
      "Кейтеринг в Санкт-Петербурге. Ресторан выездного обслуживания. Авторская кухня Дмитрия Нилова. Более 3500 мероприятий с 2007 года.",
    url: "https://interfood-catering.ru",
    telephone: "+7 (812) 919-59-11",
    email: "info@interfood-catering.ru",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Новолитовская ул., д. 15",
      addressLocality: "Санкт-Петербург",
      addressRegion: "Санкт-Петербург",
      postalCode: "194017",
      addressCountry: "RU",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "09:00",
        closes: "22:00",
      }
    ],
    priceRange: "₽₽",
    foundingDate: "2007",
    founder: { "@type": "Person", name: "Дмитрий Нилов" },
    areaServed: { "@type": "City", name: "Санкт-Петербург" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.55",
      reviewCount: "30",
      bestRating: "5",
    },
  };

  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body
        className={`${cormorant.variable} ${inter.variable} antialiased min-h-screen flex flex-col`}
        style={{ background: "#F5F1EA", color: "#1A1A1A" }}
      >
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded focus:text-sm" style={{ background: "#D4A843", color: "#fff" }}>
          Перейти к основному содержанию
        </a>
        <div id="main-content" className="flex-1">
          {children}
        </div>
      </body>
    </html>
  );
}
