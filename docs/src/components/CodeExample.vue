<script setup lang="ts">
import IconVue from "./IconVue.vue"
import IconReact from "./IconReact.vue"
import IconHTML from "./IconHTML.vue"
import IconYarn from "./IconYarn.vue"
import IconNPM from "./IconNPM.vue"
import IconPNPM from "./IconPNPM.vue"
import { computed, PropType, ref } from "vue"
import { vAutoAnimate } from "../../../src"
import "../../assets/prism.css"

type LanguageOption = "react" | "vue" | "html"

type Language = {
  ext: "jsx" | "vue" | "html"
  example: string
  title?: string
  language: string
}

const current = ref<LanguageOption>(Object.keys(props.examples)[0])

const type = computed(() => {
  return props.examples[current.value]
})
const syntax = computed(() => {
  if (typeof window === "undefined") return ""
  return window.Prism.highlight(
    type.value.example,
    window.Prism.languages[type.value.language],
    type.value.language
  )
})

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  examples: {
    type: Object as PropType<{ [T in LanguageOption]: Language }>,
    required: true,
  },
})
</script>

<template>
  <div class="window">
    <div class="window-header">
      <div class="control control--close"></div>
      <div class="control control--minimize"></div>
      <div class="control control--expand"></div>
      <span class="control-title">{{
        type.title || `${title}.${type.ext}`
      }}</span>
    </div>
    <code class="code-example" v-html="syntax" v-auto-animate></code>
    <div class="window-footer">
      <ul class="frameworks">
        <li
          v-if="'vue' in props.examples"
          @click="current = 'vue'"
          :data-selected="current === 'vue' || null"
        >
          <IconVue />Vue
        </li>
        <li
          v-if="'react' in props.examples"
          @click="current = 'react'"
          :data-selected="current === 'react' || null"
        >
          <IconReact />React
        </li>
        <li
          v-if="'html' in props.examples"
          @click="current = 'html'"
          :data-selected="current === 'html' || null"
        >
          <IconHTML />HTML
        </li>
        <li
          v-if="'yarn' in props.examples"
          @click="current = 'yarn'"
          :data-selected="current === 'yarn' || null"
        >
          <IconYarn />yarn
        </li>
        <li
          v-if="'npm' in props.examples"
          @click="current = 'npm'"
          :data-selected="current === 'npm' || null"
        >
          <IconNPM />npm
        </li>
        <li
          v-if="'pnpm' in props.examples"
          @click="current = 'pnpm'"
          :data-selected="current === 'pnpm' || null"
        >
          <IconPNPM />pnpm
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.window {
  flex-grow: 1;
  background-color: rgba(0, 0, 0, 0.85);
  border-radius: 0.75em;
  color: white;
  padding: 1em;
  font-family: courier, monospace;
  box-shadow: 0 0 2em rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
  margin-top: 2em;
}

@media (min-width: 60em) {
  .window {
    margin-left: 2em;
    margin-top: 0;
  }
}

.window-header {
  font-family: var(--system-stack);
  display: flex;
  margin: -1em -1em 0 -1em;
  padding: 0.75em 1em;
  margin-bottom: 1.5em;
  font-weight: 300;
  align-items: center;
  justify-content: flex-start;
  color: var(--gray-l);
}
.control-title {
  font-size: 14px;
  justify-self: center;
  margin: 0 auto;
  padding-right: 2.4rem;
}

.code-example {
  display: block;
  flex-grow: 1;
  white-space: pre;
  font-size: 0.9rem;
  overflow: auto;
  background-color: transparent;
}

.code-example::-webkit-scrollbar {
  display: none;
}

.control {
  width: 0.8em;
  height: 0.8em;
  border-radius: 1em;
  background-color: transparent;
  margin-right: 0.5em;
}
.control--close {
  background-color: var(--ui-red);
}
.control--minimize {
  background-color: var(--ui-yellow);
}
.control--expand {
  background-color: var(--ui-green);
}

.window-footer {
  padding: 0 0.5em;
  border-radius: 0 0 0.5em 0.5em;
  background-color: var(--gray-d);
  margin: 1em -1em -1em -1em;
  font-family: var(--system-stack);
  -webkit-font-smoothing: anti-aliased;
}

.frameworks {
  display: flex;
  align-items: center;
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.frameworks li {
  display: flex;
  align-items: center;
  font-size: 0.75em;
  padding: 0.75em 1em;
  cursor: pointer;
}
.frameworks li:hover {
  background-color: #585a51;
}
.frameworks li[data-selected] {
  background-color: rgba(255, 255, 255, 0.1);
}
.frameworks svg {
  display: block;
  width: 0.9em;
  margin-right: 0.5em;
  font-size: 1rem;
  max-height: 1em;
}
</style>
