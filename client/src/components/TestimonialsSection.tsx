/*
 * TestimonialsSection - EcoGreen Soluciones
 * Auto-rotating testimonial carousel with star ratings,
 * manual navigation dots, animated card transitions
 * Design: Hacienda Digital — premium, warm, exclusive
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";
import BlurFade from "@/components/animations/BlurFade";

interface Testimonial {
  quote: string;
  name: string;
  event: string;
  rating: number;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Los baños de EcoGreen fueron la sorpresa del evento. Nuestros invitados no paraban de comentar lo elegantes y limpios que estaban. ¡Parecían de un hotel cinco estrellas!",
    name: "Carolina & Andrés",
    event: "Boda en Hacienda del Valle — 2025",
    rating: 5,
    initials: "CA",
  },
  {
    quote:
      "Para nuestro evento corporativo necesitábamos un servicio que reflejara la imagen de la empresa. EcoGreen superó todas nuestras expectativas con su puntualidad y profesionalismo.",
    name: "María Fernanda López",
    event: "Evento Corporativo — Cali, 2025",
    rating: 5,
    initials: "MF",
  },
  {
    quote:
      "Contraté el paquete VIP para los 15 años de mi hija y fue la mejor decisión. El asistente dedicado y los detalles como las flores frescas hicieron toda la diferencia.",
    name: "Sandra Martínez",
    event: "Fiesta de Quinceañera — Jamundí, 2025",
    rating: 5,
    initials: "SM",
  },
  {
    quote:
      "Organizamos un festival de 3 días y EcoGreen manejó toda la logística sanitaria impecablemente. Las unidades se mantuvieron limpias de principio a fin.",
    name: "Diego Ramírez",
    event: "Festival al Aire Libre — Valle del Cauca, 2024",
    rating: 5,
    initials: "DR",
  },
];

function StarRating({ rating, animate }: { rating: number; animate: boolean }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <motion.div
          key={i}
          initial={animate ? { scale: 0, opacity: 0 } : false}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: animate ? 0.4 + i * 0.08 : 0, duration: 0.3, type: "spring" }}
        >
          <Star
            className={`w-4 h-4 ${
              i < rating ? "text-[#00D154] fill-[#00D154]" : "text-[#00D154]/20"
            }`}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  // Auto-rotation
  useEffect(() => {
    if (!isInView) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isInView]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.95,
    }),
  };

  const t = testimonials[current];

  return (
    <section
      className="py-28 md:py-40 bg-[#0F1F14] relative overflow-hidden"
      ref={ref}
    >
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-[300px] h-[300px] rounded-full bg-[#00D154]/[0.03] blur-3xl" />
      <div className="absolute bottom-20 right-10 w-[400px] h-[400px] rounded-full bg-[#00B140]/[0.05] blur-3xl" />
      <div className="absolute inset-0 grain-overlay" />

      <div className="container relative z-10">
        {/* Section header */}
        <BlurFade delay={0.1} className="text-center mb-20">
          <span className="inline-block font-body text-xs uppercase tracking-[0.4em] text-[#00D154] font-medium mb-4 px-4 py-1.5 border border-[#00D154]/20 rounded-full backdrop-blur-sm">
            Testimonios
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-white mt-4">
            Lo que Dicen
          </h2>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mt-1">
            <span className="italic bg-gradient-to-r from-[#00D154] to-[#33E070] bg-clip-text text-transparent">
              Nuestros Clientes
            </span>
          </h2>
        </BlurFade>

        {/* Testimonial carousel */}
        <div className="max-w-3xl mx-auto">
          <div className="relative min-h-[320px] md:min-h-[280px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.5,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
                className="absolute inset-0"
              >
                <div className="relative bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-3xl p-8 md:p-12 text-center">
                  {/* Decorative quote */}
                  <div className="flex justify-center mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#00D154]/10 flex items-center justify-center">
                      <Quote className="w-6 h-6 text-[#00D154]" />
                    </div>
                  </div>

                  {/* Quote text */}
                  <blockquote className="font-display text-xl md:text-2xl italic text-white/80 leading-relaxed mb-8">
                    "{t.quote}"
                  </blockquote>

                  {/* Stars */}
                  <div className="flex justify-center mb-6">
                    <StarRating rating={t.rating} animate={true} />
                  </div>

                  {/* Author */}
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00B140] to-[#00D154] flex items-center justify-center">
                      <span className="font-body text-sm font-bold text-white">
                        {t.initials}
                      </span>
                    </div>
                    <div className="text-left">
                      <p className="font-body text-sm font-semibold text-white">
                        {t.name}
                      </p>
                      <p className="font-body text-xs text-white/40">
                        {t.event}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation dots */}
          <div className="flex items-center justify-center gap-3 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Testimonio ${i + 1}`}
                className="relative p-1"
              >
                <motion.div
                  className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                    i === current
                      ? "bg-[#00D154]"
                      : "bg-white/15 hover:bg-white/30"
                  }`}
                  animate={
                    i === current
                      ? { scale: [1, 1.3, 1] }
                      : { scale: 1 }
                  }
                  transition={{ duration: 0.4 }}
                />
                {i === current && (
                  <motion.div
                    className="absolute inset-0 rounded-full border border-[#00D154]/40"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1.8, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ margin: "-2px" }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
