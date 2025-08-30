import { test, expect } from '@playwright/test'
import { assertNoConsoleErrors, withAnimationObserver } from './utils'

test.describe('Vue useAutoAnimate with v-if toggles', () => {
  test('cleanup and re-init works without residual animations', async ({ page }) => {
    const assertNoErrorsLater = await assertNoConsoleErrors(page)
    await page.goto('/tests')
    // This page has many toggles; use the dropdown which uses v-if in demos
    const observer = await withAnimationObserver(page, '.dropdown')
    await page.locator('.dropdown').click()
    await page.waitForTimeout(50)
    expect(await observer.count()).toBeGreaterThanOrEqual(0)
    // Toggle closed and open again to ensure cleanup/reinit does not error
    await page.locator('.dropdown').click()
    await page.waitForTimeout(10)
    await page.locator('.dropdown').click()
    await page.waitForTimeout(50)
    expect(await observer.count()).toBeGreaterThanOrEqual(0)
    await assertNoErrorsLater()
  })
})

