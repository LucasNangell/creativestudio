import { describe, expect, it } from "vitest";

import {
  getFailedAttemptCount,
  isLoginBlocked,
  recordFailedLoginAttempt,
} from "@/lib/auth/middleware-utils";

describe("login brute-force protection", () => {
  it("blocks after max failed attempts", () => {
    const key = `test-${Date.now()}@example.com`;

    for (let i = 0; i < 10; i += 1) {
      recordFailedLoginAttempt(key);
    }

    expect(getFailedAttemptCount(key)).toBe(10);
    expect(isLoginBlocked(key)).toBe(true);
  });
});
