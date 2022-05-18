<script setup lang="ts">
import { onMounted, ref } from "vue"
import autoAnimate, { getTransitionSizes } from "../../../../src"
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

onMounted(() => autoAnimate(list.value, (el, action, oldCoords, newCoords) => {
  let keyframes
  if (action === 'add') {
    keyframes = [
      { transform: 'scale(0)', opacity: 0 },
      { transform: 'scale(1.15)', opacity: 1, offset: 0.75 },
      { transform: 'scale(1)', opacity: 1 }
    ]
  }
  if (action === 'remove') {
    keyframes = [
      { transform: 'scale(1)', opacity: 1 },
      { transform: 'scale(1.15)', opacity: 1, offset: 0.33 },
      { transform: 'scale(0.75)', opacity: 0.1, offset: 0.5 },
      { transform: 'scale(0.5)', opacity: 0 }
    ]
  }
  if (action === 'remain') {
    const deltaX = oldCoords.left - newCoords.left
    const deltaY = oldCoords.top - newCoords.top
    const [widthFrom, widthTo, heightFrom, heightTo] = getTransitionSizes(el, oldCoords, newCoords)
    const start = { transform: `translate(${deltaX}px, ${deltaY}px)` }
    const mid = { transform: `translate(${deltaX * -0.15}px, ${deltaY * -0.15}px)`, offset: 0.75 }
    const end = { transform: `translate(0, 0)` }
    if (widthFrom !== widthTo) {
      start.width = `${widthFrom}px`
      mid.width = `${widthFrom >= widthTo ? widthTo / 1.05 : widthTo * 1.05}px`
      end.width = `${widthTo}px`
    }
    if (heightFrom !== heightTo) {
      start.height = `${heightFrom}px`
      mid.height = `${heightFrom >= heightTo ? heightTo / 1.05 : heightTo * 1.05}px`
      end.height = `${heightTo}px`
    }
    keyframes = [start, mid, end]
  }
  return new KeyframeEffect(el, keyframes, { duration: 600, easing: 'ease-out' })
}))
</script>

<template>
  <div class="example">
    <h3>List example with "bouncy" keyframes</h3>
    <ul ref="list">
      <li v-for="item in items" :key="item">
        <span>{{ item }}</span>
        <button @click.prevent="remove(item)" aria-label="Remove Fruit"><IconRemove /></button>
      </li>
    </ul>

    <button class="button button--alt" @click="add">+ Add Fruit</button>
    <button class="button button--alt" @click="randomize">Randomize</button>
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
