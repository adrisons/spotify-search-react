import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SPOTIFY_ICON } from "@config/assets";
import { LazyImage } from "./LazyImage";

describe("LazyImage", () => {
  it("should render img without native lazy loading (breaks in horizontal scroll)", () => {
    render(<LazyImage src="https://img.test/photo.jpg" alt="Test" />);
    const img = screen.getByAltText("Test");
    expect(img).not.toHaveAttribute("loading", "lazy");
    expect(img).toHaveAttribute("decoding", "async");
  });

  it("should hide skeleton when image is already cached on mount", () => {
    const originalDescriptor = Object.getOwnPropertyDescriptor(
      HTMLImageElement.prototype,
      "complete"
    );
    Object.defineProperty(HTMLImageElement.prototype, "complete", {
      configurable: true,
      get() {
        return true;
      },
    });
    Object.defineProperty(HTMLImageElement.prototype, "naturalWidth", {
      configurable: true,
      get() {
        return 100;
      },
    });

    render(
      <LazyImage
        src="https://img.test/cached.jpg"
        alt="Cached"
        className="h-24 w-24"
      />
    );

    expect(screen.queryByRole("status")).not.toBeInTheDocument();

    if (originalDescriptor) {
      Object.defineProperty(
        HTMLImageElement.prototype,
        "complete",
        originalDescriptor
      );
    }
  });

  it("should show skeleton before image loads", () => {
    render(
      <LazyImage
        src="https://img.test/photo.jpg"
        alt="Test"
        className="h-24 w-24"
      />
    );
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("should hide skeleton after image loads", () => {
    render(
      <LazyImage
        src="https://img.test/photo.jpg"
        alt="Test"
        className="h-24 w-24"
      />
    );
    const img = screen.getByAltText("Test");
    fireEvent.load(img);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("should use spotify icon when remote image fails to load", () => {
    render(
      <LazyImage
        src="https://invalid.test/fail.jpg"
        alt="Broken"
        className="h-24 w-24"
      />
    );
    const img = screen.getByAltText("Broken");
    fireEvent.error(img);
    expect(img).toHaveAttribute("src", SPOTIFY_ICON);
  });

  it("should show initial letter when fallback image also fails", () => {
    render(
      <LazyImage
        src="https://invalid.test/fail.jpg"
        alt="Broken"
        className="h-24 w-24"
      />
    );
    const img = screen.getByAltText("Broken");
    fireEvent.error(img);
    fireEvent.error(img);
    expect(screen.getByText("B")).toBeInTheDocument();
  });
});
