"use client";

import { motion, useReducedMotion } from "framer-motion";

import { useHydrated } from "@/hooks/use-hydrated";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  as?: "div" | "section" | "article";
};

const directionOffset = {
  up: { y: 16, x: 0 },
  down: { y: -16, x: 0 },
  left: { x: 16, y: 0 },
  right: { x: -16, y: 0 },
  none: { x: 0, y: 0 },
} as const;

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  as = "div",
}: RevealProps) {
  const hydrated = useHydrated();
  const prefersReducedMotion = useReducedMotion();
  const StaticComponent = as;
  const offset = directionOffset[direction];

  if (!hydrated || prefersReducedMotion) {
    return <StaticComponent className={className}>{children}</StaticComponent>;
  }

  const Component = motion[as];

  return (
    <Component
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Component>
  );
}
