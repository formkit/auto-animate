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
    <div class="intro">
      <h1 class="title">
        Add <span class="highlight">motion</span> to your apps with a single
        line of code.
      </h1>
      <p>
        AutoAnimate is a zero-config, drop-in animation utility that adds smooth
        transitions to your web app. You can use it with React, Vue, Svelte, or
        any other JavaScript application.
      </p>
      <div>
        <a class="button" href="#installation">Get started<IconArrow /></a>
        <a
          class="button button--alt"
          href="https://github.com/formkit/auto-animate"
          >GitHub<GitHubLogo
        /></a>
      </div>
      <a class="byline" href="https://www.formkit.com">
        <FormKitLogo class="formkit" width="16" height="16" /> made with ♥ by
        the FormKit team.
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

.title {
  font-size: 2em;
}

@media (min-width: 24em) {
  .title {
    font-size: 2.25em;
  }
}

.title .highlight {
  font-size: inherit;
  color: var(--primary);
  background-image: linear-gradient(-45deg, var(--primary), var(--purple-m));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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
    margin-left: 2.5em;
    margin-top: 0;
    margin-bottom: 0;
    max-width: 26.7em;
    flex-shrink: 0;
    width: 50%;
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
  vertical-align: flex-start;
  font-size: 0.875em;
  color: var(--gray-m);
  filter: grayscale(1);
  transition: filter 0.15s ease-out;
  font-weight: 300;
  margin-top: 1em;
}
[data-dark-mode="true"] .byline {
  color: var(--gray-l);
}
.byline span,
.byline svg {
  position: relative;
}
.byline span {
  font-size: 1em;
  max-height: 16px;
  margin-right: 0.4em;
  margin-left: 0.25em;
}

.byline svg {
  top: 0.15em;
}

.byline:hover {
  text-decoration: none;
  color: var(--primary);
  filter: grayscale(0);
}
[data-dark-mode="true"] .byline:hover {
  color: var(--text);
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
