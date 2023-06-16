<script setup>
import { useAutoAnimate } from "../../../../src/vue/index.ts"
import { ref } from "vue"
const [parent] = useAutoAnimate()
const items = ref(["🎁", "📦", "🚚", "💪", "🐽", "🐸", "🐻", "🪱", "🪳"])
function cycle() {
  items.value.unshift(items.value.pop())
}
</script>

<template>
  <div class="example preact-example">
    <ul ref="parent">
      <li v-for="item in items" :key="item">{{ item }}</li>
    </ul>
  </div>
  <button @click="cycle" class="button button--alt">Cycle Emoji</button>
</template>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0.5em;
}
li::before {
  display: none;
}
</style>
