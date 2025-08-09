import autoAnimate, {
  AutoAnimateOptions,
  AutoAnimationPlugin,
  AnimationController,
} from "../index"
import { createSignal, onMount, Setter, Accessor, onCleanup } from "solid-js"

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      autoAnimate: Partial<AutoAnimateOptions> | AutoAnimationPlugin | true
    }
  }
}

export const createAutoAnimate = <T extends HTMLElement>(
  options: Partial<AutoAnimateOptions> | AutoAnimationPlugin = {}
): [Setter<T | null>, (enabled: boolean) => void] => {
  const [element, setElement] = createSignal<T | null>(null)

  let controller: AnimationController | undefined
  let active = true

  onMount(() => {
    const el = element()
    if (el) {
      controller = autoAnimate(el, options)
      if (active) controller.enable()
      else controller.disable()
      onCleanup(() => controller?.destroy?.())
    }
  })

  const setEnabled = (enabled: boolean) => {
    active = enabled
    if (controller) {
      enabled ? controller.enable() : controller.disable()
    }
  }

  return [setElement, setEnabled]
}

export const createAutoAnimateDirective = () => {
  return (
    el: HTMLElement,
    options: Accessor<Partial<AutoAnimateOptions> | AutoAnimationPlugin | true>
  ) => {
    let optionsValue = options()
    let resolvedOptions: Partial<AutoAnimateOptions> | AutoAnimationPlugin = {}
    if (optionsValue !== true) resolvedOptions = optionsValue
    const controller = autoAnimate(el, resolvedOptions)
    onCleanup(() => controller.destroy?.())
  }
}
