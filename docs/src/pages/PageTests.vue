<script setup>
import { ref } from "vue"
import { vAutoAnimate } from "../../../src/index"
const show = ref(false)
</script>

<template>
  <textarea class=""></textarea>
  <div style="display: flex">
    <textarea />
    <div class="dropdown" @click="show = !show" v-auto-animate>
      <strong>This is a dropdown.</strong>
      <div class="dropdown-content" v-if="show">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </div>
    </div>
  </div>
</template>
<style>
body {
  /* overflow: hidden; */
}
</style>
<style scoped>
.dropdown {
  width: 500px;
  background-color: white;
  border: 2px solid var(--gray-m);
  border-radius: 0.75em;
  padding: 1em;
}
.dropdown-content {
  margin-top: 1em;
}
</style>
