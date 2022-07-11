import { ref, onMounted, watchEffect, Plugin, Ref } from "vue"
import autoAnimate, { vAutoAnimate, AutoAnimateOptions, AutoAnimationPlugin } from "../index"

export const autoAnimatePlugin: Plugin = {
  install(app) {
    app.directive("auto-animate", vAutoAnimate)
  },
}

/**
 * AutoAnimate hook for adding dead-simple transitions and animations to Vue.
 * @param options - Auto animate options or a plugin
 * @returns A template ref. Use the `ref` attribute of your parent element
 * to store the element in this template ref.
 */
 export function useAutoAnimate<T extends Element>(
  options: Partial<AutoAnimateOptions> | AutoAnimationPlugin = {}
): Ref<T> {
  const element = ref<T>()

  onMounted(() => {
    watchEffect(() => {
      if (element.value instanceof HTMLElement)
        autoAnimate(element.value, options)
    })
  })

  return element as Ref<T>
}
