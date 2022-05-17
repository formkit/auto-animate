<script setup lang="ts">
import CodeExample from "../components/CodeExample.vue"
import examples from "../examples/basic"
</script>
<template>
  <section id="why-not">
    <h2>Why not...</h2>
    <p>
      There are loads of Animation libraries available for JavaScript and each
      has its place. AutoAnimate is not a tradition animation library — think of
      it more as "Prettier for motion" — it is an easy to implement standard you
      can quickly apply to your projects.
    </p>
    <p>
      AutoAnimate helps smooth out changes to the DOM that that are confusing
      for end users. For example, when a user sorts a list it can be very
      difficult to visualize how the items in the list move — but with a simple
      animation it makes intuitive sense. AutoAnimate was made to solve these
      kinds of problems via a drop-in solution with zero config.
    </p>
    <!-- <ul>
      <li>
        <a href="https://greensock.com/">Green Sock</a> is perhaps the most
        robust animation library available. You can create truly world class web
        compatible animations — it solves a class of problems entirely different
        than AutoAnimate.
      </li>
      <li>
        <a
          href="https://vuejs.org/guide/built-ins/transition.html#the-transition-component"
          >The Vue <code>Transition</code> component</a
        >
        is perhaps the most similar transition/animation tool set. Auto
        Animation solves a very similar problem, but with no css, no
        <code>TransitionGroup</code>, and no need to modify your existing
        templates (it is also Vue specific).
      </li>
      <li>
        <a href="https://www.react-reveal.com/">React Reveal</a> is also an easy
        to use transition library. It differs in that you select the transition
        components you want and configure each accordingly. If you’re a React
        developer and want to configure each animation, this might be a good
        option.
      </li>
    </ul> -->
  </section>
</template>
