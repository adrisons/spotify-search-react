import { renderHook, act } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import type { ReactNode } from "react";
import { useSearchQueryParam } from "./useSearchQueryParam";

function wrapper(initialEntries: string[]) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>;
  };
}

describe("useSearchQueryParam", () => {
  it("reads the search query from the URL", () => {
    const { result } = renderHook(() => useSearchQueryParam(), {
      wrapper: wrapper(["/?q=beatles"]),
    });

    expect(result.current.query).toBe("beatles");
  });

  it("returns an empty string when the param is missing", () => {
    const { result } = renderHook(() => useSearchQueryParam(), {
      wrapper: wrapper(["/"]),
    });

    expect(result.current.query).toBe("");
  });

  it("updates the URL when setQuery is called", () => {
    const { result } = renderHook(() => useSearchQueryParam(), {
      wrapper: wrapper(["/"]),
    });

    act(() => {
      result.current.setQuery("radiohead");
    });

    expect(result.current.query).toBe("radiohead");
  });

  it("removes the param when setQuery receives whitespace only", () => {
    const { result } = renderHook(() => useSearchQueryParam(), {
      wrapper: wrapper(["/?q=beatles"]),
    });

    act(() => {
      result.current.setQuery("   ");
    });

    expect(result.current.query).toBe("");
  });
});
