<script setup>
import { ref } from "vue"
import { vAutoAnimate } from "../../../../src/index"

const showForm = ref(false)
const cards = ref([
  {
    id: Math.random(),
    title: "Employee Lunch",
    date: "March 31st",
    description: "Join us for an all hands meeting.",
  },
  {
    id: Math.random(),
    title: "Engineering scrum",
    date: "April 10th",
    description: "Engineering team is playing rugby.",
  },
])

function createCard(card) {
  cards.value.unshift(card)
  setTimeout(() => {
    showForm.value = false
  }, 300)
}
</script>

<template>
  <div class="example" v-auto-animate>
    <button
      class="button button--alt"
      v-if="!showForm"
      @click="showForm = true"
    >
      + Add Event
    </button>
    <div class="form" v-if="showForm">
      <FormKit
        type="form"
        submit-label="Add Event"
        @submit="createCard"
        :submit-attrs="{ inputClass: 'button button--alt' }"
      >
        <FormKit name="title" label="Title" value="New years party" />
        <FormKit name="date" label="Title" value="January 1st" />
        <FormKit
          name="description"
          type="textarea"
          label="Description"
          value="We’ll all sing yuletide carols."
        />
      </FormKit>
    </div>
    <ul class="cards" v-auto-animate>
      <li v-for="card in cards" :key="card.id" class="card">
        <h4 class="title">{{ card.title }}</h4>
        <div class="date">{{ card.date }}</div>
        <div class="description">{{ card.description }}</div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.cards {
  list-style-type: none;
  padding: 0;
  margin: 0.5em -0.5em;
  display: flex;
  flex-wrap: wrap;
}

.example {
  margin-top: 2em;
}
.card {
  display: block;
  padding: 1em;
  border-radius: 0.5em;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 255, 0.02),
    rgba(0, 0, 255, 0.07)
  );
  border: 2px solid rgba(0, 0, 255, 0.1);
  box-shadow: 0 0 1em rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  width: 100%;
  flex: 100% 0 0;
  margin: 0.5em;
}
[data-dark-mode="true"] .card {
  background: linear-gradient(
    to bottom,
    rgba(170, 170, 239, 0.2),
    rgba(91, 91, 228, 0.1)
  );
  border: 2px solid rgba(159, 159, 254, 0.1);
}

@media (min-width: 38em) {
  .card {
    width: calc(50% - 2em);
    flex: calc(50% - 2em) 0 0;
  }
}

@media (min-width: 61em) {
  .card {
    width: calc(33% - 3em);
    flex: calc(33% - 3em) 0 0;
  }
}

.title {
  margin: 0;
}
.date {
  color: var(--gray-m);
  font-weight: 300;
  font-size: 0.75em;
  margin-bottom: 1em;
}

.description {
  font-size: 0.875em;
}
.cards li::before {
  display: none;
}
</style>
