<script setup>
import { ref, defineProps, onMounted } from "vue"
import autoAnimate from "../../../../src/index"
import Arrow from './Arrow.vue'
import Close from './Close.vue'

const props = defineProps({
  animated: {
    type: Boolean,
    default: false
  }
})

const list = ref()
const inputValue = ref('AdonisJs')
const frameworks = ref([
  { id: 0, name: 'Nuxt.js' },
  { id: 1, name: 'Next.js' },
  { id: 2, name: 'SvelteKit' },
  { id: 3, name: 'Remix' },
  { id: 4, name: 'Meteor' },
])

const addItem = (e) => {
  e.preventDefault();
  frameworks.value.push({ id: Math.random(), name: inputValue.value });
  inputValue.value = '';
};

const sortUp = (item) => {
  const index = frameworks.value.findIndex((i) => item.id === i.id);
  if (index) {
    frameworks.value.splice(index - 1, 0, ...frameworks.value.splice(index, 1));
  }
};

const sortDown = (item) => {
  const index = frameworks.value.findIndex((i) => item.id === i.id);
  if (index < frameworks.value.length - 1) {
    frameworks.value.splice(index + 1, 0, ...frameworks.value.splice(index, 1));
  }
};

const sortList = () => {
  frameworks.value = [...frameworks.value].sort((a, b) => {
    const nameA = a.name.toLowerCase().trim();
    const nameB = b.name.toLowerCase().trim();
    return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
  });
};

const remove = (item) => {
  frameworks.value = frameworks.value.filter((i) => i.id !== item.id);
};

onMounted(() => {
  if (props.animated) {
    console.log('adding auto-animate')
    autoAnimate(list.value)
  }
})
</script>

<template>
  <div className="stage" :data-has-animation="animated">
    <div className="logo">
      <slot />
    </div>
    <ul ref="list">
      <li
        v-for="item in frameworks"
        :key="item.id"
      >
        <span>{{ item.name }}</span>
        <div className="action-icons">
          <button @click="sortUp(item)">
            <Arrow direction="up" />
          </button>
          <button @click="sortDown(item)">
            <Arrow direction="down" />
          </button>
          <button className="remove" @click="remove(item)">
            <Close />
          </button>
        </div>
      </li>
      <li>
        <form @submit="addItem">
          <input
            placeholder="Add another..."
            type="text"
            v-model="inputValue"
          />
          <button type="submit">Add</button>
          <button type="button" :onClick="sortList">
            Sort
          </button>
        </form>
      </li>
    </ul>
  </div>
</template>
