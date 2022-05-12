<script setup lang="ts">
import { onMounted, ref } from "vue"
import autoAnimate from "../../src"
const items = ref([
  "🍎 Apple",
  "🍌 Banana",
  "🍒 Cherry",
  "🫐 Blueberry",
  "🍊 Orange",
  "🥭 Mango",
])
const list = ref<HTMLElement>()
onMounted(() => autoAnimate(list.value))
const sortItems = () => {
  items.value.sort(() => (Math.random() > 0.5 ? 1 : -1))
}
const remove = (item) => {
  items.value = items.value.filter((i) => i !== item)
}
</script>

<template>
  <ul ref="list">
    <li v-for="item in items" :key="item">
      <span>{{ item }}</span>
      <button @click.prevent="remove(item)">Remove</button>
    </li>
  </ul>

  <button @click="sortItems">Random Sort</button>
</template>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  padding: 0.75em;
  background-color: lavender;
  margin-bottom: 0.5em;
  border-radius: 0.5em;
  box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.1);
}
</style>
