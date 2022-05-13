<script setup>
import installation from "../examples/installation"
import CodeExample from "../components/CodeExample.vue"
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
    <h3>Vue directive</h3>
    <p>
      If you are using Vue — you can also install a the Vue directive on your
      app that makes adding animations even easier.
    </p>
  </section>
</template>
