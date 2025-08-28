import { test, expect } from '@playwright/test'
import { assertNoConsoleErrors, withAnimationObserver } from './utils'

test.describe('Bottom-aligned jumping fix (PR #211)', () => {
  test('should not create extra spacing when animating bottom-aligned list', async ({ page }) => {
    const assertNoErrorsLater = await assertNoConsoleErrors(page)
    await page.goto('/bottom-jump-test')

    // Wait for the list to be visible
    const list = page.locator('.bottom-aligned-list')
    await expect(list).toBeVisible()

    // Get initial list dimensions and position
    const initialBox = await list.boundingBox()
    expect(initialBox).not.toBeNull()
    
    const initialHeight = initialBox!.height
    const initialBottom = initialBox!.y + initialBox!.height

    // Set up animation observer
    const observer = await withAnimationObserver(page, '.bottom-aligned-list')

    // Get initial item count
    await expect(page.locator('.bottom-aligned-list .list-item')).toHaveCount(5)

    // Remove an item to trigger animation
    await page.locator('.list-item .remove-btn').first().click()

    // Wait for animation to start
    await page.waitForTimeout(50)
    expect(await observer.count()).toBeGreaterThan(0)

    // During animation, check that the list hasn't grown unexpectedly large
    // The list should not become significantly taller during the animation
    const duringAnimationBox = await list.boundingBox()
    expect(duringAnimationBox).not.toBeNull()
    
    const duringAnimationHeight = duringAnimationBox!.height
    const duringAnimationBottom = duringAnimationBox!.y + duringAnimationBox!.height

    // The list should not grow to be more than 50% taller during animation
    // This guards against the "jumping" issue where extra spacing appears
    expect(duringAnimationHeight).toBeLessThan(initialHeight * 1.5)
    
    // The bottom position should remain relatively stable (within 20px)
    // This ensures the list stays anchored to the bottom
    expect(Math.abs(duringAnimationBottom - initialBottom)).toBeLessThan(20)

    // Wait for animation to complete
    await page.waitForTimeout(1200) // Duration is 1000ms + buffer

    // Verify final state - should have 4 items
    await expect(page.locator('.bottom-aligned-list .list-item')).toHaveCount(4)

    // Final dimensions should be smaller than initial (one less item)
    const finalBox = await list.boundingBox()
    expect(finalBox).not.toBeNull()
    
    const finalHeight = finalBox!.height
    const finalBottom = finalBox!.y + finalBox!.height
    
    expect(finalHeight).toBeLessThan(initialHeight)
    
    // Bottom should remain anchored (within 5px of original)
    expect(Math.abs(finalBottom - initialBottom)).toBeLessThan(5)

    await assertNoErrorsLater()
  })

  test('should animate smoothly when removing multiple items from bottom-aligned list', async ({ page }) => {
    const assertNoErrorsLater = await assertNoConsoleErrors(page)
    await page.goto('/bottom-jump-test')

    const list = page.locator('.bottom-aligned-list')
    await expect(list).toBeVisible()

    const observer = await withAnimationObserver(page, '.bottom-aligned-list')

    // Remove multiple items in sequence
    for (let i = 0; i < 3; i++) {
      const initialBox = await list.boundingBox()
      expect(initialBox).not.toBeNull()
      
      const initialBottom = initialBox!.y + initialBox!.height

      // Remove an item
      await page.locator('.list-item .remove-btn').first().click()
      
      // Wait for animation to start
      await page.waitForTimeout(50)
      expect(await observer.count()).toBeGreaterThan(0)

      // Check that bottom position doesn't jump during animation
      const duringAnimationBox = await list.boundingBox()
      expect(duringAnimationBox).not.toBeNull()
      
      const duringAnimationBottom = duringAnimationBox!.y + duringAnimationBox!.height
      expect(Math.abs(duringAnimationBottom - initialBottom)).toBeLessThan(20)

      // Wait for this animation to complete before next removal
      await page.waitForTimeout(1200)
    }

    // Should have 2 items remaining
    await expect(page.locator('.bottom-aligned-list .list-item')).toHaveCount(2)

    await assertNoErrorsLater()
  })

  test('should maintain correct positioning after reset', async ({ page }) => {
    const assertNoErrorsLater = await assertNoConsoleErrors(page)
    await page.goto('/bottom-jump-test')

    const list = page.locator('.bottom-aligned-list')
    await expect(list).toBeVisible()

    // Get initial state
    const initialBox = await list.boundingBox()
    expect(initialBox).not.toBeNull()
    
    const initialBottom = initialBox!.y + initialBox!.height

    // Remove some items
    await page.locator('.list-item .remove-btn').first().click()
    await page.waitForTimeout(1200)
    
    await page.locator('.list-item .remove-btn').first().click()
    await page.waitForTimeout(1200)

    // Reset the list
    await page.locator('.reset-btn').click()
    await page.waitForTimeout(1200)

    // Should be back to 5 items
    await expect(page.locator('.bottom-aligned-list .list-item')).toHaveCount(5)

    // Position should be close to original
    const resetBox = await list.boundingBox()
    expect(resetBox).not.toBeNull()
    
    const resetBottom = resetBox!.y + resetBox!.height
    expect(Math.abs(resetBottom - initialBottom)).toBeLessThan(10)

    await assertNoErrorsLater()
  })

  test('should handle rapid interactions without visual glitches', async ({ page }) => {
    const assertNoErrorsLater = await assertNoConsoleErrors(page)
    await page.goto('/bottom-jump-test')

    const list = page.locator('.bottom-aligned-list')
    await expect(list).toBeVisible()

    const observer = await withAnimationObserver(page, '.bottom-aligned-list')

    // Rapidly remove and reset to stress test
    for (let i = 0; i < 3; i++) {
      // Remove item
      await page.locator('.list-item .remove-btn').first().click()
      await page.waitForTimeout(100) // Short wait
      
      // Reset immediately
      await page.locator('.reset-btn').click()
      await page.waitForTimeout(100)
    }

    // Wait for all animations to settle
    await page.waitForTimeout(2000)

    // Should have stable final state
    await expect(page.locator('.bottom-aligned-list .list-item')).toHaveCount(5)

    // List should still be properly positioned at bottom
    const finalBox = await list.boundingBox()
    expect(finalBox).not.toBeNull()
    
    // Should be within viewport and bottom-aligned
    const viewportHeight = page.viewportSize()?.height || 900
    expect(finalBox!.y + finalBox!.height).toBeGreaterThan(viewportHeight - 100)

    await assertNoErrorsLater()
  })
})