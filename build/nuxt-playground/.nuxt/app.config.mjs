
import { updateAppConfig } from '#app'
import { defuFn } from '/Users/justinschroeder/Projects/auto-animate/build/nuxt-playground/node_modules/.pnpm/defu@6.1.2/node_modules/defu/dist/defu.mjs'

const inlineConfig = {}

// Vite - webpack is handled directly in #app/config
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    updateAppConfig(newModule.default)
  })
}



export default /* #__PURE__ */ defuFn(inlineConfig)
