import { test, expect } from '@playwright/test'
import { assertNoConsoleErrors, withAnimationObserver } from './utils'

test.describe('Animations on examples', () => {
  test('list page animates on add/remove', async ({ page }) => {
    const assertNoErrorsLater = await assertNoConsoleErrors(page)
    await page.goto('/lists')

    const observer = await withAnimationObserver(page, 'ul')
    // Ensure initial render
    await expect(page.locator('ul li')).toHaveCount(6)

    // Trigger add → should create at least one running animation on the list subtree
    await page.getByRole('button', { name: 'Add Fruit' }).click()
    await page.waitForTimeout(50)
    expect(await observer.count()).toBeGreaterThan(0)

    // Trigger remove → should animate
    await page.locator('ul li button', { hasText: 'Remove' }).first().click()
    await page.waitForTimeout(50)
    expect(await observer.count()).toBeGreaterThan(0)

    // No console errors
    await assertNoErrorsLater()
  })

  test('tests page dropdown animates', async ({ page }) => {
    const assertNoErrorsLater = await assertNoConsoleErrors(page)
    await page.goto('/tests')
    const observer = await withAnimationObserver(page, '.dropdown')
    await page.locator('.dropdown').click()
    await page.waitForTimeout(50)
    expect(await observer.count()).toBeGreaterThan(0)
    await assertNoErrorsLater()
  })
})


