/*
 * PackagesSection - EcoGreen
 * 3 tiers without prices — pure lead generation
 * Visitor sees value first, contacts to get quote
 * Design: Hacienda Digital — premium, warm, exclusive
 */

import BlurFade from "@/components/animations/BlurFade";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Crown, Sparkles, Zap } from "lucide-react";
import { WHATSAPP_NUMBER } from "@shared/const";

const packages = [
  {
    id: "esencial",
    icon: Zap,
    badge: "Eventos Íntimos",
    name: "Esencial",
    subtitle: "Hasta 100 personas",
    description: "La opción perfecta para reuniones privadas, celebraciones familiares y eventos íntimos donde la comodidad y la higiene son lo primero.",
    features: [
      "1 unidad sanitaria de lujo",
      "Instalación y desmontaje incluidos",
      "Insumos básicos (jabón, papel, ambientador)",
      "Revisión previa al evento",
      "Soporte telefónico durante el evento",
    ],
    highlight: false,
    ctaText: "Solicitar Cotización",
    accentColor: "#00A651",
  },
  {
    id: "premium",
    icon: Sparkles,
    badge: "Más Solicitado",
    name: "Premium",
    subtitle: "100 – 250 personas",
    description: "Nuestra propuesta más popular. Diseñada para bodas, quinceañeros y eventos corporativos donde la experiencia VIP es indispensable.",
    features: [
      "2 unidades sanitarias de lujo",
      "Personal de asistencia en sitio",
      "Insumos premium (jabón de lujo, toallas, aromatizante)",
      "Instalación con 3 horas de anticipación",
      "Mantenimiento continuo durante el evento",
      "Coordinación logística incluida",
    ],
    highlight: true,
    ctaText: "Solicitar Cotización",
    accentColor: "#D4A843",
  },
  {
    id: "elite",
    icon: Crown,
    badge: "Grandes Eventos",
    name: "Elite",
    subtitle: "250+ personas",
    description: "Solución a medida para festivales, congresos y grandes producciones. Capacidad ilimitada, logística dedicada y servicio de clase mundial.",
    features: [
      "3 o más unidades personalizadas",
      "Coordinador de logística dedicado",
      "Insumos de primera calidad repuestos en tiempo real",
      "Opción de branding personalizado",
      "Disponibilidad 24/7 durante el evento",
      "Evaluación previa del espacio sin costo",
    ],
    highlight: false,
    ctaText: "Solicitar Cotización",
    accentColor: "#00A651",
  },
];

export default function PackagesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const buildWhatsAppUrl = (packageName: string) => {
    const msg = `Hola, me interesa conocer más sobre el paquete *${packageName}* de EcoGreen. ¿Me pueden dar información y disponibilidad?`;
    return `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(msg)}&type=phone_number&app_absent=0`;
  };

  return (
    <section
      id="paquetes"
      className="py-28 md:py-40 bg-[#0A1510] relative overflow-hidden"
      ref={ref}
    >

      <div className="container relative z-10">
        {/* Section header */}
        <BlurFade delay={0.1} className="text-center mb-20">
          <span className="inline-block font-body text-xs uppercase tracking-[0.4em] text-[#D4A843] font-medium mb-4 px-4 py-1.5 border border-[#D4A843]/20 rounded-full">
            Nuestros Paquetes
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-white mt-4">
            La Solución Perfecta
          </h2>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mt-1">
            <span className="italic bg-gradient-to-r from-[#00A651] to-[#33B872] bg-clip-text text-transparent">
              para su Evento
            </span>
          </h2>
          <p className="font-body text-base text-white/45 max-w-xl mx-auto mt-6 leading-relaxed">
            Seleccione el paquete que mejor se adapte a su celebración y
            contáctenos para recibir una cotización personalizada sin compromiso.
          </p>
        </BlurFade>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {packages.map((pkg, i) => {
            const Icon = pkg.icon;
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.15 + i * 0.12,
                  type: "spring",
                  stiffness: 80,
                  damping: 16,
                }}
                className={`relative flex flex-col rounded-3xl overflow-hidden transition-all duration-500 group hover:-translate-y-2 ${
                  pkg.highlight
                    ? "bg-[#0E2A1C] shadow-[0_20px_60px_rgba(0,166,81,0.18)] border border-[#00A651]/20"
                    : "bg-white/5 border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
                }`}
              >
                {/* Popular badge ribbon */}
                {pkg.highlight && (
                  <div className="absolute top-6 right-6 bg-[#D4A843] text-white font-body text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full shadow-[0_4px_12px_rgba(212,168,67,0.35)]">
                    {pkg.badge}
                  </div>
                )}

                <div className="p-8 md:p-9 flex flex-col flex-1">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                      pkg.highlight
                        ? "bg-[#D4A843]/15"
                        : "bg-[#00A651]/[0.08]"
                    }`}
                  >
                    <Icon
                      className={`w-7 h-7 ${pkg.highlight ? "text-[#D4A843]" : "text-[#00A651]"}`}
                    />
                  </div>

                  {/* Badge (non-highlight) */}
                  {!pkg.highlight && (
                    <span className="font-body text-[10px] uppercase tracking-[0.3em] text-[#00A651] font-semibold mb-2">
                      {pkg.badge}
                    </span>
                  )}

                  {/* Name */}
                  <h3
                    className={`font-display text-3xl font-semibold mb-1 ${
                      pkg.highlight ? "text-white" : "text-white"
                    }`}
                  >
                    {pkg.name}
                  </h3>

                  {/* Subtitle */}
                  <p
                    className={`font-body text-sm font-medium mb-4 ${
                      pkg.highlight ? "text-[#D4A843]" : "text-[#00A651]"
                    }`}
                  >
                    {pkg.subtitle}
                  </p>

                  {/* Description */}
                  <p
                    className={`font-body text-sm leading-relaxed mb-8 ${
                      pkg.highlight ? "text-white/55" : "text-white/55"
                    }`}
                  >
                    {pkg.description}
                  </p>

                  {/* Divider */}
                  <div
                    className={`w-full h-px mb-8 ${
                      pkg.highlight ? "bg-white/[0.08]" : "bg-white/[0.08]"
                    }`}
                  />

                  {/* Features */}
                  <ul className="space-y-3.5 mb-10 flex-1">
                    {pkg.features.map((feat, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <div
                          className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 ${
                            pkg.highlight
                              ? "bg-[#D4A843]/15"
                              : "bg-[#00A651]/[0.1]"
                          }`}
                        >
                          <Check
                            className={`w-3 h-3 ${pkg.highlight ? "text-[#D4A843]" : "text-[#00A651]"}`}
                            strokeWidth={3}
                          />
                        </div>
                        <span
                          className={`font-body text-sm leading-snug ${
                            pkg.highlight ? "text-white/70" : "text-white/65"
                          }`}
                        >
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href={buildWhatsAppUrl(pkg.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full text-center font-body text-sm font-semibold py-4 rounded-xl uppercase tracking-[0.12em] transition-all duration-300 ${
                      pkg.highlight
                        ? "bg-[#D4A843] hover:bg-[#E0C06A] text-white shadow-[0_8px_24px_rgba(212,168,67,0.3)] hover:shadow-[0_12px_32px_rgba(212,168,67,0.4)]"
                        : "bg-[#00A651] hover:bg-[#00923F] text-white shadow-[0_8px_24px_rgba(0,166,81,0.2)] hover:shadow-[0_12px_32px_rgba(0,166,81,0.3)]"
                    }`}
                  >
                    {pkg.ctaText}
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom note */}
        <BlurFade delay={0.6} className="text-center mt-14">
          <p className="font-body text-sm text-white/40 max-w-lg mx-auto">
            Todos los paquetes son personalizables según la duración, número de
            invitados y necesidades específicas de su evento.{" "}
            <a
              href={`https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent("Hola, quiero cotizar un paquete personalizado para mi evento con EcoGreen.")}&type=phone_number&app_absent=0`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00A651] hover:underline font-medium"
            >
              Hablemos para encontrar la opción ideal.
            </a>
          </p>
        </BlurFade>
      </div>
    </section>
  );
}
