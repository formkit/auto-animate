<script setup>
import { onMounted, ref } from "vue"
import { vAutoAnimate } from "../../../src/index"
import TheLogo from "./TheLogo.vue"
import GitHubLogo from "./GitHubLogo.vue"
import IconArrow from "./IconArrow.vue"
import CodeExample from "./CodeExample.vue"
import introExample from "../examples/intro"
</script>

<template>
  <header>
    <div class="intro" v-auto-animate="{ duration: 300 }">
      <div class="title">
        <TheLogo />
      </div>
      <p>
        Auto Animate is a zero-config animation utility that makes adding smooth
        transitions to your web apps incredibly simple. Because it operates on
        native DOM elements — it works with Vue, React, Svelte, Lit-HTML, and
        plain HTML.
      </p>
      <div>
        <a class="button">Get started<IconArrow /></a>
        <a class="button button--alt">Github<GitHubLogo /></a>
      </div>
    </div>
    <CodeExample title="App" :examples="introExample" />
  </header>
</template>

<style scoped>
header {
  display: block;
  margin-top: 1em;
}

.title {
  display: block;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 15vw;
  margin-bottom: 1.5em;
}

@media (min-width: 24em) {
  .title {
    width: 70vw;
    height: 9vw;
  }
}
.intro {
  width: 100%;
}

@media (min-width: 28em) {
  header {
    margin-top: 4em;
  }
  .title {
    width: 60vw;
    height: 10vw;
    max-width: 27em;
    max-height: 4.5em;
  }

  .intro {
    max-width: 34em;
  }
}

.intro p {
  display: block;
  padding-bottom: 2em;
  line-height: 1.4;
  font-weight: 300;
  margin: 0;
  max-width: 32em;
}

@media (min-width: 60em) {
  header {
    display: flex;
  }
}

.subtitle span {
  display: inline-block;
}
.title span {
  font-size: 1.3em;
  display: inline-block;
}

@media (min-width: 22em) {
  .title span {
    font-size: 1.4em;
  }
}
.logo {
  display: inline-block;
  width: 15vw;
  margin-top: 1em;
}
</style>
