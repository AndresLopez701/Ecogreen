/*
 * StaggerCards - Inspired by 21st.dev staggered card entrance
 * Cards animate in one by one with spring physics
 */

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface StaggerCardsProps {
  children: ReactNode[];
  className?: string;
  staggerDelay?: number;
}

export default function StaggerCards({
  children,
  className = "",
  staggerDelay = 0.12,
}: StaggerCardsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className={className}>
      {children.map((child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={
            isInView
              ? { opacity: 1, y: 0, scale: 1 }
              : {}
          }
          transition={{
            duration: 0.6,
            delay: i * staggerDelay,
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
