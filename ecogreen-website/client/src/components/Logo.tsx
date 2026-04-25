/*
 * Logo - EcoGreen Brand Logo Component
 * SVG logo with water drop icon, "eco" + "green" text, optional tagline
 * Supports variants: full, icon, text | sizes: sm, md, lg | themes: light, dark
 */

interface LogoProps {
  variant?: "full" | "icon" | "text";
  size?: "sm" | "md" | "lg";
  theme?: "light" | "dark";
  showTagline?: boolean;
  className?: string;
}

const sizes = {
  sm: { icon: 28, fontSize: 20, taglineSize: 6, gap: 6 },
  md: { icon: 40, fontSize: 28, taglineSize: 8, gap: 8 },
  lg: { icon: 56, fontSize: 40, taglineSize: 10, gap: 12 },
};

function WaterDropIcon({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer drop shape */}
      <path
        d="M32 4C32 4 12 28 12 40C12 51.046 20.954 60 32 60C43.046 60 52 51.046 52 40C52 28 32 4 32 4Z"
        fill="#00A651"
      />
      {/* Inner concentric curved lines - 3 arcs creating a premium water ripple effect */}
      <path
        d="M32 14C32 14 20 30 20 39C20 45.627 25.373 51 32 51C38.627 51 44 45.627 44 39C44 30 32 14 32 14Z"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        strokeOpacity="0.5"
      />
      <path
        d="M32 22C32 22 24 33 24 38.5C24 42.918 27.582 46.5 32 46.5C36.418 46.5 40 42.918 40 38.5C40 33 32 22 32 22Z"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        strokeOpacity="0.65"
      />
      <path
        d="M32 29C32 29 28 35.5 28 38C28 40.209 29.791 42 32 42C34.209 42 36 40.209 36 38C36 35.5 32 29 32 29Z"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        strokeOpacity="0.8"
      />
      {/* Small highlight reflection */}
      <ellipse
        cx="26"
        cy="34"
        rx="3"
        ry="4.5"
        fill="white"
        fillOpacity="0.2"
        transform="rotate(-15 26 34)"
      />
    </svg>
  );
}

export default function Logo({
  variant = "full",
  size = "md",
  theme = "dark",
  showTagline = false,
  className = "",
}: LogoProps) {
  const s = sizes[size];
  // Logo heights — sized to compensate for whitespace in the PNG
  const logoHeights = { sm: 44, md: 58, lg: 80 };

  // Use real transparent PNG for both themes
  if (variant !== "icon") {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <img
          src="/imgs/logo-transparente.png"
          alt="EcoGreen Unidades Sanitarias Portátiles"
          style={{
            height: logoHeights[size],
            width: "auto",
            transform: "scale(1.3)",
            transformOrigin: "left center",
            filter: "none",
          }}
        />
      </div>
    );
  }

  // Icon-only fallback: SVG
  const ecoColor = theme === "light" ? "#FFFFFF" : "#6D6E71";
  const greenColor = "#00A651";

  return (
    <div
      className={`inline-flex items-center ${className}`}
      style={{ gap: s.gap }}
    >
      {(variant === "full" || variant === "icon") && (
        <WaterDropIcon size={s.icon} />
      )}
      {(variant === "full" || variant === "text") && (
        <div className="flex flex-col">
          <div className="flex items-baseline" style={{ lineHeight: 1.1 }}>
            <span
              className="font-display font-semibold tracking-wide"
              style={{ fontSize: s.fontSize, color: ecoColor }}
            >
              eco
            </span>
            <span
              className="font-display font-bold tracking-wide"
              style={{ fontSize: s.fontSize, color: greenColor }}
            >
              green
            </span>
            <sup
              style={{
                fontSize: s.fontSize * 0.3,
                color: greenColor,
                marginLeft: 2,
                verticalAlign: "super",
              }}
            >
              &reg;
            </sup>
          </div>
          {showTagline && (
            <span
              className="font-body uppercase tracking-[0.15em] text-current opacity-50"
              style={{ fontSize: s.taglineSize, marginTop: 2 }}
            >
              Unidades Sanitarias Port&aacute;tiles
            </span>
          )}
        </div>
      )}
    </div>
  );
}
