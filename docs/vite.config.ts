import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import UnoCSS from 'unocss/vite';

export default defineConfig({
  root: "./",
  plugins: [vue(),UnoCSS()],
  ssgOptions: {
    includeAllRoutes: true,
  },
  assetsInclude: ["**/*.svg"],
})
