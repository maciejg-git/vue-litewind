import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const path = require("path");

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/components/index.js"),
      name: "MyLib",
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
