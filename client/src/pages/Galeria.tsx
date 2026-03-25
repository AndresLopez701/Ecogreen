/*
 * Galería Page - EcoGreen Soluciones
 * Standalone full-page gallery with masonry grid and lightbox
 * Reuses the same design language as the home page
 */

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ZoomIn, ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BlurFade from "@/components/animations/BlurFade";

const galleryItems = [
  {
    src: "/images/hero-wedding.png",
    alt: "Tráiler de lujo en boda al aire libre",
    label: "Bodas al Aire Libre",
    category: "Bodas",
  },
  {
    src: "/images/interior-luxury.png",
    alt: "Interior premium de unidad sanitaria",
    label: "Interior Premium",
    category: "Interiores",
  },
  {
    src: "/images/trailer-exterior.png",
    alt: "Tráiler sanitario de lujo en jardín",
    label: "Tráiler VIP Exterior",
    category: "Equipos",
  },
  {
    src: "/images/event-corporate.png",
    alt: "Evento corporativo con unidades EcoGreen",
    label: "Eventos Corporativos",
    category: "Corporativo",
  },
  {
    src: "/images/wedding-outdoor.png",
    alt: "Boda en hacienda colombiana",
    label: "Hacienda Colombiana",
    category: "Bodas",
  },
];

const categories = ["Todos", ...Array.from(new Set(galleryItems.map((g) => g.category)))];

export default function Galeria() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredItems =
    activeCategory === "Todos"
      ? galleryItems
      : galleryItems.filter((g) => g.category === activeCategory);

  const navigateLightbox = (dir: number) => {
    if (lightboxIndex === null) return;
    const next =
      (lightboxIndex + dir + filteredItems.length) % filteredItems.length;
    setLightboxIndex(next);
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Navbar />

      {/* Hero banner */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-[#0F1F14] relative overflow-hidden">
        <div className="absolute inset-0 grain-overlay" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-[#00B140]/[0.04] blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#00D154]/[0.03] blur-3xl" />

        <div className="container relative z-10 text-center">
          <BlurFade delay={0.1}>
            <span className="inline-block font-body text-xs uppercase tracking-[0.4em] text-[#00D154] font-medium mb-4 px-4 py-1.5 border border-[#00D154]/20 rounded-full backdrop-blur-sm">
              Galería
            </span>
          </BlurFade>
          <BlurFade delay={0.2}>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-white mt-4">
              Nuestro Trabajo
            </h1>
          </BlurFade>
          <BlurFade delay={0.3}>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mt-1">
              <span className="italic bg-gradient-to-r from-[#00D154] to-[#33E070] bg-clip-text text-transparent">
                en Acción
              </span>
            </h2>
          </BlurFade>
          <BlurFade delay={0.4}>
            <p className="font-body text-base text-white/40 max-w-xl mx-auto mt-6 leading-relaxed">
              Descubra cómo nuestras unidades sanitarias de lujo transforman
              cada evento en una experiencia inolvidable.
            </p>
          </BlurFade>
        </div>
      </section>

      {/* Gallery body */}
      <section className="py-16 md:py-24 bg-[#F5F8F6] flex-1">
        <div className="container">
          {/* Category filters */}
          <BlurFade delay={0.2} className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-body text-sm px-5 py-2.5 rounded-full border transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-[#00B140] text-white border-[#00B140] shadow-[0_0_20px_rgba(0,177,64,0.2)]"
                    : "bg-white text-[#0F1F14]/60 border-[#0F1F14]/10 hover:border-[#00B140]/30 hover:text-[#00B140]"
                }`}
              >
                {cat}
              </button>
            ))}
          </BlurFade>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, i) => (
                <motion.div
                  key={item.src}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="relative overflow-hidden rounded-xl group cursor-pointer aspect-[4/3]"
                  onClick={() => setLightboxIndex(i)}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-all duration-[1.2s] group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1F14]/80 via-[#0F1F14]/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-end pb-6">
                    <ZoomIn className="w-6 h-6 text-white/60 mb-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500" />
                    <span className="font-display text-lg font-semibold text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                      {item.label}
                    </span>
                    <span className="font-body text-xs text-white/40 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                      {item.category}
                    </span>
                  </div>
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-white/0 group-hover:border-[#00D154]/60 transition-all duration-500 rounded-tl-xl" />
                  <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-white/0 group-hover:border-[#00D154]/60 transition-all duration-500 rounded-br-xl" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Instagram CTA */}
          <BlurFade delay={0.4} className="text-center mt-14">
            <a
              href="https://www.instagram.com/ecogreen_soluciones/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-body text-sm font-medium text-[#00B140] hover:text-[#00D154] transition-all duration-300 group px-6 py-3 border border-[#00B140]/15 rounded-full hover:border-[#00D154]/30"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              Ver más en Instagram
              <span className="inline-block transition-transform group-hover:translate-x-1.5 duration-300">
                &rarr;
              </span>
            </a>
          </BlurFade>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[#0F1F14]/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors z-10"
              onClick={() => setLightboxIndex(null)}
              aria-label="Cerrar"
            >
              <X className="w-8 h-8" />
            </button>
            <button
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors z-10 p-2"
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox(-1);
              }}
              aria-label="Anterior"
            >
              <ArrowLeft className="w-8 h-8" />
            </button>
            <button
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors z-10 p-2"
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox(1);
              }}
              aria-label="Siguiente"
            >
              <ArrowRight className="w-8 h-8" />
            </button>
            <motion.img
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={filteredItems[lightboxIndex].src}
              alt={filteredItems[lightboxIndex].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
              <span className="font-display text-lg text-white/60">
                {filteredItems[lightboxIndex].label}
              </span>
              <span className="font-body text-xs text-white/30 block mt-1">
                {lightboxIndex + 1} / {filteredItems.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <WhatsAppButton />
    </motion.div>
  );
}
