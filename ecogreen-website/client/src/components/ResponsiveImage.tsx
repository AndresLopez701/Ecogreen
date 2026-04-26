/*
 * ResponsiveImage — Apple/TuCarro-style responsive picture element.
 * Mobile gets the 480px variant (~20-40KB), desktop gets the full image.
 * Auto-derives the mobile variant from the src path.
 *
 * Usage:
 *   <ResponsiveImage src="/imgs/gallery-bodas-1.webp" alt="..." />
 *
 * For above-the-fold images use priority:
 *   <ResponsiveImage src="..." alt="..." priority />
 */

import type { CSSProperties } from "react";

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  /** Skip the mobile variant (use full image always) */
  noMobile?: boolean;
  /** Above-the-fold image — eager + high fetch priority */
  priority?: boolean;
  /** Optional onClick handler */
  onClick?: () => void;
}

export default function ResponsiveImage({
  src,
  alt,
  className,
  style,
  noMobile = false,
  priority = false,
  onClick,
}: ResponsiveImageProps) {
  // Derive mobile variant: /imgs/foo.webp → /imgs/foo-mobile.webp
  const mobileSrc = noMobile ? src : src.replace(/\.webp$/, "-mobile.webp");

  const loading = priority ? "eager" : "lazy";
  // fetchpriority is a valid HTML attribute; React 18.3+ supports the camelCase prop
  const fetchPriority = priority ? "high" : "auto";

  // AVIF variant — same path with .avif extension (only for mobile variants)
  const mobileAvif = noMobile ? null : mobileSrc.replace(/\.webp$/, ".avif");

  return (
    <picture>
      {/* Mobile: AVIF first (60% smaller), WebP fallback, then desktop */}
      {!noMobile && mobileAvif && (
        <source media="(max-width: 768px)" srcSet={mobileAvif} type="image/avif" />
      )}
      {!noMobile && (
        <source media="(max-width: 768px)" srcSet={mobileSrc} type="image/webp" />
      )}
      <img
        src={src}
        alt={alt}
        className={className}
        style={style}
        loading={loading}
        decoding="async"
        // @ts-expect-error — React types lag behind, fetchpriority is a valid attribute
        fetchpriority={fetchPriority}
        onClick={onClick}
      />
    </picture>
  );
}
