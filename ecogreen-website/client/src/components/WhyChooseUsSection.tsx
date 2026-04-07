/*
 * WhyChooseUsSection - Ultra Pro EcoGreen
 * Parallax stats bar, glassmorphism reason cards, animated counters,
 * testimonial with decorative quotes, staggered reveals
 * Design: Hacienda Digital — premium, warm, exclusive
 */

import BlurFade from "@/components/animations/BlurFade";
import GlassmorphismCard from "@/components/animations/GlassmorphismCard";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Shield, Clock, ThumbsUp, MapPin } from "lucide-react";

const WEDDING_IMG = "/imgs/boda1.jpg";

const stats = [
  { value: 500, suffix: "+", label: "Eventos Realizados" },
  { value: 100, suffix: "%", label: "Satisfacción" },
  { value: 5, suffix: "+", label: "Años de Experiencia" },
  { value: 24, suffix: "/7", label: "Disponibilidad" },
];

const reasons = [
  {
    icon: Shield,
    title: "Garantía de Calidad",
    desc: "Cada unidad pasa por un riguroso proceso de limpieza y verificación antes de cada evento.",
  },
  {
    icon: Clock,
    title: "Puntualidad Garantizada",
    desc: "Entregamos e instalamos con anticipación para que todo esté listo cuando lo necesite.",
  },
  {
    icon: ThumbsUp,
    title: "Experiencia Comprobada",
    desc: "Años de experiencia en los eventos más importantes de Colombia.",
  },
  {
    icon: MapPin,
    title: "Cobertura Nacional",
    desc: "Llegamos a casi cualquier ciudad del país. Si su evento es fuera de Cali, contáctenos y lo planeamos juntos.",
  },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2500;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="font-display text-5xl md:text-6xl font-bold tabular-nums">
      <span className="bg-gradient-to-b from-[#D4A843] to-[#E0C06A] bg-clip-text text-transparent">
        {count}
      </span>
      <span className="text-[#D4A843]/60">{suffix}</span>
    </span>
  );
}

export default function WhyChooseUsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const statsRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: statsRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section className="relative overflow-hidden" ref={ref}>
      {/* Stats bar with parallax background */}
      <div className="relative py-24 md:py-32" ref={statsRef}>
        <motion.div
          className="absolute inset-0"
          style={{ y: bgY }}
        >
          <img
            src={WEDDING_IMG}
            alt=""
            className="w-full h-[130%] object-cover"
            loading="lazy"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[#2C2C2C]/85 backdrop-blur-sm" />

        <div className="container relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: i * 0.15,
                  type: "spring",
                  stiffness: 80,
                }}
                className="relative"
              >
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <p className="font-body text-[11px] uppercase tracking-[0.25em] text-white/35 mt-3">
                  {stat.label}
                </p>
                {/* Decorative line under */}
                <div className="w-8 h-px bg-gradient-to-r from-transparent via-[#D4A843]/30 to-transparent mx-auto mt-4" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Why choose us content */}
      <div className="py-28 md:py-40 bg-[#F7F3ED] relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#00A651]/[0.02] blur-3xl" />

        <div className="container relative z-10">
          <BlurFade delay={0.1} className="text-center mb-20">
            <span className="inline-block font-body text-xs uppercase tracking-[0.4em] text-[#D4A843] font-medium mb-4 px-4 py-1.5 border border-[#D4A843]/20 rounded-full">
              ¿Por Qué Elegirnos?
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-[#2C2C2C] mt-4">
              Confianza y
            </h2>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mt-1">
              <span className="italic bg-gradient-to-r from-[#00A651] to-[#33B872] bg-clip-text text-transparent">
                Excelencia
              </span>
            </h2>
          </BlurFade>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {reasons.map((reason, i) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + i * 0.12,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
              >
                <GlassmorphismCard
                  variant="light"
                  className="p-8 h-full"
                  hoverGlow
                >
                  <div className="w-14 h-14 rounded-xl bg-[#00A651]/8 flex items-center justify-center mb-6 transition-all duration-500">
                    <reason.icon className="w-6 h-6 text-[#00A651]" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-[#2C2C2C] mb-3">
                    {reason.title}
                  </h3>
                  <p className="font-body text-base text-[#2C2C2C]/55 leading-relaxed">
                    {reason.desc}
                  </p>
                </GlassmorphismCard>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
