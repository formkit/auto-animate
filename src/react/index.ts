import { useEffect, useState, useRef, RefObject } from "react"
import autoAnimate, {
  AutoAnimateOptions,
  AutoAnimationPlugin,
  AnimationController,
} from "../index"

/**
 * AutoAnimate hook for adding dead-simple transitions and animations to react.
 * @param options - Auto animate options or a plugin
 * @returns
 */
export function useAutoAnimate<T extends Element>(
  options?: Partial<AutoAnimateOptions> | AutoAnimationPlugin
): [RefObject<T>, (enabled: boolean) => void] {
  const element = useRef<T>(null)
  const [controller, setController] = useState<
    AnimationController | undefined
  >()
  const setEnabled = (enabled: boolean) => {
    if (controller) {
      enabled ? controller.enable() : controller.disable()
    }
  }
  useEffect(() => {
    if (element.current instanceof HTMLElement)
      setController(autoAnimate(element.current, options || {}))
  }, [])
  return [element, setEnabled]
}
