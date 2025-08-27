import { test, expect } from '@playwright/test'
import { assertNoConsoleErrors } from './utils'

// The home page mounts many framework examples as Vue components that internally
// import the framework adapters from the library. At minimum ensure the page
// renders without console errors and the examples are present.
test('home page renders examples without console errors', async ({ page }) => {
  const assertNoErrorsLater = await assertNoConsoleErrors(page)
  await page.goto('/')
  // Examples section exists
  await expect(page.locator('#examples')).toBeVisible()
  // At least one example list item renders
  const itemCount = await page.locator('#examples ul li').count()
  expect(itemCount).toBeGreaterThan(0)
  await assertNoErrorsLater()
})


