export default {
  react: {
    example: `
const autoAnimate = jest.fn((el: Element) => ({
  parent: el,
  enable: jest.fn(),
  disable: jest.fn(),
  isEnabled: jest.fn()
}))

export default autoAnimate
    `,
    language: "jsx",
    title: "jest/__mocks__/@formkit/auto-animate/index.js",
    ext: "jsx",
  },
}
