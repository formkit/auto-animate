<script setup lang="ts">
import { ref } from "vue"
import IconDown from "./IconDown.vue"
import { vAutoAnimate } from "../../../src/index"

const show = ref(false)
const activeTitle = ref("Installation")

function applySizing() {
  if (window.innerWidth >= 672) {
    show.value = true
  } else {
    show.value = false
  }
}

let resizeTimer
if (typeof window !== "undefined") {
  show.value = window.innerWidth >= 672
  clearTimeout(resizeTimer)
  window.addEventListener("resize", () => {
    resizeTimer = setTimeout(applySizing, 200)
  })
}
</script>

<template>
  <nav v-auto-animate>
    <div class="active" @click="show = !show">
      <span class="active-title">{{ activeTitle }}</span>
      <IconDown class="down" />
    </div>
    <ul v-if="show">
      <li><a href="#installation">Installation</a></li>
      <li><a href="#usage">Usage</a></li>
      <li><a href="#examples">Examples</a></li>
      <li><a href="#plugins">Plugins</a></li>
      <li><a href="#why-not">Why not...</a></li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  background-color: white;
  box-shadow: 0 0 1em rgba(0, 0, 0, 0.1);
  border-radius: 0.75em;
  padding: 0;
  position: sticky;
  top: 1em;
  left: 100%;
  box-sizing: border-box;
  opacity: 0.98;
  float: left;
  width: 100%;
  margin-left: -100%;
  z-index: 100;
}

@media (min-width: 42em) {
  nav {
    top: 2em;
    width: 10em;
    margin-left: -12em;
    margin-top: 0;
    left: 0;
  }
  .active {
    display: none;
  }
}

@media (min-width: 50em) {
  nav {
    width: 14em;
    margin-left: -18em;
  }
}

ul {
  list-style-type: none;
  padding: 0.5em 0 0 0;
  margin: 0;
  position: relative;
  z-index: 2;
  border-top: 1px solid var(--ui-light);
}

a,
.active-title {
  display: block;
  padding: 0.5em 1em;
  color: var(--primary);
}

li:last-child {
  padding-bottom: 0.5em;
}

.active-title {
  padding: 0 1em;
}
.active {
  padding-top: 0.75em;
  padding-bottom: 0.75em;
  cursor: pointer;
  position: relative;
  padding-right: 2em;
}

.down {
  fill: var(--primary);
  width: 1em;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 1em;
}
</style>
