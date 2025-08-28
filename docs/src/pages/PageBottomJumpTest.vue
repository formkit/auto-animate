<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { vAutoAnimate } from "../../../src/index"

const items = ref([1, 2, 3, 4, 5])
const remove = (n: number) => (items.value = items.value.filter((item) => item !== n))
const reset = () => items.value = [1, 2, 3, 4, 5]

const list = ref()
onMounted(() => {
  if (list.value) {
    // Import the default export function
    import('../../../src/index').then(({ default: autoAnimate }) => {
      autoAnimate(list.value, { duration: 1000 })
    })
  }
})
</script>

<template>
  <div class="test-container">
    <ul ref="list" class="bottom-aligned-list">
      <li v-for="item in items" :key="item" class="list-item">
        <span>Item {{ item }}</span>
        <button @click="remove(item)" class="remove-btn">
          click to remove
        </button>
      </li>
    </ul>
    <button @click="reset" class="reset-btn">Reset list</button>
  </div>
</template>

<style scoped>
.test-container {
  position: relative;
  height: 100vh;
  padding: 20px;
}

.bottom-aligned-list {
  border: 1px solid red;
  position: fixed;
  right: 0;
  bottom: 0;
  width: 120px;
  margin: 0;
  padding: 0;
  list-style: none;
  background: white;
}

.list-item {
  display: block;
  padding: 8px;
  border-bottom: 1px solid #eee;
}

.list-item:last-child {
  border-bottom: none;
}

.remove-btn {
  display: block;
  width: 100%;
  margin-top: 4px;
  padding: 2px;
  font-size: 10px;
  cursor: pointer;
}

.reset-btn {
  position: fixed;
  top: 20px;
  left: 20px;
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
}
</style>