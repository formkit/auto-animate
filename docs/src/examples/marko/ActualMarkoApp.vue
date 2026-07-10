<script setup>
// Like the other framework demos on this page (e.g. ActualReactApp.vue), the *live*
// preview is implemented with the Vue adapter so nothing Marko has to enter the docs'
// vite-ssg build. The Marko-specific code is shown in the adjacent code sample; the
// animation behavior is identical because it all runs on the same auto-animate core.
import { useAutoAnimate } from "../../../../src/vue/index.ts"
import { ref } from "vue"
const [parent] = useAutoAnimate()
const lineup = ref(["🎸 Nova", "🎤 Rex", "🥁 Juno", "🎹 Iris"])
function bump(artist) {
  lineup.value = [artist, ...lineup.value.filter((a) => a !== artist)]
}
</script>

<template>
  <div class="example marko-example">
    <p class="hint">Click an artist to bump them to the top of the bill:</p>
    <ul ref="parent">
      <li v-for="artist in lineup" :key="artist" @click="bump(artist)">
        {{ artist }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.hint {
  margin-bottom: 0.5em;
  font-size: 0.875em;
  opacity: 0.7;
}
li {
  cursor: pointer;
  user-select: none;
}
li::before {
  display: none;
}
</style>
