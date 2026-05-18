import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Navbar } from "./Navbar";

const meta: Meta<typeof Navbar> = {
  title: "Components/Navbar",
  component: Navbar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  args: {
    onLogout: fn(),
  },
};
