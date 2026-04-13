/*
 * WhyChooseUsSection — Opción A: Dark Band
 * Fondo #0E1A12, stats grandes dorados, cards numeradas con watermark
 */

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Shield, Clock, ThumbsUp, MapPin } from "lucide-react";

const stats = [
  { value: 400, suffix: "+", label: "Eventos Realizados" },
  { value: 100, suffix: "%", label: "Satisfacción" },
  { value: 7,   suffix: "+", label: "Años de Experiencia" },
  { value: 24,  suffix: "/7", label: "Disponibilidad" },
];

const reasons = [
  {
    num: "01",
    icon: Shield,
    title: "Garantía de Calidad",
    desc: "Cada unidad pasa por un riguroso proceso de limpieza y verificación antes de cada evento.",
  },
  {
    num: "02",
    icon: Clock,
    title: "Puntualidad Garantizada",
    desc: "Entregamos e instalamos con anticipación para que todo esté listo cuando lo necesite.",
  },
  {
    num: "03",
    icon: ThumbsUp,
    title: "Experiencia Comprobada",
    desc: "Años de experiencia en los eventos más importantes de Colombia.",
  },
  {
    num: "04",
    icon: MapPin,
    title: "Cobertura Nacional",
    desc: "Llegamos a casi cualquier ciudad del país, contáctenos y lo planeamos juntos.",
  },
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

      {/* Background texture — very subtle green pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #00A651 0%, transparent 50%), radial-gradient(circle at 80% 20%, #00A651 0%, transparent 40%)" }}
      />

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

        {/* ── Reason cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.2 + i * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
              className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.04] hover:bg-white/[0.07] hover:border-[#00A651]/30 transition-all duration-500 p-8"
            >
              {/* Watermark number */}
              <span className="absolute -right-2 -bottom-4 font-display text-[120px] font-bold leading-none text-white/[0.04] select-none pointer-events-none group-hover:text-[#00A651]/[0.07] transition-colors duration-500">
                {reason.num}
              </span>

              {/* Green left accent bar */}
              <div className="absolute left-0 top-8 bottom-8 w-0.5 bg-gradient-to-b from-transparent via-[#00A651]/60 to-transparent rounded-full" />

              <div className="relative z-10 pl-4">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-[#00A651]/10 border border-[#00A651]/20 flex items-center justify-center mb-5 group-hover:bg-[#00A651]/20 transition-colors duration-300">
                  <reason.icon className="w-5 h-5 text-[#00A651]" />
                </div>

                <h3 className="font-display text-xl md:text-2xl font-semibold text-white mb-2">
                  {reason.title}
                </h3>
                <p className="font-body text-sm md:text-base text-white/50 leading-relaxed">
                  {reason.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Subtle bottom gradient edge */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00A651]/30 to-transparent" />
    </section>
  );
}
