/*
 * MagneticButton - Inspired by 21st.dev magnetic hover effects
 * Button subtly follows cursor position when hovered
 */

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "a" | "button";
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.3,
  as = "button",
  href,
  target,
  rel,
  onClick,
  type,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouse = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Component = as === "a" ? motion.a : motion.button;

  return (
    <div ref={ref} onMouseMove={handleMouse} onMouseLeave={handleLeave} className="inline-block">
      <Component
        style={{ x: springX, y: springY }}
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        type={type}
        className={className}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </Component>
    </div>
  );
}
