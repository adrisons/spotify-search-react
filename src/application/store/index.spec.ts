import { describe, expect, it } from "vitest";
import { persistConfig } from ".";

describe("store persistence", () => {
  it("does not persist OAuth session data", () => {
    expect(persistConfig.blacklist).toContain("session");
  });
});
