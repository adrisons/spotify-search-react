import React from "react";
import type { Preview } from "@storybook/react";
import "../src/index.css";

const preview: Preview = {
  decorators: [
    (Story) =>
      React.createElement(
        "div",
        { className: "dark relative min-h-screen bg-[#030303] text-foreground" },
        React.createElement(Story)
      ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#09090b" },
        { name: "light", value: "#ffffff" },
      ],
    },
  },
};

export default preview;
