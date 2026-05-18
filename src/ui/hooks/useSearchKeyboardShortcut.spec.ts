import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useSearchKeyboardShortcut } from "./useSearchKeyboardShortcut";

describe("useSearchKeyboardShortcut", () => {
  it("calls focusSearch on Meta+K", () => {
    const focusSearch = vi.fn();
    renderHook(() => useSearchKeyboardShortcut(focusSearch));

    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true })
    );

    expect(focusSearch).toHaveBeenCalledOnce();
  });

  it("calls focusSearch on Control+K", () => {
    const focusSearch = vi.fn();
    renderHook(() => useSearchKeyboardShortcut(focusSearch));

    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true })
    );

    expect(focusSearch).toHaveBeenCalledOnce();
  });

  it("does not call focusSearch when typing in an input", () => {
    const focusSearch = vi.fn();
    renderHook(() => useSearchKeyboardShortcut(focusSearch));

    const input = document.createElement("input");
    document.body.appendChild(input);
    input.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "k",
        metaKey: true,
        bubbles: true,
      })
    );

    expect(focusSearch).not.toHaveBeenCalled();
    document.body.removeChild(input);
  });
});
