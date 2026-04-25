/*
 * Navbar - Ultra Pro EcoGreen
 * Glassmorphism on scroll, animated underline links, magnetic CTA
 * Design: Hacienda Digital — premium, warm, exclusive
 */

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "@/components/animations/MagneticButton";
import Logo from "@/components/Logo";
import { WHATSAPP_URL } from "@shared/const";

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#servicios", label: "Servicios" },
  { href: "#galeria", label: "Galería" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#inicio");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      // Track active section
      const sections = navLinks.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(`#${sections[i]}`);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-[#F7F3ED]/80 backdrop-blur-2xl shadow-[0_1px_40px_rgba(0,0,0,0.06)] border-b border-[#00A651]/5"
            : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between h-18 md:h-22">
          {/* Logo */}
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              handleClick("#inicio");
            }}
            className="flex items-center gap-2 group"
          >
            <motion.div whileHover={{ scale: 1.02 }}>
              <Logo
                variant="full"
                size="md"
                theme="dark"
              />
            </motion.div>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(link.href);
                }}
                className={`relative font-body text-[13px] font-medium uppercase tracking-[0.15em] px-4 py-2 transition-colors duration-300 ${
                  scrolled
                    ? activeSection === link.href
                      ? "text-[#00A651]"
                      : "text-[#2C2C2C]/70 hover:text-[#00A651]"
                    : activeSection === link.href
                    ? "text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
                {/* Animated underline */}
                <motion.span
                  className={`absolute bottom-0 left-4 right-4 h-[1.5px] ${
                    scrolled ? "bg-[#D4A843]" : "bg-[#D4A843]"
                  }`}
                  initial={false}
                  animate={{
                    scaleX: activeSection === link.href ? 1 : 0,
                    opacity: activeSection === link.href ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{ originX: 0 }}
                />
              </a>
            ))}
            <div className="ml-4">
              <MagneticButton
                as="a"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#00A651] hover:bg-[#008C44] text-white font-body text-[13px] font-semibold px-6 py-2.5 rounded-full uppercase tracking-wider transition-all duration-300 glow-olive inline-block"
              >
                Cotizar
              </MagneticButton>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 relative z-50"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6 text-[#2C2C2C]" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu
                    className={`w-6 h-6 ${scrolled ? "text-[#2C2C2C]" : "text-white"}`}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu - full screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            className="fixed inset-0 z-40 bg-[#F7F3ED] flex flex-col items-center justify-center gap-6"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(link.href);
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
                className="font-display text-4xl font-semibold text-[#00A651] hover:text-[#D4A843] transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 bg-[#00A651] text-white font-body text-base font-semibold px-10 py-4 rounded-full uppercase tracking-wider glow-olive"
            >
              Cotizar Ahora
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
