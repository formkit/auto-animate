import { createSignal, onMount, Setter } from "solid-js"
import autoAnimate, {
  AutoAnimateOptions,
  AutoAnimationPlugin,
  AnimationController,
} from "../index"

/**
 * AutoAnimate function for adding dead-simple transitions and animations to solid.js.
 * @param options - Auto animate options or a plugin
 * @returns
 */
export function createAutoAnimate<T extends Element>(
  options?: Partial<AutoAnimateOptions> | AutoAnimationPlugin
): [Setter<T | null>, (enabled: boolean) => void] {
  const [element, setElement] = createSignal<T | null>(null)
  const [controller, setController] = createSignal<
    AnimationController | undefined
  >()
  const setEnabled = (enabled: boolean) => {
    const currentController = controller()
    if (currentController) {
      enabled ? currentController.enable() : currentController.disable()
    }
  }

  onMount(() => {
    const currentElement = element()
    if (currentElement instanceof HTMLElement)
      setController(autoAnimate(currentElement, options || {}))
  }, )

  return [setElement, setEnabled]
}

