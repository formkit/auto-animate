import { defineConfig, searchForWorkspaceRoot } from "vite"
import marko from "@marko/vite"
import { fileURLToPath } from "node:url"

// This harness folder is the Vite root; the adapter (and its core) live in the
// repo's src/ tree, outside this folder, so we widen server.fs.allow to the
// workspace root (the dir containing pnpm-lock.yaml).
const here = fileURLToPath(new URL(".", import.meta.url))

export default defineConfig({
  root: here,
  plugins: [marko()],
  server: {
    fs: {
      allow: [searchForWorkspaceRoot(here)],
    },
  },
})
