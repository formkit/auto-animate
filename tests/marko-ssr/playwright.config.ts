import { defineConfig, devices } from "@playwright/test";

// Boots the SSR dev server (server.mjs) and runs the SSR spec in real Chromium. Run from the
// repo root:
//   pnpm exec playwright test --config tests/marko-ssr/playwright.config.ts
// The webServer command runs in this folder (Playwright's default cwd is the config dir), so
// `node server.mjs` finds server.mjs and its src/ here; Node resolves vite/@marko/vite from
// the repo-root node_modules by walking up.
export default defineConfig({
  testDir: ".",
  testMatch: /\.spec\.ts$/,
  timeout: 30_000,
  use: {
    baseURL: "http://localhost:5175",
    ...devices["Desktop Chrome"],
  },
  webServer: {
    command: "node server.mjs",
    url: "http://localhost:5175",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
