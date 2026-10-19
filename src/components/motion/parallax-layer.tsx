"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

import { useParallaxEnabled } from "@/hooks/use-parallax-enabled";
import { cn } from "@/lib/utils";

type ScrollOffset = Parameters<typeof useScroll>[0] extends
  | { offset?: infer O }
  | undefined
  ? O
  : never;

type ParallaxLayerProps = {
  children: ReactNode;
  className?: string;
  /** Scroll-linked Y offset factor. Typical range: -0.3 to 0.3. */
  speed?: number;
  offset?: ScrollOffset;
  "aria-hidden"?: boolean | "true" | "false";
};

const DEFAULT_OFFSET = ["start end", "end start"] as ScrollOffset;

function ParallaxMotion({
  children,
  className,
  speed,
  offset,
  "aria-hidden": ariaHidden,
}: {
  children: ReactNode;
  className?: string;
  speed: number;
  offset: ScrollOffset;
  "aria-hidden"?: boolean | "true" | "false";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  const y: MotionValue<string> = useTransform(
    scrollYProgress,
    [0, 1],
    [`${speed * -100}%`, `${speed * 100}%`],
  );

  return (
    <motion.div
      ref={ref}
      style={{ y, willChange: "transform" }}
      className={className}
      aria-hidden={ariaHidden}
    >
      {children}
    </motion.div>
  );
}

export function ParallaxLayer({
  children,
  className,
  speed = 0.15,
  offset = DEFAULT_OFFSET,
  "aria-hidden": ariaHidden,
}: ParallaxLayerProps) {
  const enabled = useParallaxEnabled();

  if (!enabled) {
    return (
      <div className={cn(className)} aria-hidden={ariaHidden}>
        {children}
      </div>
    );
  }

  return (
    <ParallaxMotion
      className={className}
      speed={speed}
      offset={offset}
      aria-hidden={ariaHidden}
    >
      {children}
    </ParallaxMotion>
  );
}
