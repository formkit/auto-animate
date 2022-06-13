<script setup>
import { vAutoAnimate } from "../../../../src/index"
import { ref } from "vue"
const items = ref(['🍎 Apple', '🍌 Banana', '🍓 Strawberry'])
</script>

<template>
  <div class="example angular-example">
    <ul v-auto-animate>
      <li v-for="item in items" :key="item">{{ item }}</li>
    </ul>
    <button @click="items.push('🍒 Cherry')" class="button button--alt">
      Add Cherry
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
