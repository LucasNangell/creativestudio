import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SkipLink } from "@/components/global/skip-link";

describe("SkipLink", () => {
  it("renders accessible skip navigation link", () => {
    render(<SkipLink />);

    const link = screen.getByRole("link", { name: /ir para o conteúdo principal/i });
    expect(link).toHaveAttribute("href", "#main-content");
  });
});
