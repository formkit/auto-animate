import { defineConfig } from "vite"
import { qwikVite } from "@builder.io/qwik/optimizer"

export default defineConfig(() => {
  return {
    build: {
      target: "es2020",
      lib: {
        entry: "./src/index.ts",
        formats: ["es"],
        fileName: (format) => `index.qwik.${format === "es" ? "mjs" : "cjs"}`,
      },
      outDir: "../../dist/qwik",
      rollupOptions: {
        external: ["@formkit/auto-animate"],
      },
    },
    plugins: [qwikVite()],
  }
})
