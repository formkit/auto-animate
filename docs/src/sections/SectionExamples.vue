<script setup>
import ActualCards from "../examples/cards/ActualCards.vue"
import ActualList from "../examples/list/ActualList.vue"
import ActualBoxes from "../examples/boxes/ActualBoxes.vue"
import ActualAccordion from "../examples/accordion/ActualAccordion.vue"
import ActualFormKit from "../examples/formkit/ActualFormKit.vue"
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

    <h3 id="example-boxes">
      <a
        href="https://github.com/formkit/auto-animate/blob/master/docs/src/examples/boxes/ActualBoxes.vue"
      >
        Boxes (x/y axis) example<IconOutbound
      /></a>
    </h3>
    <p>
      An important feature of AutoAnimate is that it operates on both the x and
      y axis. Items that are moved in the DOM from one location to another, or
      are wrapping at the end of a line will automatically be translated to
      their respective position.
    </p>
    <ActualBoxes />

    <h3 id="example-accordion">
      <a
        href="https://github.com/formkit/auto-animate/blob/master/docs/src/examples/accordion/ActualAccordion.vue"
      >
        FAQ accordion example<IconOutbound
      /></a>
    </h3>
    <p>
      We’ve all had to create accordions before. Pretty easy on the surface, but
      adding motion to the open/close sequence can be frustrating to say the
      least, and if you hack it together using
      <code>max-height</code> transitions, you are sure to lose your easing. No
      more!
    </p>
    <ActualAccordion />
    <h3 id="example-validation">
      <a
        href="https://github.com/formkit/auto-animate/blob/master/docs/src/examples/formkit/ActualFormKit.vue"
      >
        FormKit validation example<IconOutbound
      /></a>
    </h3>
    <p>
      You don’t have to use <a href="https://formkit.com">FormKit</a> to use
      AutoAnimate, but if you are a FormKit user, there are some neat things you
      can do. For example, you can use AutoAnimate to animate validation
      messages being added and removed from an input:
    </p>
    <ActualFormKit />
  </section>
</template>
