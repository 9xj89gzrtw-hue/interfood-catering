import type { Metadata } from "next";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import WhatsAppFloat from "@/components/home/WhatsAppFloat";
import FadeIn from "@/components/home/FadeIn";
import { CONTACTS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Фотогалерея мероприятий",
  description: "Фотографии кейтеринговых мероприятий: свадьбы, банкеты, фуршеты, корпоративы. Подача блюд, сервировка, декор.",
};

const CATEGORIES = [
  { id: "all", label: "Все" },
  { id: "wedding", label: "Свадьбы" },
  { id: "banquet", label: "Банкеты" },
  { id: "furshet", label: "Фуршеты" },
  { id: "decor", label: "Декор" },
];

const PHOTOS = [
  { src: "/images/real/gallery_pro_1.jpg", title: "Подача блюд", cat: "banquet", w: 475, h: 475 },
  { src: "/images/real/gallery_pro_2.jpg", title: "Сервировка", cat: "banquet", w: 475, h: 475 },
  { src: "/images/real/gallery_pro_3.jpg", title: "Мероприятие", cat: "furshet", w: 475, h: 475 },
  { src: "/images/real/gallery_pro_4.jpg", title: "Фуршет", cat: "furshet", w: 475, h: 475 },
  { src: "/images/real/gallery_pro_5.jpg", title: "Банкет", cat: "banquet", w: 475, h: 475 },
  { src: "/images/real/gallery_pro_6.jpg", title: "Декор", cat: "decor", w: 475, h: 475 },
  { src: "/images/real/event1.jpg", title: "Свадебный банкет", cat: "wedding", w: 800, h: 600 },
  { src: "/images/real/event_decor.jpg", title: "Оформление зала", cat: "decor", w: 800, h: 600 },
  { src: "/images/real/event_loft.jpg", title: "Лофт-мероприятие", cat: "furshet", w: 800, h: 600 },
];

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#F5F1EA", minHeight: "100vh" }}>
        <section className="relative pt-32 pb-12 sm:pt-40 sm:pb-16" style={{ background: "#1A1A1A" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeIn>
              <p className="font-sans text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#D4A843" }}>Портфолио</p>
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-light mb-6" style={{ color: "#F5F1EA" }}>
                Фотогалерея
              </h1>
              <p className="font-sans text-base sm:text-lg max-w-2xl mx-auto" style={{ color: "rgba(245,241,234,0.8)" }}>
                3 500+ мероприятий с 2007 года. Свадьбы, банкеты, фуршеты, корпоративы.
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
              {CATEGORIES.map((c) => (
                <span
                  key={c.id}
                  className="font-sans text-sm px-4 py-2 rounded-full cursor-default"
                  style={{
                    background: c.id === "all" ? "#D4A843" : "rgba(212,168,67,0.12)",
                    color: c.id === "all" ? "#fff" : "#8B6F47",
                  }}
                >
                  {c.label}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {PHOTOS.map((p, i) => (
                <FadeIn key={i} delay={i * 50}>
                  <div className="group relative aspect-square overflow-hidden rounded-xl sm:rounded-2xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.src}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4" style={{ background: "linear-gradient(0deg, rgba(26,26,26,0.85) 0%, transparent 60%)" }}>
                      <div>
                        <p className="font-sans text-xs uppercase tracking-wider" style={{ color: "#D4A843" }}>
                          {CATEGORIES.find((c) => c.id === p.cat)?.label}
                        </p>
                        <p className="font-serif text-lg text-white">{p.title}</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={200}>
              <div className="mt-12 text-center">
                <p className="font-sans text-base mb-6" style={{ color: "#5C564D" }}>
                  Хотите такое же мероприятие? Обсудим детали.
                </p>
                <a
                  href={CONTACTS.whatsappText}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-sans text-base px-8 py-4 rounded-full transition-all duration-300 hover:scale-[1.03]"
                  style={{ background: "#D4A843", color: "#fff" }}
                >
                  Обсудить мероприятие →
                </a>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
