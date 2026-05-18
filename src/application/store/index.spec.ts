import { describe, expect, it } from "vitest";
import { persistConfig } from ".";

describe("store persistence", () => {
  it("persists session data including refresh token", () => {
    expect(persistConfig.blacklist ?? []).not.toContain("session");
  });
});
