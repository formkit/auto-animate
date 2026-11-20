import { test, expect } from '@playwright/test'
import { assertNoConsoleErrors, recordAnimationStarts } from './utils'

test.describe('Framework examples animate on interaction', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('#usage')).toBeVisible()
  })

  test('Vue example animates on remove', async ({ page }) => {
    const assertNoErrorsLater = await assertNoConsoleErrors(page)
    await page.locator('.vue-example').scrollIntoViewIfNeeded()
    await page.waitForTimeout(100)
    const animationStarts = await recordAnimationStarts(page.locator('.vue-example ul'))
    await page.locator('.vue-example ul li').first().click()
    await expect.poll(animationStarts).toBeGreaterThan(0)
    await assertNoErrorsLater()
  })

  test('React example animates on add', async ({ page }) => {
    const assertNoErrorsLater = await assertNoConsoleErrors(page)
    const animationStarts = await recordAnimationStarts(page.locator('.react-example ul'))
    await page
      .locator('.react-example')
      .getByRole('button', { name: 'Add number' })
      .click()
    await expect.poll(animationStarts).toBeGreaterThan(0)
    await assertNoErrorsLater()
  })

  test('Marko example animates on bump-to-top', async ({ page }) => {
    const assertNoErrorsLater = await assertNoConsoleErrors(page)
    await page.locator('.marko-example').scrollIntoViewIfNeeded()
    await page.waitForTimeout(100)
    const animationStarts = await recordAnimationStarts(page.locator('.marko-example ul'))
    const items = page.locator('.marko-example ul li')
    const bumped = await items.last().textContent()
    await items.last().click()
    await expect.poll(animationStarts).toBeGreaterThan(0)
    // The clicked artist moved to the top of the bill.
    await expect(items.first()).toHaveText(bumped!)
    await assertNoErrorsLater()
  })

  test('Preact example animates on cycle', async ({ page }) => {
    const assertNoErrorsLater = await assertNoConsoleErrors(page)
    const animationStarts = await recordAnimationStarts(page.locator('.preact-example ul'))
    await page.getByRole('button', { name: 'Cycle Emoji' }).click()
    await expect.poll(animationStarts).toBeGreaterThan(0)
    await assertNoErrorsLater()
  })

  test('Solid example animates on toggle', async ({ page, browserName }) => {
    const assertNoErrorsLater = await assertNoConsoleErrors(page)
    // Scroll to make sure the Solid example is visible
    await page.locator('.solid-example').scrollIntoViewIfNeeded()
    // WebKit needs more time on slow systems
    await page.waitForTimeout(browserName === 'webkit' ? 1000 : 500)
    const animationStarts = await recordAnimationStarts(page.locator('.solid-example .parent'))
    await page.getByRole('button', { name: 'Toggle Drawer' }).click()
    await expect.poll(animationStarts).toBeGreaterThan(0)
    await assertNoErrorsLater()
  })

  test('Svelte example animates on add', async ({ page }) => {
    const assertNoErrorsLater = await assertNoConsoleErrors(page)
    // Scroll to make sure the Svelte example is visible
    await page.locator('.tag-input').scrollIntoViewIfNeeded()
    await page.waitForTimeout(100) // Give time for any scroll-triggered layouts
    const animationStarts = await recordAnimationStarts(page.locator('.tag-input ul'))
    const input = page.locator('.tag-input input')
    await input.fill('Jazz')
    await input.press('Enter')
    await expect.poll(animationStarts).toBeGreaterThan(0)
    await assertNoErrorsLater()
  })

  test('Angular example animates on toggle', async ({ page }) => {
    const assertNoErrorsLater = await assertNoConsoleErrors(page)
    // Scroll to make sure the Angular example is visible
    await page.locator('.angular-example').scrollIntoViewIfNeeded()
    await page.waitForTimeout(200) // Give time for any scroll-triggered layouts
    const animationStarts = await recordAnimationStarts(page.locator('.angular-example'))
    await page.locator('.angular-example .toggle-story-btn').first().click()
    await expect.poll(animationStarts).toBeGreaterThan(0)
    await assertNoErrorsLater()
  })
})


