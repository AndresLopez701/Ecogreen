/*
 * EcoGreen Soluciones - Home Page (Ultra Pro)
 * Design: "Hacienda Digital" — Calidez Colombiana Premium
 * Inspired by 21st.dev premium components
 * Effects: BlurFade, FlipWords, Glassmorphism, Parallax, Magnetic, Marquee
 */

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import GallerySection from "@/components/GallerySection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SectionDivider from "@/components/animations/SectionDivider";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SectionDivider variant="cream-to-dark" />
        <ServicesSection />
        <SectionDivider variant="dark-to-cream" flip />
        <GallerySection />
        <WhyChooseUsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
