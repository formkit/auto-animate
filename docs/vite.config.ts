import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

export default defineConfig({
  root: "./docs",
  plugins: [vue()],
})
