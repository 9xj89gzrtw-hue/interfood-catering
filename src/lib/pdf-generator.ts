/**
 * PDF menu generator using jsPDF.
 * Generates a styled PDF with the user's custom menu.
 */
import jsPDF from "jspdf";

type CartItem = {
  id: string;
  name: string;
  desc: string;
  weight: string;
  pricePerGuest: number;
  category: string;
  qty: number;
};

export function generateMenuPDF(items: CartItem[], guests: number, total: number, weight: string) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = 210;
  const margin = 20;
  let y = 25;

  // Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(26, 26, 26);
  doc.text("Interfood Catering", margin, y);
  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(139, 111, 71);
  doc.text("Ваше индивидуальное меню", margin, y);
  y += 8;
  // Gold accent line
  doc.setDrawColor(212, 168, 67);
  doc.setLineWidth(0.8);
  doc.line(margin, y, pageW - margin, y);
  y += 10;

  // Event info
  doc.setFontSize(11);
  doc.setTextColor(26, 26, 26);
  doc.text(`Количество гостей: ${guests}`, margin, y);
  y += 7;
  doc.text(`Общий вес: ${weight}`, margin, y);
  y += 10;

  // Items by category
  const byCat: Record<string, CartItem[]> = {};
  items.forEach((i) => {
    if (!byCat[i.category]) byCat[i.category] = [];
    byCat[i.category].push(i);
  });

  Object.entries(byCat).forEach(([cat, dishes]) => {
    if (y > 270) { doc.addPage(); y = 25; }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(212, 168, 67);
    doc.text(cat, margin, y);
    y += 6;

    dishes.forEach((d) => {
      if (y > 275) { doc.addPage(); y = 25; }
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(26, 26, 26);
      const nameLines = doc.splitTextToSize(`${d.name} ×${d.qty}`, pageW - margin * 2 - 25);
      doc.text(nameLines, margin, y);
      y += nameLines.length * 5;
      doc.setFontSize(9);
      doc.setTextColor(139, 111, 71);
      doc.text(`${d.weight} · ${d.pricePerGuest * d.qty * guests} ₽`, margin, y);
      y += 6;
    });
    y += 3;
  });

  // Total
  if (y > 270) { doc.addPage(); y = 25; }
  y += 5;
  doc.setDrawColor(212, 168, 67);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageW - margin, y);
  y += 8;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(212, 168, 67);
  doc.text(`Итого: ${total.toLocaleString("ru")} ₽`, pageW - margin, y, { align: "right" });
  y += 12;

  // Footer
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(139, 111, 71);
  doc.text("Интерфуд Кейтеринг · interfood-catering.ru · +7 (812) 919-59-11", margin, 285);
  doc.text("interfood-catering@yandex.ru · Санкт-Петербург", margin, 290);

  doc.save("interfood-menyu.pdf");
}
