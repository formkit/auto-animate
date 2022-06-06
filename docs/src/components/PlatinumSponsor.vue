<script setup>

</script>

<template>
  <div class="platinum-sponsor">
    <h5>Platinum Sponsor 👑</h5>
    <a href="https://github.com/sponsors/formkit">
      <div class="your-logo-here">
        Your banner here!<br>
        <small>
          Support our open-source efforts while promoting your product to a JavaScript audience.<br>
          Only one AutoAnimate Platinum Sponsor spot exists. Over 30,000 unique visitors and 3k GitHub stars in the first 30 days.<br>
          Click through for more details.
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

@media (min-width: 42em) {
  .platinum-sponsor {
    margin-left: -12em;
  }
  .your-logo-here {
    aspect-ratio: 10/1;
  }
}
@media (min-width: 50em) {
  .platinum-sponsor {
    margin-left: -18em;
  }
}
</style>
