import type { Meta, StoryObj } from "@storybook/react";
import { LazyImage } from "./LazyImage";

const meta: Meta<typeof LazyImage> = {
  title: "Components/LazyImage",
  component: LazyImage,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof LazyImage>;

export const Default: Story = {
  args: {
    src: "https://i.scdn.co/image/ab6761610000e5eb7de5b6703cba4115060d3b42",
    alt: "Artist photo",
    className: "h-24 w-24 rounded-full object-cover",
  },
};

export const Broken: Story = {
  args: {
    src: "https://invalid-url-that-will-fail.test/image.jpg",
    alt: "Broken image",
    className: "h-24 w-24 rounded-full",
  },
};

export const Square: Story = {
  args: {
    src: "https://i.scdn.co/image/ab67616d0000b273d97ba4e4f8c514e45868e4c4",
    alt: "Album cover",
    className: "h-10 w-10 rounded",
  },
};
