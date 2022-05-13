<script setup lang="ts">
import hljs from "highlight.js"
import IconVue from "./IconVue.vue"
import IconReact from "./IconReact.vue"
import IconHTML from "./IconHTML.vue"
import { ref } from "vue"
import "highlight.js/styles/monokai.css"

type Language = { ext: "jsx" | "vue" | "html"; name: "react" | "vue" | "html" }

const type = ref<Language>({ ext: "vue", name: "react" })
const html = hljs.highlight("<h1>Hello world</h1>", { language: "html" })

const props = defineProps({
  title: {
    type: String,
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
      <span class="control-title">{{ title }}.{{ type.ext }}</span>
    </div>
    <code class="code-example" v-html="html.value"></code>
    <div class="window-footer">
      <ul class="frameworks">
        <li><IconVue />Vue</li>
        <li><IconReact />React</li>
        <li><IconHTML />HTML</li>
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
  box-shadow: 0 0 2em rgba(0, 0, 0, 0.3), 0 0 1em rgba(71, 17, 222, 0.1);
  display: flex;
  flex-direction: column;
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
  margin-right: 1.5em;
  font-size: 0.75em;
  padding: 0.75em;
  cursor: pointer;
}
.frameworks li:hover {
  background-color: #585a51;
}
.frameworks svg {
  display: block;
  width: 0.9em;
  margin-right: 0.5em;
  font-size: 1rem;
}
</style>
