import { test, expect } from '@playwright/test'
import { fileURLToPath } from 'node:url'

const fixtureUrl = `/@fs${fileURLToPath(new URL('../fixtures/removal.html', import.meta.url))}`
const moduleUrl = `/@fs${fileURLToPath(new URL('../../src/index.ts', import.meta.url))}`

// #7: a removed <tr> lost its table layout while animating out (cells
// collapsed to their content and the row floated outside the table).
for (const tableStyle of ['border-collapse:separate;border-spacing:4px', 'border-collapse:collapse', 'border-collapse:separate;border-spacing:10px 2px'])
test(`a removed table row keeps its cell layout while it animates out (${tableStyle})`, async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto(fixtureUrl)
  const r = await page.evaluate(async ({ moduleUrl, tableStyle }) => {
    const { default: autoAnimate } = (await import(moduleUrl)) as typeof import('../../src/index')
    document.body.innerHTML = `
      <table id="t" style="width:600px;${tableStyle}">
        <thead><tr><th>Drink</th><th>Takes</th><th>Time</th><th>Status</th></tr></thead>
        <tbody>
          ${['Latte', 'Mocha', 'Flat white'].map((d, i) => `<tr id="r${i}"><td>${d}</td><td>${i + 1}</td><td>10:0${i}</td><td>Queued</td></tr>`).join('')}
        </tbody>
      </table>`
    const tbody = document.querySelector('tbody')!
    autoAnimate(tbody, { duration: 1000 })
    await new Promise((res) => setTimeout(res, 100))
    const row = document.getElementById('r1')!
    const box = (el: Element) => { const b = el.getBoundingClientRect(); return [Math.round(b.left), Math.round(b.top), Math.round(b.width), Math.round(b.height)] }
    const before = { row: box(row), cells: [...row.children].map(box) }
    row.remove()
    await new Promise((res) => setTimeout(res, 60))
    const during = { inDom: row.isConnected, row: box(row), cells: [...row.children].map(box) }
    await new Promise((res) => setTimeout(res, 1300))
    const afterStyles = { cell: (row.children[0] as HTMLElement).style.cssText, row: row.style.cssText }
    return { before, during, afterStyles, gone: !row.isConnected }
  }, { moduleUrl, tableStyle })
  expect(r.during.inDom).toBe(true)
  // the leaving row stays where it was, with the same cell geometry (±2px for the scale)
  for (let i = 0; i < 4; i++) {
    expect(Math.abs(r.during.cells[i][0] - r.before.cells[i][0])).toBeLessThanOrEqual(2)
    expect(Math.abs(r.during.cells[i][1] - r.before.cells[i][1])).toBeLessThanOrEqual(2)
    expect(Math.abs(r.during.cells[i][2] - r.before.cells[i][2])).toBeLessThanOrEqual(4)
  }
  expect(r.gone).toBe(true)
  // nothing left behind on the element for re-insertion
  expect(r.afterStyles.cell).toBe('')
})
