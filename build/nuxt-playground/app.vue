<script lang="ts" setup>
const items = ref(['A', 'B', 'C'])

function add () {
  items.value.push(`${items.value.length + 1}`)
}
</script>

<template>
  <ul v-auto-animate>
    This is the way...
  </ul>
  <button @click.prevent="add">Add item</button>
</template>
