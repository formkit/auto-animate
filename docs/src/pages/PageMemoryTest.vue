<script setup lang="ts">
import { ref } from "vue"
import autoAnimate, { type AnimationController } from "../../../src"

const state = ref<"na" | "retained" | "collected">("na")
let targetRef: WeakRef<HTMLElement> | undefined

function initFormkitAnimationTargets() {
  const animationControllers: AnimationController[] = []

  for (let i = 0; i < 20; ++i) {
    const elm = document.createElement("div")
    elm.dataset.autoAnimate = ""
    elm.append(document.createElement("div"))
    document.body.append(elm)

    document
      .querySelectorAll<HTMLElement>("[data-auto-animate]")
      .forEach((animationTarget) => {
        animationControllers.push(autoAnimate(animationTarget))
      })
  }

  const targetCollection = document.querySelectorAll<HTMLElement>(
    "[data-auto-animate]",
  )
  const firstTarget = targetCollection.item(0)
  targetRef = new WeakRef(firstTarget)

  animationControllers.forEach((controller) => controller?.destroy?.())
  targetCollection.forEach((target) => target.remove())
  state.value = "retained"
}

function removeImmediatelyDestroyedElement() {
  const elm = document.createElement("div")
  elm.append(document.createElement("div"))
  document.body.append(elm)

  autoAnimate(elm)?.destroy?.()

  elm.remove()
  targetRef = new WeakRef(elm)
  state.value = "retained"
}

function checkTarget() {
  state.value = targetRef?.deref() ? "retained" : "collected"
}
</script>
<template>
  <div class="test-container">
    <p>
      This fixture emulates the behaviour of @formkit/addon (specifically
      <code>createAutoAnimatePlugin()</code>), where
      <code>data-auto-animate</code> is selected for repeated initializations.
    </p>
    <button @click="initFormkitAnimationTargets">Init like FormKit</button>
    <button @click="removeImmediatelyDestroyedElement">
      Remove immediately destroyed element
    </button>
    <button @click="checkTarget">Check target</button>
    <output aria-live="polite">{{ state }}</output>
  </div>
</template>
