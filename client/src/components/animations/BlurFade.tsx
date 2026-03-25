/*
 * BlurFade - Inspired by 21st.dev Blur Fade effect
 * Elements fade in from blur to sharp focus with vertical movement
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
  duration = 0.8,
  yOffset = 24,
  className = "",
  once = true,
}: BlurFadeProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yOffset, filter: "blur(12px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
