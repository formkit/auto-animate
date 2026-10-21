import { test, expect } from '@playwright/test'
import { fileURLToPath } from 'node:url'

const fixtureUrl = `/@fs${fileURLToPath(new URL('../fixtures/removal.html', import.meta.url))}`
const moduleUrl = `/@fs${fileURLToPath(new URL('../../src/index.ts', import.meta.url))}`

test('removes a table row during its entry animation', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto(fixtureUrl)
  await page.evaluate(async moduleUrl => {
    const { default: autoAnimate } = await import(moduleUrl)
    const rows = document.querySelector('tbody')!
    autoAnimate(rows)
    const row = rows.insertRow()
    row.id = 'removed'
    row.insertCell().textContent = 'Remove this row'
  }, moduleUrl)
  await page.waitForFunction(() =>
    document.querySelector('#removed')!.getAnimations().some(a => a.playState === 'running')
  )
  const wasAnimating = await page.locator('#removed').evaluate(async row => {
    const running = row.getAnimations().some(a => a.playState === 'running')
    row.remove()
    await new Promise(requestAnimationFrame)
    return running
  })
  expect(wasAnimating).toBe(true)
  expect(errors).toEqual([])
  await expect(page.locator('#removed')).toHaveCount(0)
  await expect(page.locator('#survivor')).toHaveCount(1)
})
