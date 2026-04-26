/*
 * GallerySection — Tabs por categoría
 * Bodas / Corporativos / Fiestas / Exteriores
 * Grid asimétrico: primer item grande (hero), resto en grid
 * Lightbox con navegación por teclado
 */

import BlurFade from "@/components/animations/BlurFade";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import { INSTAGRAM_URL } from "@shared/const";

type GalleryItem = {
  src: string;
  alt: string;
  label: string;
  type: "image" | "video";
  poster?: string;
  zoom?: number;    // e.g. 0.85 = zoom out
  position?: string; // e.g. "bottom", "center 80%"
};

type Tab = {
  id: string;
  label: string;
  items: GalleryItem[];
};

// ─── CONTENIDO ────────────────────────────────────────────────
const tabs: Tab[] = [
  {
    id: "bodas",
    label: "Bodas",
    items: [
      { src: "/imgs/gallery-bodas-1.webp",    alt: "Boda elegante con unidades EcoGreen",  label: "Boda Exclusiva",  type: "image" },
      { src: "/imgs/gallery-bodas-2.webp",    alt: "Unidades en ceremonia de boda",         label: "Ceremonia",       type: "image" },
      { src: "/imgs/gallery-bodas-3.webp",    alt: "Decoración y unidades en boda",         label: "Decoración",      type: "image" },
      { src: "/imgs/gallery-bodas-4.webp",    alt: "Unidades instaladas para boda",         label: "Instalación",     type: "image" },
      { src: "/imgs/gallery-bodas-5.webp",    alt: "Vista del evento de boda",              label: "Evento",          type: "image" },
      { src: "/imgs/gallery-bodas-video.mp4", alt: "Video boda con EcoGreen",              label: "En Vivo",         type: "video", poster: "/imgs/gallery-bodas-1.webp" },
    ],
  },
  {
    id: "corporativos",
    label: "Corporativos",
    items: [
      { src: "/imgs/gallery-corp-1.webp",     alt: "Evento corporativo con unidades EcoGreen", label: "Evento Corporativo", type: "image" },
      { src: "/imgs/gallery-corp-2.mp4",     alt: "Servicio en evento empresarial",            label: "Empresarial",        type: "video", poster: "/imgs/gallery-corp-1.webp" },
      { src: "/imgs/gallery-corp-3.webp",     alt: "Unidades en conferencia",                   label: "Conferencia",        type: "image", position: "center 72%" },
      { src: "/imgs/gallery-corp-4.webp",     alt: "Flota completa para evento corporativo",    label: "Flota Premium",      type: "image", position: "center 70%" },
      { src: "/imgs/gallery-corp-5.webp",     alt: "Ambiente de evento corporativo",            label: "Ambiente",           type: "image", position: "center 70%" },
      { src: "/imgs/gallery-corp-video.mp4", alt: "Video evento corporativo EcoGreen",         label: "En Servicio",        type: "video", poster: "/imgs/gallery-corp-1.webp" },
    ],
  },
  {
    id: "fiestas",
    label: "Fiestas",
    items: [
      { src: "/imgs/gallery-fiestas-1.webp",    alt: "Fiesta privada con unidades EcoGreen",   label: "Fiesta Privada",   type: "image" },
      { src: "/imgs/gallery-fiestas-2.webp",    alt: "Celebración con servicio premium",        label: "Celebración",      type: "image" },
      { src: "/imgs/gallery-fiestas-3.webp",    alt: "Ambiente festivo con unidades EcoGreen",  label: "Ambiente",         type: "image" },
      { src: "/imgs/gallery-fiestas-4.webp",    alt: "Fiesta con servicio impecable",            label: "Servicio",         type: "image", position: "center 70%" },
      { src: "/imgs/gallery-fiestas-video1.mp4", alt: "Video fiesta con EcoGreen",              label: "En Vivo",          type: "video", poster: "/imgs/gallery-fiestas-1.webp" },
      { src: "/imgs/gallery-fiestas-video2.mp4", alt: "Video celebración con EcoGreen",         label: "Celebración",      type: "video", poster: "/imgs/gallery-fiestas-2.webp" },
    ],
  },
  {
    id: "exteriores",
    label: "Exteriores",
    items: [
      { src: "/imgs/gallery-ext-1.webp",    alt: "Vista exterior unidades EcoGreen",       label: "Unidad Premium",    type: "image" },
      { src: "/imgs/gallery-ext-2.webp",    alt: "Flota de unidades en exterior",           label: "Flota Completa",    type: "image" },
      { src: "/imgs/gallery-ext-3.webp",    alt: "Unidades instaladas en exterior",         label: "Instalación",       type: "image" },
      { src: "/imgs/gallery-ext-4.webp",    alt: "Unidades en evento exterior",             label: "Evento Exterior",   type: "image" },
      { src: "/imgs/gallery-ext-5.webp",    alt: "Vista general exterior",                  label: "Vista General",     type: "image" },
      { src: "/imgs/gallery-ext-video.mp4", alt: "Video exterior EcoGreen",                label: "En Vivo",           type: "video", poster: "/imgs/gallery-ext-1.webp" },
    ],
  },
];

// ── Card ────────────────────────────────────────────────────────
function GalleryCard({
  item,
  large = false,
  onClick,
}: {
  item: GalleryItem;
  large?: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl cursor-pointer group ${
        item.zoom ? "bg-[#F7F3ED]" : "bg-[#EDE9E3]"
      } ${large ? "md:col-span-2 md:row-span-2" : ""}`}
      onClick={onClick}
    >
      {item.type === "video" ? (
        <video
          src={item.src}
          poster={item.poster}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : item.zoom ? (
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ padding: `${((1 - item.zoom) / 2) * 100}%` }}
        >
          <img
            src={item.src}
            alt={item.alt}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      ) : (
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={item.position ? { objectPosition: item.position } : undefined}
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

      {/* Label */}
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/65 to-transparent p-4 pt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="font-body text-xs text-white/80 uppercase tracking-widest">
          {item.label}
        </span>
      </div>
    </div>
  );
}

// ── Main ────────────────────────────────────────────────────────
export default function GallerySection() {
  const [activeTab, setActiveTab] = useState(0);
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const currentItems = tabs[activeTab].items;

  const openLightbox = useCallback((item: GalleryItem) => {
    const idx = currentItems.findIndex((i) => i.src === item.src);
    setLightboxIndex(idx >= 0 ? idx : 0);
    setLightboxItem(item);
  }, [currentItems]);

  const navigateLightbox = useCallback((dir: number) => {
    setLightboxIndex((prev) => {
      const next = (prev + dir + currentItems.length) % currentItems.length;
      setLightboxItem(currentItems[next]);
      return next;
    });
  }, [currentItems]);

  useEffect(() => {
    if (!lightboxItem) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  navigateLightbox(-1);
      if (e.key === "ArrowRight") navigateLightbox(1);
      if (e.key === "Escape")     setLightboxItem(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxItem, navigateLightbox]);

  return (
    <section id="galeria" className="py-28 md:py-40 bg-[#F7F3ED] relative overflow-hidden">
      <div className="container relative z-10">

        {/* ── Header ── */}
        <BlurFade delay={0.1} className="text-center mb-12">
          <span className="inline-block font-body text-xs uppercase tracking-[0.4em] text-[#D4A843] font-medium mb-4 px-4 py-1.5 border border-[#D4A843]/40 rounded-full">
            Galería
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-[#0E1A12] mt-4">
            Nuestro Trabajo
          </h2>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mt-1">
            <span className="italic bg-gradient-to-r from-[#00A651] to-[#33B872] bg-clip-text text-transparent">
              en Acción
            </span>
          </h2>
        </BlurFade>

        {/* ── Tabs ── */}
        <BlurFade delay={0.2} className="flex justify-center mb-10 px-4">
          <div className="inline-flex gap-1.5 bg-[#0E1A12]/[0.06] p-1.5 rounded-full overflow-x-auto max-w-full">
            {tabs.map((tab, i) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(i)}
                className={`relative font-body text-xs sm:text-sm font-medium px-3.5 sm:px-5 py-2 rounded-full transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                  activeTab === i
                    ? "text-white"
                    : "text-[#0E1A12]/50 hover:text-[#0E1A12]/80"
                }`}
              >
                {activeTab === i && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#0E1A12] rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </BlurFade>

        {/* ── Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            className="grid grid-cols-2 md:grid-cols-3 grid-rows-[200px_200px_200px] md:grid-rows-[280px_280px_280px] gap-3"
          >
            {currentItems.slice(0, 6).map((item, i) => (
              <GalleryCard
                key={`${activeTab}-${i}`}
                item={item}
                large={i === 0}
                onClick={() => openLightbox(item)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Instagram CTA ── */}
        <BlurFade delay={0.4} className="text-center mt-12">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-body text-sm font-medium text-[#0E1A12]/50 hover:text-[#00A651] transition-all duration-300 group px-6 py-3 border border-[#0E1A12]/10 rounded-full hover:border-[#00A651]/30"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Ver más en Instagram
            <span className="inline-block transition-transform group-hover:translate-x-1 duration-300">→</span>
          </a>
        </BlurFade>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setLightboxItem(null)}
          >
            <button
              className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors z-10"
              onClick={() => setLightboxItem(null)}
            >
              <X className="w-7 h-7" />
            </button>
            <button
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors z-10 p-2"
              onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}
            >
              <ArrowLeft className="w-7 h-7" />
            </button>
            <button
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors z-10 p-2"
              onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}
            >
              <ArrowRight className="w-7 h-7" />
            </button>

            <motion.div
              key={lightboxItem.src}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="max-w-full max-h-[85vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {lightboxItem.type === "video" ? (
                <video
                  src={lightboxItem.src}
                  poster={lightboxItem.poster}
                  controls autoPlay
                  className="max-w-full max-h-[85vh] rounded-xl"
                />
              ) : (
                <img
                  src={lightboxItem.src}
                  alt={lightboxItem.alt}
                  className="max-w-full max-h-[85vh] object-contain rounded-xl"
                />
              )}
            </motion.div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
              <span className="font-display text-base text-white/50">{lightboxItem.label}</span>
              <span className="font-body text-xs text-white/25 block mt-1">
                {lightboxIndex + 1} / {currentItems.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
