<script setup lang="ts">
import { ref } from "vue"
import { vAutoAnimate } from "../../../../src"

const numbers = ref<number[]>(new Array(50).fill("").map((_, i) => i))
const randomize = () => {
  numbers.value.sort(() => (Math.random() > 0.5 ? 1 : -1))
}
</script>

<template>
  <div class="example">
    <div class="boxes" v-auto-animate="{ duration: 500 }">
      <div
        class="box"
        v-for="number in numbers"
        :key="number"
        v-text="number"
      />
    </div>
    <button class="button button--alt" @click="randomize">Randomize</button>
  </div>
</template>

<style scoped>
.boxes {
  display: flex;
  flex-wrap: wrap;
  margin: 2em -0.25em 2em -0.25em;
}

.box {
  box-sizing: border-box;
  width: calc(10% - 0.5em);
  margin: 0.25em;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875em;
  font-weight: 300;
  aspect-ratio: 1;
  border: 1px solid var(--gray-l);
}
</style>
