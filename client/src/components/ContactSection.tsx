/*
 * ContactSection - Ultra Pro EcoGreen
 * Olive background with animated gradient orbs, glassmorphism form,
 * magnetic WhatsApp CTA, blur-fade reveals
 * Design: Hacienda Digital — premium, warm, exclusive
 */

import BlurFade from "@/components/animations/BlurFade";
import MagneticButton from "@/components/animations/MagneticButton";
import AnimatedGradientBg from "@/components/animations/AnimatedGradientBg";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Phone, MessageCircle, Instagram } from "lucide-react";
import { toast } from "sonner";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=573118730396&text=Hola%2C+quiero+cotizar+una+unidad+sanitaria+de+lujo+para+mi+evento&type=phone_number&app_absent=0";

const contactInfo = [
  {
    icon: MapPin,
    title: "Ubicación",
    lines: ["Cali, Colombia", "Valle del Cauca"],
    href: null,
  },
  {
    icon: Phone,
    title: "Teléfono",
    lines: ["+57 311 873 0396"],
    href: "tel:+573118730396",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    lines: ["Escríbenos directamente"],
    href: WHATSAPP_URL,
  },
  {
    icon: Instagram,
    title: "Instagram",
    lines: ["@ecogreen_soluciones"],
    href: "https://www.instagram.com/ecogreen_soluciones/",
  },
];

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    evento: "",
    fecha: "",
    mensaje: "",
  });
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hola, quiero cotizar una unidad sanitaria de lujo para mi evento.%0A%0A*Nombre:* ${formData.nombre}%0A*Teléfono:* ${formData.telefono}%0A*Tipo de evento:* ${formData.evento}%0A*Fecha:* ${formData.fecha}%0A*Mensaje:* ${formData.mensaje}`;
    const url = `https://api.whatsapp.com/send/?phone=573118730396&text=${msg}&type=phone_number&app_absent=0`;
    window.open(url, "_blank");
    toast.success("Redirigiendo a WhatsApp...");
  };

  const inputClasses = (field: string) =>
    `w-full bg-white/[0.06] border rounded-xl px-5 py-3.5 font-body text-white text-sm placeholder:text-white/25 focus:outline-none transition-all duration-500 ${
      focused === field
        ? "border-[#00D154]/60 bg-white/[0.08] shadow-[0_0_20px_rgba(193,127,89,0.1)]"
        : "border-white/[0.08] hover:border-white/15"
    }`;

  return (
    <section id="contacto" className="py-28 md:py-40 bg-[#00B140] relative overflow-hidden" ref={ref}>
      {/* Animated gradient background */}
      <AnimatedGradientBg variant="olive" />

      {/* Grain texture */}
      <div className="absolute inset-0 grain-overlay" />

      <div className="container relative z-10">
        {/* Section header */}
        <BlurFade delay={0.1} className="text-center mb-20">
          <span className="inline-block font-body text-xs uppercase tracking-[0.4em] text-[#00D154] font-medium mb-4 px-4 py-1.5 border border-[#00D154]/20 rounded-full backdrop-blur-sm">
            Contáctenos
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-white mt-4">
            Hagamos de su Evento
          </h2>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mt-1">
            <span className="italic bg-gradient-to-r from-[#00D154] to-[#33E070] bg-clip-text text-transparent">
              Algo Inolvidable
            </span>
          </h2>
          <p className="font-body text-base text-white/40 max-w-xl mx-auto mt-6 leading-relaxed">
            Solicite su cotización sin compromiso. Nos encanta ayudar a crear
            experiencias memorables para sus invitados.
          </p>
        </BlurFade>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-7">
            {contactInfo.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="flex items-start gap-4 group"
              >
                <div className="w-12 h-12 bg-white/[0.06] rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover:bg-white/[0.1] group-hover:shadow-[0_0_20px_rgba(193,127,89,0.1)]">
                  <item.icon className="w-5 h-5 text-[#00D154]" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-white mb-1">
                    {item.title}
                  </h3>
                  {item.lines.map((line, j) =>
                    item.href ? (
                      <a
                        key={j}
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="font-body text-sm text-white/50 hover:text-[#00D154] transition-colors block"
                      >
                        {line}
                      </a>
                    ) : (
                      <span key={j} className="font-body text-sm text-white/50 block">
                        {line}
                      </span>
                    )
                  )}
                </div>
              </motion.div>
            ))}

            {/* Big WhatsApp CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="pt-4"
            >
              <MagneticButton
                as="a"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-body text-sm font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(37,211,102,0.2)]"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Cotizar por WhatsApp
              </MagneticButton>
            </motion.div>
          </div>

          {/* Contact form with glassmorphism */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="relative bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-8 md:p-10 space-y-5 overflow-hidden"
            >
              {/* Subtle glow in corner */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#00D154]/10 rounded-full blur-3xl" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
                <div>
                  <label className="font-body text-xs font-medium text-white/50 block mb-2 uppercase tracking-wider">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    onFocus={() => setFocused("nombre")}
                    onBlur={() => setFocused(null)}
                    className={inputClasses("nombre")}
                    placeholder="Su nombre"
                  />
                </div>
                <div>
                  <label className="font-body text-xs font-medium text-white/50 block mb-2 uppercase tracking-wider">
                    Teléfono / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    onFocus={() => setFocused("telefono")}
                    onBlur={() => setFocused(null)}
                    className={inputClasses("telefono")}
                    placeholder="+57 300 000 0000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
                <div>
                  <label className="font-body text-xs font-medium text-white/50 block mb-2 uppercase tracking-wider">
                    Tipo de evento
                  </label>
                  <select
                    required
                    value={formData.evento}
                    onChange={(e) => setFormData({ ...formData, evento: e.target.value })}
                    onFocus={() => setFocused("evento")}
                    onBlur={() => setFocused(null)}
                    className={inputClasses("evento")}
                  >
                    <option value="" className="text-[#0F1F14] bg-white">Seleccione...</option>
                    <option value="Boda" className="text-[#0F1F14] bg-white">Boda</option>
                    <option value="Evento Corporativo" className="text-[#0F1F14] bg-white">Evento Corporativo</option>
                    <option value="Fiesta Privada" className="text-[#0F1F14] bg-white">Fiesta Privada</option>
                    <option value="Festival" className="text-[#0F1F14] bg-white">Festival</option>
                    <option value="Otro" className="text-[#0F1F14] bg-white">Otro</option>
                  </select>
                </div>
                <div>
                  <label className="font-body text-xs font-medium text-white/50 block mb-2 uppercase tracking-wider">
                    Fecha del evento
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.fecha}
                    onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                    onFocus={() => setFocused("fecha")}
                    onBlur={() => setFocused(null)}
                    className={inputClasses("fecha")}
                  />
                </div>
              </div>

              <div className="relative z-10">
                <label className="font-body text-xs font-medium text-white/50 block mb-2 uppercase tracking-wider">
                  Mensaje adicional
                </label>
                <textarea
                  rows={4}
                  value={formData.mensaje}
                  onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                  onFocus={() => setFocused("mensaje")}
                  onBlur={() => setFocused(null)}
                  className={`${inputClasses("mensaje")} resize-none`}
                  placeholder="Cuéntenos sobre su evento, número de invitados, ubicación, etc."
                />
              </div>

              <div className="relative z-10">
                <MagneticButton
                  as="button"
                  type="submit"
                  className="w-full bg-[#00D154] hover:bg-[#33E070] text-white font-body text-sm font-semibold py-4 rounded-xl uppercase tracking-[0.15em] transition-all duration-500 glow-terracotta"
                >
                  Enviar Cotización por WhatsApp
                </MagneticButton>
              </div>

              <p className="font-body text-[11px] text-white/25 text-center relative z-10">
                Al enviar, será redirigido a WhatsApp con los datos de su solicitud.
              </p>
            </form>
          </motion.div>
        </div>

        {/* Google Maps embed */}
        <BlurFade delay={0.5} className="mt-16">
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08]">
            <iframe
              title="EcoGreen Soluciones — Cali, Valle del Cauca"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d254376.34384828784!2d-76.67220799999999!3d3.4372199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30a6f0cc4bb3f1%3A0x1f0fb5e952ae6168!2sCali%2C%20Valle%20del%20Cauca%2C%20Colombia!5e0!3m2!1ses!2s!4v1710899400000!5m2!1ses!2s"
              width="100%"
              height="350"
              style={{ border: 0, filter: "grayscale(30%) contrast(1.1)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
            {/* Overlay branding bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#00B140]/90 to-[#00B140]/0 backdrop-blur-sm p-4 flex items-center gap-3">
              <MapPin className="w-5 h-5 text-white" />
              <span className="font-body text-sm text-white font-medium">
                Cali y todo el Valle del Cauca — Cobertura completa
              </span>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
