import { test, expect } from '@playwright/test'
import { assertNoConsoleErrors, recordAnimationStarts } from './utils'

test.describe('Animations on examples', () => {
  test('list page animates on add/remove', async ({ page }) => {
    const assertNoErrorsLater = await assertNoConsoleErrors(page)
    await page.goto('/lists')

    await expect(page.locator('ul li')).toHaveCount(6)
    const animationStarts = await recordAnimationStarts(page.locator('ul'))

    await page.getByRole('button', { name: 'Add Fruit' }).click()
    await expect.poll(animationStarts).toBeGreaterThan(0)

    const startsAfterAdd = await animationStarts()
    await page.locator('ul li button', { hasText: 'Remove' }).first().click()
    await expect.poll(animationStarts).toBeGreaterThan(startsAfterAdd)

    await assertNoErrorsLater()
  })

  test('tests page dropdown animates', async ({ page }) => {
    const assertNoErrorsLater = await assertNoConsoleErrors(page)
    await page.goto('/tests')
    const dropdown = page.locator('.dropdown')
    const animationStarts = await recordAnimationStarts(dropdown)
    await dropdown.click()
    await expect.poll(animationStarts).toBeGreaterThan(0)
    await assertNoErrorsLater()
  })
})


