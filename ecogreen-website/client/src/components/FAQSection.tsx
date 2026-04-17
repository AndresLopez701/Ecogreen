/*
 * FAQSection - Ultra Pro EcoGreen
 * Accordion FAQ with smooth spring animations, rotating +/x icons,
 * staggered reveals on scroll
 * Design: Hacienda Digital — premium, warm, exclusive
 */

import BlurFade from "@/components/animations/BlurFade";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "¿Qué incluye exactamente cada unidad sanitaria?",
    a: "Cada unidad viene equipada con inodoro de porcelana, lavamanos automáticos, espejo, aire acondicionado, iluminación LED regulable, dispensador de jabón, papel higiénico premium y ambientador automático. Todo listo para que sus invitados vivan una experiencia de cinco estrellas.",
  },
  {
    q: "¿Las unidades necesitan conexión de agua o electricidad del lugar?",
    a: "Lo único que requerimos es acceso a un punto de agua para realizar el llenado inicial de nuestro tanque incorporado, y una conexión eléctrica de 110V. Del resto nos encargamos nosotros, sin complicaciones adicionales para usted.",
  },
  {
    q: "¿Hacen mantenimiento durante el evento?",
    a: "¡Por supuesto! Nuestro servicio incluye una operaria dedicada, encargada de mantener las unidades en perfectas condiciones durante todo el evento. Su tranquilidad y la experiencia de sus invitados son nuestra prioridad.",
  },
  {
    q: "¿Con cuánta anticipación debo reservar?",
    a: "Recomendamos reservar con mínimo 15 días de anticipación. En temporada alta y para fechas especiales como bodas, sugerimos hacerlo con al menos 4 semanas de anticipación para garantizar disponibilidad.",
  },
  {
    q: "¿Prestan servicio a nivel nacional?",
    a: "Llegamos a casi cualquier ciudad del país, contáctenos y lo planeamos juntos.",
  },
];

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.15 + index * 0.08,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      className="border-b border-[#0E1A12]/[0.08] last:border-b-0"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left group"
        aria-expanded={isOpen}
      >
        <span className="font-display text-base md:text-lg lg:text-xl font-semibold text-[#0E1A12] pr-4 md:pr-8 group-hover:text-[#00A651] transition-colors duration-300">
          {faq.q}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 15 }}
          className="flex-shrink-0 w-10 h-10 rounded-full bg-[#00A651]/[0.12] flex items-center justify-center group-hover:bg-[#00A651]/20 transition-colors duration-300"
        >
          <Plus className="w-5 h-5 text-[#00A651]" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.4, type: "spring", stiffness: 100, damping: 18 },
              opacity: { duration: 0.25, delay: isOpen ? 0.1 : 0 },
            }}
            className="overflow-hidden"
          >
            <p className="font-body text-base text-[#0E1A12]/60 leading-relaxed pb-6 pr-4 md:pr-16">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-28 md:py-40 bg-[#F7F4EF] relative overflow-hidden" ref={ref}>

      <div className="container relative z-10">
        {/* Section header */}
        <BlurFade delay={0.1} className="text-center mb-20">
          <span className="inline-block font-body text-xs uppercase tracking-[0.4em] text-[#D4A843] font-medium mb-4 px-4 py-1.5 border border-[#D4A843]/40 rounded-full">
            FAQ
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-[#0E1A12] mt-4">
            Preguntas
          </h2>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mt-1">
            <span className="italic bg-gradient-to-r from-[#00A651] to-[#33B872] bg-clip-text text-transparent">
              Frecuentes
            </span>
          </h2>
        </BlurFade>

        {/* Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white border border-[#0E1A12]/[0.07] rounded-2xl px-4 sm:px-8 md:px-12 shadow-[0_4px_30px_rgba(0,0,0,0.06)]">
            {isInView &&
              faqs.map((faq, i) => (
                <FAQItem
                  key={i}
                  faq={faq}
                  index={i}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
