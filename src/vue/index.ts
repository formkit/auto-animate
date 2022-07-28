import { ref, onMounted, Plugin, Ref } from "vue"
import autoAnimate, { vAutoAnimate, AutoAnimateOptions, AutoAnimationPlugin } from "../index"

export const autoAnimatePlugin: Plugin = {
  install(app) {
    app.directive("auto-animate", vAutoAnimate)
  },
}

/**
 * AutoAnimate hook for adding dead-simple transitions and animations to Vue.
 * @param options - Auto animate options or a plugin
 * @returns A function ref, which you should bind to the `ref` attribute
 * of your target element so `autoAnimate` can access it.
 */
 export function useAutoAnimate<T extends Element>(
  options: Partial<AutoAnimateOptions> | AutoAnimationPlugin = {}
) {
  const element = ref<T>()
  const functionRef: (el: T) => void = el => {
    if (el) element.value = el
  }

  onMounted(() => {
    if (element.value instanceof HTMLElement)
      autoAnimate(element.value, options)
  })

  return functionRef
}
