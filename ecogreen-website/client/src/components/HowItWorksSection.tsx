/*
 * HowItWorksSection — Apple Cinematic Scroll
 * 3 pasos en sticky 300vh:
 *   01 → Texto izquierda | Phone mockup derecha (dark bg)
 *   02 → Texto izquierda | Fullbleed parallax
 *   03 → Texto izquierda | Fullbleed parallax
 * Cada paso: número gigante + tag + título + descripción
 * Transiciones con crossfade + x-enter animado
 */

import { motion, useTransform, useMotionValue } from "framer-motion";
import { useRef, useEffect } from "react";

export default function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Drive progress via native scroll listener to avoid framer-motion
  // scroll-container detection issues with overflow-x: clip on the page wrapper
  const scrollYProgress = useMotionValue(0);
  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const top = containerRef.current.offsetTop;
      const range = containerRef.current.offsetHeight - window.innerHeight;
      scrollYProgress.set(Math.max(0, Math.min(1, (window.scrollY - top) / range)));
    };
    window.addEventListener("scroll", update, { passive: true });
    update(); // initial
    return () => window.removeEventListener("scroll", update);
  }, [scrollYProgress]);

  // ─────────────────────────────────────────
  // Backgrounds
  // ─────────────────────────────────────────
  const bg1Opacity = useTransform(scrollYProgress, [0, 0.05, 0.27, 0.35], [0, 1, 1, 0]);
  const bg2Opacity = useTransform(scrollYProgress, [0.29, 0.38, 0.60, 0.68], [0, 1, 1, 0]);
  const bg3Opacity = useTransform(scrollYProgress, [0.63, 0.72, 0.95, 1.0], [0, 1, 1, 0]);

  // ─────────────────────────────────────────
  // Parallax on photo backgrounds
  // ─────────────────────────────────────────
  const bg2Y = useTransform(scrollYProgress, [0.29, 0.68], ["-8%", "8%"]);
  const bg3Y = useTransform(scrollYProgress, [0.63, 1.0], ["-8%", "8%"]);

  // ─────────────────────────────────────────
  // Step 1 — text left
  // ─────────────────────────────────────────
  const t1Opacity = useTransform(scrollYProgress, [0, 0.07, 0.25, 0.34], [0, 1, 1, 0]);
  const t1X      = useTransform(scrollYProgress, [0, 0.09], [-60, 0]);
  // Step 1 — phone right
  const p1Opacity = useTransform(scrollYProgress, [0, 0.07, 0.25, 0.34], [0, 1, 1, 0]);
  const p1X       = useTransform(scrollYProgress, [0, 0.09], [80, 0]);
  const p1Scale   = useTransform(scrollYProgress, [0, 0.09, 0.25, 0.34], [0.90, 1, 1, 0.92]);

  // ─────────────────────────────────────────
  // Step 2 — text
  // ─────────────────────────────────────────
  const t2Opacity = useTransform(scrollYProgress, [0.33, 0.42, 0.58, 0.67], [0, 1, 1, 0]);
  const t2X       = useTransform(scrollYProgress, [0.33, 0.43], [-60, 0]);

  // ─────────────────────────────────────────
  // Step 3 — text
  // ─────────────────────────────────────────
  const t3Opacity = useTransform(scrollYProgress, [0.67, 0.76, 0.94, 1.0], [0, 1, 1, 0]);
  const t3X       = useTransform(scrollYProgress, [0.67, 0.77], [-60, 0]);

  // ─────────────────────────────────────────
  // Step number watermarks
  // ─────────────────────────────────────────
  const n1Opacity = useTransform(scrollYProgress, [0, 0.06, 0.22, 0.33], [0, 0.06, 0.06, 0]);
  const n2Opacity = useTransform(scrollYProgress, [0.33, 0.39, 0.55, 0.67], [0, 0.06, 0.06, 0]);
  const n3Opacity = useTransform(scrollYProgress, [0.67, 0.73, 0.90, 1.0], [0, 0.06, 0.06, 0]);

  // ─────────────────────────────────────────
  // Progress bar + scroll hint
  // ─────────────────────────────────────────
  const progressH   = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.07], [1, 0]);

  return (
    <section
      id="como-funciona"
      ref={containerRef}
      className="relative"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-[#0E1A12]">

        {/* ══════════════════════════════════
            BACKGROUND 1 — dark green
        ══════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 bg-[#0E1A12]"
          style={{ opacity: bg1Opacity }}
        />


        {/* ══════════════════════════════════
            BACKGROUND 2 — instalación
        ══════════════════════════════════ */}
        <motion.div className="absolute inset-0 overflow-hidden" style={{ opacity: bg2Opacity }}>
          <motion.img
            src="/imgs/paso2-instalacion.webp"
            srcSet="/imgs/paso2-instalacion-mobile.webp 480w, /imgs/paso2-instalacion.webp 1200w"
            sizes="100vw"
            loading="lazy"
            decoding="async"
            alt=""
            className="absolute inset-0 w-full h-[115%] object-cover"
            style={{ y: bg2Y }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E1A12]/90 via-[#0E1A12]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E1A12]/70 via-transparent to-[#0E1A12]/30" />
        </motion.div>

        {/* ══════════════════════════════════
            BACKGROUND 3 — disfrute
        ══════════════════════════════════ */}
        <motion.div className="absolute inset-0 overflow-hidden" style={{ opacity: bg3Opacity }}>
          <motion.img
            src="/imgs/paso3-disfrute.webp"
            srcSet="/imgs/paso3-disfrute-mobile.webp 480w, /imgs/paso3-disfrute.webp 1200w"
            sizes="100vw"
            loading="lazy"
            decoding="async"
            alt=""
            className="absolute inset-0 w-full h-[115%] object-cover"
            style={{ y: bg3Y }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E1A12]/90 via-[#0E1A12]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E1A12]/70 via-transparent to-[#0E1A12]/30" />
        </motion.div>

        {/* ══════════════════════════════════
            SECTION LABEL
        ══════════════════════════════════ */}
        <div className="absolute top-8 inset-x-0 z-30 flex justify-center pointer-events-none">
          <span className="font-body text-xs uppercase tracking-[0.4em] text-[#D4A843] font-medium px-5 py-2 border border-[#D4A843]/30 rounded-full bg-[#D4A843]/5 backdrop-blur-sm">
            Nuestro Proceso
          </span>
        </div>

        {/* ══════════════════════════════════
            STEP 1 — CONTENT
        ══════════════════════════════════ */}
        {/* Watermark number */}
        <motion.div
          className="absolute inset-0 flex items-center justify-start pl-6 md:pl-14 pointer-events-none select-none z-10"
          style={{ opacity: n1Opacity }}
        >
          <span className="font-display font-bold text-white leading-none"
            style={{ fontSize: "clamp(100px, 25vw, 380px)" }}>
            01
          </span>
        </motion.div>

        {/* Text — left (top on mobile, center on desktop) */}
        <motion.div
          className="absolute inset-0 z-20 flex flex-col justify-start pt-20 md:justify-center md:pt-0 px-6 md:px-16 w-full md:max-w-[520px] pointer-events-none"
          style={{ opacity: t1Opacity, x: t1X }}
        >
          <span className="inline-flex w-fit font-body text-[10px] uppercase tracking-[0.4em] text-[#00A651] mb-5 px-3 py-1 border border-[#00A651]/25 rounded-full">
            Rápido y sin compromiso
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold text-white leading-tight mb-5">
            Cotización y<br />
            <span className="italic text-[#00A651]">Planificación</span>
          </h2>
          <p className="font-body text-base md:text-lg text-white/50 leading-relaxed">
            Contáctenos por WhatsApp o formulario. Evaluamos sus necesidades y le enviamos una propuesta personalizada en minutos.
          </p>
        </motion.div>

        {/* Phone — bottom on mobile, right on desktop */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 md:left-auto md:right-0 md:top-0 z-10 flex items-end justify-center pb-0 md:pb-0 md:items-center md:justify-end md:pr-16 pointer-events-none"
          style={{ opacity: p1Opacity, x: p1X, scale: p1Scale }}
        >
          <img
            src="/imgs/paso1-cotizacion.webp"
            srcSet="/imgs/paso1-cotizacion-mobile.webp 480w, /imgs/paso1-cotizacion.webp 1200w"
            sizes="(max-width: 768px) 65vh, 125vh"
            loading="lazy"
            decoding="async"
            alt="Cotización WhatsApp"
            className="h-[65vh] md:h-[125vh] max-h-[1200px] w-auto object-contain drop-shadow-2xl"
          />
        </motion.div>

        {/* ══════════════════════════════════
            STEP 2 — CONTENT
        ══════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-16 pointer-events-none"
          style={{ opacity: t2Opacity, x: t2X }}
        >
          <motion.span
            className="inline-flex w-fit font-body text-[10px] uppercase tracking-[0.4em] text-[#00A651] mb-5 px-3 py-1 border border-[#00A651]/25 rounded-full"
          >
            Puntualidad garantizada
          </motion.span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold text-white leading-tight mb-5">
            <span className="italic text-[#00A651]">Instalación</span>
          </h2>
          <p className="font-body text-base md:text-lg text-white/50 leading-relaxed max-w-md">
            Llegamos antes de su evento e instalamos todo con puntualidad garantizada. Usted no mueve un dedo.
          </p>
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-center justify-start pl-6 md:pl-14 pointer-events-none select-none z-10"
          style={{ opacity: n2Opacity }}
        >
          <span className="font-display font-bold text-white leading-none"
            style={{ fontSize: "clamp(100px, 25vw, 380px)" }}>
            02
          </span>
        </motion.div>

        {/* ══════════════════════════════════
            STEP 3 — CONTENT
        ══════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-16 pointer-events-none"
          style={{ opacity: t3Opacity, x: t3X }}
        >
          <span className="inline-flex w-fit font-body text-[10px] uppercase tracking-[0.4em] text-[#00A651] mb-5 px-3 py-1 border border-[#00A651]/25 rounded-full">
            Cero preocupaciones
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold text-white leading-tight mb-5">
            Disfrute<br />
            <span className="italic text-[#00A651]">su Evento</span>
          </h2>
          <p className="font-body text-base md:text-lg text-white/50 leading-relaxed max-w-md">
            Relájese. Nuestra operaria se encarga del mantenimiento durante todo el evento para que sus invitados vivan la mejor experiencia.
          </p>
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-center justify-start pl-6 md:pl-14 pointer-events-none select-none z-10"
          style={{ opacity: n3Opacity }}
        >
          <span className="font-display font-bold text-white leading-none"
            style={{ fontSize: "clamp(100px, 25vw, 380px)" }}>
            03
          </span>
        </motion.div>

        {/* ══════════════════════════════════
            PROGRESS BAR — right edge
        ══════════════════════════════════ */}
        <div className="absolute right-5 md:right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-3">
          <div className="relative w-px h-24 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full bg-[#00A651] rounded-full"
              style={{ height: progressH }}
            />
          </div>
          {/* Step dots */}
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-white/20" />
          ))}
        </div>

        {/* ══════════════════════════════════
            SCROLL HINT
        ══════════════════════════════════ */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none"
          style={{ opacity: hintOpacity }}
        >
          <span className="font-body text-[10px] uppercase tracking-[0.35em] text-white/25">Scroll</span>
          <motion.div
            className="w-px h-8 bg-gradient-to-b from-white/25 to-transparent"
            animate={{ scaleY: [0.5, 1, 0.5] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        </motion.div>

      </div>
    </section>
  );
}
