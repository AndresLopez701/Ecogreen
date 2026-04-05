/*
 * AnimatedGradientBg - Inspired by 21st.dev Animated Gradient Background
 * Subtle moving gradient orbs that create a living background
 */

import { motion } from "framer-motion";

interface AnimatedGradientBgProps {
  className?: string;
  variant?: "dark" | "light" | "olive";
}

export default function AnimatedGradientBg({
  className = "",
  variant = "dark",
}: AnimatedGradientBgProps) {
  const colors = {
    dark: {
      orb1: "rgba(61, 90, 62, 0.3)",
      orb2: "rgba(193, 127, 89, 0.2)",
      orb3: "rgba(61, 90, 62, 0.15)",
    },
    light: {
      orb1: "rgba(61, 90, 62, 0.08)",
      orb2: "rgba(193, 127, 89, 0.06)",
      orb3: "rgba(61, 90, 62, 0.05)",
    },
    olive: {
      orb1: "rgba(255, 255, 255, 0.08)",
      orb2: "rgba(193, 127, 89, 0.12)",
      orb3: "rgba(255, 255, 255, 0.05)",
    },
  };

  const c = colors[variant];

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px]"
        style={{ background: c.orb1, top: "-10%", left: "-10%" }}
        animate={{
          x: [0, 100, 50, 0],
          y: [0, 50, 100, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[100px]"
        style={{ background: c.orb2, bottom: "-10%", right: "-5%" }}
        animate={{
          x: [0, -80, -40, 0],
          y: [0, -60, -120, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-[80px]"
        style={{ background: c.orb3, top: "40%", left: "30%" }}
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -40, 60, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
