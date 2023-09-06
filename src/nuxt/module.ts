import {
  defineNuxtModule,
  addImports,
  addPlugin,
  createResolver,
} from "@nuxt/kit"

// Module options TypeScript interface definition
// export interface ModuleOptions {}

export default defineNuxtModule({
  meta: {
    name: "auto-animate",
    configKey: "autoAnimate",
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup() {
    const resolver = createResolver(import.meta.url)

    // Register the directive
    addPlugin(resolver.resolve("./runtime/plugin"))

    // Register auto-loaded components
    addImports([
      {
        name: "autoAnimate",
        from: "@formkit/auto-animate",
      },
      {
        name: "useAutoAnimate",
        from: "@formkit/auto-animate/vue",
      },
    ])
  },
})
