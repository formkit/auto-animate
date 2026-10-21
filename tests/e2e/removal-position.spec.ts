import { test, expect } from '@playwright/test'
import { fileURLToPath } from 'node:url'

const fixtureUrl = `/@fs${fileURLToPath(new URL('../fixtures/removal.html', import.meta.url))}`
const moduleUrl = `/@fs${fileURLToPath(new URL('../../src/index.ts', import.meta.url))}`

for (const tag of ['ul', 'tbody'] as const) {
  for (const operation of ['remove', 'replace', 'unmount', 'container-remount'] as const) {
    test(`${tag}: ${operation} during a child entry animation without changing positioning`, async ({ page }) => {
      const errors: string[] = []
      page.on('pageerror', error => errors.push(error.message))
      await page.goto(fixtureUrl)
      const result = await page.evaluate(async ({ moduleUrl, tag, operation }) => {
        const { default: autoAnimate } = await import(moduleUrl)
        const host = document.querySelector('#fixture')!
        const parent = document.createElement(tag)
        const makeChild = (id: string) => {
          const child = document.createElement(tag === 'tbody' ? 'tr' : 'li')
          child.id = id
          if (tag === 'tbody') {
            const cell = document.createElement('td')
            cell.textContent = id
            child.append(cell)
          } else child.textContent = id
          return child
        }
        if (tag === 'tbody') {
          const table = document.createElement('table')
          table.append(parent)
          host.append(table)
        } else host.append(parent)
        parent.id = 'list'
        for (let i = 0; i < 6; i++) parent.append(makeChild(`initial-${i}`))
        const controller = autoAnimate(parent)
        await new Promise(resolve => setTimeout(resolve, 350))
        const removed = makeChild('removed')
        parent.append(removed)
        const started = performance.now()
        while (!removed.getAnimations().some(a => a.playState === 'running')) {
          if (performance.now() - started > 2000) throw new Error('Entry animation did not start')
          await new Promise(requestAnimationFrame)
        }
        const positioning = { inline: parent.style.position, computed: getComputedStyle(parent).position }
        let expected: string[]
        if (operation === 'remove') {
          removed.remove()
          expected = Array.from({ length: 6 }, (_, i) => `initial-${i}`)
        } else if (operation === 'replace') {
          parent.replaceChildren(makeChild('next-0'), makeChild('next-1'), makeChild('next-2'))
          await new Promise(requestAnimationFrame)
          parent.replaceChildren(makeChild('final-0'), makeChild('final-1'))
          expected = ['final-0', 'final-1']
        } else {
          removed.remove()
          const mountedRoot = tag === 'tbody' ? parent.parentElement! : parent
          mountedRoot.remove()
          // Model ref detachment followed by passive-effect cleanup.
          await new Promise(resolve => setTimeout(resolve, 0))
          controller.destroy?.()
          expected = []
          if (operation === 'container-remount') {
            const cards = document.createElement('div')
            const card = document.createElement('div')
            card.id = 'mobile-card'
            cards.append(card)
            host.append(cards)
            const mobileController = autoAnimate(cards)
            await new Promise(resolve => setTimeout(resolve, 350))
            card.remove()
            await new Promise(resolve => setTimeout(resolve, 350))
            mobileController.destroy?.()
            cards.remove()
          }
        }
        await new Promise(resolve => setTimeout(resolve, 700))
        const actual = Array.from(host.querySelectorAll('li, tbody > tr'), el => el.id)
        controller.destroy?.()
        return { expected, actual, removedConnected: removed.isConnected, positioning }
      }, { moduleUrl, tag, operation })
      expect(errors, JSON.stringify({ tag, operation, positioning: result.positioning })).toEqual([])
      expect(result.removedConnected).toBe(false)
      expect(result.actual).toEqual(result.expected)
    })
  }
}
