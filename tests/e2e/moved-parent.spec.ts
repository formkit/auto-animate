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
    // Slide the parent into place with a CSS transition (like a menu
    // opening) and let it finish.
    list.style.transition = 'transform 150ms'
    list.style.transform = 'translateX(0px)'
    await new Promise((r) => list.addEventListener('transitionend', r, { once: true }))
    await new Promise((r) => setTimeout(r, 30))
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
    // Slide the parent into place with a CSS transition (like a menu
    // opening) and let it finish.
    list.style.transition = 'transform 150ms'
    list.style.transform = 'translateX(0px)'
    await new Promise((r) => list.addEventListener('transitionend', r, { once: true }))
    await new Promise((r) => setTimeout(r, 30))
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

// Parents that move *because of* the change itself (anchored to the bottom, or
// centered) must not be mistaken for a transform move (review of #250).
for (const [name, html] of [
  [
    'bottom-anchored (toast stack)',
    '<ul id="p" style="position:fixed;bottom:0;right:0;margin:0;padding:0;list-style:none;width:200px"><li id="a" style="height:40px">A</li><li id="b" style="height:40px">B</li></ul>',
  ],
  [
    'vertically centered (modal)',
    '<div style="height:900px;display:flex;align-items:center;justify-content:center"><ul id="p" style="margin:0;padding:0;list-style:none;width:200px"><li id="a" style="height:40px">A</li><li id="b" style="height:40px">B</li></ul></div>',
  ],
] as const) {
  test(`existing children don't jump when appending to a ${name} parent`, async ({ page }) => {
    await page.goto(fixtureUrl)
    const offsets = await page.evaluate(
      async ({ moduleUrl, html }) => {
        const { default: autoAnimate } = await import(moduleUrl)
        document.body.innerHTML = html
        const parent = document.getElementById('p')!
        autoAnimate(parent, { duration: 1000 })
        await new Promise((r) => setTimeout(r, 1300))
        const before = ['a', 'b'].map((id) => document.getElementById(id)!.getBoundingClientRect().top)
        const li = document.createElement('li')
        li.style.height = '100px'
        parent.append(li)
        await new Promise(requestAnimationFrame)
        await new Promise(requestAnimationFrame)
        document.getAnimations().forEach((a) => {
          a.pause()
          a.currentTime = 0
        })
        return ['a', 'b'].map((id, i) => document.getElementById(id)!.getBoundingClientRect().top - before[i])
      },
      { moduleUrl, html }
    )
    for (const offset of offsets) expect(Math.abs(offset)).toBeLessThan(2)
  })
}
