/*
 * EcoGreen Soluciones - Home Page (Ultra Pro)
 * Design: "Hacienda Digital" — Calidez Colombiana Premium
 *
 * Code splitting strategy:
 *   SYNC  → Navbar + HeroSection (above the fold, render immediately)
 *   LAZY  → Everything else (starts downloading during the Preloader splash)
 *           By the time the 2.5s splash ends, all chunks are cached = instant scroll
 */

import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import SectionReveal from "@/components/animations/SectionReveal";

// These start downloading the moment the main bundle parses — during the splash screen.
// HTTP/2 on Cloudflare fetches all in parallel.
const AboutSection       = lazy(() => import("@/components/AboutSection"));
const ServicesSection    = lazy(() => import("@/components/ServicesSection"));
const GallerySection     = lazy(() => import("@/components/GallerySection"));
const WhyChooseUsSection = lazy(() => import("@/components/WhyChooseUsSection"));
const HowItWorksSection  = lazy(() => import("@/components/HowItWorksSection"));
const TestimonialsSection= lazy(() => import("@/components/TestimonialsSection"));
const FAQSection         = lazy(() => import("@/components/FAQSection"));
const ContactSection     = lazy(() => import("@/components/ContactSection"));
const Footer             = lazy(() => import("@/components/Footer"));

// Null fallback — sections stay invisible until loaded (never shows a spinner mid-page)
const Blank = () => null;

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{ overflowX: "clip" }}>
      <Navbar />
      <main>
        <HeroSection />
        <Suspense fallback={<Blank />}>
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
      <Suspense fallback={<Blank />}>
        <Footer />
      </Suspense>
      <WhatsAppButton />
    </div>
  );
}
