import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import PageLoader from "@/components/PageLoader";
import BackToTop from "@/components/BackToTop";
import CustomCursor from "@/components/CustomCursor";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ErrorBoundary from "@/components/ErrorBoundary";

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
  themeColor: "#FAFAF7",
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
  publisher: "Интерфуд Кейтеринг",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "192x192" },
    ],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://interfood-catering.ru",
  },
  openGraph: {
    title: "Интерфуд Кейтеринг — Ресторан выездного обслуживания",
    description:
      "Кейтеринг для свадеб, корпоративов и закрытых мероприятий. Авторская кухня, безупречный сервис.",
    url: "https://interfood-catering.ru",
    siteName: "Интерфуд Кейтеринг",
    type: "website",
    locale: "ru_RU",
    images: [{ url: "/images/hero.jpg", width: 1200, height: 630, alt: "Интерфуд Кейтеринг" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Интерфуд Кейтеринг — Ресторан выездного обслуживания",
    description: "Кейтеринг для свадеб, корпоративов и закрытых мероприятий.",
    images: ["/images/hero.jpg"],
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "mobile-web-app-capable": "yes",
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
    email: "interfood-catering@yandex.ru",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Новолитовская ул., д. 15",
      addressLocality: "Санкт-Петербург",
      addressRegion: "Санкт-Петербург",
      postalCode: "194017",
      addressCountry: "RU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 59.9686,
      longitude: 30.3249,
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
    currenciesAccepted: "RUB",
    paymentAccepted: "Cash, CreditCard, BankTransfer",
    foundingDate: "2007",
    founder: { "@type": "Person", name: "Дмитрий Нилов" },
    areaServed: {
      "@type": "City",
      name: "Санкт-Петербург",
    },
    image: "https://interfood-catering.ru/images/hero.jpg",
    logo: "https://interfood-catering.ru/logo.svg",
    sameAs: [
      "https://vk.com/nilovcatering",
      "https://www.instagram.com/nilov_catering/",
    ],
    hasMenu: {
      "@type": "Menu",
      url: "https://interfood-catering.ru/menu",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.55",
      reviewCount: "30",
      bestRating: "5",
    },
  };

  return (
    <html lang="ru" suppressHydrationWarning style={{ overflowX: "hidden" }}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preload" as="image" href="/images/hero.jpg" type="image/jpeg" fetchPriority="high" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
      </head>
      <body className={`${cormorant.variable} ${inter.variable} antialiased min-h-screen flex flex-col`} style={{ background: "#FAFAF7", color: "#FAFAF7" }}>
        <a href="#main-content" className="skip-to-content">
          Перейти к основному содержанию
        </a>
        <PageLoader />
        <SmoothScroll>
          <ScrollProgress />
          <CustomCursor />
          <SiteNav />
          <ErrorBoundary>
            <div id="main-content" tabIndex={-1} className="flex-1 outline-none" style={{ scrollMarginTop: "5rem" }}>
              {children}
            </div>
          </ErrorBoundary>
          <SiteFooter />
          <BackToTop />
        </SmoothScroll>
        <div className="grain-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}

