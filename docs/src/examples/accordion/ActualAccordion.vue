<script setup lang="ts">
import { ref } from "vue"
import { vAutoAnimate } from "../../../../src"

const faq = ref([
  {
    id: "why",
    question: "Why did you create it?",
    answer: `We needed a way to animate DOM elements without adding to the
    virtual DOM in Vue and React. And it turned out our solution was gonna work
    great for lots of other use cases as well.`,
  },
  {
    id: "license",
    question: "Is it open source?",
    answer: `It sure is! AutoAnimate is MIT licensed, which basically means you
    are free to take it and do whatever you want with it. If you find it useful
    consider <a href="https://github.com/sponsors/formkit">supporting our open source efforts</a>.`,
  },
  {
    id: "who",
    question: "Who made this?",
    answer: `AutoAnimate is a team effort 💪 . Most of the code was written by
      <a href='https://twitter.com/jpschroeder'>Justin Schroeder</a>,
      <a href='https://twitter.com/0xBOYD'>Andrew Boyd</a> played a key
      role on the docs, and the rest of the <a href='https://formkit.com'>FormKit</a>
      team held down the fort.`,
  },
])

const current = ref(faq.value[0].id)
</script>

<template>
  <div class="example accordion-example">
    <ul class="accordion">
      <li class="accordion-item" v-for="q in faq" :key="q.id" v-auto-animate>
        <div
          class="question"
          @click="current = current === q.id ? false : q.id"
        >
          {{ q.question }}
        </div>
        <p class="answer" v-if="q.id === current" v-html="q.answer" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

li {
  display: block;
  background-color: var(--ui-light);
  border-radius: 0.5em;
  overflow: hidden;
}
[data-dark-mode="true"] li {
  background-color: var(--purple-d);
}

.question {
  padding: 1em;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.question::before {
  content: "Q";
  font-size: 1.5em;
  margin-right: 0.5em;
  color: var(--primary);
}
[data-dark-mode="true"] .question::before {
  color: var(--purple-m);
}
.answer {
  margin: 0 1rem;
  padding: 0 0 1rem 0;
  font-size: 0.875em;
}
</style>
