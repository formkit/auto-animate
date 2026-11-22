import { test, expect } from '@playwright/test'
import { fileURLToPath } from 'node:url'

const fixtureUrl = `/@fs${fileURLToPath(new URL('../fixtures/removal.html', import.meta.url))}`
const moduleUrl = `/@fs${fileURLToPath(new URL('../../src/index.ts', import.meta.url))}`

async function delays(page: import('@playwright/test').Page, opts: Record<string, unknown>) {
  return page.evaluate(async ({ moduleUrl, opts }) => {
    const { default: autoAnimate } = (await import(moduleUrl)) as typeof import('../../src/index')
    const parent = document.createElement('ul')
    document.body.prepend(parent)
    const make = (id: string) => {
      const li = document.createElement('li')
      li.id = id
      li.textContent = id
      li.style.height = '20px'
      return li
    }
    parent.append(make('keep'))
    autoAnimate(parent, { duration: 200, ...opts })
    await new Promise((r) => setTimeout(r, 50))
    // add four items in one go, before the existing one (which then moves)
    parent.prepend(make('a'), make('b'), make('c'), make('d'))
    await new Promise((r) => setTimeout(r, 20))
    const out: Record<string, number> = {}
    for (const a of document.getAnimations()) {
      const t = (a.effect as KeyframeEffect).target as Element
      if (t?.id) out[t.id] = Number((a.effect as KeyframeEffect).getTiming().delay)
    }
    const hiddenWhileWaiting = getComputedStyle(parent.querySelector('#d')!).opacity
    parent.remove()
    return { out, hiddenWhileWaiting }
  }, { moduleUrl, opts })
}

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto(fixtureUrl)
})

test('stagger offsets entry animations of elements added together', async ({ page }) => {
  const { out, hiddenWhileWaiting } = await delays(page, { stagger: 100 })
  expect([out.a, out.b, out.c, out.d]).toEqual([0, 100, 200, 300])
  expect(out.keep ?? 0).toBe(0) // moves are never delayed
  expect(hiddenWhileWaiting).toBe('0') // waiting items stay hidden
})

test('no stagger by default', async ({ page }) => {
  const { out } = await delays(page, {})
  expect([out.a, out.b, out.c, out.d]).toEqual([0, 0, 0, 0])
})
