import { test, expect } from '@playwright/test'
import { assertNoConsoleErrors, withAnimationObserver } from '../e2e/utils'

// Served by the standalone Marko harness (this folder's playwright.config.ts sets
// baseURL to the @marko/vite server on :5174), so we navigate to '/'.
const LIST = '[data-testid="list"]'

test.describe('Marko <auto-animate> adapter', () => {
  test('animates on add, reorder, and remove', async ({ page }) => {
    const assertNoErrorsLater = await assertNoConsoleErrors(page)
    await page.goto('/')

    const list = page.getByTestId('list')
    await expect(list.locator('li')).toHaveCount(3)

    const observer = await withAnimationObserver(page, LIST)

    // Add → enter animation on the new child
    await page.getByTestId('add').click()
    await expect(list.locator('li')).toHaveCount(4)
    await page.waitForTimeout(50)
    expect(await observer.count()).toBeGreaterThan(0)

    // Let it settle, then reverse → move/FLIP (keyed by id: nodes persist and slide)
    await page.waitForTimeout(300)
    await page.getByTestId('reverse').click()
    await page.waitForTimeout(50)
    expect(await observer.count()).toBeGreaterThan(0)

    // Settle, then remove first → leave animation (the absolutely-positioned ghost)
    await page.waitForTimeout(300)
    await page.getByTestId('remove-first').click()
    await page.waitForTimeout(50)
    expect(await observer.count()).toBeGreaterThan(0)

    await assertNoErrorsLater()
  })

  test('node identity survives reorder (keyed <for by="id">)', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByTestId('item-1')).toHaveText('Item 1')
    // Mark the live DOM node, reverse, and confirm the SAME element instance moved
    // (FLIP) rather than being destroyed and recreated.
    await page.evaluate(() => {
      document
        .querySelector('[data-testid="item-1"]')!
        .setAttribute('data-marker', 'x')
    })
    await page.getByTestId('reverse').click()
    await page.waitForTimeout(350)
    await expect(page.locator('[data-testid="item-1"][data-marker="x"]')).toHaveCount(1)
  })

  test('enabled=false disables animation; re-enabling resumes it (no re-init)', async ({ page }) => {
    const assertNoErrorsLater = await assertNoConsoleErrors(page)
    await page.goto('/')

    const observer = await withAnimationObserver(page, LIST)

    // Turn animations off
    await page.getByTestId('toggle').click()
    await expect(page.getByTestId('toggle')).toHaveText(/off/)

    // Add while disabled → item appears, but no animation runs
    await page.getByTestId('add').click()
    await page.waitForTimeout(80)
    expect(await observer.count()).toBe(0)

    // Turn back on → next mutation animates again (same controller, just re-enabled)
    await page.getByTestId('toggle').click()
    await expect(page.getByTestId('toggle')).toHaveText(/on/)
    await page.getByTestId('add').click()
    await page.waitForTimeout(50)
    expect(await observer.count()).toBeGreaterThan(0)

    await assertNoErrorsLater()
  })
})