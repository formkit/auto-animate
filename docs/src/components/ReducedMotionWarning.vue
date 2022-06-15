<template>
  <div class="motion-notice">
    <p>
      <strong>Notice</strong>: Your current device has its "reduce motion" accessibility option enabled.
      Out of respect for this setting AutoAnimate animations will not play.
      Please disable your device's "reduce motion" setting if you wish to see AutoAnimate in action.
    </p>
  </div>
</template>

<style lang="css">
.motion-notice {
  padding-top: 3em;
}
.motion-notice p {
  display: block;
  padding: 2em;
  color: var(--ui-red);
  border: 1px solid var(--ui-red);
  border-radius: 0.5em;
}
@media (min-width: 42em) {
  .motion-notice {
    padding-top: 0;
  }
}
</style>
