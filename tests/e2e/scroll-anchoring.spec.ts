import { test, expect } from '@playwright/test'
import { fileURLToPath } from 'node:url'

const fixtureUrl = `/@fs${fileURLToPath(new URL('../fixtures/removal.html', import.meta.url))}`
const moduleUrl = `/@fs${fileURLToPath(new URL('../../src/index.ts', import.meta.url))}`

// #222: inserting above the viewport makes Chrome/Firefox scroll-anchor the
// page so visible items keep their on-screen spot. They must not then animate
// from "above" (jump up and slide back down).
test('visible items stay put when content is inserted above the viewport', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto(fixtureUrl)
  const r = await page.evaluate(async (moduleUrl) => {
    const { default: autoAnimate } = (await import(moduleUrl)) as typeof import('../../src/index')
    document.body.innerHTML = `<div style="height:400px"></div><ul id="l" style="margin:0;padding:0">${'abcdefgh'
      .split('')
      .map((c) => `<li id="${c}" style="height:40px;list-style:none">${c}</li>`)
      .join('')}</ul><div style="height:2000px"></div>`
    const ul = document.getElementById('l')!
    autoAnimate(ul, { duration: 600 })
    window.scrollTo(0, 500) // a, b, c are above the viewport; the rest visible
    await new Promise((res) => setTimeout(res, 300)) // let scroll events + measurements settle
    const watched = document.getElementById('f')!
    const before = watched.getBoundingClientRect().top
    const li = document.createElement('li')
    li.id = 'new'
    li.style.cssText = 'height:40px;list-style:none'
    ul.prepend(li)
    const tops: number[] = []
    for (let i = 0; i < 8; i++) {
      await new Promise((res) => requestAnimationFrame(res))
      tops.push(Math.round(watched.getBoundingClientRect().top))
    }
    return { before: Math.round(before), tops, scrolled: Math.round(window.scrollY) }
  }, moduleUrl)
  const anchored = test.info().project.name !== 'webkit' // WebKit has no scroll anchoring
  for (const top of r.tops) {
    if (anchored) expect(Math.abs(top - r.before)).toBeLessThanOrEqual(1)
    else expect(top).toBeGreaterThanOrEqual(r.before - 1) // only ever moves down toward its new spot
  }
})

test('visible items stay put when content is removed above the viewport', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto(fixtureUrl)
  const r = await page.evaluate(async (moduleUrl) => {
    const { default: autoAnimate } = (await import(moduleUrl)) as typeof import('../../src/index')
    document.body.innerHTML = `<div style="height:400px"></div><ul id="l" style="margin:0;padding:0">${'abcdefgh'
      .split('')
      .map((c) => `<li id="${c}" style="height:40px;list-style:none">${c}</li>`)
      .join('')}</ul><div style="height:2000px"></div>`
    const ul = document.getElementById('l')!
    autoAnimate(ul, { duration: 600 })
    window.scrollTo(0, 500) // a, b, c are above the viewport; the rest visible
    await new Promise((res) => setTimeout(res, 300)) // let scroll events + measurements settle
    const watched = document.getElementById('f')!
    const before = watched.getBoundingClientRect().top
    document.getElementById('a')!.remove()
    const tops: number[] = []
    for (let i = 0; i < 8; i++) {
      await new Promise((res) => requestAnimationFrame(res))
      tops.push(Math.round(watched.getBoundingClientRect().top))
    }
    return { before: Math.round(before), tops, scrolled: Math.round(window.scrollY) }
  }, moduleUrl)
  const anchored = test.info().project.name !== 'webkit' // WebKit has no scroll anchoring
  for (const top of r.tops) {
    if (anchored) expect(Math.abs(top - r.before)).toBeLessThanOrEqual(1)
    else expect(top).toBeLessThanOrEqual(r.before + 1) // only ever moves up toward its new spot
  }
})
