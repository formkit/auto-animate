/**
 * Absolute coordinate positions adjusted for scroll.
 */
interface Coordinates {
  top: number
  left: number
  width: number
  height: number
}

/**
 * Allows start/stop control of the animation
 */
export interface AnimationController<P = unknown> {
  /**
   * The original animation parent.
   */
  readonly parent: Element
  /**
   * A function that enables future animations.
   */
  enable: () => void
  /**
   * A function that disables future animations.
   */
  disable: () => void
  /**
   * A function that returns true if the animations are currently enabled.
   */
  isEnabled: () => boolean
  /**
   * (Svelte Specific) A function that runs if the parameters are changed.
   */
  update?: (newParams: P) => void
  /**
   * (Svelte Specific) A function that runs when the component is removed from the DOM.
   */
  destroy?: () => void
}

/**
 * A set of all the parents currently being observe. This is the only non weak
 * registry.
 */
const parents = new Set<Element>()
/**
 * Element coordinates that is constantly kept up to date.
 */
const coords = new WeakMap<Element, Coordinates>()
/**
 * Siblings of elements that have been removed from the dom.
 */
const siblings = new WeakMap<Element, [prev: Node | null, next: Node | null]>()
/**
 * Animations that are currently running.
 */
const animations = new WeakMap<Element, Animation>()
/**
 * A map of existing intersection observers used to track element movements.
 */
const intersections = new WeakMap<Element, IntersectionObserver>()
/**
 * Intervals for automatically checking the position of elements occasionally.
 */
const intervals = new WeakMap<Element, NodeJS.Timeout>()
/**
 * The configuration options for each group of elements.
 */
const options = new WeakMap<Element, AutoAnimateOptions | AutoAnimationPlugin>()
/**
 * Debounce counters by id, used to debounce calls to update positions.
 */
const debounces = new WeakMap<Element, NodeJS.Timeout>()
/**
 * All parents that are currently enabled are tracked here.
 */
const enabled = new WeakSet<Element>()
/**
 * The document used to calculate transitions.
 */
let root: HTMLElement

/**
 * The root’s XY scroll positions.
 */
let scrollX = 0
let scrollY = 0
/**
 * Used to sign an element as the target.
 */
const TGT = "__aa_tgt"
/**
 * Used to sign an element as being part of a removal.
 */
const DEL = "__aa_del"
/**
 * Used to sign an element as being "new". When an element is removed from the
 * dom, but may cycle back in we can sign it with new to ensure the next time
 * it is recognized we consider it new.
 */
const NEW = "__aa_new"

/**
 * Callback for handling all mutations.
 * @param mutations - A mutation list
 */
const handleMutations: MutationCallback = (mutations) => {
  const elements = getElements(mutations)
  // If elements is "false" that means this mutation that should be ignored.
  if (elements) {
    elements.forEach((el) => animate(el))
  }
}

/**
 *
 * @param entries - Elements that have been resized.
 */
const handleResizes: ResizeObserverCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.target === root) updateAllPos()
    if (coords.has(entry.target)) updatePos(entry.target)
  })
}

/**
 * Observe this elements position.
 * @param el - The element to observe the position of.
 */
function observePosition(el: Element) {
  const oldObserver = intersections.get(el)
  oldObserver?.disconnect()
  let rect = coords.get(el)
  let invocations = 0
  const buffer = 5
  if (!rect) {
    rect = getCoords(el)
    coords.set(el, rect)
  }
  const { offsetWidth, offsetHeight } = root
  const rootMargins = [
    rect.top - buffer,
    offsetWidth - (rect.left + buffer + rect.width),
    offsetHeight - (rect.top + buffer + rect.height),
    rect.left - buffer,
  ]
  const rootMargin = rootMargins
    .map((px) => `${-1 * Math.floor(px)}px`)
    .join(" ")
  const observer = new IntersectionObserver(
    () => {
      ++invocations > 1 && updatePos(el)
    },
    {
      root,
      threshold: 1,
      rootMargin,
    }
  )
  observer.observe(el)
  intersections.set(el, observer)
}

/**
 * Update the exact position of a given element.
 * @param el - An element to update the position of.
 */
function updatePos(el: Element) {
  clearTimeout(debounces.get(el))
  const optionsOrPlugin = getOptions(el)
  const delay = isPlugin(optionsOrPlugin) ? 500 : optionsOrPlugin.duration
  debounces.set(
    el,
    setTimeout(async () => {
      const currentAnimation = animations.get(el)

      try {
        await currentAnimation?.finished

        coords.set(el, getCoords(el))
        observePosition(el)
      } catch {
        // ignore errors as the `.finished` promise is rejected when animations were cancelled
      }
    }, delay)
  )
}

/**
 * Updates all positions that are currently being tracked.
 */
function updateAllPos() {
  clearTimeout(debounces.get(root))
  debounces.set(
    root,
    setTimeout(() => {
      parents.forEach((parent) =>
        forEach(parent, (el) => lowPriority(() => updatePos(el)))
      )
    }, 100)
  )
}

/**
 * Its possible for a quick scroll or other fast events to get past the
 * intersection observer, so occasionally we need want "cold-poll" for the
 * latests and greatest position. We try to do this in the most non-disruptive
 * fashion possible. First we only do this ever couple seconds, staggard by a
 * random offset.
 * @param el - Element
 */
function poll(el: Element) {
  setTimeout(() => {
    intervals.set(
      el,
      setInterval(() => lowPriority(updatePos.bind(null, el)), 2000)
    )
  }, Math.round(2000 * Math.random()))
}

/**
 * Perform some operation that is non critical at some point.
 * @param callback
 */
function lowPriority(callback: CallableFunction) {
  if (typeof requestIdleCallback === "function") {
    requestIdleCallback(() => callback())
  } else {
    requestAnimationFrame(() => callback())
  }
}

/**
 * The mutation observer responsible for watching each root element.
 */
let mutations: MutationObserver | undefined

/**
 * A resize observer, responsible for recalculating elements on resize.
 */
let resize: ResizeObserver | undefined

/**
 * Ensure the browser is supported.
 */
const supportedBrowser =
  typeof window !== "undefined" && "ResizeObserver" in window

/**
 * If this is in a browser, initialize our Web APIs
 */
if (supportedBrowser) {
  root = document.documentElement
  mutations = new MutationObserver(handleMutations)
  resize = new ResizeObserver(handleResizes)
  window.addEventListener("scroll", () => {
    scrollY = window.scrollY
    scrollX = window.scrollX
  })
  resize.observe(root)
}
/**
 * Retrieves all the elements that may have been affected by the last mutation
 * including ones that have been removed and are no longer in the DOM.
 * @param mutations - A mutation list.
 * @returns
 */
function getElements(mutations: MutationRecord[]): Set<Element> | false {
  const observedNodes = mutations.reduce((nodes: Node[], mutation) => {
    return [
      ...nodes,
      ...Array.from(mutation.addedNodes),
      ...Array.from(mutation.removedNodes),
    ]
  }, [])
  // Short circuit if _only_ comment nodes are observed
  const onlyCommentNodesObserved = observedNodes.every(
    (node) => node.nodeName === "#comment"
  )

  if (onlyCommentNodesObserved) return false

  return mutations.reduce((elements: Set<Element> | false, mutation) => {
    // Short circuit if we find a purposefully deleted node.
    if (elements === false) return false

    if (mutation.target instanceof Element) {
      target(mutation.target)
      if (!elements.has(mutation.target)) {
        elements.add(mutation.target)
        for (let i = 0; i < mutation.target.children.length; i++) {
          const child = mutation.target.children.item(i)
          if (!child) continue
          if (DEL in child) {
            return false
          }
          target(mutation.target, child)
          elements.add(child)
        }
      }
      if (mutation.removedNodes.length) {
        for (let i = 0; i < mutation.removedNodes.length; i++) {
          const child = mutation.removedNodes[i]
          if (DEL in child) {
            return false
          }
          if (child instanceof Element) {
            elements.add(child)
            target(mutation.target, child)
            siblings.set(child, [
              mutation.previousSibling,
              mutation.nextSibling,
            ])
          }
        }
      }
    }
    return elements
  }, new Set<Element>())
}

/**
 * Assign the target to an element.
 * @param el - The root element
 * @param child
 */
function target(el: Element, child?: Element) {
  if (!child && !(TGT in el)) Object.defineProperty(el, TGT, { value: el })
  else if (child && !(TGT in child))
    Object.defineProperty(child, TGT, { value: el })
}

/**
 * Determines what kind of change took place on the given element and then
 * performs the proper animation based on that.
 * @param el - The specific element to animate.
 */
function animate(el: Element) {
  const isMounted = el.isConnected
  const preExisting = coords.has(el)
  if (isMounted && siblings.has(el)) siblings.delete(el)
  if (animations.has(el)) {
    animations.get(el)?.cancel()
  }
  if (NEW in el) {
    add(el)
  } else if (preExisting && isMounted) {
    remain(el)
  } else if (preExisting && !isMounted) {
    remove(el)
  } else {
    add(el)
  }
}

/**
 * Removes all non-digits from a string and casts to a number.
 * @param str - A string containing a pixel value.
 * @returns
 */
function raw(str: string): number {
  return Number(str.replace(/[^0-9.\-]/g, ""))
}

/**
 * Get the scroll offset of elements
 * @param el - Element
 * @returns
 */
function getScrollOffset(el: Element) {
  let p = el.parentElement
  while (p) {
    if (p.scrollLeft || p.scrollTop) {
      return { x: p.scrollLeft, y: p.scrollTop }
    }
    p = p.parentElement
  }
  return { x: 0, y: 0 }
}

/**
 * Get the coordinates of elements adjusted for scroll position.
 * @param el - Element
 * @returns
 */
function getCoords(el: Element): Coordinates {
  const rect = el.getBoundingClientRect()
  const { x, y } = getScrollOffset(el)
  return {
    top: rect.top + y,
    left: rect.left + x,
    width: rect.width,
    height: rect.height,
  }
}

/**
 * Returns the width/height that the element should be transitioned between.
 * This takes into account box-sizing.
 * @param el - Element being animated
 * @param oldCoords - Old set of Coordinates coordinates
 * @param newCoords - New set of Coordinates coordinates
 * @returns
 */
export function getTransitionSizes(
  el: Element,
  oldCoords: Coordinates,
  newCoords: Coordinates
) {
  let widthFrom = oldCoords.width
  let heightFrom = oldCoords.height
  let widthTo = newCoords.width
  let heightTo = newCoords.height
  const styles = getComputedStyle(el)
  const sizing = styles.getPropertyValue("box-sizing")

  if (sizing === "content-box") {
    const paddingY =
      raw(styles.paddingTop) +
      raw(styles.paddingBottom) +
      raw(styles.borderTopWidth) +
      raw(styles.borderBottomWidth)
    const paddingX =
      raw(styles.paddingLeft) +
      raw(styles.paddingRight) +
      raw(styles.borderRightWidth) +
      raw(styles.borderLeftWidth)
    widthFrom -= paddingX
    widthTo -= paddingX
    heightFrom -= paddingY
    heightTo -= paddingY
  }

  return [widthFrom, widthTo, heightFrom, heightTo].map(Math.round)
}

/**
 * Retrieves animation options for the current element.
 * @param el - Element to retrieve options for.
 * @returns
 */
function getOptions(el: Element): AutoAnimateOptions | AutoAnimationPlugin {
  return TGT in el && options.has((el as Element & { __aa_tgt: Element })[TGT])
    ? options.get((el as Element & { __aa_tgt: Element })[TGT])!
    : { duration: 250, easing: "ease-in-out" }
}

/**
 * Returns the target of a given animation (generally the parent).
 * @param el - An element to check for a target
 * @returns
 */
function getTarget(el: Element): Element | undefined {
  if (TGT in el) return (el as Element & { __aa_tgt: Element })[TGT]
  return undefined
}

/**
 * Checks if animations are enabled or disabled for a given element.
 * @param el - Any element
 * @returns
 */
function isEnabled(el: Element): boolean {
  const target = getTarget(el)
  return target ? enabled.has(target) : false
}

/**
 * Iterate over the children of a given parent.
 * @param parent - A parent element
 * @param callback - A callback
 */
function forEach(
  parent: Element,
  ...callbacks: Array<(el: Element, isRoot?: boolean) => void>
) {
  callbacks.forEach((callback) => callback(parent, options.has(parent)))
  for (let i = 0; i < parent.children.length; i++) {
    const child = parent.children.item(i)
    if (child) {
      callbacks.forEach((callback) => callback(child, options.has(child)))
    }
  }
}

/**
 * Always return tuple to provide consistent interface
 */
function getPluginTuple(
  pluginReturn: ReturnType<AutoAnimationPlugin>
): [KeyframeEffect, AutoAnimationPluginOptions] | [KeyframeEffect] {
  if (Array.isArray(pluginReturn)) return pluginReturn

  return [pluginReturn]
}

/**
 * Determine if config is plugin
 */
function isPlugin(
  config: Partial<AutoAnimateOptions> | AutoAnimationPlugin
): config is AutoAnimationPlugin {
  return typeof config === "function"
}

/**
 * The element in question is remaining in the DOM.
 * @param el - Element to flip
 * @returns
 */
function remain(el: Element) {
  const oldCoords = coords.get(el)
  const newCoords = getCoords(el)
  if (!isEnabled(el)) return coords.set(el, newCoords)
  let animation: Animation
  if (!oldCoords) return
  const pluginOrOptions = getOptions(el)
  if (typeof pluginOrOptions !== "function") {
    const deltaX = oldCoords.left - newCoords.left
    const deltaY = oldCoords.top - newCoords.top
    const [widthFrom, widthTo, heightFrom, heightTo] = getTransitionSizes(
      el,
      oldCoords,
      newCoords
    )
    const start: Record<string, any> = {
      transform: `translate(${deltaX}px, ${deltaY}px)`,
    }
    const end: Record<string, any> = {
      transform: `translate(0, 0)`,
    }
    if (widthFrom !== widthTo) {
      start.width = `${widthFrom}px`
      end.width = `${widthTo}px`
    }
    if (heightFrom !== heightTo) {
      start.height = `${heightFrom}px`
      end.height = `${heightTo}px`
    }
    animation = el.animate([start, end], {
      duration: pluginOrOptions.duration,
      easing: pluginOrOptions.easing,
    })
  } else {
    const [keyframes] = getPluginTuple(
      pluginOrOptions(el, "remain", oldCoords, newCoords)
    )
    animation = new Animation(keyframes)
    animation.play()
  }
  animations.set(el, animation)
  coords.set(el, newCoords)
  animation.addEventListener("finish", ()=>{
    updatePos.bind(null, el);
    !isPlugin(pluginOrOptions) && pluginOrOptions?.onEnd ? pluginOrOptions.onEnd() : null;
  })
}

/**
 * Adds the element with a transition.
 * @param el - Animates the element being added.
 */
function add(el: Element) {
  if (NEW in el) delete el[NEW]
  const newCoords = getCoords(el)
  coords.set(el, newCoords)
  const pluginOrOptions = getOptions(el)
  if (!isEnabled(el)) return
  let animation: Animation
  if (typeof pluginOrOptions !== "function") {
    animation = el.animate(
      [
        { transform: "scale(.98)", opacity: 0 },
        { transform: "scale(0.98)", opacity: 0, offset: 0.5 },
        { transform: "scale(1)", opacity: 1 },
      ],
      {
        duration: pluginOrOptions.duration * 1.5,
        easing: "ease-in",
      }
    )
  } else {
    const [keyframes] = getPluginTuple(pluginOrOptions(el, "add", newCoords))
    animation = new Animation(keyframes)
    animation.play()
  }
  animations.set(el, animation)
  animation.addEventListener("finish", ()=>{
    updatePos.bind(null, el);
    !isPlugin(pluginOrOptions) && pluginOrOptions?.onEnd ? pluginOrOptions.onEnd() : null;
  })
}

/**
 * Clean up after removing an element from the dom.
 * @param el - Element being removed
 * @param styles - Optional styles that should be removed from the element.
 */
function cleanUp(el: Element, styles?: Partial<CSSStyleDeclaration>) {
  el.remove()
  coords.delete(el)
  siblings.delete(el)
  animations.delete(el)
  intersections.get(el)?.disconnect()
  setTimeout(() => {
    if (DEL in el) delete el[DEL]
    Object.defineProperty(el, NEW, { value: true, configurable: true })
    if (styles && el instanceof HTMLElement) {
      for (const style in styles) {
        el.style[style as any] = ""
      }
    }
  }, 0)
}

/**
 * Animates the removal of an element.
 * @param el - Element to remove
 */
function remove(el: Element) {
  if (!siblings.has(el) || !coords.has(el)) return

  const [prev, next] = siblings.get(el)!
  Object.defineProperty(el, DEL, { value: true, configurable: true })
  const finalX = window.scrollX
  const finalY = window.scrollY

  if (next && next.parentNode && next.parentNode instanceof Element) {
    next.parentNode.insertBefore(el, next)
  } else if (prev && prev.parentNode) {
    prev.parentNode.appendChild(el)
  } else {
    getTarget(el)?.appendChild(el)
  }
  if (!isEnabled(el)) return cleanUp(el)

  const [top, left, width, height] = deletePosition(el)
  const optionsOrPlugin = getOptions(el)
  const oldCoords = coords.get(el)!
  if (finalX !== scrollX || finalY !== scrollY) {
    adjustScroll(el, finalX, finalY, optionsOrPlugin)
  }

  let animation: Animation
  let styleReset: Partial<CSSStyleDeclaration> = {
    position: "absolute",
    top: `${top}px`,
    left: `${left}px`,
    width: `${width}px`,
    height: `${height}px`,
    margin: "0",
    pointerEvents: "none",
    transformOrigin: "center",
    zIndex: "100",
  }

  if (!isPlugin(optionsOrPlugin)) {
    Object.assign((el as HTMLElement).style, styleReset)
    animation = el.animate(
      [
        {
          transform: "scale(1)",
          opacity: 1,
        },
        {
          transform: "scale(.98)",
          opacity: 0,
        },
      ],
      { duration: optionsOrPlugin.duration, easing: "ease-out" }
    )
  } else {
    const [keyframes, options] = getPluginTuple(
      optionsOrPlugin(el, "remove", oldCoords)
    )
    if (options?.styleReset !== false) {
      styleReset = options?.styleReset || styleReset
      Object.assign((el as HTMLElement).style, styleReset)
    }
    animation = new Animation(keyframes)
    animation.play()
  }
  animations.set(el, animation)
  animation.addEventListener("finish", ()=> {
    cleanUp.bind(null, el, styleReset);
    (!isPlugin(optionsOrPlugin) && optionsOrPlugin?.onEnd) ? optionsOrPlugin.onEnd() : null;
  })
}

/**
 * If the element being removed is at the very bottom of the page, and the
 * the page was scrolled into a space being "made available" by the element
 * that was removed, the page scroll will have jumped up some amount. We need
 * to offset the jump by the amount that the page was "automatically" scrolled
 * up. We can do this by comparing the scroll position before and after the
 * element was removed, and then offsetting by that amount.
 *
 * @param el - The element being deleted
 * @param finalX - The final X scroll position
 * @param finalY - The final Y scroll position
 * @param optionsOrPlugin - The options or plugin
 * @returns
 */
function adjustScroll(
  el: Element,
  finalX: number,
  finalY: number,
  optionsOrPlugin: AutoAnimateOptions | AutoAnimationPlugin
) {
  const scrollDeltaX = scrollX - finalX
  const scrollDeltaY = scrollY - finalY
  const scrollBefore = document.documentElement.style.scrollBehavior
  const scrollBehavior = getComputedStyle(root).scrollBehavior
  if (scrollBehavior === "smooth") {
    document.documentElement.style.scrollBehavior = "auto"
  }
  window.scrollTo(window.scrollX + scrollDeltaX, window.scrollY + scrollDeltaY)
  if (!el.parentElement) return
  const parent = el.parentElement
  let lastHeight = parent.clientHeight
  let lastWidth = parent.clientWidth
  const startScroll = performance.now()
  // Here we use a manual scroll animation to keep the element using the same
  // easing and timing as the parent’s scroll animation.
  function smoothScroll() {
    requestAnimationFrame(() => {
      if (!isPlugin(optionsOrPlugin)) {
        const deltaY = lastHeight - parent.clientHeight
        const deltaX = lastWidth - parent.clientWidth
        if (startScroll + optionsOrPlugin.duration > performance.now()) {
          window.scrollTo({
            left: window.scrollX - deltaX!,
            top: window.scrollY - deltaY!,
          })
          lastHeight = parent.clientHeight
          lastWidth = parent.clientWidth
          smoothScroll()
        } else {
          document.documentElement.style.scrollBehavior = scrollBefore
        }
      }
    })
  }
  smoothScroll()
}

/**
 * Determines the position of the element being removed.
 * @param el - The element being deleted
 * @returns
 */
function deletePosition(
  el: Element
): [top: number, left: number, width: number, height: number] {
  const oldCoords = coords.get(el)!
  const [width, , height] = getTransitionSizes(el, oldCoords, getCoords(el))

  let offsetParent: Element | null = el.parentElement
  while (
    offsetParent &&
    (getComputedStyle(offsetParent).position === "static" ||
      offsetParent instanceof HTMLBodyElement)
  ) {
    offsetParent = offsetParent.parentElement
  }
  if (!offsetParent) offsetParent = document.body
  const parentStyles = getComputedStyle(offsetParent)
  const parentCoords = coords.get(offsetParent) || getCoords(offsetParent)
  const top =
    Math.round(oldCoords.top - parentCoords.top) -
    raw(parentStyles.borderTopWidth)
  const left =
    Math.round(oldCoords.left - parentCoords.left) -
    raw(parentStyles.borderLeftWidth)
  return [top, left, width, height]
}

export interface AutoAnimateOptions {
  /**
   * The time it takes to run a single sequence of animations in milliseconds.
   */
  duration: number
  /**
   * The type of easing to use.
   * Default: ease-in-out
   */
  easing: "linear" | "ease-in" | "ease-out" | "ease-in-out" | ({} & string)
  /**
   * Ignore a user’s "reduce motion" setting and enable animations. It is not
   * recommended to use this.
   */
  disrespectUserMotionPreference?: boolean
  /**
   * The animation end callback
   */
  onEnd?: () => void
}

/**
 * A custom plugin config object
 */
export interface AutoAnimationPluginOptions {
  // provide your own css styles or disable style reset
  styleReset: CSSStyleDeclaration | false
}

/**
 * A custom plugin that determines what the effects to run
 */
export interface AutoAnimationPlugin {
  <T extends "add" | "remove" | "remain">(
    el: Element,
    action: T,
    newCoordinates?: T extends "add" | "remain" | "remove"
      ? Coordinates
      : undefined,
    oldCoordinates?: T extends "remain" ? Coordinates : undefined
  ): KeyframeEffect | [KeyframeEffect, AutoAnimationPluginOptions]
}

/**
 * A function that automatically adds animation effects to itself and its
 * immediate children. Specifically it adds effects for adding, moving, and
 * removing DOM elements.
 * @param el - A parent element to add animations to.
 * @param options - An optional object of options.
 */
export default function autoAnimate(
  el: HTMLElement,
  config: Partial<AutoAnimateOptions> | AutoAnimationPlugin = {}
): AnimationController {
  if (mutations && resize) {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const isDisabledDueToReduceMotion =
      mediaQuery.matches &&
      !isPlugin(config) &&
      !config.disrespectUserMotionPreference
    if (!isDisabledDueToReduceMotion) {
      enabled.add(el)
      if (getComputedStyle(el).position === "static") {
        Object.assign(el.style, { position: "relative" })
      }
      forEach(el, updatePos, poll, (element) => resize?.observe(element))
      if (isPlugin(config)) {
        options.set(el, config)
      } else {
        options.set(el, { duration: 250, easing: "ease-in-out", ...config })
      }
      mutations.observe(el, { childList: true })
      parents.add(el)
    }
  }
  return Object.freeze({
    parent: el,
    enable: () => {
      enabled.add(el)
    },
    disable: () => {
      enabled.delete(el)
    },
    isEnabled: () => enabled.has(el),
  })
}

/**
 * The vue directive.
 */
export const vAutoAnimate = {
  mounted: (
    el: HTMLElement,
    binding: {
      value: Partial<AutoAnimateOptions> | AutoAnimationPlugin | undefined
    }
  ) => {
    autoAnimate(el, binding.value || {})
  },
  // ignore ssr see #96:
  getSSRProps: () => ({}),
}
