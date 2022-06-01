<script setup>
import { vAutoAnimate } from "../../../../src/index"
import { ref } from "vue"
const items = ref([0, 1, 2])
</script>

<template>
  <div class="example react-example">
    <ul v-auto-animate>
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
