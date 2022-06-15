import {
  defineConfig
} from 'vite';
import vue from '@vitejs/plugin-vue';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
  server: {
    https: true,
    host: true,
  }
});
