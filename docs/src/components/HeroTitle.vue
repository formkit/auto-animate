<script setup>
import { onMounted, ref } from "vue"
import { vAutoAnimate } from "../../../src/index"
import TheLogo from "./TheLogo.vue"
import GitHubLogo from "./GitHubLogo.vue"
import IconArrow from "./IconArrow.vue"
import FormKitLogo from "./FormKitLogo.vue"
import CodeExample from "./CodeExample.vue"
import introExample from "../examples/intro"
</script>

<template>
  <section id="hero">
    <div class="intro" v-auto-animate="{ duration: 300 }">
      <h1 class="title">The easiest way to add motion to your apps.</h1>
      <p>
        AutoAnimate is a zero-config, drop-in, animation utility automatically
        adds smooth transitions to your web app. You can use it with Vue, React,
        or any other JavaScript app type.
      </p>
      <div>
        <a class="button" href="#installation">Get started<IconArrow /></a>
        <a
          class="button button--alt"
          href="https://github.com/formkit/auto-animation"
          >Github<GitHubLogo
        /></a>
      </div>
      <a class="byline" href="https://www.formkit.com">
        <FormKitLogo class="formkit" /> made with love by the FormKit team.
      </a>
    </div>
    <CodeExample title="App" :examples="introExample" class="example" />
  </section>
</template>

<style scoped>
section {
  display: block;
  margin-top: 1em;
  margin-bottom: 3em;
}

.intro {
  width: 100%;
}

@media (min-width: 28em) {
  section {
    margin-top: 4em;
    margin-bottom: 3em;
  }
  .intro {
    max-width: 34em;
  }
  .title {
    font-size: 2.5em;
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
  section {
    display: flex;
  }
  .example {
    margin-left: 2em;
    margin-top: 0;
    margin-bottom: 0;
    max-width: 26.7em;
  }
}

@media (min-width: 65em) {
  .example {
    max-width: none;
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

.byline {
  display: flex;
  vertical-align: center;
  font-size: 0.875em;
  color: var(--gray-m);
  font-weight: 300;
  margin-top: 1em;
}
.byline:hover {
  text-decoration: none;
  color: var(--primary);
}
.formkit {
  display: block;
  width: 1rem;
  fill: var(--gray-m);
  margin-right: 0.5em;
}

.byline:hover .formkit {
  fill: var(--orange);
}
</style>
