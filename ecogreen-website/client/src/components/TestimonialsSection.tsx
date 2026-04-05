/*
 * TestimonialsSection - Ultra Pro EcoGreen
 * Auto-sliding testimonial carousel with fade transitions,
 * star ratings, decorative quote marks, navigation dots
 * Design: Hacienda Digital — premium, warm, exclusive
 */

import BlurFade from "@/components/animations/BlurFade";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Llevo 6 años organizando bodas en el Valle del Cauca y EcoGreen es el único proveedor al que llamo sin pensarlo dos veces. Para la boda de Valentina y Sebastián en Hacienda El Refugio, instalaron dos unidades para 180 personas y todo fue perfecto. Los novios me mandaron un mensaje especial agradeciéndome por ese detalle.",
    name: "María Fernanda Ospina",
    role: "Organizadora de Eventos",
    event: "La Flor Dorada Eventos · Jamundí",
    stars: 5,
    initials: "MF",
  },
  {
    quote:
      "Mi esposa y yo estábamos escépticos con los baños portátiles. Nuestros invitados vinieron desde Bogotá y queríamos que todo fuera de primera. EcoGreen nos sorprendió por completo: aire acondicionado, música suave, olían increíble. Más de 10 personas nos pidieron el contacto esa misma noche.",
    name: "Andrés Felipe Castaño",
    role: "Cliente — Boda",
    event: "Finca La Esperanza · Palmira",
    stars: 5,
    initials: "AF",
  },
  {
    quote:
      "Para nuestro congreso de 400 personas necesitábamos soluciones sanitarias adicionales de inmediato. EcoGreen respondió en menos de dos horas, cotizaron ese mismo día y ejecutaron sin un solo inconveniente. Ya los tenemos como proveedor oficial para todos nuestros eventos del año.",
    name: "Juliana Castaño Montoya",
    role: "Coordinadora de Logística",
    event: "Corporación Fenalco Valle",
    stars: 5,
    initials: "JC",
  },
  {
    quote:
      "Produzco eventos desde hace 8 años y sé reconocer un servicio de clase. EcoGreen llega cuando dice que llega, las unidades lucen exactamente como en las fotos y su personal es discreto y profesional. Ahora los incluyo como recomendación obligatoria a todos mis clientes.",
    name: "Diego Salcedo Ríos",
    role: "DJ & Productor",
    event: "Salcedo Events · Cali",
    stars: 5,
    initials: "DS",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 60 : -60,
      filter: "blur(8px)",
    }),
    center: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -60 : 60,
      filter: "blur(8px)",
    }),
  };

  return (
    <section className="py-28 md:py-40 bg-[#2C2C2C] relative overflow-hidden">
      {/* Subtle grain */}

      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#D4A843]/[0.03] blur-3xl" />

      <div className="container relative z-10">
        {/* Section header */}
        <BlurFade delay={0.1} className="text-center mb-20">
          <span className="inline-block font-body text-xs uppercase tracking-[0.4em] text-[#D4A843] font-medium mb-4 px-4 py-1.5 border border-[#D4A843]/20 rounded-full">
            Testimonios
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-white mt-4">
            Lo que Dicen
          </h2>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mt-1">
            <span className="italic bg-gradient-to-r from-[#D4A843] to-[#E0C06A] bg-clip-text text-transparent">
              Nuestros Clientes
            </span>
          </h2>
        </BlurFade>

        {/* Carousel */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative min-h-[280px] md:min-h-[240px] flex items-center justify-center">
            {/* Large decorative quotes */}
            <span className="absolute -top-4 left-0 md:left-8 font-display text-[120px] md:text-[160px] leading-none text-[#D4A843]/8 select-none pointer-events-none">
              &ldquo;
            </span>
            <span className="absolute -bottom-16 right-0 md:right-8 font-display text-[120px] md:text-[160px] leading-none text-[#D4A843]/8 select-none pointer-events-none rotate-180">
              &ldquo;
            </span>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.5,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
                className="absolute inset-0 flex flex-col items-center justify-center px-4"
              >
                {/* Stars */}
                <div className="flex gap-1.5 mb-8">
                  {Array.from({ length: testimonials[current].stars }).map(
                    (_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-[#D4A843] fill-[#D4A843]"
                      />
                    )
                  )}
                </div>

                {/* Quote text */}
                <blockquote className="font-display text-xl md:text-2xl lg:text-3xl italic text-white/85 leading-relaxed relative z-10">
                  {testimonials[current].quote}
                </blockquote>

                {/* Divider */}
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#D4A843] to-transparent mx-auto mt-8 mb-6" />

                {/* Attribution */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#D4A843] to-[#C49A30] flex items-center justify-center shadow-[0_0_20px_rgba(212,168,67,0.25)]">
                    <span className="font-display text-sm font-bold text-white">
                      {testimonials[current].initials}
                    </span>
                  </div>
                  <p className="font-display text-base font-semibold text-white/80">
                    {testimonials[current].name}
                  </p>
                  <p className="font-body text-xs text-[#D4A843]/70 font-medium">
                    {testimonials[current].role}
                  </p>
                  <p className="font-body text-xs uppercase tracking-[0.2em] text-white/30 mt-0.5">
                    {testimonials[current].event}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-3 mt-16">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`transition-all duration-500 rounded-full ${
                  i === current
                    ? "w-8 h-2.5 bg-[#D4A843]"
                    : "w-2.5 h-2.5 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Ir al testimonio ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
