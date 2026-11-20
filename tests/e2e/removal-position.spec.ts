import { test, expect } from '@playwright/test'
import { fileURLToPath } from 'node:url'

const fixtureUrl = `/@fs${fileURLToPath(new URL('../fixtures/removal.html', import.meta.url))}`
const moduleUrl = `/@fs${fileURLToPath(new URL('../../src/index.ts', import.meta.url))}`

test('preserves active animations on reinitialization and tears them down on destroy', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto(fixtureUrl)
  const result = await page.evaluate(async moduleUrl => {
    const { default: autoAnimate } = await import(moduleUrl) as typeof import('../../src/index')
    const parent = document.createElement('div')
    document.body.append(parent)
    const first = autoAnimate(parent, { duration: 10_000 })
    const child = document.createElement('div')
    child.textContent = 'Animated child'
    parent.append(child)
    await new Promise(requestAnimationFrame)

    const second = autoAnimate(parent)
    const animationSurvived = child.getAnimations().length > 0
    const childController = autoAnimate(child)
    childController.destroy?.()
    const childEnabled = childController.isEnabled()
    const animationsAfterDestroy = child.getAnimations().length

    first.destroy?.()
    return {
      animationSurvived,
      childEnabled,
      animationsAfterDestroy,
      parentEnabled: second.isEnabled(),
    }
  }, moduleUrl)
  expect(result).toEqual({
    animationSurvived: true,
    childEnabled: false,
    animationsAfterDestroy: 0,
    parentEnabled: false,
  })
})

test('removes a table row during its entry animation', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto(fixtureUrl)
  const wasAnimating = await page.evaluate(async moduleUrl => {
    const { default: autoAnimate } = await import(moduleUrl)
    const rows = document.querySelector('tbody')!
    autoAnimate(rows)
    const row = rows.insertRow()
    row.id = 'removed'
    row.insertCell().textContent = 'Remove this row'
    await new Promise(requestAnimationFrame)
    const running = row.getAnimations().some(animation => animation.playState === 'running')
    if (running) row.remove()
    return running
  }, moduleUrl)
  expect(wasAnimating).toBe(true)
  await expect(page.locator('#removed')).toHaveCount(0)
  await expect(page.locator('#survivor')).toHaveCount(1)
  expect(errors).toEqual([])
})
