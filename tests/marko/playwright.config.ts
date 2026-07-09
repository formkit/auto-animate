import { defineConfig, devices } from '@playwright/test'

// Standalone Playwright config for the Marko adapter's e2e tests, kept separate from
// the repo-root config on purpose: the Marko spec only needs the @marko/vite harness
// (port 5174), so this boots *only* that server — never the Vue docs app — and the
// maintainers' root playwright.config.ts stays untouched.
export default defineConfig({
  // Relative to this config's directory (tests/marko/). Picks up the *.spec.ts here.
  testDir: '.',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:5174',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    viewport: { width: 1200, height: 900 },
  },
  webServer: {
    // `pnpm exec` resolves the project-local vite (a bare `vite` is not on the PATH
    // of the shell Playwright spawns). pnpm runs the command from the package root,
    // so the --config path is written relative to the repo root.
    command: 'pnpm exec vite --config tests/marko/vite.config.ts --port=5174',
    port: 5174,
    stdout: 'pipe',
    stderr: 'pipe',
    reuseExistingServer: !process.env.CI,
    timeout: 60 * 1000,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
})