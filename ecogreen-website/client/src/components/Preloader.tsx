/*
 * Preloader — Smart asset pre-caching window
 *
 * Strategy:
 *   1. Show logo splash immediately (pure CSS, no delay)
 *   2. During splash: fetch ALL mobile images into browser cache via Image()
 *   3. Dismiss when: all images cached OR 2.5s max (whichever first)
 *   4. Result: user scrolls and every image is already in cache → instant
 *
 * Video: already loading via <video preload="auto"> in HeroSection + <link rel="preload">
 * in index.html — we don't duplicate that download here.
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const isMobile = () =>
  typeof window !== "undefined" && window.innerWidth < 768;

// All mobile image variants (AVIF — 60% smaller than WebP, same quality)
// Pre-cached during splash so every scroll is instant
const MOBILE_IMAGES = [
  // Above fold / first scroll — AVIF for browsers that support it
  "/imgs/boda-elegante-mobile.avif",
  "/imgs/interior-mobile.avif",
  "/imgs/gallery-bodas-1-mobile.avif",
  "/imgs/gallery-bodas-2-mobile.avif",
  // Services
  "/imgs/exterior-carpa-mobile.avif",
  "/imgs/evento-deportivo-new-mobile.avif",
  "/imgs/fiesta-privada-new-mobile.avif",
  // About slideshow
  "/imgs/interior2-mobile.avif",
  "/imgs/interior3-mobile.avif",
  "/imgs/unidad-abierta-mobile.avif",
  "/imgs/unidad-exterior-1-mobile.avif",
  "/imgs/boda1-mobile.avif",
  // Gallery
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
  // HowItWorks
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
];

function preloadImages(srcs: string[]): Promise<void> {
  return new Promise((resolve) => {
    let remaining = srcs.length;
    if (remaining === 0) { resolve(); return; }
    srcs.forEach((src) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        remaining--;
        if (remaining === 0) resolve();
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

    // Track progress per image for the bar
    let loaded = 0;
    const total = images.length;

    const loadOne = (src: string) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = img.onerror = () => {
          loaded++;
          setProgress(Math.round((loaded / total) * 100));
          resolve();
        };
        img.src = src;
      });

    // Load in two waves: critical first (top 6), rest in parallel
    const critical = images.slice(0, 6);
    const rest = images.slice(6);

    const done = Promise.all([
      ...critical.map(loadOne),
      ...rest.map(loadOne),
    ]);

    // Dismiss when all loaded, min 1.2s (brand moment), max 2.8s
    const minTimer = new Promise<void>((r) => setTimeout(r, 1200));
    const maxTimer = new Promise<void>((r) => setTimeout(r, 2800));

    Promise.race([
      Promise.all([done, minTimer]),
      maxTimer,
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
          {/* EcoGreen logo */}
          <motion.img
            src="/imgs/logo-transparente.webp"
            alt="EcoGreen"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 180, height: "auto" }}
          />

          {/* Progress bar — bottom of screen */}
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
              transition={{ duration: 0.15, ease: "easeOut" }}
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
