import { test, expect } from '@playwright/test'
import { fileURLToPath } from 'node:url'

const fixture = `/@fs${fileURLToPath(new URL('../fixtures/removal.html', import.meta.url))}`
const moduleUrl = process.env.AA_MASTER_MODULE || `/@fs${fileURLToPath(new URL('../../src/index.ts', import.meta.url))}`

type Scenario = 'bottom' | 'partial-remove' | 'pending-scroll' | 'partial-insert' | 'nested' | 'initial-scroll' | 'smooth'

for (const scenario of ['bottom', 'partial-remove', 'pending-scroll', 'partial-insert', 'nested', 'initial-scroll', 'smooth'] as Scenario[]) {
  test(`scroll anchoring regression: ${scenario}`, async ({ page }, info) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.goto(fixture)
    const result = await page.evaluate(async ({ moduleUrl, scenario }) => {
      const rows = Array.from({ length: 12 }, (_, i) => `<li id="r${i}" style="height:100px;list-style:none">${i}</li>`).join('')
      const list = `<ul id="list" style="margin:0;padding:0">${rows}</ul>`
      document.body.style.margin = '0'
      document.body.innerHTML = scenario === 'bottom' ? list : scenario === 'nested'
        ? `<div id="scroller" style="height:400px;overflow:auto">${list}</div>`
        : `<div style="height:400px"></div>${list}<div style="height:2000px"></div>`
      const ul = document.getElementById('list')!
      const scroller = document.getElementById('scroller')
      if (scenario === 'smooth') document.documentElement.style.scrollBehavior = 'smooth'
      const instantScroll = (y: number) => window.scrollTo({ top: y, behavior: 'instant' })
      if (scenario === 'initial-scroll') instantScroll(700)
      const { default: autoAnimate } = (await import(moduleUrl)) as typeof import('../../src/index')
      autoAnimate(ul, { duration: 600 })
      if (scenario === 'nested') scroller!.scrollTop = 250
      else if (scenario === 'bottom') instantScroll(document.documentElement.scrollHeight)
      else if (scenario !== 'initial-scroll') instantScroll(scenario.startsWith('partial') ? 450 : 700)
      await new Promise((resolve) => setTimeout(resolve, 400))
      const watched = document.getElementById(scenario === 'bottom' ? 'r5' : scenario === 'nested' ? 'r5' : 'r6')!
      if (scenario === 'pending-scroll') instantScroll(750)
      const before = watched.getBoundingClientRect().top
      if (scenario === 'bottom') document.getElementById('r11')!.remove()
      else if (scenario === 'partial-remove' || scenario === 'nested') document.getElementById('r0')!.remove()
      else {
        const row = document.createElement('li')
        row.style.cssText = 'height:100px;list-style:none'
        ul.prepend(row)
      }
      const tops: number[] = []
      const until = performance.now() + 800
      while (performance.now() < until) {
        await new Promise((resolve) => requestAnimationFrame(resolve))
        tops.push(watched.getBoundingClientRect().top)
      }
      return { before, tops, scroll: window.scrollY }
    }, { moduleUrl, scenario })
    const { before, tops } = result
    // A clamp and partial removal may move the row during the animation,
    // but must start from its previous viewport position (as master does).
    if (scenario === 'bottom' || scenario === 'partial-remove') {
      expect(Math.abs(tops[0] - before), JSON.stringify(result)).toBeLessThanOrEqual(2)
      if (info.project.name === 'webkit') {
        const direction = scenario === 'bottom' ? 1 : -1
        for (let i = 1; i < tops.length; i++)
          expect(direction * (tops[i] - tops[i - 1]), JSON.stringify(result)).toBeGreaterThanOrEqual(-2)
      }
    } else if (scenario === 'nested' && info.project.name === 'webkit') {
      expect(Math.abs(tops[0] - before), JSON.stringify(result)).toBeLessThanOrEqual(2)
      for (let i = 1; i < tops.length; i++)
        expect(tops[i], JSON.stringify(result)).toBeLessThanOrEqual(tops[i - 1] + 2)
    } else if (info.project.name !== 'webkit') {
      for (const top of tops) expect(Math.abs(top - before), JSON.stringify(result)).toBeLessThanOrEqual(2)
    } else {
      // Without scroll anchoring, insertion moves the row down monotonically.
      for (let i = 0; i < tops.length; i++) {
        expect(tops[i], JSON.stringify(result)).toBeGreaterThanOrEqual(before - 2)
        if (i) expect(tops[i], JSON.stringify(result)).toBeGreaterThanOrEqual(tops[i - 1] - 2)
      }
    }
  })
}
