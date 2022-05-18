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
const items = ref(["😏","😐","😑","😒","😕", ... ])
function removeItem(toRemove) {
  items.value = items.value.filter((item) => item !== toRemove)
}
</script>

<template>
  <h5>Click emojis to remove them.</h5>
  <ul v-auto-animate>
    <li
      v-for="item in items"
      :key="item"
      @click="removeItem(item)"
    >
      {{ item }}
    </li>
  </ul>
</template>`,
  },
}
export { vueDirectiveMain, vueDirectiveApp }
