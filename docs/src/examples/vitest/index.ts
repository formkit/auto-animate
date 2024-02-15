export default {
  react: {
    example: `
    import { vi } from 'vitest'

    const ResizeObserver = vi.fn(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn()
    }))

    vi.stubGlobal('ResizeObserver', ResizeObserver)
    `,
    language: "js",
    title: "setup.js",
    ext: "js",
  },
}
