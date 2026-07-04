import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import Services from "@/components/home/Services";
import MenuPreview from "@/components/home/MenuPreview";
import HowItWorks from "@/components/home/HowItWorks";
import Gallery from "@/components/home/Gallery";
import Testimonials from "@/components/home/Testimonials";
import TrustSection from "@/components/home/TrustSection";
import News from "@/components/home/News";
import CTA from "@/components/home/CTA";
import Footer from "@/components/home/Footer";
import WhatsAppFloat from "@/components/home/WhatsAppFloat";

export default function Home() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#F5F1EA", minHeight: "100vh" }}>
        <Hero />
        <Stats />
        <TrustSection />
        <Services />
        <MenuPreview />
        <HowItWorks />
        <Gallery />
        <Testimonials />
        <News />
        <CTA />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
