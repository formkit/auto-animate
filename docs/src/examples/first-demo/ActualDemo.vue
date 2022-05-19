<script setup>
import FrameworkList from "./FrameworkList.vue"
</script>

<template>
  <div class="comparison-app">
    <FrameworkList>
      Native JavaScript
    </FrameworkList>
    <FrameworkList :animated="true">
      With AutoAnimate
    </FrameworkList>
  </div>
</template>

<style lang="css">
.comparison-app {
  display: flex;
  flex-direction: column;
  margin-top: 2em;
}
@media (min-width: 48em) {
  .comparison-app {
    margin-top: 2em;
    flex-direction: row;
    margin-bottom: -1.25em;
  }
}

.comparison-app ul {
  list-style-type: none;
  padding: 0;
}

.comparison-app .stage {
  margin: 0 0.5em 2em 0.5em;
  flex-grow: 1;
}

.comparison-app .stage:not([data-has-animation="true"]) {
  opacity: 0.85;
  filter: grayscale();
}

.comparison-app li {
  padding: 0.75em;
  background-color: #e3e9ff;
  border-radius: 0.5em;
  margin-bottom: 0.5em;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
[data-dark-mode="true"] .comparison-app li {
  background-color: var(--purple-lm);
  color: #444;
}

li:first-child .action-icons button:first-child,
.comparison-app li:nth-last-child(2) .action-icons button:nth-last-child(2) {
  opacity: 0.1;
  pointer-events: none;
}

.comparison-app li svg {
  width: 1em;
  fill: #4711de;
}

.comparison-app li svg.down {
  transform: rotate(180deg);
  fill: #4711de;
}

.comparison-app li > span {
  text-overflow: ellipsis;
  width: 100%;
  flex-grow: 1;
}

.comparison-app .action-icons {
  display: flex;
  align-items: center;
}

.comparison-app .action-icons button {
  appearance: none;
  border: 0;
  padding: 0;
  background: transparent;
  border-radius: 0;
  margin-left: 0.75em;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.comparison-app li input {
  appearance: none;
  border: 1px solid #4711de;
  border-radius: 0.25em;
  background-color: rgba(255, 255, 255, 0.4);
  padding: 0.5em;
  flex-grow: 1;
  min-width: none;
  width: 100%;
  display: block;
}

.comparison-app li input:focus {
  outline: 1px solid #4711de;
}

.comparison-app li button {
  appearance: none;
  border: 1px solid #4711de;
  background-color: #4711de;
  border-radius: 0.25em;
  color: white;
  font-weight: 600;
  padding: 0.5em 1em;
  margin-left: 1em;
}

.comparison-app li form {
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: space-between;
}

.comparison-app .comparison {
  justify-content: space-between;
  margin: 0 -0.5em;
}

.comparison-app .logo {
  width: calc(100% - 1em);
  max-width: 10em;
  max-height: 1.1em;
  margin: 0 auto;
}
.comparison-app .logo img {
  display: block;
  width: 100%;
  height: 100%;
}

.comparison-app .stage:not([data-has-animation]) .logo {
  opacity: 0.75;
  position: relative;
  aspect-ratio: 7.008108;
  text-align: center;
}

.comparison-app .action-icons .remove {
  margin-left: 1.5em;
}

.comparison-app .action-icons .remove svg {
  fill: red;
}
</style>
