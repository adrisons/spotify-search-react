import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Carousel } from "./Carousel";

describe("Carousel", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "ResizeObserver",
      vi.fn(() => ({
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
      }))
    );
  });

  it("should render children and region label", () => {
    render(
      <Carousel ariaLabel="Test carousel">
        <div>Item 1</div>
      </Carousel>
    );

    expect(screen.getByRole("region", { name: "Test carousel" })).toBeInTheDocument();
    expect(screen.getByText("Item 1")).toBeInTheDocument();
  });

  it("should render scroll list", () => {
    render(
      <Carousel ariaLabel="Test carousel">
        <div role="listitem">Item</div>
      </Carousel>
    );

    expect(screen.getByRole("list")).toBeInTheDocument();
  });
});
