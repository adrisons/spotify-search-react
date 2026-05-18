import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Skeleton,
  ArtistCardSkeleton,
  TrackCardSkeleton,
  SearchResultsSkeleton,
} from "./Skeleton";

describe("Skeleton", () => {
  it("should render with loading role", () => {
    render(<Skeleton />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("should apply custom className", () => {
    render(<Skeleton className="h-10 w-48" />);
    const el = screen.getByRole("status");
    expect(el.className).toContain("h-10");
    expect(el.className).toContain("w-48");
  });
});

describe("ArtistCardSkeleton", () => {
  it("should render skeleton placeholders", () => {
    const { container } = render(<ArtistCardSkeleton />);
    const skeletons = container.querySelectorAll("[role='status']");
    expect(skeletons.length).toBe(3);
  });
});

describe("TrackCardSkeleton", () => {
  it("should render skeleton placeholders", () => {
    const { container } = render(<TrackCardSkeleton />);
    const skeletons = container.querySelectorAll("[role='status']");
    expect(skeletons.length).toBe(4);
  });
});

describe("SearchResultsSkeleton", () => {
  it("should render multiple artist and track skeletons", () => {
    const { container } = render(<SearchResultsSkeleton />);
    const skeletons = container.querySelectorAll("[role='status']");
    expect(skeletons.length).toBeGreaterThan(10);
  });
});
