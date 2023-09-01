import { ref, onMounted, watchEffect, Plugin, Ref } from "vue"
import autoAnimate, {
  vAutoAnimate,
  AutoAnimateOptions,
  AutoAnimationPlugin,
  AnimationController,
} from "../index"

export const autoAnimatePlugin: Plugin = {
  install(app) {
    app.directive("auto-animate", vAutoAnimate)
  },
}
type MaybeRefOrGetter<T>=T|Ref<T>|(()=>T)
/**
 * AutoAnimate hook for adding dead-simple transitions and animations to Vue.
 * @returns A template ref. Use the `ref` attribute of your parent element
 * to store the element in this template ref.
 * @param config {{el?:MaybeRefOrGetter<T>,options?: Partial<AutoAnimateOptions> | AutoAnimationPlugin}}
 */
export function useAutoAnimate<T extends Element>(config:{
  el?:MaybeRefOrGetter<T>,
  options?: Partial<AutoAnimateOptions> | AutoAnimationPlugin
}): [Ref<T>, (enabled: boolean) => void] {
  const {el,options} = config
  const element = ref(el) as Ref<T>
  let controller: AnimationController | undefined
  function setEnabled(enabled: boolean) {
    if (controller) {
      enabled ? controller.enable() : controller.disable()
    }
  }
  onMounted(() => {
    watchEffect(() => {
      if (element.value instanceof HTMLElement)
        controller = autoAnimate(element.value, options || {})
    })
  })

  return [element, setEnabled]
}
