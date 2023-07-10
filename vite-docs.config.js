import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  define: {
    __APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
  build: {
    outDir: "dist-docs",
    rollupOptions: {},
  },
  test: {
    globals: true,
    environment: "happy-dom",
  },
});
