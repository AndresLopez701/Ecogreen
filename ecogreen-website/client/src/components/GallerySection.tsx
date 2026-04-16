/*
 * GallerySection — Netflix rows
 * Cada categoría es una fila horizontal con scroll independiente
 * Mobile: swipe nativo con snap. Desktop: hover play en videos, lightbox al click.
 * Para agregar nuevas categorías: añadir un objeto a `categories` con sus items.
 */

import BlurFade from "@/components/animations/BlurFade";
import MarqueeText from "@/components/animations/MarqueeText";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { X, ArrowLeft, ArrowRight, Play } from "lucide-react";
import { INSTAGRAM_URL } from "@shared/const";

type GalleryItem = {
  src: string;
  alt: string;
  label: string;
  type: "image" | "video";
  poster?: string;
};

type Category = {
  id: string;
  title: string;
  items: GalleryItem[];
};

// ─── CONTENIDO ────────────────────────────────────────────────
// Para agregar conciertos u otras categorías: copia un bloque de Category
// y agrégalo al array categories. Los items nuevos van en items[].
// ──────────────────────────────────────────────────────────────

const categories: Category[] = [
  {
    id: "destacados",
    title: "Destacados",
    items: [
      { src: "/imgs/video3.mp4", poster: "/imgs/evento-social.jpg", alt: "Unidades en evento de lujo", label: "Eventos de Lujo", type: "video" },
      { src: "/imgs/boda2.jpg",  alt: "Unidades en boda con decoración", label: "Bodas", type: "image" },
      { src: "/imgs/premium-lago.jpg", alt: "Unidades con vista al lago", label: "Eventos en Finca", type: "image" },
      { src: "/imgs/video1.mp4", poster: "/imgs/boda2.jpg", alt: "Video en evento", label: "En Acción", type: "video" },
      { src: "/imgs/unidad-exterior-2.jpg", alt: "Flota en sendero de finca", label: "Flota Premium", type: "image" },
      { src: "/imgs/video2.mp4", poster: "/imgs/exterior-carpa.jpg", alt: "Video servicio completo", label: "Servicio Completo", type: "video" },
    ],
  },
  {
    id: "videos",
    title: "Videos",
    items: [
      { src: "/imgs/video3.mp4", poster: "/imgs/evento-social.jpg", alt: "Unidades en evento de lujo", label: "Eventos de Lujo", type: "video" },
      { src: "/imgs/video1.mp4", poster: "/imgs/boda2.jpg", alt: "Video en evento", label: "En Acción", type: "video" },
      { src: "/imgs/video2.mp4", poster: "/imgs/exterior-carpa.jpg", alt: "Video servicio completo", label: "Servicio Completo", type: "video" },
      { src: "/imgs/video5.mp4", poster: "/imgs/boda2.jpg", alt: "Video en evento", label: "En Acción", type: "video" },
    ],
  },
  {
    id: "bodas",
    title: "Bodas & Celebraciones",
    items: [
      { src: "/imgs/boda2.jpg", alt: "Unidades en boda", label: "Bodas", type: "image" },
      { src: "/imgs/video1.mp4", poster: "/imgs/boda2.jpg", alt: "Video boda", label: "En Acción", type: "video" },
      { src: "/imgs/video5.mp4", poster: "/imgs/boda2.jpg", alt: "Video celebración", label: "Celebración", type: "video" },
      { src: "/imgs/premium-lago.jpg", alt: "Evento finca lago", label: "Eventos en Finca", type: "image" },
    ],
  },
  {
    id: "exteriores",
    title: "Exteriores & Equipo",
    items: [
      { src: "/imgs/premium-lago.jpg", alt: "Unidades con vista al lago", label: "Vista al Lago", type: "image" },
      { src: "/imgs/unidad-exterior-2.jpg", alt: "Flota en sendero", label: "Flota Premium", type: "image" },
      { src: "/imgs/equipo-instalando.jpg", alt: "Equipo instalando unidades", label: "Nuestro Equipo", type: "image" },
      { src: "/imgs/video2.mp4", poster: "/imgs/exterior-carpa.jpg", alt: "Video exterior", label: "Servicio Completo", type: "video" },
    ],
  },
  // ── Para agregar Conciertos cuando tengas los videos: ──────────
  // {
  //   id: "conciertos",
  //   title: "Conciertos",
  //   items: [
  //     { src: "/imgs/concierto1.mp4", poster: "/imgs/concierto1-poster.jpg", alt: "...", label: "...", type: "video" },
  //   ],
  // },
];

// Flat list for lightbox navigation (all unique items)
const allItems: GalleryItem[] = categories[0].items;

// ── Card Component ──────────────────────────────────────────────
function GalleryCard({
  item,
  onClick,
}: {
  item: GalleryItem;
  onClick: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div
      className="relative flex-shrink-0 w-[75vw] sm:w-[45vw] md:w-[300px] lg:w-[340px] h-[200px] md:h-[230px] rounded-xl overflow-hidden cursor-pointer group snap-start"
      onClick={onClick}
    >
      {item.type === "video" ? (
        <video
          ref={videoRef}
          src={item.src}
          poster={item.poster}
          muted
          loop
          playsInline
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onMouseEnter={() => videoRef.current?.play()}
          onMouseLeave={() => { videoRef.current?.pause(); if (videoRef.current) videoRef.current.currentTime = 0; }}
        />
      ) : (
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}

      {/* Dark overlay on hover */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300" />

      {/* Video badge */}
      {item.type === "video" && (
        <div className="absolute top-2.5 right-2.5 bg-black/50 backdrop-blur-sm rounded-full p-1.5">
          <Play className="w-3 h-3 text-white fill-white" />
        </div>
      )}

      {/* Label */}
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-6">
        <span className="font-body text-xs text-white/80 uppercase tracking-widest">
          {item.label}
        </span>
      </div>
    </div>
  );
}

// ── Row Component ───────────────────────────────────────────────
function CategoryRow({
  category,
  onItemClick,
  delay,
}: {
  category: Category;
  onItemClick: (item: GalleryItem) => void;
  delay: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className="mb-10"
    >
      {/* Row header */}
      <div className="flex items-center justify-between mb-4 px-4 md:px-0">
        <h3 className="font-display text-lg md:text-xl font-semibold text-[#2C2C2C]">
          {category.title}
        </h3>
        <span className="font-body text-xs text-[#2C2C2C]/40 uppercase tracking-widest">
          {category.items.length} items
        </span>
      </div>

      {/* Horizontal scroll row */}
      <div
        className="flex gap-3 overflow-x-auto pb-2 px-4 md:px-0 scroll-smooth snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {category.items.map((item, i) => (
          <GalleryCard
            key={`${category.id}-${i}`}
            item={item}
            onClick={() => onItemClick(item)}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ── Main Component ──────────────────────────────────────────────
export default function GallerySection() {
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = useCallback((item: GalleryItem) => {
    const idx = allItems.findIndex((i) => i.src === item.src);
    setLightboxIndex(idx >= 0 ? idx : 0);
    setLightboxItem(item);
  }, []);

  const navigateLightbox = useCallback((dir: number) => {
    setLightboxIndex((prev) => {
      const next = (prev + dir + allItems.length) % allItems.length;
      setLightboxItem(allItems[next]);
      return next;
    });
  }, []);

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

        {/* Header */}
        <BlurFade delay={0.1} className="text-center mb-16">
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

        {/* Netflix rows */}
        {categories.map((cat, i) => (
          <CategoryRow
            key={cat.id}
            category={cat}
            onItemClick={openLightbox}
            delay={0.1 + i * 0.08}
          />
        ))}

        {/* Instagram CTA */}
        <BlurFade delay={0.5} className="text-center mt-10">
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

      {/* Marquee */}
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
                  controls
                  autoPlay
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
                {lightboxIndex + 1} / {allItems.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
