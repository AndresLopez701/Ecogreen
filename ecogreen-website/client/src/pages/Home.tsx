/*
 * EcoGreen Soluciones - Home Page (Ultra Pro)
 * Design: "Hacienda Digital" — Calidez Colombiana Premium
 * Inspired by 21st.dev premium components
 * Effects: BlurFade, FlipWords, Glassmorphism, Parallax, Magnetic, Marquee
 */

import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SectionReveal from "@/components/animations/SectionReveal";
import WhatsAppButton from "@/components/WhatsAppButton";

// Lazy load all below-fold sections — they only download when needed
const AboutSection       = lazy(() => import("@/components/AboutSection"));
const ServicesSection    = lazy(() => import("@/components/ServicesSection"));
const GallerySection     = lazy(() => import("@/components/GallerySection"));
const WhyChooseUsSection = lazy(() => import("@/components/WhyChooseUsSection"));
const HowItWorksSection  = lazy(() => import("@/components/HowItWorksSection"));
const TestimonialsSection= lazy(() => import("@/components/TestimonialsSection"));
const FAQSection         = lazy(() => import("@/components/FAQSection"));
const ContactSection     = lazy(() => import("@/components/ContactSection"));
const Footer             = lazy(() => import("@/components/Footer"));

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{ overflowX: "clip" }}>
      <Navbar />
      <main>
        <HeroSection />
        <Suspense fallback={null}>
          <SectionReveal><AboutSection /></SectionReveal>
          <SectionReveal><ServicesSection /></SectionReveal>
          <SectionReveal><GallerySection /></SectionReveal>
          <SectionReveal><WhyChooseUsSection /></SectionReveal>
          <HowItWorksSection />
          <SectionReveal><TestimonialsSection /></SectionReveal>
          <SectionReveal><FAQSection /></SectionReveal>
          <SectionReveal><ContactSection /></SectionReveal>
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <WhatsAppButton />
    </div>
  );
}
