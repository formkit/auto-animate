import { test, expect } from '@playwright/test'
import { approximateMemoryUsage, forceGC } from './utils'

// This is a coarse-grained smoke test for memory growth after repeated operations.
// It is expected to fail currently due to known leaks.
test('memory does not grow unbounded after repeated add/remove', async ({ page, browserName }) => {
  test.skip(browserName !== 'chromium', 'Coarse memory check limited to Chromium')
  test.setTimeout(60_000)
  await page.goto('/lists')

  // Warm-up interactions
  for (let i = 0; i < 10; i++) {
    await page.getByRole('button', { name: 'Add Fruit' }).click()
  }
  await page.waitForTimeout(100)
  await forceGC(page)

  const before = await approximateMemoryUsage(page)

  // Heavy interactions
  for (let i = 0; i < 100; i++) {
    if (i % 2 === 0) {
      await page.getByRole('button', { name: 'Add Fruit' }).click()
    } else {
      const removeBtn = page.locator('ul li button:has-text("Remove")').first()
      if (await removeBtn.count()) await removeBtn.click()
    }
  }
  await page.waitForTimeout(500)
  await forceGC(page)

  const after = await approximateMemoryUsage(page)

  test.skip(!before || !after, 'performance.memory not available')

  const growth = after!.usedJSHeapSize - before!.usedJSHeapSize
  // Allow some growth, but fail on suspiciously large deltas.
  // Use a stricter threshold when LEAK_STRICT=1 to help surface known leaks.
  const strict = process.env.LEAK_STRICT === '1'
  const threshold = strict ? 1 * 1024 * 1024 : 10 * 1024 * 1024
  expect(growth).toBeLessThan(threshold)
})

test.describe('polling timer leaks', () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.clock.install()
    await page.goto('/memory-test')
    await page.evaluate(() => {
      const setInterval = window.setInterval
      document.body.dataset.pollingStarts = '0'
      let pollingStarts = 0
      window.setInterval = (handler, delay, ...args) => {
        if (delay === 2000) {
          document.body.dataset.pollingStarts = String(++pollingStarts)
        }
        return setInterval(handler, delay, ...args)
      }
    })
  })

  test('starts one polling loop after repeated initialization', async ({ page }) => {
    await page.getByRole('button', { name: 'Init like FormKit' }).click()
    await page.clock.runFor(2000)
    await expect(page.locator('body')).toHaveAttribute('data-polling-starts', '1')
  })

  test('does not start polling after immediate destruction', async ({ page }) => {
    await page.getByRole('button', { name: 'Remove immediately destroyed element' }).click()
    await page.clock.runFor(2000)
    await expect(page.locator('body')).toHaveAttribute('data-polling-starts', '0')
  })
})
