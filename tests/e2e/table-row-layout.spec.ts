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

/** Remove a row and report cell boxes before/during, plus inline styles after. */
async function probe(page: import('@playwright/test').Page, html: string, rowSel: string, opts: { plugin?: boolean; tweak?: boolean } = {}) {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto(fixtureUrl)
  return page.evaluate(async ({ moduleUrl, html, rowSel, opts }) => {
    const { default: autoAnimate } = (await import(moduleUrl)) as typeof import('../../src/index')
    document.body.innerHTML = html
    const row = document.querySelector(rowSel) as HTMLElement
    const parent = row.parentElement!
    const plugin: any = (el: Element, action: string) =>
      action === 'remove'
        ? [new KeyframeEffect(el, [{ opacity: 1 }, { opacity: 0 }], 600), { styleReset: { position: 'absolute', top: '0px', left: '0px' } }]
        : new KeyframeEffect(el, [{ opacity: 1 }, { opacity: 1 }], 10)
    autoAnimate(parent, opts.plugin ? plugin : { duration: 600 })
    await new Promise((r) => setTimeout(r, 100))
    const box = (el: Element) => { const b = el.getBoundingClientRect(); return [Math.round(b.left), Math.round(b.top), Math.round(b.width)] }
    const before = [...row.children].map(box)
    row.remove()
    await new Promise((r) => setTimeout(r, 60))
    if (opts.tweak) (row.children[0] as HTMLElement).style.color = 'red'
    const during = [...row.children].map(box)
    const rowStyle = { top: row.style.top, left: row.style.left }
    await new Promise((r) => setTimeout(r, 900))
    return { before, during, rowStyle, cellStyle: (row.children[0] as HTMLElement).style.cssText }
  }, { moduleUrl, html, rowSel, opts })
}

const close = (a: number[][], b: number[][], tol = 2) =>
  a.every((c, i) => c.every((v, j) => Math.abs(v - b[i][j]) <= tol))

test('works inside a transformed (scaled) table', async ({ page }) => {
  const r = await probe(page, `<div style="transform:scale(2);transform-origin:0 0"><table style="width:300px;border-spacing:4px"><tbody>
    <tr><td>a</td><td>b</td></tr><tr id="x"><td>c</td><td>d</td></tr><tr><td>e</td><td>f</td></tr></tbody></table></div>`, '#x')
  expect(close(r.during, r.before, 3)).toBe(true)
})

test('removing the only header row keeps it in place', async ({ page }) => {
  const r = await probe(page, `<table style="width:400px;border-spacing:4px"><thead><tr id="h"><th>A</th><th>B</th></tr></thead>
    <tbody><tr><td>1</td><td>2</td></tr></tbody></table>`, '#h')
  expect(close(r.during, r.before)).toBe(true)
})

test('plugins keep full control of removal positioning', async ({ page }) => {
  const r = await probe(page, `<table style="width:400px;border-spacing:4px"><tbody>
    <tr><td>a</td><td>b</td></tr><tr id="x"><td>c</td><td>d</td></tr></tbody></table>`, '#x', { plugin: true })
  expect(r.rowStyle).toEqual({ top: '0px', left: '0px' })
  expect(r.cellStyle).toBe('')
})

test('cleanup keeps cell styles the app changed meanwhile', async ({ page }) => {
  const r = await probe(page, `<table style="width:400px;border-spacing:4px"><tbody>
    <tr><td>a</td><td>b</td></tr><tr id="x"><td>c</td><td>d</td></tr></tbody></table>`, '#x', { tweak: true })
  expect(r.cellStyle).toBe('color: red;')
})
