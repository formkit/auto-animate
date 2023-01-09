import { createEffect } from "solid-js"
import autoAnimateBase, {
  AutoAnimateOptions,
  AutoAnimationPlugin,
} from "../index"

/**
 * This code is taken from https://github.com/lxsmnsyc/solid-auto-animate/blob/main/packages/solid-auto-animate/src/index.ts
 */

declare module "solid-js" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface Directives {
      autoAnimate: Partial<AutoAnimateOptions> | AutoAnimationPlugin | true
    }
  }
}

export function autoAnimate<T extends HTMLElement>(
  element: T,
  options: () => Partial<AutoAnimateOptions> | AutoAnimationPlugin | true
): void {
  createEffect(() => {
    const currentOptions = options()
    autoAnimateBase(element, currentOptions === true ? {} : currentOptions)
  })
}

export function useAutoAnimate<T extends HTMLElement>(
  element: () => T,
  options: Partial<AutoAnimateOptions> | AutoAnimationPlugin
) {
  createEffect(() => {
    autoAnimateBase(element(), options)
  })
}
