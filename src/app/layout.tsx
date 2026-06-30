import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import PageLoader from "@/components/PageLoader";
import BackToTop from "@/components/BackToTop";
import CustomCursor from "@/components/CustomCursor";

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
  title: {
    default: "Интерфуд Кейтеринг — Премиальный кейтеринг в Санкт-Петербурге",
    template: "%s — Интерфуд Кейтеринг",
  },
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
    "кейтеринг СПб",
    "ресторан выездного обслуживания",
    "свадебный кейтеринг",
  ],
  authors: [{ name: "Интерфуд Кейтеринг" }],
  creator: "Интерфуд Кейтеринг",
  publisher: "Интерфуд Кейтеринг",
  icons: { icon: "/logo.svg" },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://interfood-catering.ru",
  },
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
    locale: "ru_RU",
    images: [{ url: "/images/hero.jpg", width: 1200, height: 630, alt: "Интерфуд Кейтеринг — премиальный кейтеринг в Санкт-Петербурге" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Интерфуд Кейтеринг — Ресторан выездного обслуживания",
    description:
      "Премиальный кейтеринг для свадеб, корпоративов и закрытых мероприятий.",
    images: ["/images/hero.jpg"],
  },
  verification: {
    yandex: "interfood-catering",
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

  const schemaService = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Премиальный кейтеринг в Санкт-Петербурге",
    provider: {
      "@type": "LocalBusiness",
      name: "Интерфуд Кейтеринг",
    },
    areaServed: {
      "@type": "City",
      name: "Санкт-Петербург",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Услуги кейтеринга",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Фуршет", description: "от 2 450 ₽/чел" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Банкет", description: "от 4 470 ₽/чел" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Кофе-брейк", description: "от 950 ₽/чел" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Свадебный кейтеринг", description: "от 6 500 ₽/чел" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Корпоративный кейтеринг", description: "от 3 500 ₽/чел" } },
      ],
    },
  };

  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="canonical" href="https://interfood-catering.ru" />
        <meta name="theme-color" content="#0c0b0b" />
        <link rel="apple-touch-icon" href="/logo.svg" />
        {/* Yandex.Metrica */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(99073454, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true,
        trackHash:true,
        ecommerce:"dataLayer"
   });
            `,
          }}
        />
        <noscript>
          <div><img src="https://mc.yandex.ru/watch/99073454" style={{ position: "absolute", left: "-9999px" }} alt="" /></div>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaService) }}
        />
      </head>
      <body className={`${cormorant.variable} ${inter.variable} antialiased`}>
        <PageLoader />
        <ScrollProgress />
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <BackToTop />
      </body>
    </html>
  );
}
