/*
 * ParallaxImage - Inspired by 21st.dev Parallax effects
 * Image moves at a different rate than scroll for depth effect
 */

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
}

export default function ParallaxImage({
  src,
  alt,
  className = "",
  speed = 0.15,
}: ParallaxImageProps) {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`]);

  return (
    <div ref={ref} className={`overflow-hidden relative ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#e8e3dc] via-[#f0ebe4] to-[#e8e3dc] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] z-10" />
      )}
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className={`w-full h-[120%] object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
