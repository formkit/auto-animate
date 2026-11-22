import { test, expect } from '@playwright/test'
import { fileURLToPath } from 'node:url'

const fixtureUrl = `/@fs${fileURLToPath(new URL('../fixtures/removal.html', import.meta.url))}`
const moduleUrl = `/@fs${fileURLToPath(new URL('../../src/index.ts', import.meta.url))}`

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto(fixtureUrl)
})

/** Runs add, move (remain) and remove against a fresh list with the given options. */
async function run(page: import('@playwright/test').Page, opts: Record<string, unknown>) {
  return page.evaluate(async ({ moduleUrl, opts }) => {
    const { default: autoAnimate } = (await import(moduleUrl)) as typeof import('../../src/index')
    const parent = document.createElement('ul')
    document.body.appendChild(parent)
    for (const n of ['a', 'b', 'c']) {
      const li = document.createElement('li')
      li.id = n
      li.textContent = n
      li.style.height = '20px'
      parent.appendChild(li)
    }
    const ended: string[] = []
    autoAnimate(parent, {
      duration: 300,
      ...opts,
      onAnimationEnd: (el: Element, action: string) => ended.push(`${action}:${el.id}`),
    })
    await new Promise((r) => setTimeout(r, 50))
    const record = () =>
      [...new Set(document.getAnimations().map((a) => ((a.effect as KeyframeEffect | null)?.target as Element | null)?.id).filter(Boolean))].sort() as string[]
    // add
    const d = document.createElement('li')
    d.id = 'd'
    d.textContent = 'd'
    d.style.height = '20px'
    parent.prepend(d) // also moves a, b, c (remain)
    await new Promise((r) => setTimeout(r, 30))
    const onAdd = record()
    await new Promise((r) => setTimeout(r, 600))
    // remove
    parent.querySelector('#b')!.remove()
    await new Promise((r) => setTimeout(r, 30))
    const onRemove = record()
    const removedStillInDom = !!document.getElementById('b')
    await new Promise((r) => setTimeout(r, 700))
    return {
      onAdd,
      onRemove,
      ended: ended.sort(),
      removedStillInDom,
      bGone: !document.getElementById('b'),
    }
  }, { moduleUrl, opts })
}

test('runs every animation by default and reports each one ending', async ({ page }) => {
  const r = await run(page, {})
  expect(r.onAdd).toEqual(['a', 'b', 'c', 'd'])
  expect(r.onRemove).toContain('b')
  expect(r.removedStillInDom).toBe(true) // animating out
  expect(r.bGone).toBe(true)
  expect(r.ended).toContain('add:d')
  expect(r.ended).toContain('remain:a')
  expect(r.ended).toContain('remove:b')
})

test('animations: { remain: false } keeps add/remove but skips moves', async ({ page }) => {
  const r = await run(page, { animations: { remain: false } })
  expect(r.onAdd).toEqual(['d'])
  expect(r.onRemove).toEqual(['b'])
  expect(r.ended.filter((e) => e.startsWith('remain'))).toEqual([])
  expect(r.ended).toContain('add:d')
  expect(r.ended).toContain('remove:b')
})

test('animations: { add: false, remove: false } only animates moves', async ({ page }) => {
  const r = await run(page, { animations: { add: false, remove: false } })
  expect(r.onAdd).toEqual(['a', 'b', 'c'])
  expect(r.onRemove).not.toContain('b')
  expect(r.removedStillInDom).toBe(false) // removed immediately
  expect(r.bGone).toBe(true)
  expect(r.ended.some((e) => e.startsWith('remain'))).toBe(true)
  expect(r.ended.some((e) => e.startsWith('add') || e.startsWith('remove'))).toBe(false)
})
