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

/**
 * Create a Vue directive instance that merges provided defaults with per-use binding.
 */
export function createVAutoAnimate(
  defaults?: Partial<AutoAnimateOptions> | AutoAnimationPlugin
): Directive<HTMLElement, Partial<AutoAnimateOptions> | AutoAnimationPlugin> {
  return {
    mounted(el, binding) {
      let resolved: Partial<AutoAnimateOptions> | AutoAnimationPlugin = {}
      const local = binding.value
      if (typeof local === "function") {
        resolved = local
      } else if (typeof defaults === "function") {
        resolved = defaults
      } else {
        resolved = { ...(defaults || {}), ...(local || {}) }
      }
      const ctl = autoAnimate(el, resolved)
      Object.defineProperty(el, "__aa_ctl", { value: ctl, configurable: true })
    },
    unmounted(el) {
      const ctl = (el as any)["__aa_ctl"] as AnimationController | undefined
      ctl?.destroy?.()
      try {
        delete (el as any)["__aa_ctl"]
      } catch {}
    },
    getSSRProps: () => ({}),
  } as unknown as Directive<
    HTMLElement,
    Partial<AutoAnimateOptions> | AutoAnimationPlugin
  >
}

export const autoAnimatePlugin: Plugin = {
  install(app, defaults?: Partial<AutoAnimateOptions> | AutoAnimationPlugin) {
    app.directive("auto-animate", createVAutoAnimate(defaults))
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
    watchEffect((onCleanup) => {
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
        onCleanup(() => {
          controller?.destroy?.()
          controller = undefined
        })
      }
    })
  })
  onBeforeUnmount(() => {
    controller?.destroy?.()
    controller = undefined
  })

  return [element as Ref<T>, setEnabled]
}
