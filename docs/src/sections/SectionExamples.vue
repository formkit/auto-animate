<script setup>
import ActualCards from "../examples/cards/ActualCards.vue"
import ActualList from "../examples/list/ActualList.vue"
import ActualBoxes from "../examples/boxes/ActualBoxes.vue"
import IconOutbound from "../components/IconOutbound.vue"
</script>

<template>
  <section id="examples">
    <h2>Examples</h2>
    <h3 id="example-cards">
      <a
        href="https://github.com/formkit/auto-animate/blob/master/docs/src/examples/cards/ActualCards.vue"
        >Cards example<IconOutbound
      /></a>
    </h3>
    <p>
      Simulates showing a form to add an event to a list of event cards. Notice
      that it pushes it to the front of the list and all the cards animate to
      their destination, and the parent element (invisible) resizes smoothly to
      accommodate.
    </p>
    <ActualCards />

    <h3 id="example-list">
      <a
        href="https://github.com/formkit/auto-animate/blob/master/docs/src/examples/list/ActualList.vue"
      >
        List example<IconOutbound
      /></a>
    </h3>
    <p>
      Add and remove fruits from a list. Note that fruits are placed at random
      locations in the list to simulate injecting items rather than just pushing
      and unshifting.
    </p>
    <ActualList />

    <h3 id="example-list">
      <a
        href="https://github.com/formkit/auto-animate/blob/master/docs/src/examples/list/ActualBoxes.vue"
      >
        Boxes (x/y axis) example<IconOutbound
      /></a>
    </h3>
    <p>
      An important feature of AutoAnimate is that it operates on both the x and
      y axis. Items that are moved in the dom from one location to another, or
      are wrapping at the end of a line will automatically be translated to
      their respective position.
    </p>
    <ActualBoxes />
  </section>
</template>
