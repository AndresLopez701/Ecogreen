/*
 * MarqueeText - Inspired by 21st.dev Infinite Text Marquee
 * Continuously scrolling text band for visual impact
 */

import { motion } from "framer-motion";

interface MarqueeTextProps {
  text: string;
  className?: string;
  speed?: number;
  separator?: string;
}

export default function MarqueeText({
  text,
  className = "",
  speed = 20,
  separator = " — ",
}: MarqueeTextProps) {
  const fullText = `${text}${separator}`.repeat(6);

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-block"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <span>{fullText}</span>
        <span>{fullText}</span>
      </motion.div>
    </div>
  );
}
