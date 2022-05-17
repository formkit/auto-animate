<script setup>
import { vAutoAnimate } from "../../../../src/index"
import { ref } from "vue"
const items = ref([0, 1, 2])
</script>

<template>
  <ul v-auto-animate>
    <li v-for="item in items" :key="item">{{ item }}</li>
  </ul>
  <button @click="items.push(items.length)">Add number</button>
</template>

<style scoped>
ul {
  list-style-type: disc;
}
li::before {
  display: none;
}
</style>
