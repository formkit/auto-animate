import { test, expect } from '@playwright/test'
import { assertNoConsoleErrors, recordAnimationStarts } from './utils'

test.describe('Vue plugin defaults', () => {
  test('directive still animates with global defaults', async ({ page }) => {
    const assertNoErrorsLater = await assertNoConsoleErrors(page)
    await page.goto('/')
    const animationStarts = await recordAnimationStarts(page.locator('.vue-example ul'))
    await page.locator('.vue-example ul li').first().click()
    await expect.poll(animationStarts).toBeGreaterThan(0)
    await assertNoErrorsLater()
  })
})

