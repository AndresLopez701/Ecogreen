/*
 * GlassmorphismCard - Inspired by 21st.dev Glassmorphism Trust Hero
 * Frosted glass card with border glow and hover effects
 */

import { motion } from "framer-motion";
import { type ReactNode, useRef, type MouseEvent, useState } from "react";

interface GlassmorphismCardProps {
  children: ReactNode;
  className?: string;
  variant?: "dark" | "light";
  hoverGlow?: boolean;
}

export default function GlassmorphismCard({
  children,
  className = "",
  variant = "dark",
  hoverGlow = true,
}: GlassmorphismCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouse = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const bg =
    variant === "dark"
      ? "bg-white/[0.04] border-white/[0.08]"
      : "bg-white/60 border-white/40";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-xl backdrop-blur-xl border transition-all duration-500 ${bg} ${className}`}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
    >
      {/* Cursor-following glow */}
      {hoverGlow && isHovered && (
        <div
          className="absolute pointer-events-none w-64 h-64 rounded-full opacity-20 transition-opacity duration-300"
          style={{
            background:
              variant === "dark"
                ? "radial-gradient(circle, rgba(193,127,89,0.4) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(61,90,62,0.2) 0%, transparent 70%)",
            left: mousePos.x - 128,
            top: mousePos.y - 128,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
