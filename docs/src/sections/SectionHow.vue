<script setup lang="ts">
import CodeExample from "../components/CodeExample.vue"
import examples from "../examples/basic"
</script>
<template>
  <section id="how-it-works">
    <h2>Why auto animation?</h2>
    <p>
      Auto Animation helps smooth out changes to the DOM that that are confusing
      for end users. For example, when a user sorts a list it can be very
      difficult to visualize how the items in the list move — but with a simple
      animation it makes intuitive sense. Auto Animation was made to solve these
      kinds of problems while providing developers the smallest API possible.
    </p>
    <p>
      Auto Animation achieves this by observing the DOM retroactively. This
      means you don’t need to modify your DOM structure, write css keyframes,
      add animation classes or use special components. Even better, the API is a
      single function:
    </p>
    <CodeExample title="~/basic" :examples="examples"></CodeExample>
    <p>
      Auto Animation is intended to be a drop-in solution to improve user
      experience with zero to low configuration. It is not an animation library
      that allows you to fine tune your keyframes. This of it like "prettier for
      animations". Its opinionated but easy to use and reliable.
    </p>
  </section>
</template>
