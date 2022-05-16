<script setup lang="ts">
import CodeExample from "../components/CodeExample.vue"
import AsideTip from "../components/AsideTip.vue"
import dropdown from "../examples/dropdown"
import config from "../examples/config"
import ActualDropdown from "../examples/dropdown/ActualDropdown.vue"
</script>
<template>
  <section id="usage">
    <h2>Usage</h2>
    <p>
      Auto Animation is fundamentally a single function
      <code>autoAnimation</code> that accepts a parent element. Automatic
      animations will be applied to the parent and its immediate children.
      Animations are specifically triggered when one of three events occurs:
    </p>
    <ul>
      <li>An child is added in the DOM.</li>
      <li>An child is removed in the DOM.</li>
      <li>An child is moved in the DOM.</li>
    </ul>
    <p>
      Let’s see what this looks like in practice. For now we'll use the
      <code>autoAnimation</code> function itself.
    </p>
    <AsideTip>
      Vue and React users — you’ll get some additional syntactic sugar later on
      but for now lets learn the fundamentals.
    </AsideTip>
    <CodeExample :examples="dropdown" title="Dropdown" />
    <ActualDropdown />
    <p>
      Too easy. A gentle and smooth height and opacity shift without adding any
      transition classes. A notable upgrade for end users.
      <a href="#examples">Checkout the examples</a>
      to see other use cases.
    </p>
  </section>
  <h3>Configuration</h3>
  <p>
    Auto Animate is intended to be used with zero configuration. We believe the
    default configuration falls inline with the project’s objective:
    <em class="important"
      >Auto Animation’s goal is to substantiality improve user experience with a
      miniscule impact on implementation time or performance budget.</em
    >
    However, some minor configuration options are available. As a second
    argument to <code>autoAnimate</code> you may pass an object with the
    following options:
  </p>
  <CodeExample :examples="config" />
  <p>
    If you really feel its necessary to dramatically change the default
    animations <a href="#plugins">checkout plugins</a>.
  </p>
</template>
