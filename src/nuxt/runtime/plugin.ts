import { defineNuxtPlugin, useRuntimeConfig } from "#imports"
import { vAutoAnimate } from "@formkit/auto-animate/vue"
import { setAutoAnimateDefaults } from "@formkit/auto-animate"

export default defineNuxtPlugin((app) => {
  const config = useRuntimeConfig().public?.autoAnimate
  if (config && typeof config === "object") {
    setAutoAnimateDefaults(config as any)
  }
  // Register the directive
  app.vueApp.directive("auto-animate", vAutoAnimate)
})
