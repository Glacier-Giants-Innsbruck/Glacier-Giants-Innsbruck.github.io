import { resolve } from "path";
import { defineConfig } from "vite";


export default {
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        media: resolve(__dirname, 'src/media.html'),
        german: resolve(__dirname, 'src/de/index.html'),
      }
    }
  }
}