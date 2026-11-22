import { test, expect } from '@playwright/test'
import { fileURLToPath } from 'node:url'

const fixtureUrl = `/@fs${fileURLToPath(new URL('../fixtures/removal.html', import.meta.url))}`
const moduleUrl = `/@fs${fileURLToPath(new URL('../../src/svelte/index.ts', import.meta.url))}`

test('attachment animates (bare and with options) and cleans up', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto(fixtureUrl)
  const r = await page.evaluate(async (moduleUrl) => {
    const { autoAnimate } = (await import(moduleUrl)) as typeof import('../../src/svelte/index')
    const tick = (ms = 30) => new Promise((res) => setTimeout(res, ms))
    const make = () => {
      const ul = document.createElement('ul')
      document.body.prepend(ul)
      return ul
    }
    const add = (ul: Element) => {
      const li = document.createElement('li')
      li.textContent = 'x'
      li.style.height = '20px'
      ul.appendChild(li)
      return li
    }
    const running = (el: Element) => el.getAnimations().length

    // bare: {@attach autoAnimate}
    const bare = make()
    const cleanupBare = autoAnimate(bare)
    await tick()
    const bareLi = add(bare)
    await tick()
    const bareAnimated = running(bareLi) > 0

    // with options: {@attach autoAnimate({ duration: 400 })}
    const withOpts = make()
    const cleanup = autoAnimate({ duration: 400 })(withOpts)
    await tick()
    const li = add(withOpts)
    await tick()
    const duration = li.getAnimations()[0]?.effect?.getTiming().duration

    // after cleanup (Svelte detaching), changes no longer animate
    cleanupBare()
    cleanup()
    await tick()
    const after = add(withOpts)
    await tick()
    return { bareAnimated, duration, afterCleanup: running(after) }
  }, moduleUrl)
  expect(r.bareAnimated).toBe(true)
  expect(r.duration).toBe(600) // add runs at duration × 1.5
  expect(r.afterCleanup).toBe(0)
})
