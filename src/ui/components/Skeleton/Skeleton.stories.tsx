import type { Meta, StoryObj } from "@storybook/react";
import {
  Skeleton,
  ArtistCardSkeleton,
  TrackCardSkeleton,
  SearchResultsSkeleton,
} from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    className: "h-10 w-48",
  },
};

export const Circle: Story = {
  args: {
    className: "h-24 w-24 rounded-full",
  },
};

export const ArtistCard: Story = {
  render: () => <ArtistCardSkeleton />,
};

export const TrackCard: Story = {
  render: () => <TrackCardSkeleton />,
};

export const FullSearchResults: Story = {
  render: () => <SearchResultsSkeleton />,
};
