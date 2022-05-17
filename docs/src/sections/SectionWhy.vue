<script setup lang="ts">
import CodeExample from "../components/CodeExample.vue"
import examples from "../examples/basic"
import GithubButton from "vue-github-button"
</script>
<template>
  <section id="why-not">
    <h2>Why not...?</h2>
    <p>
      There are loads of Animation libraries available for JavaScript and each
      has its place. AutoAnimate is not a traditional animation library — think
      of it more as "Prettier for motion" — it is an easy-to-implement standard
      you can quickly apply to any project.
    </p>
    <p>
      AutoAnimate’s goal is to smooth out changes to the DOM that are otherwise
      confusing to end-users. For example, when a user sorts a list with no
      animations it is difficult to visualize how the items in the list have
      actually changed — but with AutoAnimate the changes suddenly make
      intuitive sense. AutoAnimate was made to solve this category of problem
      via a drop-in solution with zero-config.
    </p>
  </section>
  <section id="support">
    <h2>Support Us</h2>
    <p>
      Is AutoAnimate saving you time? Please consider supporting us with a recurring or one-time donation! 🙏
    </p>
    <GithubButton
      href="https://github.com/sponsors/formkit"
      data-size="large"
      data-icon="heart"
      aria-label="Sponsor FormKit on GitHub"
    >
      Sponsor
    </GithubButton>
  </section>
</template>
