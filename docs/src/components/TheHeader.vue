<script setup lang="ts">
import TheLogo from "./TheLogo.vue"
import IconDiscord from "./IconDiscord.vue"
import IconTwitter from "./IconTwitter.vue"
import GithubButton from "vue-github-button"
</script>

<template>
  <header>
    <TheLogo class="logo" />
    <div class="buttons">
      <a href="https://discord.gg/Vhu97pAC76"><IconDiscord class="icon" /></a>
      <a href="https://twitter.com/useFormKit"><IconTwitter class="icon" /></a>
      <GithubButton
        href="https://github.com/formkit/auto-animate"
        data-size="large"
        data-show-count="true"
        data-icon="star"
        aria-label="Star formkit/auto-animate on GitHub"
        >Star</GithubButton
      >
      <GithubButton
        href="https://github.com/sponsors/formkit"
        data-size="large"
        data-icon="heart"
        aria-label="Sponsor FormKit on GitHub"
        >Sponsor</GithubButton
      >
    </div>
  </header>
</template>

<style scoped>
header {
  height: 4em;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo {
  width: 8em;
}

.buttons {
  display: flex;
  align-items: center;
}

.buttons a:hover {
  text-decoration: none;
}

.icon {
  width: 1.25em;
  fill: var(--gray-m);
  margin-right: 1em;
}

.buttons span {
  margin-right: 1em;
}
.buttons span:last-child {
  margin-right: 0;
}

.buttons a:hover .icon {
  fill: var(--primary);
}

@media (min-width: 30em) {
  .logo {
    width: 10em;
  }
}
</style>
