import { test, expect } from '@playwright/test'
import { assertNoConsoleErrors, withAnimationObserver } from './utils'

test.describe('Framework examples animate on interaction', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('#usage')).toBeVisible()
  })

  test('Vue example animates on remove', async ({ page }) => {
    const assertNoErrorsLater = await assertNoConsoleErrors(page)
    await page.locator('.vue-example').scrollIntoViewIfNeeded()
    await page.waitForTimeout(100)
    const observer = await withAnimationObserver(page, '.vue-example ul')
    await page.locator('.vue-example ul li').first().click()
    
    // Check multiple times to catch animations on slow systems
    let animationCount = 0
    for (let i = 0; i < 10; i++) {
      animationCount = await observer.count()
      if (animationCount > 0) break
      await page.waitForTimeout(50)
    }
    
    expect(animationCount).toBeGreaterThan(0)
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

  test('Solid example animates on toggle', async ({ page, browserName }) => {
    const assertNoErrorsLater = await assertNoConsoleErrors(page)
    // Scroll to make sure the Solid example is visible
    await page.locator('.solid-example').scrollIntoViewIfNeeded()
    // WebKit needs more time on slow systems
    await page.waitForTimeout(browserName === 'webkit' ? 1000 : 500)
    
    // Set up observer before clicking to catch animations
    const observer = await withAnimationObserver(page, '.solid-example .parent')
    
    // Click and immediately start checking for animations
    await page.getByRole('button', { name: 'Toggle Drawer' }).click()
    
    // Check multiple times to catch animations on slow systems
    let animationCount = 0
    for (let i = 0; i < 20; i++) { // More attempts for slow systems
      animationCount = await observer.count()
      if (animationCount > 0) break
      await page.waitForTimeout(50)
    }
    
    expect(animationCount).toBeGreaterThan(0)
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
    await page.waitForTimeout(200) // Give time for any scroll-triggered layouts
    const observer = await withAnimationObserver(page, '.angular-example')
    await page.locator('.angular-example .toggle-story-btn').first().click()
    
    // Check multiple times to catch animations on slow systems
    let animationCount = 0
    for (let i = 0; i < 10; i++) {
      animationCount = await observer.count()
      if (animationCount > 0) break
      await page.waitForTimeout(50)
    }
    
    expect(animationCount).toBeGreaterThan(0)
    await assertNoErrorsLater()
  })
})


