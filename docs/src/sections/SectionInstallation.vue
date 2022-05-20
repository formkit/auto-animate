<script setup>
import HomepageDemo from "../examples/first-demo/ActualDemo.vue"
import installation from "../examples/installation"
import CodeExample from "../components/CodeExample.vue"
import AsideTip from "../components/AsideTip.vue"
</script>

<template>
  <section id="demo">
    <h2>A quick demo</h2>
    <p>
      AutoAnimate adds automatic animations to your JavaScript applications with a single line of code.
      Here's the same list component with and without AutoAnimate applied to the wrapping element:
    </p>
    <HomepageDemo />
    <p>That's a notable improvement in UX with no additional developer effort! 🎉</p>
    <AsideTip>
      Importantly, our list component did not need to be written with AutoAnimate in mind. AutoAnimate
      can be applied retroactively to any markup in your codebase, including 3rd-party code — just supply
      the parent DOM node and let AutoAnimate do the rest! 🤯
    </AsideTip>
  </section>

  <section id="installation">
    <h2>Installation</h2>
    <p>
      Install using your package manager of choice to add
      <code>@formkit/auto-animate</code> to your project:
    </p>
    <CodeExample title="~/my-app" :examples="installation"></CodeExample>
    <p>Aaaaand, you’re done! That was fast. 🐇</p>
    <AsideTip>
      If you are using React, you can use the <code><a href="#usage-react">useAutoAnimate</a></code> hook.
      If you are using Vue, you can use the <code><a href="#usage-vue">v-auto-animate</a></code> directive.
    </AsideTip>
  </section>
</template>

<style scoped>
section:nth-child(2) h2 {
  padding-top: 4em;
}

code {
  display: inline-block;
}

@media (min-width: 42em) {
  section:nth-child(2) h2 {
    padding-top: 0em;
  }
}
</style>
