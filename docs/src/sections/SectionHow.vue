<script setup lang="ts">
import CodeExample from "../components/CodeExample.vue"
import examples from "../examples/basic"
</script>
<template>
  <section id="how-it-works">
    <h2>How it works</h2>
    <p>
      Auto Animation is intended to help smooth out changes to the DOM that that
      are confusing for end users. For example, when a user sorts a list it can
      be very difficult to visualize how the items in the list move — but with a
      simple animation it makes intuitive sense. Auto Animation was made to
      solve these kinds of problems while providing developers the smallest API
      possible.
    </p>
    <p>
      Auto Animation works by adding observers to a parent node and its
      immediate children. These children’s coordinates are then actively
      tracked, and upon a change in dom structure, will animate their state
      change automatically.
    </p>
    <p>
      Because Auto Animation observes DOM retroactively, it means you don’t need
      to modify your DOM structure, write css keyframes, add animation classes
      or use special components. Even better, the API is a single function:
    </p>
    <CodeExample title="~/basic" :examples="examples"></CodeExample>
    <h3>What it’s not</h3>
    <p>
      Auto Animation is intended to be a drop-in solution to improve user
      experience with zero to low configuration. It is not an animation library
      that allows you to fine tune your keyframes.
    </p>
  </section>
</template>
