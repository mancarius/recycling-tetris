import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import basicSsl from '@vitejs/plugin-basic-ssl'
import { VitePWA } from 'vite-plugin-pwa'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

export default defineConfig({
  plugins: [vue(), basicSsl(), VitePWA({ registerType: 'autoUpdate' })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@config": path.resolve(__dirname, "./src/configs/configs.ts"),
      "@view": path.resolve(__dirname, "./src/views"),
      "@component": path.resolve(__dirname, "./src/components"),
      "@util": path.resolve(__dirname, "./src/utils"),
      "@service": path.resolve(__dirname, "./src/services"),
      "@type": path.resolve(__dirname, "./src/@types"),
      "@enum": path.resolve(__dirname, "./src/constants/enums"),
      "@composable": path.resolve(__dirname, "./src/composables"),
      "@asset": path.resolve(__dirname, "./src/assets"),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
  server: {
    https: true,
    host: true,
  },
  base: process.env.NODE_ENV === 'production' ? "/works/vue/recycling-tetris/" : "/",
});
