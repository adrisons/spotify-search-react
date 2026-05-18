import { describe, expect, it } from "vitest";
import type { PersistedState } from "redux-persist";
import { persistConfig } from ".";

describe("store persistence", () => {
  it("does not persist OAuth session data", () => {
    expect(persistConfig.blacklist).toContain("session");
  });

  it("drops OAuth session data from legacy persisted state", async () => {
    const legacyPersistedState = {
      session: {
        loggedIn: true,
        accessToken: "stored-token",
        tokenExpiryDate: 123456789,
      },
      ui: {
        searchTerms: ["artist"],
      },
      _persist: {
        version: -1,
        rehydrated: true,
      },
    } as unknown as PersistedState;

    const migratedState = await persistConfig.migrate!(
      legacyPersistedState,
      persistConfig.version!
    );

    expect(migratedState).not.toHaveProperty("session");
    expect(migratedState).toMatchObject({
      ui: {
        searchTerms: ["artist"],
      },
    });
  });
});
