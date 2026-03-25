/*
 * Navbar - Ultra Pro EcoGreen
 * Glassmorphism on scroll, animated underline links, magnetic CTA
 * Supports both hash-scroll (home) and page routing (precios)
 * Design: Hacienda Digital — premium, warm, exclusive
 */

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import MagneticButton from "@/components/animations/MagneticButton";

const hashLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#servicios", label: "Servicios" },
  { href: "#contacto", label: "Contacto" },
];

const WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=573118730396&text=Hola%2C+quiero+cotizar+una+unidad+sanitaria+de+lujo+para+mi+evento&type=phone_number&app_absent=0";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#inicio");
  const [location, setLocation] = useLocation();

  const isHome = location === "/";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      if (!isHome) return;
      // Track active section
      const sections = hashLinks.map((l) => l.href.slice(1));
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
  }, [isHome]);

  const handleHashClick = (href: string) => {
    setMobileOpen(false);
    if (!isHome) {
      // Navigate to home first, then scroll
      setLocation("/");
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePageClick = (path: string) => {
    setMobileOpen(false);
    setLocation(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // On non-home pages, always show solid background
  const showSolidBg = scrolled || !isHome;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          showSolidBg
            ? "bg-[#F5F8F6]/80 backdrop-blur-2xl shadow-[0_1px_40px_rgba(0,0,0,0.06)] border-b border-[#00B140]/5"
            : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between h-18 md:h-22">
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handlePageClick("/");
            }}
            className="flex items-center gap-2 group"
          >
            <motion.span
              className={`font-display text-2xl md:text-3xl font-semibold tracking-wide transition-colors duration-700 ${
                showSolidBg ? "text-[#6B6B6B]" : "text-white"
              }`}
              whileHover={{ scale: 1.02 }}
            >
              eco
              <span className="font-bold text-[#00B140]">
                green
              </span>
            </motion.span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {hashLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleHashClick(link.href);
                }}
                className={`relative font-body text-[13px] font-medium uppercase tracking-[0.15em] px-4 py-2 transition-colors duration-300 ${
                  showSolidBg
                    ? isHome && activeSection === link.href
                      ? "text-[#00B140]"
                      : "text-[#0F1F14]/70 hover:text-[#00B140]"
                    : isHome && activeSection === link.href
                    ? "text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
                {/* Animated underline */}
                <motion.span
                  className="absolute bottom-0 left-4 right-4 h-[1.5px] bg-[#00D154]"
                  initial={false}
                  animate={{
                    scaleX: isHome && activeSection === link.href ? 1 : 0,
                    opacity: isHome && activeSection === link.href ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{ originX: 0 }}
                />
              </a>
            ))}

            {/* Precios page link */}
            <a
              href="/precios"
              onClick={(e) => {
                e.preventDefault();
                handlePageClick("/precios");
              }}
              className={`relative font-body text-[13px] font-medium uppercase tracking-[0.15em] px-4 py-2 transition-colors duration-300 ${
                showSolidBg
                  ? location === "/precios"
                    ? "text-[#00B140]"
                    : "text-[#0F1F14]/70 hover:text-[#00B140]"
                  : location === "/precios"
                  ? "text-white"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Precios
              <motion.span
                className="absolute bottom-0 left-4 right-4 h-[1.5px] bg-[#00D154]"
                initial={false}
                animate={{
                  scaleX: location === "/precios" ? 1 : 0,
                  opacity: location === "/precios" ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{ originX: 0 }}
              />
            </a>

            {/* Galería page link */}
            <a
              href="/galeria"
              onClick={(e) => {
                e.preventDefault();
                handlePageClick("/galeria");
              }}
              className={`relative font-body text-[13px] font-medium uppercase tracking-[0.15em] px-4 py-2 transition-colors duration-300 ${
                showSolidBg
                  ? location === "/galeria"
                    ? "text-[#00B140]"
                    : "text-[#0F1F14]/70 hover:text-[#00B140]"
                  : location === "/galeria"
                  ? "text-white"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Galería
              <motion.span
                className="absolute bottom-0 left-4 right-4 h-[1.5px] bg-[#00D154]"
                initial={false}
                animate={{
                  scaleX: location === "/galeria" ? 1 : 0,
                  opacity: location === "/galeria" ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{ originX: 0 }}
              />
            </a>

            <div className="ml-4">
              <MagneticButton
                as="a"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#00B140] hover:bg-[#00C853] text-white font-body text-[13px] font-semibold px-6 py-2.5 rounded-full uppercase tracking-wider transition-all duration-300 glow-olive inline-block"
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
                  <X className="w-6 h-6 text-[#0F1F14]" />
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
                    className={`w-6 h-6 ${showSolidBg ? "text-[#0F1F14]" : "text-white"}`}
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
            className="fixed inset-0 z-40 bg-[#F5F8F6] flex flex-col items-center justify-center gap-6"
          >
            {hashLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleHashClick(link.href);
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
                className="font-display text-4xl font-semibold text-[#00B140] hover:text-[#00D154] transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="/precios"
              onClick={(e) => {
                e.preventDefault();
                handlePageClick("/precios");
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + hashLinks.length * 0.08, duration: 0.4 }}
              className="font-display text-4xl font-semibold text-[#00B140] hover:text-[#00D154] transition-colors"
            >
              Precios
            </motion.a>
            <motion.a
              href="/galeria"
              onClick={(e) => {
                e.preventDefault();
                handlePageClick("/galeria");
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (hashLinks.length + 1) * 0.08, duration: 0.4 }}
              className="font-display text-4xl font-semibold text-[#00B140] hover:text-[#00D154] transition-colors"
            >
              Galería
            </motion.a>
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.4 }}
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 bg-[#00B140] text-white font-body text-base font-semibold px-10 py-4 rounded-full uppercase tracking-wider glow-olive"
            >
              Cotizar Ahora
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
