import { defineNuxtPlugin } from "#imports"
import { vAutoAnimate } from "@formkit/auto-animate/vue"

export default defineNuxtPlugin((app) => {
  // Register the directive
  app.vueApp.directive("auto-animate", vAutoAnimate)
})
