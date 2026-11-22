import autoAnimateCore, {
  AutoAnimateOptions,
  AutoAnimationPlugin,
} from "../index"

/**
 * A Svelte 5 attachment cleanup function.
 */
type Cleanup = () => void

/**
 * A Svelte 5 attachment: `(element) => cleanup`.
 */
export type AutoAnimateAttachment = (el: HTMLElement | SVGElement) => Cleanup

function attach(
  el: HTMLElement | SVGElement,
  config?: Partial<AutoAnimateOptions> | AutoAnimationPlugin
): Cleanup {
  const controller = autoAnimateCore(el as HTMLElement, config ?? {})
  return () => controller.destroy?.()
}

/**
 * AutoAnimate as a Svelte 5 attachment
 * (https://svelte.dev/docs/svelte/@attach). Use it bare, or call it with
 * options or a plugin. Options read inside the call are reactive: when they
 * change, Svelte tears the attachment down and re-attaches it.
 *
 * ```svelte
 * <ul {@attach autoAnimate}>…</ul>
 * <ul {@attach autoAnimate({ duration: 100 })}>…</ul>
 * ```
 */
export function autoAnimate(el: HTMLElement | SVGElement): Cleanup
export function autoAnimate(
  config?: Partial<AutoAnimateOptions> | AutoAnimationPlugin
): AutoAnimateAttachment
export function autoAnimate(
  elOrConfig?:
    | HTMLElement
    | SVGElement
    | Partial<AutoAnimateOptions>
    | AutoAnimationPlugin
): Cleanup | AutoAnimateAttachment {
  if (
    typeof Element !== "undefined" &&
    elOrConfig instanceof Element
  ) {
    return attach(elOrConfig as HTMLElement | SVGElement)
  }
  const config = elOrConfig as
    | Partial<AutoAnimateOptions>
    | AutoAnimationPlugin
    | undefined
  return (el) => attach(el, config)
}

export default autoAnimate
