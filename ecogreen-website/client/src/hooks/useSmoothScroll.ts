import { useEffect } from "react";

/**
 * Custom smooth scroll hook using requestAnimationFrame
 * for a premium, buttery-smooth scroll experience.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!anchor) return;

      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;

      const el = document.querySelector(id);
      if (!el) return;

      e.preventDefault();

      const targetY =
        el.getBoundingClientRect().top + window.scrollY;
      const startY = window.scrollY;
      const diff = targetY - startY;
      const duration = Math.min(1200, Math.max(400, Math.abs(diff) * 0.5));
      let startTime: number | null = null;

      function easeOutQuart(t: number) {
        return 1 - Math.pow(1 - t, 4);
      }

      function step(timestamp: number) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);

        window.scrollTo(0, startY + diff * easedProgress);

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      }

      requestAnimationFrame(step);
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);
}
