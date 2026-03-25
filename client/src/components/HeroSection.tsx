/*
 * HeroSection - Ultra Pro EcoGreen
 * Full viewport with animated gradient overlay, FlipWords, blur-fade entrance,
 * magnetic CTA buttons, parallax background, grain texture, scroll indicator
 * Design: Hacienda Digital — premium, warm, exclusive
 */

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import FlipWords from "@/components/animations/FlipWords";
import BlurFade from "@/components/animations/BlurFade";
import MagneticButton from "@/components/animations/MagneticButton";
import AnimatedGradientBg from "@/components/animations/AnimatedGradientBg";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=573118730396&text=Hola%2C+quiero+cotizar+una+unidad+sanitaria+de+lujo+para+mi+evento&type=phone_number&app_absent=0";

const HERO_BG = "/images/hero-wedding.png";

const flipWords = ["Bodas", "Eventos", "Celebraciones", "Fiestas"];

export default function HeroSection() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 200]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const scale = useTransform(scrollY, [0, 800], [1, 1.1]);

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax background image */}
      <motion.div
        className="absolute inset-0"
        style={{ y: bgY, scale }}
      >
        <img
          src={HERO_BG}
          alt=""
          className="w-full h-full object-cover"
          style={{ minHeight: "120%" }}
        />
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F1F14]/60 via-[#0F1F14]/40 to-[#0F1F14]/80" />

      {/* Animated gradient orbs */}
      <AnimatedGradientBg variant="dark" />

      {/* Grain texture */}
      <div className="absolute inset-0 grain-overlay" />

      {/* Content */}
      <motion.div className="relative z-10 container text-center px-4" style={{ opacity }}>
        {/* Decorative badge */}
        <BlurFade delay={0.2} yOffset={16}>
          <div className="inline-flex items-center gap-3 mb-8">
            <span className="block w-8 h-px bg-gradient-to-r from-transparent to-[#00D154]" />
            <span className="font-body text-xs uppercase tracking-[0.4em] text-[#00D154] font-medium px-4 py-1.5 border border-[#00D154]/30 rounded-full backdrop-blur-sm bg-white/5">
              Cali, Colombia
            </span>
            <span className="block w-8 h-px bg-gradient-to-l from-transparent to-[#00D154]" />
          </div>
        </BlurFade>

        {/* Main heading with FlipWords */}
        <BlurFade delay={0.4} yOffset={30}>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-semibold text-white leading-[1.05] mb-4">
            Unidades Sanitarias
          </h1>
        </BlurFade>

        <BlurFade delay={0.6} yOffset={30}>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-semibold leading-[1.05] mb-3">
            <span className="italic bg-gradient-to-r from-[#00D154] to-[#33E070] bg-clip-text text-transparent">
              de Lujo
            </span>
          </h1>
        </BlurFade>

        {/* Flip words line */}
        <BlurFade delay={0.8} yOffset={20}>
          <p className="font-display text-2xl md:text-3xl text-white/60 mb-4">
            para{" "}
            <FlipWords
              words={flipWords}
              className="text-white font-semibold"
              interval={2500}
            />
          </p>
        </BlurFade>

        {/* Subtitle */}
        <BlurFade delay={1.0} yOffset={20}>
          <p className="font-body text-base md:text-lg text-white/50 max-w-xl mx-auto mb-12 leading-relaxed">
            Elevamos la experiencia de sus invitados con baños portátiles VIP
            que combinan elegancia, higiene y comodidad.
          </p>
        </BlurFade>

        {/* CTA buttons */}
        <BlurFade delay={1.2} yOffset={20}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton
              as="a"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#00B140] hover:bg-[#00C853] text-white font-body text-sm font-semibold px-10 py-4 rounded-full uppercase tracking-[0.15em] transition-all duration-500 glow-olive inline-block"
            >
              Solicitar Cotización
            </MagneticButton>
            <MagneticButton
              as="a"
              href="#servicios"
              className="border border-white/20 text-white/90 font-body text-sm font-medium px-10 py-4 rounded-full uppercase tracking-[0.15em] transition-all duration-500 hover:bg-white/10 hover:border-white/40 backdrop-blur-sm inline-block"
              onClick={() => {
                document
                  .querySelector("#servicios")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Nuestros Servicios
            </MagneticButton>
          </div>
        </BlurFade>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <span className="font-body text-[10px] uppercase tracking-[0.3em] text-white/30">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <a
            href="#nosotros"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#nosotros")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            aria-label="Scroll down"
          >
            <ChevronDown className="w-6 h-6 text-white/30" />
          </a>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F5F8F6] to-transparent z-10" />
    </section>
  );
}
