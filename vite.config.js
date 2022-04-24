import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    // enable jest-like global test APIs
    globals: true,
    // simulate DOM with happy-dom
    // (requires installing happy-dom as a peer dependency)
    environment: 'happy-dom'
  },
  plugins: [vue()],
   build: {
    // lib: {
    //   entry: path.resolve(__dirname, 'src/components/index.js'),
    //   name: 'MyLib'
    // },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      // external: ['vue'],
      // output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        // globals: {
          // vue: 'Vue'
        // }
      // }
    }
  }
})
