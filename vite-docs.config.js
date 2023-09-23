import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Markdown from "unplugin-vue-markdown/vite";
import MarkdownItAnchor from 'markdown-it-anchor'
import MarkdownItAttrs from 'markdown-it-attrs'
import hljs from "highlight.js"

export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Markdown({
      markdownItOptions: {
        langPrefix: 'hljs language-',
        highlight: function (str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return hljs.highlight(str, { language: lang }).value;
            } catch (__) {}
          }

          return ''; // use external default escaping
        },
      },
      markdownItSetup(md) {
        md.use(MarkdownItAnchor)
        md.use(MarkdownItAttrs)
      },
    }),
  ],
  build: {
    outDir: "dist-docs",
    rollupOptions: {},
  },
  test: {
    globals: true,
    environment: "happy-dom",
  },
});
