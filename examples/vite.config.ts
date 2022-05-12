import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

export default defineConfig({
  root: "./examples",
  plugins: [vue()],
})
