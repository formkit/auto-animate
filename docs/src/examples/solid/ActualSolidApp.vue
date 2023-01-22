<script setup>
import { createAutoAnimate } from "../../../../src/solid/index.ts"
import { ref } from "vue"
let parent;
createAutoAnimate(() => parent, /* optional config */)
const items = ref([0, 1, 2])
</script>

<template>
  <div class="example react-example">
    <ul ref="parent">
      <li v-for="item in items" :key="item">{{ item }}</li>
    </ul>
    <button @click="items.push(items.length)" class="button button--alt">
      Add number
    </button>
  </div>
</template>

<style scoped>
ul {
  list-style-type: disc;
}
li::before {
  display: none;
}
</style>
