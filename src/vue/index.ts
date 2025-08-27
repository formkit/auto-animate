import { ref, onMounted, watchEffect, Plugin, Ref, onBeforeUnmount } from "vue"
import type { Component, Directive } from "vue"
import autoAnimate, {
  vAutoAnimate as autoAnimateDirective,
  AutoAnimateOptions,
  AutoAnimationPlugin,
  AnimationController,
} from "../index"

export const vAutoAnimate: Directive<
  HTMLElement | Component,
  Partial<AutoAnimateOptions>
> = autoAnimateDirective as unknown as Directive<
  HTMLElement | Component,
  Partial<AutoAnimateOptions>
>

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
export function useAutoAnimate<T extends Element | Component>(
  options?: Partial<AutoAnimateOptions> | AutoAnimationPlugin,
): [Ref<T>, (enabled: boolean) => void] {
  const element = ref<T>()
  let controller: AnimationController | undefined
  function setEnabled(enabled: boolean) {
    if (controller) {
      enabled ? controller.enable() : controller.disable()
    }
  }
  onMounted(() => {
    watchEffect(() => {
      let el: HTMLElement | undefined
      if (element.value instanceof HTMLElement) {
        el = element.value
      } else if (
        element.value &&
        "$el" in element.value &&
        element.value.$el instanceof HTMLElement
      ) {
        el = element.value.$el
      }
      if (el) {
        controller = autoAnimate(el, options || {})
      }
    })
  })
  onBeforeUnmount(() => {
    controller?.destroy?.()
    controller = undefined
  })

  return [element as Ref<T>, setEnabled]
}
