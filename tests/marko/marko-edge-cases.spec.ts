import { test, expect } from '@playwright/test'
import { assertNoConsoleErrors, withAnimationObserver } from '../e2e/utils'

const LIST = '[data-testid="list"]'
const PRIM = '[data-testid="prim-list"]'
const COND = '[data-testid="cond-list"]'

test.describe('Marko <auto-animate> — edge cases', () => {
  // Scenario 4: removing every child triggers Marko's textContent="" fast path; the
  // removal ghost vs that clear must not crash (the §5 crux), and re-adding still works.
  test('clear all (textContent fast path) then re-add is clean and animates', async ({ page }) => {
    const assertNoErrorsLater = await assertNoConsoleErrors(page)
    await page.goto('/')
    const list = page.getByTestId('list')
    await expect(list.locator('li')).toHaveCount(3)

    const observer = await withAnimationObserver(page, LIST)

    // Remove all at once → sole-content list cleared via textContent="".
    await page.getByTestId('clear').click()
    // Auto-waits past the removal-ghost animation until the list is truly empty.
    await expect(list.locator('li')).toHaveCount(0)

    // Re-add → list still functions; the new child animates in.
    await page.getByTestId('add').click()
    await expect(list.locator('li')).toHaveCount(1)
    await page.waitForTimeout(50)
    expect(await observer.count()).toBeGreaterThan(0)

    await assertNoErrorsLater()
  })

  // Scenario 5: rapid, overlapping mutations (removal ghosts still in flight as reconciles
  // run) must not crash and must settle to the right count.
  test('rapid overlapping mutations do not crash and settle correctly', async ({ page }) => {
    const assertNoErrorsLater = await assertNoConsoleErrors(page)
    await page.goto('/')
    const list = page.getByTestId('list')
    await expect(list.locator('li')).toHaveCount(3)

    // Back-to-back, no settle waits. Net change is zero → ends at 3.
    await page.getByTestId('add').click() // 4
    await page.getByTestId('add').click() // 5
    await page.getByTestId('reverse').click() // 5
    await page.getByTestId('remove-first').click() // 4
    await page.getByTestId('add').click() // 5
    await page.getByTestId('reverse').click() // 5
    await page.getByTestId('remove-first').click() // 4
    await page.getByTestId('remove-first').click() // 3

    await page.waitForTimeout(600) // let every overlapping animation finish
    await expect(list.locator('li')).toHaveCount(3)
    await assertNoErrorsLater()
  })

  // Scenario 10: primitive-keyed list (by=n => n) — animates and FLIPs by value.
  test('primitive-keyed list animates and preserves node identity by value', async ({ page }) => {
    const assertNoErrorsLater = await assertNoConsoleErrors(page)
    await page.goto('/')
    const prim = page.getByTestId('prim-list')
    await expect(prim.locator('li')).toHaveCount(3)

    const observer = await withAnimationObserver(page, PRIM)

    await page.getByTestId('prim-add').click()
    await expect(prim.locator('li')).toHaveCount(4)
    await page.waitForTimeout(50)
    expect(await observer.count()).toBeGreaterThan(0)

    // Mark the node for value 10, reverse, confirm the same node moved (keyed by value).
    await page.waitForTimeout(300)
    await page.evaluate(() => {
      document.querySelector('[data-testid="num-10"]')!.setAttribute('data-marker', 'x')
    })
    await page.getByTestId('prim-reverse').click()
    await page.waitForTimeout(350)
    await expect(page.locator('[data-testid="num-10"][data-marker="x"]')).toHaveCount(1)

    await assertNoErrorsLater()
  })

  // Scenario 11: conditional parent — the <ul> itself is inside an <if>, tag co-located.
  test('conditional parent: co-located tag mounts, unmounts, and remounts cleanly', async ({ page }) => {
    const assertNoErrorsLater = await assertNoConsoleErrors(page)
    await page.goto('/')
    const cond = page.getByTestId('cond-list')
    await expect(cond).toBeVisible()
    await expect(cond.locator('li')).toHaveCount(2)

    const observer = await withAnimationObserver(page, COND)
    await page.getByTestId('cond-add').click()
    await expect(cond.locator('li')).toHaveCount(3)
    await page.waitForTimeout(50)
    expect(await observer.count()).toBeGreaterThan(0)

    // Hide parent → the <ul> AND the co-located tag unmount together (no crash).
    await page.waitForTimeout(300)
    await page.getByTestId('cond-toggle').click()
    await expect(page.getByTestId('cond-list')).toHaveCount(0)

    // Show again → parent + tag remount (top-level state persisted: 3 items); adding
    // animates again via a fresh controller.
    await page.getByTestId('cond-toggle').click()
    await expect(page.getByTestId('cond-list')).toBeVisible()
    await expect(page.getByTestId('cond-list').locator('li')).toHaveCount(3)
    const observer2 = await withAnimationObserver(page, COND)
    await page.getByTestId('cond-add').click()
    await page.waitForTimeout(50)
    expect(await observer2.count()).toBeGreaterThan(0)

    await assertNoErrorsLater()
  })

  // Scenario 7: teardown via reactive unmount (NOT a bare destroy) — the abort-signal case.
  // Driving the <if> false fires onDestroy through a real render pass, which is the only
  // way Marko flushes the queued teardown.
  test('reactive unmount tears down cleanly and remounts', async ({ page }) => {
    const assertNoErrorsLater = await assertNoConsoleErrors(page)
    await page.goto('/')
    await expect(page.getByTestId('um-list')).toBeVisible()

    await page.getByTestId('unmount-toggle').click()
    await expect(page.getByTestId('um-list')).toHaveCount(0)
    await page.waitForTimeout(100)

    await page.getByTestId('unmount-toggle').click()
    await expect(page.getByTestId('um-list')).toBeVisible()

    await assertNoErrorsLater()
  })

  // Scenario 9: reduced motion — mutations still apply, but no animation runs.
  // auto-animate reads matchMedia('(prefers-reduced-motion: reduce)') once, at the
  // autoAnimate() call in onMount; when it matches, the entire observer setup is
  // skipped and the parent is fully inert. So emulate the preference *before*
  // navigating (so it is active at mount), and assert the page actually reports it —
  // if this ever regresses, the failure then points at the emulation, not the adapter.
  test('respects prefers-reduced-motion (item appears, no animation runs)', async ({ page }) => {
    const assertNoErrorsLater = await assertNoConsoleErrors(page)
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    expect(
      await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches),
    ).toBe(true)

    const list = page.getByTestId('list')
    await expect(list.locator('li')).toHaveCount(3)
    const observer = await withAnimationObserver(page, LIST)
    await page.getByTestId('add').click()
    await expect(list.locator('li')).toHaveCount(4) // mutation still applies
    await page.waitForTimeout(80)
    expect(await observer.count()).toBe(0) // …but no animation under reduced motion

    await assertNoErrorsLater()
  })
})
