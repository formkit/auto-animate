<script setup lang="ts">
import { ref } from "vue"
import { useAutoAnimate } from "../../../../src/vue"

const balls = ref(["red", "green", "blue"])
const [parent, enable] = useAutoAnimate({ duration: 500 })

let isEnabled = ref(true)
function toggle() {
  isEnabled.value ? enable(false) : enable(true)
  isEnabled.value = !isEnabled.value
}
setInterval(() => {
  balls.value.push(balls.value.shift()!)
}, 600)
</script>

<template>
  <ul class="balls" ref="parent">
    <li v-for="color in balls" :key="color" :class="color">
      {{ color }}
    </li>
  </ul>
  <button @click="toggle" class="button button--alt" id="disable">
    {{ isEnabled ? "🚫 Disable" : "✅ Enable" }} animations
  </button>
</template>

<style scoped>
.balls {
  aspect-ratio: 1;
  margin: 2em auto;
  width: 100%;
  max-width: 15em;
  position: relative;
  padding: 0;
  background-size: contain;
  background-repeat: none;
}

section > ul.balls > li {
  width: 4em;
  height: 4em;
  border-radius: 4em;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875em;
  font-weight: 500;
  color: white;
  margin-bottom: 0;
}

.balls li::before {
  display: none;
  margin-bottom: 0;
}

.balls li:first-child {
  position: absolute;
  top: 0;
  left: calc(50% - 2em);
}

.balls li:nth-child(2) {
  position: absolute;
  bottom: 0;
  right: 0;
}

.balls li:nth-child(3) {
  position: absolute;
  bottom: 0;
  left: 0;
}

.actions {
  margin-bottom: 1em;
}
.red {
  background-color: #eb2e1d;
}
.blue {
  background-color: #5411ef;
}
.green {
  background-color: #4fd726;
}

button {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
