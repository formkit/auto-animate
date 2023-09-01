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
/**
 * AutoAnimate hook for adding dead-simple transitions and animations to Vue.
 * @returns A template ref. Use the `ref` attribute of your parent element
 * to store the element in this template ref.
 * @param config {useAutoAnimateOptions}
 */
type MaybeRefOrGetter<T>=T|Ref<T>|(()=>T)
type options = Partial<AutoAnimateOptions> | AutoAnimationPlugin
type useAutoAnimateOptions = options & {
  el?: MaybeRefOrGetter<Element>
}
export function useAutoAnimate<T extends Element>(config:useAutoAnimateOptions): [Ref<T>, (enabled: boolean) => void] {
  const {el,...options} = config
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
