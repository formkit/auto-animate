<script setup lang="ts">
import TheLogo from "./TheLogo.vue"
</script>

<template>
  <header>
    <TheLogo class="logo" />
  </header>
</template>

<style scoped>
header {
  height: 4em;
  display: flex;
  align-items: center;
}
.logo {
  width: 13em;
}
</style>
