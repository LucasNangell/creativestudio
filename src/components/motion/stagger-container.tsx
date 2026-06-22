"use client";

import { motion, useReducedMotion } from "framer-motion";

import { useHydrated } from "@/hooks/use-hydrated";

type StaggerContainerProps = {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul" | "section";
};

export function StaggerContainer({
  children,
  className,
  stagger = 0.08,
  as = "div",
}: StaggerContainerProps) {
  const hydrated = useHydrated();
  const prefersReducedMotion = useReducedMotion();
  const StaticComponent = as;

  if (!hydrated || prefersReducedMotion) {
    return <StaticComponent className={className}>{children}</StaticComponent>;
  }

  const Component = motion[as];

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger },
        },
      }}
      className={className}
    >
      {children}
    </Component>
  );
}

type StaggerItemProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
};

export function StaggerItem({
  children,
  className,
  as = "div",
}: StaggerItemProps) {
  const hydrated = useHydrated();
  const prefersReducedMotion = useReducedMotion();
  const StaticComponent = as;

  if (!hydrated || prefersReducedMotion) {
    return <StaticComponent className={className}>{children}</StaticComponent>;
  }

  const Component = motion[as];

  return (
    <Component
      variants={{
        hidden: { opacity: 0, y: 12 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className={className}
    >
      {children}
    </Component>
  );
}
