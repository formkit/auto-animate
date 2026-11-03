import { defineNuxtPlugin } from "#imports"
import { vAutoAnimate } from "../../vue/index"

type NuxtAppLike = {
  vueApp: {
    directive: (
      name: string,
      directive: typeof vAutoAnimate
    ) => void
  }
}

export default defineNuxtPlugin((nuxtApp: NuxtAppLike) => {
  // Register the directive
  nuxtApp.vueApp.directive("auto-animate", vAutoAnimate)
})
