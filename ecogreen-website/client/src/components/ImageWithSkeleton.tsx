import { useState } from "react";
import { cn } from "@/lib/utils";

interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  className?: string;
  skeletonClassName?: string;
  style?: React.CSSProperties;
}

export default function ImageWithSkeleton({
  src,
  alt,
  className,
  skeletonClassName,
  style,
}: ImageWithSkeletonProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-full">
      {/* Skeleton shimmer */}
      {!loaded && (
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-r from-[#e8e3dc] via-[#f0ebe4] to-[#e8e3dc] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]",
            skeletonClassName
          )}
        />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        style={style}
        className={cn(
          "transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0",
          className
        )}
      />
    </div>
  );
}
