import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import PageLoader from "@/components/PageLoader";
import BackToTop from "@/components/BackToTop";
import CustomCursor from "@/components/CustomCursor";
import ServiceWorkerRegistrar from "@/components/ServiceWorkerRegistrar";
import TouchInteractionProvider from "@/components/TouchInteractionProvider";

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
    alternateName: "Interfood Catering",
    description:
      "Кейтеринг в Санкт-Петербурге. Ресторан выездного обслуживания. Авторская кухня.",
    url: "https://interfood-catering.ru",
    telephone: "+7 (812) 919-59-11",
    email: "interfood-catering@yandex.ru",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Невский проспект, д. 100",
      addressLocality: "Санкт-Петербург",
      postalCode: "191186",
      addressCountry: "RU",
    },
    foundingDate: "2007",
    image: "https://interfood-catering.ru/images/hero.jpg",
    priceRange: "от 2 450 ₽/чел",
    areaServed: {
      "@type": "City",
      name: "Санкт-Петербург",
    },
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
              .hero-overlay{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(254,253,251,0.15) 0%,rgba(254,253,251,0.05) 30%,rgba(254,253,251,0.2) 60%,rgba(254,253,251,0.85) 100%)}
              .hero-content{position:relative;z-index:5;text-align:center;padding:2rem;max-width:800px;margin:0 auto}
              .section-label{font-size:.7rem;letter-spacing:.2em;text-transform:uppercase;color:#B8955A;margin-bottom:.75rem;font-weight:500}
              .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}
              .skip-to-content{position:absolute;top:-100%;left:1rem;z-index:10000;background:#B8955A;color:#fff;padding:.75rem 1.5rem;border-radius:0 0 8px 8px;font-size:.9rem;text-decoration:none;transition:top .2s}
              .skip-to-content:focus{top:0}
              .container{max-width:1320px;margin:0 auto;padding:0 2rem}
              .grain-overlay{position:fixed;inset:0;pointer-events:none;z-index:9998;opacity:.03}

              /* ═══ View Transitions API — 2026 ═══ */
              @supports (view-transition-name: none) {
                ::view-transition-old(root) {
                  animation: vt-fade-out 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }
                ::view-transition-new(root) {
                  animation: vt-fade-in 0.4s cubic-bezier(0.25, 1, 0.5, 1) forwards;
                }
                @keyframes vt-fade-out {
                  from { opacity: 1; transform: scale(1); }
                  to { opacity: 0; transform: scale(0.97); }
                }
                @keyframes vt-fade-in {
                  from { opacity: 0; transform: scale(1.02); }
                  to { opacity: 1; transform: scale(1); }
                }
              }

              /* ═══ Scroll-Driven Animations — 2026 Native CSS ═══ */
              @supports (animation-timeline: scroll()) {
                .scroll-reveal {
                  animation: sda-reveal 1s linear both;
                  animation-timeline: view();
                  animation-range: entry 0% entry 100%;
                }
                @keyframes sda-reveal {
                  from { opacity: 0; transform: translateY(40px) scale(0.97); }
                  to { opacity: 1; transform: translateY(0) scale(1); }
                }

                .scroll-reveal-left {
                  animation: sda-reveal-left 1s linear both;
                  animation-timeline: view();
                  animation-range: entry 0% entry 100%;
                }
                @keyframes sda-reveal-left {
                  from { opacity: 0; transform: translateX(-60px); }
                  to { opacity: 1; transform: translateX(0); }
                }

                .scroll-reveal-right {
                  animation: sda-reveal-right 1s linear both;
                  animation-timeline: view();
                  animation-range: entry 0% entry 100%;
                }
                @keyframes sda-reveal-right {
                  from { opacity: 0; transform: translateX(60px); }
                  to { opacity: 1; transform: translateX(0); }
                }

                .scroll-parallax-slow {
                  animation: sda-parallax-slow linear both;
                  animation-timeline: view();
                }
                @keyframes sda-parallax-slow {
                  from { transform: translateY(-30px); }
                  to { transform: translateY(30px); }
                }

                .scroll-scale-in {
                  animation: sda-scale-in 1s linear both;
                  animation-timeline: view();
                  animation-range: entry 0% entry 80%;
                }
                @keyframes sda-scale-in {
                  from { opacity: 0; transform: scale(0.85); }
                  to { opacity: 1; transform: scale(1); }
                }

                .scroll-clip-reveal {
                  animation: sda-clip-reveal 1s linear both;
                  animation-timeline: view();
                  animation-range: entry 0% entry 100%;
                }
                @keyframes sda-clip-reveal {
                  from { clip-path: inset(0 100% 0 0); }
                  to { clip-path: inset(0 0% 0 0); }
                }

                /* Scroll progress for sections — native CSS */
                .scroll-progress-section::before {
                  content: '';
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 4px;
                  height: 100%;
                  background: var(--color-brand);
                  transform: scaleY(0);
                  transform-origin: top;
                  animation: sda-progress linear both;
                  animation-timeline: view();
                }
                @keyframes sda-progress {
                  from { transform: scaleY(0); }
                  to { transform: scaleY(1); }
                }

                /* Ken Burns on scroll — native */
                .scroll-ken-burns {
                  animation: sda-ken-burns linear both;
                  animation-timeline: view();
                }
                @keyframes sda-ken-burns {
                  from { transform: scale(1) translate(0, 0); }
                  to { transform: scale(1.1) translate(-2%, -1%); }
                }
              }

              /* ═══ Touch-enhanced mobile interactions ═══ */
              @media (pointer: coarse) {
                * { -webkit-tap-highlight-color: transparent; }
                a, button, [role="button"] {
                  transition: transform 0.15s ease, box-shadow 0.15s ease;
                }
                a:active, button:active, [role="button"]:active {
                  transform: scale(0.96) !important;
                }
                .btn-gold:active,
                .btn-outline:active {
                  transform: scale(0.96) !important;
                  box-shadow: 0 2px 10px rgba(0,0,0,0.15) !important;
                }
                .card:active {
                  transform: scale(0.98) !important;
                }
              }

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

        {/* ═══ SECRET HACK 2026: Speculation Rules API — Instant Navigation ═══ */}
        <script
          type="speculationrules"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              prefetch: [
                { source: "list", urls: ["/menu", "/services", "/wedding", "/corporate", "/contacts", "/about", "/gallery", "/calculator"] },
              ],
              prerender: [
                { source: "list", urls: ["/menu", "/services", "/contacts"] },
              ],
            }),
          }}
        />

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
        <TouchInteractionProvider>
          <SmoothScroll>
            <ScrollProgress />
            <CustomCursor />
            <div id="main-content">
              {children}
            </div>
            <BackToTop />
          </SmoothScroll>
        </TouchInteractionProvider>
        <ServiceWorkerRegistrar />
        <div className="grain-overlay" />
      </body>
    </html>
  );
}
