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
  margin-top: 0.25em;
  width: 1.5em;
  height: 1.5em;
  flex-shrink: 0;
}
</style>
