/*
 * ServicesSection - Ultra Pro EcoGreen
 * Dark charcoal with animated gradient orbs, glassmorphism cards,
 * staggered entrances, cursor-following glow, grain texture
 * Design: Hacienda Digital — premium, warm, exclusive
 */

import BlurFade from "@/components/animations/BlurFade";
import ImageWithSkeleton from "@/components/ImageWithSkeleton";
import GlassmorphismCard from "@/components/animations/GlassmorphismCard";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Crown, Users, Building2, PartyPopper, Sparkles, Truck, Trophy } from "lucide-react";

const LUXURY_TRAILER = "/imgs/boda-elegante.jpg";

const services = [
  {
    icon: Crown,
    title: "Unidades VIP",
    desc: "Tráileres sanitarios de lujo con acabados premium, aire acondicionado, espejo iluminado, lavamanos de mármol y amenidades de primera.",
  },
  {
    icon: Users,
    title: "Bodas y Celebraciones",
    desc: "Soluciones elegantes que se integran perfectamente con la decoración de su boda o celebración especial.",
  },
  {
    icon: Building2,
    title: "Eventos Corporativos",
    desc: "Unidades profesionales para conferencias, lanzamientos y eventos empresariales que reflejan su imagen.",
  },
  {
    icon: PartyPopper,
    title: "Fiestas Privadas",
    desc: "Desde reuniones íntimas hasta grandes fiestas, ofrecemos la capacidad y el estilo que su evento necesita.",
  },
  {
    icon: Trophy,
    title: "Eventos Deportivos",
    desc: "Torneos, maratones y competencias con soluciones sanitarias de alto flujo, rápidas de instalar y fáciles de mantener.",
  },
  {
    icon: Sparkles,
    title: "Limpieza Impecable",
    desc: "Cada unidad es entregada en condiciones impecables con servicio de mantenimiento durante todo el evento.",
  },
  {
    icon: Truck,
    title: "Entrega y Logística",
    desc: "Nos encargamos del transporte, instalación y retiro. Usted solo se preocupa por disfrutar su evento.",
  },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="servicios"
      className="py-28 md:py-40 bg-[#F7F4EF] relative overflow-hidden"
      ref={ref}
    >
      {/* Animated gradient background */}


      {/* Grain texture */}

      <div className="container relative z-10">
        {/* Section header */}
        <BlurFade delay={0.1} className="text-center mb-20">
          <span className="inline-block font-body text-xs uppercase tracking-[0.4em] text-[#D4A843] font-medium mb-4 px-4 py-1.5 border border-[#D4A843]/40 rounded-full">
            Nuestros Servicios
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-[#0E1A12] mt-4">
            Soluciones para
          </h2>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mt-1">
            <span className="italic bg-gradient-to-r from-[#D4A843] to-[#E0C06A] bg-clip-text text-transparent">
              Cada Evento
            </span>
          </h2>
          <p className="font-body text-base text-[#0E1A12]/50 max-w-xl mx-auto mt-6 leading-relaxed">
            Ofrecemos una gama completa de unidades sanitarias portátiles de lujo,
            adaptadas a las necesidades específicas de cada tipo de evento.
          </p>
        </BlurFade>

        {/* Featured image + services grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Featured image - spans 1 column on large */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:row-span-2 relative overflow-hidden rounded-2xl group"
          >
            <ImageWithSkeleton
              src={LUXURY_TRAILER}
              alt="Tráiler sanitario de lujo EcoGreen en evento"
              className="w-full h-full min-h-[400px] object-cover transition-transform duration-[1.2s] group-hover:scale-105"
              skeletonClassName="min-h-[400px] bg-gradient-to-r from-[#2a2a2a] via-[#333] to-[#2a2a2a]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1510]/80 via-[#0A1510]/20 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="font-display text-3xl font-semibold text-white">
                Unidades de Lujo
              </p>
              <p className="font-body text-sm text-white/50 mt-2">
                Diseñadas para los eventos más exclusivos
              </p>
              <div className="w-12 h-[2px] bg-gradient-to-r from-[#D4A843] to-transparent mt-4" />
            </div>
          </motion.div>

          {/* Service cards with glassmorphism */}
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.3 + i * 0.1,
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
            >
              <GlassmorphismCard
                variant="light"
                className="p-7 h-full bg-white border-[#0E1A12]/[0.07]"
              >
                <div className="w-12 h-12 rounded-xl bg-[#00A651]/15 flex items-center justify-center mb-5 transition-all duration-500 group-hover:bg-[#00A651]/25">
                  <service.icon className="w-5 h-5 text-[#D4A843]" />
                </div>
                <h3 className="font-display text-xl font-semibold text-[#0E1A12] mb-2">
                  {service.title}
                </h3>
                <p className="font-body text-sm text-[#0E1A12]/55 leading-relaxed">
                  {service.desc}
                </p>
              </GlassmorphismCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
