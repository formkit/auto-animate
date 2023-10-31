<script setup>
import CodeExample from "../components/CodeExample.vue"
import { bouncy,usingPreset } from "../examples/plugin"
import ActualPlugin from '../examples/plugin/ActualPlugin.vue'
import UsingPreset from "../examples/plugin/UsingPreset.vue"
</script>

<template>
  <section id="plugins">
    <h2>Plugins</h2>
    <p>
      While AutoAnimate is intended to be used with its zero-config defaults,
      some users may need to replace the default animation keyframes
      with custom ones. To do this, provide a function as the second
      argument of the <code>autoAnimate</code> function. This function will be
      called before every animation and must return a
      <a href="https://developer.mozilla.org/en-US/docs/Web/API/KeyframeEffect"
        ><code>KeyframeEffect</code></a
      >.
    </p>
    <p>
      Here we will create a new set of keyframes for the <code>add</code>, <code>remove</code> and <code>remain</code>
      actions that overshoot their destinations to create a "bouncy" animation effect.
    </p>
    <CodeExample title="~/bouncy" :examples="bouncy"></CodeExample>
    <p>
      We can use our newly defined keyframes in any previous example to see the
      effect it has. Here's our previous list example with the "bouncy" keyframes
      applied to it:
    </p>
    <ActualPlugin />
    <h2>Preset Plugins</h2>
    <p>Here are some preset plugins</p>
    <using-preset/>
    <CodeExample title="usingPreset" :examples="usingPreset"></CodeExample>
  </section>
</template>
