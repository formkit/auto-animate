<script setup lang="ts">
import { onMounted, ref } from "vue"
import autoAnimate from "../../../../src"
import IconRemove from "../../components/IconRemove.vue"

const items = ref(["🍎 Apple", "🍌 Banana", "🍒 Cherry"])

const list = ref<HTMLElement>()

const fruitBasket = [
  "🍓 Strawberry",
  "🥥 Coconut",
  "🥝 Kiwi",
  "🍇 Grape",
  "🍉 Watermelon",
  "🍍 Pineapple",
  "🍐 Pear",
  "🍑 Peach",
  "🫐 Blueberry",
  "🍊 Orange",
  "🥭 Mango",
]

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

const randomize = () => items.value.sort(() => (Math.random() > 0.5 ? 1 : -1))

onMounted(() => autoAnimate(list.value))
</script>

<template>
  <div class="example list-example">
    <ul ref="list">
      <li v-for="item in items" :key="item">
        <span>{{ item }}</span>
        <button @click.prevent="remove(item)" aria-label="Remove Fruit">
          <IconRemove />
        </button>
      </li>
    </ul>

    <button class="button button--add button--alt" @click="add">+ Add Fruit</button>
    <button class="button button--random button--alt" @click="randomize">Randomize</button>
  </div>
</template>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
  max-width: 300px;
}

li {
  display: flex;
  justify-content: space-between;
  padding: 0.75em;
  background-color: white;
  margin-bottom: 0.5em;
  border-radius: 0.5em;
  box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.1);
  font-size: 0.875em;
}
[data-dark-mode="true"] li {
  background-color: var(--purple-md);
}

li::before {
  display: none;
}

li button {
  appearance: none;
  border: none;
  padding: none;
  margin: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  cursor: pointer;
}

li button svg {
  width: 1.2em;
  fill: red;
}
[data-dark-mode="true"] li button svg {
  fill: rgb(244, 67, 67);
}
</style>
