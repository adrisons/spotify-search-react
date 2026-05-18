import type { Meta, StoryObj } from "@storybook/react";
import { ArtistCard } from "./ArtistCard";
import type { Artist } from "@domain/models";

const meta: Meta<typeof ArtistCard> = {
  title: "Components/ArtistCard",
  component: ArtistCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ArtistCard>;

const baseArtist: Artist = {
  name: "Rosalía",
  id: "artist-1",
  external_urls: { spotify: "https://open.spotify.com/artist/7ltDVBr6mKbRvohxheJ9h1" },
  images: [{ url: "https://i.scdn.co/image/ab6761610000e5eb7de5b6703cba4115060d3b42", height: 640, width: 640 }],
  followers: { href: "", total: 12500000 },
  genres: ["pop", "flamenco"],
  href: "",
  popularity: 85,
  type: "artist",
  uri: "spotify:artist:7ltDVBr6mKbRvohxheJ9h1",
};

export const Default: Story = {
  args: {
    artist: baseArtist,
  },
};

export const NoImage: Story = {
  args: {
    artist: {
      ...baseArtist,
      name: "Unknown Artist",
      images: [],
    },
  },
};

export const LongName: Story = {
  args: {
    artist: {
      ...baseArtist,
      name: "The Very Long Named Artist With Many Words In Their Name",
    },
  },
};
