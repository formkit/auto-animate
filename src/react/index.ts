import { useEffect, useRef, RefObject } from "react"
import autoAnimate, { AutoAnimateOptions, AutoAnimationPlugin } from "../index"

/**
 * AutoAnimate hook for adding dead-simple transitions and animations to react.
 * @param options - Auto animate options or a plugin
 * @returns
 */
export function useAutoAnimate<T extends Element>(
  options: Partial<AutoAnimateOptions> | AutoAnimationPlugin = {}
): [RefObject<T>] {
  const element = useRef<T>(null)
  useEffect(() => {
    if (element.current instanceof HTMLElement)
      autoAnimate(element.current, options)
  }, [element])
  return [element]
}
