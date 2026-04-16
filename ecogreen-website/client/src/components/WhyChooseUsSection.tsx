/*
 * WhyChooseUsSection — Opción A: Dark Band
 * Fondo #0E1A12, stats grandes dorados, carrusel de logos de clientes
 */

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const stats = [
  { value: 400, suffix: "+", label: "Eventos Realizados" },
  { value: 100, suffix: "%", label: "Satisfacción" },
  { value: 7,   suffix: "+", label: "Años de Experiencia" },
  { value: 24,  suffix: "/7", label: "Disponibilidad" },
];

const logos = [
  { src: "/imgs/logos/360-group-v2.png",        alt: "360 Group Agency", scale: 1.4 },
  { src: "/imgs/logos/64a-films-v2.png",        alt: "64A Films", scale: 3.1 },
  { src: "/imgs/logos/club-campestre-v2.png",   alt: "Club Campestre Cali", scale: 1.6 },
  { src: "/imgs/logos/eventos-boutique-v2.png", alt: "Eventos Boutique", scale: 2.2 },
  { src: "/imgs/logos/jbalvin-v2.png",          alt: "J Balvin", scale: 1.2 },
  { src: "/imgs/logos/coomeva-v2.png",          alt: "Coomeva", scale: 1.6 },
  { src: "/imgs/logos/hacienda-v2.png",         alt: "Hacienda Canasgordas", scale: 1.3 },
  { src: "/imgs/logos/manuelita-v2.png",        alt: "Manuelita", scale: 2.6 },
  { src: "/imgs/logos/mayaguez-v2.png",         alt: "Mayagüez", scale: 2.5 },
  { src: "/imgs/logos/ddyanke-v2.png",          alt: "DD Yanke", scale: 1.6 },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      <span className="font-display text-5xl md:text-6xl font-bold text-[#D4A843]">{count}</span>
      <span className="font-display text-3xl md:text-4xl font-semibold text-[#D4A843]/60">{suffix}</span>
    </span>
  );
}

export default function WhyChooseUsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="por-que-elegirnos"
      ref={ref}
      className="relative bg-[#0E1A12] overflow-hidden"
    >
      {/* Subtle top gradient edge */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00A651]/30 to-transparent" />


      <div className="container relative z-10 py-24 md:py-32">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-20"
        >
          <span className="inline-block font-body text-xs uppercase tracking-[0.4em] text-[#00A651] font-medium mb-5 px-4 py-1.5 border border-[#00A651]/25 rounded-full">
            ¿Por Qué Elegirnos?
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight">
            Confianza y{" "}
            <span className="italic text-[#00A651]">Excelencia</span>
          </h2>
        </motion.div>

        {/* ── Stats row ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              className="flex flex-col items-center justify-center text-center bg-[#0E1A12] py-10 px-6"
            >
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              <p className="font-body text-[11px] uppercase tracking-[0.3em] text-white/35 mt-3">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Logo carousel ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <p className="text-center font-body text-sm uppercase tracking-[0.35em] text-white/70 mb-12">
            Marcas y eventos que han confiado en nosotros
          </p>

          {/* Marquee wrapper — fade edges */}
          <div className="relative overflow-hidden"
            style={{ maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)" }}
          >
            <div className="flex gap-12 w-max animate-marquee">
              {[...logos, ...logos].map((logo, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 h-20 w-48 flex items-center justify-center px-3 py-2 transition-all duration-400 group/logo"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="max-h-full max-w-full object-contain grayscale brightness-150 opacity-70 group-hover/logo:grayscale-0 group-hover/logo:brightness-100 group-hover/logo:opacity-100 transition-all duration-400"
                    style={logo.scale ? { transform: `scale(${logo.scale})` } : undefined}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>

      {/* Subtle bottom gradient edge */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00A651]/30 to-transparent" />
    </section>
  );
}
