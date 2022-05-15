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

const intersections = new WeakMap<Element, IntersectionObserver>()
/**
 * The configuration options for each group of elements.
 */
const options = new WeakMap<Element, AutoAnimateOptions>()

/**
 * Debounce counters by id, used to debounce calls to update positions.
 */
const debounces = new WeakMap<Element, NodeJS.Timeout>()

/**
 * The document used to calculate transitions.
 */
const root = document.documentElement

/**
 * Used to sign an element as the target.
 */
const TGT = "__aa_tgt"
/**
 * Used to sign an element as being part of a removal.
 */
const DEL = "__aa_del"

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
    if (coords.has(entry.target)) updatePos(entry.target)
  })
}

/**
 * Observe this elements position.
 * @param el - The element to observe the position of.
 */
function observePosition(el: Element) {
  intersections.get(el)?.disconnect()
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
    () => ++invocations > 1 && updatePos(el),
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
 * TODO - remove, for debugging only
 * @param rootMargin - Draw the root margins
 */
function drawMargins(rootMargin: string, invocations: number) {
  const color = randomHexColor()
  rootMargin
    .split(" ")
    .map(raw)
    .map((value) => -1 * value)
    .forEach((pos, i) => {
      const line = document.createElement("div")
      line.setAttribute(
        "style",
        `border: 1px solid ${color}; opacity: .5; z-index: 100; pointer-events:none; position: absolute; ${
          ["top", "right", "bottom", "left"][i]
        }: ${pos}px; ${i % 2 ? "height: 100%;" : "width: 100%"}`
      )
      line.setAttribute("data-deets", `pos(${pos}) i(${i})`)
      document.body.prepend(line)
    })
}
var randomHexColor = function () {
  var color = "#",
    i = 5
  do {
    color += "0123456789abcdef".substr(Math.random() * 16, 1)
  } while (i--)
  return color
}
/**
 * Update the exact position of a given element.
 * @param el - An element to update the position of.
 */
function updatePos(el: Element) {
  clearTimeout(debounces.get(el))
  const currentAnimation = animations.get(el)
  if (!currentAnimation || currentAnimation.finished) {
    debounces.set(
      el,
      setTimeout(() => {
        console.log("updating Coords")
        coords.set(el, getCoords(el))
        observePosition(el)
      }, getOptions(el).duration || 500)
    )
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
 * If this is in a browser, initialize our Web APIs
 */
if (typeof window !== "undefined") {
  mutations = new MutationObserver(handleMutations)
  resize = new ResizeObserver(handleResizes)
}
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
          if (DEL in child) return false
          target(mutation.target, child)
          elements.add(child)
        }
      }
      if (mutation.removedNodes.length) {
        for (let i = 0; i < mutation.removedNodes.length; i++) {
          const child = mutation.removedNodes[i]
          if (DEL in child) return false
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
  const isMounted = root.contains(el)
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
  return Number(str.replace(/[^0-9.\-]/g, ""))
}

/**
 * Get the coordinates of elements adjusted for scroll position.
 * @param el - Element
 * @returns
 */
function getCoords(el: Element): Coordinates {
  const rect = el.getBoundingClientRect()
  return {
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX,
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
function getTransitionSizes(
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
  if (el.tagName === "P") console.log("flipping p")
  const oldCoords = coords.get(el)
  const newCoords = getCoords(el)
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
  animation.addEventListener("finish", updatePos.bind(null, el))
}

/**
 * Adds the element with a transition.
 * @param el - Animates the element being added.
 */
function add(el: Element) {
  const newCoords = getCoords(el)
  coords.set(el, newCoords)
  const animation = el.animate(
    [
      { transform: "scale(.98)", opacity: 0 },
      { transform: "scale(0.98)", opacity: 0, offset: 0.5 },
      { transform: "scale(1)", opacity: 1 },
    ],
    {
      duration: getOptions(el).duration * 1.5,
      easing: "ease-in",
    }
  )
  animations.set(el, animation)
  animation.addEventListener("finish", updatePos.bind(null, el))
}

/**
 * Animates the removal of an element.
 * @param el - Element to remove
 */
function remove(el: Element) {
  if (siblings.has(el) && coords.has(el)) {
    const [prev, next] = siblings.get(el)!
    Object.defineProperty(el, DEL, { value: true })
    if (next && next.parentNode && next.parentNode instanceof Element) {
      next.parentNode.insertBefore(el, next)
    } else if (prev && prev.parentNode) {
      prev.parentNode.appendChild(el)
    }
    const [widthFrom, _widthTo, heightFrom, _heightTo] = getTransitionSizes(
      el,
      coords.get(el)!,
      getCoords(el)
    )
    el.setAttribute(
      "style",
      `position: absolute; width: ${widthFrom}px; height: ${heightFrom}px; pointer-events: none; transform-origin: top center; `
    )
    const animation = el.animate(
      [
        { transform: "scale(1)", opacity: 1 },
        { transform: "scale(.98)", opacity: 0 },
      ],
      { duration: getOptions(el).duration, easing: "ease-out" }
    )
    animations.set(el, animation)
    animation.addEventListener("finish", () => {
      el.remove()
      coords.delete(el)
      siblings.delete(el)
      animations.delete(el)
      intersections.get(el)?.disconnect()
    })
  }
}

/**
 * Retrieves animation options for the current element.
 * @param el - Element to retrieve options for.
 * @returns
 */
function getOptions(el: Element): AutoAnimateOptions {
  return TGT in el && options.has((el as Element & { __aa_tgt: Element })[TGT])
    ? options.get((el as Element & { __aa_tgt: Element })[TGT])!
    : { duration: 250, easing: "ease-in-out" }
}

/**
 * Iterate over the children of a given parent.
 * @param parent - A parent element
 * @param callback - A callback
 */
function forEach(
  parent: Element,
  callback: (el: Element, isRoot?: boolean) => void
) {
  callback(parent, options.has(parent))
  for (let i = 0; i < parent.children.length; i++) {
    const child = parent.children.item(i)
    if (child) {
      callback(child, options.has(child))
    }
  }
}

/**
 * Adds observers to a parent and its children.
 */
function observeRects(parent: Element) {
  forEach(parent, (el) => {
    resize?.observe(el)
    observePosition(el)
  })
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
  if (mutations) {
    forEach(el, updatePos)
    observeRects(el)
    options.set(el, { duration: 250, easing: "ease-in-out", ...config })
    mutations.observe(el, { childList: true })
  }
}

/**
 * The vue directive.
 */
export const vAutoAnimate = {
  mounted: (el: Element, binding: { value: Partial<AutoAnimateOptions> }) => {
    autoAnimate(el, binding.value || {})
  },
}
