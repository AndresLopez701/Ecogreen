/*
 * Preloader — Carga real, no timer fijo
 *
 * Se queda hasta que TODO esté listo:
 *   1. Hero video listo para reproducir (canplaythrough)
 *   2. Todas las imágenes mobile en caché
 *   3. Mínimo 1.4s para el momento de marca
 *   4. Máximo 5s de seguridad (conexiones muy lentas)
 *
 * Resultado: cuando el logo sale, el usuario scrollea y todo ya está.
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const isMobile = () =>
  typeof window !== "undefined" && window.innerWidth < 768;

const MOBILE_IMAGES = [
  "/imgs/boda-elegante-mobile.avif",
  "/imgs/interior-mobile.avif",
  "/imgs/gallery-bodas-1-mobile.avif",
  "/imgs/gallery-bodas-2-mobile.avif",
  "/imgs/exterior-carpa-mobile.avif",
  "/imgs/evento-deportivo-new-mobile.avif",
  "/imgs/fiesta-privada-new-mobile.avif",
  "/imgs/interior2-mobile.avif",
  "/imgs/interior3-mobile.avif",
  "/imgs/unidad-abierta-mobile.avif",
  "/imgs/unidad-exterior-1-mobile.avif",
  "/imgs/boda1-mobile.avif",
  "/imgs/gallery-bodas-3-mobile.avif",
  "/imgs/gallery-bodas-4-mobile.avif",
  "/imgs/gallery-bodas-5-mobile.avif",
  "/imgs/gallery-corp-1-mobile.avif",
  "/imgs/gallery-corp-3-mobile.avif",
  "/imgs/gallery-fiestas-1-mobile.avif",
  "/imgs/gallery-fiestas-2-mobile.avif",
  "/imgs/gallery-fiestas-3-mobile.avif",
  "/imgs/gallery-fiestas-4-mobile.avif",
  "/imgs/gallery-ext-1-mobile.avif",
  "/imgs/gallery-ext-2-mobile.avif",
  "/imgs/paso1-cotizacion-mobile.avif",
  "/imgs/paso2-instalacion-mobile.avif",
  "/imgs/paso3-disfrute-mobile.avif",
];

const DESKTOP_IMAGES = [
  "/imgs/boda-elegante.webp",
  "/imgs/interior.webp",
  "/imgs/gallery-bodas-1.webp",
  "/imgs/exterior-carpa.webp",
  "/imgs/evento-deportivo-new.webp",
  "/imgs/fiesta-privada-new.webp",
  "/imgs/gallery-bodas-2.webp",
  "/imgs/gallery-bodas-3.webp",
];

// Espera que el hero video esté listo para reproducir
function waitForHeroVideo(mobile: boolean): Promise<void> {
  return new Promise((resolve) => {
    const src = mobile
      ? "/imgs/bg-bodas-mobile.mp4"
      : "/imgs/bg-bodas.mp4";
    const v = document.createElement("video");
    v.muted = true;
    v.playsInline = true;
    v.preload = "auto";
    // Listo cuando tiene suficientes datos para empezar
    v.oncanplay = () => resolve();
    v.onloadeddata = () => resolve();
    // Si ya hay un video cargando en el DOM (HeroSection), esperar ese
    setTimeout(() => {
      const existing = document.querySelector("video") as HTMLVideoElement | null;
      if (existing && existing.readyState >= 2) {
        resolve();
      }
    }, 100);
    v.src = src;
    v.load();
    // Seguridad: si el video tarda mucho no bloqueamos infinito
    setTimeout(resolve, 4000);
  });
}

// Precarga imágenes en el caché del browser
function preloadAllImages(
  images: string[],
  onProgress: (pct: number) => void
): Promise<void> {
  return new Promise((resolve) => {
    let done = 0;
    const total = images.length;
    if (total === 0) { resolve(); return; }
    images.forEach((src) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        done++;
        onProgress(Math.round((done / total) * 100));
        if (done >= total) resolve();
      };
      img.src = src;
    });
  });
}

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const mobile = isMobile();
    const images = mobile ? MOBILE_IMAGES : DESKTOP_IMAGES;

    // Los tres requisitos para cerrar el preloader:
    const imagesDone = preloadAllImages(images, setProgress);
    const videoDone  = waitForHeroVideo(mobile);
    const minDelay   = new Promise<void>((r) => setTimeout(r, 1400)); // mínimo de marca
    const maxDelay   = new Promise<void>((r) => setTimeout(r, 5000)); // máximo absoluto

    // Cierra cuando TODO está listo, o cuando pasan 5s (lo que ocurra primero)
    Promise.race([
      Promise.all([imagesDone, videoDone, minDelay]),
      maxDelay,
    ]).then(() => setIsLoading(false));
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#F7F3ED",
          }}
        >
          {/* Logo EcoGreen */}
          <motion.img
            src="/imgs/logo-transparente.webp"
            alt="EcoGreen"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 180, height: "auto" }}
          />

          {/* Barra de progreso real — bottom */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 3,
              backgroundColor: "rgba(0,166,81,0.12)",
            }}
          >
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{
                height: "100%",
                backgroundColor: "#00A651",
                borderRadius: "0 2px 2px 0",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
