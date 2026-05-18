import type { Meta, StoryObj } from "@storybook/react";
import { TrackCard } from "./TrackCard";
import type { Track } from "@domain/models";

const meta: Meta<typeof TrackCard> = {
  title: "Components/TrackCard",
  component: TrackCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TrackCard>;

const baseTrack: Track = {
  name: "DESPECHÁ",
  id: "track-1",
  artists: [
    {
      name: "Rosalía",
      id: "artist-1",
      external_urls: { spotify: "https://open.spotify.com/artist/7ltDVBr6mKbRvohxheJ9h1" },
      images: [],
      followers: { href: "", total: 0 },
      genres: [],
      href: "",
      popularity: 0,
      type: "artist",
      uri: "",
    },
  ],
  album: {
    images: [{ url: "https://i.scdn.co/image/ab67616d0000b273d97ba4e4f8c514e45868e4c4", height: 640, width: 640 }],
  },
  duration_ms: 174000,
  explicit: false,
  external_urls: { spotify: "https://open.spotify.com/track/123" },
  href: "",
  preview_url: "",
  type: "track",
  uri: "",
};

export const Default: Story = {
  args: {
    track: baseTrack,
  },
};

export const LongTitle: Story = {
  args: {
    track: {
      ...baseTrack,
      name: "A Very Long Track Title That Might Overflow The Component Layout",
    },
  },
};

export const ShortDuration: Story = {
  args: {
    track: {
      ...baseTrack,
      duration_ms: 45000,
    },
  },
};
