import { describe, expect, it } from "vitest";

import { assertJsonObject, methodNotAllowed } from "@/lib/api/route-utils";

describe("route utilities", () => {
  it("returns 405 with Allow header", async () => {
    const response = methodNotAllowed(["POST"]);
    expect(response.status).toBe(405);
    expect(response.headers.get("Allow")).toBe("POST");
  });

  it("rejects non-object JSON bodies", () => {
    const result = assertJsonObject(["invalid"]);
    expect("error" in result).toBe(true);
  });

  it("accepts plain objects", () => {
    const result = assertJsonObject({ email: "test@test.com" });
    expect("record" in result).toBe(true);
    if ("record" in result) {
      expect(result.record.email).toBe("test@test.com");
    }
  });
});
