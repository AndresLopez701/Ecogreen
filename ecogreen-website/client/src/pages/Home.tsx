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
import PackagesSection from "@/components/PackagesSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SectionDivider from "@/components/animations/SectionDivider";
import SectionReveal from "@/components/animations/SectionReveal";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{ overflowX: "clip" }}>
      <Navbar />
      <main>
        <HeroSection />
        <SectionReveal>
          <AboutSection />
        </SectionReveal>
        <SectionDivider variant="cream-to-dark" />
        <SectionReveal>
          <ServicesSection />
        </SectionReveal>
        <SectionDivider variant="dark-to-cream" flip />
        <SectionReveal>
          <GallerySection />
        </SectionReveal>
        <SectionReveal>
          <WhyChooseUsSection />
        </SectionReveal>
        <HowItWorksSection />
        <SectionReveal>
          <TestimonialsSection />
        </SectionReveal>
        <SectionReveal>
          <FAQSection />
        </SectionReveal>
        <SectionReveal>
          <ContactSection />
        </SectionReveal>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
