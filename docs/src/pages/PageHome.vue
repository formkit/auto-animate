<script setup lang="ts">
import HeroTitle from "../components/HeroTitle.vue"
</script>

<template>
  <HeroTitle />
  <nav>
    <ul>
      <li><a href="#installation">Installation</a></li>
      <li><a href="#how-it-works">How it works</a></li>
      <li><a href="#usage">Usage</a></li>
      <li><a href="#examples">Examples</a></li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  background-color: white;
  box-shadow: 0 0 1em rgba(0, 0, 0, 0.1);
  border-radius: 0.75em;
  padding: 0.5em 0;
  margin: 3em 0;
}
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

a {
  display: block;
  padding: 0.25em 1em;
}
</style>
