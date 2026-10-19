import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("framer-motion", async () => {
  const actual = await vi.importActual<typeof import("framer-motion")>(
    "framer-motion",
  );
  return {
    ...actual,
    useReducedMotion: vi.fn(() => true),
    useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
    useTransform: () => ({ get: () => "0%" }),
  };
});

vi.mock("@/hooks/use-hydrated", () => ({
  useHydrated: () => true,
}));

import { ParallaxLayer } from "./parallax-layer";

describe("ParallaxLayer", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query.includes("768"),
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    });
  });

  it("renders children statically when reduced motion is preferred", () => {
    render(
      <ParallaxLayer speed={0.2}>
        <span>Conteúdo estático</span>
      </ParallaxLayer>,
    );

    expect(screen.getByText("Conteúdo estático")).toBeInTheDocument();
  });

  it("renders without throwing on the client", () => {
    expect(() =>
      render(
        <ParallaxLayer>
          <p>Camada</p>
        </ParallaxLayer>,
      ),
    ).not.toThrow();
  });
});
