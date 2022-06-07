<script setup>

</script>

<template>
  <div class="platinum-sponsor">
    <h5>Current bid: $3/day</h5>
    <a href="mailto:admin@formkit.com">
      <div class="your-logo-here">
        Your image here!<br>
        <small>
          Promote your product to a JavaScript audience — over 30,000 visitors in the last 30 days.<br>
          Click through to contact for details.<br>
          Current bid: $3/day
        </small>
      </div>
    </a>
  </div>
</template>

<style scoped>
h5 {
  margin-bottom: 0.25em;
}
.your-logo-here {
  border: dashed 2px var(--gray-l);
  border-radius: 1em;
  padding: 3em;
  text-align: center;
  margin-bottom: 2em;
  aspect-ratio: 5/1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
small {
  color: var(--text);
  opacity: 0.66;
}

[data-dark-mode="true"] .your-logo-here {
  border-color: var(--gray-m);
}

@media (min-width: 42em) {
  .platinum-sponsor {
    margin-left: -12em;
  }
  .your-logo-here {
    aspect-ratio: 12/1;
    margin-bottom: 6em;
  }
}
@media (min-width: 50em) {
  .platinum-sponsor {
    margin-left: -18em;
  }
}
</style>
