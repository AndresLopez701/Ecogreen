/*
 * TextReveal - Inspired by 21st.dev Text Reveal effect
 * Characters or words reveal one by one with staggered animation
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  splitBy?: "word" | "char";
}

export default function TextReveal({
  text,
  className = "",
  delay = 0,
  staggerDelay = 0.03,
  splitBy = "word",
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const items = splitBy === "word" ? text.split(" ") : text.split("");

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {items.map((item, i) => (
        <motion.span
          key={`${item}-${i}`}
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{
            duration: 0.5,
            delay: delay + i * staggerDelay,
            ease: [0.25, 0.4, 0.25, 1],
          }}
          className="inline-block"
        >
          {item}
          {splitBy === "word" && <span>&nbsp;</span>}
        </motion.span>
      ))}
    </span>
  );
}
