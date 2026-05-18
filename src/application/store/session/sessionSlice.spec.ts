import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import sessionReducer, {
  setLoggedIn,
  setAccessToken,
  setTokenExpiryDate,
  logout,
  selectIsValidSession,
} from "./sessionSlice";

describe("sessionSlice", () => {
  const initialState = {
    loggedIn: false,
    accessToken: undefined,
    tokenExpiryDate: undefined,
  };

  it("should return initial state", () => {
    expect(sessionReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("should handle setLoggedIn", () => {
    const state = sessionReducer(initialState, setLoggedIn(true));
    expect(state.loggedIn).toBe(true);
  });

  it("should handle setAccessToken", () => {
    const state = sessionReducer(initialState, setAccessToken("token-123"));
    expect(state.accessToken).toBe("token-123");
  });

  it("should handle setTokenExpiryDate", () => {
    vi.spyOn(Date, "now").mockReturnValue(1000);
    const state = sessionReducer(initialState, setTokenExpiryDate(3600000));
    expect(state.tokenExpiryDate).toBe(3601000);
    vi.restoreAllMocks();
  });

  it("should handle logout", () => {
    const loggedInState = {
      loggedIn: true,
      accessToken: "token",
      tokenExpiryDate: 99999999999,
    };
    const state = sessionReducer(loggedInState, logout());
    expect(state).toEqual(initialState);
  });

  describe("selectIsValidSession", () => {
    beforeEach(() => {
      vi.spyOn(Date, "now").mockReturnValue(5000);
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("returns true when session is valid", () => {
      const state = { session: { ...initialState, tokenExpiryDate: 10000 } };
      expect(selectIsValidSession(state)).toBe(true);
    });

    it("returns false when session is expired", () => {
      const state = { session: { ...initialState, tokenExpiryDate: 3000 } };
      expect(selectIsValidSession(state)).toBe(false);
    });

    it("returns false when no expiry date", () => {
      const state = { session: initialState };
      expect(selectIsValidSession(state)).toBe(false);
    });
  });
});
