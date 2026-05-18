import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { refreshAccessToken } from "./spotifyAuth";

describe("refreshAccessToken", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns token data on success", async () => {
    const tokenData = {
      access_token: "new-access",
      token_type: "Bearer",
      expires_in: 3600,
      scope: "user-read-private",
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(tokenData),
    } as Response);

    const result = await refreshAccessToken("refresh-123", "client-id");

    expect(fetch).toHaveBeenCalledWith(
      "https://accounts.spotify.com/api/token",
      expect.objectContaining({ method: "POST" })
    );
    expect(result).toEqual(tokenData);
  });

  it("returns null when refresh fails", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      text: () => Promise.resolve("invalid_grant"),
    } as Response);

    const result = await refreshAccessToken("bad-refresh", "client-id");

    expect(result).toBeNull();
  });
});
