/*
 * TechnicalSection - EcoGreen Ficha Técnica
 * Apple-style scroll-triggered sequence:
 *   Phase 1 → exterior + title + dimensions
 *   Phase 2 → crossfade to interior + annotation pins
 *   Phase 3 → requirements card
 * Design: Hacienda Digital — dark, premium, technical
 */

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import { Lightbulb, Wind, Droplets, Thermometer, Zap, Ruler } from "lucide-react";

const EXTERIOR_IMG = "/imgs/unidad-exterior-1.webp";
const INTERIOR_IMG = "/imgs/interior2.webp";

const annotations = [
  {
    icon: Lightbulb,
    title: "Iluminación LED",
    desc: "Regulable, ambiente cálido",
    triggerAt: 0.40,
    style: { top: "14%", left: "5%" },
  },
  {
    icon: Thermometer,
    title: "Aire Acondicionado",
    desc: "Confort garantizado",
    triggerAt: 0.48,
    style: { top: "26%", right: "5%" },
  },
  {
    icon: Droplets,
    title: "Grifos Automáticos",
    desc: "Sin contacto, máxima higiene",
    triggerAt: 0.55,
    style: { bottom: "38%", left: "5%" },
  },
  {
    icon: Wind,
    title: "Extractor de Olores",
    desc: "Ventilación continua",
    triggerAt: 0.62,
    style: { bottom: "30%", right: "5%" },
  },
];

const dimensions = [
  { label: "Largo", value: "3.65 m" },
  { label: "Ancho", value: "3.30 m" },
  { label: "Alto", value: "2.10 m" },
];

const requirements = [
  {
    icon: Zap,
    label: "Punto de Corriente 110V",
    desc: "Para iluminación y aire acondicionado",
  },
  {
    icon: Droplets,
    label: "Punto de Llenado de Agua",
    desc: "Tanque de aguas limpias incorporado",
  },
];

function AnnotationPin({
  ann,
  scrollYProgress,
}: {
  ann: (typeof annotations)[0];
  scrollYProgress: MotionValue<number>;
}) {
  const opacity = useTransform(
    scrollYProgress,
    [ann.triggerAt, ann.triggerAt + 0.07],
    [0, 1]
  );
  const y = useTransform(
    scrollYProgress,
    [ann.triggerAt, ann.triggerAt + 0.07],
    [10, 0]
  );

  return (
    <motion.div
      className="absolute z-20 max-w-[175px] md:max-w-[210px]"
      style={{ ...ann.style, opacity, y }}
    >
      <div className="flex items-start gap-2.5 bg-black/65 backdrop-blur-md border border-white/10 rounded-xl px-3.5 py-2.5 shadow-xl">
        <div className="mt-0.5 flex-shrink-0 w-7 h-7 rounded-lg bg-[#00A651]/20 flex items-center justify-center">
          <ann.icon className="w-3.5 h-3.5 text-[#00A651]" />
        </div>
        <div>
          <p className="font-display text-sm font-semibold text-white leading-tight">
            {ann.title}
          </p>
          <p className="font-body text-xs text-white/50 mt-0.5 leading-tight">
            {ann.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function TechnicalSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Phase 1: title fades in then out as we enter interior
  const headerOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.27, 0.38],
    [0, 1, 1, 0]
  );
  const headerY = useTransform(
    scrollYProgress,
    [0.27, 0.38],
    [0, -20]
  );

  // Dimensions stay visible through phase 2
  const dimsOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.2, 0.68, 0.78],
    [0, 1, 1, 0]
  );

  // Phase 2: interior crossfade
  const interiorOpacity = useTransform(scrollYProgress, [0.28, 0.44], [0, 1]);
  const interiorScale = useTransform(scrollYProgress, [0.28, 0.58], [1.06, 1]);

  // 2-bathrooms badge
  const badgeOpacity = useTransform(scrollYProgress, [0.58, 0.68], [0, 1]);

  // Phase 3: requirements
  const reqOpacity = useTransform(scrollYProgress, [0.74, 0.86], [0, 1]);
  const reqY = useTransform(scrollYProgress, [0.74, 0.86], [24, 0]);

  // Scroll hint arrow fades out after user starts scrolling
  const hintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  return (
    <section
      id="ficha-tecnica"
      ref={containerRef}
      className="relative"
      style={{ height: "320vh" }}
    >
      {/* ─── Sticky viewport ─── */}
      <div className="sticky top-0 h-screen overflow-hidden bg-[#141414]">
        {/* Exterior image — always underneath */}
        <div className="absolute inset-0">
          <img
            src={EXTERIOR_IMG}
            alt="Unidad sanitaria EcoGreen"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#141414]/55 via-[#141414]/10 to-[#141414]/80" />
        </div>

        {/* Interior image — crossfades on top */}
        <motion.div
          className="absolute inset-0"
          style={{ opacity: interiorOpacity, scale: interiorScale }}
        >
          <img
            src={INTERIOR_IMG}
            alt="Interior de la unidad EcoGreen"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#141414]/45 via-[#141414]/10 to-[#141414]/75" />
        </motion.div>

        {/* ─── PHASE 1: Title ─── */}
        <motion.div
          className="absolute top-0 inset-x-0 z-10 p-8 md:p-16 pt-14 md:pt-20"
          style={{ opacity: headerOpacity, y: headerY }}
        >
          <span className="inline-block font-body text-xs uppercase tracking-[0.4em] text-[#D4A843] font-medium mb-4 px-3.5 py-1.5 border border-[#D4A843]/20 rounded-full">
            Ficha Técnica
          </span>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold text-white mt-2 leading-tight">
            Diseñada para
          </h2>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight">
            <span className="italic bg-gradient-to-r from-[#00A651] to-[#33B872] bg-clip-text text-transparent">
              impresionar
            </span>
          </h2>
        </motion.div>

        {/* ─── Dimensions bar (bottom, phase 1-2) ─── */}
        <motion.div
          className="absolute bottom-20 md:bottom-28 inset-x-0 z-10 px-8 md:px-16"
          style={{ opacity: dimsOpacity }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Ruler className="w-3.5 h-3.5 text-white/30" />
            <span className="font-body text-[10px] uppercase tracking-[0.3em] text-white/35">
              Dimensiones
            </span>
          </div>
          <div className="flex gap-8 md:gap-14">
            {dimensions.map((d) => (
              <div key={d.label}>
                <p className="font-display text-2xl md:text-4xl font-bold text-white">
                  {d.value}
                </p>
                <p className="font-body text-[10px] uppercase tracking-wider text-white/35 mt-1">
                  {d.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ─── PHASE 2: Annotation pins ─── */}
        {annotations.map((ann) => (
          <AnnotationPin
            key={ann.title}
            ann={ann}
            scrollYProgress={scrollYProgress}
          />
        ))}

        {/* 2 bathrooms badge */}
        <motion.div
          className="absolute z-20"
          style={{ bottom: "40%", right: "6%", opacity: badgeOpacity }}
        >
          <div className="bg-[#00A651] rounded-2xl px-4 py-3 shadow-[0_8px_32px_rgba(0,166,81,0.45)] text-center min-w-[72px]">
            <p className="font-display text-3xl font-bold text-white leading-none">2</p>
            <p className="font-body text-[10px] uppercase tracking-wider text-white/80 mt-1 leading-tight">
              Baños<br />Completos
            </p>
          </div>
        </motion.div>

        {/* ─── PHASE 3: Requirements ─── */}
        <motion.div
          className="absolute bottom-0 inset-x-0 z-20 p-6 md:p-14 pb-8 md:pb-12"
          style={{ opacity: reqOpacity, y: reqY }}
        >
          <div className="max-w-lg bg-black/65 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <p className="font-body text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">
              Requisitos de Instalación
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {requirements.map((req) => (
                <div key={req.label} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#D4A843]/15 flex items-center justify-center mt-0.5">
                    <req.icon className="w-4 h-4 text-[#D4A843]" />
                  </div>
                  <div>
                    <p className="font-body text-sm font-semibold text-white leading-snug">
                      {req.label}
                    </p>
                    <p className="font-body text-xs text-white/40 mt-0.5">
                      {req.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5"
          style={{ opacity: hintOpacity }}
        >
          <span className="font-body text-[10px] uppercase tracking-[0.3em] text-white/30">
            Scroll
          </span>
          <motion.div
            className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"
            animate={{ scaleY: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
}
