const vueDirectiveMain = {
  js: {
    ext: "ts",
    language: "typescript",
    example: `import { createApp } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from 'App.vue'

createApp(App).use(autoAnimatePlugin).mount('#app')

// Optional: set app-wide defaults for every v-auto-animate
// (per-element options still win):
// createApp(App).use(autoAnimatePlugin, { duration: 500, easing: 'ease-out' })
`,
  },
  nuxt: {
    language: "typescript",
    ext: "ts",
    example: `// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@formkit/auto-animate/nuxt'],
})
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

const vueComposable = {
  vue: {
    ext: "vue",
    language: "html",
    example: `<script setup>
import { ref } from 'vue'
import { useAutoAnimate } from '@formkit/auto-animate/vue'

const items = ref(["React", "Vue", "Svelte", "Angular"])

function sortAsc() {
  items.value.sort()
}
function sortDesc() {
  items.value.sort().reverse()
}

const [parent] = useAutoAnimate()
</script>

<template>
  <div>
    <button @click="sortAsc">Sort A-Z ↑</button>
    <button @click="sortDesc">Sort Z-A ↓</button>
  </div>
  <ul ref="parent">
    <li
      v-for="item in items"
      :key="item"
    >
      {{ item }}
    </li>
  </ul>
</template>`,
  },
}

export { vueDirectiveMain, vueDirectiveApp, vueComposable }
