<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer>
    <p class="copyright">
      Released under the <a href="https://opensource.org/licenses/MIT">MIT License</a>.<br>
      Copyright &copy; {{ year }} FormKit, Inc.
      <a href="https://www.wearebraid.com" target="_blank" class="attribution">Site by Braid.</a>
    </p>
  </footer>
</template>

<style scoped>
footer {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 6em;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
[data-dark-mode="true"] footer {
  border-top-color: rgba(255, 255, 255, 0.15);
}
.copyright {
  display: inline-block;
  font-size: 0.8rem;
  margin: 0 auto;
  padding: 3em 2em;
  text-align: center;
}
.attribution {
  color: inherit;
  text-decoration: none;
}
.attribution:hover {
  text-decoration: underline;
}
</style>
