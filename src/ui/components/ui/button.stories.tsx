import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "UI/shadcn/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { children: "Primary" },
};

export const Spotify: Story = {
  args: {
    children: "Log in with Spotify",
    variant: "spotify",
    size: "spotify",
  },
};

export const Outline: Story = {
  args: {
    children: "Logout",
    variant: "outline",
    size: "sm",
  },
};
