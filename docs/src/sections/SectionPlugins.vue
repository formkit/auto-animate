<template>
  <section id="plugins">
    <h2>Plugins</h2>
    <p>
      Although Auto Animate is intended to be primary used with the default, it
      may occasionally make sense to swap out the default animation keyframes
      for custom ones. To do this, you can provide a function as the second
      argument of the <code>autoAnimate</code> function. This function will be
      called before every animation and must return a
      <a href="https://developer.mozilla.org/en-US/docs/Web/API/KeyframeEffect"
        ><code>KeyframeEffect</code></a
      >.
    </p>
  </section>
</template>
