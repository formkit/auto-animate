import { joinURL } from '/Users/justinschroeder/Projects/auto-animate/build/nuxt-playground/node_modules/.pnpm/ufo@1.3.0/node_modules/ufo/dist/index.mjs'
import { useRuntimeConfig } from '#internal/nitro'
const appConfig = useRuntimeConfig().app
export const baseURL = () => appConfig.baseURL
export const buildAssetsDir = () => appConfig.buildAssetsDir
export const buildAssetsURL = (...path) => joinURL(publicAssetsURL(), buildAssetsDir(), ...path)
export const publicAssetsURL = (...path) => {
  const publicBase = appConfig.cdnURL || appConfig.baseURL
  return path.length ? joinURL(publicBase, ...path) : publicBase
}
if (import.meta.client) {
  globalThis.__buildAssetsURL = buildAssetsURL
  globalThis.__publicAssetsURL = publicAssetsURL
}