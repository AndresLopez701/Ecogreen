/*
 * ServicesSection — Bento Editorial Grid
 * Layout asimétrico premium: fotos reales + cards dark/light alternados
 * Desktop: 12-col grid, 3 filas fijas
 * Mobile: stack vertical con alturas naturales
 */

import BlurFade from "@/components/animations/BlurFade";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Crown, Trophy, ArrowRight } from "lucide-react";

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 28 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.7, delay, ease: [0.25, 0.4, 0.25, 1] as const },
  });

  return (
    <section
      id="servicios"
      className="py-28 md:py-40 bg-[#F7F4EF] relative overflow-hidden"
      ref={ref}
    >
      <div className="container relative z-10">

        {/* ── Header ── */}
        <BlurFade delay={0.1} className="text-center mb-14">
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
        </BlurFade>

        {/* ── Bento Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 lg:grid-rows-[280px_280px_280px] gap-4">

          {/* ① Bodas — foto grande, tall (rows 1–2) */}
          <motion.div
            {...fade(0.2)}
            className="min-h-[380px] md:min-h-0 lg:col-span-7 lg:row-span-2 relative overflow-hidden rounded-3xl group"
          >
            <img
              src="/imgs/boda-elegante.jpg"
              alt="Bodas y Celebraciones"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E1A12]/90 via-[#0E1A12]/25 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
              <span className="inline-block font-body text-[10px] uppercase tracking-[0.4em] text-[#D4A843] mb-4 px-3 py-1 border border-[#D4A843]/40 rounded-full">
                Más solicitado
              </span>
              <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-3">
                Bodas &<br />
                <span className="italic text-[#D4A843]">Celebraciones</span>
              </h3>
              <p className="font-body text-sm text-white/55 leading-relaxed max-w-sm">
                Soluciones elegantes que se integran perfectamente con la decoración de su boda o celebración especial.
              </p>
              <div className="w-10 h-px bg-gradient-to-r from-[#D4A843] to-transparent mt-6" />
            </div>
          </motion.div>

          {/* ② VIP — dark card con foto tenue */}
          <motion.div
            {...fade(0.3)}
            className="min-h-[260px] lg:col-span-5 relative overflow-hidden rounded-3xl bg-[#0E1A12] group"
          >
            <img
              src="/imgs/interior.jpg"
              alt="Unidades VIP"
              className="absolute inset-0 w-full h-full object-cover opacity-20 transition-transform duration-[1.4s] group-hover:scale-105 group-hover:opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0E1A12]/40 to-[#0E1A12]/95" />
            <div className="relative h-full p-8 flex flex-col justify-between">
              <div className="w-12 h-12 rounded-2xl bg-[#D4A843]/15 flex items-center justify-center">
                <Crown className="w-5 h-5 text-[#D4A843]" />
              </div>
              <div>
                <h3 className="font-display text-2xl md:text-3xl font-semibold text-white mb-2">
                  Unidades <span className="italic text-[#D4A843]">VIP</span>
                </h3>
                <p className="font-body text-sm text-white/50 leading-relaxed">
                  AC, espejo iluminado, lavamanos automáticos y amenidades de primera clase.
                </p>
              </div>
            </div>
          </motion.div>

          {/* ③ Corporativo — foto con overlay */}
          <motion.div
            {...fade(0.4)}
            className="min-h-[260px] lg:col-span-5 relative overflow-hidden rounded-3xl group"
          >
            <img
              src="/imgs/exterior-carpa.jpg"
              alt="Eventos Corporativos"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E1A12]/85 via-[#0E1A12]/30 to-[#0E1A12]/10" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h3 className="font-display text-2xl md:text-3xl font-semibold text-white mb-2">
                Eventos <span className="italic text-[#00A651]">Corporativos</span>
              </h3>
              <p className="font-body text-sm text-white/55 leading-relaxed">
                Profesionalismo y estilo para conferencias y eventos empresariales.
              </p>
            </div>
          </motion.div>

          {/* ④ Deportivos — dark */}
          <motion.div
            {...fade(0.5)}
            className="min-h-[260px] lg:col-span-4 relative overflow-hidden rounded-3xl bg-[#0E1A12] group"
          >
            <img
              src="/imgs/evento-deportivo-new.png"
              alt="Eventos Deportivos"
              className="absolute inset-0 w-full h-full object-cover opacity-20 transition-all duration-[1.4s] group-hover:scale-105 group-hover:opacity-30"
            />
            <div className="absolute inset-0 bg-[#0E1A12]/50" />
            <div className="relative h-full p-7 flex flex-col justify-between">
              <Trophy className="w-6 h-6 text-[#00A651]" />
              <div>
                <h3 className="font-display text-xl md:text-2xl font-semibold text-white mb-1">
                  Eventos Deportivos
                </h3>
                <p className="font-body text-xs text-white/45 leading-relaxed">
                  Alto flujo, rápidos de instalar y fáciles de mantener en torneos y maratones.
                </p>
              </div>
            </div>
          </motion.div>

          {/* ⑤ Fiestas — foto */}
          <motion.div
            {...fade(0.55)}
            className="min-h-[260px] lg:col-span-4 relative overflow-hidden rounded-3xl group"
          >
            <img
              src="/imgs/fiesta-privada-new.jpg"
              alt="Fiestas Privadas"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E1A12]/85 via-[#0E1A12]/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-7">
              <h3 className="font-display text-xl md:text-2xl font-semibold text-white mb-1">
                Fiestas Privadas
              </h3>
              <p className="font-body text-xs text-white/55">
                Desde reuniones íntimas hasta grandes celebraciones con estilo.
              </p>
            </div>
          </motion.div>

          {/* ⑥ CTA — verde */}
          <motion.div
            {...fade(0.6)}
            className="min-h-[260px] lg:col-span-4 relative overflow-hidden rounded-3xl group"
            style={{ background: "linear-gradient(135deg, #00A651 0%, #006B35 100%)" }}
          >
            {/* Dot pattern */}
            <div
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
            <div className="relative h-full p-7 flex flex-col justify-between">
              <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-display text-xl md:text-2xl font-semibold text-white mb-2 leading-tight">
                  ¿Listo para<br />
                  <span className="italic">cotizar?</span>
                </h3>
                <p className="font-body text-xs text-white/65 leading-relaxed mb-5">
                  Cuéntenos su evento y le enviamos una propuesta personalizada en minutos.
                </p>
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 bg-white text-[#006B35] font-body text-xs font-semibold uppercase tracking-[0.15em] px-5 py-3 rounded-full hover:bg-white/90 transition-all duration-300"
                >
                  Cotizar ahora
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
