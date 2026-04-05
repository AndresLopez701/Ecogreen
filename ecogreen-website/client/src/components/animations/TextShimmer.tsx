/*
 * TextShimmer - Inspired by 21st.dev Animated Shiny Text effect
 * A shimmering highlight sweeps across the text continuously
 */

import { type ReactNode } from "react";

interface TextShimmerProps {
  children: ReactNode;
  className?: string;
  shimmerColor?: string;
}

export default function TextShimmer({
  children,
  className = "",
  shimmerColor = "rgba(255,255,255,0.3)",
}: TextShimmerProps) {
  return (
    <span
      className={`relative inline-block ${className}`}
      style={{
        backgroundImage: `linear-gradient(
          120deg,
          transparent 0%,
          transparent 30%,
          ${shimmerColor} 50%,
          transparent 70%,
          transparent 100%
        )`,
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        animation: "shimmer 3s ease-in-out infinite",
      }}
    >
      {children}
    </span>
  );
}
