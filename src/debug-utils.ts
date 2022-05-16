function raw(str: string): number {
  return Number(str.replace(/[^0-9.\-]/g, ""))
}

const lines = new WeakMap<
  IntersectionObserver,
  [Element, Element, Element, Element]
>()

/**
 * TODO - remove, for debugging only
 * @param rootMargin - Draw the root margins
 */
export function drawMargins(
  observer: IntersectionObserver,
  oldObserver?: IntersectionObserver
) {
  const color = "#ff0000"
  if (oldObserver && lines.has(oldObserver)) {
    lines.get(oldObserver)?.map((line) => line.remove())
  }
  lines.set(
    observer,
    observer.rootMargin
      .split(" ")
      .map(raw)
      .map((value) => -1 * value)
      .map((pos, i) => {
        const line = document.createElement("div")
        let bottomLine
        if (i === 2) {
          bottomLine = document.documentElement.offsetHeight - pos
        }
        line.setAttribute(
          "style",
          `box-sizing: border-box; border: 1px solid ${color}; opacity: .5; z-index: 100; pointer-events:none; position: absolute; ${
            ["top", "right", "top", "left"][i]
          }: ${bottomLine || pos}px; ${
            i % 2
              ? `height: ${document.documentElement.offsetHeight}px;`
              : "width: 100%"
          }`
        )
        line.setAttribute("data-deets", `pos(${pos}) i(${i})`)
        document.body.prepend(line)
        return line
      }) as [HTMLDivElement, HTMLDivElement, HTMLDivElement, HTMLDivElement]
  )
}
