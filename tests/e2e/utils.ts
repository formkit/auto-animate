import { expect, Page } from '@playwright/test'

export async function assertNoConsoleErrors(page: Page) {
  const errors: string[] = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text())
    }
  })
  // Give tests time to run interactions before asserting later
  return () => expect(errors, `Console errors: \n${errors.join('\n')}`).toEqual([])
}

export async function withAnimationObserver(page: Page, selector: string) {
  await page.waitForSelector(selector)
  await page.evaluate(() => {
    const w = window as any
    if (!w.__aa__) {
      w.__aa__ = {
        activeAnimations(element: Element) {
          const anims = (element.getAnimations ? element.getAnimations({ subtree: true }) : []) as Animation[]
          return anims.filter((a) => a.playState === 'running' || (a.currentTime && a.effect)).length
        },
      }
    }
  })
  return {
    count: async () => page.evaluate((sel) => (window as any).__aa__.activeAnimations(document.querySelector(sel)!), selector),
  }
}

export async function approximateMemoryUsage(page: Page) {
  // Not all browsers support performance.memory; guard and return undefined when missing
  const mem = await page.evaluate(() => {
    const anyWindow = window as any
    const perf = anyWindow.performance as any
    if (perf && perf.memory) {
      return {
        usedJSHeapSize: perf.memory.usedJSHeapSize,
        totalJSHeapSize: perf.memory.totalJSHeapSize,
      }
    }
    return undefined
  })
  return mem as { usedJSHeapSize: number; totalJSHeapSize: number } | undefined
}

export async function forceGC(page: Page) {
  // Try to nudge GC; works in headless Chromium with --js-flags=--expose-gc, but we don't rely on it
  await page.evaluate(() => {
    const anyWindow = window as any
    if (typeof anyWindow.gc === 'function') anyWindow.gc()
  })
}


