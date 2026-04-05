/*
 * GlassmorphismCard - Inspired by 21st.dev Glassmorphism Trust Hero
 * Frosted glass card with border glow, cursor-following glow, and 3D tilt on hover
 */

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { type ReactNode, useRef, type MouseEvent, useState } from "react";

interface GlassmorphismCardProps {
  children: ReactNode;
  className?: string;
  variant?: "dark" | "light";
  hoverGlow?: boolean;
  tilt?: boolean;
}

export default function GlassmorphismCard({
  children,
  className = "",
  variant = "dark",
  hoverGlow = true,
  tilt = true,
}: GlassmorphismCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // 3D tilt motion values
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });
  const scale = useSpring(1, { stiffness: 300, damping: 30 });

  const handleMouse = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    if (tilt) {
      rawX.set((x / rect.width) - 0.5);
      rawY.set((y / rect.height) - 0.5);
    }
  };

  const handleEnter = () => {
    setIsHovered(true);
    if (tilt) scale.set(1.02);
  };

  const handleLeave = () => {
    setIsHovered(false);
    if (tilt) {
      rawX.set(0);
      rawY.set(0);
      scale.set(1);
    }
  };

  const bg =
    variant === "dark"
      ? "bg-white/[0.04] border-white/[0.08]"
      : "bg-white/60 border-white/40";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`relative overflow-hidden rounded-xl backdrop-blur-xl border transition-colors duration-500 ${bg} ${className}`}
      style={tilt ? { rotateX, rotateY, scale, transformStyle: "preserve-3d", willChange: "transform" } : {}}
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
