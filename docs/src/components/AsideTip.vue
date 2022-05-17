<script setup>
import IconLightbulb from "./IconLightbulb.vue"
</script>

<template>
  <aside class="tip">
    <IconLightbulb />
    <p><slot /></p>
  </aside>
</template>

<style scoped>
.tip {
  display: flex;
  align-items: flex-start;
}
.tip svg {
  margin-right: 1em;
  width: 2em;
  height: 2em;
}
</style>
