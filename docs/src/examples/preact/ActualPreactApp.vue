<script setup>
import { useAutoAnimate } from "../../../../src/vue/index.ts"
import { ref } from "vue"
const [parent] = useAutoAnimate()
const items = ref(["🎁", "📦", "🚚", "💪", "🐽", "🐸", "🐻", "🪱", "🪳"])
setInterval(() => {
  items.value.unshift(items.value.pop())
}, 500)
</script>

<template>
  <div class="example preact-example">
    <ul ref="parent">
      <li v-for="item in items" :key="item">{{ item }}</li>
    </ul>
  </div>
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
