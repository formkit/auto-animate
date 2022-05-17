<script setup>
import installation from "../examples/installation"
import CodeExample from "../components/CodeExample.vue"
import AsideTip from "../components/AsideTip.vue"
</script>

<template>
  <section id="installation">
    <h2  class="no-margin">Installation</h2>
    <p>
      Install using your package manager of choice to add
      <code>@formkit/auto-animate</code> to your project.
    </p>
    <CodeExample title="~/my-app" :examples="installation"></CodeExample>
    <p>Aaaaand, you’re done! That was fast. 🐇</p>
    <AsideTip>
      If you are using React you can use the <code><a href="#usage-react">useAutoAnimate</a></code> hook.
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
