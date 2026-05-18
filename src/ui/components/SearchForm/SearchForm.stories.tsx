import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { SearchForm } from "./SearchForm";

const meta: Meta<typeof SearchForm> = {
  title: "Components/SearchForm",
  component: SearchForm,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SearchForm>;

export const Default: Story = {
  args: {
    onSearch: fn(),
  },
};
