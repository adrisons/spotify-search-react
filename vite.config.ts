import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
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
  server: {
    port: 3000,
    host: "127.0.0.1",
  },
});
