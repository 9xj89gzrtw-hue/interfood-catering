import TrustBar from "@/components/home/TrustBar";
import HowItWorks from "@/components/home/HowItWorks";
import Services from "@/components/home/Services";
import Gallery from "@/components/home/Gallery";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";
import Hero from "@/components/home/Hero";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import WhatsAppFloat from "@/components/home/WhatsAppFloat";

export default function Home() {
  return (
    <>
      <Navbar />
      <main style={{ background: "#F5F1EA", minHeight: "100vh" }}>
        <Hero />
        <TrustBar />
        <Services />
        <HowItWorks />
        <Gallery />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
