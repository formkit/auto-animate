import type { CSSProperties } from "vue"
import { AutoAnimationPlugin, getTransitionSizes } from "../index"

interface Coordinates {
  top: number;
  left: number;
  width: number;
  height: number;
}

const bouncyControls = (
  el: Element,
  action: "add" | "remove" | "remain",
  oldCoords?: Coordinates,
  newCoords?: Coordinates
) => {
  let keyframes: Keyframe[]
  switch (action) {
    case "add":
      keyframes = [
        { transform: "scale(0)", opacity: 0 },
        { transform: "scale(1.15)", opacity: 1, offset: 0.75 },
        { transform: "scale(1)", opacity: 1 }
      ]
      break
    case "remove":
      keyframes = [
        { transform: "scale(1)", opacity: 1 },
        { transform: "scale(1.15)", opacity: 1, offset: 0.33 },
        { transform: "scale(0.75)", opacity: 0.1, offset: 0.5 },
        { transform: "scale(0.5)", opacity: 0 }
      ]
      break
    case "remain":
      const deltaX = oldCoords!.left - newCoords!.left
      const deltaY = oldCoords!.top - newCoords!.top
      const [widthFrom, widthTo, heightFrom, heightTo] = getTransitionSizes(
        el,
        oldCoords!,
        newCoords!
      )
      const start: CSSProperties = { transform: `translate(${deltaX}px, ${deltaY}px)` }
      const mid: CSSProperties = {
        transform: `translate(${deltaX * -0.15}px, ${deltaY * -0.15}px)`,
        offset: 0.75
      }
      const end: CSSProperties = { transform: `translate(0, 0)` }
      if (widthFrom !== widthTo) {
        start.width = `${widthFrom}px`
        mid.width = `${widthFrom >= widthTo ? widthTo / 1.05 : widthTo * 1.05}px`
        end.width = `${widthTo}px`
      }
      if (heightFrom !== heightTo) {
        start.height = `${heightFrom}px`
        mid.height = `${heightFrom >= heightTo ? heightTo / 1.05 : heightTo * 1.05}px`
        end.height = `${heightTo}px`
      }
      keyframes = [start as Keyframe, mid as Keyframe, end as Keyframe]
      break
    default:
      const _invalidAction: never = action
      throw new Error(`Invalid action: ${_invalidAction}`)
  }
  return new KeyframeEffect(el, keyframes, { duration: 600, easing: "ease-out" })
}
const rotateXControls = (
  el: Element,
  action: "add" | "remove" | "remain",
  oldCoords?: Coordinates,
  newCoords?: Coordinates
) => {
  let keyframes: Keyframe[]
  switch (action) {
    case "add":
      keyframes = [
        { transform: "rotateX(90deg)", opacity: 0 },
        { transform: "rotateX(0deg)", opacity: 1 }
      ]
      break
    case "remove":
      keyframes = [
        { transform: "rotateX(0deg)", opacity: 1 },
        { transform: "rotateX(90deg)", opacity: 0 }
      ]
      break
    case "remain":
      const deltaX = oldCoords!.left - newCoords!.left
      const deltaY = oldCoords!.top - newCoords!.top
      const [widthFrom, widthTo, heightFrom, heightTo] = getTransitionSizes(
        el,
        oldCoords!,
        newCoords!
      )
      const start: CSSProperties = { transform: `translate(${deltaX}px, ${deltaY}px) rotateX(0)` }
      const mid: CSSProperties =
        deltaX === 0 && deltaY === 0
          ? { transform: `translate(0,0)` }
          : {
            transform: `translate(${deltaX * 0.5}px, ${deltaY * 0.5}px) rotateX(180deg)`
          }
      const end: CSSProperties = { transform: `translate(0, 0) rotateX(0)` }
      if (widthFrom !== widthTo) {
        start.width = `${widthFrom}px`
        mid.width = `${(widthFrom + widthTo) / 2}px`
        end.width = `${widthTo}px`
      }
      if (heightFrom !== heightTo) {
        start.height = `${heightFrom}px`
        mid.height = `${(heightFrom + heightTo) / 2}px`
        end.height = `${heightTo}px`
      }
      keyframes = [start as Keyframe, mid as Keyframe, end as Keyframe]
      break
    default:
      const _invalidAction: never = action
      throw new Error(`Invalid action: ${_invalidAction}`)
  }
  return new KeyframeEffect(el, keyframes, { duration: 600, easing: "linear" })
}

const rotateYControls = (
  el: Element,
  action: "add" | "remove" | "remain",
  oldCoords?: Coordinates,
  newCoords?: Coordinates
) => {
  let keyframes: Keyframe[]
  switch (action) {
    case "add":
      keyframes = [
        { transform: "rotateY(90deg)", opacity: 0 },
        { transform: "rotateY(0deg)", opacity: 1 }
      ]
      break
    case "remove":
      keyframes = [
        { transform: "rotateY(0deg)", opacity: 1 },
        { transform: "rotateY(90deg)", opacity: 0 }
      ]
      break
    case "remain":
      const deltaX = oldCoords!.left - newCoords!.left
      const deltaY = oldCoords!.top - newCoords!.top
      const [widthFrom, widthTo, heightFrom, heightTo] = getTransitionSizes(
        el,
        oldCoords!,
        newCoords!
      )
      const start: CSSProperties = { transform: `translate(${deltaX}px, ${deltaY}px) rotateY(0)` }
      const mid: CSSProperties =
        deltaX === 0 && deltaY === 0
          ? { transform: `translate(0,0)` }
          : {
            transform: `translate(${deltaX * 0.5}px, ${deltaY * 0.5}px) rotateY(180deg)`
          }
      const end: CSSProperties = { transform: `translate(0, 0) rotateY(0)` }
      if (widthFrom !== widthTo) {
        start.width = `${widthFrom}px`
        mid.width = `${(widthFrom + widthTo) / 2}px`
        end.width = `${widthTo}px`
      }
      if (heightFrom !== heightTo) {
        start.height = `${heightFrom}px`
        mid.height = `${(heightFrom + heightTo) / 2}px`
        end.height = `${heightTo}px`
      }
      keyframes = [start as Keyframe, mid as Keyframe, end as Keyframe]
      break
    default:
      const _invalidAction: never = action
      throw new Error(`Invalid action: ${_invalidAction}`)
  }
  return new KeyframeEffect(el, keyframes, { duration: 600, easing: "linear" })
}

const flyControls = (
  el: Element,
  action: "add" | "remove" | "remain",
  oldCoords?: Coordinates,
  newCoords?: Coordinates
) => {
  let keyframes: Keyframe[]
  const getRandomBool = () => Math.random() > 0.5
  switch (action) {
    case "add":
      keyframes = [
        { transform: "translate(-100%,-100%)", opacity: 0 },
        { transform: "translate(0,0)", opacity: 1 }
      ]
      break
    case "remove":
      keyframes = [
        { transform: "translate(0,0)", opacity: 1 },
        { transform: "translate(100%,-100%)", opacity: 0 }
      ]
      break
    case "remain":
      const deltaX = oldCoords!.left - newCoords!.left
      const deltaY = oldCoords!.top - newCoords!.top
      const [widthFrom, widthTo, heightFrom, heightTo] = getTransitionSizes(
        el,
        oldCoords!,
        newCoords!
      )
      const start: CSSProperties = { transform: `translate(${deltaX}px, ${deltaY}px)`, opacity: 1 }
      const mid: CSSProperties =
        deltaX === 0 && deltaY === 0
          ? { transform: `translate(0,0)` }
          : {
            transform: `translate(${
              deltaX === 0 ? (getRandomBool() ? "100%" : "-100%") : deltaX * 0.5 + "px"
            }, ${deltaY === 0 ? (getRandomBool() ? "100%" : "-100%") : deltaY * 0.5 + "px"})`,
            opacity: 0
          }
      const end: CSSProperties = {
        transform: "translate(0,0)",
        opacity: 1
      }
      if (widthFrom !== widthTo) {
        start.width = `${widthFrom}px`
        mid.width = `${(widthFrom + widthTo) / 2}px`
        end.width = `${widthTo}px`
      }
      if (heightFrom !== heightTo) {
        start.height = `${heightFrom}px`
        mid.height = `${(heightFrom + heightTo) / 2}px`
        end.height = `${heightTo}px`
      }
      keyframes = [start as Keyframe, mid as Keyframe, end as Keyframe]
      break
    default:
      const _invalidAction: never = action
      throw new Error(`Invalid action: ${_invalidAction}`)
  }
  return new KeyframeEffect(el, keyframes, { duration: 600, easing: "linear" })
}
const vagueControls = (
  el: Element,
  action: "add" | "remove" | "remain",
  oldCoords?: Coordinates,
  newCoords?: Coordinates
) => {
  let keyframes: Keyframe[]
  switch (action) {
    case "add":
      keyframes = [
        { transform: "scaleY(0.1)", filter: "blur(4px)" },
        { transform: "unset", filter: "unset" }
      ]
      break
    case "remove":
      keyframes = [
        { transform: "unset", filter: "unset" },
        { transform: "scaleY(0.1)", filter: "blur(4px)" }
      ]
      break
    case "remain":
      const deltaX = oldCoords!.left - newCoords!.left
      const deltaY = oldCoords!.top - newCoords!.top
      const [widthFrom, widthTo, heightFrom, heightTo] = getTransitionSizes(
        el,
        oldCoords!,
        newCoords!
      )
      const start: CSSProperties = {
        transform: `translate(${deltaX}px, ${deltaY}px)`,
        filter: "unset"
      }
      const mid: CSSProperties =
        deltaX === 0 && deltaY === 0
          ? { transform: `translate(0,0)` }
          : {
            transform: `translate(${deltaX * 0.5}px, ${deltaY * 0.5}px)`,
            filter: "blur(4px)"
          }
      const end: CSSProperties = { transform: `translate(0, 0)`, filter: "unset" }
      if (widthFrom !== widthTo) {
        start.width = `${widthFrom}px`
        mid.width = `${(widthFrom + widthTo) / 2}px`
        end.width = `${widthTo}px`
      }
      if (heightFrom !== heightTo) {
        start.height = `${heightFrom}px`
        mid.height = `${(heightFrom + heightTo) / 2}px`
        end.height = `${heightTo}px`
      }
      keyframes = [start as Keyframe, mid as Keyframe, end as Keyframe]
      break
    default:
      const _invalidAction: never = action
      throw new Error(`Invalid action: ${_invalidAction}`)
  }
  return new KeyframeEffect(el, keyframes, { duration: 600, easing: "linear" })
}

export const autoAnimationPlugins: Record<string, AutoAnimationPlugin> = {
  bouncy: bouncyControls,
  rotateX: rotateXControls,
  rotateY: rotateYControls,
  fly: flyControls,
  vague: vagueControls
}
