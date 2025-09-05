import { test, expect } from '@playwright/test'
import pixelmatch from 'pixelmatch'
import { PNG } from 'pngjs'

// Visual snapshot of a slowed animation sequence.
// We use a long duration and capture intermediate frames.
// Always keep video for this spec so humans can inspect the animation
test.use({ video: 'on' })

test.describe('Visual: list animation sequence', () => {
  test.skip(!process.env.VISUAL, 'Visual tests require VISUAL=1')
  test('captures keyframes during add/remove sequence', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    // Monkey patch Element.animate early to make sure animations are WAAPI and controllable
    await page.addInitScript(() => {
      // Stabilize randomness used by demo code
      Math.random = () => 0.123456789
      const w = window as any
      if (w.__aaPatchedAnimate) return
      const original = Element.prototype.animate
      Element.prototype.animate = function (...args: any[]) {
        // Scale duration to slow animations for clearer frames
        try {
          if (typeof args[1] === 'number') args[1] = (args[1] as number) * 4
          else if (args[1] && typeof args[1] === 'object') {
            const timing = args[1] as any
            if (typeof timing.duration === 'number') timing.duration = timing.duration * 4
          }
        } catch {}
        const anim = original.apply(this, args as any)
        try {
          // Force fill mode so scrubbing produces visible frames
          const effect: any = anim.effect as any
          if (effect?.updateTiming) effect.updateTiming({ fill: 'both' })
        } catch {}
        return anim
      }
      w.__aaPatchedAnimate = true
    })
    await page.goto('/lists')
    await page.evaluate(() => document.body.setAttribute('data-visual', '1'))
    await page.addStyleTag({ content: `
      body[data-visual] ul { width: 500px !important; height: 420px !important; overflow: hidden !important; }
      body[data-visual] ul li { white-space: nowrap }
    ` })

    const list = page.locator('ul')
    await expect(list).toBeVisible()

    // Helper to pause and scrub all WAAPI animations under the list
    async function scrub(fraction: number) {
      await page.evaluate((fraction) => {
        const root = document.querySelector('ul')!
        const anims = root.getAnimations({ subtree: true })
        for (const a of anims) {
          try {
            a.pause()
            const effect: any = a.effect as any
            const timing = effect?.getTiming ? effect.getTiming() : effect?.getComputedTiming?.() || { duration: 0, delay: 0 }
            const duration = typeof timing.duration === 'number' ? timing.duration : 0
            const delay = typeof timing.delay === 'number' ? timing.delay : 0
            a.currentTime = delay + duration * fraction
          } catch {}
        }
        // Force reflow so the new keyframe is painted
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        ;(root as HTMLElement).offsetWidth
      }, fraction)
      // Wait one RAF for paint to commit
      await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => r(null))))
    }

    // Wait a tick so the page settles; capture a baseline image buffer using a fixed clip rect
    await page.waitForTimeout(50)
    const box = await list.boundingBox()
    if (!box) throw new Error('List bounding box not available')
    const clip = {
      x: Math.floor(box.x),
      y: Math.floor(box.y),
      width: Math.floor(box.width),
      height: Math.floor(box.height),
    }
    const baselinePngBuf = await page.screenshot({ clip, fullPage: false })

    // Trigger add and immediately scrub to 10%, 50%, 100%
    await page.getByRole('button', { name: 'Add Fruit' }).click()
    await page.waitForFunction(() => document.querySelector('ul')!.getAnimations({ subtree: true }).length > 0)
    await scrub(0.1)
    const add10Buf = await page.screenshot({ clip, fullPage: false })
    const imgA = PNG.sync.read(baselinePngBuf)
    const img10 = PNG.sync.read(add10Buf)
    const { width, height } = imgA
    const diff10 = new PNG({ width, height })
    const diffPixels10 = pixelmatch(imgA.data, img10.data, diff10.data, width, height, { threshold: 0.1 })
    const ratio10 = diffPixels10 / (width * height)
    expect(ratio10).toBeGreaterThan(0.01)
    await scrub(0.5)
    const add50Buf = await page.screenshot({ clip, fullPage: false })
    const img50 = PNG.sync.read(add50Buf)
    const diff50 = new PNG({ width, height })
    const diffPixels50 = pixelmatch(imgA.data, img50.data, diff50.data, width, height, { threshold: 0.1 })
    const ratio50 = diffPixels50 / (width * height)
    expect(ratio50).toBeGreaterThan(0.01)
    await scrub(1.0)
    const add100Buf = await page.screenshot({ clip, fullPage: false })
    const img100 = PNG.sync.read(add100Buf)
    const diff100 = new PNG({ width, height })
    const diffPixels100 = pixelmatch(imgA.data, img100.data, diff100.data, width, height, { threshold: 0.1 })
    const ratio100 = diffPixels100 / (width * height)
    expect(ratio100).toBeGreaterThan(0.01)

    // Trigger remove and scrub mid-way
    await page.locator('ul li button:has-text("Remove")').first().click()
    await page.waitForFunction(() => document.querySelector('ul')!.getAnimations({ subtree: true }).length > 0)
    await scrub(0.5)
    const remove50Buf = await page.screenshot({ clip, fullPage: false })
    const imgR50 = PNG.sync.read(remove50Buf)
    const diffR50 = new PNG({ width, height })
    const diffPixelsR50 = pixelmatch(img100.data, imgR50.data, diffR50.data, width, height, { threshold: 0.1 })
    const ratioR50 = diffPixelsR50 / (width * height)
    expect(ratioR50).toBeGreaterThan(0.01)
  })
})


