/*
 * GallerySection — Tabs por categoría
 * Bodas / Corporativos / Fiestas / Exteriores
 * Grid asimétrico: primer item grande (hero), resto en grid
 * Lightbox con navegación por teclado
 */

import BlurFade from "@/components/animations/BlurFade";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { X, ArrowLeft, ArrowRight, Play } from "lucide-react";
import { INSTAGRAM_URL } from "@shared/const";

type GalleryItem = {
  src: string;
  alt: string;
  label: string;
  type: "image" | "video";
  poster?: string;
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
      { src: "/imgs/boda-elegante.jpg",      alt: "Boda elegante con unidades EcoGreen",   label: "Boda Exclusiva",    type: "image" },
      { src: "/imgs/boda2.jpg",              alt: "Unidades en ceremonia de boda",          label: "Ceremonia",         type: "image" },
      { src: "/imgs/video1.mp4",             alt: "Video boda en finca",                    label: "En Vivo",           type: "video", poster: "/imgs/boda2.jpg" },
      { src: "/imgs/boda1.jpg",              alt: "Unidades instaladas para boda",          label: "Instalación",       type: "image" },
      { src: "/imgs/premium-lago.jpg",       alt: "Evento en finca con vista al lago",      label: "Finca Premium",     type: "image" },
      { src: "/imgs/video5.mp4",             alt: "Video celebración",                      label: "Celebración",       type: "video", poster: "/imgs/boda2.jpg" },
    ],
  },
  {
    id: "corporativos",
    label: "Corporativos",
    items: [
      { src: "/imgs/exterior-carpa.jpg",     alt: "Unidades junto a carpa corporativa",    label: "Evento Corporativo", type: "image" },
      { src: "/imgs/video2.mp4",             alt: "Video servicio corporativo",             label: "En Servicio",        type: "video", poster: "/imgs/exterior-carpa.jpg" },
      { src: "/imgs/equipo-instalando.jpg",  alt: "Equipo EcoGreen instalando unidades",   label: "Nuestro Equipo",     type: "image" },
      { src: "/imgs/finca.jpg",              alt: "Unidades en finca para evento",          label: "Evento en Finca",    type: "image" },
      { src: "/imgs/unidad-exterior-2.jpg",  alt: "Flota completa de unidades",             label: "Flota Premium",      type: "image" },
      { src: "/imgs/video3.mp4",             alt: "Video evento de lujo",                   label: "Evento de Lujo",     type: "video", poster: "/imgs/evento-social.jpg" },
    ],
  },
  {
    id: "fiestas",
    label: "Fiestas",
    items: [
      { src: "/imgs/fiesta-privada-new.jpg", alt: "Fiesta privada con unidades EcoGreen",  label: "Fiesta Privada",     type: "image" },
      { src: "/imgs/evento-social.jpg",      alt: "Evento social con decoración",           label: "Evento Social",      type: "image" },
      { src: "/imgs/video3.mp4",             alt: "Video fiesta de lujo",                   label: "En Vivo",            type: "video", poster: "/imgs/evento-social.jpg" },
      { src: "/imgs/exterior-palmera.jpg",   alt: "Unidades junto a palmeras",              label: "Ambiente Tropical",  type: "image" },
      { src: "/imgs/boda-desc.jpg",          alt: "Celebración especial",                   label: "Celebración",        type: "image" },
      { src: "/imgs/video5.mp4",             alt: "Video fiesta privada",                   label: "Fiesta",             type: "video", poster: "/imgs/boda2.jpg" },
    ],
  },
  {
    id: "exteriores",
    label: "Exteriores",
    items: [
      { src: "/imgs/premium-lago.jpg",       alt: "Unidades con vista al lago",             label: "Vista al Lago",      type: "image" },
      { src: "/imgs/unidad-exterior-1.jpg",  alt: "Unidad exterior vista completa",         label: "Unidad Premium",     type: "image" },
      { src: "/imgs/unidad-exterior-2.jpg",  alt: "Flota en sendero de finca",              label: "Flota Completa",     type: "image" },
      { src: "/imgs/video2.mp4",             alt: "Video exterior servicio",                label: "Servicio Completo",  type: "video", poster: "/imgs/exterior-carpa.jpg" },
      { src: "/imgs/equipo-instalando.jpg",  alt: "Equipo instalando unidades",             label: "Instalación",        type: "image" },
      { src: "/imgs/finca.jpg",              alt: "Unidades en finca",                      label: "En Finca",           type: "image" },
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
        large ? "col-span-2 row-span-2" : ""
      }`}
      onClick={onClick}
    >
      {item.type === "video" ? (
        <video
          src={item.src}
          poster={item.poster}
          muted loop playsInline
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onMouseEnter={(e) => (e.currentTarget as HTMLVideoElement).play()}
          onMouseLeave={(e) => { const v = e.currentTarget as HTMLVideoElement; v.pause(); v.currentTime = 0; }}
        />
      ) : (
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

      {/* Play badge */}
      {item.type === "video" && (
        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full p-1.5">
          <Play className="w-3 h-3 text-white fill-white" />
        </div>
      )}

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
        <BlurFade delay={0.2} className="flex justify-center mb-10">
          <div className="inline-flex gap-2 bg-[#0E1A12]/[0.06] p-1.5 rounded-full">
            {tabs.map((tab, i) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(i)}
                className={`relative font-body text-sm font-medium px-5 py-2 rounded-full transition-all duration-300 ${
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
            className="grid grid-cols-2 md:grid-cols-3 grid-rows-[240px_240px_240px] md:grid-rows-[280px_280px] gap-3"
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
