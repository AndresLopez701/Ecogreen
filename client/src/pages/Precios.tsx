/*
 * Precios Page - EcoGreen Soluciones
 * Interactive pricing tiers with 3D tilt hover, glassmorphism,
 * FAQ accordion, WhatsApp CTAs
 * Design: Hacienda Digital — premium, warm, exclusive
 */

import { useState, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Check, ChevronDown, Crown, Star, Gem, Sparkles, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BlurFade from "@/components/animations/BlurFade";
import AnimatedGradientBg from "@/components/animations/AnimatedGradientBg";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=573118730396&text=Hola%2C+quiero+cotizar+una+unidad+sanitaria+de+lujo+para+mi+evento&type=phone_number&app_absent=0";

function buildWhatsAppUrl(plan: string) {
  const msg = encodeURIComponent(
    `Hola, estoy interesado en el paquete ${plan} de EcoGreen para mi evento. ¿Me pueden dar más información?`
  );
  return `https://api.whatsapp.com/send/?phone=573118730396&text=${msg}&type=phone_number&app_absent=0`;
}

interface PricingTier {
  name: string;
  icon: typeof Crown;
  tagline: string;
  description: string;
  features: string[];
  highlight: boolean;
  gradient: string;
  iconColor: string;
  borderColor: string;
}

const tiers: PricingTier[] = [
  {
    name: "Estándar",
    icon: Star,
    tagline: "Lo esencial",
    description:
      "Unidad portátil individual de lujo, perfecta para eventos de hasta 80 invitados. Incluye acabados premium y productos de aseo de primera calidad.",
    features: [
      "Unidad portátil individual de lujo",
      "Lavamanos con agua caliente y fría",
      "Espejo con iluminación LED",
      "Productos de higiene premium",
      "Ambientador profesional",
      "Entrega e instalación incluida",
      "Retiro post-evento",
    ],
    highlight: false,
    gradient: "from-[#00B140] to-[#33CC66]",
    iconColor: "#00B140",
    borderColor: "border-[#00B140]/10",
  },
  {
    name: "Premium",
    icon: Crown,
    tagline: "El más popular",
    description:
      "Tráiler sanitario con 2 estaciones independientes, ideal para eventos de hasta 200 invitados. Aire acondicionado y amenidades de hotel 5 estrellas.",
    features: [
      "Tráiler con 2 estaciones completas",
      "Aire acondicionado integrado",
      "Lavamanos de mármol",
      "Música ambiental con Bluetooth",
      "Amenidades de hotel 5 estrellas",
      "Iluminación ambiental LED",
      "Mantenimiento durante el evento",
      "Entrega, instalación y retiro",
    ],
    highlight: true,
    gradient: "from-[#00D154] to-[#33E070]",
    iconColor: "#00D154",
    borderColor: "border-[#00D154]/20",
  },
  {
    name: "VIP",
    icon: Gem,
    tagline: "Exclusivo",
    description:
      "Tráiler doble con 4+ estaciones, asistente dedicado y decoración personalizable. La experiencia definitiva para los eventos más exclusivos.",
    features: [
      "Tráiler doble con 4+ estaciones",
      "Asistente dedicado durante el evento",
      "Decoración personalizable",
      "Amenidades de spa de lujo",
      "Sistema de sonido premium",
      "Flores frescas y aromas exclusivos",
      "Toallas de tela individuales",
      "Mantenimiento continuo",
      "Logística completa puerta a puerta",
    ],
    highlight: false,
    gradient: "from-[#0F1F14] to-[#4a4a4a]",
    iconColor: "#00D154",
    borderColor: "border-white/10",
  },
];

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "¿Con cuánta anticipación debo reservar?",
    answer:
      "Recomendamos reservar con al menos 2 semanas de anticipación, especialmente en temporada alta (noviembre-enero y meses de bodas). Sin embargo, hacemos todo lo posible por acomodar solicitudes de último momento.",
  },
  {
    question: "¿Qué incluye el servicio de mantenimiento?",
    answer:
      "Nuestro equipo se asegura de que las unidades estén impecables durante todo el evento. Incluye reposición de insumos, limpieza periódica y atención a cualquier necesidad que surja.",
  },
  {
    question: "¿Puedo personalizar la decoración de las unidades?",
    answer:
      "¡Por supuesto! En nuestros paquetes Premium y VIP, ofrecemos opciones de personalización que incluyen arreglos florales, iluminación específica y aromas a su elección para que todo combine con la temática de su evento.",
  },
  {
    question: "¿Dónde prestan el servicio?",
    answer:
      "Operamos en toda la ciudad de Cali y el departamento del Valle del Cauca. Para eventos fuera de esta zona, contáctenos para evaluar la logística.",
  },
  {
    question: "¿Necesito conexión de agua o electricidad?",
    answer:
      "Nuestras unidades son completamente autónomas. Cuentan con tanques de agua propios y sistema eléctrico independiente, por lo que pueden instalarse en cualquier ubicación.",
  },
];

/* 3D Tilt Card Wrapper */
function TiltCard({
  children,
  className = "",
  highlight = false,
}: {
  children: React.ReactNode;
  className?: string;
  highlight?: boolean;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 20,
  });

  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      className={`relative ${className}`}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
    >
      {highlight && (
        <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-b from-[#00D154] via-[#00D154]/50 to-[#00D154]/10 -z-10" />
      )}
      {children}
    </motion.div>
  );
}

/* FAQ Accordion Item */
function FAQAccordionItem({ item, index }: { item: FAQItem; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      viewport={{ once: true }}
      className="border-b border-[#00B140]/10 last:border-b-0"
    >
      <button
        className="w-full flex items-center justify-between py-6 text-left group"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-display text-xl font-semibold text-[#0F1F14] group-hover:text-[#00B140] transition-colors pr-4">
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-[#00D154]" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: open ? "auto" : 0,
          opacity: open ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
        className="overflow-hidden"
      >
        <p className="font-body text-base text-[#0F1F14]/60 leading-relaxed pb-6">
          {item.answer}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function Precios() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 bg-[#0F1F14] overflow-hidden">
          <AnimatedGradientBg variant="dark" />
          <div className="absolute inset-0 grain-overlay" />

          <div className="container relative z-10 text-center">
            <BlurFade delay={0.2} yOffset={16}>
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="block w-8 h-px bg-gradient-to-r from-transparent to-[#00D154]" />
                <span className="font-body text-xs uppercase tracking-[0.4em] text-[#00D154] font-medium px-4 py-1.5 border border-[#00D154]/30 rounded-full backdrop-blur-sm bg-white/5">
                  Planes & Precios
                </span>
                <span className="block w-8 h-px bg-gradient-to-l from-transparent to-[#00D154]" />
              </div>
            </BlurFade>

            <BlurFade delay={0.4} yOffset={30}>
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-semibold text-white leading-[1.05] mb-3">
                El Paquete Perfecto
              </h1>
            </BlurFade>

            <BlurFade delay={0.6} yOffset={30}>
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-semibold leading-[1.05] mb-6">
                <span className="italic bg-gradient-to-r from-[#00D154] to-[#33E070] bg-clip-text text-transparent">
                  para su Evento
                </span>
              </h1>
            </BlurFade>

            <BlurFade delay={0.8} yOffset={20}>
              <p className="font-body text-base md:text-lg text-white/50 max-w-xl mx-auto leading-relaxed">
                Cada evento es único. Elija el plan que mejor se adapte a sus
                necesidades y permita que nosotros nos encarguemos del resto.
              </p>
            </BlurFade>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F5F8F6] to-transparent z-10" />
        </section>

        {/* Pricing Cards */}
        <section className="py-20 md:py-28 bg-[#F5F8F6] relative" ref={ref}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#00B140]/[0.02] blur-3xl" />

          <div className="container relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">
              {tiers.map((tier, i) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.15 + i * 0.15,
                    type: "spring",
                    stiffness: 80,
                  }}
                  className={tier.highlight ? "md:-mt-4 md:mb-[-16px]" : ""}
                >
                  <TiltCard highlight={tier.highlight}>
                    <div
                      className={`relative h-full rounded-3xl overflow-hidden flex flex-col ${
                        tier.name === "VIP"
                          ? "bg-[#0F1F14] text-white"
                          : "bg-white"
                      } ${tier.borderColor} border ${
                        tier.highlight ? "shadow-2xl shadow-[#00D154]/10" : "shadow-xl shadow-black/5"
                      }`}
                    >
                      {/* Popular badge */}
                      {tier.highlight && (
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00D154] to-[#33E070]" />
                      )}

                      <div className="p-8 md:p-10 flex flex-col flex-1">
                        {/* Header */}
                        <div className="mb-8">
                          {tier.highlight && (
                            <span className="inline-flex items-center gap-1.5 font-body text-[10px] uppercase tracking-[0.3em] text-[#00D154] font-bold mb-4 px-3 py-1 bg-[#00D154]/10 rounded-full">
                              <Sparkles className="w-3 h-3" />
                              Más Popular
                            </span>
                          )}
                          <div className="flex items-center gap-4 mb-4">
                            <div
                              className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                                tier.name === "VIP"
                                  ? "bg-white/[0.06]"
                                  : `bg-[${tier.iconColor}]/8`
                              }`}
                              style={{
                                background:
                                  tier.name === "VIP"
                                    ? "rgba(255,255,255,0.06)"
                                    : `${tier.iconColor}12`,
                              }}
                            >
                              <tier.icon
                                className="w-7 h-7"
                                style={{ color: tier.iconColor }}
                              />
                            </div>
                            <div>
                              <h3
                                className={`font-display text-3xl font-bold ${
                                  tier.name === "VIP"
                                    ? "text-white"
                                    : "text-[#0F1F14]"
                                }`}
                              >
                                {tier.name}
                              </h3>
                              <p
                                className={`font-body text-sm ${
                                  tier.name === "VIP"
                                    ? "text-white/40"
                                    : "text-[#0F1F14]/40"
                                }`}
                              >
                                {tier.tagline}
                              </p>
                            </div>
                          </div>
                          <p
                            className={`font-body text-sm leading-relaxed ${
                              tier.name === "VIP"
                                ? "text-white/50"
                                : "text-[#0F1F14]/55"
                            }`}
                          >
                            {tier.description}
                          </p>
                        </div>

                        {/* Features */}
                        <ul className="space-y-3 mb-10 flex-1">
                          {tier.features.map((feat) => (
                            <li key={feat} className="flex items-start gap-3">
                              <div
                                className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                  tier.name === "VIP"
                                    ? "bg-[#00D154]/20"
                                    : `bg-[${tier.iconColor}]/10`
                                }`}
                                style={{
                                  background:
                                    tier.name === "VIP"
                                      ? "rgba(193,127,89,0.2)"
                                      : `${tier.iconColor}14`,
                                }}
                              >
                                <Check
                                  className="w-3 h-3"
                                  style={{ color: tier.iconColor }}
                                />
                              </div>
                              <span
                                className={`font-body text-sm ${
                                  tier.name === "VIP"
                                    ? "text-white/65"
                                    : "text-[#0F1F14]/65"
                                }`}
                              >
                                {feat}
                              </span>
                            </li>
                          ))}
                        </ul>

                        {/* CTA */}
                        <a
                          href={buildWhatsAppUrl(tier.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-full inline-flex items-center justify-center gap-2 font-body text-sm font-semibold py-4 rounded-xl uppercase tracking-[0.15em] transition-all duration-500 ${
                            tier.highlight
                              ? "bg-[#00D154] hover:bg-[#33E070] text-white glow-terracotta"
                              : tier.name === "VIP"
                              ? "bg-white hover:bg-white/90 text-[#0F1F14]"
                              : "bg-[#00B140] hover:bg-[#00C853] text-white glow-olive"
                          }`}
                        >
                          <Phone className="w-4 h-4" />
                          Cotizar {tier.name}
                        </a>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>

            {/* Note */}
            <BlurFade delay={0.8} className="text-center mt-12">
              <p className="font-body text-sm text-[#0F1F14]/40 max-w-lg mx-auto">
                Todos los precios son cotizados según las necesidades
                específicas de su evento. Contáctenos para una propuesta
                personalizada.
              </p>
            </BlurFade>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 md:py-28 bg-[#F5F8F6] relative">
          <div className="container relative z-10 max-w-3xl mx-auto">
            <BlurFade delay={0.1} className="text-center mb-16">
              <span className="inline-block font-body text-xs uppercase tracking-[0.4em] text-[#00D154] font-medium mb-4 px-4 py-1.5 border border-[#00D154]/20 rounded-full">
                Preguntas Frecuentes
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-semibold text-[#0F1F14] mt-4">
                ¿Tiene Dudas?
              </h2>
              <h2 className="font-display text-4xl md:text-5xl font-semibold mt-1">
                <span className="italic bg-gradient-to-r from-[#00B140] to-[#33CC66] bg-clip-text text-transparent">
                  Le Respondemos
                </span>
              </h2>
            </BlurFade>

            <div className="bg-white rounded-2xl shadow-xl shadow-black/5 border border-[#00B140]/5 p-6 md:p-10">
              {faqs.map((faq, i) => (
                <FAQAccordionItem key={i} item={faq} index={i} />
              ))}
            </div>

            {/* Final CTA */}
            <BlurFade delay={0.5} className="text-center mt-16">
              <p className="font-body text-lg text-[#0F1F14]/60 mb-6">
                ¿Aún tiene preguntas? Estamos a un mensaje de distancia.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-body text-sm font-semibold px-10 py-4 rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(37,211,102,0.2)] uppercase tracking-wider"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Hablar con un Asesor
              </a>
            </BlurFade>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
