/*
 * HowItWorksSection - Ultra Pro EcoGreen
 * 4-step process timeline with numbered circles, connecting lines,
 * staggered scroll animations, responsive layout
 * Design: Hacienda Digital — premium, warm, exclusive
 */

import BlurFade from "@/components/animations/BlurFade";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, ClipboardList, Truck, PartyPopper } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    number: 1,
    title: "Cotización",
    desc: "Contáctenos por WhatsApp o formulario con los detalles de su evento.",
  },
  {
    icon: ClipboardList,
    number: 2,
    title: "Planificación",
    desc: "Evaluamos sus necesidades y recomendamos las unidades perfectas.",
  },
  {
    icon: Truck,
    number: 3,
    title: "Instalación",
    desc: "Instalamos todo antes de su evento con puntualidad garantizada.",
  },
  {
    icon: PartyPopper,
    number: 4,
    title: "Disfrute",
    desc: "Relájese y disfrute. Nos encargamos del mantenimiento durante todo el evento.",
  },
];

export default function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-28 md:py-40 bg-[#F7F3ED] relative overflow-hidden" ref={ref}>
      {/* Subtle decorative circles */}
      <div className="absolute top-20 left-0 w-[500px] h-[500px] rounded-full bg-[#00A651]/[0.04] blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#00A651]/[0.03] blur-3xl" />

      <div className="container relative z-10">
        {/* Section header */}
        <BlurFade delay={0.1} className="text-center mb-20">
          <span className="inline-block font-body text-xs uppercase tracking-[0.4em] text-[#00A651] font-medium mb-4 px-4 py-1.5 border border-[#00A651]/20 rounded-full">
            Nuestro Proceso
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-[#2C2C2C] mt-4">
            Cómo
          </h2>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mt-1">
            <span className="italic bg-gradient-to-r from-[#00A651] to-[#33B872] bg-clip-text text-transparent">
              Funciona
            </span>
          </h2>
        </BlurFade>

        {/* Desktop timeline (horizontal) */}
        <div className="hidden md:block">
          <div className="relative max-w-5xl mx-auto">
            {/* Connecting line */}
            <motion.div
              className="absolute top-[52px] left-[12%] right-[12%] h-px bg-gradient-to-r from-[#00A651]/10 via-[#00A651]/30 to-[#00A651]/10"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              style={{ originX: 0 }}
            />

            <div className="grid grid-cols-4 gap-8">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + i * 0.2,
                    type: "spring",
                    stiffness: 80,
                    damping: 15,
                  }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Icon circle */}
                  <div className="relative mb-8">
                    <div className="w-[104px] h-[104px] rounded-full bg-[#00A651]/8 flex items-center justify-center transition-all duration-500 hover:bg-[#00A651]/12 hover:shadow-[0_0_30px_rgba(0,166,81,0.15)]">
                      <step.icon className="w-8 h-8 text-[#00A651]" />
                    </div>
                    {/* Number badge */}
                    <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-[#00A651] flex items-center justify-center shadow-md">
                      <span className="font-display text-sm font-bold text-white">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-display text-xl font-semibold text-[#2C2C2C] mb-3">
                    {step.title}
                  </h3>
                  <p className="font-body text-sm text-[#2C2C2C]/55 leading-relaxed max-w-[220px]">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile timeline (vertical) */}
        <div className="md:hidden">
          <div className="relative max-w-sm mx-auto">
            {/* Vertical connecting line */}
            <motion.div
              className="absolute left-[35px] top-0 bottom-0 w-px bg-gradient-to-b from-[#00A651]/10 via-[#00A651]/30 to-[#00A651]/10"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              style={{ originY: 0 }}
            />

            <div className="space-y-10">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + i * 0.2,
                    type: "spring",
                    stiffness: 80,
                    damping: 15,
                  }}
                  className="flex items-start gap-6"
                >
                  {/* Icon circle */}
                  <div className="relative flex-shrink-0">
                    <div className="w-[72px] h-[72px] rounded-full bg-[#00A651]/8 flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-[#00A651]" />
                    </div>
                    {/* Number badge */}
                    <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-[#00A651] flex items-center justify-center shadow-md">
                      <span className="font-display text-xs font-bold text-white">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3">
                    <h3 className="font-display text-lg font-semibold text-[#2C2C2C] mb-2">
                      {step.title}
                    </h3>
                    <p className="font-body text-sm text-[#2C2C2C]/55 leading-relaxed">
                      {step.desc}
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
