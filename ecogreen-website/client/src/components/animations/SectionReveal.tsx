/*
 * SectionReveal - Section entrance transitions
 * Triggers 300px BEFORE the section enters view so content is
 * already visible when the user arrives — no blank sections on fast scroll.
 */

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function SectionReveal({
  children,
  className = "",
  delay = 0,
}: SectionRevealProps) {
  const ref = useRef(null);
  // margin "300px" = pre-trigger 300px before entering viewport
  const isInView = useInView(ref, { once: true, margin: "300px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{
        duration: 0.35,
        delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}
