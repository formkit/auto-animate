<script setup>
import { ref, onMounted, watch } from 'vue'
import IconMoon from './IconMoon.vue'
import IconSun from './IconSun.vue'

const isDark = ref(false)
const toggleDarkMode = () =>{
  isDark.value = !isDark.value
  localStorage.setItem('darkMode', isDark.value);
}
const setColorAttribute = () => {
  if (typeof document !== undefined) {
    document.documentElement.setAttribute('data-dark-mode', isDark.value)
  }
}

onMounted(() => {
  if (localStorage.getItem('darkMode')) {
    isDark.value = localStorage.getItem('darkMode') === 'true'
  } else {
    isDark.value = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  setColorAttribute()
})

watch(isDark, setColorAttribute)
</script>

<template>
  <span @click="toggleDarkMode">
    <IconSun v-show="!isDark" />
    <IconMoon v-show="isDark" />
  </span>
</template>

<style scoped>
span {
  cursor: pointer;
}
span svg {
  width: 1.5em;
  height: 1.5em;
}
[data-dark-mode="true"] span svg {
  height: 1.25em;
}
</style>
