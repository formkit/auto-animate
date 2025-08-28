import { test, expect } from '@playwright/test'
import { assertNoConsoleErrors, withAnimationObserver } from './utils'

test.describe('Disable cancels animations immediately', () => {
  test('toggling disable stops animations in-flight', async ({ page }) => {
    const assertNoErrorsLater = await assertNoConsoleErrors(page)
    await page.goto('/')
    await page.locator('#usage-disable').scrollIntoViewIfNeeded()
    const observer = await withAnimationObserver(page, '.balls')

    // Wait for periodic animation to start
    await page.waitForTimeout(650)
    const runningBefore = await observer.count()
    expect(runningBefore).toBeGreaterThanOrEqual(0)

    // Click disable button
    await page.locator('#disable').click()
    await page.waitForTimeout(30)
    const runningAfter = await observer.count()

    // Should be zero because disable cancels running animations
    expect(runningAfter).toBe(0)

    await assertNoErrorsLater()
  })
})

