import { describe, it, expect, beforeEach, vi } from "vitest";
import { HttpClient } from "./httpClient";

describe("HttpClient", () => {
  let client: HttpClient;

  beforeEach(() => {
    client = new HttpClient();
    vi.restoreAllMocks();
  });

  describe("get", () => {
    it("should make a GET request and return JSON data", async () => {
      const mockData = { name: "test" };
      vi.spyOn(globalThis, "fetch").mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockData),
      } as Response);

      const result = await client.get("http://api.test.com/data");

      expect(fetch).toHaveBeenCalledWith("http://api.test.com/data", {
        headers: {},
      });
      expect(result).toEqual(mockData);
    });

    it("should include auth header when token is set", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({}),
      } as Response);

      client.setAuthToken("my-token");
      await client.get("http://api.test.com/data");

      expect(fetch).toHaveBeenCalledWith("http://api.test.com/data", {
        headers: { Authorization: "Bearer my-token" },
      });
    });

    it("should throw on non-ok response", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValue({
        ok: false,
        status: 401,
        statusText: "Unauthorized",
      } as Response);

      await expect(client.get("http://api.test.com/data")).rejects.toThrow(
        "HTTP 401: Unauthorized"
      );
    });
  });
});
