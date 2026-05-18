import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@domain": resolve(__dirname, "src/domain"),
      "@infrastructure": resolve(__dirname, "src/infrastructure"),
      "@application": resolve(__dirname, "src/application"),
      "@ui": resolve(__dirname, "src/ui"),
      "@config": resolve(__dirname, "src/config"),
      "@assets": resolve(__dirname, "src/assets"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    css: true,
  },
});
