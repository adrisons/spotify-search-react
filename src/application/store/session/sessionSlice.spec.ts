import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import sessionReducer, {
  setLoggedIn,
  setAccessToken,
  setRefreshToken,
  setTokenExpiryDate,
  setSession,
  applyTokenRefresh,
  logout,
  selectIsValidSession,
} from "./sessionSlice";

describe("sessionSlice", () => {
  const initialState = {
    loggedIn: false,
    accessToken: undefined,
    refreshToken: undefined,
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

  it("should handle setRefreshToken", () => {
    const state = sessionReducer(initialState, setRefreshToken("refresh-123"));
    expect(state.refreshToken).toBe("refresh-123");
  });

  it("should handle setTokenExpiryDate", () => {
    vi.spyOn(Date, "now").mockReturnValue(1000);
    const state = sessionReducer(initialState, setTokenExpiryDate(3600000));
    expect(state.tokenExpiryDate).toBe(3601000);
    vi.restoreAllMocks();
  });

  it("should handle setSession", () => {
    vi.spyOn(Date, "now").mockReturnValue(1000);
    const state = sessionReducer(
      initialState,
      setSession({
        accessToken: "access",
        refreshToken: "refresh",
        expiresInMs: 3600000,
      })
    );
    expect(state).toEqual({
      loggedIn: true,
      accessToken: "access",
      refreshToken: "refresh",
      tokenExpiryDate: 3601000,
    });
    vi.restoreAllMocks();
  });

  it("should handle applyTokenRefresh and keep refresh token when omitted", () => {
    vi.spyOn(Date, "now").mockReturnValue(1000);
    const state = sessionReducer(
      {
        loggedIn: true,
        accessToken: "old-access",
        refreshToken: "refresh",
        tokenExpiryDate: 500,
      },
      applyTokenRefresh({
        accessToken: "new-access",
        expiresInMs: 3600000,
      })
    );
    expect(state.accessToken).toBe("new-access");
    expect(state.refreshToken).toBe("refresh");
    expect(state.tokenExpiryDate).toBe(3601000);
    vi.restoreAllMocks();
  });

  it("should update refresh token when provided", () => {
    vi.spyOn(Date, "now").mockReturnValue(1000);
    const state = sessionReducer(
      {
        loggedIn: true,
        accessToken: "old-access",
        refreshToken: "old-refresh",
        tokenExpiryDate: 500,
      },
      applyTokenRefresh({
        accessToken: "new-access",
        expiresInMs: 3600000,
        refreshToken: "new-refresh",
      })
    );
    expect(state.refreshToken).toBe("new-refresh");
    vi.restoreAllMocks();
  });

  it("should handle logout", () => {
    const loggedInState = {
      loggedIn: true,
      accessToken: "token",
      refreshToken: "refresh",
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
