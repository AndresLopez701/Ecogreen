/*
 * AboutSection - Ultra Pro EcoGreen
 * Parallax image, blur-fade text, animated value icons with glow,
 * decorative line accents, staggered reveals
 * Design: Hacienda Digital — premium, warm, exclusive
 */

import BlurFade from "@/components/animations/BlurFade";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
// ParallaxImage replaced by ImageSlideshow
import { Leaf, Award, Heart } from "lucide-react";

const slides = [
  { src: "/imgs/interior.jpg",        label: "Interior Premium" },
  { src: "/imgs/interior2.jpg",       label: "Acabados de Lujo" },
  { src: "/imgs/interior3.jpg",       label: "Iluminación Ambiental" },
  { src: "/imgs/unidad-abierta.jpg",  label: "Vista Exterior" },
  { src: "/imgs/unidad-exterior-1.jpg", label: "Diseño Elegante" },
  { src: "/imgs/boda1.jpg",           label: "En Eventos Reales" },
];

const values = [
  {
    icon: Leaf,
    title: "Eco-Amigable",
    desc: "Soluciones sostenibles que cuidan el medio ambiente sin sacrificar la calidad.",
    color: "#00A651",
  },
  {
    icon: Award,
    title: "Calidad Premium",
    desc: "Acabados de lujo, limpieza impecable y mantenimiento constante en cada unidad.",
    color: "#D4A843",
  },
  {
    icon: Heart,
    title: "Servicio Dedicado",
    desc: "Atención personalizada para que cada detalle de su evento sea perfecto.",
    color: "#00A651",
  },
];

function ImageSlideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* Crossfading images */}
      {slides.map((slide, i) => (
        <motion.div
          key={slide.src}
          className="absolute inset-0"
          animate={{ opacity: i === current ? 1 : 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <img
            src={slide.src}
            alt={slide.label}
            loading={i === 0 ? "eager" : "lazy"}
            className="w-full h-full object-cover"
          />
        </motion.div>
      ))}

      {/* Label bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/50 to-transparent px-6 py-4">
        <AnimatePresence mode="wait">
          <motion.span
            key={current}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="font-body text-xs uppercase tracking-[0.25em] text-white/70"
          >
            {slides[current].label}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-4 right-5 z-10 flex gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "bg-white w-4" : "bg-white/30"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="nosotros"
      className="py-28 md:py-40 bg-[#F7F4EF] relative overflow-hidden"
      ref={ref}
    >
      {/* Subtle top/bottom edge lines */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4A843]/30 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4A843]/30 to-transparent" />

      <div className="container relative z-10">
        {/* Section header */}
        <BlurFade delay={0.1} className="text-center mb-20">
          <span className="inline-block font-body text-xs uppercase tracking-[0.4em] text-[#D4A843] font-medium mb-4 px-4 py-1.5 border border-[#D4A843]/40 rounded-full">
            Sobre Nosotros
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-[#0E1A12] mt-4">
            Más que un Servicio,
          </h2>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mt-1">
            <span className="italic bg-gradient-to-r from-[#00A651] to-[#33B872] bg-clip-text text-transparent">
              una Experiencia
            </span>
          </h2>
        </BlurFade>

        {/* Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Auto-cycling image slideshow */}
          <BlurFade delay={0.2}>
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.12)] h-[520px] md:h-[580px]">
                <ImageSlideshow />
              </div>
              {/* Decorative frame */}
              <div className="absolute -bottom-5 -right-5 w-full h-full border-2 border-[#D4A843]/25 rounded-2xl -z-10" />
            </div>
          </BlurFade>

          {/* Text content */}
          <div>
            <BlurFade delay={0.3}>
              <p className="font-body text-lg text-[#0E1A12]/65 leading-[1.8] mb-6">
                En <strong className="text-[#00A651] font-semibold">EcoGreen Soluciones</strong>,
                redefinimos el concepto de lujo en eventos al aire libre.
                Nuestras unidades no son baños portátiles — son espacios de lujo
                con aire acondicionado, iluminación ambiental y acabados premium.
              </p>
            </BlurFade>

            <BlurFade delay={0.4}>
              <p className="font-body text-lg text-[#0E1A12]/65 leading-[1.8] mb-12">
                Con sede en <strong className="text-[#00A651] font-semibold">Cali, Colombia</strong>
                {" "}y más de <strong className="text-[#0E1A12] font-semibold">7 años de experiencia</strong>,
                hemos estado presentes en más de{" "}
                <strong className="text-[#0E1A12] font-semibold">400 eventos</strong> — desde
                bodas de élite hasta festivales internacionales. Cada detalle
                de su evento importa. Incluso los que nadie espera.
              </p>
            </BlurFade>

            {/* Values with animated icons */}
            <div className="space-y-6">
              {values.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.5 + i * 0.15,
                    type: "spring",
                    stiffness: 100,
                  }}
                  className="flex items-start gap-5 group"
                >
                  <div
                    className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                    style={{
                      background: `${item.color}12`,
                      boxShadow: `0 0 0 0 ${item.color}00`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 25px ${item.color}20`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 0 0 ${item.color}00`;
                    }}
                  >
                    <item.icon className="w-6 h-6" style={{ color: item.color }} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-[#0E1A12] mb-1">
                      {item.title}
                    </h3>
                    <p className="font-body text-base text-[#0E1A12]/55 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Closing quote */}
            <BlurFade delay={0.9}>
              <div className="mt-12 pt-10 border-t border-[#0E1A12]/10">
                <p className="font-display text-xl md:text-2xl italic text-[#0E1A12]/45 leading-snug">
                  "Sus invitados merecen lo mejor —{" "}
                  <span className="text-[#D4A843]/80">hasta en los detalles que no esperan."</span>
                </p>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  );
}
