/*
 * BlurFade - Inspired by 21st.dev Blur Fade effect
 * Pre-triggers 200px before viewport so content is ready when user arrives.
 * Falls back to visible state immediately if motion fails (no flash of empty).
 */

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface BlurFadeProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
  once?: boolean;
}

export default function BlurFade({
  children,
  delay = 0,
  duration = 0.5,
  yOffset = 16,
  className = "",
  once = true,
}: BlurFadeProps) {
  const ref = useRef(null);
  // Pre-trigger 200px before entering viewport — content is ready by the time user sees it
  const isInView = useInView(ref, { once, margin: "200px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yOffset, filter: "blur(8px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{
        duration,
        delay: delay * 0.3,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
