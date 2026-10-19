"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

import { useHydrated } from "@/hooks/use-hydrated";

const MD_BREAKPOINT = 768;

/**
 * Enables parallax only after hydration, on md+ viewports,
 * and when the user has not requested reduced motion.
 */
export function useParallaxEnabled(): boolean {
  const hydrated = useHydrated();
  const prefersReducedMotion = useReducedMotion();
  const [isMdUp, setIsMdUp] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${MD_BREAKPOINT}px)`);
    const update = () => setIsMdUp(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return hydrated && !prefersReducedMotion && isMdUp;
}
