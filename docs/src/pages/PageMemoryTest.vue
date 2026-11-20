<script setup lang="ts">
import autoAnimate from "../../../src"

function initFormkitAnimationTargets() {
  const target = document.createElement("div")
  document.body.append(target)
  for (let i = 0; i < 20; ++i) {
    autoAnimate(target)
  }
}

function removeImmediatelyDestroyedElement() {
  const elm = document.createElement("div")
  document.body.append(elm)

  autoAnimate(elm).destroy()

  elm.remove()
}
</script>
<template>
  <div class="test-container">
    <p>
      This fixture reproduces repeated initialization of the same target by
      <code>createAutoAnimatePlugin()</code>.
    </p>
    <button @click="initFormkitAnimationTargets">Init like FormKit</button>
    <button @click="removeImmediatelyDestroyedElement">
      Remove immediately destroyed element
    </button>
  </div>
</template>
