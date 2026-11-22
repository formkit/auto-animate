import { test, expect } from '@playwright/test'

test.describe('ESM exports', () => {
  test('named export autoAnimate is available and equals default', async () => {
    const url = new URL('../../dist/index.mjs', import.meta.url).href
    const mod = await import(url)
    expect(typeof mod.default).toBe('function')
    expect(mod.autoAnimate).toBeDefined()
    expect(mod.autoAnimate).toBe(mod.default)
  })
})


test.describe('Svelte attachment export', () => {
  test('@formkit/auto-animate/svelte exports an attachment factory', async () => {
    const url = new URL('../../dist/svelte/index.mjs', import.meta.url).href
    const mod = await import(url)
    expect(typeof mod.autoAnimate).toBe('function')
    expect(mod.default).toBe(mod.autoAnimate)
    // called with options it returns an attachment (el => cleanup)
    expect(typeof mod.autoAnimate({ duration: 100 })).toBe('function')
  })
})
