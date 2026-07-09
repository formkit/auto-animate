<script setup>
// Like the other framework demos on this page (e.g. ActualReactApp.vue), the *live*
// preview is implemented with the Vue adapter so nothing Marko has to enter the docs'
// vite-ssg build. The Marko-specific code is shown in the adjacent code sample; the
// animation behavior is identical because it all runs on the same auto-animate core.
import { useAutoAnimate } from "../../../../src/vue/index.ts"
import { ref } from "vue"
const [parent, setEnabled] = useAutoAnimate()
const items = ref([0, 1, 2])
</script>

<template>
  <div class="example marko-example">
    <ul ref="parent">
      <li v-for="item in items" :key="item">{{ item }}</li>
    </ul>
    <button @click="items.push(items.length)" class="button button--alt add">
      Add number
    </button>
    <button @click="setEnabled(false)" class="button button--alt">
      Disable
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