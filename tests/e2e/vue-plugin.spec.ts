import { test, expect } from '@playwright/test'
import { assertNoConsoleErrors, withAnimationObserver } from './utils'

test.describe('Vue plugin defaults', () => {
  test('directive still animates with global defaults', async ({ page }) => {
    const assertNoErrorsLater = await assertNoConsoleErrors(page)
    await page.goto('/')
    const observer = await withAnimationObserver(page, '.vue-example ul')
    await page.locator('.vue-example ul li').first().click()
    await page.waitForTimeout(50)
    expect(await observer.count()).toBeGreaterThan(0)
    await assertNoErrorsLater()
  })
})

