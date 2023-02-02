import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: "dist-docs",
    rollupOptions: {},
  },
  test: {
    globals: true,
    environment: "happy-dom",
  },
});
