/*
 * FlipWords - Inspired by 21st.dev Flip Words effect
 * Words rotate in/out with a vertical flip animation
 */

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

interface FlipWordsProps {
  words: string[];
  interval?: number;
  className?: string;
}

export default function FlipWords({
  words,
  interval = 3000,
  className = "",
}: FlipWordsProps) {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % words.length);
  }, [words.length]);

  useEffect(() => {
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [next, interval]);

  return (
    <span className={`inline-block relative ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 20, rotateX: -90, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, rotateX: 90, filter: "blur(8px)" }}
          transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
          className="inline-block"
          style={{ perspective: "600px" }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
