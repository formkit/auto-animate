import {
  $,
  NoSerialize,
  noSerialize,
  QRL,
  Signal,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik"

import { isBrowser } from "@builder.io/qwik/build"
import autoAnimate, {
  AnimationController,
  AutoAnimateOptions,
  AutoAnimationPlugin,
} from "../index"

/**
 * AutoAnimate hook for adding dead-simple transitions and animations to qwik.
 * @param options - Auto animate options or a plugin
 * @returns
 */
export function useAutoAnimate<T extends HTMLElement>(
  options?: Partial<AutoAnimateOptions> | AutoAnimationPlugin
): [
  Signal<T | undefined>,
  QRL<(enabled: boolean | ((isEnabled: boolean) => boolean)) => void>
] {
  const parentRef = useSignal<T>()
  const controller = useSignal<NoSerialize<AnimationController | undefined>>()

  useVisibleTask$(({ track }) => {
    const element = track(() => parentRef.value)
    if (element && isBrowser) {
      controller.value = noSerialize(autoAnimate(element, options))
    }
  })

  const setEnabled = $(
    (enabled: boolean | ((isEnabled: boolean) => boolean)) => {
      const ctl = controller.value
      if (ctl) {
        typeof enabled === "function"
          ? enabled(ctl.isEnabled())
            ? ctl.enable()
            : ctl.disable()
          : enabled
          ? ctl.enable()
          : ctl.disable()
      }
    }
  )
  return [parentRef, setEnabled]
}
