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

