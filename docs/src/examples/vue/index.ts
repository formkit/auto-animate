const vueDirectiveMain = {
  js: {
    ext: "ts",
    language: "typescript",
    example: `import { createApp } from 'vue'
import autoAnimatePlugin from '@formkit/auto-animate/vue'
import App from 'App.vue'

createApp(App).use(autoAnimatePlugin).mount('#app')
`,
  },
}

const vueDirectiveApp = {
  vue: {
    ext: "vue",
    language: "html",
    example: `<script setup>
import { ref } from 'vue'
const items = ref([1, 2, 3])
</script>

<template>
  <ul v-auto-animate>
    <li
      v-for="item in items"
      :key="item"
    >
      {{ item }}
    </li>
  </ul>
  <button @click="items.push(items.length)">
    Add number
  </button>
</template>`,
  },
}
export { vueDirectiveMain, vueDirectiveApp }
