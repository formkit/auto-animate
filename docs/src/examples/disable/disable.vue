<script setup>
import { ref, onBeforeUnmount } from "vue";
import { useAutoAnimate } from "../../../../src/vue"

const intervalID = ref();

const balls = ref(["red", "green", "blue"])
const [parent, enable] = useAutoAnimate({ duration: 500 })

let isEnabled = ref(true)
function toggle() {
  isEnabled.value ? enable(false) : enable(true)
  isEnabled.value = !isEnabled.value
}

intervalID.value = setInterval(() => {
  balls.value.push(balls.value.shift()!)
}, 600)

onBeforeUnmount(() => {
  clearInterval(intervalID.value);
});
</script>

<template>
  <ul class="balls" ref="parent">
    <li v-for="color in balls" :key="color" :class="color">
      {{ color }}
    </li>
  </ul>
  <button @click="toggle" class="button button--alt">
    {{ isEnabled ? "🚫 Disable" : "✅ Enable" }} animations
  </button>
</template>
