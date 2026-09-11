import autoAnimate, { vAutoAnimate } from "../../src/index"

declare const svg: SVGSVGElement
declare const html: HTMLElement
declare const group: SVGGElement

autoAnimate(svg)
autoAnimate(html)
autoAnimate(group)

const binding = {
  value: undefined as undefined,
}
vAutoAnimate.mounted(svg, binding)
vAutoAnimate.mounted(html, binding)
vAutoAnimate.unmounted(svg)
vAutoAnimate.unmounted(html)
