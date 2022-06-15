<script setup>

</script>

<template>
  <section class="polite-ad-area">
    <div class="polite-header">
      <h5>Sponsored Ad</h5>
      <a class="polite-sponsored" href="https://formkit.com/ads">Want this Spot? Current bid: $4/day →</a>
    </div>
    <a href="https://formvalidation.io/">
      <picture>
        <source
          srcset="https://cdn.formk.it/web-assets/ads/FormValidation-Banner-1500x250.png"
          media="(min-width: 750px)"
        >
        <source
          srcset="https://cdn.formk.it/web-assets/ads/FormValidation-Banner-750x250.png"
          media="(max-width: 749px)"
        >
        <img class="ad-spot" src="https://cdn.formk.it/web-assets/ads/FormValidation-Banner-1500x250.png" alt="FormValidation.io advertisement" />
      </picture>
    </a>
    <a v-if="false" href="mailto:ads@formkit.com">
      <div class="your-logo-here">
        Your image here!<br>
        <small>
          Promote your product to a JavaScript audience — over 30,000 visitors in the last 30 days.<br>
          Click through to contact for details.<br>
          Current bid: $3/day
        </small>
      </div>
    </a>
  </section>
</template>

<style scoped>
h5 {
  margin-bottom: 0.25em;
  margin-top: 0;
}

.polite-ad-area {
  margin-bottom: 2em;
}

.polite-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.polite-sponsored {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: .025em;
  filter: grayscale(1);
  transition: filter 0.15s ease-out;
}

.polite-sponsored:hover {
  text-decoration: none;
  color: var(--primary);
  filter: grayscale(0);
}
.ad-spot {
  max-width: 100%;
  border-radius: 1em;
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
  .polite-ad-area {
    margin-left: -12em;
    margin-bottom: 6em;
  }
  .your-logo-here {
    aspect-ratio: 12/1;
    margin-bottom: 6em;
  }
}
@media (min-width: 50em) {
  .polite-ad-area {
    margin-left: -18em;
  }
}
</style>
