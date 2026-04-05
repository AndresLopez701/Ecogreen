/*
 * GallerySection - Ultra Pro EcoGreen
 * Masonry grid with video + image items, lightbox with video support,
 * marquee text band, Instagram CTA
 * All images are unique — never repeated from other sections
 * Design: Hacienda Digital — premium, warm, exclusive
 */

import BlurFade from "@/components/animations/BlurFade";
import MarqueeText from "@/components/animations/MarqueeText";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { X, ZoomIn, ArrowLeft, ArrowRight, Play } from "lucide-react";
import { INSTAGRAM_URL } from "@shared/const";

type GalleryItem = {
  src: string;
  alt: string;
  span: string;
  label: string;
  type: "image" | "video";
  poster?: string;
};

const galleryItems: GalleryItem[] = [
  // Row 1 — hero item (large video) + 2 stacked
  {
    src: "/imgs/video3.mp4",
    poster: "/imgs/evento-social.jpg",
    alt: "Video EcoGreen — unidades en evento de lujo",
    span: "col-span-2 row-span-2",
    label: "Eventos de Lujo",
    type: "video",
  },
  {
    src: "/imgs/premium-lago.jpg",
    alt: "Unidades EcoGreen con vista al lago en evento de finca",
    span: "col-span-1 row-span-1",
    label: "Eventos en Finca",
    type: "image",
  },
  {
    src: "/imgs/unidad-exterior-2.jpg",
    alt: "Fila de unidades EcoGreen en sendero de finca",
    span: "col-span-1 row-span-2",
    label: "Flota Premium",
    type: "image",
  },
  // Row 2 — wide + small
  {
    src: "/imgs/boda2.jpg",
    alt: "Unidades EcoGreen en boda con decoración de evento",
    span: "col-span-1 row-span-1",
    label: "Bodas",
    type: "image",
  },
  // Row 3 — videos + equipo
  {
    src: "/imgs/video1.mp4",
    poster: "/imgs/boda2.jpg",
    alt: "Video EcoGreen — unidades en evento",
    span: "col-span-1 row-span-1",
    label: "En Acción",
    type: "video",
  },
  {
    src: "/imgs/equipo-instalando.jpg",
    alt: "Equipo EcoGreen instalando unidades en finca",
    span: "col-span-1 row-span-1",
    label: "Nuestro Equipo",
    type: "image",
  },
  {
    src: "/imgs/video2.mp4",
    poster: "/imgs/exterior-carpa.jpg",
    alt: "Video EcoGreen — servicio en evento deportivo",
    span: "col-span-1 row-span-1",
    label: "Servicio Completo",
    type: "video",
  },
  {
    src: "/imgs/video5.mp4",
    poster: "/imgs/boda2.jpg",
    alt: "Video EcoGreen — servicio en evento",
    span: "col-span-1 row-span-1",
    label: "En Acción",
    type: "video",
  },
];

export default function GallerySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const navigateLightbox = useCallback((dir: number) => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev + dir + galleryItems.length) % galleryItems.length;
    });
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft": navigateLightbox(-1); break;
        case "ArrowRight": navigateLightbox(1); break;
        case "Escape": setLightboxIndex(null); break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, navigateLightbox]);

  return (
    <section id="galeria" className="py-28 md:py-40 bg-[#F7F3ED] relative overflow-hidden" ref={ref}>
      <div className="container relative z-10">
        {/* Section header */}
        <BlurFade delay={0.1} className="text-center mb-20">
          <span className="inline-block font-body text-xs uppercase tracking-[0.4em] text-[#D4A843] font-medium mb-4 px-4 py-1.5 border border-[#D4A843]/20 rounded-full">
            Galería
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-[#2C2C2C] mt-4">
            Nuestro Trabajo
          </h2>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mt-1">
            <span className="italic bg-gradient-to-r from-[#00A651] to-[#33B872] bg-clip-text text-transparent">
              en Acción
            </span>
          </h2>
        </BlurFade>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[160px] md:auto-rows-[220px]">
          {galleryItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.07, type: "spring", stiffness: 80 }}
              className={`${item.span} relative overflow-hidden rounded-xl group cursor-pointer`}
              onClick={() => setLightboxIndex(i)}
            >
              {item.type === "video" ? (
                <video
                  src={item.src}
                  poster={item.poster}
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover transition-all duration-[1.2s] group-hover:scale-105"
                  onMouseEnter={(e) => (e.currentTarget as HTMLVideoElement).play()}
                  onMouseLeave={(e) => (e.currentTarget as HTMLVideoElement).pause()}
                />
              ) : (
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-all duration-[1.2s] group-hover:scale-105"
                />
              )}

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-white/0 group-hover:border-[#D4A843]/60 transition-all duration-500 rounded-tl-xl" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-white/0 group-hover:border-[#D4A843]/60 transition-all duration-500 rounded-br-xl" />

              {/* Video badge */}
              {item.type === "video" && (
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                  <Play className="w-3 h-3 text-white fill-white" />
                  <span className="font-body text-[10px] text-white/80 uppercase tracking-wider">Video</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Instagram CTA */}
        <BlurFade delay={0.6} className="text-center mt-14">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-body text-sm font-medium text-[#00A651] hover:text-[#D4A843] transition-all duration-300 group px-6 py-3 border border-[#00A651]/15 rounded-full hover:border-[#D4A843]/30"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Ver más en Instagram
            <span className="inline-block transition-transform group-hover:translate-x-1.5 duration-300">&rarr;</span>
          </a>
        </BlurFade>
      </div>

      {/* Marquee text band */}
      <div className="mt-20 py-5 bg-[#2C2C2C] -rotate-1 scale-[1.02]">
        <MarqueeText
          text="LUJO — ELEGANCIA — CONFORT — HIGIENE — EXCLUSIVIDAD — CALIDAD"
          className="font-display text-xl md:text-2xl text-white/10 font-semibold tracking-wider"
          speed={30}
          separator="   "
        />
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[#2C2C2C]/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close */}
            <button
              className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors z-10"
              onClick={() => setLightboxIndex(null)}
              aria-label="Cerrar"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation */}
            <button
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors z-10 p-2"
              onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}
              aria-label="Anterior"
            >
              <ArrowLeft className="w-8 h-8" />
            </button>
            <button
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors z-10 p-2"
              onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}
              aria-label="Siguiente"
            >
              <ArrowRight className="w-8 h-8" />
            </button>

            {/* Media */}
            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-full max-h-[85vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {galleryItems[lightboxIndex].type === "video" ? (
                <video
                  src={galleryItems[lightboxIndex].src}
                  poster={galleryItems[lightboxIndex].poster}
                  controls
                  autoPlay
                  className="max-w-full max-h-[85vh] rounded-xl"
                />
              ) : (
                <img
                  src={galleryItems[lightboxIndex].src}
                  alt={galleryItems[lightboxIndex].alt}
                  className="max-w-full max-h-[85vh] object-contain rounded-xl"
                />
              )}
            </motion.div>

            {/* Caption */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
              <span className="font-display text-lg text-white/60">
                {galleryItems[lightboxIndex].label}
              </span>
              <span className="font-body text-xs text-white/30 block mt-1">
                {lightboxIndex + 1} / {galleryItems.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
