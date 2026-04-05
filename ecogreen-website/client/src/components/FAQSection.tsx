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
    a: "Cada unidad viene equipada con inodoro de porcelana, lavamanos con agua corriente, espejo de cuerpo completo, aire acondicionado, iluminación LED regulable, dispensador de jabón de lujo, toallas de mano desechables, papel higiénico premium y ambientador automático. Todo listo para que sus invitados vivan una experiencia de cinco estrellas.",
  },
  {
    q: "¿Cuántas unidades necesito para mi evento?",
    a: "Como referencia, recomendamos 1 unidad por cada 80–100 personas para eventos de hasta 6 horas. Para eventos más largos o con mayor flujo, ajustamos esa proporción. Al contactarnos, le damos una recomendación exacta según el número de invitados, la duración y el tipo de evento.",
  },
  {
    q: "¿Las unidades necesitan conexión de agua o electricidad del lugar?",
    a: "No. Nuestras unidades son 100% autónomas: tienen tanque de agua propio y funcionan sin conexión a la red eléctrica del lugar. Si el espacio cuenta con servicios disponibles, podemos conectarlas para mayor capacidad y comodidad.",
  },
  {
    q: "¿Cuánto tiempo antes llegan a instalar?",
    a: "Nuestro equipo llega entre 2 y 3 horas antes del evento para instalación, nivelación y verificación completa de cada unidad. Garantizamos que todo esté impecable antes de que llegue el primer invitado.",
  },
  {
    q: "¿Hacen mantenimiento durante el evento?",
    a: "Sí, para eventos desde cierto número de horas incluimos personal de asistencia que realiza mantenimiento periódico, repone insumos y atiende cualquier necesidad que surja. Su tranquilidad y la de sus invitados es nuestra prioridad.",
  },
  {
    q: "¿Con cuánta anticipación debo reservar?",
    a: "Recomendamos reservar con mínimo 15 días de anticipación. En temporada alta (diciembre, junio y julio) y para fechas especiales como bodas, sugerimos hacerlo con al menos 4 semanas de anticipación para garantizar disponibilidad.",
  },
  {
    q: "¿Prestan servicio fuera de Cali?",
    a: "Cubrimos toda el área metropolitana de Cali y el Valle del Cauca, incluyendo municipios como Palmira, Jamundí, Yumbo, Buenaventura y Tulúa. Para eventos fuera de esta zona, contáctenos y evaluamos la logística sin compromiso.",
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
      className="border-b border-[#2C2C2C]/8 last:border-b-0"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left group"
        aria-expanded={isOpen}
      >
        <span className="font-display text-lg md:text-xl font-semibold text-[#2C2C2C] pr-8 group-hover:text-[#00A651] transition-colors duration-300">
          {faq.q}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 15 }}
          className="flex-shrink-0 w-10 h-10 rounded-full bg-[#00A651]/8 flex items-center justify-center group-hover:bg-[#00A651]/12 transition-colors duration-300"
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
            <p className="font-body text-base text-[#2C2C2C]/60 leading-relaxed pb-6 pr-16">
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
    <section className="py-28 md:py-40 bg-[#F7F3ED] relative overflow-hidden" ref={ref}>
      {/* Subtle decorative circles */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#00A651]/[0.02] blur-3xl" />
      <div className="absolute bottom-20 left-0 w-[400px] h-[400px] rounded-full bg-[#D4A843]/[0.03] blur-3xl" />

      <div className="container relative z-10">
        {/* Section header */}
        <BlurFade delay={0.1} className="text-center mb-20">
          <span className="inline-block font-body text-xs uppercase tracking-[0.4em] text-[#D4A843] font-medium mb-4 px-4 py-1.5 border border-[#D4A843]/20 rounded-full">
            FAQ
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-[#2C2C2C] mt-4">
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
          <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl px-8 md:px-12 shadow-[0_8px_40px_rgba(0,0,0,0.04)]">
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
