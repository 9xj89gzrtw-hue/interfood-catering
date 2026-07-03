import Image from "next/image";

const GALLERY_ITEMS = [
  { src: "/images/real/gallery_pro_1.jpg", alt: "Кейтеринг — подача блюд" },
  { src: "/images/real/gallery_pro_2.jpg", alt: "Кейтеринг — сервировка" },
  { src: "/images/real/gallery_pro_3.jpg", alt: "Кейтеринг — мероприятие" },
  { src: "/images/real/gallery_pro_4.jpg", alt: "Кейтеринг — фуршет" },
  { src: "/images/real/gallery_pro_5.jpg", alt: "Кейтеринг — банкет" },
  { src: "/images/real/gallery_pro_6.jpg", alt: "Кейтеринг — декор" },
];

export default function Gallery() {
  return (
    <section className="py-16 sm:py-24" style={{ background: "#F5F1EA" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16">
          <p
            className="font-sans text-xs sm:text-sm tracking-[0.2em] uppercase mb-3"
            style={{ color: "#D4A843" }}
          >
            Портфолио
          </p>
          <h2
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light"
            style={{ color: "#1A1A1A" }}
          >
            Наши мероприятия
          </h2>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {GALLERY_ITEMS.map((item, i) => (
            <div
              key={item.src}
              className="relative aspect-[4/3] rounded-lg overflow-hidden group"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              {/* Hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end"
                style={{
                  background:
                    "linear-gradient(to top, rgba(26,26,26,0.6) 0%, transparent 60%)",
                }}
              >
                <p
                  className="font-sans text-xs sm:text-sm p-3 sm:p-4"
                  style={{ color: "#F5F1EA" }}
                >
                  {item.alt}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Link to full gallery */}
        <div className="text-center mt-8">
          <a
            href="/gallery"
            className="font-sans text-sm underline underline-offset-4 transition-colors duration-200 hover:text-[#D4A843]"
            style={{ color: "#5C564D" }}
          >
            Смотреть все фото
          </a>
        </div>
      </div>
    </section>
  );
}
