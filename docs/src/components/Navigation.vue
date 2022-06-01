<script setup lang="ts">
import { ref } from "vue"
import IconDown from "./IconDown.vue"
import { vAutoAnimate } from "../../../src/index"

const show = ref(false)
const activeTitle = ref("Docs Navigation")

function applySizing() {
  if (window.innerWidth >= 672) {
    show.value = true
  } else {
    show.value = false
  }
}

const handleClick = () => {
  show.value = window.innerWidth >= 672
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
    <ul
      v-if="show"
      @click="handleClick"
    >
      <li><a href="#installation">Installation</a></li>
      <li><a href="#usage">Usage</a></li>
      <li><a href="#usage-react">React hook</a></li>
      <li><a href="#usage-vue">Vue directive</a></li>
      <li><a href="#usage-svelte">Svelte Action</a></li>
      <li><a href="#examples">Examples</a></li>
      <li><a href="#plugins">Plugins</a></li>
      <li><a href="#why-not">Why not...?</a></li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  background-color: white;
  box-shadow: 0 1px 2px rgba(0,0,0,0.025),
              0 2px 4px rgba(0,0,0,0.025),
              0 4px 8px rgba(0,0,0,0.025),
              0 8px 16px rgba(0,0,0,0.025),
              0 16px 32px rgba(0,0,0,0.025),
              0 32px 64px rgba(0,0,0,0.025);
  border-radius: 0 0 0.25em 0.25em;
  padding: 0 2em;
  position: sticky;
  top: 0;
  left: 100%;
  opacity: 0.98;
  float: left;
  width: calc(100% + 2em);
  margin-left: calc(-200vw);
  margin-right: -3em;
  z-index: 100;
  user-select: none;
}
[data-dark-mode="true"] nav {
  background-color: var(--purple-d);
}

@media (min-width: 42em) {
  nav {
    top: 2em;
    width: 10em;
    margin-left: -12em;
    margin-right: 0;
    box-sizing: border-box;
    margin-top: 0;
    left: 0;
    padding: 0 1em;
    border-radius: 0.75em;
  }
  .active {
    display: none;
  }
  nav ul {
    border-top: none;
  }
  nav a {
    padding-left: 0;
    padding-right: 0;
  }
}

@media (min-width: 50em) {
  nav {
    width: 14em;
    margin-left: -18em;
    padding: 0.5em 2em;
  }
}

ul {
  list-style-type: none;
  padding: 0.5em 0;
  margin: 0;
  position: relative;
  z-index: 2;
  border-top: 1px solid var(--ui-light);
}
[data-dark-mode="true"] ul {
  border-top: none
}

a,
.active-title {
  display: block;
  padding: 0.5em 1em;
  color: var(--primary);
}
[data-dark-mode="true"] li a,
[data-dark-mode="true"] .active-title  {
  color: var(--text);
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
[data-dark-mode="true"] .down {
  fill: var(--text);
}
</style>
