const coords = new WeakMap<Element, DOMRect>()

const handleMutations: MutationCallback = (mutations) => {
  const parents = getParents(mutations)
  parents.forEach((el) => animateChildren(el))
}

const observer = new MutationObserver(handleMutations)

function getParents(mutations: MutationRecord[]) {
  return mutations.reduce((elements, mutation) => {
    if (mutation.target instanceof Element) {
      elements.add(mutation.target)
    }
    return elements
  }, new Set<Element>())
}

function updateCoords(el: Element) {
  for (let i = 0; i < el.children.length; i++) {
    const child = el.children.item(i)
    if (child) coords.set(child, child.getBoundingClientRect())
  }
}

function animateChildren(parent: Element) {
  for (let i = 0; i < parent.children.length; i++) {
    const child = parent.children.item(i)
    if (child) animate(child)
  }
}

function animate(el: Element) {
  const isMounted = document.body.contains(el)
  const preExisting = coords.has(el)
  if (preExisting && isMounted) {
    // This is an existing element that needs to flip
    flip(el)
  } else if (preExisting && !isMounted) {
    // This element is being deleted
    console.log("should delete", el)
    coords.delete(el)
  } else {
    // This is a new element
    console.log("should add", el)
  }
}

function flip(el: Element) {
  const oldCoords = coords.get(el)
  const newCoords = el.getBoundingClientRect()
  if (!oldCoords) return
  const deltaX = oldCoords.left - newCoords.left
  const deltaY = oldCoords.top - newCoords.top
  el.animate(
    [
      { transform: `translate(${deltaX}px, ${deltaY}px)` },
      { transform: `translate(0, 0)` },
    ],
    { duration: 500, easing: "ease-in-out" }
  )
  coords.set(el, newCoords)
}

export default function autoAnimate(el: Element) {
  updateCoords(el)
  observer.observe(el, { childList: true })
}
