const coords = new WeakMap<Element, DOMRect>()
const siblings = new WeakMap<Element, [prev: Node | null, next: Node | null]>()
const animations = new WeakMap<Element, Animation>()
const options = new WeakMap<Element, AutoAnimateOptions>()
const tgt = "__aa_target"
const del = "__aa_del"
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
 * The mutation observer responsible for watching each root element.
 */
const observer = new MutationObserver(handleMutations)

/**
 * Retrieves all the elements that may have been affected by the last mutation
 * including ones that have been removed and are no longer in the DOM.
 * @param mutations - A mutation list.
 * @returns
 */
function getElements(mutations: MutationRecord[]): Set<Element> | false {
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
          if (del in child) return false
          target(mutation.target, child)
          elements.add(child)
        }
      }
      if (mutation.removedNodes.length) {
        for (let i = 0; i < mutation.removedNodes.length; i++) {
          const child = mutation.removedNodes[i]
          if (del in child) return false
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
 *
 * @param el - The root element
 * @param child
 */
function target(el: Element, child?: Element) {
  if (!child && !(tgt in el)) Object.defineProperty(el, tgt, { value: el })
  else if (child && !(tgt in child))
    Object.defineProperty(child, tgt, { value: el })
}

/**
 * Given a root element, update the coordinates of all elements.
 * @param el - The root element.
 */
function updateCoords(rootElement: Element) {
  coords.set(rootElement, rootElement.getBoundingClientRect())
  for (let i = 0; i < rootElement.children.length; i++) {
    const child = rootElement.children.item(i)
    if (child) coords.set(child, child.getBoundingClientRect())
  }
}

/**
 * Determines what kind of change took place on the given element and then
 * performs the proper animation based on that.
 * @param el - The specific element to animate.
 */
function animate(el: Element) {
  const isMounted = document.body.contains(el)
  const preExisting = coords.has(el)
  if (isMounted && siblings.has(el)) siblings.delete(el)
  if (animations.has(el)) {
    animations.get(el)?.cancel()
  }
  if (preExisting && isMounted) {
    flip(el)
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
  return Number(str.replace(/[^0-9.]/g, ""))
}

/**
 * Returns the width/height that the element should be transitioned between.
 * This takes into account box-sizing.
 * @param el - Element being animated
 * @param oldCoords - Old set of DOMRect coordinates
 * @param newCoords - New set of DOMRect coordinates
 * @returns
 */
function getTransitionSizes(
  el: Element,
  oldCoords: DOMRect,
  newCoords: DOMRect
) {
  let widthFrom = oldCoords.width
  let heightFrom = oldCoords.height
  let widthTo = newCoords.width
  let heightTo = newCoords.height
  const styles = getComputedStyle(el)
  const sizing = styles.getPropertyValue("box-sizing")

  if (sizing === "content-box") {
    const paddingY =
      raw(styles.getPropertyValue("padding-top")) +
      raw(styles.getPropertyValue("padding-bottom"))
    const paddingX =
      raw(styles.getPropertyValue("padding-left")) +
      raw(styles.getPropertyValue("padding-right"))
    widthFrom -= paddingX
    widthTo -= paddingX
    heightFrom -= paddingY
    heightTo -= paddingY
  }

  return [widthFrom, widthTo, heightFrom, heightTo]
}

/**
 * Performs a flip animation on the element.
 * @param el - Element to flip
 * @returns
 */
function flip(el: Element) {
  const oldCoords = coords.get(el)
  const newCoords = el.getBoundingClientRect()
  if (!oldCoords) return
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
  const animation = el.animate([start, end], getOptions(el))
  animations.set(el, animation)
  coords.set(el, newCoords)
}

/**
 * Adds the element with a transition.
 * @param el - Animates the element being added.
 */
function add(el: Element) {
  const newCoords = el.getBoundingClientRect()
  coords.set(el, newCoords)
  const animation = el.animate(
    [
      { transform: "scale(.9)", opacity: 0 },
      { transform: "scale(1)", opacity: 1 },
    ],
    { duration: getOptions(el).duration, easing: "ease-in" }
  )
  animations.set(el, animation)
}

/**
 * Animates the removal of an element.
 * @param el - Element to remove
 */
function remove(el: Element) {
  if (siblings.has(el) && coords.has(el)) {
    const [prev, next] = siblings.get(el)!
    Object.defineProperty(el, del, { value: true })
    if (next && next.parentNode && next.parentNode instanceof Element) {
      next.parentNode.insertBefore(el, next)
    } else if (prev && prev.parentNode) {
      prev.parentNode.appendChild(el)
    }
    const [widthFrom, _widthTo, heightFrom, _heightTo] = getTransitionSizes(
      el,
      coords.get(el)!,
      el.getBoundingClientRect()
    )
    el.setAttribute(
      "style",
      `position: absolute; width: ${widthFrom}px; height: ${heightFrom}px; pointer-events: none; transform-origin: top center; `
    )
    const animation = el.animate(
      [
        { transform: "scale(1)", opacity: 1 },
        { transform: "scale(.9)", opacity: 0 },
      ],
      { duration: getOptions(el).duration, easing: "ease-out" }
    )
    animations.set(el, animation)
    animation.addEventListener("finish", () => {
      el.remove()
      coords.delete(el)
      siblings.delete(el)
    })
  }
}

/**
 * Retrieves animation options for the current element.
 * @param el - Element to retrieve options for.
 * @returns
 */
function getOptions(el: Element): AutoAnimateOptions {
  return tgt in el &&
    options.has((el as Element & { __aa_target: Element })[tgt])
    ? options.get((el as Element & { __aa_target: Element })[tgt])!
    : { duration: 250, easing: "ease-in-out" }
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
  easing: "linear" | "ease-in" | "ease-out" | "ease-in-out" | string
}

/**
 * A function that automatically adds animation effects to itself and its
 * immediate children. Specifically it adds effects for adding, moving, and
 * removing DOM elements.
 * @param el - A parent element to add animations to.
 * @param options - An optional object of options.
 */
export default function autoAnimate(
  el: Element,
  config: Partial<AutoAnimateOptions> = {}
) {
  if (typeof window !== "undefined") {
    updateCoords(el)
    options.set(el, { duration: 250, easing: "ease-in-out", ...config })
    observer.observe(el, { childList: true })
  }
}
