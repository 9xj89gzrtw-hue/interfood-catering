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
    "свадебный кейтеринг",
    "кейтеринг цены",
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
    "theme-color": "#FEFDFB",
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
    description:
      "Кейтеринг для свадеб, корпоративов и закрытых мероприятий.",
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
      "Кейтеринг в Санкт-Петербурге. Ресторан выездного обслуживания. Авторская кухня Дмитрия Нилова.",
    url: "https://interfood-catering.ru",
    telephone: "+7 (812) 919-59-11",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Невский проспект, д. 100",
      addressLocality: "Санкт-Петербург",
      postalCode: "191186",
      addressCountry: "RU",
    },
    priceRange: "$$",
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
    ],
  };

  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="canonical" href="https://interfood-catering.ru" />
        <meta name="theme-color" content="#FEFDFB" />
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
      </head>
      <body className={`${cormorant.variable} ${inter.variable} antialiased`}>
        <PageLoader />
        <ScrollProgress />
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <BackToTop />
        {/* Grain overlay for texture */}
        <div className="grain-overlay" />
      </body>
    </html>
  );
}
