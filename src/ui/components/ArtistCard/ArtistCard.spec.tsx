import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ArtistCard } from "./ArtistCard";
import type { Artist } from "@domain/models";

const ARTIST_MOCK: Artist = {
  name: "Rosalia",
  id: "artist-1",
  external_urls: { spotify: "https://open.spotify.com/artist/1" },
  images: [{ url: "https://img.test/artist.jpg", height: 300, width: 300 }],
  followers: { href: "", total: 1000 },
  genres: ["pop"],
  href: "",
  popularity: 90,
  type: "artist",
  uri: "spotify:artist:1",
};

describe("ArtistCard", () => {
  it("should render artist name", () => {
    render(<ArtistCard artist={ARTIST_MOCK} />);
    expect(screen.getByText("Rosalia")).toBeInTheDocument();
  });

  it("should render artist image with lazy loading", () => {
    render(<ArtistCard artist={ARTIST_MOCK} />);
    const img = screen.getByAltText("Rosalia");
    expect(img).toHaveAttribute("src", ARTIST_MOCK.images[0]!.url);
    expect(img).toHaveAttribute("loading", "lazy");
  });

  it("should link to Spotify page", () => {
    render(<ArtistCard artist={ARTIST_MOCK} />);
    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute(
      "href",
      ARTIST_MOCK.external_urls.spotify
    );
  });

  it("should display Artist tag", () => {
    render(<ArtistCard artist={ARTIST_MOCK} />);
    expect(screen.getByText("Artist")).toBeInTheDocument();
  });
});
