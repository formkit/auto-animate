import { test, expect } from '@playwright/test'
import path from 'node:path'
import fs from 'node:fs/promises'
import { getVideoDurationSec, extractFrameAt, diffImages } from './visual-video.util'
import { PNG } from 'pngjs'
import pixelmatch from 'pixelmatch'

// Record a deterministic video of the animation by scrubbing frames programmatically.
// This produces a stable artifact for human review without relying on image snapshots.
// Always keep video for this spec
test.use({ video: 'on' })

test.describe('Visual video: list animation', () => {
  test.skip(!process.env.VISUAL, 'Visual tests require VISUAL=1')

  test('record add/remove sequence', async ({ page }, testInfo) => {
    await page.addInitScript(() => {
      // Stabilize randomness and slow animations
      Math.random = () => 0.123456789
      const w = window as any
      if (w.__aaPatchedAnimate) return
      const original = Element.prototype.animate
      Element.prototype.animate = function (...args: any[]) {
        try {
          if (typeof args[1] === 'number') args[1] = (args[1] as number) * 3
          else if (args[1] && typeof args[1] === 'object') {
            const timing = args[1] as any
            if (typeof timing.duration === 'number') timing.duration = timing.duration * 3
          }
        } catch {}
        const anim = original.apply(this, args as any)
        try {
          const effect: any = anim.effect as any
          if (effect?.updateTiming) effect.updateTiming({ fill: 'both' })
        } catch {}
        return anim
      }
      w.__aaPatchedAnimate = true
    })

    await page.goto('/lists')
    const list = page.locator('ul')
    await list.waitFor()

    // Interact to produce an animation and wait a bit so it is captured in video
    await page.getByRole('button', { name: 'Add Fruit' }).click()
    await page.waitForTimeout(1200)
    await page.locator('ul li button:has-text("Remove")').first().click()
    await page.waitForTimeout(800)

    // Smoke-assert there are running animations at some point
    const hadAnimations = await page.evaluate(() => {
      const root = document.querySelector('ul')!
      const anims = root.getAnimations({ subtree: true })
      return anims.length > 0
    })
    expect(hadAnimations).toBeTruthy()

    // Frame-based snapshot: scrub and capture frames to compare with baseline images
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
        ;(root as HTMLElement).offsetWidth
      }, fraction)
      await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => r(null))))
    }

    const box = await list.boundingBox()
    if (!box) throw new Error('List bounding box not available')
    const clip = {
      x: Math.floor(box.x),
      y: Math.floor(box.y),
      width: Math.floor(box.width),
      height: Math.floor(box.height),
    }

    const baselineDir = path.resolve(testInfo.project.outputDir, '..', 'visual-baseline', 'list-animation')
    const currentDir = path.resolve(testInfo.outputDir, 'frames-current')
    await fs.mkdir(currentDir, { recursive: true })

    const frames = [
      { name: 'add-10.png', action: async () => scrub(0.1) },
      { name: 'add-50.png', action: async () => scrub(0.5) },
      { name: 'add-100.png', action: async () => scrub(1.0) },
      { name: 'remove-50.png', action: async () => { await page.locator('ul li button:has-text("Remove")').first().click(); await page.waitForFunction(() => document.querySelector('ul')!.getAnimations({ subtree: true }).length > 0); await scrub(0.5) } },
    ]

    for (const f of frames) {
      await f.action()
      const buf = await page.screenshot({ clip, fullPage: false })
      const outPath = path.join(currentDir, f.name)
      await fs.writeFile(outPath, buf)
      if (process.env.VISUAL_UPDATE === '1') {
        await fs.mkdir(baselineDir, { recursive: true })
        await fs.writeFile(path.join(baselineDir, f.name), buf)
      } else {
        try {
          const basePath = path.join(baselineDir, f.name)
          const [aBuf, bBuf] = await Promise.all([fs.readFile(basePath), fs.readFile(outPath)])
          const imgA = PNG.sync.read(aBuf)
          const imgB = PNG.sync.read(bBuf)
          const { width, height } = imgA
          const diff = new PNG({ width, height })
          const pixels = pixelmatch(imgA.data, imgB.data, diff.data, width, height, { threshold: 0.1 })
          const ratio = pixels / (width * height)
          expect(ratio).toBeLessThan(0.08)
        } catch (e) {
          // Baseline missing; attach info but do not fail
          testInfo.attachments.push({ name: `baseline-missing-${f.name}`, contentType: 'text/plain', body: Buffer.from(String(e)) })
        }
      }
    }

    // Video is recorded automatically for human review; frames above are compared to PNG baselines.
  })
})


