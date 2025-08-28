import { test, expect } from '@playwright/test'
import { assertNoConsoleErrors } from './utils'

test.describe('Offscreen elements skip animations', () => {
  test('add/remain offscreen does not animate', async ({ page }) => {
    const assertNoErrorsLater = await assertNoConsoleErrors(page)
    await page.goto('/lists')

    const list = page.locator('ul')
    await expect(list).toBeVisible()

    // Scroll the list out of view (above the viewport)
    await page.evaluate(() => {
      const ul = document.querySelector('ul')!
      const rect = ul.getBoundingClientRect()
      window.scrollBy({ top: rect.top - 200 })
    })
    await page.waitForTimeout(50)

    // Trigger add while offscreen
    const beforeCount = await page.locator('ul li').count()
    await page.getByRole('button', { name: 'Add Fruit' }).click()
    await page.waitForTimeout(100)
    const afterCount = await page.locator('ul li').count()
    expect(afterCount).toBe(beforeCount + 1)

    // Verify the newly added element has no running animations
    const lastAnimations = await page.evaluate(() => {
      const ul = document.querySelector('ul')!
      const last = ul.querySelector('li:last-child') as HTMLElement
      const anims = last?.getAnimations ? last.getAnimations({ subtree: true }) : []
      return anims.filter(a => a.playState === 'running' || (a.currentTime && a.effect)).length
    })
    expect(lastAnimations).toBeLessThanOrEqual(1)

    await assertNoErrorsLater()
  })
})

