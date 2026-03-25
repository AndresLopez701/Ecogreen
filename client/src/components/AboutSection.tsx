/*
 * AboutSection - Ultra Pro EcoGreen
 * Parallax image, blur-fade text, animated value icons with glow,
 * decorative line accents, staggered reveals
 * Design: Hacienda Digital — premium, warm, exclusive
 */

import BlurFade from "@/components/animations/BlurFade";
import ParallaxImage from "@/components/animations/ParallaxImage";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Leaf, Award, Heart } from "lucide-react";

const INTERIOR_IMG = "/images/interior-luxury.png";

const values = [
  {
    icon: Leaf,
    title: "Eco-Amigable",
    desc: "Soluciones sostenibles que cuidan el medio ambiente sin sacrificar la calidad.",
    color: "#00B140",
  },
  {
    icon: Award,
    title: "Calidad Premium",
    desc: "Acabados de lujo, limpieza impecable y mantenimiento constante en cada unidad.",
    color: "#00D154",
  },
  {
    icon: Heart,
    title: "Servicio Dedicado",
    desc: "Atención personalizada para que cada detalle de su evento sea perfecto.",
    color: "#00B140",
  },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="nosotros"
      className="py-28 md:py-40 bg-[#F5F8F6] relative overflow-hidden"
      ref={ref}
    >
      {/* Subtle decorative circles */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-[#00B140]/[0.02] blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#00D154]/[0.03] blur-3xl" />

      <div className="container relative z-10">
        {/* Section header */}
        <BlurFade delay={0.1} className="text-center mb-20">
          <span className="inline-block font-body text-xs uppercase tracking-[0.4em] text-[#00D154] font-medium mb-4 px-4 py-1.5 border border-[#00D154]/20 rounded-full">
            Sobre Nosotros
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-[#0F1F14] mt-4">
            Más que un Servicio,
          </h2>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mt-1">
            <span className="italic bg-gradient-to-r from-[#00B140] to-[#33CC66] bg-clip-text text-transparent">
              una Experiencia
            </span>
          </h2>
        </BlurFade>

        {/* Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image with parallax */}
          <BlurFade delay={0.2}>
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.12)]">
                <ParallaxImage
                  src={INTERIOR_IMG}
                  alt="Interior de lujo de una unidad sanitaria EcoGreen"
                  className="h-[520px] md:h-[580px]"
                  speed={0.1}
                />
              </div>
              {/* Decorative frame */}
              <div className="absolute -bottom-5 -right-5 w-full h-full border-2 border-[#00D154]/15 rounded-2xl -z-10" />
              {/* Floating accent badge */}
              <motion.div
                className="absolute -top-4 -left-4 bg-[#00B140] text-white px-5 py-3 rounded-xl shadow-lg"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="font-display text-2xl font-bold">5+</span>
                <span className="font-body text-xs block text-white/70">Años</span>
              </motion.div>
            </div>
          </BlurFade>

          {/* Text content */}
          <div>
            <BlurFade delay={0.3}>
              <p className="font-body text-lg text-[#0F1F14]/70 leading-[1.8] mb-6">
                En <strong className="text-[#00B140] font-semibold">EcoGreen Soluciones</strong>,
                transformamos la experiencia sanitaria en eventos al aire libre. Desde bodas
                íntimas hasta grandes celebraciones corporativas, nuestras unidades portátiles
                de lujo ofrecen la comodidad y elegancia que sus invitados merecen.
              </p>
            </BlurFade>

            <BlurFade delay={0.4}>
              <p className="font-body text-lg text-[#0F1F14]/70 leading-[1.8] mb-12">
                Con sede en <strong className="text-[#00B140] font-semibold">Cali, Colombia</strong>,
                llevamos años brindando un servicio excepcional en los eventos más exclusivos
                del Valle del Cauca. Cada unidad cuenta con acabados premium, aire acondicionado,
                iluminación ambiental y productos de higiene de primera calidad.
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
                    <h3 className="font-display text-xl font-semibold text-[#0F1F14] mb-1">
                      {item.title}
                    </h3>
                    <p className="font-body text-base text-[#0F1F14]/60 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
