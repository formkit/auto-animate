<script setup lang="ts">
import { onMounted, ref } from "vue"
import autoAnimate from "../../../src"

const items = ref([
  "🍎 Apple",
  "🍌 Banana",
  "🍒 Cherry",
  "🫐 Blueberry",
  "🍊 Orange",
  "🥭 Mango",
])

const list = ref<HTMLElement>()

const fruitBasket = [
  "🍓 Strawberry",
  "🥥 Coconut",
  "🥝Kiwi",
  "🍇 Grape",
  "🍉 Watermelon",
  "🍍 Pineapple",
  "🍐 Pear",
  "🍑 Peach",
]

const sortItems = () => {
  items.value.sort(() => (Math.random() > 0.5 ? 1 : -1))
}

const remove = (item) => {
  items.value = items.value.filter((fruit) => {
    if (fruit === item) {
      fruitBasket.push(fruit)
      return false
    }
    return true
  })
}

const add = () => {
  if (fruitBasket.length) {
    items.value.splice(
      Math.round(Math.random() * items.value.length - 1),
      0,
      fruitBasket.shift()
    )
  } else {
    alert("Out of fruit!")
  }
}

const replace = () => {
  if (fruitBasket.length) {
    const fruitsRemoved = items.value.splice(
      Math.round(Math.random() * items.value.length - 1),
      1,
      fruitBasket.shift()
    )
    fruitsRemoved.forEach((fruit) => fruitBasket.push(fruit))
  } else {
    alert("Out of fruit!")
  }
}

onMounted(() => autoAnimate(list.value, { duration: 250 }))
</script>

<template>
  <ul ref="list">
    <li v-for="item in items" :key="item">
      <span>{{ item }}</span>
      <button @click.prevent="remove(item)">Remove</button>
    </li>
  </ul>

  <button @click="sortItems">Random Sort</button>
  <button @click="add">Add Fruit</button>
  <button @click="replace">Replace Fruit</button>
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
