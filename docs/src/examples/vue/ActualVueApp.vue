<script setup>
import { vAutoAnimate } from "../../../../src/index"
import { ref } from "vue"
const items = ref([
  "😏",
  "😐",
  "😑",
  "😒",
  "😕",
  "😖",
  "😗",
  "😘",
  "😙",
  "😚",
  "😛",
  "😜",
  "😟",
  "😠",
  "😦",
  "😨",
  "😬",
  "😭",
  "😮",
  "😰",
  "😴",
  "😵",
  "😶",
])

function removeItem(toRemove) {
  items.value = items.value.filter((item) => item !== toRemove)
}
</script>

<template>
  <div class="example">
    <h5>Click emojis to remove them.</h5>
    <ul v-auto-animate>
      <li v-for="item in items" :key="item" @click="removeItem(item)">
        <span>{{ item }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
ul {
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  user-select: none;
  position: relative;
}
li {
  border: 1px solid var(--gray-m);
  border-radius: 5px;
  width: 2em;
  height: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5em;
  cursor: pointer;
}
li span {
  margin-top: -0.1em;
}
li:hover {
  background: var(--purple-l);
  border-color: var(--purple-m);
}
li::before {
  display: none;
}
</style>
