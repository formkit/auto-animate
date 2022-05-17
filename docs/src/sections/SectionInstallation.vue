<script setup>
import installation from "../examples/installation"
import CodeExample from "../components/CodeExample.vue"
import AsideTip from "../components/AsideTip.vue"
import GithubButton from "vue-github-button"
</script>

<template>
  <section id="installation">
    <h2>Installation</h2>
    <p>
      Install using your package manager of choice to add
      <code>@formkit/auto-animate</code> to your project.
    </p>
    <CodeExample title="~/my-app" :examples="installation"></CodeExample>
    <p>Aaaaand, you’re done! That was fast. 🐇</p>
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
    <AsideTip>
      If you are using React you can use the <code><a href="#react-hook">useAutoAnimate</a></code> hook.
      If you are using Vue you can use the <code><a href="#usage-vue">v-auto-animate</a></code> directive.
    </AsideTip>
  </section>
</template>

<style scoped>
section {
  padding-top: 5.5em;
}

code {
  display: inline-block;
}

@media (min-width: 42em) {
  section {
    padding-top: 0em;
  }
}
</style>
