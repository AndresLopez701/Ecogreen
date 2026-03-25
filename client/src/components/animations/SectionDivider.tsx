/*
 * SectionDivider - Organic wave divider between sections
 * Adds visual flow and premium feel between sections
 */

interface SectionDividerProps {
  variant?: "cream-to-dark" | "dark-to-cream" | "cream-to-olive" | "olive-to-cream" | "dark-to-olive";
  flip?: boolean;
}

const colors: Record<string, { fill: string }> = {
  "cream-to-dark": { fill: "#0F1F14" },
  "dark-to-cream": { fill: "#F5F8F6" },
  "cream-to-olive": { fill: "#00B140" },
  "olive-to-cream": { fill: "#F5F8F6" },
  "dark-to-olive": { fill: "#00B140" },
};

export default function SectionDivider({
  variant = "cream-to-dark",
  flip = false,
}: SectionDividerProps) {
  const { fill } = colors[variant] || colors["cream-to-dark"];

  return (
    <div
      className="relative w-full overflow-hidden leading-[0] -mt-px"
      style={{ transform: flip ? "scaleY(-1)" : undefined }}
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="w-full h-[40px] md:h-[60px] lg:h-[80px]"
      >
        <path
          d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
