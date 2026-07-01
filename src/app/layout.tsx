import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import PageLoader from "@/components/PageLoader";
import BackToTop from "@/components/BackToTop";
import CustomCursor from "@/components/CustomCursor";
import ServiceWorkerRegistrar from "@/components/ServiceWorkerRegistrar";

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
  themeColor: "#B8955A",
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
    "свадебный кейтеринг",
    "кейтеринг цены",
  ],
  authors: [{ name: "Интерфуд Кейтеринг" }],
  creator: "Интерфуд Кейтеринг",
  publisher: "Интерфуд Кейтеринг",
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-192.png", sizes: "192x192" },
      { url: "/icons/icon-512.png", sizes: "512x512" },
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
    description:
      "Кейтеринг для свадеб, корпоративов и закрытых мероприятий.",
    images: ["/images/hero.jpg"],
  },
  verification: {
    yandex: "interfood-catering",
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
    ],
  };

  const schemaBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: "https://interfood-catering.ru" },
      { "@type": "ListItem", position: 2, name: "Услуги", item: "https://interfood-catering.ru/services" },
      { "@type": "ListItem", position: 3, name: "Меню", item: "https://interfood-catering.ru/menu" },
      { "@type": "ListItem", position: 4, name: "Контакты", item: "https://interfood-catering.ru/contacts" },
    ],
  };

  return (
    <html lang="ru" suppressHydrationWarning data-scroll-behavior="smooth" style={{ overflowX: "hidden" }}>
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              *{margin:0;padding:0;box-sizing:border-box}
              html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased;overflow-x:hidden}
              html,body{max-width:100vw}
              body{font-family:"Inter",system-ui,-apple-system,sans-serif;background:#FEFDFB;color:#1A1A1A;overflow-x:hidden;-webkit-overflow-scrolling:touch}
              .hero{position:relative;min-height:100vh;display:flex;align-items:center;justify-content:center;overflow:hidden}
              .hero-dark{background:#0a0a0a}
              .hero-bg{position:absolute;inset:0;background-size:cover;background-position:center 30%}
              .hero-overlay{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(10,10,10,.55) 0%,rgba(10,10,10,.35) 40%,rgba(10,10,10,.45) 65%,rgba(10,10,10,.85) 100%)}
              .hero-content{position:relative;z-index:5;text-align:center;padding:2rem;max-width:800px;margin:0 auto}
              .section-label{font-size:.7rem;letter-spacing:.2em;text-transform:uppercase;color:#B8955A;margin-bottom:.75rem;font-weight:500}
              .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}
              .skip-to-content{position:absolute;top:-100%;left:1rem;z-index:10000;background:#B8955A;color:#fff;padding:.75rem 1.5rem;border-radius:0 0 8px 8px;font-size:.9rem;text-decoration:none;transition:top .2s}
              .skip-to-content:focus{top:0}
              .container{max-width:1320px;margin:0 auto;padding:0 2rem}
              .grain-overlay{position:fixed;inset:0;pointer-events:none;z-index:9998;opacity:.03}
              @media(max-width:640px){.container{padding:0 1rem}.hero-content{padding:1rem}}
              @media(prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;transition-duration:.01ms!important;scroll-behavior:auto!important}}
            `,
          }}
        />

        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="/icons/icon-512.png" />
        <link rel="preload" as="image" href="/images/hero.jpg" type="image/jpeg" fetchPriority="high" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://mc.yandex.ru" />
        <link rel="dns-prefetch" href="https://api-maps.yandex.ru" />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                var w=window;
                w.ym=w.ym||function(){(w.ym.a=w.ym.a||[]).push(arguments)};
                if('requestIdleCallback' in w){
                  w.requestIdleCallback(loadMetrica,{timeout:3000});
                } else {
                  w.addEventListener('load',function(){setTimeout(loadMetrica,1000)});
                }
                function loadMetrica(){
                  var s=document.createElement('script');
                  s.async=1;s.src='https://mc.yandex.ru/metrika/tag.js';
                  document.head.appendChild(s);
                  ym(99073454,"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true,trackHash:true,ecommerce:"dataLayer",defer:true});
                }
              })();
            `,
          }}
        />
        <noscript>
          <div><img src="https://mc.yandex.ru/watch/99073454" style={{ position: "absolute", left: "-9999px" }} alt="" /></div>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      </head>
      <body className={`${cormorant.variable} ${inter.variable} antialiased`}>
        <a href="#main-content" className="skip-to-content">
          Перейти к основному содержанию
        </a>
        <PageLoader />
        <SmoothScroll>
          <ScrollProgress />
          <CustomCursor />
          <div id="main-content">
            {children}
          </div>
          <BackToTop />
        </SmoothScroll>
        <ServiceWorkerRegistrar />
        <div className="grain-overlay" />
      </body>
    </html>
  );
}
