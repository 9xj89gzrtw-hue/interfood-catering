"use client";

import FadeIn from "@/components/home/FadeIn";
import Link from "next/link";

const PHOTOS = [
  { src: "/images/real/gallery_pro_1.jpg", title: "Подача блюд", cat: "Сервировка" },
  { src: "/images/real/gallery_pro_2.jpg", title: "Сервировка", cat: "Банкет" },
  { src: "/images/real/gallery_pro_3.jpg", title: "Мероприятие", cat: "Фуршет" },
  { src: "/images/real/gallery_pro_4.jpg", title: "Фуршет", cat: "Канапе" },
  { src: "/images/real/gallery_pro_5.jpg", title: "Банкет", cat: "Торжество" },
  { src: "/images/real/gallery_pro_6.jpg", title: "Декор", cat: "Оформление" },
];

export default function Gallery() {
  return (
    <section className="py-20 sm:py-28" style={{ background: "#F5F1EA" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14 gap-4">
            <div>
              <p className="font-sans text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "#8B6F47" }}>Портфолио</p>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light" style={{ color: "#1A1A1A" }}>
                Наши мероприятия
              </h2>
            </div>
            <Link href="/gallery" className="font-sans text-sm hover:text-[#D4A843] transition-colors flex items-center gap-1" style={{ color: "#5C564D" }}>
              Смотреть все фото →
            </Link>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {PHOTOS.map((p, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div className="group relative aspect-square overflow-hidden rounded-xl sm:rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.src}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4" style={{ background: "linear-gradient(0deg, rgba(26,26,26,0.85) 0%, transparent 60%)" }}>
                  <div>
                    <p className="font-sans text-xs uppercase tracking-wider" style={{ color: "#D4A843" }}>{p.cat}</p>
                    <p className="font-serif text-lg text-white">{p.title}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
