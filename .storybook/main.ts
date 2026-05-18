import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import { resolve } from "path";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          "@domain": resolve(__dirname, "../src/domain"),
          "@infrastructure": resolve(__dirname, "../src/infrastructure"),
          "@application": resolve(__dirname, "../src/application"),
          "@ui": resolve(__dirname, "../src/ui"),
          "@config": resolve(__dirname, "../src/config"),
          "@assets": resolve(__dirname, "../src/assets"),
        },
      },
    });
  },
};

export default config;
