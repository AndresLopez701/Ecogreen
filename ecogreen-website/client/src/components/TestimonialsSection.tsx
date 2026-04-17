/*
 * TestimonialsSection — Google Reviews reales
 * Badge agregado + carousel con cards estilo Google
 * 4 reseñas verificadas · 5.0 ★
 */

import BlurFade from "@/components/animations/BlurFade";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/Ecogreen+soluciones/@-35.2643897,-45,4z/data=!4m8!3m7!1s0xab1432ecf9505361:0xfe60f26d1c471741!8m2!3d5.9219138!4d-74.3390061!9m1!1b1!16s%2Fg%2F11nc2hgtjx?entry=ttu";

const testimonials = [
  {
    quote:
      "Excelente servicio. Los baños portátiles están muy limpios, en perfecto estado y con muy buena presentación. El equipo es puntual, profesional y siempre atento durante el evento. Sin duda, una opción confiable y totalmente recomendada.",
    name: "Juan Felipe Molano Vega",
    avatarColor: "#4285F4",
    initials: "JF",
  },
  {
    quote:
      "Excelente servicio, los baños son muy hermosos, siempre están impecables durante el evento y las operarias tienen muy buena actitud y atención. Muy recomendados 👏",
    name: "Santiago Vernaza Bermúdez",
    avatarColor: "#0F9D58",
    initials: "SV",
  },
  {
    quote:
      "Los contraté para un evento musical y la verdad se lucieron. Sus baños muy limpios y los invitados quedaron fascinados con el servicio.",
    name: "Andrés Felipe Ballesteros",
    avatarColor: "#DB4437",
    initials: "AB",
  },
  {
    quote:
      "Excelente, los baños portátiles en excelente estado, muy bonitos. Respecto al servicio, muy profesionales y pendientes con todo. ¡Super recomendados!",
    name: "Matias Otero Álvarez",
    avatarColor: "#F4B400",
    initials: "MO",
  },
];

// ── Google G Logo ────────────────────────────────────────────────
function GoogleIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

// ── Stars ────────────────────────────────────────────────────────
function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#FBBC05">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

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

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 50 : -50, filter: "blur(6px)" }),
    center: { opacity: 1, x: 0, filter: "blur(0px)" },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -50 : 50, filter: "blur(6px)" }),
  };

  return (
    <section className="py-28 md:py-40 bg-[#F7F4EF] relative overflow-hidden">
      <div className="container relative z-10">

        {/* ── Header ── */}
        <BlurFade delay={0.1} className="text-center mb-12">
          <span className="inline-block font-body text-xs uppercase tracking-[0.4em] text-[#D4A843] font-medium mb-4 px-4 py-1.5 border border-[#D4A843]/40 rounded-full">
            Testimonios
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-[#0E1A12] mt-4">
            Lo que Dicen
          </h2>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mt-1">
            <span className="italic bg-gradient-to-r from-[#D4A843] to-[#E0C06A] bg-clip-text text-transparent">
              Nuestros Clientes
            </span>
          </h2>
        </BlurFade>

        {/* ── Google Aggregate Badge ── */}
        <BlurFade delay={0.2} className="flex justify-center mb-14">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white border border-[#0E1A12]/08 rounded-2xl px-6 py-4 shadow-[0_2px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_30px_rgba(0,0,0,0.10)] transition-all duration-300 group"
          >
            <GoogleIcon size={22} />
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2">
                <span className="font-display text-xl font-bold text-[#0E1A12] leading-none">5.0</span>
                <Stars />
              </div>
              <span className="font-body text-xs text-[#0E1A12]/40 mt-1">
                Reseñas verificadas en Google
              </span>
            </div>
            <span className="ml-2 font-body text-xs text-[#0E1A12]/30 group-hover:text-[#4285F4] transition-colors duration-300">
              Ver todas →
            </span>
          </a>
        </BlurFade>

        {/* ── Carousel ── */}
        <div className="max-w-2xl mx-auto">
          <div className="relative min-h-[340px] md:min-h-[280px] flex items-center justify-center">

            {/* Decorative quote */}
            <span className="absolute -top-2 left-0 font-display text-[100px] leading-none text-[#D4A843]/15 select-none pointer-events-none">
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
                transition={{ duration: 0.45, ease: [0.25, 0.4, 0.25, 1] }}
                className="absolute inset-0 flex flex-col justify-center px-2"
              >
                {/* Card */}
                <div className="bg-white rounded-2xl px-8 py-8 shadow-[0_2px_24px_rgba(0,0,0,0.07)] border border-[#0E1A12]/[0.05]">
                  {/* Top row: stars + Google icon */}
                  <div className="flex items-center justify-between mb-5">
                    <Stars />
                    <GoogleIcon size={18} />
                  </div>

                  {/* Quote */}
                  <blockquote className="font-body text-base md:text-lg text-[#0E1A12]/70 leading-relaxed mb-6">
                    "{testimonials[current].quote}"
                  </blockquote>

                  {/* Divider */}
                  <div className="w-10 h-px bg-gradient-to-r from-[#D4A843]/60 to-transparent mb-5" />

                  {/* Attribution */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: testimonials[current].avatarColor }}
                    >
                      <span className="font-display text-sm font-bold text-white">
                        {testimonials[current].initials}
                      </span>
                    </div>
                    <div>
                      <p className="font-display text-sm font-semibold text-[#0E1A12]/80 leading-tight">
                        {testimonials[current].name}
                      </p>
                      <p className="font-body text-xs text-[#0E1A12]/35 mt-0.5">
                        Reseña en Google
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-2.5 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`transition-all duration-500 rounded-full ${
                  i === current
                    ? "w-7 h-2 bg-[#0E1A12]"
                    : "w-2 h-2 bg-[#0E1A12]/15 hover:bg-[#0E1A12]/30"
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
