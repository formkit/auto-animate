<script setup>
import installation from "../examples/installation"
import CodeExample from "../components/CodeExample.vue"
import AsideTip from "../components/AsideTip.vue"
</script>

<template>
  <section id="installation">
    <h2>Installation</h2>
    <p>
      To install first use your package manager of choice to add
      <code>@formkit/auto-animate</code> to your project.
    </p>
    <CodeExample title="~/my-app" :examples="installation"></CodeExample>
    <p>Aaaaand, you’re done! That was fast.</p>
    <AsideTip>
      If you are using Vue you may also install the a plugin that adds the
      <code>v-auto-animate</code> directive, this is
      <a href="#usage-vue">covered a bit later</a>.
    </AsideTip>
  </section>
</template>

<style scoped>
section {
  padding-top: 5.5em;
}

@media (min-width: 42em) {
  section {
    padding-top: 0em;
  }
}
</style>
