<script setup>
import IconRemove from "../../components/IconRemove.vue"
import { vAutoAnimate } from "../../../../src/index"
import { ref } from "vue"
const tags = ref(["Rock", "Punk"])
function addItem(e) {
  tags.value.push(e.target.value)
  e.target.value = ""
}
function remove(target) {
  tags.value = tags.value.filter((tag) => target !== tag)
}
</script>

<template>
  <label class="input-label" for="add-tag-input">Add a genre</label>
  <label class="tag-input" for="add-tag-input">
    <ul v-auto-animate>
      <li class="tag" v-for="tag in tags" :key="tag">
        <span>{{ tag }}</span>
        <IconRemove @click="remove(tag)" />
      </li>
      <li>
        <input
          type="text"
          placeholder="Add a tag..."
          @keydown.enter="addItem"
        />
      </li>
    </ul>
  </label>
</template>

<style scoped>
.tag-input {
  display: flex;
  align-items: flex-start;
  border: 1px solid lightgray;
  box-sizing: border-box;
  padding: 0.25em 0.75em;
  border-radius: 0.5em;
  width: 100%;
  max-width: 450px;
  box-sizing: border-box;
}

ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 0;
  min-height: 0.9em;
  overflow: hidden;
  width: 100%;
}

.tag {
  display: inline-flex;
  align-items: center;
  padding: 0.25em 0.75em;
  font-size: 0.75em;
  background-color: #ece3ff;
  border-radius: 1em;
  margin: 0.25em 0.75em 0.25em 0;
  user-select: none;
  color: var(--text-d);
}

.tag svg {
  width: 0.833em;
  margin-left: 0.75em;
  fill: red;
}

.tag span {
  white-space: nowrap;
}
li::before {
  display: none;
}

.tag-input:focus-within {
  border-color: #4b17df;
}

.input-label {
  font-size: 0.9em;
  display: block;
  margin-bottom: 0.5em;
}

input {
  appearance: none;
  border: 0;
  padding: 0;
  margin: 0;
  flex-grow: 1;
  width: 5em;
  background-color: transparent;
  display: block;
  padding: 0.25em 0;
  color: var(--text);
  /* margin: 0.75em 0; */
}

@media (min-width: 600px) {
  input {
    width: 10em;
  }
}

input:focus {
  outline: 0;
}
</style>
