import { test, expect } from '@playwright/test'
import { fileURLToPath } from 'node:url'

const fixtureUrl = `/@fs${fileURLToPath(new URL('../fixtures/moved-parent.html', import.meta.url))}`
const moduleUrl = `/@fs${fileURLToPath(new URL('../../src/index.ts', import.meta.url))}`

// formkit/auto-animate#227: children's cached positions went stale when the
// parent moved via a CSS transform, so the next mutation animated siblings
// from where they *used* to be on screen.
test('siblings animate only their own movement after the parent was moved by a transform', async ({ page }) => {
  await page.goto(fixtureUrl)
  const start = await page.evaluate(async (moduleUrl) => {
    const { default: autoAnimate } = await import(moduleUrl)
    const list = document.getElementById('list')!
    autoAnimate(list, { duration: 1000 })
    // Let auto-animate take its (debounced) initial measurements.
    await new Promise((r) => setTimeout(r, 1300))
    // Slide the parent back into place (like a menu opening).
    list.style.transform = 'translateX(0px)'
    await new Promise(requestAnimationFrame)
    // Remove the first item: B and C should only move up by 40px.
    document.getElementById('a')!.remove()
    await new Promise(requestAnimationFrame)
    await new Promise(requestAnimationFrame)
    const anim = document.getElementById('c')!.getAnimations()[0] as Animation
    const frames = (anim.effect as KeyframeEffect).getKeyframes()
    return String(frames[0].transform)
  }, moduleUrl)
  // translate(dx, dy) at the start of C's move animation
  const m = start.match(/translate\((-?[\d.]+)px,\s*(-?[\d.]+)px\)/)
  expect(m, start).not.toBeNull()
  const [dx, dy] = [Number(m![1]), Number(m![2])]
  expect(Math.abs(dx)).toBeLessThan(2) // was ~300 (the parent's old offset)
  expect(dy).toBeGreaterThan(30) // it really moved up ~40px
})

test('a removed child fades out in place after the parent was moved by a transform', async ({ page }) => {
  await page.goto(fixtureUrl)
  const result = await page.evaluate(async (moduleUrl) => {
    const { default: autoAnimate } = await import(moduleUrl)
    const list = document.getElementById('list')!
    autoAnimate(list, { duration: 1000 })
    await new Promise((r) => setTimeout(r, 1300))
    list.style.transform = 'translateX(0px)'
    await new Promise(requestAnimationFrame)
    const before = document.getElementById('b')!.getBoundingClientRect()
    document.getElementById('b')!.remove()
    await new Promise(requestAnimationFrame)
    await new Promise(requestAnimationFrame)
    // auto-animate re-inserts the removed node while it animates out
    const ghost = document.getElementById('b')
    const during = ghost?.getBoundingClientRect()
    // Compare centers: the exit animation scales around the center.
    const center = (r: DOMRect) => ({ x: r.x + r.width / 2, y: r.y + r.height / 2 })
    return { before: center(before), during: during && center(during) }
  }, moduleUrl)
  expect(result.during).toBeTruthy()
  expect(Math.abs(result.during!.x - result.before.x)).toBeLessThan(2)
  expect(Math.abs(result.during!.y - result.before.y)).toBeLessThan(2)
})
