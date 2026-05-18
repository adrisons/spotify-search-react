import { describe, expect, it } from "vitest";
import { persistConfig, removePersistedSession } from ".";

describe("store persistence", () => {
  it("does not persist OAuth session data", () => {
    expect(persistConfig.blacklist).toContain("session");
  });

  it("drops OAuth session data from previously persisted state", () => {
    const persistedState = {
      session: {
        loggedIn: true,
        accessToken: "access-token",
        tokenExpiryDate: 12345,
      },
      ui: {
        searchTerms: ["beatles"],
      },
      _persist: {
        version: -1,
        rehydrated: true,
      },
    };

    expect(removePersistedSession(persistedState)).toEqual({
      ui: {
        searchTerms: ["beatles"],
      },
      _persist: {
        version: -1,
        rehydrated: true,
      },
    });
  });
});
