import { test, expect } from '@playwright/test'
import { assertNoConsoleErrors, withAnimationObserver, waitForActiveAnimations } from './utils'

test.describe('Framework examples animate on interaction', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('#usage')).toBeVisible()
  })

  test('Vue example animates on remove', async ({ page }) => {
    const assertNoErrorsLater = await assertNoConsoleErrors(page)
    const observer = await withAnimationObserver(page, '.vue-example ul')
    await page.locator('.vue-example ul li').first().click()
    await page.waitForTimeout(50)
    expect(await observer.count()).toBeGreaterThan(0)
    await assertNoErrorsLater()
  })

  test('React example animates on add', async ({ page }) => {
    const assertNoErrorsLater = await assertNoConsoleErrors(page)
    const observer = await withAnimationObserver(page, '.react-example ul')
    await page.getByRole('button', { name: 'Add number' }).click()
    await page.waitForTimeout(50)
    expect(await observer.count()).toBeGreaterThan(0)
    await assertNoErrorsLater()
  })

  test('Preact example animates on cycle', async ({ page }) => {
    const assertNoErrorsLater = await assertNoConsoleErrors(page)
    const observer = await withAnimationObserver(page, '.preact-example ul')
    await page.getByRole('button', { name: 'Cycle Emoji' }).click()
    await page.waitForTimeout(50)
    expect(await observer.count()).toBeGreaterThan(0)
    await assertNoErrorsLater()
  })

  test('Solid example animates on toggle', async ({ page }) => {
    const assertNoErrorsLater = await assertNoConsoleErrors(page)
    // Scroll to make sure the Solid example is visible
    await page.locator('.solid-example').scrollIntoViewIfNeeded()
    await page.waitForTimeout(200) // Give more time for any scroll-triggered layouts
    const observer = await withAnimationObserver(page, '.solid-example .parent')
    await page.getByRole('button', { name: 'Toggle Drawer' }).click()
    await page.waitForTimeout(100) // Additional wait for animation to start
    await waitForActiveAnimations(page, '.solid-example .parent')
    expect(await observer.count()).toBeGreaterThan(0)
    await assertNoErrorsLater()
  })

  test('Svelte example animates on add', async ({ page }) => {
    const assertNoErrorsLater = await assertNoConsoleErrors(page)
    // Scroll to make sure the Svelte example is visible
    await page.locator('.tag-input').scrollIntoViewIfNeeded()
    await page.waitForTimeout(100) // Give time for any scroll-triggered layouts
    const observer = await withAnimationObserver(page, '.tag-input ul')
    const input = page.locator('.tag-input input')
    await input.fill('Jazz')
    await input.press('Enter')
    await page.waitForTimeout(100) // Increased wait time for animation to start
    expect(await observer.count()).toBeGreaterThan(0)
    await assertNoErrorsLater()
  })

  test('Angular example animates on toggle', async ({ page }) => {
    const assertNoErrorsLater = await assertNoConsoleErrors(page)
    // Scroll to make sure the Angular example is visible
    await page.locator('.angular-example').scrollIntoViewIfNeeded()
    await page.waitForTimeout(100) // Give time for any scroll-triggered layouts
    const observer = await withAnimationObserver(page, '.angular-example')
    await page.locator('.angular-example .toggle-story-btn').first().click()
    await waitForActiveAnimations(page, '.angular-example')
    expect(await observer.count()).toBeGreaterThan(0)
    await assertNoErrorsLater()
  })
})


