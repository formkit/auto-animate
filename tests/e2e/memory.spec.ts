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

test.describe('createAutoAnimatePlugin-like memory growth', () => {
  test.beforeEach(async ({ page }) =>
    await page.goto('/memory-test')
  )

  test('releases targets repeatedly initialized like createAutoAnimatePlugin', async ({
    page,
    browserName,
    context,
  }) => {
    test.skip(browserName !== 'chromium', 'GC check limited to Chromium')

    await page.getByRole('button', { name: 'Init like FormKit' }).click()
    await page.waitForTimeout(2000)

    const session = await context.newCDPSession(page)
    await session.send('HeapProfiler.collectGarbage')
    await page.getByRole('button', { name: 'Check target' }).click()

    await expect(page.getByRole('status')).toHaveText('collected')
  })

  test('releases target destroyed before polling starts', async ({
    page,
    browserName,
    context,
  }) => {
    test.skip(browserName !== 'chromium', 'GC check limited to Chromium')

    await page.getByRole('button', { name: 'Remove immediately destroyed element' }).click()
    await page.waitForTimeout(2000)

    const session = await context.newCDPSession(page)
    await session.send('HeapProfiler.collectGarbage')
    await page.getByRole('button', { name: 'Check target' }).click()

    await expect(page.getByRole('status')).toHaveText('collected')
  })
})
